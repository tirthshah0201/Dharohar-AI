import os
from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
from PIL import Image
import io

# Constants
EMU_IN = 914400.0
SLIDE_W = 13.333
SLIDE_H = 7.5

# Astrova Theme Colors
CLR_BG = RGBColor(0x1A, 0x1A, 0x1A)
CLR_ACCENT = RGBColor(0xE6, 0x9C, 0x2B) # Gold
CLR_TEXT = RGBColor(0xFF, 0xFF, 0xFF)
CLR_SUB = RGBColor(0xBB, 0xBB, 0xBB)
CLR_CARD = RGBColor(0x2A, 0x2A, 0x2A)
CLR_CARD_BORDER = RGBColor(0x44, 0x44, 0x44)

INPUT_PPTX = "ASTROVA_SIH2026_FINAL_6_SLIDE_PRESENTATION.pptx"
OUTPUT_PPTX = "ASTROVA_SIH2026_FINAL_6_SLIDE_PRESENTATION_REVISED.pptx"

def add_text_box(slide, left, top, width, height, text, font_size=11, bold=False, color=CLR_TEXT, align=PP_ALIGN.LEFT, word_wrap=True):
    txBox = slide.shapes.add_textbox(Emu(int(left * EMU_IN)), Emu(int(top * EMU_IN)), Emu(int(width * EMU_IN)), Emu(int(height * EMU_IN)))
    tf = txBox.text_frame
    tf.word_wrap = word_wrap
    p = tf.paragraphs[0]
    p.text = text
    p.font.size = Pt(font_size)
    p.font.bold = bold
    p.font.color.rgb = color
    p.alignment = align
    return txBox

def clear_slide(slide):
    sp_tree = slide.shapes._spTree
    for sp in list(sp_tree):
        if sp.tag.endswith('}sp') or sp.tag.endswith('}grpSp') or sp.tag.endswith('}pic'):
            sp_tree.remove(sp)

def create_laptop_image():
    try:
        laptop_frame = Image.open("Laptop.png").convert("RGBA")
        screenshot = Image.open("Astrova Home page.png").convert("RGBA")
    except Exception as e:
        print(f"Error loading images: {e}")
        return None

    # The Laptop.png seems to have a screen area. I'll estimate the crop/resize.
    # Laptop.png is 483x332.
    # Screenshot is 1898x993.
    # I'll crop the screenshot to roughly 16:9.5 ratio to fit the laptop screen.
    target_ratio = 440 / 260
    orig_w, orig_h = screenshot.size
    new_w = orig_h * target_ratio
    left = (orig_w - new_w) / 2
    screenshot_cropped = screenshot.crop((left, 0, left + new_w, orig_h))
    
    # Resize to fit laptop screen (approx 440x260)
    screenshot_resized = screenshot_cropped.resize((440, 260), Image.Resampling.LANCZOS)
    
    # Paste into laptop frame (offset approx 21, 30)
    laptop_frame.paste(screenshot_resized, (21, 30), screenshot_resized)
    
    output = io.BytesIO()
    laptop_frame.save(output, format="PNG")
    output.seek(0)
    return output

def add_rect(slide, left, top, width, height, fill_color=CLR_CARD, line_color=CLR_CARD_BORDER, line_width=Pt(1)):
    shape = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 
                                   Inches(left), Inches(top), 
                                   Inches(width), Inches(height))
    shape.fill.solid()
    shape.fill.fore_color.rgb = fill_color
    shape.line.color.rgb = line_color
    shape.line.width = line_width
    return shape

def add_arrow_down(slide, x, y, height, color=CLR_ACCENT):
    # Using a simple line or a chevron shape for arrows
    # To be safe and editable, we'll use a line
    shape = slide.shapes.add_connector(1, Inches(x), Inches(y), Inches(x), Inches(y + height))
    shape.line.color.rgb = color
    shape.line.width = Pt(2)
    # Add a small triangle at the bottom
    head = slide.shapes.add_shape(MSO_SHAPE.ISOSCELES_TRIANGLE, Inches(x-0.05), Inches(y+height-0.1), Inches(0.1), Inches(0.15))
    head.fill.solid()
    head.fill.fore_color.rgb = color
    head.line.fill.background()
    head.rotation = 180.0
    return shape

