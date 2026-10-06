
if ('serviceWorker' in navigator) {
  if (location.protocol === 'https:') {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('service-worker.js')
        .then(function (reg) {
          console.log('[SW] Registrado con éxito:', reg.scope);
        })
        .catch(function (err) {
          console.warn('[SW] Error al registrar:', err);
        });
    });
  } else {
    navigator.serviceWorker.getRegistrations().then(function (regs) {
      regs.forEach(function (r) { r.unregister(); });
      console.log('[SW] Modo local: service worker desactivado y caché limpia.');
    });
    if (window.caches) {
      caches.keys().then(function (keys) {
        keys.forEach(function (k) { caches.delete(k); });
      });
    }
  }
}









const intro = document.getElementById("intro");
const enterButton = document.querySelector(".intro__button");
const music = document.querySelector(".music");
const musicButton = document.querySelector(".header__music");

enterButton.addEventListener("click", () => {
    intro.style.display = "none";
    music.play();
});

musicButton.addEventListener("click", () => {
    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
});

music.addEventListener("play", () => {
    musicButton.setAttribute("data_state", "playing");
    musicButton.setAttribute("aria-label", "Pausar música");
});

music.addEventListener("pause", () => {
    musicButton.setAttribute("data_state", "paused");
    musicButton.setAttribute("aria-label", "Reproducir música");
});

const header = document.querySelector(".header");

function actualizarMusica() {
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const limite = header.offsetHeight - 4.5 * rem - musicButton.offsetHeight - 2 * rem;
    musicButton.classList.toggle("header__music_arriba", window.scrollY >= limite);
}

window.addEventListener("scroll", actualizarMusica, { passive: true });
window.addEventListener("resize", actualizarMusica);
actualizarMusica();

const targetDate = new Date("november 7, 2026 21:00:00").getTime();

const daysElement = document.querySelector(".temporizador__dias");
const hoursElement = document.querySelector(".temporizador__horas");
const minutesElement = document.querySelector(".temporizador__minutos");
const secondsElement = document.querySelector(".temporizador__segundos");

let countdownInterval;

