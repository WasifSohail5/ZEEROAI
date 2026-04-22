import os
import re
import time
import asyncio
import requests
import tempfile
import uuid
import cloudinary
import cloudinary.uploader
from supabase import create_client, Client
from pathlib import Path
from jinja2 import Template
from openai import OpenAI
from moviepy import ImageClip, AudioFileClip, concatenate_videoclips

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By

# Import your custom PIPERR setup
from PIPERR import TTS

from dotenv import load_dotenv
env_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path=env_path, override=True)

# =========================
# CONFIG
# =========================
UNSPLASH_ACCESS_KEY = os.getenv("UNSPLASH_ACCESS_KEY")
NVIDIA_BASE_URL = os.getenv("NVIDIA_BASE_URL")
NVIDIA_API_KEY = os.getenv("NVIDIA_API_KEY")

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME", "dal44rbsb"),
    api_key=os.getenv("CLOUDINARY_API_KEY", "774944988691515"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET", "Q5jE-T2g2LhC-k2y1iI2qLd2iL"),
    secure=True
)

client = OpenAI(
    base_url=NVIDIA_BASE_URL,
    api_key=NVIDIA_API_KEY 
    )

tts_engine = TTS()
TEMPLATES = {
    # 1. CYBER: Neon, futuristic, scanner animations
    "cyber": """
<style>
    @import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@700&family=Plus+Jakarta+Sans:wght@300;700&display=swap');
    :root { --accent: #00f2ff; --secondary: #7000ff; --bg-dark: #030305; --glass: rgba(255, 255, 255, 0.02); }
    body, html { margin: 0; padding: 0; background: #030305; color: #fff; font-family: 'Plus Jakarta Sans', sans-serif; scroll-snap-type: y mandatory; overflow-x: hidden; }
    .slide { width: 100vw; height: 100vh; position: relative; display: flex; align-items: center; justify-content: center; scroll-snap-align: start; }
    .bg-layer { position: absolute; inset: 0; background-size: cover; background-position: center; opacity: 0.25; filter: brightness(0.3); z-index: 0; }
    .container { position: relative; z-index: 10; width: 90%; display: flex; gap: 50px; align-items: center; }
    h1 { font-family: 'Syncopate', sans-serif; text-transform: uppercase; margin: 0; }
    .glass-box { background: var(--glass); backdrop-filter: blur(30px); padding: 45px; border-radius: 30px; border: 1px solid rgba(255,255,255,0.08); }
    li { margin-bottom: 18px; color: rgba(255,255,255,0.7); padding-left: 20px; border-left: 2px solid var(--secondary); list-style: none; }
</style>
<div class="slide"><h1 style="font-size: 5rem;">{{ topic }}</h1></div>
{% for slide in slides %}
<div class="slide">
    <div class="container" style="flex-direction: {{ 'row-reverse' if loop.index is even else 'row' }}">
        <div style="flex: 1.2;">
            <span style="color:var(--accent); letter-spacing:5px;">MODULE {{ loop.index }}</span>
            <h1>{{ slide.title }}</h1>
            <div class="glass-box"><ul>{% for p in slide.content %}<li>{{ p }}</li>{% endfor %}</ul></div>
        </div>
        <div style="flex: 0.8;"><img src="{{ slide.bg }}" style="width:100%; border-radius:25px;"></div>
    </div>
</div>
{% endfor %}
""",

    # 2. HISTORY: Vintage, paper texture, tilted photos
    "history": """
<style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,900;1,400&display=swap');
    body { background: #1a1612; color: #d4c4a8; font-family: serif; margin: 0; scroll-snap-type: y mandatory; }
    .slide { height: 100vh; display: flex; scroll-snap-align: start; align-items: center; padding: 0 10%; position: relative; }
    .photo-frame { background: #fff; padding: 15px 15px 60px 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); transform: rotate(-2deg); }
    h1 { font-family: 'Playfair Display', serif; font-size: 4rem; color: #f2e6d0; }
</style>
<div class="slide" style="justify-content: center;"><h1>{{ topic }}</h1></div>
{% for slide in slides %}
<div class="slide" style="flex-direction: {{ 'row-reverse' if loop.index is even else 'row' }}">
    <div style="flex: 1; padding: 40px;">
        <span style="color: #8c7851;">ERA {{ loop.index }}</span>
        <h1>{{ slide.title }}</h1>
        <ul>{% for p in slide.content %}<li>{{ p }}</li>{% endfor %}</ul>
    </div>
    <div style="flex: 1; display:flex; justify-content:center;">
        <div class="photo-frame" style="transform: rotate({{ (loop.index % 2 == 0) and '3' or '-3' }}deg);">
            <img src="{{ slide.bg }}" style="width: 350px; filter: sepia(0.5);">
        </div>
    </div>
</div>
{% endfor %}
""",

    # 3. SWISS: Bold, high-contrast, minimalist
    "swiss": """
<style>
    body { background: #f0f0f0; color: #000; font-family: Helvetica, sans-serif; margin: 0; scroll-snap-type: y mandatory; }
    .slide { height: 100vh; display: flex; scroll-snap-align: start; border-bottom: 20px solid #ff3e3e; }
    h1 { font-size: 6rem; font-weight: 900; text-transform: uppercase; letter-spacing: -5px; line-height: 0.8; }
    .image { flex: 1; background-size: cover; background-position: center; filter: grayscale(1); }
</style>
<div class="slide">
    <div style="flex:1; padding:80px; display:flex; align-items:flex-end;"><h1>{{ topic }}</h1></div>
    <div class="image" style="background-image:url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b')"></div>
</div>
{% for slide in slides %}
<div class="slide" style="flex-direction: {{ 'row-reverse' if loop.index is even else 'row' }}">
    <div style="flex:1; padding:80px; display:flex; flex-direction:column; justify-content:center;">
        <h2 style="font-size:3rem; text-transform:uppercase;">{{ slide.title }}</h2>
        <ul style="list-style:none; padding:0;">{% for p in slide.content %}<li style="border-left:10px solid #000; padding-left:15px; margin:10px 0; font-weight:bold;">{{ p }}</li>{% endfor %}</ul>
    </div>
    <div class="image" style="background-image:url('{{ slide.bg }}')"></div>
</div>
{% endfor %}
""",

    # 5. BRUTALIST: Raw, neon yellow, blocky
    "brutalist": """
<style>
    body { background: #fff; color: #000; font-family: 'Archivo Black', sans-serif; margin: 0; scroll-snap-type: y mandatory; }
    .slide { height: 100vh; display: flex; scroll-snap-align: start; border: 10px solid #000; }
    .text { flex: 1.5; padding: 60px; background: #ffff00; display: flex; flex-direction: column; justify-content: center; }
    h1 { font-size: 5rem; text-transform: uppercase; line-height: 0.8; }
</style>
<div class="slide">
    <div class="text" style="background:#ff00ff; color:#fff;"><h1>{{ topic }}</h1></div>
</div>
{% for slide in slides %}
<div class="slide" style="flex-direction: {{ 'row-reverse' if loop.index is even else 'row' }}">
    <div class="text">
        <h1>{{ slide.title }}</h1>
        <div style="border:5px solid #000; padding:20px; background:#fff; box-shadow:15px 15px 0 #000;">
            <ul style="list-style:none; padding:0;">{% for p in slide.content %}<li>> {{ p }}</li>{% endfor %}</ul>
        </div>
    </div>
    <div style="flex:1; background-size:cover; background-image:url('{{ slide.bg }}'); border-left:10px solid #000;"></div>
</div>
{% endfor %}
""",

    # 6. MAGAZINE: Editorial, white space, elegant
    "magazine": """
<style>
    body { background: #fff; color: #1a1a1a; font-family: serif; margin: 0; scroll-snap-type: y mandatory; }
    .slide { height: 100vh; display: flex; scroll-snap-align: start; padding: 5%; box-sizing: border-box; }
    h1 { font-size: 4rem; text-transform: uppercase; border-bottom: 2px solid #000; }
</style>
<div class="slide" style="flex-direction:column; justify-content:center; align-items:center;"><h1>{{ topic }}</h1></div>
{% for slide in slides %}
<div class="slide" style="flex-direction: {{ 'row-reverse' if loop.index is even else 'row' }}">
    <div style="flex:1; padding:40px; display:flex; flex-direction:column; justify-content:center;">
        <span style="border-bottom:1px solid #000;">FOLIO {{ loop.index }}</span>
        <h1>{{ slide.title }}</h1>
        <ul style="list-style:none; padding:0;">{% for p in slide.content %}<li style="margin:15px 0; border-bottom:1px solid #eee;">{{ p }}</li>{% endfor %}</ul>
    </div>
    <div style="flex:1.2;"><img src="{{ slide.bg }}" style="width:100%; height:100%; object-fit:cover;"></div>
</div>
{% endfor %}
""",

    # 7. CORPORATE: Professional, blue accents, clean
    "corporate": """
<style>
    body { background: #f8fafc; color: #1e293b; font-family: sans-serif; margin: 0; scroll-snap-type: y mandatory; }
    .slide { height: 100vh; display: flex; scroll-snap-align: start; align-items: center; padding: 0 10%; gap: 50px; }
    h1 { font-size: 3.5rem; color: #0f172a; }
    .card { background: #fff; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
</style>
<div class="slide" style="justify-content:center;"><h1>{{ topic }}</h1></div>
{% for slide in slides %}
<div class="slide" style="flex-direction: {{ 'row-reverse' if loop.index is even else 'row' }}">
    <div style="flex:1;">
        <p style="color:#3b82f6; font-weight:bold;">CHAPTER {{ loop.index }}</p>
        <h1>{{ slide.title }}</h1>
        <ul style="padding:0; list-style:none;">{% for p in slide.content %}<li class="card" style="margin:10px 0;">{{ p }}</li>{% endfor %}</ul>
    </div>
    <div style="flex:1;"><img src="{{ slide.bg }}" style="width:100%; border-radius:12px; box-shadow: 0 20px 25px rgba(0,0,0,0.1);"></div>
</div>
{% endfor %}
"""
}

