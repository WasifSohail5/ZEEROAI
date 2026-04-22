import os
import asyncio
import queue
import logging
import numpy as np
import wave
import sounddevice as sd
from dataclasses import dataclass
from pathlib import Path

CHUNK_SIZE = 2205
DEFAULT_MODEL_NAME = "en_US-lessac-high"

class TTS:
    def __init__(self, model_path=None, config_path=None, use_cuda=False):
        from piper import PiperVoice
        model_file = f"{DEFAULT_MODEL_NAME}.onnx"
        config_file = f"{DEFAULT_MODEL_NAME}.onnx.json"
        
        # Adjust to look in backend/ if running from root
        backend_dir = Path.cwd() / "backend"
        if not (backend_dir / model_file).exists():
            backend_dir = Path.cwd()
            
        self.model_path = model_path or str(backend_dir / model_file)
        self.config_path = config_path or str(backend_dir / config_file)
        self._voice = PiperVoice.load(self.model_path, config_path=self.config_path, use_cuda=use_cuda)
        self.sample_rate = self._voice.config.sample_rate

    async def synthesize_to_file(self, text: str, output_wav: str, play_live=False):
        loop = asyncio.get_running_loop()
        q = queue.Queue(maxsize=64)
        def synth_worker():
            try:
                for chunk in self._voice.synthesize(text):
                    raw_bytes = getattr(chunk, "audio_int16_bytes", None) or bytes(chunk)
                    q.put(raw_bytes)
            finally: q.put(None)
        loop.run_in_executor(None, synth_worker)
        with wave.open(output_wav, "wb") as wf:
            wf.setnchannels(1)
            wf.setsampwidth(2)
            wf.setframerate(self.sample_rate)
            while True:
                raw_chunk = await loop.run_in_executor(None, q.get)
                if raw_chunk is None: break
                wf.writeframes(raw_chunk)
        with wave.open(output_wav, "rb") as wf:
            duration = wf.getnframes() / float(wf.getframerate())
        return output_wav, duration
