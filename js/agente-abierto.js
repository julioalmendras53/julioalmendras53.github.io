(function () {
  'use strict';
  const config = window.configAgenteDiccionario;
  // Sin conexión configurada, el agente anterior sigue funcionando exactamente igual.
  if (!config?.endpoint) return;
  let destino;
  try { destino = new URL(config.endpoint); } catch { return; }
  if (destino.protocol !== 'https:' || destino.username || destino.password) return;
  const anterior = window.responderPreguntaDiccionario;
  const crear = (tag, texto) => { const el = document.createElement(tag); if (texto) el.textContent = texto; return el; };
  let acceso = '', peticion = null, numero = 0;
  const ayuda = document.getElementById('search-help');
  if (!ayuda) return;
  ayuda.textContent = 'Con «?» puedes hacer preguntas libres sobre el diccionario. Conecta el agente para activarlas.';
  const opciones = crear('details');
  const titulo = crear('summary', 'Conexión del agente'); opciones.append(titulo);
  opciones.append(crear('p', 'Introduce la contraseña de acceso del agente. Se conserva solo mientras esta página esté abierta.'));
  const form = crear('form');
  const clave = crear('input'); clave.type = 'password'; clave.autocomplete = 'current-password'; clave.setAttribute('aria-label', 'Contraseña del agente'); clave.maxLength = 256;
  const conectar = crear('button', 'Conectar'); conectar.type = 'submit';
  const desconectar = crear('button', 'Desconectar'); desconectar.type = 'button';
  const estado = crear('span', ' Consultas actuales activas.'); estado.setAttribute('role', 'status');
  form.append(clave, conectar, desconectar, estado); opciones.append(form); ayuda.after(opciones);
  function cancelar() { numero++; if (peticion) peticion.abort(); peticion = null; }
  form.addEventListener('submit', e => {
    e.preventDefault(); if (!clave.value.trim()) return;
    acceso = clave.value.trim(); clave.value = ''; estado.textContent = ' Preguntas libres habilitadas; el acceso se verificará al preguntar.'; opciones.open = false;
    ayuda.textContent = 'Con «?» pregunta sobre definiciones, relaciones, diferencias o recuentos de tu diccionario.';
  });
  desconectar.addEventListener('click', () => { acceso = ''; clave.value = ''; cancelar(); estado.textContent = ' Consultas actuales activas.'; ayuda.textContent = 'Con «?» preguntas al agente actual. Conecta el agente para preguntas libres.'; });
  window.addEventListener('pagehide', () => { acceso = ''; cancelar(); });
  // Impide que una respuesta tardía sustituya una definición recién consultada.
  const renderAnterior = renderEntry;
  renderEntry = function (...args) { cancelar(); return renderAnterior.apply(this, args); };
  function instantanea() {
    const grupos = catalogoDeRelaciones();
    const entradas = Object.entries(dictionary).map(([palabra, e]) => ({
      palabra, categorias: listaDeCategorias(e),
      definiciones: acepcionesDeEntrada(e).map(d => d.texto.replace(/<[^>]*>/g, '')),
      imagen: !!(e.imagen || (Array.isArray(e.imagenes) && e.imagenes.some(Boolean))), video: !!e.video, nombrePropio: esNombrePropio(palabra, e),
      familias: grupos.filter(g => g.tipo === 'familia' && g.palabras.includes(palabra)).map(g => g.nombre),
      temas: grupos.filter(g => g.tipo === 'tema' && g.palabras.includes(palabra)).map(g => g.nombre),
      personasImagen: nombresDelArchivo(palabra, e, 'imagen'),
      personasVideo: nombresDelArchivo(palabra, e, 'video'),
      definicionesQue: acepcionesDeEntrada(e).filter(d => /^que\b/i.test(comienzoDeDefinicion(d.texto))).length,
      definicionesOtroVerbo: acepcionesDeEntrada(e).filter(d => otroInfinitivoInicial(palabra, d.texto)).length
    }));
    // Complementa el catálogo histórico sin alterar entradas ni contadores.
    if (window.historiaDiccionario) for (const e of entradas) {
      e.familias = [...new Set([...e.familias, ...window.historiaDiccionario.familias.filter(f => f.palabras.includes(e.palabra)).map(f => f.nombre)])];
    }
    return { entradas, historia: window.historiaDiccionario ? { familias: window.historiaDiccionario.familias, fechas: window.historiaDiccionario.fechas } : null };
  }
  async function prepararImagenVisual(file) {
    const src = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
    const img = await new Promise((resolve, reject) => {
      const i = new Image(); i.onload = () => resolve(i); i.onerror = reject; i.src = src;
    });
    const max = 768, escala = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
    const cv = document.createElement('canvas');
    cv.width = Math.max(1, Math.round(img.naturalWidth * escala));
    cv.height = Math.max(1, Math.round(img.naturalHeight * escala));
    cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height);
    return cv.toDataURL('image/jpeg', .78);
  }
  window.reconocerImagenDiccionario = async function (file) {
    if (!acceso) return { estado:'sin_acceso' };
    const imagen = await prepararImagenVisual(file);
    const candidatos = Object.entries(dictionary)
      .filter(([,e]) => rutasImagenesDe(e).length)
      .map(([palabra,e]) => ({ palabra, definiciones: acepcionesDeEntrada(e).map(d => d.texto.replace(/<[^>]*>/g,'')) }));
    const url = new URL(destino.href); url.pathname = '/image-match'; url.search = '';
    const respuesta = await fetch(url.href, {
      method:'POST', headers:{'Content-Type':'application/json',Authorization:'Bearer '+acceso},
      credentials:'omit', referrerPolicy:'no-referrer',
      body:JSON.stringify({imagen,candidatos})
    });
    if (respuesta.status === 401) return { estado:'sin_acceso' };
    if (!respuesta.ok) return { estado:'error' };
    const datos = await respuesta.json();
    return {
      estado:'analizado',
      palabra: datos && typeof datos.palabra === 'string' ? datos.palabra : null,
      confianza: datos?.confianza || 'baja'
    };
  };
  window.responderPreguntaDiccionario = async function (pregunta) {
    cancelar();
    // Las órdenes especiales deterministas del diccionario se resuelven localmente
    // incluso cuando el agente externo está conectado.
    const consultaLocal = normalizeText(String(pregunta)).replace(/[¿?¡!.,;:]/g, ' ').replace(/\s+/g, ' ').trim();
    if (/\bpropon\w*\b/.test(consultaLocal) && /\b(?:siguiente )?palabra\b/.test(consultaLocal) && /\bdefinir\b/.test(consultaLocal)) {
      anterior(pregunta);
      return;
    }
    if (!acceso) { anterior(pregunta); return; }
    const id = numero;
    const contenedor = document.getElementById('definition');
    const espera = crear('p', 'Consultando las entradas del diccionario…'); espera.setAttribute('role', 'status');
    const detener = crear('button', 'Cancelar'); detener.type = 'button';
    detener.addEventListener('click', () => { cancelar(); contenedor.replaceChildren(crear('p', 'Consulta cancelada.')); });
    contenedor.replaceChildren(espera, detener);
    peticion = new AbortController();
    const control = peticion;
    const tiempo = setTimeout(() => control.abort(), 90000);
    try {
      const respuesta = await fetch(destino.href, {
        method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + acceso },
        credentials: 'omit', referrerPolicy: 'no-referrer', signal: control.signal,
        body: JSON.stringify({ pregunta, diccionario: instantanea() })
      });
      if (id !== numero) return;
      if (respuesta.status === 401) { acceso = ''; opciones.open = true; estado.textContent = ' Revisa la contraseña de acceso.'; throw new Error('No se pudo verificar el acceso al agente.'); }
      if (respuesta.status === 429) throw new Error('Se alcanzó el límite temporal de consultas. Vuelve a intentarlo más tarde.');
      if (!respuesta.ok) throw new Error('El servicio no pudo completar esta consulta.');
      const datos = await respuesta.json();
      if (id !== numero) return;
      if (typeof datos.respuesta !== 'string' || !datos.respuesta.trim()) throw new Error('La respuesta llegó incompleta.');
      contenedor.replaceChildren();
      datos.respuesta.split(/\n\s*\n/).forEach(t => { const p = crear('p', t); p.style.whiteSpace = 'pre-wrap'; contenedor.append(p); });
      const palabras = [...new Set(Array.isArray(datos.palabras) ? datos.palabras : [])].filter(p => Object.hasOwn(dictionary, p));
      if (palabras.length) {
        const fuentes = crear('details'); fuentes.append(crear('summary', 'Entradas consultadas (' + palabras.length + ')'));
        const lista = crear('p'); palabras.forEach((p, i) => { if (i) lista.append(document.createTextNode(', ')); const a = crear('a', p); a.href = '#' + normalizeText(p); lista.append(a); }); fuentes.append(lista); contenedor.append(fuentes);
      }
    } catch (error) {
      if (id !== numero) return;
      const mensaje = error.name === 'AbortError' ? 'La consulta tardó demasiado. Inténtalo de nuevo.' : error.message || 'No se pudo conectar con el agente.';
      contenedor.replaceChildren(crear('p', mensaje));
      const volver = crear('button', 'Usar las consultas anteriores'); volver.type = 'button';
      volver.addEventListener('click', () => { cancelar(); anterior(pregunta); }); contenedor.append(volver);
    } finally { clearTimeout(tiempo); if (id === numero) peticion = null; }
  };
})();