def build_slide_1(prs):
    slide = prs.slides[0]
    clear_slide(slide)
    add_text_box(slide, 0.5, 0.3, 10, 0.6, "ASTROVA connects heritage dimensions into one exploration journey", font_size=22, bold=True, color=CLR_ACCENT)

    # Problem / Solution Cards
    problems = [
        "Heritage data spread across government portals",
        "Difficult to explore heritage location context",
        "No way to see how places, periods, people connect",
        "No unified search, filtering, or personalization",
        "Information mostly in English; limited accessibility"
    ]
    solutions = [
        "Structured database of heritage entities",
        "Interactive Leaflet/OpenStreetMap exploration",
        "Connected relationships across heritage data",
        "Full-text search, collections, and timeline",
        "Multilingual design toward broader support"
    ]

    card_w = 5.8
    start_y = 1.2
    gap = 0.6
    
    # Problem Header
    add_text_box(slide, 0.5, start_y - 0.3, 5, 0.3, "FRAGMENTED SOURCES", font_size=14, bold=True, color=RGBColor(0xFF, 0x55, 0x55))
    # Solution Header
    add_text_box(slide, 6.5, start_y - 0.3, 5, 0.3, "CONNECTED HERITAGE", font_size=14, bold=True, color=RGBColor(0x55, 0xFF, 0x55))
    
    for i in range(5):
        y = start_y + (i * gap)
        # Problem Card
        p_shape = add_rect(slide, 0.5, y, card_w, 0.45)
        tf = p_shape.text_frame
        p = tf.paragraphs[0]
        p.text = f"• {problems[i]}"
        p.font.size = Pt(11)
        p.font.color.rgb = CLR_TEXT
        p.alignment = PP_ALIGN.LEFT
        p.margin_left = Inches(0.1)

        # Solution Card
        s_shape = add_rect(slide, 6.5, y, card_w, 0.45)
        tf = s_shape.text_frame
        p = tf.paragraphs[0]
        p.text = f"• {solutions[i]}"
        p.font.size = Pt(11)
        p.font.color.rgb = CLR_TEXT
        p.alignment = PP_ALIGN.LEFT
        p.margin_left = Inches(0.1)

        # Arrow between
        add_arrow_down(slide, 6.25, y + 0.1, 0.25, CLR_ACCENT)

    # Dimensions at the bottom
    dims = ["Places", "History", "People & Culture", "Media", "Sources", "Relationships", "Collections", "Exploration"]
    add_text_box(slide, 0.5, 4.5, 12, 0.3, "KEY DIMENSIONS", font_size=12, bold=True, color=CLR_SUB)
    for i, d in enumerate(dims):
        x = 0.5 + (i * 1.5)
        shape = add_rect(slide, x, 4.9, 1.3, 0.4, CLR_CARD, CLR_ACCENT)
        tf = shape.text_frame
        tf.paragraphs[0].text = d
        tf.paragraphs[0].font.size = Pt(10)
        tf.paragraphs[0].font.color.rgb = CLR_ACCENT
        tf.paragraphs[0].alignment = PP_ALIGN.CENTER
        
    # Transition Graphic
    add_text_box(slide, 0.5, 5.5, 4, 0.5, "FRAGMENTED SOURCES", font_size=12, bold=True, color=RGBColor(0xFF, 0x55, 0x55))
    add_text_box(slide, 6.0, 5.5, 1, 0.5, "→", font_size=20, bold=True, color=CLR_ACCENT)
    add_text_box(slide, 7.0, 5.5, 4, 0.5, "CONNECTED HERITAGE", font_size=12, bold=True, color=RGBColor(0x55, 0xFF, 0x55))
    add_text_box(slide, 11.5, 5.5, 1, 0.5, "→", font_size=20, bold=True, color=CLR_ACCENT)
    add_text_box(slide, 0.5, 6.2, 12, 0.5, "ONE EXPLORATION JOURNEY", font_size=18, bold=True, color=CLR_ACCENT, align=PP_ALIGN.CENTER)

