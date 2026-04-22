import requests
import os


def download_piper_model(model_name="en_US-lessac-high"):
    base_url = f"https://huggingface.co/rhasspy/piper-voices/resolve/main/en/en_US/lessac/high/"
    files = [f"{model_name}.onnx", f"{model_name}.onnx.json"]

    for file in files:
        if not os.path.exists(file):
            print(f"Downloading {file}...")
            r = requests.get(base_url + file, stream=True)
            with open(file, 'wb') as f:
                for chunk in r.iter_content(chunk_size=8192):
                    f.write(chunk)
            print("Done.")
        else:
            print(f"{file} already exists.")


if __name__ == "__main__":
    download_piper_model()
