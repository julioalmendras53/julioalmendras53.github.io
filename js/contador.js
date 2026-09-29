document.addEventListener('DOMContentLoaded', function() {
    function actualizarContador() {
        if (typeof dictionary === 'undefined') {
            console.warn("No se encontró el objeto 'dictionary'");
            return;
        }

        const entries = Object.values(dictionary);
        const total = entries.length;
        const conImagen = entries.filter(entry => entry.imagen).length;
        const conVideo = entries.filter(entry => entry.video).length;
        const soloTexto = entries.filter(entry => !entry.imagen && !entry.video).length;

        document.getElementById('total-count').textContent = total;
        document.getElementById('image-count').textContent = conImagen;
        document.getElementById('video-count').textContent = conVideo;
        document.getElementById('text-count').textContent = soloTexto;
    }

    actualizarContador();
    setInterval(actualizarContador, 3000);
});