def build_slide_2(prs):
    slide = prs.slides[1]
    clear_slide(slide)
    add_text_box(slide, 0.5, 0.3, 12, 0.6, "TECHNICAL APPROACH", font_size=28, bold=True, color=CLR_ACCENT)
    
    # Architecture Flow (Center)
    arch_items = ["USER / ADMIN", "NEXT.JS FRONTEND", "API PROXY / GATEWAY", "EXPRESS.JS BACKEND", "SERVICES / LOGIC", "NEON POSTGRESQL"]
    arch_x = 4.5
    arch_y = 1.5
    arch_w = 4.5
    arch_h = 0.45
    gap = 0.6

    for i, item in enumerate(arch_items):
        y = arch_y + (i * gap)
        shape = add_rect(slide, arch_x, y, arch_w, arch_h)
        tf = shape.text_frame
        tf.paragraphs[0].text = item
        tf.paragraphs[0].font.size = Pt(12)
        tf.paragraphs[0].font.color.rgb = CLR_TEXT
        tf.paragraphs[0].alignment = PP_ALIGN.CENTER
        tf.paragraphs[0].font.bold = True
        
        if i < len(arch_items) - 1:
            add_arrow_down(slide, arch_x + arch_w/2, y + arch_h, gap - arch_h - 0.05)

    # Branches
    # MAP (Left)
    add_rect(slide, 0.5, 2.5, 3.5, 1.5)
    add_text_box(slide, 0.7, 2.6, 3, 0.3, "MAP", font_size=12, bold=True, color=CLR_ACCENT)
    add_text_box(slide, 0.7, 2.9, 3, 0.8, "Leaflet.js\nOpenStreetMap\n54 Locations", font_size=11, color=CLR_SUB)
    add_arrow_down(slide, 4.0, 3.0, 0.5, CLR_CARD_BORDER) # Connect to Proxy

    # SECURITY (Right)
    add_rect(slide, 9.5, 1.5, 3.5, 2.5)
    add_text_box(slide, 9.7, 1.6, 3, 0.3, "SECURITY", font_size=12, bold=True, color=CLR_ACCENT)
    add_text_box(slide, 9.7, 2.0, 3, 1.5, "• JWT + HttpOnly Cookie\n• RBAC\n• API Key\n• Rate Limiting", font_size=11, color=CLR_SUB)
    
    # DISCOVERY (Right Bottom)
    add_rect(slide, 9.5, 4.2, 3.5, 1.5)
    add_text_box(slide, 9.7, 4.3, 3, 0.3, "DISCOVERY", font_size=12, bold=True, color=CLR_ACCENT)
    add_text_box(slide, 9.7, 4.6, 3, 0.8, "Search, Filtering\nTimeline, Collections\nFavorites, Relationships", font_size=11, color=CLR_SUB)

    # AI (Left Bottom)
    add_rect(slide, 0.5, 4.2, 3.5, 1.5)
    add_text_box(slide, 0.7, 4.3, 3, 0.3, "AI", font_size=12, bold=True, color=CLR_ACCENT)
    add_text_box(slide, 0.7, 4.6, 3, 0.5, "Multilingual Chatbot\nUNDER CONSTRUCTION", font_size=11, color=CLR_SUB)

    # Tech Stack Bottom
    stack = ["Next.js", "React", "TypeScript", "Tailwind", "Express.js", "Node.js", "Neon PostgreSQL", "Leaflet.js"]
    add_text_box(slide, 0.5, 6.0, 12, 0.3, "TECHNOLOGY STACK", font_size=12, bold=True, color=CLR_SUB)
    for i, tech in enumerate(stack):
        x = 0.5 + (i * 1.5)
        shape = add_rect(slide, x, 6.4, 1.3, 0.4, CLR_ACCENT, CLR_ACCENT)
        tf = shape.text_frame
        tf.paragraphs[0].text = tech
        tf.paragraphs[0].font.size = Pt(9)
        tf.paragraphs[0].font.color.rgb = RGBColor(0x00, 0x00, 0x00)
        tf.paragraphs[0].alignment = PP_ALIGN.CENTER

