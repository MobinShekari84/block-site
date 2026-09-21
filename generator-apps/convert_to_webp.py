#!/usr/bin/env python3
"""
Block Architecture Studio - WebP Image Converter
Recursively finds and duplicates photos within a project directory (and all subfolders)
into optimized .webp format.
"""

import os
import sys
import argparse

# Automatic fallback: if PIL is missing, attempt to use the repository virtual environment
try:
    from PIL import Image, ImageOps
except ImportError:
    script_dir = os.path.dirname(os.path.abspath(__file__))
    repo_root = os.path.dirname(script_dir)
    venv_python = os.path.join(repo_root, "venv", "bin", "python3")
    if os.path.exists(venv_python) and sys.executable != venv_python:
        os.execv(venv_python, [venv_python] + sys.argv)
    print("\n[!] Error: Pillow (PIL) is not installed in the current Python environment.")
    print("    Please install Pillow or activate your virtual environment:")
    print("    source venv/bin/activate")
    print("    pip install pillow\n")
    sys.exit(1)

SUPPORTED_EXTENSIONS = {
    ".jpg", ".jpeg", ".jpe", ".jfif",
    ".png",
    ".bmp",
    ".tiff", ".tif",
    ".avif",
    ".heic", ".heif"
}

def format_size(bytes_val: int) -> str:
    """Format bytes into human-readable string (B, KB, MB, GB)."""
    for unit in ["B", "KB", "MB", "GB"]:
        if abs(bytes_val) < 1024.0:
            return f"{bytes_val:3.1f} {unit}"
        bytes_val /= 1024.0
    return f"{bytes_val:.1f} TB"

def resolve_project_path(input_path: str) -> str:
    """
    Intelligently resolve a project path string.
    Supports:
      - Absolute paths
      - Relative to current working directory
      - Relative to repository root
      - Relative to 'assets/'
      - Relative to 'assets/villa/' or 'assets/renovation/'
    """
    if not input_path:
        return ""

    expanded = os.path.expanduser(input_path.strip().strip("'\""))
    
    # Check absolute or direct relative
    if os.path.exists(expanded) and os.path.isdir(expanded):
        return os.path.abspath(expanded)

    script_dir = os.path.dirname(os.path.abspath(__file__))
    repo_root = os.path.dirname(script_dir)

    # Candidate locations to test
    candidates = [
        os.path.join(repo_root, expanded),
        os.path.join(repo_root, "assets", expanded),
        os.path.join(repo_root, "assets", "villa", expanded),
        os.path.join(repo_root, "assets", "renovation", expanded),
    ]

    for candidate in candidates:
        if os.path.exists(candidate) and os.path.isdir(candidate):
            return os.path.abspath(candidate)

    return ""

def convert_image_to_webp(
    src_path: str,
    dst_path: str,
    quality: int = 85,
    lossless: bool = False,
    overwrite: bool = False,
    delete_original: bool = False
) -> dict:
    """
    Convert a single image to .webp.
    Returns a dict with status and statistics.
    """
    if os.path.exists(dst_path) and not overwrite:
        return {
            "status": "skipped",
            "reason": "Destination file already exists",
            "src": src_path,
            "dst": dst_path
        }

    orig_size = os.path.getsize(src_path)

    try:
        with Image.open(src_path) as img:
            # Auto-rotate based on EXIF orientation tag (e.g. smartphone/camera photos)
            img = ImageOps.exif_transpose(img)

            # Preserve transparency where applicable
            if img.mode in ("RGBA", "LA"):
                converted_img = img
            elif img.mode == "P" and "transparency" in img.info:
                converted_img = img.convert("RGBA")
            elif img.mode == "CMYK":
                # Convert CMYK (print/scans) to standard RGB
                converted_img = img.convert("RGB")
            elif img.mode in ("P", "1"):
                converted_img = img.convert("RGB")
            else:
                converted_img = img

            # Save as WebP
            save_kwargs = {
                "format": "WEBP",
                "method": 6,  # Highest quality compression effort
            }
            if lossless:
                save_kwargs["lossless"] = True
            else:
                save_kwargs["quality"] = quality

            converted_img.save(dst_path, **save_kwargs)

        new_size = os.path.getsize(dst_path)
        
        if delete_original and src_path != dst_path:
            try:
                os.remove(src_path)
            except OSError as e:
                return {
                    "status": "warning",
                    "reason": f"Converted, but could not delete original: {e}",
                    "src": src_path,
                    "dst": dst_path,
                    "orig_size": orig_size,
                    "new_size": new_size
                }

        return {
            "status": "success",
            "src": src_path,
            "dst": dst_path,
            "orig_size": orig_size,
            "new_size": new_size
        }

    except Exception as e:
        # If a partial/empty file was created on failure, remove it
        if os.path.exists(dst_path) and os.path.getsize(dst_path) == 0:
            try:
                os.remove(dst_path)
            except OSError:
                pass
        return {
            "status": "error",
            "reason": str(e),
            "src": src_path,
            "dst": dst_path
        }

