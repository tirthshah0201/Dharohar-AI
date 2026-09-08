"""
ASTROVA SIH 2026 — 6-Slide Presentation Generator
Creates a professional, judge-facing presentation from scratch.
"""

from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
import os, math

# ============================================================
# DESIGN SYSTEM
# ============================================================

# Colors
CREAM       = RGBColor(0xFA, 0xF5, 0xEE)   # warm ivory background
TERRACOTTA  = RGBColor(0xC4, 0x5A, 0x3C)   # primary accent
DEEP_BROWN  = RGBColor(0x3D, 0x2B, 0x1F)   # dark text/headlines
HERITAGE_GOLD = RGBColor(0xC9, 0xA9, 0x6E) # muted gold accent
CONTROLLED_RED = RGBColor(0xB8, 0x3B, 0x2A) # warning/attention
WHITE       = RGBColor(0xFF, 0xFF, 0xFF)
LIGHT_GRAY  = RGBColor(0xF0, 0xED, 0xE8)
MID_GRAY    = RGBColor(0x8C, 0x7A, 0x6B)   # muted text
SOFT_TERRA  = RGBColor(0xE8, 0xD5, 0xC8)   # light terracotta tint
CARD_BG     = RGBColor(0xFF, 0xFF, 0xFF)    # card background
DARK_CARD   = RGBColor(0x4A, 0x36, 0x28)   # dark card
SAGE_GREEN  = RGBColor(0x5C, 0x7A, 0x5A)   # for "implemented" badges
WARM_BORDER = RGBColor(0xD9, 0xCC, 0xBC)   # subtle borders

# Fonts (specify names; if not available, PPTX falls back)
FONT_SERIF  = "Playfair Display"
FONT_SANS   = "Inter"

# Slide dimensions (16:9)
SLIDE_W = Inches(13.333)
SLIDE_H = Inches(7.5)

# Margins
MARGIN_X = Inches(0.75)
MARGIN_Y = Inches(0.55)

# ============================================================
# HELPER FUNCTIONS
# ============================================================

def create_presentation():
    prs = Presentation()
    prs.slide_width = SLIDE_W
    prs.slide_height = SLIDE_H
    return prs

def add_blank_slide(prs):
    layout = prs.slide_layouts[6]  # Blank layout
    slide = prs.slides.add_slide(layout)
    # Fill background with CREAM
    bg = slide.background
    fill = bg.fill
    fill.solid()
    fill.fore_color.rgb = CREAM
    return slide

def add_textbox(slide, left, top, width, height, text, font_name=FONT_SANS,
                font_size=14, color=DEEP_BROWN, bold=False, italic=False,
                alignment=PP_ALIGN.LEFT, anchor=MSO_ANCHOR.TOP):
    txBox = slide.shapes.add_textbox(left, top, width, height)
    txBox.text_frame.word_wrap = True
    tf = txBox.text_frame
    tf.paragraphs[0].text = ""
    # Set anchor
    try:
        tf.paragraphs[0].alignment = alignment
    except:
        pass
    p = tf.paragraphs[0]
    run = p.add_run()
    run.text = text
    run.font.name = font_name
    run.font.size = Pt(font_size)
    run.font.color.rgb = color
    run.font.bold = bold
    run.font.italic = italic
    p.alignment = alignment
    return txBox

def add_rich_textbox(slide, left, top, width, height):
    """Return (textbox, text_frame) for manual paragraph building."""
    txBox = slide.shapes.add_textbox(left, top, width, height)
    txBox.text_frame.word_wrap = True
    return txBox, txBox.text_frame

def add_paragraph(tf, text, font_name=FONT_SANS, font_size=12, color=DEEP_BROWN,
                  bold=False, italic=False, alignment=PP_ALIGN.LEFT,
                  space_before=Pt(0), space_after=Pt(4), level=0):
    if len(tf.paragraphs) == 1 and tf.paragraphs[0].text == "":
        p = tf.paragraphs[0]
    else:
        p = tf.add_paragraph()
    p.alignment = alignment
    p.space_before = space_before
    p.space_after = space_after
    p.level = level
    run = p.add_run()
    run.text = text
    run.font.name = font_name
    run.font.size = Pt(font_size)
    run.font.color.rgb = color
    run.font.bold = bold
    run.font.italic = italic
    return p

def add_shape(slide, shape_type, left, top, width, height, fill_color=None,
              line_color=None, line_width=Pt(1)):
    shape = slide.shapes.add_shape(shape_type, left, top, width, height)
    if fill_color:
        shape.fill.solid()
        shape.fill.fore_color.rgb = fill_color
    else:
        shape.fill.background()
    if line_color:
        shape.line.color.rgb = line_color
        shape.line.width = line_width
    else:
        shape.line.fill.background()
    return shape

def add_rounded_rect(slide, left, top, width, height, fill_color=WHITE,
                     line_color=WARM_BORDER, line_width=Pt(1), radius=0.05):
    shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
    shape.fill.solid()
    shape.fill.fore_color.rgb = fill_color
    if line_color:
        shape.line.color.rgb = line_color
        shape.line.width = line_width
    else:
        shape.line.fill.background()
    return shape

def add_circle(slide, left, top, size, fill_color=TERRACOTTA, line_color=None):
    shape = slide.shapes.add_shape(MSO_SHAPE.OVAL, left, top, size, size)
    shape.fill.solid()
    shape.fill.fore_color.rgb = fill_color
    if line_color:
        shape.line.color.rgb = line_color
    else:
        shape.line.fill.background()
    return shape

def add_line_shape(slide, x1, y1, x2, y2, color=WARM_BORDER, width=Pt(1)):
    """Add a connector line using a thin rectangle approximation."""
    if abs(x2 - x1) > abs(y2 - y1):
        # Horizontal
        left = min(x1, x2)
        top = min(y1, y2)
        w = abs(x2 - x1)
        h = width
    else:
        # Vertical
        left = min(x1, x2)
        top = min(y1, y2)
        w = width
        h = abs(y2 - y1)
    shape = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, left, top, w, h)
    shape.fill.solid()
    shape.fill.fore_color.rgb = color
    shape.line.fill.background()
    return shape

def add_arrow_shape(slide, left, top, width, height, color=TERRACOTTA):
    shape = slide.shapes.add_shape(MSO_SHAPE.RIGHT_ARROW, left, top, width, height)
    shape.fill.solid()
    shape.fill.fore_color.rgb = color
    shape.line.fill.background()
    return shape

def add_chevron_shape(slide, left, top, width, height, color=TERRACOTTA):
    shape = slide.shapes.add_shape(MSO_SHAPE.CHEVRON, left, top, width, height)
    shape.fill.solid()
    shape.fill.fore_color.rgb = color
    shape.line.fill.background()
    return shape

def add_oval_shape(slide, left, top, width, height, fill_color=TERRACOTTA):
    shape = slide.shapes.add_shape(MSO_SHAPE.OVAL, left, top, width, height)
    shape.fill.solid()
    shape.fill.fore_color.rgb = fill_color
    shape.line.fill.background()
    return shape