def build_slide_3(prs):
    slide = prs.slides[2]
    clear_slide(slide)
    add_text_box(slide, 0.5, 0.3, 12, 0.6, "FEASIBILITY & VIABILITY", font_size=28, bold=True, color=CLR_ACCENT)

    # Feasible Today
    add_rect(slide, 0.5, 1.2, 5.5, 3.5)
    add_text_box(slide, 0.7, 1.3, 5, 0.4, "FEASIBLE TODAY", font_size=16, bold=True, color=CLR_ACCENT)
    items_today = [
        "Existing and open technologies",
        "Trusted/public data sources",
        "Working prototype",
        "Modular architecture",
        "Reasonable maintenance path"
    ]
    for i, item in enumerate(items_today):
        add_text_box(slide, 1.0, 1.8 + (i * 0.5), 5, 0.4, f"✓ {item}", font_size=11, color=CLR_TEXT)

    # Viable Tomorrow
    add_rect(slide, 6.5, 1.2, 6.5, 3.5)
    add_text_box(slide, 6.7, 1.3, 6, 0.4, "VIABLE TOMORROW", font_size=16, bold=True, color=CLR_ACCENT)
    items_tomorrow = [
        "More heritage data", "More states", "More languages",
        "Education", "Tourism", "Research", "Institutional collaboration"
    ]
    for i, item in enumerate(items_tomorrow):
        add_text_box(slide, 7.0, 1.8 + (i * 0.45), 6, 0.4, f"→ {item}", font_size=11, color=CLR_TEXT)

    # Risks
    add_text_box(slide, 0.5, 5.0, 12, 0.4, "RISK → MITIGATION", font_size=14, bold=True, color=CLR_SUB)
    risks = [
        ("DATA ACCURACY", "Trusted sources + verification"),
        ("DATA SCALE", "Structured schema + updates"),
        ("PERFORMANCE", "Optimized queries + pagination"),
        ("AI / MULTILINGUAL", "Source-grounded responses"),
        ("SECURITY", "Auth + Authorization + APIs")
    ]
    for i, (r, m) in enumerate(risks):
        x = 0.5 + (i * 2.5)
        add_rect(slide, x, 5.5, 2.3, 1.0)
        add_text_box(slide, x + 0.1, 5.6, 2.1, 0.3, r, font_size=10, bold=True, color=CLR_ACCENT)
        add_text_box(slide, x + 0.1, 5.9, 2.1, 0.5, m, font_size=10, color=CLR_TEXT)

    # Closing
    add_text_box(slide, 0.5, 6.8, 12, 0.5, "Feasible to build today. Viable to grow tomorrow.", font_size=18, bold=True, color=CLR_ACCENT, align=PP_ALIGN.CENTER)

def build_slide_4(prs):
    slide = prs.slides[3]
    clear_slide(slide)
    add_text_box(slide, 0.5, 0.3, 12, 0.6, "IMPACT & BENEFITS", font_size=28, bold=True, color=CLR_ACCENT)

    # Impact Dimensions (6)
    impacts = [
        ("EDUCATIONAL", "Interactive learning"),
        ("CULTURAL", "Awareness + visibility"),
        ("TOURISM", "Context-rich discovery"),
        ("SOCIAL", "Visibility for communities"),
        ("DIGITAL", "Structured heritage knowledge"),
        ("LONG-TERM", "Preservation + scalable docs")
    ]
    for i, (title, desc) in enumerate(impacts):
        col = i % 3
        row = i // 3
        x = 0.5 + (col * 4.2)
        y = 1.2 + (row * 1.5)
        add_rect(slide, x, y, 3.8, 1.2)
        add_text_box(slide, x + 0.2, y + 0.1, 3.4, 0.3, title, font_size=12, bold=True, color=CLR_ACCENT)
        add_text_box(slide, x + 0.2, y + 0.5, 3.4, 0.6, desc, font_size=11, color=CLR_TEXT)

    # Stakeholders
    stakeholders = ["Students", "Researchers", "Tourists", "Heritage Enthusiasts", "Local Communities", "Govt & Institutions"]
    add_text_box(slide, 0.5, 4.5, 12, 0.4, "WHO BENEFITS", font_size=14, bold=True, color=CLR_SUB)
    for i, s in enumerate(stakeholders):
        x = 0.5 + (i * 2.1)
        shape = add_rect(slide, x, 4.9, 1.9, 0.4, CLR_ACCENT, CLR_ACCENT)
        tf = shape.text_frame
        tf.paragraphs[0].text = s
        tf.paragraphs[0].font.size = Pt(10)
        tf.paragraphs[0].font.color.rgb = RGBColor(0x00, 0x00, 0x00)
        tf.paragraphs[0].alignment = PP_ALIGN.CENTER

    # Benefits
    benefits = [
        ("Easy Discovery", "Search, filter, explore"),
        ("Connected Knowledge", "Relationships, timeline"),
        ("Geographic Exploration", "Interactive map"),
        ("Personalized Experience", "Favorites, collections"),
        ("Reliable Information", "Trusted sources, admin review")
    ]
    add_text_box(slide, 0.5, 5.8, 12, 0.4, "KEY BENEFITS", font_size=14, bold=True, color=CLR_SUB)
    for i, (title, desc) in enumerate(benefits):
        x = 0.5 + (i * 2.5)
        add_text_box(slide, x, 6.2, 2.3, 0.3, title, font_size=11, bold=True, color=CLR_ACCENT)
        add_text_box(slide, x, 6.5, 2.3, 0.4, desc, font_size=10, color=CLR_TEXT)

