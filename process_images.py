import os
from PIL import Image, ImageEnhance

# File paths
img1_path = "/home/sachin_patil_ubona/.cursor/projects/home-sachin-patil-ubona-website/assets/c__Users_sachin.patil_ubona_AppData_Roaming_Cursor_User_workspaceStorage_a577d25f8beaa5123fd4bc4bc28d0801_images_12b4c118-b080-46d6-a704-d7e5e7c3f8c2-62b3b17e-c4a3-4b48-8c2d-51ad031b9e7c.png"
img2_path = "/home/sachin_patil_ubona/.cursor/projects/home-sachin-patil-ubona-website/assets/c__Users_sachin.patil_ubona_AppData_Roaming_Cursor_User_workspaceStorage_a577d25f8beaa5123fd4bc4bc28d0801_images_674aaee4-630a-4f0b-8eca-d36b7f70abae-0f126df4-ffe5-4d7a-815f-1b44dd0cd39e.png"
img3_path = "/home/sachin_patil_ubona/.cursor/projects/home-sachin-patil-ubona-website/assets/c__Users_sachin.patil_ubona_AppData_Roaming_Cursor_User_workspaceStorage_a577d25f8beaa5123fd4bc4bc28d0801_images_IMG_5116-c4e24ade-5ba1-484d-8194-e5250506717d.png"

out_dir = "/home/sachin_patil_ubona/website/assets/images/"
os.makedirs(out_dir, exist_ok=True)

def crop_to_3_4(img):
    w, h = img.size
    target_ratio = 3 / 4
    current_ratio = w / h

    if current_ratio > target_ratio:
        # Image is wider than 3:4, crop width
        new_w = int(h * target_ratio)
        left = (w - new_w) / 2
        right = left + new_w
        top = 0
        bottom = h
    else:
        # Image is taller than 3:4, crop height
        new_h = int(w / target_ratio)
        top = (h - new_h) / 2
        bottom = top + new_h
        left = 0
        right = w
        
    return img.crop((left, top, right, bottom))

def enhance_img1(img):
    # Traditional: Enhance warmth (color) and contrast
    img = ImageEnhance.Color(img).enhance(1.15)
    img = ImageEnhance.Contrast(img).enhance(1.05)
    return img

def enhance_img2(img):
    # B&W Hands: Enhance contrast
    img = ImageEnhance.Contrast(img).enhance(1.2)
    return img

def enhance_img3(img):
    # Casual Night: Adjust lighting (brightness/contrast)
    img = ImageEnhance.Brightness(img).enhance(1.1)
    img = ImageEnhance.Contrast(img).enhance(1.05)
    img = ImageEnhance.Color(img).enhance(1.1)
    return img

try:
    img1 = Image.open(img1_path)
    if img1.mode == 'RGBA': img1 = img1.convert('RGB')
    img1 = crop_to_3_4(img1)
    img1 = enhance_img1(img1)
    img1.save(os.path.join(out_dir, "preview-1.jpg"), quality=90)
    print("Saved preview-1.jpg")
except Exception as e:
    print("Error processing image 1:", e)

try:
    img2 = Image.open(img2_path)
    if img2.mode == 'RGBA': img2 = img2.convert('RGB')
    img2 = crop_to_3_4(img2)
    img2 = enhance_img2(img2)
    img2.save(os.path.join(out_dir, "preview-2.jpg"), quality=90)
    print("Saved preview-2.jpg")
except Exception as e:
    print("Error processing image 2:", e)

try:
    img3 = Image.open(img3_path)
    if img3.mode == 'RGBA': img3 = img3.convert('RGB')
    img3 = crop_to_3_4(img3)
    img3 = enhance_img3(img3)
    img3.save(os.path.join(out_dir, "preview-3.jpg"), quality=90)
    print("Saved preview-3.jpg")
except Exception as e:
    print("Error processing image 3:", e)

