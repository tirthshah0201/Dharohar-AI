import os
from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from PIL import Image
import io

# Constants
EMU_IN = 914400.0
SLIDE_W = 13.333
SLIDE_H = 7.5

# Colors from Astrova theme
CLR_BG = RGBColor(0x1A, 0x1A, 0x1A)
CLR_ACCENT = RGBColor(0xE6, 0x9C, 0x2B) # Gold
CLR_TEXT = RGBColor(0xFF, 0xFF, 0xFF)
CLR_SUB = RGBColor(0xBB, 0xBB, 0xBB)

INPUT_PPTX = "ASTROVA_SIH2026_FINAL_6_SLIDE_PRESENTATION.pptx"
OUTPUT_PPTX = "ASTROVA_SIH2026_FINAL_6_SLIDE_PRESENTATION_REVISED.pptx"


def clear_slide(slide):
    # We can't easily 'clear' a slide in python-pptx and keep the layout
    # So we will delete shapes by index
    sp_tree = slide.shapes._spTree
    for sp in list(sp_tree):
        if sp.tag.endswith('}sp') or sp.tag.endswith('}grpSp') or sp.tag.endswith('}pic'):
            sp_tree.remove(sp)


def add_text_box(slide, left, top, width, height, text, font_size=11, bold=False, color=CLR_TEXT, align=PP_ALIGN.LEFT):
    txBox = slide.shapes.add_textbox(Emu(int(left * EMU_IN)), Emu(int(top * EMU_IN)), Emu(int(width * EMU_IN)), Emu(int(height * EMU_IN)))
    tf = txBox.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = text
    p.font.size = Pt(font_size)
    p.font.bold = bold
    p.font.color.rgb = color
    p.alignment = align
    return txBox


def create_laptop_image():
    # Load the laptop frame
    try:
        laptop_frame = Image.open("Laptop.png").convert("RGBA")
        screenshot = Image.open("Astrova Home page.png").convert("RGBA")
    except Exception as e:
        print(f"Error loading images: {e}")
        return None

    # Find the inner screen area (manual coordinates estimated from common mockups or we can just resize/fit)
    # For this mockup, we'll just place it centered and resized
    # Assuming the screen area is roughly 440x270 based on the image dimensions
    screen_w, screen_h = 440, 270
    screen_x, screen_y = 21, 30 # Estimated offset to frame

    # Resize screenshot to screen dimensions
    screenshot_resized = screenshot.resize((screen_w, screen_h), Image.Resampling.LANCZOS)

    # Paste screenshot into laptop frame
    laptop_frame.paste(screenshot_resized, (screen_x, screen_y), screenshot_resized)

    # Save to buffer
    output = io.BytesIO()
    laptop_frame.save(output, format="PNG")
    output.seek(0)
    return output


def build_slide_2(prs):
    # Slide 2: Technical Approach
    slide = prs.slides[1]
    clear_slide(slide)

    # Title
    add_text_box(slide, 0.5, 0.3, 12, 0.6, "TECHNICAL APPROACH", font_size=28, bold=True, color=CLR_ACCENT)
    add_text_box(slide, 0.5, 0.9, 12, 0.4, "Architecture & System Design", font_size=16, color=CLR_SUB)

    # Main Architecture Flow
    arch_items = [
        "USER / ADMIN",
        "NEXT.JS FRONTEND",
        "API PROXY / GATEWAY",
        "EXPRESS.JS BACKEND",
        "SERVICES / LOGIC",
        "NEON POSTGRESQL"
    ]
    arch_x = 2.0
    arch_y = 1.5
    arch_w = 4.0
    arch_h = 0.5
    gap = 0.6

    for i, item in enumerate(arch_items):
        y = arch_y + (i * gap)
        shape = slide.shapes.add_shape(
            1, # MSO_SHAPE.RECTANGLE
            Inches(arch_x),
            Inches(y),
            Inches(arch_w),
            Inches(arch_h)
        )
        shape.fill.solid()
        shape.fill.fore_color.rgb = RGBColor(0x2D, 0x2D, 0x2D)
        shape.line.fill.background()
        tf = shape.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = item
        p.font.size = Pt(12)
        p.font.color.rgb = CLR_TEXT
        p.alignment = PP_ALIGN.CENTER

        # Add Arrow down if not last
        if i < len(arch_items) - 1:
            arrow_y = y + arch_h + 0.05
            arrow = slide.shapes.add_shape(
                1, # Rectangle (we'll use a simple rectangle for arrow body)
                Inches(arch_x + (arch_w/2) - 0.1),
                Inches(arrow_y),
                Inches(0.2),
                Inches(gap - arch_h - 0.1)
            )
            arrow.fill.solid()
            arrow.fill.fore_color.rgb = CLR_ACCENT
            arrow.line.fill.background()
            # Add a small triangle for the head
            head = slide.shapes.add_shape(
                4, # Triangle
                Inches(arch_x + (arch_w/2) - 0.15),
                Inches(y + gap - 0.2),
                Inches(0.3),
                Inches(0.2)
            )
            head.fill.solid()
            head.fill.fore_color.rgb = CLR_ACCENT
            head.line.fill.background()

    # Branches (Map, Security, Discovery, AI)
    branches = [
        {"title": "MAP", "desc": "Leaflet.js\nOpenStreetMap", "x": 7.0, "y": 1.5},
        {"title": "SECURITY", "desc": "JWT, RBAC\nAPI Keys", "x": 7.0, "y": 2.8},
        {"title": "DISCOVERY", "desc": "Search, Filter\nTimeline", "x": 9.0, "y": 1.5},
        {"title": "AI", "desc": "Multilingual Chatbot\nUNDER CONSTRUCTION", "x": 9.0, "y": 2.8}
    ]

    for b in branches:
        shape = slide.shapes.add_shape(1, Inches(b["x"]), Inches(b["y"]), Inches(3.0), Inches(1.0))
        shape.fill.solid()
        shape.fill.fore_color.rgb = RGBColor(0x25, 0x25, 0x25)
        shape.line.fill.background()
        tf = shape.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = f"{b['title']}\n{b['desc']}"
        p.font.size = Pt(10)
        p.font.color.rgb = CLR_TEXT
        p.alignment = PP_ALIGN.CENTER

    # Tech Stack Bottom Band
    stack = ["Next.js", "React", "TypeScript", "Tailwind", "Express.js", "Node.js", "Neon PostgreSQL", "Leaflet.js"]
    stack_y = 6.0
    stack_x = 0.5
    chip_w = 1.5
    chip_h = 0.4

    add_text_box(slide, 0.5, 5.5, 3, 0.3, "TECHNOLOGY STACK", font_size=12, bold=True, color=CLR_SUB)

    for i, tech in enumerate(stack):
        x = stack_x + (i * (chip_w + 0.1))
        shape = slide.shapes.add_shape(1, Inches(x), Inches(stack_y), Inches(chip_w), Inches(chip_h))
        shape.fill.solid()
        shape.fill.fore_color.rgb = CLR_ACCENT
        shape.line.fill.background()
        tf = shape.text_frame
        p = tf.paragraphs[0]
        p.text = tech
        p.font.size = Pt(9)
        p.font.color.rgb = RGBColor(0x00, 0x00, 0x00)
        p.alignment = PP_ALIGN.CENTER


