// Operaciones de lectura sobre una instantánea. Nunca se ejecuta código del modelo.
export const campos = ['palabra', 'categorias', 'definiciones', 'numeroDefiniciones', 'longitud', 'imagen', 'video', 'nombrePropio', 'familias', 'temas', 'personasImagen', 'personasVideo', 'personas', 'definicionesQue', 'definicionesOtroVerbo'];
export const operaciones = ['igual', 'contiene', 'empieza', 'termina', 'mayor', 'menor', 'al_menos', 'como_maximo'];
const normal = s => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const texto = (s, n = 2500) => { if (typeof s !== 'string' || s.length > n) throw new Error('Texto inválido.'); return s; };
function textos(xs, n = 30, largo = 100) {
  if (!Array.isArray(xs) || xs.length > n) throw new Error('Lista inválida.');
  return xs.map(s => texto(s, largo));
}
function numero(n, max = 30) { if (!Number.isInteger(n) || n < 0 || n > max) throw new Error('Número inválido.'); return n; }
export function validarDiccionario(data) {
  if (!data || !Array.isArray(data.entradas) || !data.entradas.length || data.entradas.length > 400) throw new Error('El diccionario debe contener entre 1 y 400 entradas.');
  const vistas = new Set();
  const entradas = data.entradas.map(e => {
    if (!e || typeof e !== 'object') throw new Error('Entrada inválida.');
    const palabra = texto(e.palabra, 100);
    if (!palabra.trim() || vistas.has(palabra)) throw new Error('Lema vacío o duplicado.');
    vistas.add(palabra);
    const definiciones = textos(e.definiciones, 30, 2500);
    const salida = { palabra, definiciones, numeroDefiniciones: definiciones.length, longitud: Array.from(palabra.normalize('NFC')).length };
    for (const c of ['categorias', 'familias', 'temas', 'personasImagen', 'personasVideo']) salida[c] = textos(e[c]);
    for (const c of ['imagen', 'video', 'nombrePropio']) { if (typeof e[c] !== 'boolean') throw new Error('Indicador inválido.'); salida[c] = e[c]; }
    for (const c of ['definicionesQue', 'definicionesOtroVerbo']) salida[c] = numero(e[c], definiciones.length);
    salida.personas = [...new Set([...salida.personasImagen, ...salida.personasVideo])];
    return salida;
  });
  // Historia opcional, reducida a texto; las direcciones son fuentes, no se descargan.
  const historia = { familias: [], fechas: {} };
  if (data.historia) {
    if (!Array.isArray(data.historia.familias) || data.historia.familias.length > 100) throw new Error('Familias inválidas.');
    historia.familias = data.historia.familias.map(f => ({ nombre: texto(f.nombre, 100), descripcion: texto(f.descripcion, 1000), palabras: textos(f.palabras, 100) }));
    const fechas = Object.entries(data.historia.fechas || {});
    if (fechas.length > 400) throw new Error('Demasiadas fechas.');
    for (const [p, f] of fechas) {
      texto(p, 100);
      if (['__proto__', 'constructor', 'prototype'].includes(p)) throw new Error('Lema reservado.');
      const anio = numero(f.anio, 3000);
      const url = texto(f.url, 1500);
      if (!/^https:\/\//.test(url)) throw new Error('Fuente inválida.');
      historia.fechas[p] = { anio, tipo: texto(f.tipo, 100), detalle: texto(f.detalle, 1000), fuente: texto(f.fuente, 200), url };
    }
  }
  return { entradas, historia };
}
function condicionValida(c) {
  if (!c || !campos.includes(c.campo) || !operaciones.includes(c.operacion) || typeof c.valor !== 'string' || c.valor.length > 200) throw new Error('Filtro no admitido.');
  const numericos = ['numeroDefiniciones', 'longitud', 'definicionesQue', 'definicionesOtroVerbo'];
  const booleanos = ['imagen', 'video', 'nombrePropio'];
  if (numericos.includes(c.campo) && (!/^\d+$/.test(c.valor) || !['igual', 'mayor', 'menor', 'al_menos', 'como_maximo'].includes(c.operacion))) throw new Error('Comparación numérica inválida.');
  if (booleanos.includes(c.campo) && (c.operacion !== 'igual' || !['true', 'false'].includes(c.valor))) throw new Error('Comparación booleana inválida.');
  if (!numericos.includes(c.campo) && !booleanos.includes(c.campo) && !['igual', 'contiene', 'empieza', 'termina'].includes(c.operacion)) throw new Error('Comparación textual inválida.');
  return c;
}
function coincide(e, c) {
  const comparacion = v => {
    if (typeof v === 'number') {
      const n = Number(c.valor);
      return ({ igual: () => v === n, mayor: () => v > n, menor: () => v < n, al_menos: () => v >= n, como_maximo: () => v <= n })[c.operacion]();
    }
    if (typeof v === 'boolean') return v === (c.valor === 'true');
    const a = normal(v), b = normal(c.valor);
    return ({ igual: () => a === b, contiene: () => a.includes(b), empieza: () => a.startsWith(b), termina: () => a.endsWith(b) })[c.operacion]();
  };
  return Array.isArray(e[c.campo]) ? e[c.campo].some(comparacion) : comparacion(e[c.campo]);
}
export function consultar(entradas, args) {
  if (!args || !['todos', 'alguno', 'ninguno'].every(k => Array.isArray(args[k]) && args[k].length <= 12)) throw new Error('Consulta inválida.');
  for (const k of ['todos', 'alguno', 'ninguno']) args[k].forEach(condicionValida);
  const agrupar = ['', 'categorias', 'familias', 'temas', 'personas', 'personasImagen', 'personasVideo', 'numeroDefiniciones', 'longitud'];
  if (!agrupar.includes(args.agruparPor)) throw new Error('Agrupación inválida.');
  const seleccion = entradas.filter(e => args.todos.every(c => coincide(e, c)) && (!args.alguno.length || args.alguno.some(c => coincide(e, c))) && !args.ninguno.some(c => coincide(e, c)));
  const grupos = new Map();
  if (args.agruparPor) for (const e of seleccion) {
    const valores = Array.isArray(e[args.agruparPor]) ? e[args.agruparPor] : [e[args.agruparPor]];
    for (const v of new Set(valores)) {
      const clave = normal(v);
      if (!grupos.has(clave)) grupos.set(clave, { nombre: v, palabras: [] });
      grupos.get(clave).palabras.push(e.palabra);
    }
  }
  return { cantidad: seleccion.length, totalDiccionario: entradas.length, palabras: seleccion.map(e => e.palabra).sort((a, b) => a.localeCompare(b, 'es')), grupos: [...grupos.values()].map(g => ({ ...g, cantidad: g.palabras.length })), nota: 'Cuento entradas, no acepciones. Las listas de categorías pueden solaparse. Los filtros textuales ignoran mayúsculas y tildes; en definiciones basta una acepción coincidente.' };
}
const condicion = { type: 'object', properties: { campo: { type: 'string', enum: campos }, operacion: { type: 'string', enum: operaciones }, valor: { type: 'string' } }, required: ['campo', 'operacion', 'valor'], additionalProperties: false };
export const herramienta = {
  type: 'function', name: 'consultar_diccionario', strict: true,
  description: 'Calcula recuentos y listas exactos sobre todas las entradas. Combina todos (AND), alguno (OR) y ninguno (NOT); usa arrays vacíos para omitir. Campos de listas: igual busca un elemento exacto; definiciones se compara por acepción. Valores booleanos: true/false como texto. Para contar personas únicas usa agruparPor personas y cuenta los grupos. Nunca confundir número de entradas con número de grupos. Para letra final usa palabra/termina. Para definiciones iniciales que u otro verbo usa los campos numéricos precalculados por el agente anterior.',
  parameters: { type: 'object', properties: { todos: { type: 'array', items: condicion }, alguno: { type: 'array', items: condicion }, ninguno: { type: 'array', items: condicion }, agruparPor: { type: 'string', enum: ['', 'categorias', 'familias', 'temas', 'personas', 'personasImagen', 'personasVideo', 'numeroDefiniciones', 'longitud'] } }, required: ['todos', 'alguno', 'ninguno', 'agruparPor'], additionalProperties: false }
};
