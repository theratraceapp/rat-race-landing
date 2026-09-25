#!/usr/bin/env python3
"""Build 7 Instagram carousel slides (1080x1350) for Rat Race — leagues carousel."""
from PIL import Image, ImageDraw, ImageFont
import os

BASE = os.path.expanduser("~/workspace/rat-race-v0/content/social-batch-1")
VIS = os.path.join(BASE, "visuals")
FONTS = os.path.join(BASE, "final", "fonts")
OUT = os.path.join(BASE, "final", "carousel-leagues")
os.makedirs(OUT, exist_ok=True)

W, H = 1080, 1350
MARGIN = 90
CW = W - 2 * MARGIN  # 900

INK = (10, 10, 11)
TEXT = (244, 241, 232)
MUTED = (154, 149, 138)
GOLD = (201, 161, 92)
HAIR = (38, 38, 41)

ACCENTS = {
    "climb": (176, 141, 87),
    "freedom": (201, 161, 92),
    "empire": (229, 200, 126),
    "dynasty": (237, 230, 214),
}

FR500 = os.path.join(FONTS, "Fraunces-500.ttf")
FR600 = os.path.join(FONTS, "Fraunces-600.ttf")
IN400 = os.path.join(FONTS, "latin-400-normal.ttf")
IN500 = os.path.join(FONTS, "latin-500-normal.ttf")
IN600 = os.path.join(FONTS, "latin-600-normal.ttf")


def F(path, size):
    return ImageFont.truetype(path, size)


def tw(font, text):
    bb = font.getbbox(text)
    return bb[2] - bb[0]


def wrap(text, font, max_w):
    words = text.split()
    lines, cur = [], ""
    for wd in words:
        t = (cur + " " + wd).strip()
        if tw(font, t) <= max_w or not cur:
            cur = t
        else:
            lines.append(cur)
            cur = wd
    if cur:
        lines.append(cur)
    return lines


def center(draw, cx, y_mid, text, font, fill):
    draw.text((cx, y_mid), text, font=font, fill=fill, anchor="mm")


def tracked(draw, cx, y_mid, text, font, fill, tracking):
    widths = [tw(font, ch) for ch in text]
    total = sum(widths) + tracking * (len(text) - 1)
    x = cx - total / 2
    for ch, wch in zip(text, widths):
        draw.text((x, y_mid), ch, font=font, fill=fill, anchor="lm")
        x += wch + tracking


def badge_crop(path):
    """Crop the circular badge ring (excluding baked-in caption), square."""
    im = Image.open(path).convert("RGB")
    px = im.load()
    w, h = im.size
    bg = px[5, 5]

    def bright(x, y):
        r, g, b = px[x, y]
        return abs(r - bg[0]) + abs(g - bg[1]) + abs(b - bg[2]) > 80

    ymid = h // 2
    xs = [x for x in range(w) if bright(x, ymid)]
    l, r = min(xs), max(xs)
    cx = (l + r) / 2
    rad = (r - l) / 2
    ys = [y for y in range(h) if bright(int(cx), y)]
    top = min(ys)
    pad = rad * 0.07
    x0 = int(cx - rad - pad)
    y0 = int(top - pad)
    side = int(rad * 2 + pad * 2)
    return im.crop((x0, y0, x0 + side, y0 + side))


BADGES = {k: badge_crop(os.path.join(VIS, f"league-badge-{k}.webp"))
          for k in ("climb", "freedom", "empire", "dynasty")}

# sanity: required glyphs (arrow drawn from DejaVu Sans — Inter latin subset lacks it)
from fontTools.ttLib import TTFont
_cmap = TTFont(IN600).getBestCmap()
for ch, name in [("·", "middot"), ("—", "emdash"), ("’", "rsquo")]:
    assert ord(ch) in _cmap, f"missing glyph {name}"
ARROW_FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
assert 0x2192 in TTFont(ARROW_FONT).getBestCmap(), "no arrow in DejaVu"
print("glyph check ok: · — ’ (→ via DejaVu Sans)")


def center_mixed(draw, cx, y_mid, segments):
    """segments: list of (text, font, fill). Centers the combined run."""
    total = sum(tw(f, t) for t, f, _ in segments)
    x = cx - total / 2
    for t, f, fill in segments:
        draw.text((x, y_mid), t, font=f, fill=fill, anchor="lm")
        x += tw(f, t)


