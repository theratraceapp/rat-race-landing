#!/usr/bin/env python3
"""Build IG Carousel 2 slides (1080x1350) programmatically with PIL.
Renders at 2x then downscales for crisp typography."""

from PIL import Image, ImageDraw, ImageFont
import os

W, H = 1080, 1350
S = 2  # supersample
OUT = os.path.expanduser("~/workspace/rat-race-v0/content/social-batch-1/final")
os.makedirs(OUT, exist_ok=True)

# Palette
BG      = "#0A0A0B"
INK     = "#F4F1EA"   # off-white
DIM     = "#B9B5AA"   # dim off-white
FAINT   = "#8A877E"   # small print
GRAY    = "#6E6E73"   # muted gray (TRIVIA.)
GOLD    = "#C9A15C"
RED     = "#A85B4C"   # muted red
HAIR    = "#2A2A2E"   # hairline

FD = "/usr/share/fonts/truetype"
SERIF      = f"{FD}/noto/NotoSerif-Regular.ttf"
SERIF_B    = f"{FD}/noto/NotoSerif-Bold.ttf"
SERIF_SB   = f"{FD}/noto/NotoSerif-SemiBold.ttf"
SERIF_I    = f"{FD}/noto/NotoSerif-Italic.ttf"
SANS       = f"{FD}/noto/NotoSans-Regular.ttf"
SANS_B     = f"{FD}/noto/NotoSans-Bold.ttf"
SANS_I     = f"{FD}/noto/NotoSans-Italic.ttf"
EMOJI      = f"{FD}/noto/NotoColorEmoji.ttf"

def font(path, size):
    return ImageFont.truetype(path, size * S)

def new_slide():
    img = Image.new("RGB", (W * S, H * S), BG)
    return img, ImageDraw.Draw(img)

def wrap(d, text, fnt, max_w):
    words, lines, cur = text.split(), [], ""
    for w_ in words:
        t = (cur + " " + w_).strip()
        if d.textlength(t, font=fnt) <= max_w or not cur:
            cur = t
        else:
            lines.append(cur); cur = w_
    if cur: lines.append(cur)
    return lines

def line_h(d, fnt, text):
    b = d.textbbox((0, 0), text, font=fnt)
    return b[3] - b[1]

def text_c(d, cx, y, text, fnt, fill, ls=0):
    """Centered text; returns bottom y (unscaled coords passed in scaled space)."""
    if ls:
        # letterspaced: draw char by char
        widths = [d.textlength(c, font=fnt) for c in text]
        total = sum(widths) + ls * (len(text) - 1)
        x = cx - total / 2
        top = None
        for c, w_ in zip(text, widths):
            b = d.textbbox((x, y), c, font=fnt)
            d.text((x, y), c, font=fnt, fill=fill)
            x += w_ + ls
            top = b[1] if top is None else min(top, b[1])
        return b[3]
    b = d.textbbox((0, 0), text, font=fnt)
    w_ = b[2] - b[0]
    d.text((cx - w_ / 2 - b[0], y), text, font=fnt, fill=fill)
    return y + (b[3] - b[1])

def para_c(d, cx, y, text, fnt, fill, max_w, lh=1.35):
    for ln in wrap(d, text, fnt, max_w):
        y = text_c(d, cx, y, ln, fnt, fill) + (line_h(d, fnt, "Ag") * (lh - 1))
    return y

def rule(d, cx, y, w_, color=GOLD, h=3):
    d.rectangle([cx - w_ / 2, y, cx + w_ / 2, y + h], fill=color)

def dashed_h(d, x0, x1, y, fill, dash=14, gap=10, w_=3):
    x = x0
    while x < x1:
        d.line([x, y, min(x + dash, x1), y], fill=fill, width=w_)
        x += dash + gap

def dashed_v(d, x, y0, y1, fill, dash=12, gap=9, w_=3):
    y = y0
    while y < y1:
        d.line([x, y, x, min(y + dash, y1)], fill=fill, width=w_)
        y += dash + gap

def save(img, n):
    img = img.resize((W, H), Image.LANCZOS)
    p = os.path.join(OUT, f"carousel-2-slide-{n}.png")
    img.save(p)
    print("saved", p)