def add_top_bar(slide, color=TERRACOTTA, height=Inches(0.06)):
    """Thin accent bar at top."""
    add_shape(slide, MSO_SHAPE.RECTANGLE, Inches(0), Inches(0),
              SLIDE_W, height, fill_color=color)

def add_bottom_bar(slide, color=TERRACOTTA, height=Inches(0.04)):
    """Thin accent bar at bottom."""
    add_shape(slide, MSO_SHAPE.RECTANGLE, Inches(0), SLIDE_H - height,
              SLIDE_W, height, fill_color=color)

def add_slide_number(slide, num, total=6):
    add_textbox(slide, SLIDE_W - Inches(1.2), SLIDE_H - Inches(0.45),
                Inches(0.9), Inches(0.3), f"{num} / {total}",
                font_size=9, color=MID_GRAY, alignment=PP_ALIGN.RIGHT)

def add_branding_footer(slide):
    add_textbox(slide, Inches(0.75), SLIDE_H - Inches(0.45),
                Inches(3), Inches(0.3), "ASTROVA  ·  Smart India Hackathon 2026",
                font_size=9, color=MID_GRAY, alignment=PP_ALIGN.LEFT)

def add_section_number(slide, num, left=Inches(0.75), top=Inches(0.55)):
    add_textbox(slide, left, top, Inches(0.6), Inches(0.5),
                f"{num:02d}", font_name=FONT_SERIF, font_size=28,
                color=TERRACOTTA, bold=True)

def add_section_title(slide, title, left=Inches(1.5), top=Inches(0.5),
                      width=Inches(8), font_size=26):
    add_textbox(slide, left, top, width, Inches(0.5), title,
                font_name=FONT_SERIF, font_size=font_size,
                color=DEEP_BROWN, bold=True)

def card_with_text(slide, left, top, width, height, title, body_lines,
                   accent_color=TERRACOTTA, fill=CARD_BG, title_size=11, body_size=9):
    """Card with title and bullet body."""
    card = add_rounded_rect(slide, left, top, width, height, fill_color=fill,
                            line_color=WARM_BORDER)
    # Accent stripe
    add_shape(slide, MSO_SHAPE.RECTANGLE, left, top, Inches(0.05), height,
              fill_color=accent_color)
    # Title
    add_textbox(slide, left + Inches(0.15), top + Inches(0.08),
                width - Inches(0.2), Inches(0.3), title,
                font_name=FONT_SANS, font_size=title_size,
                color=accent_color, bold=True)
    # Body
    if body_lines:
        _, tf = add_rich_textbox(slide, left + Inches(0.15), top + Inches(0.32),
                                  width - Inches(0.2), height - Inches(0.4))
        for i, line in enumerate(body_lines):
            add_paragraph(tf, f"• {line}", font_size=body_size, color=DEEP_BROWN,
                          space_after=Pt(2))
    return card


# ============================================================
# SLIDE 1 — THE PROBLEM → ASTROVA'S SOLUTION → UNIQUENESS
# ============================================================

