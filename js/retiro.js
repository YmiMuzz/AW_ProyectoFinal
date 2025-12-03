
// --------------  R E T I R O  S I N  T A R J E T A  INDEX4------------------//
let claveRetiro = document.getElementById('claveRetiro');
let codigoSeguridad = document.getElementById('codigoSeguridad');

let campoActivo = null;

// Seleccionar campo activo
function seleccionarCampo(campo) {
    campoActivo = campo;
}

// FECHA ACTUAL
function cargarFechas() {
    const ahora = new Date();

    // Formato
    const opcionesFecha = { day: "2-digit", month: "long", year: "numeric" };
    const opcionesHora = { hour: "2-digit", minute: "2-digit" };

    document.getElementById("fechaActual").innerText =
        ahora.toLocaleDateString("es-MX", opcionesFecha);

    document.getElementById("horaActual").innerText =
        ahora.toLocaleTimeString("es-MX", opcionesHora);

    // Vigencia → 24 horas exactas
    const vigencia = new Date(ahora.getTime() + 24 * 60 * 60 * 1000);

    document.getElementById("fechaVigencia").innerText =
        vigencia.toLocaleDateString("es-MX", opcionesFecha);
}

cargarFechas();



// Pt. para agregar número según el campo activo
function agregarNumero(numero) {
    if (campoActivo === 'clave') {
        if (claveRetiro.value.length < 12) {
            claveRetiro.value += numero;
        }
    } else if (campoActivo === 'seguridad') {
        if (codigoSeguridad.value.length < 4) {
            codigoSeguridad.value += numero;
        }
    }

    actualizarBarra();
    validarCampos();
}

function borrarNumero() {
    if (campoActivo === 'clave') {
        claveRetiro.value = claveRetiro.value.slice(0, -1);
    } else if (campoActivo === 'seguridad') {
        codigoSeguridad.value = codigoSeguridad.value.slice(0, -1);
    }

    actualizarBarra();
    validarCampos();
}

// complementada con "campo activo"
function limpiarCampo() {
    if (campoActivo === 'clave') {
        claveRetiro.value = '';
    } else if (campoActivo === 'seguridad') {
        codigoSeguridad.value = '';
    }

    actualizarBarra();
    validarCampos();
}

function realizarRetiro() {
    const clave = claveRetiro.value.length;
    const pin = codigoSeguridad.value.length;

    if (clave === 12 && pin === 4) {
        alert("Retiro exitoso");
    } else {
        alert("Asegurate de llenar los campos"); //No es necesario porque sigue bloqueado
    }
}


// Pt. que actualiza barras de progreso
function actualizarBarra() {
    let clave = claveRetiro.value.length;
    let pin = codigoSeguridad.value.length;

    // Clave bar
    document.getElementById("progClave").style.width = (clave * 100 / 12) + "%";
    document.getElementById("countClave").textContent = clave + "/12";

    // PIN bar
    document.getElementById("progPin").style.width = (pin * 100 / 4) + "%";
    document.getElementById("countPin").textContent = pin + "/4";
}


//Desbloquea el boton cuando ambos campos estan completos
function validarCampos() {
    const clave = claveRetiro.value.length;
    const pin = codigoSeguridad.value.length;
    const btn = document.getElementById("btnRetirar");

    if (clave === 12 && pin === 4) {
        btn.classList.add("activo");
        btn.disabled = false;
    } else {
        btn.classList.remove("activo");
        btn.disabled = true;
    }
}

