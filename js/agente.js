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

// Categorías según las acepciones de este diccionario, incluidos nombres propios.
const sustantivosIniciales = [
  'perro', 'monstruo', 'tirabuzón', 'ropa', 'universo', 'dios', 'cristo',
  'madre', 'realidad', 'conciencia', 'homotecia', 'espíritu', 'alma', 'messi',
  'genio', 'inteligencia', 'triángulo', 'galaxia', 'humano', 'caos', 'infierno',
  'cabra', 'mundo', 'sol', 'meme', 'internet', 'egoísmo', 'profeta', 'ronaldo',
  'judas', 'ciceron', 'espacio', 'blanco', 'dimension', 'cerebro', 'etiología',
  'librero', 'bbc', 'msn', 'google', 'partivo', 'adjetivo', 'ajedrez',
  'información', 'dato', 'escritor', 'escribidor', 'misericordia', 'dibu',
  'deporte', 'nostalgia', 'conjetura', 'matemática', 'matemático', 'dibujo',
  'laberinto', 'demonio', 'cono', 'tenedor', 'cuchara', 'cuchillo', 'palíndromo',
  'capicua', 'morfema', 'virus', 'androide', 'robot', 'maquina', 'ultrainstinto',
  'jiren', 'nada', 'gato', 'jirafa', 'elefante', 'negación', 'hype', 'persona',
  'ventes', 'muerte', 'hollejo', 'sensación', 'epica', 'intencion', 'epoder',
  'clitico', 'enclitico', 'proclitico', 'gugol', 'escobeta', 'ciclo', 'agujero',
  'criba', 'limite', 'tarado', 'ventura', 'eco', 'infinito', 'napolitano', 'negro'
];
const nombresPropiosIniciales = ['cristo', 'messi', 'ronaldo', 'dibu', 'google', 'jiren', 'bbc', 'msn'];
categoriasDiccionario.sustantivo = sustantivosIniciales;
categoriasDiccionario.pronombre = ['yo', 'nadie'];
categoriasDiccionario.articulo = ['el'];
categoriasDiccionario.adjetivo.push('tarado');

