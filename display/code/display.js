const $=id=>document.getElementById(id), colors=['White','Black','Red','Yellow','Green','Blue'];
for(const id of ['foreground','background']) for(const color of colors){const o=document.createElement('option');o.textContent=color;$(id).appendChild(o);} $('background').value='Black';
let frame=0, position=0, last=0;
function animate(time){if(last) position-=(time-last)*0.08;last=time;const m=$('message');if(position+m.offsetWidth<0)position=window.innerWidth;m.style.left=position+'px';frame=requestAnimationFrame(animate);}
function edit(){cancelAnimationFrame(frame);$('screen').style.display='none';$('settings').style.display='block';MagicBox.fullscreen(false);}
$('show').addEventListener('click',()=>{const text=$('text').value.trim(),size=Number($('size').value);if(!text || !Number.isFinite(size) || size<12 || size>200){$('error').textContent='Enter text and a size from 12 to 200';return;}$('error').textContent='';const m=$('message');m.textContent=text;m.style.fontSize=size+'px';m.style.color=$('foreground').value;m.style.fontStyle=$('italic').checked?'italic':'normal';$('screen').style.background=$('background').value;$('settings').style.display='none';$('screen').style.display='block';position=window.innerWidth;last=0;MagicBox.fullscreen(true);frame=requestAnimationFrame(animate);});
window.addEventListener('magicboxback',edit);
