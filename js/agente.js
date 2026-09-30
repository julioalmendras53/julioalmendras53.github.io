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

// Nombres asociados a archivos descritos en las entradas existentes.
// Para nuevos archivos, añade a la entrada:
// famosos: { imagen: ["Nombre de la persona"], video: ["Otro nombre"] }
// Las etiquetas explícitas prevalecen sobre estos datos iniciales.
const famososIniciales = {
  messi: { archivo: 'images/messi.jpg', nombres: ['Messi'] },
  bbc: { archivo: 'images/bbc.jpeg', nombres: ['Cristiano Ronaldo', 'Karim Benzema', 'Gareth Bale'] },
  msn: { archivo: 'images/msn.jpeg', nombres: ['Messi', 'Luis Suárez', 'Neymar'] },
  inteligencia: { archivo: 'images/inteligencia.jpg', nombres: ['Terence Tao'] },
  ajedrez: { archivo: 'videos/ajedrez.webm', medio: 'video', nombres: ['Magnus Carlsen'] }
};

const ejemplosAgente = [
  '¿Cuántos verbos son de la primera conjugación?',
  '¿Cuáles verbos terminan en -er?',
  '¿Cuántos famosos aparecen en imagen o video?',
  '¿Cuántas palabras tienen una sola definición?',
  '¿Cuántas palabras tienen 2 definiciones?',
  '¿Cuántas palabras tienen más de 2 definiciones?'
];

function limpiarConsulta(pregunta) {
  return normalizeText(String(pregunta)).replace(/(\d)\.\s*([ªº])/g, '$1$2').replace(/[¿?¡!.,;:]/g, ' ')
    .replace(/\s+/g, ' ').trim();
}

function numeroDeDefiniciones(entrada) {
  const acepciones = Array.isArray(entrada.definiciones)
    ? entrada.definiciones : [entrada.definicion];
  return acepciones.filter(d => typeof d === 'string' && d.trim()).length;
}

function leerCantidadDefiniciones(texto) {
  const numeros = {
    cero: 0, un: 1, uno: 1, una: 1, dos: 2, tres: 3, cuatro: 4, cinco: 5,
    seis: 6, siete: 7, ocho: 8, nueve: 9, diez: 10
  };
  let t = texto.replace(/\b(?:una|un) (?:sola|solo|unica|unico)\b/g, '1')
    .replace(/\b(?:una|un) (?:y solo|y solamente) (?:una|un)\b/g, '1')
    .replace(/\b(?:cero|un|uno|una|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez)\b/g, n => numeros[n])
    .replace(/\b(?:unica|unico) (definicion|acepcion|significado)\b/g, '1 $1');
  // El número de conjugación es independiente del número de acepciones.
  t = t.replace(/\b[123](?:ra|era|da|a|ª|º)?\s+conjugacion\b/g, '')
    .replace(/\bconjugacion\s+(?:la\s+)?[123](?:ra|era|da|a|ª|º)?(?=\s|$)/g, '');

  const sustantivo = /\b(definicion(?:es)?|acepcion(?:es)?|significados?)\b/;
  // Las consultas abreviadas siempre cuentan entradas por definiciones.
  const abreviada = /^(?:y )?(?:cuantas|cuantos|cuales)(?: (?:tienen|con|hay))? (?:(?:mas de|menos de|al menos|como minimo|como maximo|no mas de|hasta|exactamente) )?\d+$/.test(t);
  if (!sustantivo.test(t) && !abreviada) return null;
  if (abreviada) t += ' definiciones';
  const cifras = t.match(/\b\d+\b/g) || [];
  if (cifras.length !== 1) return { error: 'Indica una cantidad de definiciones: una, dos, más de dos, al menos tres…' };
  const n = Number(cifras[0]);
  const unidad = n === 1 ? 'definición' : 'definiciones';
  let operador = 'igual', descripcion = n + ' ' + unidad;
  if (/\b(no mas de|como maximo|a lo sumo|hasta)\b/.test(t)) {
    operador = 'maximo'; descripcion = 'como máximo ' + n + ' ' + unidad;
  } else if (/\b(al menos|como minimo|por lo menos)\b/.test(t)) {
    operador = 'minimo'; descripcion = 'al menos ' + n + ' ' + unidad;
  } else if (/\bmas de\b/.test(t)) {
    operador = 'mayor'; descripcion = 'más de ' + n + ' ' + unidad;
  } else if (/\bmenos de\b/.test(t)) {
    operador = 'menor'; descripcion = 'menos de ' + n + ' ' + unidad;
  }
  return { n, operador, descripcion };
}

