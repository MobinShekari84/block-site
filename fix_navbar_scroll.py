import re
with open('script.js', 'r') as f:
    js = f.read()

# Only toggle 'scrolled' if we are not on a subpage
old_scroll = """  const handleNavScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  };"""

new_scroll = """  const handleNavScroll = () => {
    if (!document.body.classList.contains('subpage')) {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    }
  };"""

js = js.replace(old_scroll, new_scroll)

with open('script.js', 'w') as f:
    f.write(js)