MX = 96 * S          # side margin
CW = (W - 192) * S   # content width
CX = W * S // 2

# ---------------------------------------------------------------- slide 1
img, d = new_slide()
f_big = font(SERIF_SB, 92)
y = 430 * S
text_c(d, CX, y, "YOUR NET WORTH", f_big, INK)
y = 545 * S
# "NUMBER IS " in ink + "TRIVIA." in muted gray with strikethrough
a, b = "NUMBER IS ", "TRIVIA."
wa = d.textlength(a, font=f_big); wb = d.textlength(b, font=f_big)
x0 = CX - (wa + wb) / 2
d.text((x0, y), a, font=f_big, fill=INK)
bb = d.textbbox((x0 + wa, y), b, font=f_big)
d.text((x0 + wa, y), b, font=f_big, fill=GRAY)
mid = (bb[1] + bb[3]) / 2
d.line([bb[0] - 6 * S, mid, bb[2] + 6 * S, mid], fill=GRAY, width=4 * S)
y = 730 * S
rule(d, CX, y, 96 * S)
y = 790 * S
text_c(d, CX, y, "Here\u2019s what makes it", font(SERIF_I, 52), DIM)
y = 880 * S
text_c(d, CX, y, "a plan.", font(SERIF_SB, 116), GOLD)
save(img, 1)

# ---------------------------------------------------------------- slide 2
img, d = new_slide()
y = 150 * S
text_c(d, CX, y, "A snapshot tells you where you are.", font(SERIF_SB, 54), INK)
y = 235 * S
text_c(d, CX, y, "It says nothing about where you\u2019re going.", font(SERIF_I, 50), DIM)
f_num = font(SERIF_B, 62)
for i, (cxr, color, rising, lbl) in enumerate(
        [(270, RED, False, "shrinking"), (810, GOLD, True, "growing")]):
    cxp = cxr * S
    text_c(d, cxp, 400 * S, "$100,000", f_num, INK)
    # mini chart
    x0, x1 = cxp - 210 * S, cxp + 210 * S
    yt, yb = 520 * S, 740 * S
    d.rectangle([x0, yt, x1, yb], outline=HAIR, width=2 * S)
    pts = []
    for k in range(41):
        t = k / 40
        x = x0 + t * (x1 - x0)
        yy = (yb - 30 * S) - t * ((yb - 60 * S) - (yt + 60 * S)) if rising \
             else (yt + 30 * S) + t * ((yb - 60 * S) - (yt + 60 * S))
        pts.append((x, yy))
    d.line(pts, fill=color, width=6 * S, joint="curve")
    text_c(d, cxp, 775 * S, lbl, font(SANS, 34), color)
y = 900 * S
para_c(d, CX, y,
       "$100k and shrinking is a very different situation from $100k and growing \u2014 but your app shows you the same number for both.",
       font(SANS, 37), DIM, CW, lh=1.5)
save(img, 2)

# ---------------------------------------------------------------- slide 3
img, d = new_slide()
y = 140 * S
text_c(d, CX, y, "Two people, both worth $100k.", font(SERIF_SB, 52), INK)
y = 245 * S
y = para_c(d, CX, y, "One saves $5k a month. The other spends $2k more than they earn.",
           font(SANS, 38), DIM, CW, lh=1.45)
# diverging chart
ox, oy = 170 * S, 830 * S
rx = 920 * S
gy = 450 * S   # gold end
ry = 900 * S   # red end
def curve(p0, p1, bend, n=60):
    (x0, y0), (x1, y1) = p0, p1
    pts = []
    for k in range(n + 1):
        t = k / n
        x = x0 + t * (x1 - x0)
        yy = y0 + t * (y1 - y0) + bend * 4 * t * (1 - t)
        pts.append((x, yy))
    return pts