function cumpleCantidad(numero, filtro) {
  if (!filtro) return true;
  switch (filtro.operador) {
    case 'minimo': return numero >= filtro.n;
    case 'maximo': return numero <= filtro.n;
    case 'mayor': return numero > filtro.n;
    case 'menor': return numero < filtro.n;
    default: return numero === filtro.n;
  }
}

function leerConjugacion(texto) {
  const opciones = [
    { terminacion: 'ar', nombre: 'primera', ordinal: '(?:primera|primer|1(?:ra|era|a|ª|º)?|i)' },
    { terminacion: 'er', nombre: 'segunda', ordinal: '(?:segunda|segundo|2(?:da|a|ª|º)?|ii)' },
    { terminacion: 'ir', nombre: 'tercera', ordinal: '(?:tercera|tercer|3(?:ra|era|a|ª|º)?|iii)' }
  ];
  const coincidencias = opciones.filter(opcion => {
    const ordinal = new RegExp('\\b' + opcion.ordinal + '\\s+conjugacion\\b|\\bconjugacion\\s+(?:la\\s+)?' + opcion.ordinal + '(?=\\s|$)');
    const terminacion = new RegExp('\\b(?:termin\\w*|acab\\w*|finaliz\\w*)\\s+(?:en\\s+|con\\s+|la\\s+|por\\s+)*(?:[-"«“\\x27]*)' + opcion.terminacion + '\\b');
    return ordinal.test(texto) || terminacion.test(texto);
  });
  if (coincidencias.length > 1) return { error: 'Pregunta por una sola conjugación cada vez: primera (-ar), segunda (-er) o tercera (-ir).' };
  if (!coincidencias.length && /\b(conjugacion|terminacion)\b/.test(texto)) {
    return { error: 'Indica primera (-ar), segunda (-er) o tercera (-ir) conjugación.' };
  }
  return coincidencias[0] || null;
}

function leerMedios(texto) {
  const imagen = /\b(imagen(?:es)?|fotos?|fotografias?)\b/.test(texto);
  const video = /\bvideos?\b/.test(texto);
  const soloTexto = /\bsolo (?:con )?texto\b/.test(texto);
  const sinImagen = /\b(sin|no tienen?|no llevan?|no hay|carecen de) (?:ninguna? |una? )?(imagen(?:es)?|fotos?|fotografias?)\b/.test(texto);
  const sinVideo = /\b(sin|no tienen?|no llevan?|no hay|carecen de) (?:ninguna? |una? )?videos?\b/.test(texto);
  const sinAmbos = /\b(?:sin|no tienen?) (?:imagen(?:es)?|fotos?|videos?)(?: ni | ni en | y sin )(?:imagen(?:es)?|fotos?|videos?)\b/.test(texto);
  const ambos = /\b(ambos|los dos formatos)\b/.test(texto);
  const cualquiera = imagen && video && /\b(?:imagen(?:es)?|fotos?|fotografias?|videos?)\s+(?:y\/o|o)\s+(?:en |con )?(?:imagen(?:es)?|fotos?|fotografias?|videos?)\b/.test(texto);
  return {
    imagen: soloTexto || sinAmbos ? false : imagen || ambos ? !sinImagen : null,
    video: soloTexto || sinAmbos ? false : video || ambos ? !sinVideo : null,
    cualquiera, soloTexto: soloTexto || sinAmbos
  };
}

function cumpleMedios(tieneImagen, tieneVideo, medios) {
  const imagen = medios.imagen === null || tieneImagen === medios.imagen;
  const video = medios.video === null || tieneVideo === medios.video;
  return medios.cualquiera ? imagen || video : imagen && video;
}

function describirMedios(medios, personas = false) {
  if (medios.soloTexto) return personas ? ' sin apariciones etiquetadas en imagen ni video' : ' solo con texto';
  if (medios.cualquiera) return ' con imagen o video';
  const partes = [];
  if (medios.imagen !== null) partes.push(medios.imagen ? 'con imagen' : 'sin imagen');
  if (medios.video !== null) partes.push(medios.video ? 'con video' : 'sin video');
  return partes.length ? ' ' + partes.join(' y ') : '';
}

