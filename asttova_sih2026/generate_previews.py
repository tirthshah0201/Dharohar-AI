"""
Generate preview images from the Astrova SIH 2026 presentation.
Uses PyMuPDF to render PPTX pages as PNG images.
"""

import pymupdf
import os

pptx_path = r"C:\Users\Dev\OneDrive\Desktop\SIH Reports\Docs For ppt\ASTROVA_SIH2026_FINAL_6_SLIDE_PRESENTATION.pptx"
output_dir = r"C:\Users\Dev\OneDrive\Desktop\SIH Reports\Docs For ppt\previews"

os.makedirs(output_dir, exist_ok=True)

doc = pymupdf.open(pptx_path)
print(f"Opened PPTX with {len(doc)} pages")

for i, page in enumerate(doc):
    # Render at 2x resolution for quality
    mat = pymupdf.Matrix(2.0, 2.0)  # 2x zoom
    pix = page.get_pixmap(matrix=mat)
    
    output_path = os.path.join(output_dir, f"slide_{i+1}.png")
    pix.save(output_path)
    print(f"Saved: {output_path} ({pix.width}x{pix.height})")

doc.close()
print(f"\nAll {len(doc)} slides rendered to {output_dir}")
