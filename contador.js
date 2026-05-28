// CONTADOR AZUL - Versión corregida y más robusta
document.addEventListener('DOMContentLoaded', function () {

    function crearContador() {
        if (document.getElementById('contador-diccionario')) return;

        const html = `
        <div id="contador-diccionario" style="background: linear-gradient(135deg, #1e3a8a, #2563eb); color: white; padding: 20px; margin: 20px auto; max-width: 900px; border-radius: 16px; text-align: center; box-shadow: 0 10px 20px rgba(37, 99, 235, 0.3);">
            <h3 style="margin: 0 0 15px 0; font-size: 1.3em;">📊 Estadísticas del Diccionario</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 15px; font-size: 1.1em;">
                <div><strong>Total de palabras:</strong><br><span id="total" style="font-size: 2em; color: #bae6fd;">0</span></div>
                <div><strong>Con Imagen:</strong><br><span id="con-imagen" style="font-size: 1.8em; color: #bae6fd;">0</span></div>
                <div><strong>Con Video:</strong><br><span id="con-video" style="font-size: 1.8em; color: #bae6fd;">0</span></div>
                <div><strong>Solo Texto:</strong><br><span id="solo-texto" style="font-size: 1.8em; color: #bae6fd;">0</span></div>
            </div>
            <small style="margin-top: 10px; display: block; opacity: 0.9;">Se actualiza automáticamente</small>
        </div>`;

        const mainContent = document.querySelector('main') || document.body;
        mainContent.insertAdjacentHTML('afterbegin', html);
    }

    function contarDefiniciones() {
        // Buscamos las definiciones (ajustado según tu estructura actual)
        const definiciones = document.querySelectorAll('div[style*="background"], .definicion, article, section, div h2, div p');

        let total = 0;
        let conImagen = 0;
        let conVideo = 0;

        definiciones.forEach(el => {
            const text = el.textContent.trim();
            if (text.length < 10) return;

            total++;

            if (el.querySelector('img')) conImagen++;
            if (el.querySelector('video, iframe')) conVideo++;
        });

        const soloTexto = total - conImagen - conVideo;

        // Actualizar números
        document.getElementById('total').textContent = total;
        document.getElementById('con-imagen').textContent = conImagen;
        document.getElementById('con-video').textContent = conVideo;
        document.getElementById('solo-texto').textContent = soloTexto;
    }

    // Iniciar
    crearContador();
    contarDefiniciones();

    // Actualizar cada 3 segundos (útil mientras desarrollas)
    setInterval(contarDefiniciones, 3000);
});
