(function () {
  'use strict';
  const historia = window.historiaDiccionario;
  if (!historia || !document.getElementById('definition')) return;
  const crear = (tag, texto, clase) => {
    const el = document.createElement(tag);
    if (texto) el.textContent = texto;
    if (clase) el.className = clase;
    return el;
  };
  const estilo = crear('style');
  estilo.textContent = `
    .familia-boton{display:inline-flex;align-items:center;gap:.4em;margin:0 0 .2em .7em;padding:.45em .75em;border:0;border-radius:6px;background:#1769c2;color:#fff;font:600 14px Arial,sans-serif;vertical-align:middle;cursor:pointer}
    .familia-boton:hover{background:#10539d}.familia-boton:focus-visible,.fh-dialog button:focus-visible,.fh-dialog select:focus-visible{outline:3px solid #e79726;outline-offset:3px}
    .fh-dialog{box-sizing:border-box;width:min(900px,calc(100% - 24px));max-height:90vh;max-height:90dvh;padding:22px;border:1px solid #cbdce9;border-radius:14px;color:#263643;background:#fff;font:16px/1.5 Arial,sans-serif;box-shadow:0 18px 80px #19365350}
    .fh-dialog::backdrop{background:#142d446b}.fh-head{display:flex;justify-content:space-between;align-items:start;gap:12px}.fh-head h2{margin:0;font-size:25px}.fh-cerrar{border:1px solid #cbdce9;border-radius:6px;background:white;padding:7px 12px;cursor:pointer;font:inherit}.fh-intro{margin:.6em 0;color:#52687a}.fh-selector{display:flex;align-items:center;gap:10px;margin:15px 0;flex-wrap:wrap}.fh-selector select{max-width:100%;padding:7px;border:1px solid #bbccda;border-radius:5px;font:inherit;background:#fff}
    .fh-contenido{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(220px,1fr);gap:20px;align-items:start}.fh-grafo{margin:0;min-width:0}.fh-grafo svg{width:100%;height:auto;display:block;background:#f9fcff;border-radius:10px}.fh-nodo{cursor:pointer}.fh-nodo:focus{outline:none}.fh-nodo:focus circle{stroke:#d28200;stroke-width:4}.fh-nodo text{font:14px Arial,sans-serif;fill:#263643;paint-order:stroke;stroke:#f9fcff;stroke-width:4;stroke-linejoin:round}.fh-nodo .fh-fecha{font-size:12px;fill:#637b90}.fh-grafo figcaption,.fh-nota{font-size:13px;color:#536a7c;margin-top:10px}.fh-detalle{background:#f1f6fb;padding:17px;border-radius:10px;min-width:0;overflow-wrap:anywhere}.fh-detalle h3{margin:0;font-size:22px}.fh-detalle p{margin:10px 0}.fh-detalle a{color:#145f9e}.fh-detalle ol{padding-left:20px}.fh-detalle .familia-boton{margin:8px 0 0;font-size:15px}.fh-pendientes{padding:12px 0}.fh-pendientes p{font-size:14px;margin:0 0 6px}.fh-chip{border:1px dashed #809aaf;border-radius:20px;padding:7px 11px;background:white;color:#244f71;font:14px Arial,sans-serif;margin:4px 5px 4px 0;cursor:pointer}.fh-chip[aria-pressed=true]{background:#dcf4e6;border-color:#278258}.fh-relaciones{font-size:14px;padding-left:22px}.fh-elegida{font-weight:bold}
    @media(max-width:650px){.fh-dialog{padding:15px}.fh-contenido{grid-template-columns:1fr;gap:10px}.fh-head h2{font-size:22px}.familia-boton{font-size:12px;margin-left:.5em}.fh-grafo svg{max-height:none}}
  `;
  document.head.appendChild(estilo);
  function catalogo() {
    const salida = historia.familias.map(f => ({ ...f, palabras: [...f.palabras] }));
    // Lee también las familias añadidas a futuras entradas; no altera el diccionario.
    if (typeof catalogoDeRelaciones === 'function') {
      for (const g of catalogoDeRelaciones().filter(g => g.tipo === 'familia')) {
        const existente = salida.find(f => normalizeText(f.nombre) === normalizeText(g.nombre));
        if (existente) existente.palabras = [...new Set([...existente.palabras, ...g.palabras])];
        else salida.push({ nombre: g.nombre, descripcion: g.descripcion, palabras: [...g.palabras] });
      }
    }
    return salida.sort((a, b) => collatorEs.compare(a.nombre, b.nombre));
  }
  let modal, ultimoBoton;
  function abrir(palabra, boton) {
    ultimoBoton = boton;
    if (modal) modal.remove();
    modal = crear('dialog', '', 'fh-dialog');
    modal.setAttribute('aria-labelledby', 'fh-titulo');
    const cabecera = crear('div', '', 'fh-head');
    const titulo = crear('h2', 'Familia e historia'); titulo.id = 'fh-titulo';
    const cerrar = crear('button', 'Cerrar', 'fh-cerrar'); cerrar.type = 'button';
    cerrar.addEventListener('click', () => modal.close());
    cabecera.append(titulo, cerrar); modal.append(cabecera);
    modal.append(crear('p', 'Más lejos del centro = fecha documentada más antigua. Toca una palabra para ver su historia.', 'fh-intro'));
    const grupos = catalogo();
    let grupo = grupos.find(f => f.palabras.includes(palabra));
    const selector = crear('div', '', 'fh-selector');
    const label = crear('label', 'Explorar familia:'); label.htmlFor = 'fh-familias';
    const select = crear('select'); select.id = 'fh-familias';
    const vacio = crear('option', 'Selecciona una familia'); vacio.value = ''; select.append(vacio);
    grupos.forEach((f, i) => { const o = crear('option', f.nombre + ' (' + f.palabras.length + ')'); o.value = String(i); select.append(o); });
    selector.append(label, select); modal.append(selector);
    const cuerpo = crear('div'); modal.append(cuerpo);
    function mostrar(f, seleccion) {
      grupo = f; cuerpo.replaceChildren(); select.value = f ? String(grupos.indexOf(f)) : '';
      if (!f) {
        cuerpo.append(crear('p', 'Todavía no hay otra palabra de la misma familia registrada para «' + palabra + '». Puedes explorar las familias encontradas en el diccionario.'));
        return;
      }
      cuerpo.append(crear('p', f.descripcion));
      const columnas = crear('div', '', 'fh-contenido');
      const figura = crear('figure', '', 'fh-grafo');
      const detalle = crear('section', '', 'fh-detalle'); detalle.setAttribute('aria-live', 'polite');
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 420 410'); svg.setAttribute('role', 'group'); svg.setAttribute('aria-label', 'Grafo de la familia de ' + f.nombre);
      const elemento = (tag, attrs, text) => {
        const node = document.createElementNS('http://www.w3.org/2000/svg', tag);
        Object.entries(attrs || {}).forEach(([k, v]) => node.setAttribute(k, String(v)));
        if (text) node.textContent = text;
        return node;
      };
      const posiciones = historia.posiciones(f.palabras);
      [54, 96, 138].forEach(r => svg.append(elemento('circle', { cx: 210, cy: 205, r, fill: 'none', stroke: '#dae5ee', 'stroke-dasharray': '3 5' })));
      svg.append(elemento('circle', { cx: 210, cy: 205, r: 3, fill: '#95aabc' }));
      svg.append(elemento('text', { x: 210, y: 222, 'text-anchor': 'middle', fill: '#70899c', 'font-size': 10 }, 'más reciente'));
      svg.append(elemento('text', { x: 210, y: 26, 'text-anchor': 'middle', fill: '#70899c', 'font-size': 12 }, 'más antiguo'));
      const enlaces = f.enlaces || f.palabras.slice(1).map(p => [f.palabras[0], p]);
      enlaces.forEach(([a, b]) => {
        const p = posiciones.find(n => n.palabra === a), q = posiciones.find(n => n.palabra === b);
        if (p && q) svg.append(elemento('line', { x1: p.x, y1: p.y, x2: q.x, y2: q.y, stroke: '#a9cadb', 'stroke-width': 1.8 }));
      });
      const botones = new Map();
      function elegir(p) {
        botones.forEach((b, key) => {
          b.setAttribute('aria-pressed', String(key === p));
          const circle = b.querySelector('circle');
          if (circle) circle.setAttribute('fill', key === p ? '#65d391' : '#bedaf1');
        });
        detalle.replaceChildren(); detalle.append(crear('h3', historia.nombres[p] || p));
        const fecha = historia.fechas[p];
        detalle.append(crear('p', fecha ? fecha.anio + ' · ' + fecha.tipo : 'Sin fecha documentada todavía.'));
        if (fecha) {
          detalle.append(crear('p', fecha.detalle));
          const a = crear('a', fecha.fuente); a.href = fecha.url; a.target = '_blank'; a.rel = 'noopener noreferrer'; detalle.append(a);
        }
        if (dictionary[p]) {
          const lista = crear('ol');
          acepcionesDeEntrada(dictionary[p]).forEach(d => lista.append(crear('li', d.texto.replace(/<[^>]*>/g, ''))));
          detalle.append(lista);
          const ir = crear('button', 'Abrir definición', 'familia-boton'); ir.type = 'button';
          ir.addEventListener('click', () => { modal.close(); renderEntry(p, false, true); document.getElementById('search-input').value = p; });
          detalle.append(ir);
        } else {
          detalle.append(crear('p', 'Palabra relacionada, todavía sin entrada propia en tu diccionario.'));
          const a = crear('a', 'Consultar en el DLE'); a.href = 'https://dle.rae.es/' + encodeURIComponent(p); a.target = '_blank'; a.rel = 'noopener noreferrer'; detalle.append(a);
        }
        const vinculadas = enlaces.filter(e => e.includes(p)).map(e => e.find(x => x !== p));
        if (vinculadas.length) detalle.append(crear('p', 'Conectada con: ' + vinculadas.map(x => historia.nombres[x] || x).join(', ') + '.'));
      }
      posiciones.forEach(p => {
        const g = elemento('g', { class: 'fh-nodo', role: 'button', tabindex: 0, 'aria-label': p.palabra + ', ' + p.anio });
        g.append(elemento('circle', { cx: p.x, cy: p.y, r: 9, fill: '#bedaf1', stroke: '#5487ad', 'stroke-width': 1.5 }));
        const arriba = p.y < 180;
        g.append(elemento('text', { x: p.x, y: p.y + (arriba ? -27 : 26), 'text-anchor': 'middle' }, historia.nombres[p.palabra] || p.palabra));
        g.append(elemento('text', { x: p.x, y: p.y + (arriba ? -12 : 41), 'text-anchor': 'middle', class: 'fh-fecha' }, String(p.anio)));
        g.addEventListener('click', () => elegir(p.palabra));
        g.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); elegir(p.palabra); } });
        botones.set(p.palabra, g); svg.append(g);
      });
      figura.append(svg);
      const pendientes = f.palabras.filter(p => !historia.fechas[p]?.anio);
      if (pendientes.length) {
        const sinFecha = crear('div', '', 'fh-pendientes'); sinFecha.append(crear('p', 'Sin fecha documentada · fuera de la escala temporal'));
        pendientes.forEach(p => {
          const b = crear('button', historia.nombres[p] || p, 'fh-chip'); b.type = 'button'; b.addEventListener('click', () => elegir(p)); botones.set(p, b); sinFecha.append(b);
        });
        figura.append(sinFecha);
      }
      figura.append(crear('figcaption', 'Verde: palabra seleccionada. Azul: palabras relacionadas. Las líneas muestran relaciones léxicas, no una sucesión histórica demostrada.'));
      columnas.append(figura, detalle); cuerpo.append(columnas);
      cuerpo.append(crear('p', 'Se comparan fechas de los testimonios citados, no fechas de nacimiento: una palabra puede ser anterior. La misma fecha ocupa la misma distancia; cambiar la selección no cambia la posición. Las palabras externas no se suman a tus entradas.', 'fh-nota'));
      elegir(f.palabras.includes(seleccion) ? seleccion : f.palabras[0]);
    }
    select.addEventListener('change', () => mostrar(select.value === '' ? null : grupos[Number(select.value)]));
    modal.addEventListener('click', e => { if (e.target === modal) { const r = modal.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) modal.close(); } });
    modal.addEventListener('close', () => { if (ultimoBoton?.isConnected) ultimoBoton.focus(); });
    document.body.append(modal); mostrar(grupo, palabra); modal.showModal(); cerrar.focus();
  }
  function adjuntar() {
    const lema = document.querySelector('#definition .term');
    if (!lema || document.querySelector('#definition .familia-boton')) return;
    const palabra = Object.keys(dictionary).find(p => normalizeText(p) === normalizeText(lema.textContent.trim()));
    if (!palabra) return;
    const b = crear('button', 'Familia e historia', 'familia-boton'); b.type = 'button';
    b.setAttribute('aria-label', 'Ver familia e historia de ' + palabra);
    b.addEventListener('click', () => abrir(palabra, b)); lema.insertAdjacentElement('afterend', b);
  }
  new MutationObserver(adjuntar).observe(document.getElementById('definition'), { childList: true });
  adjuntar();
})();
