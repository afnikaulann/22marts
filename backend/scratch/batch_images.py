import requests
import re
import json
import time
import os

with open('scratch/beauty_products.json', 'r') as f:
    products = json.load(f)

# Let's try items 5 to 15 (skipping the AHA stuff for now)
batch = products[5:15]

def get_image(query):
    url = "https://duckduckgo.com/"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
    try:
        res = requests.post(url, data={'q': query}, headers=headers, timeout=10)
        searchObj = re.search(r'vqd=([\d-]+)\&', res.text)
        if not searchObj:
            return None
            
        vqd = searchObj.group(1)
        searchUrl = url + "i.js"
        params = (('l', 'us-en'), ('o', 'json'), ('q', query), ('vqd', vqd), ('f', ',,,'), ('p', '1'), ('v7exp', 'a'))
        res = requests.get(searchUrl, headers=headers, params=params, timeout=10)
        data = json.loads(res.text)
        for result in data.get('results', []):
            if 'image' in result:
                return result['image']
    except Exception as e:
        print(f"Error for {query}: {e}")
    return None

os.makedirs('../../frontend/public/perawatan', exist_ok=True)

success_count = 0
results = []
for p in batch:
    name = p['name']
    print(f"Searching image for: {name}")
    # Search for product on Shopee or Tokopedia to get real local images
    img_url = get_image(name + " shopee")
    if img_url:
        try:
            img_data = requests.get(img_url, timeout=10).content
            safe_name = "".join([c for c in name if c.isalnum() or c==' ']).strip()
            file_path = f"../../frontend/public/perawatan/{safe_name}.jpg"
            with open(file_path, 'wb') as handler:
                handler.write(img_data)
            p['image_path'] = f"/perawatan/{safe_name}.jpg"
            success_count += 1
            print(" -> Success!")
        except Exception as e:
            print(f" -> Failed to download {name}: {e}")
    else:
        print(f" -> No image found for {name}")
    results.append(p)
    time.sleep(2) # slightly longer delay

with open('scratch/beauty_batch.json', 'w') as f:
    json.dump(results, f)

print(f"Finished downloading {success_count} images.")