// Relaciones propuestas según los significados escritos por el autor.
// Las familias comparten una base; los temas relacionan significados.
// Para nuevas entradas pueden indicarse temas: ["Fútbol"] y familias: ["infinito"].
const familiasIniciales = [
  {"nombre":"caos","descripcion":"Familia de caos: caos (sustantivo), caótico (adjetivo) y caóticamente (adverbio formado sobre caótica con -mente).","palabras":["caos","caótico","caóticamente"]},
  { nombre: 'infinito', descripcion: 'Comparten la base infinit-; se incluye «infinitotriz», voz de este diccionario.', palabras: ['infinito', 'infinitamente', 'infinitotriz', 'infinidad', 'infinitesimal'] },
  { nombre: 'límite', descripcion: 'Palabras vinculadas por la base de límite y limitar.', palabras: ['limite', 'limitado', 'ilimitado'] },
  { nombre: 'eterno', descripcion: 'Adjetivo y adverbio formado sobre su base.', palabras: ['eterno', 'eternamente'] },
  { nombre: 'definir', descripcion: 'Formaciones sobre definido con distintos prefijos.', palabras: ['unidefinido', 'bidefinido', 'tridefinido', 'indefinido'] },
  { nombre: 'dibujar', descripcion: 'La acción y su resultado comparten base.', palabras: ['dibujar', 'dibujo'] },
  { nombre: 'escribir', descripcion: 'Nombres de personas formados a partir de escribir.', palabras: ['escritor', 'escribidor'] },
  { nombre: 'matemática', descripcion: 'La disciplina y la persona que la estudia.', palabras: ['matemática', 'matemático'] },
  { nombre: 'negar', descripcion: 'Verbo y nombre de la acción.', palabras: ['negar', 'negación'] },
  { nombre: 'Google', descripcion: 'Formaciones basadas en el nombre Google.', palabras: ['google', 'googlear', 'googleable', 'ingoogleable'] },
  { nombre: 'poder', descripcion: 'Base poder y formaciones relacionadas; «epoder» es una voz de este diccionario.', palabras: ['poder', 'todopoderoso', 'epoder'] },
  { nombre: 'épica', descripcion: 'Palabras de base épic- con usos nominal y adjetivo.', palabras: ['epica', 'epico'] },
  { nombre: 'clítico', descripcion: 'Comparten la base clítico con distintos prefijos.', palabras: ['clitico', 'enclitico', 'proclitico'] }
];
const formasIniciales = [
  { nombre: 'poder', descripcion: '«Puede» y «pueda» son formas conjugadas de poder.', palabras: ['poder', 'puede', 'pueda'] }
];
const temasIniciales = [
  { nombre: 'Infinito, límites y eternidad', alias: ['infinito', 'limites', 'eternidad'], descripcion: 'Ausencia de límites, duración y determinación.', palabras: ['infinito', 'ilimitado', 'infinitamente', 'infinitotriz', 'limitado', 'limite', 'eterno', 'eternamente', 'indeterminado'] },
  { nombre: 'Matemática y geometría', alias: ['matematica', 'matematicas', 'geometria'], descripcion: 'Números, figuras, funciones y razonamiento matemático.', palabras: ['homotecia', 'triángulo', 'dimension', 'idempotente', 'partivo', 'conjetura', 'matemática', 'matemático', 'cono', 'capicua', 'gugol', 'holomorfa', 'meromorfa', 'criba', 'limite', 'infinito'] },
  { nombre: 'Universo y espacio', alias: ['universo', 'astronomia', 'espacio'], descripcion: 'Astros, espacio y mundo físico.', palabras: ['universo', 'mundo', 'sol', 'galaxia', 'espacio', 'dimension', 'caos'] },
  { nombre: 'Existencia y realidad', alias: ['existencia', 'realidad', 'filosofia'], descripcion: 'Lo real, su existencia, su ausencia o su representación.', palabras: ['ser', 'existir', 'realidad', 'nada', 'mundo', 'universo', 'artificial', 'simular'] },
  { nombre: 'Religión y seres sobrenaturales', alias: ['religion', 'sobrenatural'], descripcion: 'Personas, creencias y seres de las definiciones religiosas.', palabras: ['dios', 'cristo', 'espíritu', 'alma', 'profeta', 'judas', 'infierno', 'demonio', 'misericordia', 'omnipotente', 'todopoderoso', 'muerte', 'monstruo'] },
  { nombre: 'Dragon Ball', alias: ['dragon ball'], descripcion: 'Un personaje y una técnica del universo de Dragon Ball.', palabras: ['jiren', 'ultrainstinto'] },
  { nombre: 'Fútbol', alias: ['futbol'], descripcion: 'Futbolistas, equipos de delanteros y términos futbolísticos.', palabras: ['messi', 'ronaldo', 'bbc', 'msn', 'dibu', 'deporte', 'eliminatoria', 'maradoniano', 'cabra', 'vencer'] },
  { nombre: 'Tríos del fútbol', alias: ['trios del futbol', 'trios de delanteros'], descripcion: 'BBC y MSN designan dos tríos de delanteros.', palabras: ['bbc', 'msn'] },
  { nombre: 'Juegos y competición', alias: ['juegos', 'competicion', 'deportes'], descripcion: 'Jugar, competir, clasificarse y vencer.', palabras: ['ajedrez', 'regicida', 'deporte', 'eliminatoria', 'vencer', 'ciclo'] },
  { nombre: 'Animales', alias: ['animales', 'mamiferos'], descripcion: 'Nombres de animales presentes en el diccionario.', palabras: ['perro', 'cabra', 'gato', 'jirafa', 'elefante', 'humano'] },
  { nombre: 'Cuerpo, vida y salud', alias: ['cuerpo', 'biologia', 'vida', 'salud'], descripcion: 'Cuerpo humano, procesos vitales y salud.', palabras: ['humano', 'cerebro', 'virus', 'embarazada', 'hollejo', 'madre', 'persona', 'muerte', 'etiología', 'sensación'] },
  { nombre: 'Aspecto y rasgos físicos', alias: ['aspecto', 'rasgos fisicos'], descripcion: 'Apariencia y características del cuerpo.', palabras: ['gordo', 'flaco', 'ñato', 'narigón', 'carón', 'patiestevado', 'tirabuzón', 'hollejo'] },
  { nombre: 'Ropa y cuidado personal', alias: ['ropa', 'vestimenta', 'cuidado personal'], descripcion: 'Vestirse, sujetar la ropa y cuidar el aspecto.', palabras: ['ropa', 'vestir', 'atar', 'escobeta', 'jabonoso', 'tirabuzón'] },
  { nombre: 'Objetos y utensilios', alias: ['objetos', 'utensilios'], descripcion: 'Objetos de uso cotidiano.', palabras: ['tenedor', 'cuchara', 'cuchillo', 'escobeta', 'criba', 'librero', 'maquina'] },
  { nombre: 'Mente y conocimiento', alias: ['mente', 'conocimiento', 'aprendizaje'], descripcion: 'Pensar, aprender, percibir y trabajar con información.', palabras: ['conciencia', 'genio', 'inteligencia', 'aprender', 'información', 'dato', 'cerebro', 'sensación', 'intencion', 'conjetura'] },
  { nombre: 'Sentimientos y valoración', alias: ['sentimientos', 'emociones'], descripcion: 'Sentimientos, expectativas y formas de valorar.', palabras: ['amar', 'odiar', 'egoísmo', 'misericordia', 'nostalgia', 'llorar', 'ventura', 'hype', 'inefable'] },
  { nombre: 'Personas, vínculos y estados', alias: ['personas', 'vinculos', 'estados personales'], descripcion: 'Personas, vínculos y estados descritos en sus acepciones.', palabras: ['persona', 'humano', 'madre', 'embarazada', 'soltero', 'loco', 'tarado', 'genio', 'escritor', 'escribidor', 'librero', 'matemático', 'profeta', 'judas', 'ciceron'] },
  { nombre: 'Tecnología y entorno digital', alias: ['tecnologia', 'informatica', 'internet'], descripcion: 'Máquinas, datos y comunicación digital.', palabras: ['internet', 'google', 'googlear', 'googleable', 'ingoogleable', 'meme', 'información', 'dato', 'precomputada', 'artificial', 'robot', 'androide', 'maquina', 'simular', 'virus', 'mapear', 'hype'] },
  { nombre: 'Gramática y palabras', alias: ['gramatica', 'lenguaje'], descripcion: 'Clases de palabras, formas verbales y construcciones lingüísticas.', palabras: ['adjetivo', 'morfema', 'clitico', 'enclitico', 'proclitico', 'yo', 'el', 'nadie', 'no', 'negar', 'negación', 'puede', 'pueda', 'persona', 'ser', 'unidefinido', 'bidefinido', 'tridefinido', 'indefinido', 'ventes', 'ñañar', 'palíndromo'] },
  { nombre: 'Definición y expresión', alias: ['definicion', 'expresion'], descripcion: 'Definir algo o expresar su sentido mediante palabras.', palabras: ['unidefinido', 'bidefinido', 'tridefinido', 'indefinido', 'inefable', 'ciceron'] },
  { nombre: 'Literatura y creación', alias: ['literatura', 'creacion', 'arte'], descripcion: 'Escritura, relatos y creación de imágenes o juegos de palabras.', palabras: ['escritor', 'escribidor', 'librero', 'ciceron', 'epica', 'epico', 'dibujar', 'dibujo', 'ñañar', 'palíndromo'] },
  { nombre: 'Negación y ausencia', alias: ['negacion', 'ausencia'], descripcion: 'Negar, excluir o expresar ausencia.', palabras: ['no', 'negar', 'negación', 'nadie', 'nada', 'indefinido', 'ingoogleable'] },
  { nombre: 'Poder, voluntad y acción', alias: ['poder', 'voluntad', 'accion'], descripcion: 'Capacidad, intención y dominio según las definiciones.', palabras: ['poder', 'puede', 'pueda', 'epoder', 'todopoderoso', 'omnipotente', 'intencion', 'todar', 'limitado', 'vencer'] },
  { nombre: 'Lugares, orientación y movimiento', alias: ['lugares', 'orientacion', 'movimiento'], descripcion: 'Ubicarse, desplazarse o describir lugares.', palabras: ['habitar', 'subir', 'mapear', 'laberinto', 'mundo', 'espacio', 'agujero', 'napolitano'] },
  { nombre: 'Percepción y colores', alias: ['percepcion', 'colores', 'sonidos'], descripcion: 'Percibir estímulos visuales o sonoros.', palabras: ['sensación', 'eco', 'blanco', 'negro'] },
  { nombre: 'Cualidades y estados', alias: ['cualidades', 'propiedades'], descripcion: 'Palabras que describen cualidades o estados en el diccionario.', palabras: ['infinito', 'ilimitado', 'unidefinido', 'jabonoso', 'embarazada', 'gordo', 'idempotente', 'regicida', 'bidefinido', 'tridefinido', 'loco', 'flaco', 'ñato', 'narigón', 'carón', 'indeterminado', 'indefinido', 'precomputada', 'holomorfa', 'meromorfa', 'maradoniano', 'limitado', 'eterno', 'todopoderoso', 'omnipotente', 'napolitano', 'ultrabasico', 'artificial', 'patiestevado', 'epico', 'eliminatoria', 'googleable', 'ingoogleable', 'infinitotriz', 'soltero', 'negro', 'tarado', 'inefable'] }
];

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
  ajedrez: { archivo: 'videos/ajedrez.webm', medio: 'video', nombres: ['Magnus Carlsen'] },
  'vencer-comparacion': { archivo: 'videos/vencer-comparacion.webm', medio: 'video', nombres: ['Davo Xeneize', 'Gastón Edul'] },
  'vencer-gero': { archivo: 'videos/vencer-gero.webm', medio: 'video', nombres: ['Gero Arias', 'Viruzz'] }
};

