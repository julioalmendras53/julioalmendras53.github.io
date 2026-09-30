import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
const require = createRequire(import.meta.url);
const h = require('../js/familias-datos.js');
test('El cuarteto solicitado, infinitesimal y las formaciones de Google están presentes', () => {
  const f = h.familias.find(f => f.nombre === 'infinito');
  for (const p of ['infinito', 'infinitamente', 'infinitotriz', 'infinidad', 'infinitesimal']) assert(f.palabras.includes(p));
  const g = h.familias.find(f => f.nombre === 'Google');
  for (const p of ['google', 'googlear', 'googleable', 'ingoogleable', 'gugol']) assert(g.palabras.includes(p));
  assert.equal(h.familias.length, 12);
});
test('En todas las familias lo más antiguo queda más lejos; lo desconocido queda fuera de la escala', () => {
  for (const f of h.familias) {
    const puntos = h.posiciones(f.palabras, h.fechas, 2026);
    assert.equal(puntos.length, f.palabras.filter(p => h.fechas[p]).length);
    for (const a of puntos) {
      assert(a.x >= 60 && a.x <= 360 && a.y >= 60 && a.y <= 350);
      for (const b of puntos) {
        if (a.anio < b.anio) assert(a.radio > b.radio);
        if (a.anio === b.anio) assert.equal(a.radio, b.radio);
      }
    }
  }
  assert(!h.posiciones(['googleable', 'gugol']).length);
});
test('Toda fecha publicada tiene fuente y tipo; 2026 no se presenta como nacimiento', () => {
  for (const f of Object.values(h.fechas)) {
    assert(Number.isInteger(f.anio)); assert.match(f.url, /^https:\/\//); assert(f.detalle && f.fuente && f.tipo);
    if (f.anio === 2026) assert.match(f.detalle, /no acredita/);
  }
});
test('La conexión desactivada no cambia el agente anterior ni necesita red', () => {
  const anterior = () => 'respuesta actual';
  const ctx = vm.createContext({ window: { configAgenteDiccionario: { endpoint: '' }, responderPreguntaDiccionario: anterior } });
  vm.runInContext(readFileSync(new URL('../js/agente-abierto.js', import.meta.url), 'utf8'), ctx);
  assert.equal(ctx.window.responderPreguntaDiccionario, anterior);
});
