import re
with open('damas-villa.html', 'r') as f:
    html = f.read()

# Add plan.webp to the gallery
gallery_injection = """      <div class="gallery-row full-width reveal">
        <img src="assets/damas-villa/plan.webp" alt="Damas Villa Floor Plan" class="gallery-img plan-img" data-index="9" style="background: white; padding: 2rem;">
      </div>
    </section>"""
html = html.replace('    </section>', gallery_injection)

with open('damas-villa.html', 'w') as f:
    f.write(html)