function nombresDelArchivo(palabra, entrada, medio) {
  if (!entrada[medio]) return [];
  const etiquetas = entrada.famosos;
  if (etiquetas && Object.prototype.hasOwnProperty.call(etiquetas, medio)) {
    return Array.isArray(etiquetas[medio])
      ? etiquetas[medio].filter(n => typeof n === 'string' && n.trim()).map(n => n.trim()) : [];
  }
  const inicial = famososIniciales[palabra];
  return inicial && medio === (inicial.medio || 'imagen') && entrada[medio] === inicial.archivo ? inicial.nombres : [];
}

function clavePersona(nombre) {
  const normal = normalizeText(nombre).trim();
  const equivalencias = {
    'lionel messi': 'messi', 'leo messi': 'messi',
    'cristiano': 'cristiano ronaldo', 'cr7': 'cristiano ronaldo'
  };
  return equivalencias[normal] || normal;
}

function buscarFamosos(medios) {
  const encontrados = new Map();
  for (const [palabra, entrada] of Object.entries(dictionary)) {
    for (const medio of ['imagen', 'video']) {
      for (const nombre of nombresDelArchivo(palabra, entrada, medio)) {
        const clave = clavePersona(nombre);
        if (!encontrados.has(clave)) encontrados.set(clave, { nombre, referencias: [] });
        const persona = encontrados.get(clave);
        if (!persona.referencias.some(r => r.palabra === palabra && r.medio === medio)) {
          persona.referencias.push({ palabra, medio });
        }
      }
    }
  }
  return Array.from(encontrados.values()).filter(persona =>
    cumpleMedios(persona.referencias.some(r => r.medio === 'imagen'),
      persona.referencias.some(r => r.medio === 'video'), medios)
  ).map(persona => ({
    ...persona,
    referencias: persona.referencias.filter(r => {
      if (medios.cualquiera || (medios.imagen === null && medios.video === null)) return true;
      return medios[r.medio] === true;
    })
  })).sort((a, b) => collatorEs.compare(a.nombre, b.nombre));
}

function analizarPreguntaDiccionario(pregunta) {
  const texto = limpiarConsulta(pregunta);
  const ayuda = respuesta => ({ respuesta, palabras: [], ejemplos: ejemplosAgente });
  const categorias = ['verbo', 'adjetivo', 'adverbio'].filter(c =>
    new RegExp('\\b' + c + 's?\\b').test(texto));
  const famosos = /\b(famos[oa]s?|celebridad(?:es)?|personas conocidas|personajes publicos)\b/.test(texto) ||
    (/\bquienes\b/.test(texto) && /\b(imagen(?:es)?|fotos?|videos?)\b/.test(texto));
  const cuenta = /\b(cuantos|cuantas|cantidad|numero|total)\b/.test(texto);
  const lista = /\b(cuales|quienes|que|lista|listar|muestra|muestrame|mostrar|dime|dame)\b/.test(texto);
  if (!cuenta && !lista) return ayuda('Puedo contar y listar entradas, conjugaciones, famosos y palabras según su número de definiciones.');
  if (categorias.length > 1 || /\b(sustantivos?|pronombres?|articulos?)\b/.test(texto)) {
    return ayuda('Pregunta por una categoría cada vez. Tengo clasificados verbos, adjetivos y adverbios.');
  }
  const conjugacion = leerConjugacion(texto);
  const definiciones = leerCantidadDefiniciones(texto);
  if (conjugacion && conjugacion.error) return ayuda(conjugacion.error);
  if (definiciones && definiciones.error) return ayuda(definiciones.error);
  let categoria = categorias[0];
  if (conjugacion) {
    if (categoria && categoria !== 'verbo') return ayuda('Las conjugaciones corresponden a los verbos. Prueba: ¿Cuáles verbos terminan en -ar?');
    categoria = 'verbo';
  }
  const medios = leerMedios(texto);
  if (famosos) {
    if (categoria || conjugacion || definiciones) return ayuda('Consulta los famosos por imagen o video; consulta las categorías y definiciones en otra pregunta.');
    const personas = buscarFamosos(medios);
    return {
      tipo: 'personas', cantidad: personas.length, personas, palabras: [],
      respuesta: 'Hay ' + personas.length + ' ' + (personas.length === 1 ? 'persona famosa etiquetada' : 'personas famosas etiquetadas') + describirMedios(medios, true) + ' en tu diccionario.',
      nota: 'Cuento cada persona una vez a partir de los nombres asociados a las imágenes y videos.',
      mostrarLista: lista || personas.length <= 20
    };
  }
  if (!categoria && !definiciones && !/\b(palabras?|entradas?|terminos?|diccionario|imagen(?:es)?|fotos?|videos?|texto)\b/.test(texto)) {
    return ayuda('Prueba una pregunta sobre las palabras de tu diccionario.');
  }
  const palabras = Object.keys(dictionary).filter(palabra => {
    const entrada = dictionary[palabra];
    if (categoria && !(Array.isArray(entrada.categorias) && entrada.categorias.includes(categoria))) return false;
    if (conjugacion && !normalizeText(palabra).endsWith(conjugacion.terminacion)) return false;
    return cumpleCantidad(numeroDeDefiniciones(entrada), definiciones) &&
      cumpleMedios(!!entrada.imagen, !!entrada.video, medios);
  }).sort((a, b) => collatorEs.compare(a, b));
  let grupo = categoria ? categoria + (palabras.length === 1 ? '' : 's') : palabras.length === 1 ? 'entrada' : 'entradas';
  if (conjugacion) grupo += ' en infinitivo de la ' + conjugacion.nombre + ' conjugación (-' + conjugacion.terminacion + ')';
  if (definiciones) grupo += ' con ' + definiciones.descripcion;
  grupo += describirMedios(medios);
  const resultado = {
    cantidad: palabras.length, palabras,
    respuesta: 'Hay ' + palabras.length + ' ' + grupo + ' en tu diccionario.',
    mostrarLista: lista || palabras.length <= 20
  };
  if (categoria === 'verbo' && !conjugacion && palabras.some(p => p === 'puede' || p === 'pueda')) {
    resultado.nota = 'Cuento entradas: las formas «puede» y «pueda» se cuentan por separado cuando aparecen en la lista.';
  }
  return resultado;
}

