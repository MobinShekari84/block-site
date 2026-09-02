import re
with open('js/project-template.js', 'r') as f:
    js = f.read()

theme_logic = """
    // --- Hero Theme Logic ---
    if (projectConfig.heroTheme === 'light') {
      const navbar = document.querySelector('.navbar');
      if (navbar) navbar.classList.add('navbar-dark-text');
    }
"""

js = js.replace("const titleEl = document.getElementById('projectTitle');", theme_logic + "\n    const titleEl = document.getElementById('projectTitle');")

with open('js/project-template.js', 'w') as f:
    f.write(js)
