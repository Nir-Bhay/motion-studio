#!/usr/bin/env python3
"""
Combine Mahadev Barat Parts 01–10 into one complete ~18-minute 1080p30 MP4 movie
with sample-accurate continuous AAC audio and faststart streaming optimization.
"""

import json
import os
import subprocess

FFMPEG = "node_modules/@remotion/compositor-linux-x64-gnu/ffmpeg"
FFPROBE = "node_modules/@remotion/compositor-linux-x64-gnu/ffprobe"
OUT_DIR = "productions/005-mahadev-barat/out"
FINAL_MP4 = os.path.join(OUT_DIR, "mahadev-barat-full-movie-1080p30.mp4")

PARTS = [
    ("mahadev-barat-part01-1080p60.mp4", "भाग १: देव आराधना व बारात की तैयारी"),
    ("mahadev-barat-part02-1080p30.mp4", "भाग २: विष्णु-शिव संवाद व जटा-सर्प श्रृंगार"),
    ("mahadev-barat-part03-1080p30.mp4", "भाग ३: सर्प सेहरा, बिच्छू लटकन व चिता भस्म"),
    ("mahadev-barat-part04-1080p30.mp4", "भाग ४: भूत-प्रेत आव्हान व बारात प्रस्थान"),
    ("mahadev-barat-part05-1080p30.mp4", "भाग ५: इंद्र का वज्र व विचित्र भूत-प्रेत वर्णन"),
    ("mahadev-barat-part06-1080p30.mp4", "भाग ६: आई शंकर की बरतिया हिमाचल नगरी"),
    ("mahadev-barat-part07-1080p30.mp4", "भाग ७: साली नेग हास्य, गरुड़ पर नारायण व नारद"),
    ("mahadev-barat-part08-1080p30.mp4", "भाग ८: ब्रह्मा-इंद्र भ्रम व बालकों का भय"),
    ("mahadev-barat-part09-1080p30.mp4", "भाग ९: शरबत स्नान, उल्टे नंदी व मैना मूर्छा"),
    ("mahadev-barat-part10-1080p30.mp4", "भाग १०: नारद प्रबोधन, दिव्य विवाह व मंगल बधाई"),
]


def probe_duration_sec(path: str) -> float:
    out = subprocess.check_output(
        [FFPROBE, "-v", "error", "-show_entries", "format=duration", "-of", "json", path],
        text=True,
    )
    return float(json.loads(out)["format"]["duration"])


def main():
    tmp_dir = "/tmp/mahadev-full-movie"
    os.makedirs(tmp_dir, exist_ok=True)

    p1_src = os.path.join(OUT_DIR, PARTS[0][0])
    p1_30 = os.path.join(tmp_dir, "part01-1080p30.mp4")
    print("Normalizing Part 01 (60fps -> 30fps, high quality CRF 15)...")
    subprocess.run(
        [
            FFMPEG, "-y", "-i", p1_src,
            "-r", "30",
            "-c:v", "libx264", "-preset", "medium", "-crf", "15",
            "-pix_fmt", "yuvj420p", "-video_track_timescale", "90000",
            "-c:a", "copy",
            p1_30,
        ],
        check=True,
    )

    resolved_paths = [p1_30] + [os.path.join(OUT_DIR, fn) for fn, _ in PARTS[1:]]

    # Step 1: Concatenate exact H.264 video stream losslessly (-c:v copy)
    list_path = os.path.join(tmp_dir, "concat.txt")
    cur_sec = 0.0
    print("\n=== Chapter Timestamps ===")
    with open(list_path, "w") as lf:
        for path, (_, title) in zip(resolved_paths, PARTS):
            lf.write(f"file '{os.path.abspath(path)}'\n")
            dur = probe_duration_sec(path)
            m0, s0 = divmod(int(cur_sec), 60)
            m1, s1 = divmod(int(cur_sec + dur), 60)
            print(f"  {m0:02d}:{s0:02d} – {m1:02d}:{s1:02d} | {title} ({dur:.2f}s)")
            cur_sec += dur

    video_only = os.path.join(tmp_dir, "video_only.mp4")
    subprocess.run(
        [FFMPEG, "-y", "-f", "concat", "-safe", "0", "-i", list_path, "-an", "-c:v", "copy", video_only],
        check=True,
    )

    # Step 2: Concatenate audio continuously in PCM domain (eliminates AAC boundary DTS drift!)
    audio_inputs = []
    filter_parts = []
    for i, path in enumerate(resolved_paths):
        audio_inputs.extend(["-i", path])
        filter_parts.append(f"[{i}:a]aformat=sample_fmts=fltp:sample_rates=48000:channel_layouts=stereo[a{i}]")
    concat_in = "".join(f"[a{i}]" for i in range(len(resolved_paths)))
    filter_complex = ";".join(filter_parts) + f";{concat_in}concat=n={len(resolved_paths)}:v=0:a=1[aout]"

    audio_mp4 = os.path.join(tmp_dir, "audio_continuous.mp4")
    subprocess.run(
        [
            FFMPEG, "-y",
            *audio_inputs,
            "-filter_complex", filter_complex,
            "-map", "[aout]",
            "-c:a", "aac", "-b:a", "320k",
            audio_mp4,
        ],
        check=True,
    )

    # Step 3: Mux lossless video + continuous audio with +faststart
    subprocess.run(
        [
            FFMPEG, "-y",
            "-i", video_only,
            "-i", audio_mp4,
            "-c:v", "copy",
            "-c:a", "copy",
            "-metadata", "title=महादेव की बारात — संपूर्ण कथा (भाग १ से १०)",
            "-movflags", "+faststart",
            FINAL_MP4,
        ],
        check=True,
    )

    out_info = subprocess.check_output(
        [
            FFPROBE, "-v", "error",
            "-show_entries", "format=duration,size",
            "-show_entries", "stream=codec_name,width,height,r_frame_rate,sample_rate,channels,duration",
            "-of", "json", FINAL_MP4,
        ],
        text=True,
    )
    print(f"\nCreated Full Movie: {FINAL_MP4}")
    print(out_info)


if __name__ == "__main__":
    main()
