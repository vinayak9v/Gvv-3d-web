from PIL import Image
from collections import Counter
import math

IN = 'public/claud.png'
OUT = 'public/claud_clean.png'

img = Image.open(IN).convert('RGBA')
w,h = img.size
px = img.load()

# sample a grid of pixels to find the most common background colors
samples = []
step = max(8, min(w,h)//40)
for y in range(0, h, step):
    for x in range(0, w, step):
        r,g,b,a = px[x,y]
        samples.append((r,g,b))

# quantize samples and find common colors
rounded = [((r//16)*16,(g//16)*16,(b//16)*16) for (r,g,b) in samples]
counts = Counter(rounded)
common = [c for c,_ in counts.most_common(6)]
print('Detected common colors (approx):', common)

# choose top two as checkerboard colors
if len(common) >= 2:
    bg_colors = common[:2]
else:
    bg_colors = common

# function to compute color distance
def dist(c1, c2):
    return math.sqrt(sum((a-b)**2 for a,b in zip(c1,c2)))

# determine threshold dynamically based on spread
# compute average distance between bg colors
if len(bg_colors) >= 2:
    base_dist = dist(bg_colors[0], bg_colors[1])
else:
    base_dist = 40
threshold = max(20, base_dist * 0.6)
print('Using threshold:', threshold)

# create new image and make bg-like pixels transparent
out = Image.new('RGBA', (w,h))
out_px = out.load()

for y in range(h):
    for x in range(w):
        r,g,b,a = px[x,y]
        # if fully transparent already, keep
        if a == 0:
            out_px[x,y] = (r,g,b,0)
            continue
        # compare to any bg color
        is_bg = False
        for bc in bg_colors:
            if dist((r,g,b), bc) <= threshold:
                is_bg = True
                break
        if is_bg:
            out_px[x,y] = (r,g,b,0)
        else:
            out_px[x,y] = (r,g,b,a)

out.save(OUT)
print('Saved cleaned image to', OUT)
