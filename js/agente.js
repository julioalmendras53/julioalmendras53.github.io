// Clasificación explícita según las acepciones del diccionario.
// Una entrada puede pertenecer a varias categorías.
const categoriasDiccionario = {
  verbo: ['ser', 'ñañar', 'amar', 'odiar', 'habitar', 'dibujar', 'existir',
    'negar', 'poder', 'todar', 'aprender', 'mapear', 'puede', 'pueda',
    'googlear', 'simular', 'atar', 'subir', 'llorar', 'vestir', 'vencer'],
  adjetivo: ['infinito', 'ilimitado', 'unidefinido', 'jabonoso', 'embarazada',
    'gordo', 'idempotente', 'regicida', 'bidefinido', 'tridefinido', 'loco',
    'flaco', 'ñato', 'narigón', 'carón', 'indeterminado', 'indefinido',
    'precomputada', 'holomorfa', 'meromorfa', 'maradoniano', 'limitado',
    'eterno', 'todopoderoso', 'omnipotente', 'napolitano', 'ultrabasico',
    'artificial', 'patiestevado', 'epico', 'eliminatoria', 'googleable',
    'ingoogleable', 'infinitotriz', 'soltero', 'negro'],
  adverbio: ['infinitamente', 'no', 'eternamente']
};

for (const [categoria, palabras] of Object.entries(categoriasDiccionario)) {
  for (const palabra of palabras) {
    if (dictionary[palabra]) {
      dictionary[palabra].categorias = [
        ...new Set([...(dictionary[palabra].categorias || []), categoria])
      ];
    }
  }
}

function analizarPreguntaDiccionario(pregunta) {
  const texto = normalizeText(pregunta).replace(/[¿?]/g, '').trim();
  const ayuda = 'Puedo contar o listar entradas del diccionario. Prueba: ¿Cuántos verbos tienen video? o ¿Cuántos adjetivos has definido?';
  const categorias = ['verbo', 'adjetivo', 'adverbio'].filter(c =>
    new RegExp('\\b' + c + 's?\\b').test(texto));
  const cuenta = /\b(cuantos|cuantas|cantidad|numero|total)\b/.test(texto);
  const lista = /\b(cuales|lista|listar|muestra|mostrar|dime)\b/.test(texto);
  if (!cuenta && !lista) return { respuesta: ayuda, palabras: [] };
  if (categorias.length > 1 || /\b(sustantivos?|pronombres?|articulos?)\b/.test(texto)) {
    return { respuesta: 'Por ahora tengo clasificados verbos, adjetivos y adverbios. Pregunta por una sola categoría cada vez.', palabras: [] };
  }
  const categoria = categorias[0];
  if (!categoria && !/\b(palabras?|entradas?|terminos?|definiciones?|diccionario|imagenes?|videos?|texto)\b/.test(texto)) {
    return { respuesta: ayuda, palabras: [] };
  }

  const pideImagen = /\b(imagen|imagenes|foto|fotos)\b/.test(texto);
  const pideVideo = /\b(videos?)\b/.test(texto);
  const soloTexto = /\bsolo texto\b/.test(texto);
  const sinImagen = /\b(sin|no tienen|no tiene) (?:una )?(?:imagen|imagenes|foto|fotos)\b/.test(texto);
  const sinVideo = /\b(sin|no tienen|no tiene) (?:un )?videos?\b/.test(texto);
  // Evita interpretar "imagen o video" como si significara ambos.
  if (pideImagen && pideVideo && /\bo\b/.test(texto)) {
    return { respuesta: 'Pregunta por imagen y video juntos, o por uno de ellos por separado.', palabras: [] };
  }
  const palabras = Object.keys(dictionary).filter(palabra => {
    const entrada = dictionary[palabra];
    if (categoria && !(entrada.categorias || []).includes(categoria)) return false;
    if (soloTexto && (entrada.imagen || entrada.video)) return false;
    if (pideImagen && (sinImagen ? !!entrada.imagen : !entrada.imagen)) return false;
    if (pideVideo && (sinVideo ? !!entrada.video : !entrada.video)) return false;
    return true;
  }).sort((a, b) => collatorEs.compare(a, b));

  let grupo = categoria ? categoria + 's' : 'entradas';
  if (soloTexto) grupo += ' solo con texto';
  else {
    if (pideImagen) grupo += sinImagen ? ' sin imagen' : ' con imagen';
    if (pideVideo) grupo += sinVideo ? ' sin video' : ' con video';
  }
  let respuesta = 'Hay ' + palabras.length + ' ' + grupo + ' en tu diccionario.';
  if (categoria === 'verbo') respuesta += ' Cuento entradas, incluidas las formas «puede» y «pueda».';
  return { respuesta, palabras };
}

window.responderPreguntaDiccionario = function(pregunta) {
  const resultado = analizarPreguntaDiccionario(pregunta);
  const contenedor = document.getElementById('definition');
  contenedor.replaceChildren();
  const respuesta = document.createElement('p');
  respuesta.textContent = resultado.respuesta;
  contenedor.appendChild(respuesta);
  if (resultado.palabras.length) {
    const detalle = document.createElement('details');
    const titulo = document.createElement('summary');
    titulo.textContent = 'Ver las palabras (' + resultado.palabras.length + ')';
    detalle.appendChild(titulo);
    const listado = document.createElement('p');
    resultado.palabras.forEach((palabra, indice) => {
      if (indice) listado.appendChild(document.createTextNode(', '));
      const enlace = document.createElement('a');
      enlace.href = '#' + normalizeText(palabra);
      enlace.textContent = palabra;
      listado.appendChild(enlace);
    });
    detalle.appendChild(listado);
    contenedor.appendChild(detalle);
  }
};
