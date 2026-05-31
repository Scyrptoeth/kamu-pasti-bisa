from PIL import Image

def remove_background(input_path, output_path):
    img = Image.open(input_path)
    img = img.convert("RGBA")
    
    datas = img.getdata()
    
    new_data = []
    # Memproses background putih menjadi transparan
    # Kita gunakan threshold > 240 untuk menangani warna putih yang tidak murni
    for item in datas:
        if item[0] > 240 and item[1] > 240 and item[2] > 240:
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save(output_path, "PNG")
    print(f"Success: Background removed and saved to {output_path}")

input_file = "/Users/persiapantubel/Desktop/codex/website-belajar/kamu-pasti-bisa/koreksi/07-favicon-dan-logo.png"
remove_background(input_file, "/Users/persiapantubel/Desktop/codex/website-belajar/kamu-pasti-bisa/public/logo.png")
remove_background(input_file, "/Users/persiapantubel/Desktop/codex/website-belajar/kamu-pasti-bisa/src/app/icon.png")
