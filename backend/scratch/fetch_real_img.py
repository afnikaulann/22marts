import requests
import re
import json

def get_image(query):
    # simple DuckDuckGo image search scraper
    url = "https://duckduckgo.com/"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
    res = requests.post(url, data={'q': query}, headers=headers)
    searchObj = re.search(r'vqd=([\d-]+)\&', res.text)
    if not searchObj:
        return None
        
    vqd = searchObj.group(1)
    
    searchUrl = url + "i.js"
    params = (
        ('l', 'us-en'),
        ('o', 'json'),
        ('q', query),
        ('vqd', vqd),
        ('f', ',,,'),
        ('p', '1'),
        ('v7exp', 'a')
    )
    
    try:
        res = requests.get(searchUrl, headers=headers, params=params)
        data = json.loads(res.text)
        for result in data.get('results', []):
            if 'image' in result:
                return result['image']
    except:
        pass
        
    return None

if __name__ == '__main__':
    img_url = get_image("SKINTIFIC 3% TRANEXAMIC ACID SERUM product photo")
    if img_url:
        print(f"Found URL: {img_url}")
        
        # download it
        img_data = requests.get(img_url).content
        with open('../../frontend/public/perawatan/SKINTIFIC 3% TRANEXAMIE SERUM.png', 'wb') as handler:
            handler.write(img_data)
        print("Downloaded real image successfully!")
    else:
        print("Could not find image.")
