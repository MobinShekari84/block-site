import re
with open('js/script.js', 'r') as f:
    js = f.read()

def safe_set(match):
    id_name = match.group(1)
    value = match.group(2)
    return f"const {id_name}_el = document.getElementById('{id_name}'); if ({id_name}_el) {id_name}_el.textContent = {value};"

# Find lines like: document.getElementById('footerDesc').textContent = t.footer.desc;
js = re.sub(r"document\.getElementById\('([^']+)'\)\.textContent\s*=\s*([^;]+);", safe_set, js)

with open('js/script.js', 'w') as f:
    f.write(js)
