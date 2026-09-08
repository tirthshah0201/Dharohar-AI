"""
Independent audit of ASTROVA_SIH2026_FINAL_6_SLIDE_PRESENTATION.pptx
Checks: geometry, overlaps, out-of-bounds, font sizes, key claims.
"""
import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
from pptx import Presentation
from pptx.util import Emu

PPTX = r"C:\Users\Dev\OneDrive\Desktop\SIH Reports\Docs For ppt\ASTROVA_SIH2026_FINAL_6_SLIDE_PRESENTATION.pptx"
EMU_IN = 914400.0

prs = Presentation(PPTX)
SW = prs.slide_width / EMU_IN
SH = prs.slide_height / EMU_IN
print(f"SLIDE: {SW:.3f} x {SH:.3f} in, slides={len(prs.slides)}")

def rects_overlap(a, b):
    ax1, ay1, ax2, ay2 = a
    bx1, by1, bx2, by2 = b
    ox = min(ax2, bx2) - max(ax1, bx1)
    oy = min(ay2, by2) - max(ay1, by1)
    if ox > 0.02 and oy > 0.02:  # tolerate hairline touches
        return (ox, oy)
    return None

all_findings = []

for idx, slide in enumerate(prs.slides, 1):
    print(f"\n{'='*70}\nSLIDE {idx}\n{'='*70}")
    boxes = []   # (name, rect, has_text, text)
    min_font = 999
    small_texts = []

    for shape in slide.shapes:
        try:
            x = shape.left / EMU_IN; y = shape.top / EMU_IN
            w = shape.width / EMU_IN; h = shape.height / EMU_IN
        except Exception:
            continue
        rect = (x, y, x + w, y + h)
        text = ""
        fsize = None
        if shape.has_text_frame:
            text = shape.text_frame.text.strip()
            for p in shape.text_frame.paragraphs:
                for r in p.runs:
                    if r.font.size:
                        pt = r.font.size.pt
                        fsize = pt if fsize is None else min(fsize, pt)
        st = str(shape.shape_type)
        name = f"{st.split('(')[0].strip()}|{text[:28]!r}"

        # out of bounds
        if rect[0] < -0.01 or rect[1] < -0.01 or rect[2] > SW + 0.01 or rect[3] > SH + 0.01:
            all_findings.append((idx, "OUT-OF-BOUNDS", f"{name} rect=({x:.2f},{y:.2f},{rect[2]:.2f},{rect[3]:.2f})"))

        if fsize is not None and text:
            min_font = min(min_font, fsize)
            if fsize < 10:
                small_texts.append((fsize, text[:40]))

        boxes.append((name, rect, bool(text), text, fsize))

    # pairwise overlap between text-bearing shapes and other filled shapes
    print(f"-- min font on slide: {min_font}pt; texts <10pt: {len(small_texts)}")
    for f, t in small_texts[:8]:
        print(f"     {f}pt  {t!r}")

    print("-- overlaps (text-bearing vs any other shape, >0.15in both axes):")
    seen = set()
    for i in range(len(boxes)):
        for j in range(len(boxes)):
            if i == j: continue
            n1, r1, t1, x1, _ = boxes[i]
            n2, r2, t2, x2, _ = boxes[j]
            if not (t1 and i < j): continue
            ov = rects_overlap(r1, r2)
            if ov and ov[0] > 0.15 and ov[1] > 0.15:
                key = (n1, n2)
                if key in seen: continue
                seen.add(key)
                print(f"     OVERLAP {ov[0]:.2f}x{ov[1]:.2f}in: {n1[:40]}  <->  {n2[:40]}")
                all_findings.append((idx, "OVERLAP", f"{n1[:40]} <-> {n2[:40]} ({ov[0]:.2f}x{ov[1]:.2f}in)"))

# global claim scan
print(f"\n{'='*70}\nCLAIM SCAN\n{'='*70}")
BAD = ["rag", "vector", "embedding", "retrieval augmented"]
GOOD_REQUIRED = ["under construction"]
for idx, slide in enumerate(prs.slides, 1):
    full = " ".join(s.text_frame.text for s in slide.shapes if s.has_text_frame).lower()
    for b in BAD:
        if b in full:
            all_findings.append((idx, "CLAIM", f"mentions '{b}'"))
            print(f"  slide {idx}: mentions '{b}'")
    if "chatbot" in full or " ai" in full:
        has_uc = "under construction" in full
        print(f"  slide {idx}: AI/chatbot present, 'under construction' label: {has_uc}")

print(f"\n{'='*70}\nFINDINGS SUMMARY ({len(all_findings)})\n{'='*70}")
for f in all_findings:
    print(f"  S{f[0]} [{f[1]}] {f[2]}")