gpts = curve((ox, oy), (rx, gy), -30 * S)
rpts = curve((ox, oy), (rx, ry), 20 * S)
d.line(gpts, fill=GOLD, width=7 * S, joint="curve")
d.line(rpts, fill=RED, width=7 * S, joint="curve")
d.ellipse([ox - 9 * S, oy - 9 * S, ox + 9 * S, oy + 9 * S], fill=INK)
text_c(d, ox, oy + 28 * S, "today", font(SANS, 30), FAINT)
# rate labels sit on the curves at t=0.55, offset perpendicular-ish
gx, gyy = gpts[int(0.55 * 60)]; rx_, ryy = rpts[int(0.55 * 60)]
text_c(d, gx, gyy - 78 * S, "+$5k/mo", font(SANS_B, 36), GOLD)
text_c(d, rx_, ryy + 40 * S, "-$2k/mo", font(SANS_B, 36), RED)
# endpoint labels, clear of the lines
text_c(d, rx - 105 * S, gy - 58 * S, "~$400k", font(SANS_B, 34), GOLD)
text_c(d, rx - 60 * S, ry - 72 * S, "~$0", font(SANS_B, 34), RED)
text_c(d, rx - 105 * S, 972 * S, "in 5 years", font(SANS, 30), FAINT)
y = 1010 * S
para_c(d, CX, y, "Same number today. In five years, one is near $400k \u2014 the other is near zero.",
       font(SANS, 38), DIM, CW, lh=1.45)
save(img, 3)

# ---------------------------------------------------------------- slide 4
img, d = new_slide()
y = 150 * S
text_c(d, CX, y, "Three inputs turn trivia into a plan:", font(SERIF_SB, 50), INK)
items = [
    ("WHERE YOU ARE", "your number today"),
    ("YOUR RATE", "what you add (or subtract) each month"),
    ("YOUR HORIZON", "the date you care about"),
]
y0 = 400 * S
for i, (head, sub) in enumerate(items):
    yy = y0 + i * 280 * S
    text_c(d, 150 * S, yy - 14 * S, str(i + 1), font(SERIF_SB, 76), GOLD)
    d.text((230 * S, yy), head, font=font(SANS_B, 42), fill=INK)
    d.text((230 * S, yy + 62 * S), "\u2014 " + sub, font=font(SANS, 38), fill=DIM)
save(img, 4)

# ---------------------------------------------------------------- slide 5
img, d = new_slide()
y = 140 * S
text_c(d, CX, y, "The math is simple:", font(SERIF_SB, 52), INK)
y = 260 * S
text_c(d, CX, y, "start + (monthly rate \u00d7 months)", font(SERIF_I, 50), INK)
y = 340 * S
text_c(d, CX, y, "= your line.", font(SERIF_I, 50), GOLD)
# self-drawing bending line crossing dashed goal
x0, x1 = 150 * S, 930 * S
gy = 560 * S
dashed_h(d, x0, x1, gy, "#5A5348", dash=16 * S, gap=12 * S, w_=3 * S)
text_c(d, x1 - 180 * S, gy - 52 * S, "arrival date", font(SANS, 30), FAINT)
pts = []
for k in range(81):
    t = k / 80
    x = x0 + t * (x1 - x0)
    # straight-ish then bending upward (quadratic bend)
    yy = 880 * S - t * 260 * S - (t ** 2) * 220 * S
    pts.append((x, yy))
d.line(pts, fill=GOLD, width=7 * S, joint="curve")
# crossing dot: solve approx where line meets gy
for (x, yy) in pts:
    if yy <= gy:
        d.ellipse([x - 11 * S, gy - 11 * S, x + 11 * S, gy + 11 * S], fill=GOLD)
        d.ellipse([x - 11 * S, gy - 11 * S, x + 11 * S, gy + 11 * S], outline=BG, width=3 * S)
        break
y = 1010 * S
para_c(d, CX, y, "Add a growth assumption and the line bends upward. Suddenly you have a trajectory \u2014 and trajectories have arrival dates.",
       font(SANS, 37), DIM, CW, lh=1.5)
save(img, 5)

# ---------------------------------------------------------------- slide 6
img, d = new_slide()
y = 150 * S
y = para_c(d, CX, y, "Quick example: $100k today, adding $5k/month, over 10 years = $700k before any growth at all.",
           font(SANS, 38), DIM, CW, lh=1.5)