def build_slide_1(prs):
    slide = add_blank_slide(prs)
    add_top_bar(slide)

    # Section number + title
    add_textbox(slide, Inches(0.75), Inches(0.4), Inches(12), Inches(0.45),
                "The Challenge & Our Answer",
                font_name=FONT_SERIF, font_size=24, color=DEEP_BROWN, bold=True)
    add_textbox(slide, Inches(0.75), Inches(0.85), Inches(12), Inches(0.3),
                "India's heritage is fragmented. Astrova connects the dimensions into one journey.",
                font_size=11, color=MID_GRAY)

    # ---- LEFT COLUMN: PROBLEM ----
    prob_x = Inches(0.75)
    prob_y = Inches(1.4)
    add_textbox(slide, prob_x, prob_y, Inches(2.5), Inches(0.35),
                "THE PROBLEM", font_name=FONT_SANS, font_size=12,
                color=CONTROLLED_RED, bold=True)

    problems = [
        ("Scattered Information", "Heritage data spread across\ngovernment sites, wikis, and\nunstructured sources"),
        ("No Geographic Context", "Difficult to explore heritage\nlocations and understand\nregional connections"),
        ("Missing Relationships", "No way to see how places,\nperiods, people, and traditions\nare interconnected"),
        ("Hard Discovery", "No unified search, filtering,\nor personalized exploration\nfor Indian heritage"),
        ("Language Barriers", "Information mostly in English;\nlimited multilingual access\nfor diverse audiences"),
    ]

    card_w = Inches(2.8)
    card_h = Inches(1.05)
    gap = Inches(0.12)
    for i, (title, body) in enumerate(problems):
        cy = prob_y + Inches(0.4) + i * (card_h + gap)
        card_with_text(slide, prob_x, cy, card_w, card_h,
                       title, [body.replace("\n", " ")],
                       accent_color=CONTROLLED_RED, title_size=10, body_size=8)

    # ---- CENTER: TRANSITION ARROW ----
    arrow_x = Inches(3.85)
    arrow_y = Inches(3.2)
    # Arrow bridge
    add_chevron_shape(slide, arrow_x, arrow_y, Inches(0.8), Inches(0.6), TERRACOTTA)
    add_textbox(slide, arrow_x - Inches(0.1), arrow_y + Inches(0.65),
                Inches(1.0), Inches(0.3), "ASTROVA", font_name=FONT_SANS,
                font_size=9, color=TERRACOTTA, bold=True, alignment=PP_ALIGN.CENTER)

    # ---- RIGHT COLUMN: SOLUTION ----
    sol_x = Inches(4.9)
    sol_y = Inches(1.4)
    add_textbox(slide, sol_x, sol_y, Inches(3), Inches(0.35),
                "ASTROVA'S SOLUTION", font_name=FONT_SANS, font_size=12,
                color=SAGE_GREEN, bold=True)

    solutions = [
        ("One Heritage Platform", "Structured database of heritage\nentities with metadata, media,\nsources, and relationships"),
        ("Map-Based Discovery", "Interactive Leaflet/OpenStreetMap\nexploration with heritage\nmarkers and location context"),
        ("Connected Knowledge", "Heritage linked to places, periods,\npeople, media, sources —\nvisible as relationships"),
        ("Search & Filtering", "Full-text search, suggestions,\nstate/category filters for\nefficient discovery"),
        ("Personal Exploration", "Authenticated favorites, curated\ncollections, timeline view\nfor personalized journeys"),
    ]

    for i, (title, body) in enumerate(solutions):
        cy = sol_y + Inches(0.4) + i * (card_h + gap)
        card_with_text(slide, sol_x, cy, card_w, card_h,
                       title, [body.replace("\n", " ")],
                       accent_color=SAGE_GREEN, title_size=10, body_size=8)

    # ---- RIGHT: UNIQUENESS STRIP ----
    uniq_x = Inches(8.05)
    uniq_y = Inches(1.4)
    add_textbox(slide, uniq_x, uniq_y, Inches(4.5), Inches(0.35),
                "WHY ASTROVA IS DIFFERENT", font_name=FONT_SANS, font_size=12,
                color=TERRACOTTA, bold=True)

    # Unique value card
    uv_card = add_rounded_rect(slide, uniq_x, uniq_y + Inches(0.4),
                                Inches(4.5), Inches(1.2),
                                fill_color=RGBColor(0xFD, 0xF8, 0xF2),
                                line_color=TERRACOTTA, line_width=Pt(1.5))

    _, tf = add_rich_textbox(slide, uniq_x + Inches(0.15), uniq_y + Inches(0.5),
                              Inches(4.2), Inches(1.0))
    add_paragraph(tf, "ASTROVA CONNECTS HERITAGE DIMENSIONS",
                  font_size=10, color=TERRACOTTA, bold=True, space_after=Pt(4))
    add_paragraph(tf,
                  "Places + History + People/Culture + Media + Sources + Relationships + Collections + Personal Exploration",
                  font_size=8.5, color=DEEP_BROWN, space_after=Pt(4))

    # Dimension badges
    dims = ["Places", "History", "Culture", "Media", "Sources",
            "Relations", "Collections", "Personal"]
    badge_x = uniq_x + Inches(0.1)
    badge_y = uniq_y + Inches(1.75)
    badge_colors = [TERRACOTTA, HERITAGE_GOLD, SAGE_GREEN, DEEP_BROWN,
                    MID_GRAY, TERRACOTTA, HERITAGE_GOLD, SAGE_GREEN]
    for i, dim in enumerate(dims):
        bx = badge_x + (i % 4) * Inches(1.1)
        by = badge_y + (i // 4) * Inches(0.35)
        b = add_rounded_rect(slide, bx, by, Inches(0.95), Inches(0.28),
                              fill_color=badge_colors[i], line_color=None)
        b.text_frame.paragraphs[0].alignment = PP_ALIGN.CENTER
        run = b.text_frame.paragraphs[0].add_run()
        run.text = dim
        run.font.name = FONT_SANS
        run.font.size = Pt(7.5)
        run.font.color.rgb = WHITE
        run.font.bold = True

    # Fragmented → Connected diagram
    diag_x = uniq_x
    diag_y = badge_y + Inches(0.9)
    add_textbox(slide, diag_x, diag_y, Inches(4.5), Inches(0.25),
                "FRAGMENTED  →  CONNECTED", font_name=FONT_SANS,
                font_size=9, color=MID_GRAY, bold=True, alignment=PP_ALIGN.CENTER)

    # Scattered dots (left)
    dot_positions = [(0.3, 0.2), (0.8, 0.05), (1.2, 0.25), (0.5, 0.45),
                     (1.0, 0.5), (0.2, 0.55), (0.7, 0.35)]
    for dx, dy in dot_positions:
        add_oval_shape(slide, diag_x + Inches(dx), diag_y + Inches(0.3 + dy),
                       Inches(0.12), Inches(0.12), SOFT_TERRA)

    # Arrow
    add_arrow_shape(slide, diag_x + Inches(1.8), diag_y + Inches(0.5),
                    Inches(0.6), Inches(0.25), TERRACOTTA)

    # Connected hub (right)
    hub_x = diag_x + Inches(2.7)
    hub_y = diag_y + Inches(0.45)
    add_oval_shape(slide, hub_x + Inches(0.35), hub_y + Inches(0.15),
                   Inches(0.25), Inches(0.25), TERRACOTTA)
    # Spokes
    for angle_deg in [0, 60, 120, 180, 240, 300]:
        angle = math.radians(angle_deg)
        sx = hub_x + Inches(0.475) + Inches(0.3) * math.cos(angle)
        sy = hub_y + Inches(0.275) + Inches(0.3) * math.sin(angle)
        add_oval_shape(slide, sx, sy, Inches(0.1), Inches(0.1), HERITAGE_GOLD)

    add_bottom_bar(slide)
    add_slide_number(slide, 1)
    add_branding_footer(slide)


# ============================================================
# SLIDE 2 — TECHNICAL APPROACH
# ============================================================

def build_slide_2(prs):
    slide = add_blank_slide(prs)
    add_top_bar(slide)

    add_textbox(slide, Inches(0.75), Inches(0.4), Inches(12), Inches(0.45),
                "Technical Architecture",
                font_name=FONT_SERIF, font_size=24, color=DEEP_BROWN, bold=True)
    add_textbox(slide, Inches(0.75), Inches(0.85), Inches(12), Inches(0.3),
                "Full-stack system: Next.js frontend → API proxy → Express backend → Neon PostgreSQL",
                font_size=11, color=MID_GRAY)

    # ---- MAIN ARCHITECTURE FLOW (center) ----
    flow_x = Inches(2.5)
    flow_y = Inches(1.35)
    layers = [
        ("USER / ADMIN", DEEP_BROWN, WHITE),
        ("NEXT.JS FRONTEND", TERRACOTTA, WHITE),
        ("API PROXY / GATEWAY", HERITAGE_GOLD, WHITE),
        ("EXPRESS.JS BACKEND", DEEP_BROWN, WHITE),
        ("SERVICES / LOGIC", TERRACOTTA, WHITE),
        ("NEON POSTGRESQL", SAGE_GREEN, WHITE),
    ]
    box_w = Inches(3.2)
    box_h = Inches(0.55)
    box_gap = Inches(0.08)
    for i, (label, bg, fg) in enumerate(layers):
        by = flow_y + i * (box_h + box_gap)
        box = add_rounded_rect(slide, flow_x, by, box_w, box_h,
                                fill_color=bg, line_color=None)
        box.text_frame.paragraphs[0].alignment = PP_ALIGN.CENTER
        run = box.text_frame.paragraphs[0].add_run()
        run.text = label
        run.font.name = FONT_SANS
        run.font.size = Pt(10)
        run.font.color.rgb = fg
        run.font.bold = True
        # Down arrow between boxes
        if i < len(layers) - 1:
            ay = by + box_h
            add_textbox(slide, flow_x + box_w / 2 - Inches(0.1), ay,
                        Inches(0.2), Inches(box_gap), "↓",
                        font_size=10, color=MID_GRAY, alignment=PP_ALIGN.CENTER)

    # ---- LEFT BRANCH: MAP ----
    left_x = Inches(0.5)
    map_y = flow_y + Inches(0.6)
    add_textbox(slide, left_x, map_y, Inches(1.8), Inches(0.25),
                "MAP / LOCATION", font_name=FONT_SANS, font_size=9,
                color=TERRACOTTA, bold=True)
    map_card = add_rounded_rect(slide, left_x, map_y + Inches(0.3),
                                 Inches(1.8), Inches(0.9),
                                 fill_color=CARD_BG, line_color=WARM_BORDER)
    _, tf = add_rich_textbox(slide, left_x + Inches(0.1), map_y + Inches(0.35),
                              Inches(1.6), Inches(0.8))
    add_paragraph(tf, "Leaflet.js", font_size=9, color=DEEP_BROWN, bold=True, space_after=Pt(2))
    add_paragraph(tf, "OpenStreetMap Tiles", font_size=8, color=MID_GRAY, space_after=Pt(2))
    add_paragraph(tf, "54 Locations", font_size=8, color=TERRACOTTA, bold=True)

    # ---- LEFT: SECURITY ----
    sec_y = map_y + Inches(1.4)
    add_textbox(slide, left_x, sec_y, Inches(1.8), Inches(0.25),
                "SECURITY", font_name=FONT_SANS, font_size=9,
                color=CONTROLLED_RED, bold=True)
    sec_card = add_rounded_rect(slide, left_x, sec_y + Inches(0.3),
                                 Inches(1.8), Inches(1.2),
                                 fill_color=CARD_BG, line_color=WARM_BORDER)
    _, tf = add_rich_textbox(slide, left_x + Inches(0.1), sec_y + Inches(0.35),
                              Inches(1.6), Inches(1.1))
    for item in ["JWT + HttpOnly Cookie", "Role-Based Access (RBAC)",
                 "API Key Protection", "CORS Configuration",
                 "Rate Limiting", "Timing-Safe Comparison"]:
        add_paragraph(tf, f"• {item}", font_size=8, color=DEEP_BROWN, space_after=Pt(1))

    # ---- RIGHT BRANCH: DISCOVERY ----
    right_x = Inches(9.0)
    disc_y = flow_y + Inches(0.6)
    add_textbox(slide, right_x, disc_y, Inches(3.8), Inches(0.25),
                "DISCOVERY FEATURES", font_name=FONT_SANS, font_size=9,
                color=TERRACOTTA, bold=True)
    disc_card = add_rounded_rect(slide, right_x, disc_y + Inches(0.3),
                                  Inches(3.8), Inches(0.9),
                                  fill_color=CARD_BG, line_color=WARM_BORDER)
    _, tf = add_rich_textbox(slide, right_x + Inches(0.1), disc_y + Inches(0.35),
                              Inches(3.6), Inches(0.8))
    disc_items = ["Full-text Search & Suggestions", "State/Category Filtering",
                  "Curated Collections", "User Favorites", "Historical Timeline",
                  "Heritage Relationships (49 connections)"]
    for item in disc_items:
        add_paragraph(tf, f"• {item}", font_size=8, color=DEEP_BROWN, space_after=Pt(1))

    # ---- RIGHT: AI / CHATBOT ----
    ai_y = disc_y + Inches(1.4)
    add_textbox(slide, right_x, ai_y, Inches(3.8), Inches(0.25),
                "AI / CHATBOT", font_name=FONT_SANS, font_size=9,
                color=HERITAGE_GOLD, bold=True)
    ai_card = add_rounded_rect(slide, right_x, ai_y + Inches(0.3),
                                Inches(3.8), Inches(0.9),
                                fill_color=RGBColor(0xFD, 0xF8, 0xF2),
                                line_color=HERITAGE_GOLD)
    _, tf = add_rich_textbox(slide, right_x + Inches(0.1), ai_y + Inches(0.35),
                              Inches(3.6), Inches(0.8))
    add_paragraph(tf, "Multilingual AI Chatbot", font_size=9, color=DEEP_BROWN, bold=True, space_after=Pt(2))
    add_paragraph(tf, "Architecture preserved • 107 knowledge records", font_size=8, color=MID_GRAY, space_after=Pt(2))
    # Under construction badge
    uc_badge = add_rounded_rect(slide, right_x + Inches(0.1), ai_y + Inches(1.0),
                                 Inches(1.6), Inches(0.25),
                                 fill_color=HERITAGE_GOLD, line_color=None)
    uc_badge.text_frame.paragraphs[0].alignment = PP_ALIGN.CENTER
    run = uc_badge.text_frame.paragraphs[0].add_run()
    run.text = "UNDER CONSTRUCTION"
    run.font.name = FONT_SANS
    run.font.size = Pt(7.5)
    run.font.color.rgb = WHITE
    run.font.bold = True

    # ---- DATA FLOW STRIP ----
    strip_y = Inches(5.7)
    add_textbox(slide, Inches(0.75), strip_y, Inches(3), Inches(0.25),
                "DATA FLOW", font_name=FONT_SANS, font_size=9,
                color=MID_GRAY, bold=True)
    flow_steps = ["Collect", "Normalize", "Verify", "Store", "Serve", "Explore"]
    step_w = Inches(1.7)
    step_gap = Inches(0.15)
    total_w = len(flow_steps) * step_w + (len(flow_steps) - 1) * step_gap
    start_x = (SLIDE_W - total_w) / 2
    for i, step in enumerate(flow_steps):
        sx = start_x + i * (step_w + step_gap)
        box = add_rounded_rect(slide, sx, strip_y + Inches(0.3),
                                step_w, Inches(0.4),
                                fill_color=TERRACOTTA if i in [3, 4] else CARD_BG,
                                line_color=TERRACOTTA)
        box.text_frame.paragraphs[0].alignment = PP_ALIGN.CENTER
        run = box.text_frame.paragraphs[0].add_run()
        run.text = step.upper()
        run.font.name = FONT_SANS
        run.font.size = Pt(8)
        run.font.color.rgb = WHITE if i in [3, 4] else DEEP_BROWN
        run.font.bold = True
        # Arrow between
        if i < len(flow_steps) - 1:
            add_textbox(slide, sx + step_w, strip_y + Inches(0.35),
                        step_gap, Inches(0.3), "→",
                        font_size=12, color=MID_GRAY, alignment=PP_ALIGN.CENTER)

    # ---- TECH STACK BAR ----
    tech_y = Inches(6.5)
    add_textbox(slide, Inches(0.75), tech_y, Inches(1.5), Inches(0.25),
                "TECH STACK", font_name=FONT_SANS, font_size=9,
                color=MID_GRAY, bold=True)
    techs = ["Next.js", "React", "TypeScript", "Tailwind CSS", "Express.js",
             "Node.js", "Neon PostgreSQL", "Leaflet.js", "OpenStreetMap"]
    tech_x = Inches(2.0)
    for i, tech in enumerate(techs):
        tx = tech_x + i * Inches(1.2)
        tb = add_rounded_rect(slide, tx, tech_y, Inches(1.1), Inches(0.28),
                               fill_color=LIGHT_GRAY, line_color=None)
        tb.text_frame.paragraphs[0].alignment = PP_ALIGN.CENTER
        run = tb.text_frame.paragraphs[0].add_run()
        run.text = tech
        run.font.name = FONT_SANS
        run.font.size = Pt(7)
        run.font.color.rgb = DEEP_BROWN
        run.font.bold = False

    add_bottom_bar(slide)
    add_slide_number(slide, 2)
    add_branding_footer(slide)


# ============================================================
# SLIDE 3 — FEASIBILITY & VIABILITY
# ============================================================

def build_slide_3(prs):
    slide = add_blank_slide(prs)
    add_top_bar(slide)

    add_textbox(slide, Inches(0.75), Inches(0.4), Inches(12), Inches(0.45),
                "Feasibility & Viability",
                font_name=FONT_SERIF, font_size=24, color=DEEP_BROWN, bold=True)
    add_textbox(slide, Inches(0.75), Inches(0.85), Inches(12), Inches(0.3),
                "Built with proven technologies today. Designed to grow tomorrow.",
                font_size=11, color=MID_GRAY)

    # ---- TWO-COLUMN LAYOUT ----
    col_w = Inches(5.6)
    left_x = Inches(0.75)
    right_x = Inches(6.95)
    col_y = Inches(1.35)
    col_h = Inches(2.8)

    # Left: FEASIBLE TODAY
    left_card = add_rounded_rect(slide, left_x, col_y, col_w, col_h,
                                  fill_color=CARD_BG, line_color=SAGE_GREEN, line_width=Pt(1.5))
    add_shape(slide, MSO_SHAPE.RECTANGLE, left_x, col_y, col_w, Inches(0.45),
              fill_color=SAGE_GREEN)
    add_textbox(slide, left_x + Inches(0.15), col_y + Inches(0.08),
                col_w, Inches(0.35), "FEASIBLE TODAY",
                font_name=FONT_SANS, font_size=14, color=WHITE, bold=True,
                alignment=PP_ALIGN.LEFT)

    feasible_items = [
        ("Open Technologies", "Next.js, React, TypeScript, Express.js, PostgreSQL — mature, well-documented, free"),
        ("Public Data Sources", "Indian Culture, Incredible India, UNESCO, National Archives — credible, accessible"),
        ("Working Prototype", "Full-stack heritage platform with 74 entities, 54 locations, 72 media records"),
        ("Modular Architecture", "Layered system — each module independently extensible"),
        ("Reasonable Deployment", "Neon PostgreSQL (serverless), Vercel/Node hosting — low maintenance"),
    ]
    _, tf = add_rich_textbox(slide, left_x + Inches(0.2), col_y + Inches(0.55),
                              col_w - Inches(0.4), col_h - Inches(0.6))
    for title, desc in feasible_items:
        add_paragraph(tf, f"✓  {title}", font_size=10, color=SAGE_GREEN, bold=True, space_after=Pt(1))
        add_paragraph(tf, f"     {desc}", font_size=8.5, color=MID_GRAY, space_after=Pt(6))

    # Right: VIABLE TOMORROW
    right_card = add_rounded_rect(slide, right_x, col_y, col_w, col_h,
                                   fill_color=CARD_BG, line_color=TERRACOTTA, line_width=Pt(1.5))
    add_shape(slide, MSO_SHAPE.RECTANGLE, right_x, col_y, col_w, Inches(0.45),
              fill_color=TERRACOTTA)
    add_textbox(slide, right_x + Inches(0.15), col_y + Inches(0.08),
                col_w, Inches(0.35), "VIABLE TOMORROW",
                font_name=FONT_SANS, font_size=14, color=WHITE, bold=True,
                alignment=PP_ALIGN.LEFT)

    viable_items = [
        ("More Heritage Data", "Scale from 74 to thousands of heritage entities across India"),
        ("More Indian Languages", "Expand from current multilingual support to all 22 scheduled languages"),
        ("Education Use", "Curriculum-aligned heritage modules for schools and universities"),
        ("Tourism Integration", "Travel planning, nearby heritage discovery, guided exploration"),
        ("Research & Institutions", "Academic collaboration, data APIs, cultural research support"),
    ]
    _, tf = add_rich_textbox(slide, right_x + Inches(0.2), col_y + Inches(0.55),
                              col_w - Inches(0.4), col_h - Inches(0.6))
    for title, desc in viable_items:
        add_paragraph(tf, f"→  {title}", font_size=10, color=TERRACOTTA, bold=True, space_after=Pt(1))
        add_paragraph(tf, f"     {desc}", font_size=8.5, color=MID_GRAY, space_after=Pt(6))

    # ---- RISK → MITIGATION BAND ----
    risk_y = Inches(4.35)
    add_textbox(slide, Inches(0.75), risk_y, Inches(4), Inches(0.3),
                "RISK MITIGATION", font_name=FONT_SANS, font_size=10,
                color=DEEP_BROWN, bold=True)

    risks = [
        ("Data Accuracy", "Trusted sources + verification workflow"),
        ("Diverse Heritage Data", "Structured schema, modular data model"),
        ("Performance", "Pagination, optimized queries, serverless DB"),
        ("AI Reliability", "Source-grounded knowledge, human review"),
        ("Security & Maintenance", "JWT auth, RBAC, rate limiting, monitoring"),
    ]

    risk_card = add_rounded_rect(slide, Inches(0.75), risk_y + Inches(0.35),
                                  Inches(11.8), Inches(1.6),
                                  fill_color=RGBColor(0xFD, 0xF8, 0xF2),
                                  line_color=WARM_BORDER)
    risk_x_start = Inches(0.9)
    risk_col_w = Inches(2.3)
    for i, (risk, mitigation) in enumerate(risks):
        rx = risk_x_start + i * (risk_col_w + Inches(0.1))
        # Risk label
        add_textbox(slide, rx, risk_y + Inches(0.4), risk_col_w, Inches(0.25),
                    risk.upper(), font_size=8, color=CONTROLLED_RED, bold=True)
        # Arrow
        add_textbox(slide, rx, risk_y + Inches(0.65), risk_col_w, Inches(0.2),
                    "↓", font_size=10, color=MID_GRAY, alignment=PP_ALIGN.CENTER)
        # Mitigation
        add_textbox(slide, rx, risk_y + Inches(0.85), risk_col_w, Inches(0.8),
                    mitigation, font_size=8, color=DEEP_BROWN)

    # ---- CLOSING STATEMENT ----
    close_y = Inches(6.3)
    close_box = add_rounded_rect(slide, Inches(2.5), close_y, Inches(8.3), Inches(0.55),
                                  fill_color=DEEP_BROWN, line_color=None)
    close_box.text_frame.paragraphs[0].alignment = PP_ALIGN.CENTER
    run = close_box.text_frame.paragraphs[0].add_run()
    run.text = "Feasible to build today.  Viable to grow tomorrow."
    run.font.name = FONT_SERIF
    run.font.size = Pt(16)
    run.font.color.rgb = CREAM
    run.font.bold = True

    add_bottom_bar(slide)
    add_slide_number(slide, 3)
    add_branding_footer(slide)


# ============================================================
# SLIDE 4 — IMPACT & BENEFITS
# ============================================================

def build_slide_4(prs):
    slide = add_blank_slide(prs)
    add_top_bar(slide)

    add_textbox(slide, Inches(0.75), Inches(0.4), Inches(12), Inches(0.45),
                "Impact & Benefits",
                font_name=FONT_SERIF, font_size=24, color=DEEP_BROWN, bold=True)
    add_textbox(slide, Inches(0.75), Inches(0.85), Inches(12), Inches(0.3),
                "Who benefits from Astrova — and why it matters.",
                font_size=11, color=MID_GRAY)

    # ---- CENTRAL HUB ----
    hub_x = Inches(5.2)
    hub_y = Inches(1.6)
    hub_size = Inches(1.6)
    hub = add_oval_shape(slide, hub_x, hub_y, hub_size, hub_size, TERRACOTTA)
    hub.text_frame.paragraphs[0].alignment = PP_ALIGN.CENTER
    run = hub.text_frame.paragraphs[0].add_run()
    run.text = "ASTROVA"
    run.font.name = FONT_SERIF
    run.font.size = Pt(14)
    run.font.color.rgb = WHITE
    run.font.bold = True

    # Stakeholders around the hub
    stakeholders = [
        ("STUDENTS", hub_x + Inches(0.4), hub_y - Inches(0.85), HERITAGE_GOLD),
        ("RESEARCHERS", hub_x - Inches(1.65), hub_y + Inches(0.35), DEEP_BROWN),
        ("TOURISTS", hub_x + Inches(2.05), hub_y + Inches(0.35), SAGE_GREEN),
        ("COMMUNITIES", hub_x + Inches(0.15), hub_y + Inches(2.0), TERRACOTTA),
        ("INSTITUTIONS", hub_x + Inches(0.0), hub_y + Inches(2.85), MID_GRAY),
    ]
    for label, sx, sy, color in stakeholders:
        s_box = add_rounded_rect(slide, sx, sy, Inches(1.4), Inches(0.38),
                                  fill_color=color, line_color=None)
        s_box.text_frame.paragraphs[0].alignment = PP_ALIGN.CENTER
        run = s_box.text_frame.paragraphs[0].add_run()
        run.text = label
        run.font.name = FONT_SANS
        run.font.size = Pt(8)
        run.font.color.rgb = WHITE
        run.font.bold = True

    # ---- IMPACT DIMENSIONS (left column) ----
    dim_x = Inches(0.5)
    dim_y = Inches(1.35)
    add_textbox(slide, dim_x, dim_y, Inches(2.5), Inches(0.25),
                "IMPACT DIMENSIONS", font_name=FONT_SANS, font_size=10,
                color=TERRACOTTA, bold=True)

    dimensions = [
        ("EDUCATIONAL", ["Interactive learning", "Maps & timelines", "Contextual stories"], SAGE_GREEN),
        ("CULTURAL", ["Awareness building", "Visibility for traditions", "Lesser-known heritage"], HERITAGE_GOLD),
        ("TOURISM", ["Discover heritage sites", "Historical context", "Nearby exploration"], TERRACOTTA),
        ("SOCIAL", ["Local traditions", "Crafts & arts", "Cultural contributions"], DEEP_BROWN),
        ("DIGITAL", ["Connected knowledge base", "Structured heritage data", "Accessible discovery"], MID_GRAY),
    ]

    for i, (dim_title, dim_items, color) in enumerate(dimensions):
        dy = dim_y + Inches(0.35) + i * Inches(1.0)
        # Color dot
        add_oval_shape(slide, dim_x, dy + Inches(0.02), Inches(0.12), Inches(0.12), color)
        add_textbox(slide, dim_x + Inches(0.2), dy - Inches(0.02),
                    Inches(2.3), Inches(0.2), dim_title,
                    font_size=8.5, color=color, bold=True)
        _, tf = add_rich_textbox(slide, dim_x + Inches(0.2), dy + Inches(0.18),
                                  Inches(2.3), Inches(0.7))
        for item in dim_items:
            add_paragraph(tf, f"• {item}", font_size=7.5, color=MID_GRAY, space_after=Pt(1))

    # ---- BENEFITS STRIP (bottom) ----
    ben_y = Inches(5.7)
    add_textbox(slide, Inches(0.75), ben_y, Inches(4), Inches(0.25),
                "5 KEY BENEFITS", font_name=FONT_SANS, font_size=10,
                color=DEEP_BROWN, bold=True)

    benefits = [
        ("Easy Discovery", "Search, filter, explore"),
        ("Connected Knowledge", "Relationships between heritage"),
        ("Geographic Exploration", "Interactive map experience"),
        ("Personalized Experience", "Favorites & collections"),
        ("Reliable Information", "Source-aware, verified data"),
    ]

    ben_card_w = Inches(2.25)
    ben_gap = Inches(0.12)
    ben_start_x = Inches(0.75)
    for i, (title, desc) in enumerate(benefits):
        bx = ben_start_x + i * (ben_card_w + ben_gap)
        bc = add_rounded_rect(slide, bx, ben_y + Inches(0.3),
                               ben_card_w, Inches(1.1),
                               fill_color=CARD_BG, line_color=TERRACOTTA, line_width=Pt(1))
        # Number circle
        nc = add_oval_shape(slide, bx + Inches(0.1), ben_y + Inches(0.4),
                             Inches(0.28), Inches(0.28), TERRACOTTA)
        nc.text_frame.paragraphs[0].alignment = PP_ALIGN.CENTER
        run = nc.text_frame.paragraphs[0].add_run()
        run.text = str(i + 1)
        run.font.name = FONT_SANS
        run.font.size = Pt(10)
        run.font.color.rgb = WHITE
        run.font.bold = True
        # Title
        add_textbox(slide, bx + Inches(0.45), ben_y + Inches(0.4),
                    ben_card_w - Inches(0.55), Inches(0.25), title,
                    font_size=9, color=DEEP_BROWN, bold=True)
        # Desc
        add_textbox(slide, bx + Inches(0.45), ben_y + Inches(0.65),
                    ben_card_w - Inches(0.55), Inches(0.5), desc,
                    font_size=7.5, color=MID_GRAY)

    add_bottom_bar(slide)
    add_slide_number(slide, 4)
    add_branding_footer(slide)


# ============================================================
# SLIDE 5 — RESEARCH & REFERENCES
# ============================================================

def build_slide_5(prs):
    slide = add_blank_slide(prs)
    add_top_bar(slide)

    add_textbox(slide, Inches(0.75), Inches(0.4), Inches(12), Inches(0.45),
                "Research & References",
                font_name=FONT_SERIF, font_size=24, color=DEEP_BROWN, bold=True)
    add_textbox(slide, Inches(0.75), Inches(0.85), Inches(12), Inches(0.3),
                "Astrova is grounded in credible research and official Indian heritage sources.",
                font_size=11, color=MID_GRAY)

    # ---- AREA A: RESEARCH INSIGHTS ----
    res_x = Inches(0.75)
    res_y = Inches(1.35)
    res_w = Inches(5.8)
    add_textbox(slide, res_x, res_y, Inches(4), Inches(0.3),
                "RESEARCH INSIGHTS", font_name=FONT_SANS, font_size=12,
                color=TERRACOTTA, bold=True)

    insights = [
        ("Heritage Fragmentation",
         "Heritage information is distributed across multiple government sources, wikis, and unstructured databases",
         "Motivates unified platform"),
        ("Structured Systems Needed",
         "There is a recognized need for structured cultural heritage information systems that connect related data",
         "Drives Astrova's data model"),
        ("GIS for Heritage",
         "Geographic Information Systems support cultural heritage exploration by linking places to context",
         "Powers map discovery"),
        ("Digital Discovery",
         "Digital platforms can significantly improve heritage discovery and tourism engagement",
         "Validates web-first approach"),
        ("Multilingual Access",
         "Multilingual and connected digital access can improve accessibility for diverse populations",
         "Drives language support"),
    ]

    res_card = add_rounded_rect(slide, res_x, res_y + Inches(0.35),
                                 res_w, Inches(3.8),
                                 fill_color=CARD_BG, line_color=WARM_BORDER)

    for i, (title, desc, meaning) in enumerate(insights):
        iy = res_y + Inches(0.45) + i * Inches(0.72)
        # Number
        add_oval_shape(slide, res_x + Inches(0.15), iy + Inches(0.02),
                       Inches(0.22), Inches(0.22), TERRACOTTA)
        nc_text = add_textbox(slide, res_x + Inches(0.15), iy + Inches(0.02),
                               Inches(0.22), Inches(0.22), str(i + 1),
                               font_size=8, color=WHITE, bold=True,
                               alignment=PP_ALIGN.CENTER)
        # Title
        add_textbox(slide, res_x + Inches(0.5), iy, Inches(3.5), Inches(0.2),
                    title, font_size=10, color=DEEP_BROWN, bold=True)
        # Description
        add_textbox(slide, res_x + Inches(0.5), iy + Inches(0.22),
                    Inches(4.0), Inches(0.22), desc,
                    font_size=8, color=MID_GRAY)
        # "What this means" tag
        tag = add_rounded_rect(slide, res_x + Inches(4.6), iy + Inches(0.05),
                                Inches(1.0), Inches(0.22),
                                fill_color=RGBColor(0xFD, 0xF8, 0xF2),
                                line_color=TERRACOTTA)
        tag.text_frame.paragraphs[0].alignment = PP_ALIGN.CENTER
        run = tag.text_frame.paragraphs[0].add_run()
        run.text = meaning
        run.font.name = FONT_SANS
        run.font.size = Pt(6.5)
        run.font.color.rgb = TERRACOTTA

    # ---- AREA B: OFFICIAL REFERENCES ----
    ref_x = Inches(6.85)
    ref_y = Inches(1.35)
    ref_w = Inches(5.7)
    add_textbox(slide, ref_x, ref_y, Inches(4), Inches(0.3),
                "OFFICIAL REFERENCES", font_name=FONT_SANS, font_size=12,
                color=TERRACOTTA, bold=True)

    refs = [
        ("Indian Culture", "Ministry of Culture", "indianculture.gov.in", DEEP_BROWN),
        ("Incredible India", "Ministry of Tourism", "incredibleindia.gov.in", TERRACOTTA),
        ("UNESCO ICH", "Intangible Cultural Heritage", "ich.unesco.org/en", HERITAGE_GOLD),
        ("National Archives", "Government of India", "nationalarchives.nic.in", SAGE_GREEN),
    ]

    for i, (name, org, url, color) in enumerate(refs):
        ry = ref_y + Inches(0.4) + i * Inches(1.05)
        rc = add_rounded_rect(slide, ref_x, ry, ref_w, Inches(0.9),
                               fill_color=CARD_BG, line_color=color, line_width=Pt(1.5))
        # Color accent
        add_shape(slide, MSO_SHAPE.RECTANGLE, ref_x, ry, Inches(0.06), Inches(0.9),
                  fill_color=color)
        add_textbox(slide, ref_x + Inches(0.2), ry + Inches(0.1),
                    ref_w - Inches(0.3), Inches(0.25), name,
                    font_size=12, color=color, bold=True)
        add_textbox(slide, ref_x + Inches(0.2), ry + Inches(0.35),
                    ref_w - Inches(0.3), Inches(0.2), org,
                    font_size=9, color=MID_GRAY)
        add_textbox(slide, ref_x + Inches(0.2), ry + Inches(0.55),
                    ref_w - Inches(0.3), Inches(0.2), url,
                    font_size=8, color=TERRACOTTA, italic=True)

    # ---- DATABASE STATISTICS ----
    stats_y = Inches(5.6)
    add_textbox(slide, Inches(0.75), stats_y, Inches(3), Inches(0.25),
                "CURRENT DATABASE STATISTICS", font_name=FONT_SANS, font_size=10,
                color=DEEP_BROWN, bold=True)

    stats = [
        ("74", "Heritage\nEntities"),
        ("54", "Locations"),
        ("9", "Historical\nPeriods"),
        ("72", "Media\nRecords"),
        ("49", "Heritage\nRelationships"),
        ("12", "Supported\nStates"),
    ]

    stat_w = Inches(1.8)
    stat_gap = Inches(0.15)
    stat_start_x = Inches(0.75)
    for i, (num, label) in enumerate(stats):
        sx = stat_start_x + i * (stat_w + stat_gap)
        sc = add_rounded_rect(slide, sx, stats_y + Inches(0.3),
                               stat_w, Inches(1.0),
                               fill_color=CARD_BG, line_color=WARM_BORDER)
        add_textbox(slide, sx, stats_y + Inches(0.35), stat_w, Inches(0.45),
                    num, font_name=FONT_SERIF, font_size=28,
                    color=TERRACOTTA, bold=True, alignment=PP_ALIGN.CENTER)
        add_textbox(slide, sx, stats_y + Inches(0.78), stat_w, Inches(0.45),
                    label.replace("\n", " "), font_size=8,
                    color=MID_GRAY, alignment=PP_ALIGN.CENTER)

    add_bottom_bar(slide)
    add_slide_number(slide, 5)
    add_branding_footer(slide)


# ============================================================
# SLIDE 6 — WORKING PROTOTYPE & FUTURE ROADMAP
# ============================================================

def build_slide_6(prs):
    slide = add_blank_slide(prs)
    add_top_bar(slide)

    add_textbox(slide, Inches(0.75), Inches(0.4), Inches(12), Inches(0.45),
                "Working Prototype & Future Roadmap",
                font_name=FONT_SERIF, font_size=24, color=DEEP_BROWN, bold=True)
    add_textbox(slide, Inches(0.75), Inches(0.85), Inches(12), Inches(0.3),
                "A working, database-connected heritage platform — and a clear path forward.",
                font_size=11, color=MID_GRAY)

    # ---- LAPTOP MOCKUP ----
    # Laptop body
    laptop_x = Inches(0.75)
    laptop_y = Inches(1.35)
    laptop_w = Inches(5.5)
    laptop_h = Inches(3.5)

    # Screen bezel
    bezel = add_rounded_rect(slide, laptop_x, laptop_y, laptop_w, laptop_h,
                              fill_color=RGBColor(0x2C, 0x2C, 0x2C), line_color=None)
    # Screen area (inside bezel)
    screen_x = laptop_x + Inches(0.15)
    screen_y = laptop_y + Inches(0.15)
    screen_w = laptop_w - Inches(0.3)
    screen_h = laptop_h - Inches(0.5)
    screen = add_rounded_rect(slide, screen_x, screen_y, screen_w, screen_h,
                               fill_color=CREAM, line_color=RGBColor(0x1A, 0x1A, 0x1A))

    # Try to add the screenshot image
    screenshot_path = r"C:\Users\Dev\OneDrive\Desktop\SIH Reports\Docs For ppt\Astrova Home page.png"
    try:
        if os.path.exists(screenshot_path):
            slide.shapes.add_picture(screenshot_path, screen_x, screen_y,
                                      screen_w, screen_h)
    except Exception as e:
        print(f"Could not add screenshot: {e}")

    # Laptop base
    base_y = laptop_y + laptop_h - Inches(0.05)
    base = add_rounded_rect(slide, laptop_x - Inches(0.3), base_y,
                             laptop_w + Inches(0.6), Inches(0.2),
                             fill_color=RGBColor(0x3A, 0x3A, 0x3A), line_color=None)
    # Trackpad dot
    add_oval_shape(slide, laptop_x + laptop_w / 2 - Inches(0.08),
                   base_y + Inches(0.05), Inches(0.16), Inches(0.08),
                   RGBColor(0x50, 0x50, 0x50))

    # ---- IMPLEMENTED CAPABILITIES (right) ----
    cap_x = Inches(6.6)
    cap_y = Inches(1.35)
    add_textbox(slide, cap_x, cap_y, Inches(3.5), Inches(0.25),
                "IMPLEMENTED FEATURES", font_name=FONT_SANS, font_size=10,
                color=SAGE_GREEN, bold=True)

    features = [
        "Heritage discovery & details",
        "Search & filtering",
        "Interactive map (Leaflet + OSM)",
        "Connected heritage relationships",
        "Media & source management",
        "Collections & favorites",
        "Historical timeline",
        "Admin content portal",
        "Secure JWT authentication",
    ]

    feat_card = add_rounded_rect(slide, cap_x, cap_y + Inches(0.3),
                                  Inches(3.5), Inches(2.6),
                                  fill_color=CARD_BG, line_color=SAGE_GREEN, line_width=Pt(1))
    _, tf = add_rich_textbox(slide, cap_x + Inches(0.15), cap_y + Inches(0.35),
                              Inches(3.2), Inches(2.5))
    for feat in features:
        add_paragraph(tf, f"✓  {feat}", font_size=9, color=DEEP_BROWN, space_after=Pt(4))

    # AI/Chatbot under construction badge
    ai_badge = add_rounded_rect(slide, cap_x, cap_y + Inches(3.05),
                                 Inches(3.5), Inches(0.45),
                                 fill_color=HERITAGE_GOLD, line_color=None)
    ai_badge.text_frame.paragraphs[0].alignment = PP_ALIGN.CENTER
    run = ai_badge.text_frame.paragraphs[0].add_run()
    run.text = "AI / CHATBOT  ·  UNDER CONSTRUCTION"
    run.font.name = FONT_SANS
    run.font.size = Pt(9)
    run.font.color.rgb = WHITE
    run.font.bold = True

    # ---- ROADMAP (bottom) ----
    road_y = Inches(5.3)
    add_textbox(slide, Inches(0.75), road_y, Inches(3), Inches(0.25),
                "FUTURE ROADMAP", font_name=FONT_SANS, font_size=10,
                color=TERRACOTTA, bold=True)

    roadmap = [
        ("01", "Expand data\ncoverage"),
        ("02", "More Indian\nlanguages"),
        ("03", "Community\ncontributions"),
        ("04", "Mobile\napplication"),
        ("05", "Educational\nintegration"),
        ("06", "Advanced AI\nexperiences"),
        ("07", "Global\noutreach"),
    ]

    rm_card_w = Inches(1.55)
    rm_gap = Inches(0.12)
    rm_start_x = Inches(0.75)
    rm_colors = [TERRACOTTA, HERITAGE_GOLD, SAGE_GREEN, DEEP_BROWN,
                 TERRACOTTA, HERITAGE_GOLD, SAGE_GREEN]
    for i, (num, label) in enumerate(roadmap):
        rx = rm_start_x + i * (rm_card_w + rm_gap)
        rc = add_rounded_rect(slide, rx, road_y + Inches(0.3),
                               rm_card_w, Inches(1.05),
                               fill_color=CARD_BG, line_color=rm_colors[i], line_width=Pt(1.5))
        # Number
        add_textbox(slide, rx, road_y + Inches(0.35), rm_card_w, Inches(0.3),
                    num, font_name=FONT_SERIF, font_size=16,
                    color=rm_colors[i], bold=True, alignment=PP_ALIGN.CENTER)
        # Label
        add_textbox(slide, rx, road_y + Inches(0.7), rm_card_w, Inches(0.55),
                    label.replace("\n", " "), font_size=8,
                    color=DEEP_BROWN, alignment=PP_ALIGN.CENTER)

    # ---- CLOSING TAGLINE ----
    tagline_y = Inches(6.7)
    tagline_box = add_rounded_rect(slide, Inches(2.5), tagline_y,
                                    Inches(8.3), Inches(0.55),
                                    fill_color=DEEP_BROWN, line_color=None)
    tagline_box.text_frame.paragraphs[0].alignment = PP_ALIGN.CENTER
    run = tagline_box.text_frame.paragraphs[0].add_run()
    run.text = "Preserve today.  Inspire tomorrow."
    run.font.name = FONT_SERIF
    run.font.size = Pt(18)
    run.font.color.rgb = HERITAGE_GOLD
    run.font.bold = True

    add_bottom_bar(slide)
    add_slide_number(slide, 6)
    add_branding_footer(slide)


# ============================================================
# MAIN
# ============================================================

def main():
    prs = create_presentation()

    print("Building Slide 1: Problem -> Solution -> Uniqueness...")
    build_slide_1(prs)

    print("Building Slide 2: Technical Approach...")
    build_slide_2(prs)

    print("Building Slide 3: Feasibility & Viability...")
    build_slide_3(prs)

    print("Building Slide 4: Impact & Benefits...")
    build_slide_4(prs)

    print("Building Slide 5: Research & References...")
    build_slide_5(prs)

    print("Building Slide 6: Working Prototype & Roadmap...")
    build_slide_6(prs)

    output_dir = r"C:\Users\Dev\OneDrive\Desktop\SIH Reports\Docs For ppt"
    output_path = os.path.join(output_dir, "ASTROVA_SIH2026_FINAL_6_SLIDE_PRESENTATION.pptx")
    prs.save(output_path)
    print(f"\nSaved: {output_path}")
    print(f"Total slides: {len(prs.slides)}")

    # Verify
    verify_prs = Presentation(output_path)
    print(f"Verification -- slides: {len(verify_prs.slides)}")
    print(f"Verification -- width: {verify_prs.slide_width}, height: {verify_prs.slide_height}")
    for i, slide in enumerate(verify_prs.slides, 1):
        shapes = len(slide.shapes)
        print(f"  Slide {i}: {shapes} shapes")


if __name__ == "__main__":
    main()
