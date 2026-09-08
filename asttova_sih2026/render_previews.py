"""
Render Astrova SIH 2026 slides as preview images.
Uses Pillow to create visual representations of each slide.
"""

from pptx import Presentation
from pptx.util import Emu, Pt
from PIL import Image, ImageDraw, ImageFont
import os

# Design system colors
CREAM = (250, 245, 238)
TERRACOTTA = (196, 90, 60)
DEEP_BROWN = (61, 43, 31)
HERITAGE_GOLD = (201, 169, 110)
SAGE_GREEN = (92, 122, 90)
CONTROLLED_RED = (184, 59, 42)
WHITE = (255, 255, 255)
LIGHT_GRAY = (240, 237, 232)
MID_GRAY = (140, 122, 107)

# Slide dimensions
SLIDE_W_PX = 1920
SLIDE_H_PX = 1080
SCALE = SLIDE_W_PX / 13.333  # EMU to pixels

pptx_path = r"C:\Users\Dev\OneDrive\Desktop\SIH Reports\Docs For ppt\ASTROVA_SIH2026_FINAL_6_SLIDE_PRESENTATION.pptx"
output_dir = r"C:\Users\Dev\OneDrive\Desktop\SIH Reports\Docs For ppt\previews"

os.makedirs(output_dir, exist_ok=True)

def emu_to_px(emu_val):
    """Convert EMU to pixels."""
    return int(emu_val * SCALE / 914400)

def get_fill_color(shape):
    """Extract fill color from shape."""
    try:
        if shape.fill and shape.fill.type is not None:
            if hasattr(shape.fill.fore_color, 'rgb'):
                rgb = shape.fill.fore_color.rgb
                return (rgb[0], rgb[1], rgb[2])
    except:
        pass
    return None

def render_slide(slide, slide_num):
    """Render a single slide as an image."""
    img = Image.new('RGB', (SLIDE_W_PX, SLIDE_H_PX), CREAM)
    draw = ImageDraw.Draw(img)
    
    # Try to load fonts
    try:
        font_large = ImageFont.truetype("arial.ttf", 48)
        font_medium = ImageFont.truetype("arial.ttf", 32)
        font_small = ImageFont.truetype("arial.ttf", 20)
        font_tiny = ImageFont.truetype("arial.ttf", 14)
    except:
        font_large = ImageFont.load_default()
        font_medium = ImageFont.load_default()
        font_small = ImageFont.load_default()
        font_tiny = ImageFont.load_default()
    
    # Draw each shape
    for shape in slide.shapes:
        x = emu_to_px(shape.left)
        y = emu_to_px(shape.top)
        w = emu_to_px(shape.width)
        h = emu_to_px(shape.height)
        
        # Get fill color
        fill_color = get_fill_color(shape)
        
        # Draw shape based on type
        if hasattr(shape, 'shape_type'):
            shape_type = str(shape.shape_type)
            
            # Rectangle or rounded rectangle
            if 'RECTANGLE' in shape_type or 'ROUNDED' in shape_type:
                if fill_color:
                    draw.rectangle([x, y, x + w, y + h], fill=fill_color)
                else:
                    draw.rectangle([x, y, x + w, y + h], outline=LIGHT_GRAY)
            
            # Oval/Circle
            elif 'OVAL' in shape_type:
                if fill_color:
                    draw.ellipse([x, y, x + w, y + h], fill=fill_color)
                else:
                    draw.ellipse([x, y, x + w, y + h], outline=LIGHT_GRAY)
            
            # Text box
            elif 'TEXT' in shape_type or 'TEXTBOX' in shape_type:
                if shape.has_text_frame:
                    text = shape.text_frame.text[:50]  # Truncate long text
                    if text:
                        # Determine font size from first paragraph
                        font_size = 14
                        if shape.text_frame.paragraphs:
                            p = shape.text_frame.paragraphs[0]
                            if p.runs:
                                font_size = p.runs[0].font.size or 14
                        
                        draw.text((x + 5, y + 5), text, fill=DEEP_BROWN, font=font_small)
        
        # Default: draw outline
        else:
            draw.rectangle([x, y, x + w, y + h], outline=LIGHT_GRAY)
    
    # Add slide number
    draw.text((SLIDE_W_PX - 100, SLIDE_H_PX - 40), f"{slide_num} / 6", 
              fill=MID_GRAY, font=font_tiny)
    
    return img

def main():
    prs = Presentation(pptx_path)
    
    for i, slide in enumerate(prs.slides, 1):
        print(f"Rendering slide {i}...")
        img = render_slide(slide, i)
        
        output_path = os.path.join(output_dir, f"slide_{i}.png")
        img.save(output_path, "PNG", quality=95)
        print(f"  Saved: {output_path}")
    
    print(f"\nAll {len(prs.slides)} slides rendered to {output_dir}")

if __name__ == "__main__":
    main()
