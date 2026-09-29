document.addEventListener('DOMContentLoaded', function() {

    function crearContador() {
        if (document.getElementById('contador-diccionario')) return;

        const html = `
        <div id="stats-bar">
  <span><b>Total:</b> <span id="total-count">0</span></span>
  <span><b>Con imagen:</b> <span id="image-count">0</span></span>
  <span><b>Con video:</b> <span id="video-count">0</span></span>
  <span><b>Solo texto:</b> <span id="text-count">0</span></span>
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
