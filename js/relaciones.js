(function(){
'use strict';
if(!document.getElementById('definition'))return;
const datos={
madre:{sinonimos:['mamá'],derivados:['materno','maternidad'],relacionados:['persona']},
dios:{sinonimos:['deidad'],derivados:['divino','divinidad'],relacionados:['cristo','espíritu','omnipotente','todopoderoso']},
omnipotente:{antonimos:['impotente'],relacionados:['dios']},
infinito:{sinonimos:['ilimitado'],antonimos:['finito','limitado'],derivados:['infinidad','infinitamente','infinitesimal','infinitotriz']},
ilimitado:{sinonimos:['infinito'],antonimos:['limitado'],relacionados:['límite']},
limitado:{antonimos:['ilimitado'],relacionados:['límite','infinito']},
eterno:{sinonimos:['perpetuo'],antonimos:['temporal'],derivados:['eternamente']},
perro:{sinonimos:['can'],relacionados:['animal','mamífero']},
gato:{relacionados:['felino','animal','mamífero']},
humano:{sinonimos:['ser humano'],relacionados:['persona','humanidad']},
persona:{relacionados:['humano','individuo']},
realidad:{relacionados:['existencia','mundo'],antonimos:['irrealidad']},
inteligencia:{relacionados:['entendimiento','capacidad','conocimiento']},
caos:{sinonimos:['desorden','confusión'],antonimos:['orden'],relacionados:['cosmos']},
caoticamente:{sinonimos:['desordenadamente','confusamente']},
mundo:{relacionados:['universo','Tierra']},
universo:{sinonimos:['cosmos'],relacionados:['espacio','galaxia','mundo']},
sol:{relacionados:['estrella','astro']},
alma:{relacionados:['espíritu']},
misericordia:{sinonimos:['compasión','clemencia']},
nostalgia:{sinonimos:['añoranza'],relacionados:['recuerdo']},
dibujo:{relacionados:['dibujar','imagen']},
dibujar:{relacionados:['dibujo','trazar']},
escritor:{relacionados:['escribir','autor']},
información:{relacionados:['dato','conocimiento']},
dato:{relacionados:['información']},
internet:{relacionados:['red','web']},
robot:{relacionados:['androide','máquina']},
androide:{relacionados:['robot']},
ropa:{sinonimos:['vestimenta'],relacionados:['vestir']},
vestir:{relacionados:['ropa','vestimenta']},
cerebro:{relacionados:['encéfalo','mente']},
blanco:{antonimos:['negro'],relacionados:['color']},
negro:{antonimos:['blanco'],relacionados:['color']},
subir:{antonimos:['bajar'],relacionados:['ascender']},
atar:{sinonimos:['abrochar','enlazar'],antonimos:['soltar'],relacionados:['zapatos','lazos','broche']},
vencer:{sinonimos:['derrotar','ganar'],antonimos:['perder']},
aprender:{relacionados:['conocer','estudiar']},
negar:{antonimos:['afirmar'],derivados:['negación']},
negacion:{antonimos:['afirmación'],relacionados:['negar','no']},
nadie:{relacionados:['ninguno','persona']},
nada:{antonimos:['todo'],relacionados:['inexistencia']},
poder:{relacionados:['capacidad','facultad'],derivados:['todopoderoso']},
omnipotente:{sinonimos:['todopoderoso'],relacionados:['poder']},
todopoderoso:{sinonimos:['omnipotente'],relacionados:['poder']},
flaco:{sinonimos:['delgado']},
gordo:{antonimos:['flaco','escuálido'],relacionados:['adiposo','grasa']},
elefante:{relacionados:['animal','mamífero']},
jirafa:{relacionados:['animal','mamífero']},
cabra:{relacionados:['animal','mamífero']},
ajedrez:{relacionados:['juego','tablero']},
deporte:{relacionados:['competición','ejercicio']},
morfema:{relacionados:['lingüística','palabra']},
adjetivo:{relacionados:['gramática','palabra']},
matematica:{relacionados:['matemático','número','geometría']},
matematico:{relacionados:['matemática']},
triangulo:{relacionados:['geometría','polígono']},
homotecia:{relacionados:['geometría','transformación']},
conjetura:{relacionados:['hipótesis','proposición']},
laberinto:{relacionados:['recorrido','camino']},
agujero:{sinonimos:['hoyo'],relacionados:['abertura']},
eco:{relacionados:['sonido','reflexión']},
meme:{relacionados:['internet','imagen']},
google:{relacionados:['buscador','internet'],derivados:['googlear','googleable','ingoogleable']},
babilla:{derivados:['ababillarse'],relacionados:['rodilla']},
ababillarse:{relacionados:['babilla']}
};
const n=s=>typeof normalizeText==='function'?normalizeText(s):String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
const indice=Object.fromEntries(Object.entries(datos).map(([k,v])=>[n(k),v]));
const crear=(t,x,c)=>{const e=document.createElement(t);if(x)e.textContent=x;if(c)e.className=c;return e};
const st=crear('style');st.textContent='.relacionadas-boton{display:inline-flex;align-items:center;margin:0 0 .2em .45em;padding:.45em .75em;border:0;border-radius:6px;background:#1769c2;color:#fff;font:600 14px Arial,sans-serif;vertical-align:middle;cursor:pointer}.relacionadas-boton:hover{background:#10539d}.rs-dialog{box-sizing:border-box;width:min(650px,calc(100% - 24px));max-height:88vh;padding:22px;border:1px solid #cbdce9;border-radius:14px;color:#263643;background:#fff;font:16px/1.5 Arial,sans-serif}.rs-dialog::backdrop{background:#142d446b}.rs-head{display:flex;justify-content:space-between;gap:12px}.rs-head h2{margin:0}.rs-cerrar{border:1px solid #cbdce9;border-radius:6px;background:#fff;padding:7px 12px}.rs-grupo{margin:18px 0}.rs-grupo h3{font-size:16px;margin:0 0 7px}.rs-chip{display:inline-block;border:1px solid #b8ccdc;border-radius:18px;background:#f6fbff;padding:5px 10px;margin:3px;color:#174f7a;text-decoration:none}.rs-nota{font-size:13px;color:#536a7c}@media(max-width:650px){.relacionadas-boton{font-size:12px}.rs-dialog{padding:15px}}';document.head.appendChild(st);
let modal,ultimo;
function chip(x){const k=Object.keys(dictionary).find(y=>n(y)===n(x));if(!k)return crear('span',x,'rs-chip');const a=crear('a',x,'rs-chip');a.href='#'+n(k);a.onclick=()=>modal&&modal.close();return a}
function abrir(p,b){ultimo=b;modal&&modal.remove();modal=crear('dialog','','rs-dialog');const h=crear('div','','rs-head'),t=crear('h2','Relacionadas con «'+p+'»'),c=crear('button','Cerrar','rs-cerrar');c.type='button';c.onclick=()=>modal.close();h.append(t,c);modal.append(h);const d=indice[n(p)]||{},auto=[];if(typeof catalogoDeRelaciones==='function')for(const g of catalogoDeRelaciones())if((g.tipo==='familia'||g.tipo==='forma')&&g.palabras.includes(p))for(const x of g.palabras)if(x!==p&&!auto.includes(x))auto.push(x);const reservadas=new Set([...(d.sinonimos||[]),...(d.antonimos||[]),...(d.derivados||[])].map(n));const relacionadas=[...new Set([...(d.relacionados||[]),...auto])].filter(x=>!reservadas.has(n(x)));const ss=[['Sinónimos',d.sinonimos],['Antónimos',d.antonimos],['Derivados',d.derivados],['Relacionadas',relacionadas]];let ok=false;for(const [nom,l] of ss){if(!l||!l.length)continue;ok=true;const s=crear('section','','rs-grupo');s.append(crear('h3',nom));const q=crear('div');l.forEach(x=>q.append(chip(x)));s.append(q);modal.append(s)}if(!ok)modal.append(crear('p','Todavía no hay una relación suficientemente segura registrada para esta entrada.'));modal.append(crear('p','Los sinónimos se reservan para equivalencias razonables; una palabra derivada o relacionada no se marca automáticamente como sinónimo.','rs-nota'));modal.addEventListener('close',()=>{if(ultimo&&ultimo.isConnected)ultimo.focus()});document.body.append(modal);modal.showModal();c.focus()}
function adjuntar(){const l=document.querySelector('#definition .term');if(!l||document.querySelector('#definition .relacionadas-boton'))return;const p=Object.keys(dictionary).find(x=>n(x)===n(l.textContent.trim()));if(!p)return;const b=crear('button','Relacionadas','relacionadas-boton');b.type='button';b.setAttribute('aria-label','Ver palabras relacionadas con '+p);b.onclick=()=>abrir(p,b);const fam=document.querySelector('#definition .familia-boton');(fam||l).insertAdjacentElement('afterend',b)}
new MutationObserver(adjuntar).observe(document.getElementById('definition'),{childList:true});adjuntar();
})();