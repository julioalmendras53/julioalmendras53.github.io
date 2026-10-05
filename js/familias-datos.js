/* Fechas de testimonios consultados: no equivalen al nacimiento de una palabra. */
(function (root) {
  'use strict';
  const registro = (lema, anio, obra) => ({ anio, tipo: 'Registro lexicográfico', detalle: obra + ', según el repertorio histórico de Iedra.', fuente: 'Iedra: ' + lema, url: 'https://iedra.es/palabras/' + encodeURIComponent(lema) });
  const local = { anio: 2026, tipo: 'Registro en este diccionario', detalle: 'Presente en la versión consultada en 2026. Esta fecha no acredita cuándo se creó la palabra.', fuente: 'Versión del diccionario', url: 'https://github.com/julioalmendras53/julioalmendras53.github.io/blob/85f0d974ad65d8f23840b3aaf9a3341c2bd88e35/index.html' };
  const nebrija = 'Nebrija, Vocabulario español-latino (1495)';
  const minsheu = 'Minsheu, Vocabularium Hispanicum Latinum et Anglicum (1617)';
  const casas = 'Casas, Vocabulario de las dos lenguas toscana y castellana (1570)';
  const fechas = {
    caos: registro('caos', 1611, 'Covarrubias, Tesoro de la lengua castellana o española (1611)'),
    'caótico': registro('caótico', 1853, 'Domínguez, Diccionario Nacional (1853)'),
    'caóticamente': { anio: 2010, tipo: 'Testimonio de uso', detalle: 'El Diccionario de americanismos (ASALE, 2010) emplea caóticamente en la acepción VI.1 de barajustar(se). Es un testimonio de uso, no una primera aparición acreditada.', fuente: 'ASALE: Diccionario de americanismos, barajustar(se)', url: 'https://www.asale.org/damer/barajustar' },
    infinito: registro('infinito', 1495, nebrija),
    infinitamente: registro('infinitamente', 1495, nebrija),
    infinidad: registro('infinidad', 1495, nebrija),
    infinitesimal: registro('infinitesimal', 1787, 'Terreros, Diccionario castellano con las voces de ciencias y artes (1787)'),
    infinitotriz: { ...local },
    limite: registro('límite', 1570, casas),
    limitado: registro('limitado', 1604, 'Palet, Diccionario muy copioso de la lengua española y francesa (1604)'),
    ilimitado: registro('ilimitado', 1734, 'Diccionario de autoridades (1734)'),
    eterno: registro('eterno', 1570, casas),
    eternamente: registro('eternamente', 1570, casas),
    indefinido: registro('indefinido', 1617, minsheu),
    unidefinido: { ...local }, bidefinido: { ...local }, tridefinido: { ...local },
    dibujar: registro('dibujar', 1617, minsheu),
    dibujo: registro('dibujo', 1617, minsheu),
    escritor: registro('escritor', 1505, 'Alcalá, Vocabulista arávigo en letra castellana (1505)'),
    escribidor: registro('escribidor', 1791, 'Diccionario de la lengua española (1791)'),
    'matemático': registro('matemático', 1617, minsheu),
    negar: registro('negar', 1495, nebrija),
    'negación': registro('negación', 1495, nebrija),
    poder: registro('poder', 1495, nebrija),
    todopoderoso: registro('todopoderoso', 1817, 'Diccionario de la lengua española (1817)'),
    epoder: { ...local },
    epico: registro('épico', 1611, 'Covarrubias, Tesoro de la lengua castellana o española (1611)'),
    enclitico: registro('enclítico', 1787, 'Terreros, Diccionario castellano con las voces de ciencias y artes (1787)'),
    proclitico: registro('proclítico', 1855, 'Diccionario enciclopédico de la lengua española (1855)'),
    google: { anio: 1997, tipo: 'Registro del nombre', detalle: 'Registro de google.com el 15 de septiembre de 1997, según el relato de David Koller (Stanford).', fuente: 'Stanford: origen del nombre Google', url: 'https://graphics.stanford.edu/~dk/google_name_origin.html' },
    googlear: { anio: 2018, tipo: 'Testimonio de uso', detalle: 'Voz citada por FundéuRAE el 27 de septiembre de 2018. No es una primera aparición acreditada.', fuente: 'FundéuRAE (2018)', url: 'https://www.fundeu.es/recomendacion/buscar-o-consultar-en-google-mejor-que-googlear/' },
    ingoogleable: { anio: 2013, tipo: 'Testimonio en prensa', detalle: 'Voz presente en el título de un artículo de Ecuavisa del 30 de marzo de 2013. No es una primera aparición acreditada.', fuente: 'Ecuavisa (2013)', url: 'https://www.ecuavisa.com/mundo/ser-quotingoogleablequot-bendicion-o-maldicion-20130330-0008.html' }
  };
  const familias = [
    {"nombre":"caos","palabras":["caos","caótico","caóticamente"],"descripcion":"Familia de caos: caos (sustantivo), caótico (adjetivo) y caóticamente (adverbio formado sobre caótica con -mente).","enlaces":[["caos","caótico"],["caótico","caóticamente"]]},
    { nombre: 'infinito', palabras: ['infinito', 'infinitamente', 'infinitotriz', 'infinidad', 'infinitesimal'], descripcion: 'Voces relacionadas por la base infinit-. «Infinitotriz» se incorpora según el uso que le da el autor del diccionario.' },
    { nombre: 'Google', palabras: ['google', 'googlear', 'googleable', 'ingoogleable', 'gugol'], descripcion: 'Google y sus formaciones. Gúgol se añade por el origen del nombre: Google se inspiró en la voz inglesa googol; no deriva de la forma española.', enlaces: [['google', 'googlear'], ['google', 'googleable'], ['googleable', 'ingoogleable'], ['google', 'gugol']] },
    { nombre: 'límite', palabras: ['limite', 'limitado', 'ilimitado'], descripcion: 'Familia de límite y limitar; las dos últimas voces comparten la base limitado.' },
    { nombre: 'eterno', palabras: ['eterno', 'eternamente'], descripcion: 'El adjetivo eterno y su adverbio en -mente.' },
    { nombre: 'definir', palabras: ['indefinido', 'unidefinido', 'bidefinido', 'tridefinido'], descripcion: 'Formaciones sobre definido. Se respetan las voces y los significados propios de este diccionario.' },
    { nombre: 'dibujar', palabras: ['dibujar', 'dibujo'], descripcion: 'La acción de dibujar y el nombre dibujo.' },
    { nombre: 'escribir', palabras: ['escritor', 'escribidor', 'escribir'], descripcion: 'Escritor y escribidor están relacionados con la acción de escribir. Se añade escribir como base de referencia.', enlaces: [['escribir', 'escritor'], ['escribir', 'escribidor']] },
    { nombre: 'matemática', palabras: ['matemática', 'matemático'], descripcion: 'Palabras relacionadas por la base matemátic-.' },
    { nombre: 'negar', palabras: ['negar', 'negación'], descripcion: 'El verbo negar y el nombre negación.' },
    { nombre: 'poder', palabras: ['poder', 'todopoderoso', 'epoder', 'puede', 'pueda'], descripcion: 'Poder y voces relacionadas. Puede y pueda son formas conjugadas, no palabras derivadas independientes.' },
    { nombre: 'épica', palabras: ['epica', 'epico'], descripcion: 'Voces relacionadas por la base épic-.' },
    { nombre: 'clítico', palabras: ['clitico', 'enclitico', 'proclitico'], descripcion: 'La base clítico y las formaciones con en- y pro-.' },
    { nombre: 'recursivo', palabras: ['recursivo', 'recursividad'], descripcion: 'Recursividad es el sustantivo formado sobre recursivo con el sufijo -idad.', enlaces: [['recursivo','recursividad']] },
    { nombre: 'dato', palabras: ['dato', 'metadato'], descripcion: 'Metadato se forma con el elemento meta- y la palabra dato.', enlaces: [['dato','metadato']] },
    { nombre: 'vínculo', palabras: ['vínculo', 'hipervínculo'], descripcion: 'Hipervínculo se forma con hiper- y vínculo.', enlaces: [['vínculo','hipervínculo']] },
    { nombre: 'semántica', palabras: ['semántica', 'semántico'], descripcion: 'Voces de la familia léxica de semántica.' },
    { nombre: 'taxonomía', palabras: ['taxón', 'taxonomía', 'taxonómico'], descripcion: 'Voces relacionadas con la clasificación taxonómica.' },
    { nombre: 'morfología', palabras: ['morfología', 'morfológico'], descripcion: 'Voces de la familia léxica de morfología.' }
  ];
  const nombres = { google: 'Google', gugol: 'gúgol', limite: 'límite', epica: 'épica', epico: 'épico', clitico: 'clítico', enclitico: 'enclítico', proclitico: 'proclítico' };
  function posiciones(palabras, historial = fechas, referencia = new Date().getFullYear()) {
    const conocidas = palabras.filter(p => Number.isInteger(historial[p]?.anio));
    const reciente = Math.max(referencia, ...conocidas.map(p => historial[p].anio));
    const antigua = Math.min(reciente, ...conocidas.map(p => historial[p].anio));
    const amplitud = reciente - antigua || 1;
    return conocidas.map((palabra, i) => {
      const radio = 54 + (reciente - historial[palabra].anio) / amplitud * 84;
      const angulo = -Math.PI / 2 + i * 2 * Math.PI / conocidas.length;
      return { palabra, anio: historial[palabra].anio, radio, x: 210 + Math.cos(angulo) * radio, y: 205 + Math.sin(angulo) * radio };
    });
  }
  const api = { familias, fechas, nombres, posiciones };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.historiaDiccionario = api;
})(typeof window === 'undefined' ? globalThis : window);
