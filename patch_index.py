import re

with open('index.html', 'r') as f:
    html = f.read()

about_summary_html = """
  <!-- ═══════════════════════════════════════════
       ABOUT SUMMARY SECTION
       ═══════════════════════════════════════════ -->
  <section class="section about-summary-section" id="about-summary" aria-label="About Us Summary">
    <div class="about-summary-container reveal">
      <header class="section-header">
        <div>
          <p class="text-label" id="aboutSummaryLabel">Studio Profile</p>
          <h2 class="heading-section" id="aboutSummaryTitle">About Us</h2>
        </div>
      </header>
      <div class="about-summary-content" style="max-width: 800px; padding: 0 clamp(1.5rem, 5vw, 4rem);">
        <p class="text-body" id="aboutSummaryText" style="font-size: clamp(1.2rem, 3vw, 1.8rem); margin-bottom: 2.5rem;">Block Architecture Studio is a Tehran-based practice dedicated to creating spaces where minimal form meets purposeful design. We believe in crafting environments that respond directly to their context.</p>
        <a href="/about.html" class="hero-btn about-summary-link" style="display: inline-flex;">
          <span id="aboutSummaryBtnText">Read More</span>
          <span class="hero-btn-arrow" aria-hidden="true"></span>
        </a>
      </div>
    </div>
  </section>
"""

html = html.replace('  <!-- ═══════════════════════════════════════════\n       FOOTER', about_summary_html + '\n  <!-- ═══════════════════════════════════════════\n       FOOTER')

with open('index.html', 'w') as f:
    f.write(html)