def build_slide_5(prs):
    slide = prs.slides[4]
    clear_slide(slide)
    add_text_box(slide, 0.5, 0.3, 12, 0.6, "RESEARCH & REFERENCES", font_size=28, bold=True, color=CLR_ACCENT)

    # Insights
    insights = [
        "Heritage info is distributed across multiple sources.",
        "Structured systems improve organization.",
        "GIS strengthens geographic exploration.",
        "Digital platforms improve discovery and engagement.",
        "Multilingual access broadens accessibility."
    ]
    add_text_box(slide, 0.5, 1.2, 5, 0.4, "RESEARCH INSIGHTS", font_size=14, bold=True, color=CLR_ACCENT)
    for i, ins in enumerate(insights):
        add_text_box(slide, 0.7, 1.7 + (i * 0.5), 5, 0.4, f"• {ins}", font_size=11, color=CLR_TEXT)

    # References
    refs = [
        ("Indian Culture", "Ministry of Culture", "indianculture.gov.in"),
        ("Incredible India", "Ministry of Tourism", "incredibleindia.gov.in"),
        ("UNESCO ICH", "Intangible Cultural Heritage", "ich.unesco.org"),
        ("National Archives", "Govt of India", "nationalarchives.nic.in")
    ]
    add_text_box(slide, 7.0, 1.2, 6, 0.4, "OFFICIAL REFERENCES", font_size=14, bold=True, color=CLR_ACCENT)
    for i, (name, org, url) in enumerate(refs):
        y = 1.7 + (i * 0.8)
        add_text_box(slide, 7.2, y, 5, 0.3, f"{name} — {org}", font_size=11, bold=True, color=CLR_TEXT)
        add_text_box(slide, 7.2, y + 0.3, 5, 0.3, f"https://www.{url}/", font_size=10, color=CLR_SUB)

    # Stats attribution
    add_text_box(slide, 0.5, 6.5, 12, 0.5, "Source: Astrova project database package, Sep 2026", font_size=9, color=CLR_SUB, align=PP_ALIGN.CENTER)

def build_slide_6(prs):
    slide = prs.slides[5]
    clear_slide(slide)
    add_text_box(slide, 0.5, 0.3, 12, 0.6, "WORKING PROTOTYPE & FUTURE ROADMAP", font_size=28, bold=True, color=CLR_ACCENT)

    laptop_img = create_laptop_image()
    if laptop_img:
        slide.shapes.add_picture(laptop_img, Inches(0.5), Inches(1.2), width=Inches(5.5))

    features = ["Heritage discovery", "Search & filtering", "Interactive map", "Connected heritage info", "Media & sources", "Collections / favorites", "Timeline", "Admin portal", "Secure authentication"]
    add_text_box(slide, 6.5, 1.2, 4.0, 0.4, "IMPLEMENTED FEATURES", font_size=14, bold=True, color=CLR_ACCENT)
    for i, f in enumerate(features):
        add_text_box(slide, 6.7, 1.6 + (i * 0.35), 3.8, 0.3, f"✓ {f}", font_size=11, color=CLR_TEXT)

    add_text_box(slide, 6.5, 5.0, 4.0, 0.3, "AI / CHATBOT: UNDER CONSTRUCTION", font_size=12, bold=True, color=RGBColor(0xFF, 0x55, 0x55))

    roadmap = ["Expand data coverage", "More Indian languages", "Community contributions", "Mobile application", "Education integration", "Advanced AI experiences", "Global outreach"]
    add_text_box(slide, 10.8, 1.2, 2.5, 0.4, "ROADMAP", font_size=14, bold=True, color=CLR_ACCENT)
    for i, r in enumerate(roadmap):
        add_text_box(slide, 10.8, 1.6 + (i * 0.4), 2.5, 0.3, f"0{i+1} {r}", font_size=10, color=CLR_SUB)

    add_text_box(slide, 0.5, 6.8, 12, 0.5, "Preserve today. Inspire tomorrow.", font_size=20, bold=True, color=CLR_ACCENT, align=PP_ALIGN.CENTER)

def main():
    prs = Presentation(INPUT_PPTX)
    prs.slide_width = Emu(int(SLIDE_W * EMU_IN))
    prs.slide_height = Emu(int(SLIDE_H * EMU_IN))

    build_slide_1(prs)
    build_slide_2(prs)
    build_slide_3(prs)
    build_slide_4(prs)
    build_slide_5(prs)
    build_slide_6(prs)

    prs.save(OUTPUT_PPTX)
    print(f"Saved {OUTPUT_PPTX}")

if __name__ == "__main__":
    main()
