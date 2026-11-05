const canvas=document.getElementById('ruler'), slider=document.getElementById('scale'), value=document.getElementById('value');
slider.value=localStorage.getItem('calibration') || '100';
function draw() { const rect=canvas.getBoundingClientRect(), pixelRatio=window.devicePixelRatio || 1; canvas.width=Math.round(rect.width*pixelRatio); canvas.height=Math.round(rect.height*pixelRatio); const ctx=canvas.getContext('2d'); ctx.scale(pixelRatio,pixelRatio); ctx.fillStyle='white'; ctx.fillRect(0,0,rect.width,rect.height); ctx.fillStyle='black'; ctx.strokeStyle='black'; ctx.font='12px sans-serif';
  const dpi=MagicBox.screenDpi()/MagicBox.density()*Number(slider.value)/100, origin=20;
  for(let mm=0; origin+mm*dpi/25.4<rect.height; mm++){const y=origin+mm*dpi/25.4, len=mm%10===0?24:mm%5===0?16:9; ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(len,y);ctx.stroke();if(mm%10===0)ctx.fillText(String(mm/10),len+3,y+4);}
  for(let t=0; origin+t*dpi/16<rect.height; t++){const y=origin+t*dpi/16, len=t%16===0?24:t%8===0?18:t%4===0?14:9;ctx.beginPath();ctx.moveTo(rect.width-len,y);ctx.lineTo(rect.width,y);ctx.stroke();if(t%16===0){const s=String(t/16);ctx.fillText(s,rect.width-len-4-ctx.measureText(s).width,y+4);}}
  value.textContent=slider.value;
}
slider.addEventListener('input',()=>{localStorage.setItem('calibration',slider.value);draw();}); window.addEventListener('resize',draw); draw();