def process_project(
    project_dir: str,
    quality: int = 85,
    lossless: bool = False,
    overwrite: bool = False,
    delete_original: bool = False
):
    """
    Recursively scan the project directory and duplicate each photo into .webp.
    """
    print("=" * 60)
    print("       BLOCK ARCHITECTURE STUDIO - WEBP CONVERTER")
    print("=" * 60)
    print(f"Target Directory: {project_dir}")
    print(f"WebP Quality:     {quality}" if not lossless else "WebP Quality:     Lossless")
    print(f"Overwrite:        {'Yes' if overwrite else 'No (skip existing .webp)'}")
    print(f"Keep Originals:   {'No (deleting original files)' if delete_original else 'Yes (duplicate)'}")
    print("-" * 60)

    # Collect images
    image_files = []
    for root, dirs, files in os.walk(project_dir):
        # Exclude hidden directories (like .git, .vscode, etc.)
        dirs[:] = [d for d in dirs if not d.startswith(".")]

        for filename in files:
            if filename.startswith("."):
                continue
            ext = os.path.splitext(filename)[1].lower()
            if ext in SUPPORTED_EXTENSIONS and ext != ".webp":
                full_path = os.path.join(root, filename)
                image_files.append(full_path)

    image_files.sort()

    if not image_files:
        print("\n[!] No photos found to convert in the specified directory.")
        print(f"    Supported formats: {', '.join(sorted(SUPPORTED_EXTENSIONS))}")
        return

    print(f"[+] Found {len(image_files)} image(s) to process.\n")

    stats = {
        "converted": 0,
        "skipped": 0,
        "errors": 0,
        "total_orig_size": 0,
        "total_new_size": 0
    }

    for src_path in image_files:
        rel_src = os.path.relpath(src_path, project_dir)
        base_name, _ = os.path.splitext(src_path)
        dst_path = base_name + ".webp"
        rel_dst = os.path.relpath(dst_path, project_dir)

        res = convert_image_to_webp(
            src_path=src_path,
            dst_path=dst_path,
            quality=quality,
            lossless=lossless,
            overwrite=overwrite,
            delete_original=delete_original
        )

        status = res["status"]
        if status == "success":
            stats["converted"] += 1
            orig_s = res["orig_size"]
            new_s = res["new_size"]
            stats["total_orig_size"] += orig_s
            stats["total_new_size"] += new_s

            diff = orig_s - new_s
            ratio = (diff / orig_s * 100) if orig_s > 0 else 0
            reduction_str = f"-{ratio:.1f}%" if ratio >= 0 else f"+{abs(ratio):.1f}%"
            print(f" [✓] Converted: {rel_src} -> {rel_dst}")
            print(f"     Size: {format_size(orig_s)} -> {format_size(new_s)} ({reduction_str})")
        elif status == "skipped":
            stats["skipped"] += 1
            print(f" [→] Skipped (already exists): {rel_dst}")
        elif status == "warning":
            stats["converted"] += 1
            print(f" [!] Warning: {rel_src} ({res['reason']})")
        else:
            stats["errors"] += 1
            print(f" [✗] Error converting {rel_src}: {res['reason']}")

    print("\n" + "=" * 60)
    print("                     SUMMARY")
    print("=" * 60)
    print(f" Total photos found:    {len(image_files)}")
    print(f" Converted:             {stats['converted']}")
    print(f" Skipped:               {stats['skipped']}")
    print(f" Errors:                {stats['errors']}")

    if stats["converted"] > 0 and stats["total_orig_size"] > 0:
        saved = stats["total_orig_size"] - stats["total_new_size"]
        saved_pct = (saved / stats["total_orig_size"]) * 100
        print(f" Original size:         {format_size(stats['total_orig_size'])}")
        print(f" WebP size:             {format_size(stats['total_new_size'])}")
        if saved >= 0:
            print(f" Space saved:           {format_size(saved)} ({saved_pct:.1f}% reduction)")
        else:
            print(f" Size difference:       +{format_size(abs(saved))}")
    print("=" * 60)

def main():
    parser = argparse.ArgumentParser(
        description="Convert all photos in a project folder and its subdirectories to WebP format."
    )
    parser.add_argument(
        "path",
        nargs="?",
        default="",
        help="Path to the project folder (e.g., assets/renovation/Ozgol-renovation-project or Ozgol-renovation-project)"
    )
    parser.add_argument(
        "-p", "--path",
        dest="flag_path",
        default="",
        help="Alternative flag for specifying project folder path"
    )
    parser.add_argument(
        "-q", "--quality",
        type=int,
        default=85,
        help="WebP compression quality (1-100, default: 85)"
    )
    parser.add_argument(
        "-l", "--lossless",
        action="store_true",
        help="Use lossless WebP compression (ideal for diagrams/drawings)"
    )
    parser.add_argument(
        "-f", "--overwrite",
        action="store_true",
        help="Overwrite existing .webp files if they already exist"
    )
    parser.add_argument(
        "-d", "--delete-original",
        action="store_true",
        help="Delete original photo files after successful conversion"
    )

    args = parser.parse_args()
    raw_path = args.path or args.flag_path

    # If no path provided on command line, prompt interactively
    if not raw_path:
        print("=" * 60)
        print("  BLOCK ARCHITECTURE STUDIO - WEBP CONVERTER")
        print("=" * 60)
        raw_path = input("Enter project folder path (e.g., assets/renovation/Ozgol-renovation-project): ").strip()

    if not raw_path:
        print("[!] Error: No project folder path provided.")
        sys.exit(1)

    project_dir = resolve_project_path(raw_path)
    if not project_dir:
        print(f"\n[!] Error: Could not find directory: '{raw_path}'")
        print("    Please check the path and try again.")
        print("    Examples:")
        print("      assets/renovation/Ozgol-renovation-project")
        print("      villa/Damas-Villa")
        print("      /Users/.../Documents/block-site/assets/villa/Khane-Darya-No.199")
        sys.exit(1)

    process_project(
        project_dir=project_dir,
        quality=args.quality,
        lossless=args.lossless,
        overwrite=args.overwrite,
        delete_original=args.delete_original
    )

if __name__ == "__main__":
    main()
