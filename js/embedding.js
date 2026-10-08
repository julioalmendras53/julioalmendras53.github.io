(()=>{'use strict';
const clean=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const stop=new Set('de del la el los las un una unos unas que por para con como en y o a al se su sus es son ser estar lo le les cada dicho parte accion efecto palabra persona cosa algo'.split(' '));
const terms=s=>new Set((clean(s).match(/[a-zñ]{4,}/g)||[]).filter(w=>!stop.has(w)));
const seeds={dios:['cristo','todopoderoso']};
function candidates(key){
 const dict=window.dictionary||{}, entry=dict[key]||{}, base=terms([key,...(entry.definiciones||[entry.definicion||'']),...(entry.relacionadas||[])].join(' '));
 const scored=Object.entries(dict).filter(([k])=>clean(k)!==clean(key)).map(([k,v])=>{
 const other=terms([k,...(v.definiciones||[v.definicion||'']),...(v.relacionadas||[])].join(' '));
 let common=0; for(const w of base) if(other.has(w))common++;
 let score=common/Math.sqrt(Math.max(1,base.size)*Math.max(1,other.size));
 if((entry.relacionadas||[]).some(x=>clean(x)===clean(k)))score+=1;
 if((v.relacionadas||[]).some(x=>clean(x)===clean(key)))score+=0.6;
 if((seeds[clean(key)]||[]).includes(clean(k)))score+=3;
 return {word:k,score};
 }).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,8).map(x=>x.word);
 return [...new Set([...(seeds[clean(key)]||[]),...scored])].filter(x=>clean(x)!==clean(key)).slice(0,8);
}
function render(){
 const out=document.getElementById('definition');if(!out)return;
 const term=out.querySelector('.term[data-clave]');if(!term||out.querySelector('#embedding-panel'))return;
 const key=term.dataset.clave, panel=document.createElement('section');panel.id='embedding-panel';panel.style.cssText='margin-top:12px;border-top:1px solid #ddd;padding-top:10px';
 const btn=document.createElement('button');btn.type='button';btn.textContent='Embedding';btn.style.cssText='padding:7px 12px;border:1px solid #bbb;border-radius:7px;background:#f5f5f5;cursor:pointer';
 const list=document.createElement('div');list.hidden=true;list.style.cssText='margin-top:10px;display:flex;flex-wrap:wrap;gap:8px';list.style.display='none';
 btn.addEventListener('click',()=>{
 const open=list.hidden;list.hidden=!open;list.style.display=open?'flex':'none';if(!open)return;
 list.replaceChildren();const words=candidates(key);
 if(!words.length){list.textContent='Aún no hay relaciones semánticas suficientes.';return}
 for(const word of words){const a=document.createElement('button');a.type='button';a.textContent=word;const exists=Object.keys(window.dictionary||{}).some(k=>clean(k)===clean(word));a.title=exists?'Abrir entrada':'Entrada pendiente de definición';a.style.cssText='border:1px solid #d5dce6;border-radius:20px;background:#eef4ff;padding:5px 10px;cursor:pointer';
 if(exists)a.addEventListener('click',()=>{const input=document.getElementById('search-input');if(input){input.value=word;document.getElementById('search-button')?.click()}});
 else a.textContent=word+' (pendiente)';list.appendChild(a)}
 });
 panel.append(btn,list);out.appendChild(panel);
}
const out=document.getElementById('definition');if(out){new MutationObserver(()=>render()).observe(out,{childList:true});render()}
})();