def new_slide():
    return Image.new("RGB", (W, H), INK)


# ---------------- Slide 1: cover ----------------
def slide1():
    img = new_slide()
    d = ImageDraw.Draw(img)
    cx = W / 2
    y = 352
    f_title = F(FR600, 78)
    pitch = int(78 * 1.18)
    y1 = y + 44
    y2 = y1 + pitch
    center(d, cx, y1, "THE 4 LEAGUES", f_title, GOLD)
    center(d, cx, y2, "OF WEALTH", f_title, GOLD)
    y = y2 + pitch / 2 + 52
    f_sub = F(IN400, 42)
    center(d, cx, y, "Find your lane.", f_sub, TEXT)
    y += 30 + 118
    # badges row
    size, gap = 190, 40
    total = 4 * size + 3 * gap
    x = (W - total) / 2
    for k in ("climb", "freedom", "empire", "dynasty"):
        b = BADGES[k].resize((size, size), Image.LANCZOS)
        img.paste(b, (int(x), int(y)))
        x += size + gap
    img.save(os.path.join(OUT, "slide-1.png"))
    print("slide-1 saved")


# ---------------- Slides 2-5: leagues ----------------
LEAGUES = [
    ("climb", "01", "THE CLIMB", "$0 → $1M",
     "The proving ground. Every dollar here is earned twice: once by making it, once by not spending it. The first million is the hardest \u2014 and the most instructive."),
    ("freedom", "02", "THE FREEDOM", "$1M → $10M",
     "The point where work becomes optional and money becomes optionality. You\u2019re no longer climbing out \u2014 you\u2019re compounding up."),
    ("empire", "03", "THE EMPIRE", "$10M → $100M",
     "Wealth stops being a balance and becomes a machine. Capital has its own gravity now. The game shifts from earning to allocating."),
    ("dynasty", "04", "THE DYNASTY", "$100M+",
     "Beyond money, into legacy. The question changes from \u201chow much?\u201d to \u201cfor whom \u2014 and for how long?\u201d"),
]


def slide_league(idx, key, num, name, rng, desc):
    img = new_slide()
    d = ImageDraw.Draw(img)
    cx = W / 2
    accent = ACCENTS[key]
    y = 148
    f_eye = F(IN600, 40)
    tracked(d, cx, y + 22, num, f_eye, accent, 10)
    y += 44 + 30
    f_name = F(FR600, 78)
    center(d, cx, y + 43, name, f_name, TEXT)
    y += 86 + 26
    f_rng = F(IN600, 44)
    f_arr = F(ARROW_FONT, 44)
    segs = []
    for part in rng.split("→"):
        if segs:
            segs.append(("→", f_arr, accent))
        if part:
            segs.append((part, f_rng, accent))
    center_mixed(d, cx, y + 24, segs)
    y += 48 + 30
    d.rectangle([cx - 60, y, cx + 60, y + 3], fill=accent)
    y += 3 + 48
    f_body = F(IN400, 38)
    lines = wrap(desc, f_body, CW)
    pitch = int(38 * 1.6)
    for i, ln in enumerate(lines):
        center(d, cx, y + pitch / 2 + i * pitch, ln, f_body, TEXT)
    y += len(lines) * pitch + 74
    bsize = 460
    # keep bottom margin >= 110
    if y + bsize > H - 110:
        bsize = H - 110 - int(y)
    b = BADGES[key].resize((bsize, bsize), Image.LANCZOS)
    img.paste(b, (int(cx - bsize / 2), int(y)))
    bottom = y + bsize
    img.save(os.path.join(OUT, f"slide-{idx}.png"))
    print(f"slide-{idx} saved: desc_lines={len(lines)} badge={bsize} bottom_margin={H - int(bottom)}")