const ejemplosAgente = [
  '¿Cuáles son las definiciones que tienen circularidad?',
  '¿Cuáles definiciones se definen con la misma palabra?',
  '¿Qué significa que una palabra aparezca en rojo y gire 360°?',
  '¿Cuántos y cuáles adjetivos tienen alguna definición que empieza por «que»?',
  '¿Se cumple que los verbos se definen con otros verbos?',
  '¿Qué verbos no tienen ninguna definición que empiece con otro infinitivo?',
  '¿Cuántos y cuáles adverbios terminan en -mente?',
  '¿Qué palabras no verbales tienen video?',
  '¿Existe la terminación verbal -or o -ur?',
  '¿Cuántos y cuáles sustantivos hay?',
  '¿Qué palabras forman la familia de infinito?',
  '¿Con qué palabras se relaciona msn?',
  '¿Agrupa todas las palabras por temas?',
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

function acepcionesDeEntrada(entrada) {
  const definiciones = Array.isArray(entrada.definiciones) ? entrada.definiciones : [entrada.definicion];
  return definiciones.map((texto, indice) => ({ texto, numero: indice + 1 }))
    .filter(d => typeof d.texto === 'string' && d.texto.trim());
}

function comienzoDeDefinicion(definicion) {
  let texto = definicion.replace(/<[^>]*>/g, ' ').replace(/&nbsp;|&#160;/gi, ' ').trim();
  let anterior;
  do {
    anterior = texto;
    texto = texto.replace(/^[\s«»“”"'‘’*•–—-]+/, '')
      .replace(/^\(?\d+\s*[.)º°ª:]\s*/, '')
      .replace(/^\[\s*(?:adjetivo|adverbio|verbo|sustantivo|pronombre|artículo|articulo|adj\.?|adv\.?|v\.?)\s*\]\s*/i, '')
      .replace(/^(?:adj|adv|tr|intr|prnl|v)\.\s*/i, '').trim();
  } while (texto !== anterior);
  return texto;
}

// Infinitivos reconocidos en las definiciones y otros de uso frecuente.
// Se amplían con los verbos etiquetados en el propio diccionario.
// Una mera terminación -ar/-er/-ir no basta: «lugar» y «taller» no son verbos.
const infinitivosDefinidores = new Set([
  'adquirir', 'afirmar', 'alzar', 'amar', 'aparentar', 'aprender', 'arrojar',
  'atraer', 'aumentar', 'batir', 'beber', 'buscar', 'caer', 'caminar', 'cantar',
  'comer', 'comprar', 'conocer', 'construir', 'correr', 'costear', 'crear',
  'crecer', 'cubrir', 'cumplir', 'dar', 'decir', 'dejar', 'derramar', 'describir',
  'destilar', 'dormir', 'echar', 'emplear', 'encontrar', 'enlazar', 'enseñar',
  'entrar', 'escribir', 'estar', 'estudiar', 'existir', 'explicar', 'expresar',
  'formar', 'guarnecer', 'habitar', 'hablar', 'hacer', 'imitar', 'indicar',
  'introducir', 'investigar', 'ir', 'jugar', 'lavar', 'leer', 'llamar', 'llevar',
  'lograr', 'manar', 'mirar', 'montar', 'morir', 'mover', 'nacer', 'negar',
  'ocurrir', 'oír', 'parar', 'pasar', 'pensar', 'poder', 'poner', 'producir',
  'querer', 'realizar', 'recibir', 'representar', 'romper', 'saber', 'sacar',
  'salir', 'sentir', 'ser', 'significar', 'sufrir', 'sujetar', 'superar',
  'tapizar', 'tener', 'terminar', 'tomar', 'trabajar', 'tratar', 'trazar',
  'triunfar', 'usar', 'utilizar', 'venir', 'ver', 'viajar', 'vivir', 'volver'
].map(normalizeText));

function baseDeInfinitivo(palabra) {
  const normal = normalizeText(palabra);
  return normal.replace(/(?:se|me|te|nos|os|lo|la|los|las|le|les){1,2}$/, '');
}

function otroInfinitivoInicial(palabra, definicion) {
  const inicial = comienzoDeDefinicion(definicion).match(/^[\p{L}]+/u);
  if (!inicial) return null;
  const base = baseDeInfinitivo(inicial[0]);
  const lema = ['puede', 'pueda'].includes(normalizeText(palabra)) ? 'poder' : baseDeInfinitivo(palabra);
  if (!/(?:ar|er|ir)$/.test(base) || base === lema) return null;
  const reconocido = infinitivosDefinidores.has(base) || Object.entries(dictionary).some(([p, entrada]) =>
    baseDeInfinitivo(p) === base && listaDeCategorias(entrada).includes('verbo'));
  return reconocido ? inicial[0] : null;
}

function consultarPatronesDefiniciones(texto) {
  const inicio = /\b(?:empiez\w*|empiec\w*|comienz\w*|comienc\w*|inici\w*)\b/.test(texto);
  const definicion = /\b(?:defin\w*|acepcion\w*)\b/.test(texto);
  const mencionaQue = /[«“"']que[»”"']|\b(?:con|por|en)\s+(?:(?:la|el)\s+)?(?:(?:palabra|conjuncion|pronombre(?: relativo)?|relativo)\s+)?[«“"']?que\b/.test(texto);
  const adjetivosQue = /\badjetivos?\b/.test(texto) && mencionaQue && (inicio || definicion);
  const descripcion = texto.match(/\b(?:defin\w*|acepcion\w*|empiez\w*|empiec\w*|comienz\w*|comienc\w*|inici\w*)\b[\s\S]*/)?.[0] || '';
  const otroVerbo = /\b(?:con|mediante|por|en|usando|utilizando|a traves de)\s+(?:(?:un|otro|otros|algun|algunos)\s+)?(?:verbos?|infinitivos?)\b/.test(descripcion);
  const verbosDefinidos = /\bverbos?\b/.test(texto) && (inicio || definicion) && otroVerbo;
  const adverbiosMente = /\badverbios?\b/.test(texto) && /\bmente\b/.test(texto) &&
    /\b(?:termin\w*|acab\w*|finaliz\w*|sufijos?)\b/.test(texto);
  if (!adjetivosQue && !verbosDefinidos && !adverbiosMente) return null;

  const categoria = adjetivosQue ? 'adjetivo' : verbosDefinidos ? 'verbo' : 'adverbio';
  const negativas = /\bno\s+(?:se\s+)?(?:termin\w*|acab\w*|finaliz\w*|empiez\w*|empiec\w*|comienz\w*|comienc\w*|inici\w*|defin\w*)\b|\bno\s+tienen?\s+(?:(?:ninguna|alguna|una)\s+)?(?:definicion|acepcion)|\b(?:excepciones|no cumplen)\b|\bsin (?:el |la )?(?:sufijo|terminacion)\b/.test(texto);
  const todasAcepciones = /\btodas (?:sus |las )?(?:definiciones|acepciones)\b|\bcada (?:definicion|acepcion)\b/.test(texto);
  const universal = /\b(?:siempre|se cumple)\b|\btodos (?:los )?(?:verbos|adjetivos|adverbios)\b/.test(texto);
  const medios = leerMedios(texto);
  const entradas = Object.entries(dictionary).filter(([, entrada]) =>
    listaDeCategorias(entrada).includes(categoria) && cumpleMedios(entradaTieneImagen(entrada), entradaTieneVideo(entrada), medios));
  const revisadas = entradas.map(([palabra, entrada]) => {
    const acepciones = acepcionesDeEntrada(entrada);
    const coincidencias = adverbiosMente ? [] : acepciones.filter(d => adjetivosQue
      ? /^que(?:\b|$)/.test(normalizeText(comienzoDeDefinicion(d.texto)))
      : !!otroInfinitivoInicial(palabra, d.texto));
    const coincide = adverbiosMente ? normalizeText(palabra).endsWith('mente')
      : todasAcepciones ? acepciones.length > 0 && coincidencias.length === acepciones.length : coincidencias.length > 0;
    const muestra = (coincide ? coincidencias[0] : acepciones[0]) || acepciones[0];
    return { palabra, coincide, coincidencias: coincidencias.length, total: acepciones.length,
      definicion: muestra?.texto || 'Sin definición escrita.', numero: muestra?.numero };
  }).sort((a, b) => collatorEs.compare(a.palabra, b.palabra));
  const cumplen = revisadas.filter(r => r.coincide);
  const excepciones = revisadas.filter(r => !r.coincide);
  const seleccionadas = negativas ? excepciones : cumplen;
  const n = seleccionadas.length;
  const total = revisadas.length;
  const sujeto = categoria + (n === 1 ? '' : 's');
  const alcance = todasAcepciones ? 'todas sus definiciones' : 'al menos una definición';
  const inicioBuscado = adjetivosQue ? '«que»' : 'otro verbo en infinitivo reconocido';
  const mediosDescritos = describirMedios(medios);
  let respuesta = adverbiosMente
    ? 'Hay ' + n + ' ' + sujeto + mediosDescritos + ' que ' + (negativas ? 'no ' : '') + (n === 1 ? 'termina' : 'terminan') + ' en -mente'
    : 'Hay ' + n + ' ' + sujeto + mediosDescritos + ' que ' + (negativas ? 'no ' : '') + (n === 1 ? 'cumple' : 'cumplen') + ' este criterio: ' + alcance + ' empieza' + (todasAcepciones ? 'n' : '') + ' por ' + inicioBuscado;
  respuesta += ', de ' + total + ' ' + categoria + (total === 1 ? '' : 's') + ' consultad' + (total === 1 ? 'o' : 'os') + '.';
  if (universal && !negativas && total) respuesta = (excepciones.length ? 'No se cumple en todos. ' : 'Sí, se cumple en todos los consultados. ') + respuesta;
  let nota = 'Cuento cada entrada una sola vez.';
  if (adverbiosMente) nota += ' Compruebo la terminación de la palabra, no la de su definición.';
  else {
    nota += ' Reviso el comienzo de cada acepción e ignoro la numeración y las etiquetas gramaticales iniciales.';
    if (verbosDefinidos) {
      const todas = revisadas.filter(r => r.total > 0 && r.coincidencias === r.total).length;
      const algunas = revisadas.filter(r => r.coincidencias > 0 && r.coincidencias < r.total).length;
      nota += ' Es una comprobación del inicio con infinitivos reconocidos: ' + todas + ' entradas cumplen en todas sus acepciones y ' + algunas + ' solo en algunas.';
      if (revisadas.some(r => ['puede', 'pueda'].includes(r.palabra))) nota += ' Incluyo las formas «puede» y «pueda» como entradas separadas.';
    }
  }
  return {
    respuesta, nota, cantidad: n, total, palabras: seleccionadas.map(r => r.palabra),
    mostrarLista: true,
    evidencias: adverbiosMente ? undefined : seleccionadas,
    excepciones: !negativas && (verbosDefinidos || universal) ? excepciones : undefined,
    criterio: adverbiosMente ? 'terminacion-mente' : adjetivosQue ? 'definicion-que' : 'definicion-infinitivo'
  };
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

function entradaTieneImagen(entrada) {
  return !!(entrada && (entrada.imagen || (Array.isArray(entrada.imagenes) && entrada.imagenes.some(Boolean))));
}

function entradaTieneVideo(entrada) {
  return !!(entrada && (entrada.video ||
    (entrada.videosAcepciones && Object.values(entrada.videosAcepciones).some(v => v && v.src))));
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
  const etiquetas = entrada.famosos;
  if (etiquetas && Object.prototype.hasOwnProperty.call(etiquetas, medio)) {
    return Array.isArray(etiquetas[medio])
      ? etiquetas[medio].filter(n => typeof n === 'string' && n.trim()).map(n => n.trim()) : [];
  }

  // Compatibilidad con un único archivo tradicional.
  if (entrada[medio]) {
    const inicial = famososIniciales[palabra];
    if (inicial && medio === (inicial.medio || 'imagen') && entrada[medio] === inicial.archivo) return inicial.nombres;
  }

  // Los videos asociados a acepciones pueden contener personas distintas.
  if (medio === 'video' && entrada.videosAcepciones) {
    const nombres = [];
    for (const v of Object.values(entrada.videosAcepciones)) {
      if (!v || !v.src) continue;
      const clave = Object.keys(famososIniciales).find(k => {
        const dato = famososIniciales[k];
        return (dato.medio || 'imagen') === 'video' && dato.archivo === v.src;
      });
      if (clave) nombres.push(...famososIniciales[clave].nombres);
      if (Array.isArray(v.famosos)) nombres.push(...v.famosos);
    }
    return [...new Set(nombres)];
  }
  return [];
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


function responderSobreTerminaciones(texto) {
  const preguntaNoVerbal = /\bno[ -]+verbal(?:es)?\b|\bno (?:son|sean) verbos?\b/.test(texto);
  if (preguntaNoVerbal) return null;
  const mencionaOrUr = /\b(?:or|ur)\b/.test(texto);
  const asuntoVerbal = /\b(?:verbos?|verbal(?:es)?|infinitivos?|conjugaciones?)\b/.test(texto);
  const general = /\b(?:cuantas|cuales|que)\b.*\b(?:conjugaciones|terminaciones del infinitivo)\b/.test(texto) &&
    !/\b(?:primera|segunda|tercera|[123])\b/.test(texto);
  const grandor = /\bgrandor\b/.test(texto) && /\b(?:adjetivo|sustantivo|terminacion)\b/.test(texto);
  if (!(mencionaOrUr && (asuntoVerbal || /\b(?:existe|existen|adjetivos?|sustantivos?)\b/.test(texto))) && !general && !grandor) return null;
  return {
    respuesta: 'Los infinitivos españoles tienen tres terminaciones: -ar, -er e -ir. No hay una conjugación en -or ni en -ur. Esto se refiere al infinitivo; las formas conjugadas pueden terminar de otras maneras, como «amo» o «comió».',
    nota: 'Acabar en -or no convierte automáticamente una palabra en adjetivo: «grandor» y «dolor» son sustantivos; «mayor» y «menor» pueden funcionar como adjetivos. «Grandor» significa tamaño.',
    palabras: [], cantidad: general ? 3 : 0,
    fuentes: [
      { nombre: 'RAE: infinitivo', url: 'https://www.rae.es/gtg/infinitivo' },
      { nombre: 'RAE: grandor', url: 'https://dle.rae.es/grandor' }
    ]
  };
}

function listaDeCategorias(entrada) {
  return Array.isArray(entrada.categorias) ? entrada.categorias : [];
}

function esNombrePropio(palabra, entrada) {
  if (typeof entrada.nombrePropio === 'boolean') return entrada.nombrePropio;
  return nombresPropiosIniciales.includes(palabra);
}

function catalogoDeRelaciones() {
  const grupos = new Map();
  const agregar = (tipo, grupo) => {
    const id = tipo + ':' + normalizeText(grupo.nombre);
    if (!grupos.has(id)) grupos.set(id, { ...grupo, id, tipo, palabras: [] });
    const guardado = grupos.get(id);
    for (const palabra of grupo.palabras) {
      if (Object.prototype.hasOwnProperty.call(dictionary, palabra) && !guardado.palabras.includes(palabra)) guardado.palabras.push(palabra);
    }
  };
  for (const grupo of familiasIniciales) agregar('familia', grupo);
  for (const grupo of formasIniciales) agregar('forma', grupo);
  for (const grupo of temasIniciales) agregar('tema', grupo);
  for (const [palabra, entrada] of Object.entries(dictionary)) {
    for (const [campo, tipo] of [['familias', 'familia'], ['temas', 'tema']]) {
      for (const nombre of Array.isArray(entrada[campo]) ? entrada[campo] : []) {
        if (typeof nombre !== 'string' || !nombre.trim()) continue;
        agregar(tipo, { nombre: nombre.trim(), descripcion: 'Relación indicada en las etiquetas de la entrada.', palabras: [palabra] });
      }
    }
  }
  const sinTema = Object.keys(dictionary).filter(palabra =>
    !Array.from(grupos.values()).some(g => g.tipo === 'tema' && g.palabras.includes(palabra)));
  if (sinTema.length) agregar('pendiente', {
    nombre: 'Sin tema asignado',
    descripcion: 'Estas entradas nuevas aún necesitan una etiqueta de tema.',
    palabras: sinTema
  });
  return Array.from(grupos.values()).filter(g => g.palabras.length).map(g => ({
    ...g, palabras: g.palabras.sort((a, b) => collatorEs.compare(a, b))
  }));
}

function contieneExpresion(texto, expresion) {
  const limpiar = s => normalizeText(s).replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
  return (' ' + limpiar(texto) + ' ').includes(' ' + limpiar(expresion) + ' ');
}

function consultarRelaciones(texto) {
  const catalogo = catalogoDeRelaciones();
  const pideFamilia = /\bfamilias?\b/.test(texto);
  const explicita = /\b(?:familias?|relacion\w*|asoci\w*|agrup\w*|grupos?|temas?|tematic\w*|une|unen|unir|unirse)\b|\btienen que ver\b/.test(texto);
  const temasNombrados = catalogo.filter(g => g.tipo === 'tema' &&
    [g.nombre, ...(g.alias || [])].some(nombre => contieneExpresion(texto, nombre)));
  const pideTema = /\b(?:sobre|tema|grupo|categoria|tematicas?)\b/.test(texto) && temasNombrados.length;
  if (!explicita && !pideTema) return null;

  let objetivo = null;
  const comillas = texto.match(/["«“']([^"»”']+)["»”']/);
  const destinos = [
    /\bfamilia(?:s)?(?: lexica(?:s)?)? (?:de|del) (.+)$/,
    /\b(?:relacionad[oa]s?|relacion\w*|asociad[oa]s?|asoci\w*) (?:con|a|entre) (.+)$/,
    /\b(?:se une|se unen|unirse|tienen que ver) (?:con|a) (.+)$/,
    /\b(?:une|unen) (?:a|entre) (.+)$/,
    /\b(?:tema|grupo|categoria) (?:de|del) (.+)$/
  ];
  if (comillas) objetivo = comillas[1];
  else {
    for (const patron of destinos) {
      const coincidencia = texto.match(patron);
      if (coincidencia) { objetivo = coincidencia[1]; break; }
    }
  }
  const generica = objetivo && /^(?:las |los |todas las |todos los )?(?:palabras|entradas|terminos|diccionario)$/.test(objetivo);
  if (generica) objetivo = null;
  const auxiliares = new Set(['el', 'no', 'yo', 'ser', 'puede', 'pueda', 'persona']);
  const palabras = Object.keys(dictionary).filter(palabra =>
    (objetivo !== null || !auxiliares.has(palabra)) && contieneExpresion(objetivo || texto, palabra));
  const familiasNombradas = catalogo.filter(g => g.tipo === 'familia' && contieneExpresion(objetivo || texto, g.nombre));
  const comunes = palabras.length > 1 && /\b(?:une|unen|entre|comparten|comun)\b/.test(texto);
  const dePalabras = tipo => catalogo.filter(g =>
    (!tipo || g.tipo === tipo) && g.tipo !== 'pendiente' &&
    (comunes ? palabras.every(p => g.palabras.includes(p)) : palabras.some(p => g.palabras.includes(p))));
  let grupos, respuesta;
  const nota = 'Las familias comparten una base léxica; los temas reúnen significados relacionados. Una palabra puede figurar en varios grupos.';
  if (palabras.length) {
    grupos = pideFamilia ? dePalabras('familia').filter(g => g.palabras.length > 1) : dePalabras();
    if (pideFamilia && !grupos.length) {
      grupos = dePalabras('tema');
      respuesta = 'No hay otra palabra de la misma familia léxica registrada para ' + palabras.map(p => '«' + p + '»').join(', ') + '. Estas son sus asociaciones por tema.';
    } else {
      respuesta = (comunes ? 'Grupos compartidos por ' : 'Relaciones registradas para ') +
        palabras.map(p => '«' + p + '»').join(', ') + '.';
    }
  } else if (pideFamilia && familiasNombradas.length) {
    grupos = familiasNombradas;
    respuesta = 'Estas son las familias léxicas encontradas.';
  } else if (temasNombrados.length) {
    grupos = temasNombrados;
    respuesta = 'Estas son las entradas agrupadas por el tema consultado.';
  } else if (objetivo !== null) {
    return { respuesta: 'No encontré «' + objetivo + '» entre las entradas o los grupos registrados.', palabras: [], ejemplos: ejemplosAgente };
  } else {
    grupos = pideFamilia ? catalogo.filter(g => g.tipo === 'familia' && g.palabras.length > 1)
      : catalogo.filter(g => g.tipo === 'tema' || g.tipo === 'pendiente');
    const cubiertas = new Set(grupos.flatMap(g => g.palabras)).size;
    respuesta = pideFamilia
      ? 'Hay ' + grupos.length + ' familias léxicas con al menos dos entradas; reúnen ' + cubiertas + ' palabras del diccionario.'
      : 'Las ' + Object.keys(dictionary).length + ' entradas aparecen en ' + grupos.length + ' grupos. Puedes desplegarlos para ver sus palabras.';
  }
  if (!grupos.length) respuesta = 'No he registrado un grupo compartido para esas palabras.';
  const orden = { familia: 0, forma: 1, tema: 2, pendiente: 3 };
  grupos.sort((a, b) => orden[a.tipo] - orden[b.tipo] ||
    (palabras.length ? a.palabras.length - b.palabras.length : 0) || collatorEs.compare(a.nombre, b.nombre));
  return { tipo: 'grupos', cantidad: grupos.length, grupos, palabras: [], respuesta, nota,
    mostrarLista: palabras.length > 0 || !!objetivo || !!pideTema };
}

function proponerPalabraNoDefinida() {
  // Candidatos vinculados con la interfaz, el código y los temas que ya trabaja el diccionario.
  // Al comprobarlos contra dictionary nunca se propone una entrada que ya exista.
  const candidatos = [
    ['algoritmo', 'Aparece de forma natural en el funcionamiento y el código del diccionario.'],
    ['interfaz', 'Describe los botones, el buscador y los elementos con los que interactúa el usuario.'],
    ['hipervínculo', 'Es una pieza importante de la navegación entre contenidos del diccionario.'],
    ['semántica', 'Es central para relacionar palabras, significados y reconocimiento.'],
    ['etimología', 'Ampliaría el trabajo de origen e historia de las palabras.'],
    ['lexicografía', 'Es la disciplina directamente relacionada con construir diccionarios.'],
    ['polisemia', 'Permite explicar por qué una palabra puede tener varias acepciones.'],
    ['metadato', 'Describe información auxiliar usada por sistemas y archivos.'],
    ['recursividad', 'Es un concepto más complejo de programación y matemáticas.'],
    ['ontología', 'Permite organizar conceptos y las relaciones entre ellos.'],
    ['taxonomía', 'Serviría para explicar la clasificación de entradas y conceptos.'],
    ['inferencia', 'Conecta razonamiento, lógica y el comportamiento de un agente.'],
    ['vector', 'Relaciona matemáticas, geometría y técnicas modernas de reconocimiento.'],
    ['embedding', 'Es un concepto técnico útil para representar semánticamente datos.'],
    ['token', 'Es una unidad relevante en procesamiento de lenguaje y programación.'],
    ['consulta', 'Es la acción que realiza el buscador al preguntar al diccionario.'],
    ['acepción', 'Es fundamental para describir cada significado de una entrada.'],
    ['lema', 'Es el término que encabeza una entrada de diccionario.'],
    ['morfología', 'Complementa las familias de palabras y categorías gramaticales.'],
    ['grafo', 'Describe bien las redes de familias y relaciones del diccionario.']
  ];
  // Ampliar propuestas a partir de relaciones existentes y de conceptos nuevos.
  const nuevasIdeas = [
    'ontogenia','epistemología','pragmática','lexicología','semasiología',
    'onomasiología','hiperonimia','hiponimia','meronimia','holonimia',
    'isomorfismo','homeomorfismo','topología','incrustación','vectorización',
    'coseno','similitud','distancia euclidiana','espacio vectorial',
    'dimensionalidad','tokenización','lematización','desambiguación',
    'corpus','concordancia','colocación','neologismo','calco lingüístico',
    'derivación','composición','flexión','alomorfo','morfema',
    'lexema','campo semántico','red semántica','polisemántico',
    'homonimia','homografía','homofonía','sinonimia','antonimia',
    'metonimia','sinécdoque','anáfora','catáfora','deixis',
    'recursión','grafo dirigido','arista','nodo','heurística'
  ];
  nuevasIdeas.forEach(palabra => candidatos.push([palabra, 'Es un concepto que puede ampliar las relaciones lingüísticas, matemáticas o informáticas del diccionario.']));
  const propuestasRelacionadas = new Set();
  Object.values(dictionary).forEach(entrada => {
    if (!entrada || typeof entrada !== 'object') return;
    const relacionadas = entrada.relacionadas;
    if (Array.isArray(relacionadas)) relacionadas.forEach(p => {
      if (typeof p === 'string' && /^[\\p{L}\\s-]{2,45}$/u.test(p.trim())) propuestasRelacionadas.add(p.trim());
    });
  });
  propuestasRelacionadas.forEach(palabra => candidatos.push([palabra, 'Aparece como palabra relacionada de otra entrada y todavía falta definirla.']));
  const disponibles = candidatos.filter(([palabra]) =>
    !Object.keys(dictionary).some(existente => normalizeText(existente) === normalizeText(palabra))
  );
  if (!disponibles.length) return { respuesta: 'No encuentro ahora una palabra candidata que no esté ya definida.', palabras: [] };
  const anterior = window.__ultimaPalabraPropuesta || '';
  const elegibles = disponibles.filter(([p]) => p !== anterior);
  const bolsa = elegibles.length ? elegibles : disponibles;
  const [palabra, motivo] = bolsa[Math.floor(Math.random() * bolsa.length)];
  window.__ultimaPalabraPropuesta = palabra;
  return {
    tipo: 'propuesta',
    respuesta: 'Propongo: «' + palabra + '».',
    nota: motivo + ' Todavía no tiene una entrada en el diccionario.',
    palabras: []
  };
}

// Consulta de autorreferencias directas: mismo lema como palabra completa.
function consultarCircularidad(texto) {
  const preguntaLista = /\b(circularidad|circulares?|misma palabra|se definen con|autorreferenc|se define a si misma)\b/.test(texto);
  const preguntaRojo = /\b(rojo|roja|gira|girar|360|grados)\b/.test(texto) &&
    /\b(palabra|definicion|significa|gira|360|rojo)\b/.test(texto);
  if (!preguntaLista && !preguntaRojo) return null;
  const coincidencias = [];
  for (const [lema, entrada] of Object.entries(dictionary)) {
    const definiciones = Array.isArray(entrada.definiciones) ? entrada.definiciones : [entrada.definicion];
    const clave = normalizeText(lema).trim();
    if (!clave) continue;
    definiciones.forEach((definicion, indice) => {
      if (typeof definicion !== 'string') return;
      const palabras = normalizeText(definicion).match(/[a-z0-9ñü]+/g) || [];
      const partes = clave.match(/[a-z0-9ñü]+/g) || [];
      const coincide = partes.length && palabras.some((_, i) => partes.every((p, j) => palabras[i+j] === p));
      if (coincide) coincidencias.push({lema, numero: indice+1, texto: definicion.replace(/^\s*\d+\s*[.]\s*/, '').replace(/^\s*(?:adj|sus|sust)\s*[.]\s*/i, '')});
    });
  }
  if (preguntaRojo && !preguntaLista) return {
    respuesta: 'Una palabra roja que gira 360° al pulsarla señala que la definición contiene una referencia directa a su propio lema. Es una advertencia de posible definición circular: se usa la palabra que se intenta explicar. El giro es un efecto visual, no un significado gramatical.',
    palabras: coincidencias.map(x => x.lema)
  };
  const detalle = coincidencias.map(x => '«'+x.lema+'» (acepción '+x.numero+'): '+x.texto).join(' | ');
  return {
    respuesta: coincidencias.length
      ? 'Encontré '+coincidencias.length+' acepción(es) que contienen literalmente su propio lema: '+detalle+'. La coincidencia directa puede indicar circularidad; no detecta ciclos indirectos entre distintas entradas.'
      : 'No encontré acepciones que repitan literalmente su propio lema. Esto no descarta circularidades indirectas.',
    palabras: [...new Set(coincidencias.map(x=>x.lema))]
  };
}

function analizarPreguntaDiccionario(pregunta) {
  const texto = limpiarConsulta(pregunta);
  const ayuda = respuesta => ({ respuesta, palabras: [], ejemplos: ejemplosAgente });
  const circularidad = consultarCircularidad(texto);
  if (circularidad) return circularidad;
  if (/(?:^|\s)prop[oó]n\w*(?:\s|$)/i.test(texto) && /(?:^|\s)(?:siguiente\s+)?palabra(?:\s|$)/i.test(texto) && /(?:^|\s)defin(?:ir|icion)(?:\s|$)/i.test(texto)) {
    return proponerPalabraNoDefinida();
  }
  const patronesDefiniciones = consultarPatronesDefiniciones(texto);
  if (patronesDefiniciones) return patronesDefiniciones;
  const explicacionTerminaciones = responderSobreTerminaciones(texto);
  if (explicacionTerminaciones) return explicacionTerminaciones;
  const relaciones = consultarRelaciones(texto);
  if (relaciones) return relaciones;
  const noVerbales = /\bno[ -]+verbales?\b|\bno[ -]+verbal\b|\bno (?:son|sean) verbos?\b|\b(?:excepto|excluyendo|sin incluir) (?:los )?verbos?\b|\bno verbos?\b/.test(texto);
  const categorias = ['verbo', 'adjetivo', 'adverbio', 'sustantivo', 'pronombre', 'articulo'].filter(c =>
    !(noVerbales && c === 'verbo') &&
    new RegExp('\\b' + c + 's?\\b').test(texto));
  const famosos = /\b(famos[oa]s?|celebridad(?:es)?|personas conocidas|personajes publicos)\b/.test(texto) ||
    (/\bquienes\b/.test(texto) && /\b(imagen(?:es)?|fotos?|videos?)\b/.test(texto));
  const cuenta = /\b(cuantos|cuantas|cantidad|numero|total)\b/.test(texto);
  const lista = /\b(cuales|quienes|que|lista|listar|muestra|muestrame|mostrar|dime|dame)\b/.test(texto);
  if (!cuenta && !lista) return ayuda('Puedo contar y listar entradas, conjugaciones, famosos y palabras según su número de definiciones.');
  if (categorias.length > 1) {
    return ayuda('Pregunta por una categoría cada vez: verbos, adjetivos, adverbios, sustantivos, pronombres o artículos.');
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
  if (!categoria && !noVerbales && !definiciones && !/\b(palabras?|entradas?|terminos?|diccionario|imagen(?:es)?|fotos?|videos?|texto)\b/.test(texto)) {
    return ayuda('Prueba una pregunta sobre las palabras de tu diccionario.');
  }
  const palabras = Object.keys(dictionary).filter(palabra => {
    const entrada = dictionary[palabra];
    const clases = listaDeCategorias(entrada);
    if (categoria && !clases.includes(categoria)) return false;
    if (noVerbales && (!clases.length || clases.includes('verbo'))) return false;
    if (categoria === 'sustantivo' && /\bpropios?\b/.test(texto) && !esNombrePropio(palabra, entrada)) return false;
    if (categoria === 'sustantivo' && /\bcomunes?\b/.test(texto) && esNombrePropio(palabra, entrada)) return false;
    if (conjugacion && !normalizeText(palabra).endsWith(conjugacion.terminacion)) return false;
    return cumpleCantidad(numeroDeDefiniciones(entrada), definiciones) &&
      cumpleMedios(entradaTieneImagen(entrada), entradaTieneVideo(entrada), medios);
  }).sort((a, b) => collatorEs.compare(a, b));
  let grupo = categoria ? categoria + (palabras.length === 1 ? '' : 's') : palabras.length === 1 ? 'entrada' : 'entradas';
  if (categoria === 'articulo') grupo = palabras.length === 1 ? 'artículo' : 'artículos';
  if (categoria === 'sustantivo' && /\bpropios?\b/.test(texto)) grupo += ' propios';
  if (categoria === 'sustantivo' && /\bcomunes?\b/.test(texto)) grupo += ' comunes';
  if (noVerbales) grupo += palabras.length === 1 ? ' no verbal' : ' no verbales';
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
  if (categoria === 'sustantivo') {
    resultado.nota = 'Cuento las entradas clasificadas como sustantivos según sus acepciones. Una entrada puede tener también uso adjetivo.';
    if (!/\b(?:propios?|comunes?)\b/.test(texto)) resultado.nota += ' Se incluyen los nombres propios.';
  }
  if (noVerbales) {
    const sinCategoria = Object.values(dictionary).filter(e => !listaDeCategorias(e).length).length;
    if (sinCategoria) resultado.nota = 'Hay ' + sinCategoria + ' entradas sin categoría que no se incluyen en este filtro.';
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
  if (resultado.fuentes) {
    const fuentes = document.createElement('p');
    fuentes.appendChild(document.createTextNode('Consulta: '));
    resultado.fuentes.forEach((fuente, i) => {
      if (i) fuentes.appendChild(document.createTextNode(' · '));
      const a = document.createElement('a');
      a.href = fuente.url;
      a.textContent = fuente.nombre;
      fuentes.appendChild(a);
    });
    contenedor.appendChild(fuentes);
  }
  if (resultado.tipo === 'grupos') {
    const etiquetas = { familia: 'Familia léxica', forma: 'Formas del verbo', tema: 'Tema', pendiente: 'Pendiente' };
    resultado.grupos.forEach(grupo => {
      const detalle = document.createElement('details');
      detalle.open = !!resultado.mostrarLista;
      const titulo = document.createElement('summary');
      titulo.textContent = etiquetas[grupo.tipo] + ': ' + grupo.nombre + ' (' + grupo.palabras.length + ')';
      detalle.appendChild(titulo);
      const motivo = document.createElement('p');
      motivo.textContent = grupo.descripcion;
      detalle.appendChild(motivo);
      const lista = document.createElement('p');
      grupo.palabras.forEach((palabra, i) => {
        if (i) lista.appendChild(document.createTextNode(', '));
        lista.appendChild(enlace(palabra));
      });
      detalle.appendChild(lista);
      contenedor.appendChild(detalle);
    });
  }
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
    } else if (resultado.evidencias) {
      titulo.textContent = 'Ver palabras y ejemplos de sus definiciones (' + cantidad + ')';
      const listado = document.createElement('ul');
      resultado.evidencias.forEach(evidencia => {
        const item = document.createElement('li');
        item.appendChild(enlace(evidencia.palabra));
        item.appendChild(document.createTextNode(': «' + evidencia.definicion + '» (' + evidencia.coincidencias + ' de ' + evidencia.total + ' acepciones cumplen).'));
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
  if (resultado.excepciones?.length) {
    const detalle = document.createElement('details');
    const titulo = document.createElement('summary');
    titulo.textContent = 'Ver excepciones al criterio (' + resultado.excepciones.length + ')';
    detalle.appendChild(titulo);
    const listado = document.createElement('ul');
    resultado.excepciones.forEach(evidencia => {
      const item = document.createElement('li');
      item.appendChild(enlace(evidencia.palabra));
      item.appendChild(document.createTextNode(': «' + evidencia.definicion + '»'));
      listado.appendChild(item);
    });
    detalle.appendChild(listado);
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

// Extensiones independientes: un fallo de carga no sustituye el agente existente.
(function cargarExtensiones() {
  if (typeof document === 'undefined' || !document.head || !document.createElement) return;
  const base = document.currentScript?.src || new URL('js/agente.js', document.baseURI).href;
  function cargar(nombre) {
    return new Promise(resolve => {
      const script = document.createElement('script');
      script.src = new URL(nombre + '?v=20261006-botones-lema', base).href;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.head.appendChild(script);
    });
  }
  (async () => {
    if (await cargar('familias-datos.js')) { await cargar('familias.js'); await cargar('relaciones.js?v=20261009-heuristica'); await cargar('origenes.js'); await cargar('gugol.js?v=20261009-heuristica'); }
    if (await cargar('agente-config.js')) await cargar('agente-abierto.js');
  })();
})();
