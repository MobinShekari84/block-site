with open('js/script.js', 'r') as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    new_lines.append(line)
    if "pTitle.textContent = t.projects.title;" in line:
        new_lines.append("    // About Summary section\\n")
        new_lines.append("    const asLabel = document.getElementById('aboutSummaryLabel'); if(asLabel) asLabel.textContent = t.aboutSummary.label;\\n")
        new_lines.append("    const asTitle = document.getElementById('aboutSummaryTitle'); if(asTitle) asTitle.textContent = t.aboutSummary.title;\\n")
        new_lines.append("    const asText = document.getElementById('aboutSummaryText');\\n")
        new_lines.append("    if(asText) {\\n")
        new_lines.append("      asText.textContent = t.aboutSummary.text;\\n")
        new_lines.append("      if(isFa) asText.classList.add('lang-fa'); else asText.classList.remove('lang-fa');\\n")
        new_lines.append("    }\\n")
        new_lines.append("    const asBtn = document.getElementById('aboutSummaryBtnText'); if(asBtn) asBtn.textContent = t.aboutSummary.btn;\\n")

with open('js/script.js', 'w') as f:
    f.writelines(new_lines)
