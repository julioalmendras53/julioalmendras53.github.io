document.addEventListener('DOMContentLoaded', function() {
    function tieneVideos(entry) {
        return Boolean(
            entry.video ||
            (entry.videosAcepciones && Object.values(entry.videosAcepciones).some(v => v && v.src))
        );
    }

    function cantidadVideos(entry) {
        let n = entry.video ? 1 : 0;
        if (entry.videosAcepciones) {
            n += Object.values(entry.videosAcepciones).filter(v => v && v.src).length;
        }
        return n;
    }

    function actualizarContador() {
        if (typeof dictionary === 'undefined') {
            console.warn("No se encontró el objeto 'dictionary'");
            return;
        }

        const entries = Object.values(dictionary);
        const total = entries.length;
        const conImagen = entries.filter(entry => entry.imagen).length;
        // La barra cuenta entradas que poseen al menos un video.
        const conVideo = entries.filter(tieneVideos).length;
        const soloTexto = entries.filter(entry => !entry.imagen && !tieneVideos(entry)).length;
        // Se conserva también el total real de archivos de video para futuras estadísticas.
        const totalVideos = entries.reduce((suma, entry) => suma + cantidadVideos(entry), 0);

        document.getElementById('total-count').textContent = total;
        document.getElementById('image-count').textContent = conImagen;
        document.getElementById('video-count').textContent = conVideo;
        document.getElementById('video-count').dataset.totalVideos = totalVideos;
        document.getElementById('text-count').textContent = soloTexto;
    }

    actualizarContador();
    setInterval(actualizarContador, 3000);
});