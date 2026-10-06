const seccionesAnimadas = document.querySelectorAll("#izquierda, #derecha, #arriba, #abajo");

const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add("visible");
            observador.unobserve(entrada.target);
        }
    });
}, { threshold: 0.1 });

seccionesAnimadas.forEach((seccion) => observador.observe(seccion));