def capture_all_slides_integrated(html_file, output_folder="exported_frames"):
    chrome_options = Options()
    chrome_options.add_argument("--headless=new")

    driver = webdriver.Chrome(options=chrome_options)
    image_paths = []

    try:
        # 🔥 USING YOUR EXACT VIEWPORT OVERRIDE
        driver.execute_cdp_cmd("Emulation.setDeviceMetricsOverride", {
            "width": 1000,
            "height": 650,
            "deviceScaleFactor": 1,
            "mobile": False
        })

        file_path = "file://" + os.path.abspath(html_file)
        driver.get(file_path)
        time.sleep(2)  # allow fonts/images to load

        os.makedirs(output_folder, exist_ok=True)
        slides = driver.find_elements(By.CLASS_NAME, "slide")

        print(f"📸 Found {len(slides)} slides. Capturing...")

        # 🔥 YOUR EXACT LOOP LOGIC
        for i, slide in enumerate(slides):
            file_name = f"slide_{i}.png"  # Changed to 0-indexed for easier matching
            save_path = os.path.abspath(os.path.join(output_folder, file_name))

            driver.execute_script("arguments[0].scrollIntoView({block:'center'});", slide)
            time.sleep(0.2)
            slide.screenshot(save_path)
            image_paths.append(save_path)
            print(f"✅ Captured {file_name}")

    finally:
        driver.quit()

    return image_paths


