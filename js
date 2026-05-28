// ==================== CONTADOR AZUL AUTOMÁTICO ====================
document.addEventListener('DOMContentLoaded', function() {
    function crearContador() {
        if (document.getElementById('contador-diccionario')) return;

        const contadorHTML = `
            <div id="contador-diccionario" style="background: linear-gradient(135deg, #1e3a8a, #3b82f6); color: white; padding: 18px; border-radius: 12px; margin: 15px 0; text-align: center; box-shadow: 0 8px 16px rgba(30, 58, 138, 0.4); font-family: Arial, sans-serif;">
                <h3 style="margin: 0 0 10px 0; font-size: 1.25em;">📊 Estadísticas del Diccionario</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); gap: 10px;">
                    <div><strong>Total:</strong><br><span id="total" style="font-size: 1.8em; color: #bae6fd;">0</span></div>
                    <div><strong>Con Imagen:</strong><br><span id="imagen" style="font-size: 1.6em; color: #bae6fd;">0</span></div>
                    <div><strong>Con Video:</strong><br><span id="video" style="font-size: 1.6em; color: #bae6fd;">0</span></div>
                    <div><strong>Solo Texto:</strong><br><span id="texto" style="font-size: 1.6em; color: #bae6fd;">0</span></div>
                </div>
                <small style="opacity: 0.9; display: block; margin-top: 8px;">Actualización automática</small>
            </div>
        `;

        document.body.insertAdjacentHTML('afterbegin', contadorHTML);
    }

    function actualizarContador() {
        const secciones = document.querySelectorAll('div, article, section, .palabra, .entry, .definicion');
        let total = 0, conImg = 0, conVid = 0;

        secciones.forEach(sec => {
            const texto = sec.textContent.trim();
            if (texto.length < 5) return; // evita contadores vacíos

            total++;

            if (sec.querySelector('img')) conImg++;
            if (sec.querySelector('video, iframe, source[src*="video"]')) conVid++;
        });

        const soloTexto = total - conImg - conVid;

        const totalEl = document.getElementById('total');
        if (totalEl) {
            totalEl.textContent = total;
            document.getElementById('imagen').textContent = conImg;
            document.getElementById('video').textContent = conVid;
            document.getElementById('texto').textContent = soloTexto;
        }
    }

    // Crear contador
    crearContador();

    // Actualizar cada vez que cambie la página
    actualizarContador();

    // Observador para actualizaciones dinámicas
    const observer = new MutationObserver(actualizarContador);
    observer.observe(document.body, { childList: true, subtree: true });

    // Actualizar cada 2 segundos por si agregas palabras manualmente
    setInterval(actualizarContador, 2000);
});
