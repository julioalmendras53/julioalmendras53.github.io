document.addEventListener('DOMContentLoaded', function() {

    // Crear el contador azul
    function crearContador() {
        if (document.getElementById('contador-diccionario')) return;

        const html = `
        <div id="contador-diccionario" style="background: linear-gradient(135deg, #1e40af, #3b82f6); color: white; padding: 20px; margin: 20px auto; max-width: 900px; border-radius: 16px; text-align: center; box-shadow: 0 10px 25px rgba(59, 130, 246, 0.4);">
            <h3 style="margin: 0 0 15px 0;">📊 Estadísticas del Diccionario</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 15px;">
                <div><strong>Total:</strong><br><span id="c-total" style="font-size: 2.2em; color:#bae6fd;">0</span></div>
                <div><strong>Con Imagen:</strong><br><span id="c-imagen" style="font-size: 1.9em; color:#bae6fd;">0</span></div>
                <div><strong>Con Video:</strong><br><span id="c-video" style="font-size: 1.9em; color:#bae6fd;">0</span></div>
                <div><strong>Solo Texto:</strong><br><span id="c-texto" style="font-size: 1.9em; color:#bae6fd;">0</span></div>
            </div>
        </div>`;

        document.body.insertAdjacentHTML('afterbegin', html);
    }

    // Contar definiciones
    function actualizarContador() {
        // Buscamos TODOS los bloques grandes de contenido (más genérico)
        const bloques = document.querySelectorAll('div, section, article, main > *');

        let total = 0;
        let conImagen = 0;
        let conVideo = 0;

        bloques.forEach(bloque => {
            const texto = bloque.textContent.trim();
            if (texto.length < 30) return; // Evita contadores falsos

            total++;

            if (bloque.querySelector('img')) conImagen++;
            if (bloque.querySelector('video, iframe, source')) conVideo++;
        });

        const soloTexto = total - conImagen - conVideo;

        // Actualizar
        document.getElementById('c-total').textContent = total;
        document.getElementById('c-imagen').textContent = conImagen;
        document.getElementById('c-video').textContent = conVideo;
        document.getElementById('c-texto').textContent = soloTexto;
    }

    crearContador();
    actualizarContador();

    // Actualizar constantemente mientras desarrollas
    setInterval(actualizarContador, 1500);
});
