import re
with open('js/damas-villa.js', 'r') as f:
    js = f.read()

if 'heroTheme' not in js:
    js = js.replace("id: 'damas-villa',", "id: 'damas-villa',\n  heroTheme: 'light', // 'light' means the image is light, so text should be dark")

with open('js/damas-villa.js', 'w') as f:
    f.write(js)
