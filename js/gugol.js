(function(){
'use strict';
if(!document.getElementById('definition'))return;
const datos={
  interfaz:[
    'interfaz',
    'interfaz de audio',
    'interfaz de audio behringer',
    'interfaz scarlett',
    'interfaz behringer',
    'interfaz focusrite',
    'interfaz apollo',
    'interfaz que es',
    'interfaz de audio focusrite',
    'interfaz m audio',
    'interfaz scarlett 2i2',
    'interfaz behringer umc22'
  ],
  taxonomia:[
    'taxonomia',
    'taxonomia de bloom',
    'taxonomia de marzano',
    'taxonomia significado',
    'taxonomia de bloom actualizada',
    'taxonomia de anderson',
    'taxonomia de bloom verbos',
    'taxonomia del humano',
    'taxonomia de marzano y kendall',
    'taxonomia de bloom para imprimir',
    'taxonomia nanda',
    'taxonomia de bloom anderson'
  ],
  morfologia:[
    'morfología biología','morfología lingüística','morfología humana','morfología medicina',
    'morfología ejemplos','morfología sinónimo','morfología etimología','morfología español'
  ],
  grafo:[
    'grafo','grafo conexo','grafo bipartito','grafo no dirigido','grafo kick','grafo | Definición | Diccionario de la lengua española','grafo- | Definición | Diccionario de la lengua española','-grafo, -grafa | Definición | Diccionario de la lengua española','grafo social','grafo del deseo lacan','grafo que es','grado 3'
  ],
  token:[
    'token rapper',
    'token south park',
    'token bancario',
    'token meaning',
    'token stamp',
    'token ia',
    'token maker',
    'token significado'
  ],
  consulta:[
    'consulta','consulta saldo efe','consulta patente','consulta de causas','consulta precio ripley','consulta causas poder judicial','consulta afiliacion afp','consulta | Definición | Diccionario de la lengua española','consulta saldo bipay','consulta multas por patente','consulta saldo tne','consulta imei'
  ],
  lema:[
    'lema',
    'Cristian Lema — Exfutbolista argentino',
    'lema significado',
    'lemans',
    'lemans conductores — Escuela de Conductores Profesionales L...',
    'Thomas Lemar — Futbolista francés',
    'lema | Definición | Diccionario de l...',
    'lema | Definición | Diccionario de l...',
    'lema de los linterna verde',
    'lema de chile',
    'lemaco',
    'leman russ'
  ]
};
const n=s=>typeof normalizeText==='function'?normalizeText(s):String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
const crear=(t,x,c)=>{const e=document.createElement(t);if(x)e.textContent=x;if(c)e.className=c;return e};
const st=crear('style');st.textContent=`
.gugol-boton{display:inline-flex;align-items:center;margin:0 0 .2em .45em;padding:.45em .75em;border:0;border-radius:6px;background:#1769c2;color:#fff;font:600 14px Arial,sans-serif;vertical-align:middle;cursor:pointer}
.gugol-boton:hover{background:#10539d}.gg-dialog{box-sizing:border-box;width:min(650px,calc(100% - 24px));max-height:88vh;padding:22px;border:1px solid #cbdce9;border-radius:14px;color:#263643;background:#fff;font:16px/1.5 Arial,sans-serif}
.gg-dialog::backdrop{background:#142d446b}.gg-head{display:flex;justify-content:space-between;gap:12px;align-items:start}.gg-head h2{margin:0}.gg-cerrar{border:1px solid #cbdce9;border-radius:6px;background:#fff;padding:7px 12px;font:inherit}.gg-lista{list-style:none;padding:0;margin:18px 0 0}.gg-lista li{padding:12px 4px;border-bottom:1px solid #dbe3e9;display:flex;gap:10px;align-items:center}.gg-lupa{font-size:19px}.gg-nota{font-size:13px;color:#536a7c;margin-top:14px}@media(max-width:650px){.gugol-boton{font-size:12px}.gg-dialog{padding:15px}}`;
document.head.appendChild(st);
let modal,ultimo;
function abrir(p,b){
  ultimo=b;modal&&modal.remove();modal=crear('dialog','','gg-dialog');
  const h=crear('div','','gg-head'),t=crear('h2','Gugol: «'+p+'»'),cerrar=crear('button','Cerrar','gg-cerrar');
  cerrar.type='button';cerrar.onclick=()=>modal.close();h.append(t,cerrar);modal.append(h);
  const lista=crear('ul','','gg-lista');
  (datos[n(p)]||[]).forEach(x=>{const li=crear('li');li.append(crear('span','⌕','gg-lupa'),crear('span',x));lista.append(li)});
  modal.append(lista);
  modal.append(crear('p','Lista de búsquedas principales registrada para esta palabra.','gg-nota'));
  modal.addEventListener('close',()=>{if(ultimo&&ultimo.isConnected)ultimo.focus()});
  document.body.append(modal);modal.showModal();cerrar.focus();
}
function adjuntar(){
  const l=document.querySelector('#definition .term');
  if(!l||document.querySelector('#definition .gugol-boton'))return;
  const p=Object.keys(dictionary).find(x=>n(x)===n(l.textContent.trim()));
  if(!p||!datos[n(p)])return;
  const b=crear('button','Gugol','gugol-boton');
  b.type='button';b.onclick=()=>abrir(p,b);
  l.insertAdjacentElement('afterend',b);
}
new MutationObserver(adjuntar).observe(document.getElementById('definition'),{childList:true,subtree:true});adjuntar();
})();