text_c(d, CX, 440 * S, "$700,000", font(SERIF_B, 148), GOLD)
# baseline bar: straight line $100k -> $700k
x0, x1 = 190 * S, 890 * S
y0_, y1_ = 900 * S, 660 * S
d.line([(x0, y0_), (x1, y1_)], fill=DIM, width=6 * S)
d.ellipse([x0 - 10 * S, y0_ - 10 * S, x0 + 10 * S, y0_ + 10 * S], fill=DIM)
d.ellipse([x1 - 10 * S, y1_ - 10 * S, x1 + 10 * S, y1_ + 10 * S], fill=GOLD)
text_c(d, x0, y0_ + 28 * S, "$100k", font(SANS, 32), FAINT)
text_c(d, x1, y1_ - 62 * S, "$700k", font(SANS_B, 34), GOLD)
y = 990 * S
y = para_c(d, CX, y, "That\u2019s your baseline. Everything your money does beyond that is the plan working.",
           font(SANS, 38), DIM, CW, lh=1.5)
text_c(d, CX, 1180 * S, "(Illustrative example, not advice.)", font(SANS_I, 30), FAINT)
save(img, 6)

# ---------------------------------------------------------------- slide 7
img, d = new_slide()
y = 140 * S
y = para_c(d, CX, y, "Trajectories drift. Income changes, life happens.",
           font(SERIF_SB, 52), INK, CW, lh=1.4)
y = 330 * S
y = para_c(d, CX, y, "So re-plot monthly. A plan isn\u2019t a prediction \u2014 it\u2019s a compass you keep checking against reality.",
           font(SANS, 38), DIM, CW, lh=1.5)
# flight-path line with correction markers
x0, x1 = 150 * S, 930 * S
import math
pts = []
for k in range(121):
    t = k / 120
    x = x0 + t * (x1 - x0)
    yy = 830 * S - t * 300 * S + math.sin(t * 9) * 26 * S + math.sin(t * 23 + 1) * 10 * S
    pts.append((x, yy))
d.line(pts, fill=GOLD, width=7 * S, joint="curve")
for t in (0.12, 0.32, 0.52, 0.72, 0.9):
    x = x0 + t * (x1 - x0)
    yy = 830 * S - t * 300 * S + math.sin(t * 9) * 26 * S + math.sin(t * 23 + 1) * 10 * S
    dashed_v(d, x, yy - 64 * S, yy - 26 * S, FAINT, dash=8 * S, gap=7 * S, w_=3 * S)
    d.ellipse([x - 13 * S, yy - 13 * S, x + 13 * S, yy + 13 * S], fill=BG, outline=GOLD, width=5 * S)
save(img, 7)

# ---------------------------------------------------------------- slide 8
img, d = new_slide()
# small logo lockup
text_c(d, CX, 150 * S, "R A T   R A C E", font(SERIF_SB, 34), GOLD)
y = 400 * S
y = para_c(d, CX, y, "We\u2019re building a tracker that draws your line for you \u2014 and tells you the date you cross each league.",
           font(SERIF_SB, 48), INK, CW, lh=1.45)
rule(d, CX, 740 * S, 96 * S)
# CTA line with rat emoji (NotoColorEmoji is a 109px bitmap strike: render
# at native size on its own layer, then scale)
f_cta = font(SERIF_SB, 54)
em_native = ImageFont.truetype(EMOJI, 109)
em_layer = Image.new("RGBA", (220, 220), (0, 0, 0, 0))
de = ImageDraw.Draw(em_layer)
de.text((55, 55), "\U0001F400", font=em_native, embedded_color=True)
em_target = int(78 * S)
em_layer = em_layer.resize((em_target, em_target), Image.LANCZOS)
cta = "Join the waitlist \u2014 link in bio."
tw = d.textlength(cta, font=f_cta)
x0 = CX - (em_target + 18 * S + tw) / 2
yc = 830 * S
img.paste(em_layer, (int(x0), int(yc - 10 * S)), em_layer)
d.text((x0 + em_target + 18 * S, yc), cta, font=f_cta, fill=GOLD)
text_c(d, CX, 990 * S, "theratrace.app", font(SANS, 44), DIM)
text_c(d, CX, 1160 * S, "Educational content only, not financial advice.", font(SANS, 30), FAINT)
save(img, 8)

print("done")
