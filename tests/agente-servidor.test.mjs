import test from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { validarDiccionario, consultar } from '../agente-servidor/consultas.mjs';
import { responder, crearServidor } from '../agente-servidor/server.mjs';
const base = { categorias: ['sustantivo'], definiciones: ['Una definición.'], imagen: false, video: false, nombrePropio: false, familias: [], temas: [], personasImagen: [], personasVideo: [], definicionesQue: 0, definicionesOtroVerbo: 0 };
const diccionario = validarDiccionario({ entradas: [
  { ...base, palabra: 'atar', categorias: ['verbo'], definiciones: ['Sujetar con un lazo.'], video: true, definicionesOtroVerbo: 1 },
  { ...base, palabra: 'ajedrez', video: true, personasVideo: ['Magnus Carlsen'] },
  { ...base, palabra: 'inefable', categorias: ['adjetivo'], definiciones: ['Que no se puede expresar.'], definicionesQue: 1 },
  { ...base, palabra: 'inteligencia', imagen: true, personasImagen: ['Terence Tao'] },
  { ...base, palabra: 'bbc', imagen: true, personasImagen: ['Cristiano Ronaldo'] }
] });
const config = { apiKey: 'clave-simulada', model: 'modelo-de-prueba', token: 'acceso-de-prueba-de-mas-de-32-caracteres', origin: 'https://julioalmendras53.github.io' };
const filtro = (campo, operacion, valor) => ({ campo, operacion, valor });
const args = (todos = [], ninguno = [], alguno = [], agruparPor = '') => ({ todos, ninguno, alguno, agruparPor });
const final = { status: 'completed', output: [{ type: 'message', role: 'assistant', content: [{ type: 'output_text', text: JSON.stringify({ respuesta: 'Hay una entrada: atar.', palabras: ['atar', 'inventada'] }) }] }] };
test('Consultas nuevas combinan longitud, contenido y filtros sin perder exactitud', () => {
  assert.deepEqual(consultar(diccionario.entradas, args([filtro('longitud', 'igual', '4')])).palabras, ['atar']);
  assert.deepEqual(consultar(diccionario.entradas, args([filtro('video', 'igual', 'true')], [filtro('categorias', 'igual', 'verbo')])).palabras, ['ajedrez']);
  assert.deepEqual(consultar(diccionario.entradas, args([filtro('definiciones', 'contiene', 'EXPRESAR')])).palabras, ['inefable']);
  assert.equal(consultar(diccionario.entradas, args([filtro('definicionesQue', 'mayor', '0')])).cantidad, 1);
  const personas = consultar(diccionario.entradas, args([], [], [filtro('imagen', 'igual', 'true'), filtro('video', 'igual', 'true')], 'personas'));
  assert.equal(personas.grupos.length, 3);
  assert.equal(personas.cantidad, 4);
  assert.equal(consultar(diccionario.entradas, args([filtro('palabra', 'termina', 'xyz')])).cantidad, 0);
});
test('Campos desconocidos, operadores inválidos y datos duplicados se rechazan', () => {
  assert.throws(() => consultar(diccionario.entradas, args([filtro('__proto__', 'igual', 'x')])));
  assert.throws(() => consultar(diccionario.entradas, args([filtro('imagen', 'igual', 'sí')])));
  assert.throws(() => consultar(diccionario.entradas, args([filtro('longitud', 'contiene', '4')])));
  assert.throws(() => validarDiccionario({ entradas: [{ ...base, palabra: 'x' }, { ...base, palabra: 'x' }] }));
  assert.throws(() => validarDiccionario({ entradas: [{ ...base, palabra: 'x', imagen: 'true' }] }));
});
test('El modelo recibe el cálculo y solo se devuelven referencias existentes', async () => {
  const peticiones = [];
  const fake = async (url, options) => {
    assert.equal(url, 'https://api.openai.com/v1/responses');
    const p = JSON.parse(options.body); peticiones.push(p);
    if (peticiones.length === 1) return Response.json({ status: 'completed', output: [{ type: 'function_call', name: 'consultar_diccionario', call_id: 'consulta-1', arguments: JSON.stringify(args([filtro('longitud', 'igual', '4')])) }] });
    return Response.json(final);
  };
  const r = await responder('¿Qué palabras tienen cuatro letras?', diccionario, config, fake);
  assert.deepEqual(r.palabras, ['atar']);
  assert.equal(peticiones[0].store, false);
  const calculo = JSON.parse(peticiones[1].input.find(i => i.type === 'function_call_output').output);
  assert.equal(calculo.cantidad, 1);
  assert(!JSON.stringify(peticiones).includes(config.apiKey));
});
test('Una respuesta incompleta o un fallo del proveedor no se presenta como respuesta válida', async () => {
  await assert.rejects(responder('?', diccionario, config, async () => Response.json({ status: 'incomplete', output: [] })));
  await assert.rejects(responder('?', diccionario, config, async () => Response.json({ error: 'fallo' }, { status: 401 })));
});
test('Servicio: contraseña, CORS, límite de datos y respuesta sin secretos', async t => {
  let llamadas = 0;
  const server = crearServidor(config, async () => { llamadas++; return Response.json(final); });
  server.listen(0, '127.0.0.1'); await once(server, 'listening');
  t.after(() => { server.closeAllConnections(); server.close(); });
  const url = 'http://127.0.0.1:' + server.address().port + '/ask';
  const headers = { Origin: config.origin, Authorization: 'Bearer ' + config.token, 'Content-Type': 'application/json' };
  const body = JSON.stringify({ pregunta: '¿Cuántas palabras hay?', diccionario });
  assert.equal((await fetch(url, { method: 'POST', headers: { ...headers, Authorization: '' }, body })).status, 401);
  assert.equal((await fetch(url, { method: 'POST', headers: { ...headers, Origin: 'https://otro.ejemplo' }, body })).status, 403);
  assert.equal((await fetch(url, { method: 'POST', headers, body: '{mal JSON' })).status, 400);
  assert.equal((await fetch(url, { method: 'OPTIONS', headers })).status, 204);
  assert.equal((await fetch(url, { method: 'POST', headers, body: 'x'.repeat(300001) })).status, 413);
  const bien = await fetch(url, { method: 'POST', headers, body });
  assert.equal(bien.status, 200); assert.equal(bien.headers.get('access-control-allow-origin'), config.origin);
  const texto = await bien.text(); assert(!texto.includes(config.token)); assert(!texto.includes(config.apiKey));
  assert.equal(llamadas, 1);
});