function updateCountdown() {
    const distance = targetDate - Date.now();

    if (distance <= 0) {
        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";
        clearInterval(countdownInterval);
        return;
    }

    const days = Math.floor(distance / 86400000);
    const hours = Math.floor((distance % 86400000) / 3600000);
    const minutes = Math.floor((distance % 3600000) / 60000);
    const seconds = Math.floor((distance % 60000) / 1000);

    daysElement.textContent = String(days).padStart(2, "0");
    hoursElement.textContent = String(hours).padStart(2, "0");
    minutesElement.textContent = String(minutes).padStart(2, "0");
    secondsElement.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
countdownInterval = setInterval(updateCountdown, 1000);

const giftButton = document.querySelector(".regalos__button");
const giftPanel = document.querySelector(".regalos__desplegable");

giftButton.addEventListener("click", () => {
    const open = giftPanel.classList.toggle("regalos__desplegable_abierto");
    giftButton.setAttribute("aria-expanded", open);
});

const copyButton = document.querySelector(".regalos__copiar");
const aliasValue = document.querySelector(".regalos__valor");
let copyTimeout;

copyButton.addEventListener("click", () => {
    navigator.clipboard.writeText(aliasValue.textContent.trim()).then(() => {
        copyButton.textContent = "Copiado";
        clearTimeout(copyTimeout);
        copyTimeout = setTimeout(() => {
            copyButton.textContent = "Toca para copiar alias";
        }, 1500);
    });
});

const WHATSAPP = "542914752200";
const SHEET_URL = "https://script.google.com/macros/s/AKfycbw4-4HCRZSeukt4zBtKMoe2dXp3Md36lovWRs0S6IgfVNiVzoepIPdBO2aR6URimps2mw/exec";

const ALIMENTOS = ["Ninguno", "Celiaco/a", "Vegetariano/a", "Vegano/a", "Sin lactosa", "Diabetico"];

const cantidadInput = document.querySelector(".confirmacion__numero");
const listaInvitados = document.querySelector(".confirmacion__lista");
const enviarButton = document.querySelector(".confirmacion__enviar");

function crearInvitado(numero, datos) {
    const bloque = document.createElement("div");
    bloque.className = "confirmacion__invitado";

    let opciones = "";
    ALIMENTOS.forEach((alimento) => {
        const elegida = datos && datos.alimentacion === alimento ? " selected" : "";
        opciones += '<option value="' + alimento + '"' + elegida + ">" + alimento + "</option>";
    });

    bloque.innerHTML =
        '<h3 class="confirmacion__invitado_titulo">INVITADO ' + numero + "</h3>" +
        '<div class="confirmacion__tarjeta">' +
        '<label class="confirmacion__campo"><span class="confirmacion__campo_texto">NOMBRE Y APELLIDO *</span>' +
        '<input class="confirmacion__nombre" type="text" autocomplete="name"></label>' +
        '<div class="confirmacion__asistencia">' +
        '<button class="confirmacion__pildora" type="button">¡CONFIRMO!</button>' +
        '<button class="confirmacion__pildora" type="button">NO PODRÉ ASISTIR</button>' +
        "</div>" +
        '<label class="confirmacion__campo confirmacion__campo_desplegable"><span class="confirmacion__campo_texto">¿ALGÚN REQUERIMIENTO EN LA ALIMENTACIÓN? *</span>' +
        '<select class="confirmacion__alimentacion">' + opciones + "</select></label>" +
        '<label class="confirmacion__campo"><span class="confirmacion__campo_texto">SUGERÍ TU CANCIÓN</span>' +
        '<input class="confirmacion__cancion" type="text"></label>' +
        '<label class="confirmacion__campo"><span class="confirmacion__campo_texto">COMENTÁ TUS BUENOS DESEOS</span>' +
        '<input class="confirmacion__deseos" type="text"></label>' +
        "</div>";

    if (datos) {
        bloque.querySelector(".confirmacion__nombre").value = datos.nombre;
        bloque.querySelector(".confirmacion__cancion").value = datos.cancion;
        bloque.querySelector(".confirmacion__deseos").value = datos.deseos;
        if (datos.asistencia === 0 || datos.asistencia === 1) {
            bloque.querySelectorAll(".confirmacion__pildora")[datos.asistencia].classList.add("confirmacion__pildora_activa");
        }
    }

    const pildoras = bloque.querySelectorAll(".confirmacion__pildora");
    pildoras.forEach((pildora) => {
        pildora.addEventListener("click", () => {
            pildoras.forEach((otra) => {
                otra.classList.remove("confirmacion__pildora_activa");
                otra.classList.remove("confirmacion__invalido");
            });
            pildora.classList.add("confirmacion__pildora_activa");
        });
    });

    bloque.querySelectorAll("input, select").forEach((campo) => {
        campo.addEventListener("input", () => campo.classList.remove("confirmacion__invalido"));
    });

    return bloque;
}

function leerDatos() {
    const datos = [];
    listaInvitados.querySelectorAll(".confirmacion__invitado").forEach((bloque) => {
        const pildoras = bloque.querySelectorAll(".confirmacion__pildora");
        let asistencia = -1;
        pildoras.forEach((pildora, i) => {
            if (pildora.classList.contains("confirmacion__pildora_activa")) {
                asistencia = i;
            }
        });
        datos.push({
            nombre: bloque.querySelector(".confirmacion__nombre").value.trim(),
            asistencia: asistencia,
            alimentacion: bloque.querySelector(".confirmacion__alimentacion").value,
            cancion: bloque.querySelector(".confirmacion__cancion").value.trim(),
            deseos: bloque.querySelector(".confirmacion__deseos").value.trim()
        });
    });
    return datos;
}

function reconstruir(cantidad) {
    const previos = leerDatos();
    listaInvitados.innerHTML = "";
    for (let i = 1; i <= cantidad; i++) {
        listaInvitados.appendChild(crearInvitado(i, previos[i - 1]));
    }
}

cantidadInput.addEventListener("change", () => {
    reconstruir(parseInt(cantidadInput.value, 10));
});

reconstruir(1);

enviarButton.addEventListener("click", () => {
    const bloques = listaInvitados.querySelectorAll(".confirmacion__invitado");
    const lineas = ["*XV MAITE - Confirmación de asistencia*"];
    const invitados = [];
    let valido = true;
    let primero = null;

    bloques.forEach((bloque, i) => {
        const nombre = bloque.querySelector(".confirmacion__nombre");
        const pildoras = bloque.querySelectorAll(".confirmacion__pildora");
        const asistencia = bloque.querySelector(".confirmacion__pildora_activa");
        const alimentacion = bloque.querySelector(".confirmacion__alimentacion");
        const cancion = bloque.querySelector(".confirmacion__cancion");
        const deseos = bloque.querySelector(".confirmacion__deseos");

        if (nombre.value.trim() === "") {
            nombre.classList.add("confirmacion__invalido");
            valido = false;
            primero = primero || nombre;
        }
        if (!asistencia) {
            pildoras.forEach((pildora) => pildora.classList.add("confirmacion__invalido"));
            valido = false;
            primero = primero || pildoras[0];
        }

        lineas.push("");
        lineas.push("Invitado " + (i + 1) + ": " + nombre.value.trim());
        lineas.push("Asistencia: " + (asistencia ? asistencia.textContent : "Sin responder"));
        lineas.push("Alimentación: " + alimentacion.value);
        if (cancion.value.trim() !== "") {
            lineas.push("Canción: " + cancion.value.trim());
        }
        if (deseos.value.trim() !== "") {
            lineas.push("Deseos: " + deseos.value.trim());
        }
        invitados.push({
            nombre: nombre.value.trim(),
            asistencia: asistencia ? asistencia.textContent : "Sin responder",
            alimentacion: alimentacion.value,
            cancion: cancion.value.trim(),
            deseos: deseos.value.trim()
        });
    });

    if (!valido) {
        primero.focus();
        return;
    }

    window.open("https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(lineas.join("\n")), "_blank");

    fetch(SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ invitados: invitados })
    }).catch(() => {});

    cantidadInput.value = "1";
    reconstruir(1);
});