# ---------------- Slide 6: why leagues ----------------
def slide6():
    img = new_slide()
    d = ImageDraw.Draw(img)
    cx = W / 2
    y = 218
    f_h = F(FR600, 74)
    center(d, cx, y + 41, "WHY LEAGUES?", f_h, GOLD)
    y += 82 + 54
    f_body = F(IN400, 38)
    para = ("A goal 30 years away feels abstract. Leagues turn one impossible number "
            "into four finishable chapters. You always know exactly which chapter "
            "you\u2019re in \u2014 and what the next one takes.")
    lines = wrap(para, f_body, CW)
    pitch = int(38 * 1.6)
    for i, ln in enumerate(lines):
        center(d, cx, y + pitch / 2 + i * pitch, ln, f_body, TEXT)
    y += len(lines) * pitch + 120
    # trajectory line + markers
    d.line([MARGIN, y, W - MARGIN, y], fill=HAIR, width=3)
    keys = ["climb", "freedom", "empire", "dynasty"]
    names = ["THE CLIMB", "THE FREEDOM", "THE EMPIRE", "THE DYNASTY"]
    col = CW / 4
    f_num = F(IN600, 30)
    f_nm = F(IN600, 26)
    for i, k in enumerate(keys):
        mx = MARGIN + col * (i + 0.5)
        ac = ACCENTS[k]
        d.ellipse([mx - 30, y - 30, mx + 30, y + 30], fill=ac)
        d.ellipse([mx - 11, y - 11, mx + 11, y + 11], fill=INK)
        tracked(d, mx, y + 78, f"0{i + 1}", f_num, ac, 6)
        center(d, mx, y + 122, names[i], f_nm, TEXT)
    img.save(os.path.join(OUT, "slide-6.png"))
    print(f"slide-6 saved: para_lines={len(lines)}")


# ---------------- Slide 7: CTA ----------------
def slide7():
    img = new_slide()
    d = ImageDraw.Draw(img)
    cx = W / 2
    y = 178
    f_h = F(FR600, 74)
    pitch_h = int(74 * 1.22)
    center(d, cx, y + 41, "Know your league.", f_h, TEXT)
    center(d, cx, y + 41 + pitch_h, "Track your trajectory.", f_h, GOLD)
    y += pitch_h + 82 + 64
    f_rr = F(FR600, 54)
    center(d, cx, y + 30, "Rat Race", f_rr, TEXT)
    y += 60 + 30
    f_body = F(IN400, 37)
    sub = ("a wealth tracker built around where you\u2019re headed, "
           "not just where you are.")
    lines = wrap(sub, f_body, 820)
    pitch = int(37 * 1.55)
    for i, ln in enumerate(lines):
        center(d, cx, y + pitch / 2 + i * pitch, ln, f_body, TEXT)
    y += len(lines) * pitch + 72
    # gold pill CTA
    f_cta = F(IN600, 40)
    label = "Join the waitlist"
    twd = tw(f_cta, label)
    px_, py_ = 66, 32
    bw, bh = twd + 2 * px_, 40 + 2 * py_ + 18
    x0 = cx - bw / 2
    d.rounded_rectangle([x0, y, x0 + bw, y + bh], radius=bh / 2, fill=GOLD)
    center(d, cx, y + bh / 2 + 2, label, f_cta, INK)
    y += bh + 30
    f_meta = F(IN500, 30)
    center(d, cx, y + 17, "link in bio \u00b7 theratrace.app", f_meta, MUTED)
    # lockup at bottom (wordmark + tagline, rows 586-830 / tagline below)
    lock = Image.open(os.path.join(VIS, "logo-reveal.webp")).convert("RGB").crop((440, 556, 1480, 906))
    lw = 520
    lh = int(lw * lock.size[1] / lock.size[0])
    lock = lock.resize((lw, lh), Image.LANCZOS)
    img.paste(lock, (int(cx - lw / 2), H - 110 - lh))
    img.save(os.path.join(OUT, "slide-7.png"))
    print("slide-7 saved")


if __name__ == "__main__":
    slide1()
    for i, (key, num, name, rng, desc) in enumerate(LEAGUES, start=2):
        slide_league(i, key, num, name, rng, desc)
    slide6()
    slide7()
    # verify
    for i in range(1, 8):
        p = os.path.join(OUT, f"slide-{i}.png")
        im = Image.open(p)
        assert im.size == (1080, 1350), (p, im.size)
    print("ALL 7 VERIFIED 1080x1350")
