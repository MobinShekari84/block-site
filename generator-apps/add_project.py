import json
import os
import re
import sys
import subprocess

def prompt(text, default=""):
    val = input(f"{text} [{default}]: ").strip()
    return val if val else default

print("========================================")
print("  BLOCK STUDIO - PROJECT GENERATOR")
print("========================================")

script_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.dirname(script_dir)

# 1. Gather Info
slug = prompt("Project Slug (e.g., modern-villa)")
if not slug:
    print("Error: Slug is required.")
    sys.exit(1)

en_title = prompt("English Title", "Untitled Project")
fa_title = prompt("Farsi Title", "پروژه بدون نام")
en_category = prompt("English Category", "Residential")
fa_category = prompt("Farsi Category", "مسکونی")
year = prompt("Year", "2024")
en_location = prompt("English Location", "Tehran")
fa_location = prompt("Farsi Location", "تهران")

en_desc = prompt("English Description", "A modern minimal architecture project.")
fa_desc = prompt("Farsi Description", "یک پروژه معماری مینیمال و مدرن.")

en_area = prompt("English Area", "500 sqm")
fa_area = prompt("Farsi Area", "۵۰۰ متر مربع")
en_materials = prompt("English Materials", "Concrete, Glass")
fa_materials = prompt("Farsi Materials", "بتن، شیشه")

asset_folder = os.path.join(project_root, "assets", slug)
if not os.path.exists(asset_folder):
    os.makedirs(asset_folder, exist_ok=True)
    print(f"\n[+] Created image folder at assets/{slug}/")
    
# Generate JSON Object for projects.js
new_project_obj = f"""  {{
    id: '{slug}',
    slug: '{slug}',
    title: {{ en: '{en_title}', fa: '{fa_title}' }},
    category: {{ en: '{en_category}', fa: '{fa_category}' }},
    year: {year},
    location: {{ en: '{en_location}', fa: '{fa_location}' }},
    description: {{ 
      en: '{en_desc}', 
      fa: '{fa_desc}' 
    }},
    coverImage: '/assets/{slug}/cover.webp',
    galleryImages: [
      '/assets/{slug}/1.webp',
      '/assets/{slug}/2.webp'
    ],
    drawings: [],
    specs: {{ 
      area: {{ en: '{en_area}', fa: '{fa_area}' }},
      status: {{ en: 'Completed', fa: 'تکمیل شده' }},
      materials: {{ en: '{en_materials}', fa: '{fa_materials}' }},
      architect: {{ en: 'Block Studio', fa: 'استودیو بلاک' }}
    }},
    isFeatured: false,
    heroTheme: 'light',
  }},
"""

# Insert into projects.js right at the top
projects_js_path = os.path.join(project_root, "js", "data", "projects.js")
try:
    with open(projects_js_path, 'r', encoding="utf-8") as f:
        js_content = f.read()
    
    # Inject right after "export const projects = ["
    target = "export const projects = ["
    if target in js_content:
        js_content = js_content.replace(target, target + "\n" + new_project_obj)
        with open(projects_js_path, 'w', encoding="utf-8") as f:
            f.write(js_content)
        print(f"[+] Added '{slug}' to js/data/projects.js successfully.")
    else:
        print("[!] Could not find insertion point in projects.js. You may need to add it manually.")
except Exception as e:
    print(f"[!] Failed to modify projects.js: {e}")

# Run the SSG Builder
print("[+] Running SSG Builder to generate SEO-optimized HTML pages...")
try:
    subprocess.run(["node", os.path.join(script_dir, "build_ssg.mjs")], check=True)
except Exception as e:
    print(f"[!] SSG Build failed: {e}")

print("\n========================================")
print(f"DONE! Your new project '{en_title}' is ready.")
print(f"Next Steps:")
print(f"1. Put your images in assets/{slug}/")
print(f"2. Open js/data/projects.js and update the filenames")
print("========================================")
