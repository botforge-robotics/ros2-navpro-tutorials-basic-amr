import subprocess
from PIL import Image

def take_and_crop(url, full_path, crop_box, out_path, win_size='1280,3200'):
    subprocess.run([
        'google-chrome',
        '--headless=new',
        '--disable-gpu',
        '--no-sandbox',
        f'--window-size={win_size}',
        f'--screenshot={full_path}',
        url
    ], check=True)
    im = Image.open(full_path)
    cropped = im.crop(crop_box)
    cropped.save(out_path)

# L14 blueprint lower
take_and_crop(
    'http://localhost:4173/?no_modal=true#/lesson/14',
    '/home/chaitu/.gemini/antigravity-cli/brain/5b5c6e15-453a-4d6b-aa2f-31f266c4a27c/verify_l14_full.png',
    (240, 1900, 1260, 2600),
    '/home/chaitu/.gemini/antigravity-cli/brain/5b5c6e15-453a-4d6b-aa2f-31f266c4a27c/crop_l14_fixed.png',
    '1280,3200'
)

# L15 bridge
take_and_crop(
    'http://localhost:4173/?no_modal=true#/lesson/15',
    '/home/chaitu/.gemini/antigravity-cli/brain/5b5c6e15-453a-4d6b-aa2f-31f266c4a27c/verify_l15_full.png',
    (240, 1000, 1260, 1550),
    '/home/chaitu/.gemini/antigravity-cli/brain/5b5c6e15-453a-4d6b-aa2f-31f266c4a27c/crop_l15_bridge.png',
    '1280,3000'
)

# L15 TF image
im15 = Image.open('/home/chaitu/.gemini/antigravity-cli/brain/5b5c6e15-453a-4d6b-aa2f-31f266c4a27c/verify_l15_full.png')
im15.crop((240, 2050, 1260, 2900)).save('/home/chaitu/.gemini/antigravity-cli/brain/5b5c6e15-453a-4d6b-aa2f-31f266c4a27c/crop_l15_tf.png')

# L22 convergence
take_and_crop(
    'http://localhost:4173/?no_modal=true#/lesson/22',
    '/home/chaitu/.gemini/antigravity-cli/brain/5b5c6e15-453a-4d6b-aa2f-31f266c4a27c/verify_l22_full.png',
    (240, 900, 1260, 1750),
    '/home/chaitu/.gemini/antigravity-cli/brain/5b5c6e15-453a-4d6b-aa2f-31f266c4a27c/crop_l22_convergence.png',
    '1280,2600'
)

print('Generated screenshots!')