# =========================
# HELPER FUNCTIONS
# =========================
def upload_to_cloudinary(local_path, resource_type, folder):
    result = cloudinary.uploader.upload(
        local_path,
        resource_type=resource_type,
        folder=folder
    )
    return result["secure_url"]

# =========================
# MAIN EXECUTION
# =========================
async def generate_lecture_core(topic: str, sections: list[str], template_name: str = "swiss", output_filename: str = "lecture_video.mp4", user_id: str = None) -> str:
    slides_metadata = []
    audio_data = []

    # Prepare Supabase integration URL
    image_urls = []
    audio_urls = []
    ppt_url = None
    video_url = None
    lecture_id = str(uuid.uuid4())

    # 1. Generate Title Audio
    _, t_dur = await tts_engine.synthesize_to_file(f"A lecture on {topic}", "title_audio.wav")
    audio_data.append(("title_audio.wav", t_dur))
    # Upload title audio
    try:
        title_audio_url = upload_to_cloudinary("title_audio.wav", "video", f"zeero/lectures/{lecture_id}/audio/")
        audio_urls.append(title_audio_url)
    except Exception as e:
        print(f"Failed to upload title audio: {e}")

    # 2. Generate Modules
    for i, sec in enumerate(sections):
        print(f"Processing content: {sec}")

        # Get Bullets
        p_prompt = f"4 bullet points for {topic}: {sec}. Keep under 20 words each. No bold."
        p_raw = client.chat.completions.create(model="meta/llama-3.1-70b-instruct",
                                               messages=[{"role": "user", "content": p_prompt}]).choices[
            0].message.content
        points = [re.sub(r'^\s*[\-\d\.\*]\s*', '', l) for l in p_raw.split('\n') if len(l.strip()) > 5][:4]

        # Get Script
        s_prompt = f"Lecture script for {sec}. Continuous text only."
        script = client.chat.completions.create(model="meta/llama-3.1-70b-instruct",
                                                messages=[{"role": "user", "content": s_prompt}]).choices[
            0].message.content

        # Get Image with fail-safes
        try:
            # Attempt 1: Very specific query
            img_data = requests.get(
                f"https://api.unsplash.com/search/photos?query={topic} {sec}&client_id={UNSPLASH_ACCESS_KEY}"
            ).json()
            
            if img_data.get("results") and len(img_data["results"]) > 0:
                img_url = img_data["results"][0]["urls"]["regular"]
            else:
                # Attempt 2: General topic query
                print(f"⚠️ No exact image found for '{topic} {sec}'. Searching for just '{topic}'.")
                img_data_fallback = requests.get(
                    f"https://api.unsplash.com/search/photos?query={topic}&client_id={UNSPLASH_ACCESS_KEY}"
                ).json()
                
                if img_data_fallback.get("results") and len(img_data_fallback["results"]) > 0:
                    img_url = img_data_fallback["results"][0]["urls"]["regular"]
                else:
                    raise IndexError("No results for general query")
                    
        except Exception as e:
            # Final Fallback: Clean abstract or neural-like background
            print(f"⚠️ Unsplash search entirely failed ({e}). Using default abstract fallback.")
            img_url = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000"

        slides_metadata.append({"title": sec, "content": points, "bg": img_url})

        # Synthesis
        a_path = f"audio_{i}.wav"
        _, dur = await tts_engine.synthesize_to_file(script, a_path)
        audio_data.append((a_path, dur))
        
        # Upload section audio
        try:
            sec_audio_url = upload_to_cloudinary(a_path, "video", f"zeero/lectures/{lecture_id}/audio/")
            audio_urls.append(sec_audio_url)
        except Exception as e:
            print(f"Failed to upload section audio: {e}")

    # 3. Create Master HTML
    master_html_path = "presentation.html"
    if template_name not in TEMPLATES:
        template_name = "swiss"
    
    full_html = Template(TEMPLATES[template_name]).render(topic=topic, slides=slides_metadata)
    with open(master_html_path, "w", encoding="utf-8") as f:
        f.write(full_html)

    # 4. Use YOUR logic to capture images
    image_paths = capture_all_slides_integrated(master_html_path)
    
    # Upload images
    for img_p in image_paths:
        try:
            img_url = upload_to_cloudinary(img_p, "image", f"zeero/lectures/{lecture_id}/images/")
            image_urls.append(img_url)
        except Exception as e:
            print(f"Failed to upload image {img_p}: {e}")
        
    # Also upload the presentation HTML/PPT equivalent as raw file for reference
    try:
        ppt_url = upload_to_cloudinary(master_html_path, "raw", f"zeero/lectures/{lecture_id}/ppt/")
    except Exception as e:
        print(f"Failed to upload presentation HTML: {e}")

    # 4.5 Insert "processing" record into Supabase immediately
    import time
    from supabase import create_client
    supabase_url = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
    supabase_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
    supabase = None
    if user_id and supabase_url and supabase_key:
        try:
            supabase = create_client(supabase_url, supabase_key)
            supabase.table("lectures").insert({
                "id": str(lecture_id),
                "user_id": user_id,
                "title": topic,
                "prompt": topic,
                "image_urls": image_urls,
                "audio_urls": audio_urls,
                "ppt_url": ppt_url,
                "thumbnail_url": image_urls[0] if image_urls else None,
                "video_url": None,
                "status": "processing"
            }).execute()
            print("✅ Inserted processing lecture record into Supabase.")
        except Exception as e:
            print(f"⚠️ Failed to insert processing state: {e}")

    # 5. Build Video
    print("\n🎬 Building Video...")
    clips = []
    
    try:
        #from moviepy import ImageClip, AudioFileClip, concatenate_videoclips
        import cloudinary.uploader
        for i, img_p in enumerate(image_paths):
            aud_p, duration = audio_data[i]
            img_clip = ImageClip(img_p).with_duration(duration + 0.5)
            aud_clip = AudioFileClip(aud_p)
            clips.append(img_clip.with_audio(aud_clip))

        final = concatenate_videoclips(clips, method="compose")
        final.write_videofile(output_filename, fps=24, codec="libx264")
        
        # Upload final video
        video_url = None
        for attempt in range(3):
            try:
                print(f"Uploading final video to Cloudinary (Attempt {attempt+1}/3)...")
                result = cloudinary.uploader.upload(
                    output_filename,
                    resource_type="video",
                    folder=f"zeero/lectures/{lecture_id}/video/",
                    chunk_size=6000000
                )
                video_url = result.get("secure_url")
                print("✅ Video uploaded successfully!")
                break
            except Exception as e:
                print(f"⚠️ Video upload failed (attempt {attempt+1}/3): {e}")
                if attempt < 2:
                    time.sleep(5)
                else:
                    video_url = None
    finally:
        # CLEANUP: Delete all local generated files so nothing is saved permanently on disk
        print("🧹 Cleaning up local temporary files...")
        
        # Delete generated audios
        for aud_path, _ in audio_data:
            if os.path.exists(aud_path):
                os.remove(aud_path)
                
        # Delete HTML
        if os.path.exists(master_html_path):
            os.remove(master_html_path)
            
        # Delete individual images
        for img_path in image_paths:
            if os.path.exists(img_path):
                os.remove(img_path)
                
        # Delete exported_frames folder entirely
        import shutil
        if os.path.exists("exported_frames"):
            shutil.rmtree("exported_frames", ignore_errors=True)
            
        # Delete the final mp4
        if os.path.exists(output_filename):
            os.remove(output_filename)

    
    # Save to Supabase completion
    if supabase and user_id:
        try:
            supabase.table("lectures").update({
                "video_url": video_url,
                "status": "ready" if video_url else "failed"
            }).eq("id", str(lecture_id)).execute()
            print("✅ Lecture updated to ready state in Supabase.")
        except Exception as e:
            print(f"⚠️ Failed to update ready state: {e}")

    print("✅ Finished!")
    return os.path.abspath(output_filename)


async def main():
    await generate_lecture_core("Quantum Computing", ["The Core Concept", "Superposition", "Entanglement"])

if __name__ == "__main__":
    asyncio.run(main())