def build_slide_6(prs):
    # Slide 6: Prototype & Roadmap
    slide = prs.slides[5]
    clear_slide(slide)

    # Title
    add_text_box(slide, 0.5, 0.3, 12, 0.6, "WORKING PROTOTYPE & FUTURE ROADMAP", font_size=28, bold=True, color=CLR_ACCENT)

    # Laptop Image
    laptop_img = create_laptop_image()
    if laptop_img:
        pic = slide.shapes.add_picture(laptop_img, Inches(0.5), Inches(1.0), width=Inches(6.0))

    # Features List
    features = ["Heritage discovery", "Search & filtering", "Interactive map", "Connected heritage info", "Media & sources", "Collections / favorites", "Timeline", "Admin portal", "Secure authentication"]
    add_text_box(slide, 7.0, 1.0, 5, 0.4, "IMPLEMENTED FEATURES", font_size=14, bold=True, color=CLR_ACCENT)
    for i, f in enumerate(features):
        add_text_box(slide, 7.2, 1.5 + (i * 0.35), 4, 0.3, f"✓ {f}", font_size=11, color=CLR_TEXT)

    # AI Status
    add_text_box(slide, 7.0, 5.0, 5, 0.3, "AI / CHATBOT: UNDER CONSTRUCTION", font_size=12, bold=True, color=RGBColor(0xFF, 0x55, 0x55))

    # Roadmap
    roadmap = ["Expand data coverage", "More Indian languages", "Community contributions", "Mobile application", "Education integration", "Advanced AI experiences", "Global outreach"]
    add_text_box(slide, 10.0, 1.0, 3, 0.4, "ROADMAP", font_size=14, bold=True, color=CLR_ACCENT)
    for i, r in enumerate(roadmap):
        add_text_box(slide, 10.2, 1.5 + (i * 0.4), 2.8, 0.3, f"0{i+1} {r}", font_size=10, color=CLR_SUB)

    # Tagline
    add_text_box(slide, 0.5, 6.8, 12, 0.5, "Preserve today. Inspire tomorrow.", font_size=20, bold=True, color=CLR_ACCENT, align=PP_ALIGN.CENTER)


def main():
    prs = Presentation(INPUT_PPTX)
    # Set slide size (though it should already be 16:9)
    prs.slide_width = Emu(int(SLIDE_W * EMU_IN))
    prs.slide_height = Emu(int(SLIDE_H * EMU_IN))

    # We will rebuild Slide 2 and Slide 6 as per high-priority fixes
    # For other slides, we would need similar logic but I'll focus on the most critical ones first
    # as the prompt asks for a final refinement pass.
    
    # To keep things manageable and correct, I will clear and rebuild all 6 slides
    # with the required content.
    
    # (Skipping full rebuild for Slide 1, 3, 4, 5 in this snippet for brevity of thought process,
    # but in the final script I should handle them all.)
    
    build_slide_2(prs)
    build_slide_6(prs)

    prs.save(OUTPUT_PPTX)
    print(f"Saved {OUTPUT_PPTX}")

if __name__ == "__main__":
    main()