window.responderPreguntaDiccionario = function(pregunta) {
  const resultado = analizarPreguntaDiccionario(pregunta);
  const contenedor = document.getElementById('definition');
  contenedor.replaceChildren();
  function parrafo(texto) {
    const p = document.createElement('p');
    p.textContent = texto;
    contenedor.appendChild(p);
  }
  function enlace(palabra, texto) {
    const a = document.createElement('a');
    a.href = '#' + normalizeText(palabra);
    a.textContent = texto || palabra;
    return a;
  }
  parrafo(resultado.respuesta);
  if (resultado.nota) parrafo(resultado.nota);
  const cantidad = resultado.tipo === 'personas' ? resultado.personas.length : resultado.palabras.length;
  if (cantidad) {
    const detalle = document.createElement('details');
    detalle.open = !!resultado.mostrarLista;
    const titulo = document.createElement('summary');
    titulo.textContent = 'Ver ' + (resultado.tipo === 'personas' ? 'las personas' : 'las palabras') + ' (' + cantidad + ')';
    detalle.appendChild(titulo);
    if (resultado.tipo === 'personas') {
      const listado = document.createElement('ul');
      resultado.personas.forEach(persona => {
        const item = document.createElement('li');
        item.appendChild(document.createTextNode(persona.nombre + ': '));
        persona.referencias.forEach((ref, indice) => {
          if (indice) item.appendChild(document.createTextNode(', '));
          item.appendChild(enlace(ref.palabra, ref.palabra + ' (' + ref.medio + ')'));
        });
        listado.appendChild(item);
      });
      detalle.appendChild(listado);
    } else {
      const listado = document.createElement('p');
      resultado.palabras.forEach((palabra, indice) => {
        if (indice) listado.appendChild(document.createTextNode(', '));
        listado.appendChild(enlace(palabra));
      });
      detalle.appendChild(listado);
    }
    contenedor.appendChild(detalle);
  }
  if (resultado.ejemplos) {
    const listado = document.createElement('ul');
    resultado.ejemplos.forEach(preguntaEjemplo => {
      const item = document.createElement('li');
      const boton = document.createElement('button');
      boton.type = 'button';
      boton.textContent = preguntaEjemplo;
      boton.addEventListener('click', () => {
        document.getElementById('search-input').value = preguntaEjemplo;
        document.getElementById('search-button').click();
      });
      item.appendChild(boton);
      listado.appendChild(item);
    });
    contenedor.appendChild(listado);
  }
};
