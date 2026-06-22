from PIL import Image

IN = 'public/claud_clean.png'
OUT = 'public/claud_clean.png'

img = Image.open(IN)
w, h = img.size

# Crop 15% from bottom, keep left/right/top as is
crop_amount = int(h * 0.15)
cropped = img.crop((0, 0, w, h - crop_amount))

cropped.save(OUT)
print(f'Cropped image from bottom by {crop_amount}px. New size: {cropped.size}')
