document.addEventListener('DOMContentLoaded', function() {

    function crearContador() {
        if (document.getElementById('contador-diccionario')) return;

        const html = `
        <div id="contador-diccionario" style="background: linear-gradient(135deg, #1e40af, #3b82f6); color: white; padding: 20px; margin: 15px auto; max-width: 900px; border-radius: 16px; text-align: center; box-shadow: 0 10px 25px rgba(59, 130, 246, 0.4);">
            <h3 style="margin: 0 0 15px 0; font-size: 1.3em;">📊 Estadísticas del Diccionario</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 15px;">
                <div><strong>Total:</strong><br><span id="c-total" style="font-size: 2.3em; color:#bae6fd;">0</span></div>
                <div><strong>Con Imagen:</strong><br><span id="c-imagen" style="font-size: 2em; color:#bae6fd;">0</span></div>
                <div><strong>Con Video:</strong><br><span id="c-video" style="font-size: 2em; color:#bae6fd;">0</span></div>
                <div><strong>Solo Texto:</strong><br><span id="c-texto" style="font-size: 2em; color:#bae6fd;">0</span></div>
            </div>
            <small style="margin-top: 10px; opacity: 0.9;">Actualización automática</small>
        </div>`;

        document.body.insertAdjacentHTML('afterbegin', html);
    }

    function actualizarContador() {
        // Accedemos directamente al objeto dictionary que está en el scope global del index.html
        if (typeof dictionary === 'undefined') {
            console.warn("No se encontró el objeto 'dictionary'");
            return;
        }

        let total = Object.keys(dictionary).length;
        let conImagen = 0;
        let conVideo = 0;

        Object.values(dictionary).forEach(entry => {
            if (entry.imagen) conImagen++;
            if (entry.video) conVideo++;
        });

        const soloTexto = total - conImagen - conVideo;

        document.getElementById('c-total').textContent = total;
        document.getElementById('c-imagen').textContent = conImagen;
        document.getElementById('c-video').textContent = conVideo;
        document.getElementById('c-texto').textContent = soloTexto;
    }

    // Iniciar
    crearContador();
    actualizarContador();

    // Actualizar periódicamente (por si se añaden entradas dinámicamente)
    setInterval(actualizarContador, 3000);
});
