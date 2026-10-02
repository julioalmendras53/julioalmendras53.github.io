(function(){
'use strict';
if(!document.getElementById('definition'))return;
const rutas={
infinito:{ruta:['latín infinitus','español infinito'],texto:'Del latín infinitus, formado con el prefijo negativo in- y finitus («limitado»).'},
infierno:{ruta:['latín infernum','español infierno'],texto:'Del latín infernum. La evolución fonética del castellano dio la forma infierno.'},
babilla:{ruta:['español baba','babilla'],texto:'Formación española vinculada históricamente a baba, con sufijación diminutiva.'},
ababillarse:{ruta:['babilla','a- + babilla + -arse','ababillarse'],texto:'Verbo parasintético formado sobre babilla: a- + babilla + -arse.'},
dios:{ruta:['latín deus','español Dios'],texto:'Procede del latín deus («dios, divinidad»).'},
madre:{ruta:['latín mater','latín vulgar / romance','español madre'],texto:'Procede del latín mater, a través de la evolución fonética romance.'},
caos:{ruta:['griego kháos','latín chaos','español caos'],texto:'Del latín chaos, tomado del griego kháos.'},
universo:{ruta:['latín universus','español universo'],texto:'Procede del latín universus («todo entero, conjunto»).'},
eterno:{ruta:['latín aeternus','español eterno'],texto:'Procede del latín aeternus.'},
persona:{ruta:['latín persona','español persona'],texto:'Procede del latín persona.'},
alma:{ruta:['latín anima','español alma'],texto:'Procede del latín anima; la forma española experimentó evolución fonética.'},
misericordia:{ruta:['latín misericordia','español misericordia'],texto:'Procede del latín misericordia.'},
nostalgia:{ruta:['griego nóstos + álgos','latín científico moderno nostalgia','español nostalgia'],texto:'Voz creada en época moderna con elementos griegos nóstos («regreso») y álgos («dolor»).'},
internet:{ruta:['inglés Internet','español internet'],texto:'Préstamo del inglés Internet.'},
robot:{ruta:['checo robota','checo robot','lenguas internacionales','español robot'],texto:'La voz robot se difundió internacionalmente desde el checo, relacionada con robota («trabajo forzado»).'},
google:{ruta:['inglés Google','español Google'],texto:'Nombre propio inglés de la empresa y del buscador; su denominación se inspiró en googol.'},
matematica:{ruta:['griego mathēmatikḗ','latín mathematica','español matemática'],texto:'Del latín mathematica, procedente del griego mathēmatikḗ.'},
triangulo:{ruta:['latín triangulum','español triángulo'],texto:'Procede del latín triangulum.'},
adjetivo:{ruta:['latín adiectivus','español adjetivo'],texto:'Procede del latín adiectivus («que se añade»).'},
morfema:{ruta:['francés morphème','español morfema'],texto:'Adaptación del francés morphème, término de la lingüística moderna.'}
};
const n=s=>typeof normalizeText==='function'?normalizeText(s):String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
const crear=(t,x,c)=>{const e=document.createElement(t);if(x)e.textContent=x;if(c)e.className=c;return e};
const st=crear('style');st.textContent='.origen-boton{display:inline-flex;align-items:center;margin:0 0 .2em .45em;padding:.45em .75em;border:0;border-radius:6px;background:#1769c2;color:#fff;font:600 14px Arial,sans-serif;vertical-align:middle;cursor:pointer}.origen-boton:hover{background:#10539d}.origen-dialog{box-sizing:border-box;width:min(650px,calc(100% - 24px));padding:22px;border:1px solid #cbdce9;border-radius:14px;color:#263643;background:#fff;font:16px/1.5 Arial,sans-serif}.origen-dialog::backdrop{background:#142d446b}.origen-head{display:flex;justify-content:space-between;gap:12px}.origen-head h2{margin:0}.origen-cerrar{border:1px solid #cbdce9;border-radius:6px;background:#fff;padding:7px 12px}.origen-ruta{margin:24px 0;padding:16px 18px;border:1px solid #cbdce9;border-radius:12px;background:#f6fbff;font-size:18px;font-weight:600;line-height:1.8}.origen-paso{display:inline}.origen-flecha{padding:0 8px;color:#1769c2}.origen-nota{color:#536a7c}@media(max-width:650px){.origen-boton{font-size:12px}.origen-dialog{padding:15px}.origen-ruta{font-size:16px}}';document.head.appendChild(st);
let modal,ultimo;
function abrir(p,b){ultimo=b;modal&&modal.remove();modal=crear('dialog','','origen-dialog');const h=crear('div','','origen-head'),t=crear('h2','Origen de «'+p+'»'),c=crear('button','Cerrar','origen-cerrar');c.type='button';c.onclick=()=>modal.close();h.append(t,c);modal.append(h);const d=rutas[n(p)];if(d){const q=crear('div','','origen-ruta');d.ruta.forEach((x,i)=>{if(i)q.append(crear('span','→','origen-flecha'));q.append(crear('span',x,'origen-paso'))});modal.append(q,crear('p',d.texto,'origen-nota'))}else{modal.append(crear('p','La ruta etimológica de esta entrada todavía no está registrada.'))}modal.addEventListener('close',()=>ultimo&&ultimo.isConnected&&ultimo.focus());document.body.append(modal);modal.showModal();c.focus()}
function adjuntar(){const l=document.querySelector('#definition .term');if(!l||document.querySelector('#definition .origen-boton'))return;const p=Object.keys(dictionary).find(x=>n(x)===n(l.textContent.trim()));if(!p)return;const b=crear('button','Origen','origen-boton');b.type='button';b.setAttribute('aria-label','Ver origen de '+p);b.onclick=()=>abrir(p,b);const r=document.querySelector('#definition .relacionadas-boton');(r||l).insertAdjacentElement('afterend',b)}
new MutationObserver(adjuntar).observe(document.getElementById('definition'),{childList:true});adjuntar();
})();