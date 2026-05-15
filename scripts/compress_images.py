import os
from PIL import Image
import glob

source_dir = "/Volumes/Tung's Data/code/smb_sunshinecity/ANH REN"
target_dir = "/Volumes/Tung's Data/code/smb_sunshinecity/public/images/render"

os.makedirs(target_dir, exist_ok=True)

# Delete existing images in target to clean up
for f in glob.glob(os.path.join(target_dir, "*")):
    try:
        os.remove(f)
    except:
        pass

images = []
for file in os.listdir(source_dir):
    if file.lower().endswith(('.jpg', '.jpeg', '.png', '.jfif')):
        source_path = os.path.join(source_dir, file)
        filename = os.path.splitext(file)[0].replace(" ", "_").replace("(", "").replace(")", "")
        target_path = os.path.join(target_dir, f"{filename}.webp")
        
        try:
            with Image.open(source_path) as img:
                # Convert to RGB if necessary
                if img.mode in ("RGBA", "P"):
                    img = img.convert("RGB")
                
                # Resize if width > 1600 to save space
                if img.width > 1600:
                    ratio = 1600 / img.width
                    new_size = (1600, int(img.height * ratio))
                    img = img.resize(new_size, Image.Resampling.LANCZOS)
                
                # Save as webp
                img.save(target_path, "webp", quality=80, method=6)
                images.append(f"{filename}.webp")
                print(f"Compressed {file} -> {filename}.webp")
        except Exception as e:
            print(f"Error processing {file}: {e}")

print("COMPRESSED_FILES:", ",".join(images))
