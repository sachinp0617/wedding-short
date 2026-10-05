from rembg import remove
from PIL import Image
import os

input_path = '/home/sachin_patil_ubona/website/assets/images/preview-1.jpg'
output_path = '/home/sachin_patil_ubona/website/assets/images/preview-1.jpg'

try:
    input_img = Image.open(input_path)
    output_img = remove(input_img)
    
    # Create a background to match the website theme
    # Let's create a dark/black background
    bg = Image.new("RGBA", output_img.size, (15, 15, 15, 255))
    bg.paste(output_img, (0, 0), output_img)
    
    bg = bg.convert("RGB")
    bg.save(output_path, quality=95)
    print("Successfully removed background and applied theme background.")
except Exception as e:
    print(f"Error: {e}")
