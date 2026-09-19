import re

with open('js/project-template.js', 'r', encoding='utf-8') as f:
    js = f.read()

# 1. Generate drawings HTML
drawings_logic = """
    let drawingsHTML = '';
    const d = projectConfig.drawings || [];
    if (d.length > 0) {
      drawingsHTML = `<div class="gallery-triptych reveal">`;
      d.forEach(img => {
        drawingsHTML += `<img src="${img}" class="lightbox-trigger" loading="lazy">`;
      });
      drawingsHTML += `</div>`;
    }
    
    let spatialHTML = '';
"""
js = js.replace("let spatialHTML = '';", drawings_logic)

# 2. Add translation
i18n_logic = """
    const i18n = {
      narrative: currentLang === 'fa' ? 'شرح پروژه' : 'PROJECT NARRATIVE',
      archive: currentLang === 'fa' ? 'آرشیو بصری' : 'VISUAL ARCHIVE',
      drawings: currentLang === 'fa' ? 'نقشه‌ها و اسناد' : 'DRAWINGS & DOCUMENTS',
      spatial: currentLang === 'fa' ? 'نقشه و پلان' : 'SPATIAL MAPPING',
      specs: currentLang === 'fa' ? 'مشخصات و متریال' : 'MATERIALITY & SPECIFICATIONS',
    };
"""
js = re.sub(r"const i18n = \{[^}]+\};", i18n_logic.strip(), js, flags=re.DOTALL)

# 3. Add section to main template
section_logic = """
      <!-- 03: DRAWINGS -->
      ${drawingsHTML ? `
      <div class="architectural-section reveal tonal-shift-light" id="section-drawings">
        <div class="section-index">
          <span class="idx-num">03 /</span>
          <span class="idx-title">${i18n.drawings}</span>
        </div>
        <div class="section-body">
          ${drawingsHTML}
        </div>
      </div>
      ` : ''}

      <!-- 04: SPATIAL MAPPING -->
"""
js = js.replace("<!-- 03: SPATIAL MAPPING -->", section_logic)
js = js.replace('idx-num">04 /</span>', 'idx-num">05 /</span>')
js = js.replace('<!-- 04: MATERIALITY -->', '<!-- 05: MATERIALITY -->')

with open('js/project-template.js', 'w', encoding='utf-8') as f:
    f.write(js)

print("Drawings UI logic injected.")
