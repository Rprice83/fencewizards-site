from pathlib import Path
import json, subprocess, sys
root=Path(__file__).resolve().parent.parent
sys.path.insert(0,str(root/'asset_tools/dependencies'))
import imageio_ffmpeg
ffmpeg=imageio_ffmpeg.get_ffmpeg_exe()
assets=json.loads((root/'organized-assets/asset-register.json').read_text(encoding='utf-8'))['assets']
byid={a['asset_id']:a for a in assets}
output=root/'website-preview/dist/assets/hero.mp4'
sources=[str(root/byid[k]['original_path']) for k in ['FW-V009','FW-V006','FW-V004']]
args=[ffmpeg,'-y','-hide_banner','-loglevel','error']
for source in sources: args+=['-i',source]
filters=';'.join(f'[{i}:v]scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,fps=24,trim=duration=6,setpts=PTS-STARTPTS[v{i}]' for i in range(3))+';[v0][v1][v2]concat=n=3:v=1:a=0[out]'
args+=['-filter_complex',filters,'-map','[out]','-an','-map_metadata','-1','-c:v','libx264','-crf','28','-preset','fast','-pix_fmt','yuv420p','-movflags','+faststart',str(output)]
subprocess.run(args,check=True)
print(json.dumps({'video':str(output),'bytes':output.stat().st_size}))
