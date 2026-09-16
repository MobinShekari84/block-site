import re
with open('js/script.js', 'r') as f:
    js = f.read()

js = js.replace("\\n", "\n")

with open('js/script.js', 'w') as f:
    f.write(js)
