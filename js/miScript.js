let cantidadSeleccionada = 0;

let movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];

function guardarMovimientos() {
    localStorage.setItem("movimientos", JSON.stringify(movimientos));
}

function calcularTotal() {
    let total = 0;
    movimientos.forEach(m => {
        if (m.tipo === "deposito") total += m.monto;
        if (m.tipo === "retiro") total -= m.monto;
    });
    return total;
}


function mostrarTotal() {
    const totalDiv = document.getElementById("total");
    if (totalDiv) {
        totalDiv.innerText = "$" + calcularTotal().toLocaleString('es-MX');
    }

}


function mostrarMovimientos() {
    let div = document.getElementById("movimientos");
    if (!div) return; 

    div.innerHTML = "";

   
    [...movimientos].reverse().forEach(m => {
        let item = document.createElement("div");
        item.classList.add("movimiento-item");

        const fecha = new Date(m.fecha || Date.now()); 
        const fechaFormateada = fecha.toLocaleString('es-MX', {
            month: '2-digit', day: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit',
            hour12: true
        }).replace(/,/, ''); // Ej: 11/28/2025 11:49:51 AM

        item.innerHTML = `
            <p><strong>${m.tipo.charAt(0).toUpperCase() + m.tipo.slice(1)}: $${m.monto.toLocaleString('es-MX')}</strong></p>
            <p class="fecha-movimiento">${fechaFormateada}</p>
        `;
        div.appendChild(item);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Si la página actual es movimientos.html, se añaden los listeners
    if (document.getElementById("btnDepositar")) {
        mostrarTotal(); 
        
    }
});




document.addEventListener('DOMContentLoaded', () => {
    // Si la página actual es movimientos.html, se añaden los listeners
    if (document.getElementById("btnDepositar")) {

        mostrarTotal(); 

        // Seleccionar billete
        document.querySelectorAll(".billete").forEach(b => {
            b.addEventListener("click", () => {
                cantidadSeleccionada = Number(b.dataset.valor);
                // Opcional: una forma más sutil de indicar la selección
                document.querySelectorAll(".billete").forEach(el => el.classList.remove("seleccionado"));
                b.classList.add("seleccionado");
                // alert("Seleccionaste $" + cantidadSeleccionada);
            });
        });

        // Depositar
        document.getElementById("btnDepositar").addEventListener("click", () => {
            if (cantidadSeleccionada === 0) {
                alert("Debes seleccionar una cantidad primero.");
                return;
            }

            movimientos.push({
                tipo: "deposito",
                monto: cantidadSeleccionada,
                fecha: new Date().toISOString()
            });
            guardarMovimientos();
            mostrarTotal();
            alert(`Depósito exitoso de $${cantidadSeleccionada}`);
            cantidadSeleccionada = 0;
            document.querySelectorAll(".billete").forEach(el => el.classList.remove("seleccionado"));
        });

        // Retirar
        document.getElementById("btnRetirar").addEventListener("click", () => {
            let retirar;
            try {
                retirar = Number(prompt("Ingresa la cantidad a retirar:"));
            } catch (e) {
                // El usuario presionó cancelar en el prompt
                return;
            }


            if (isNaN(retirar) || retirar <= 0 || !Number.isInteger(retirar)) {
                alert("Cantidad inválida o no es un número entero.");
                return;
            }

            const totalActual = calcularTotal();
            if (retirar > totalActual) {
                alert(`Saldo insuficiente. Tienes $${totalActual}.`);
                return;
            }

            movimientos.push({
                tipo: "retiro",
                monto: retirar,
                fecha: new Date().toISOString()
            });
            guardarMovimientos();
            mostrarTotal();
            alert(`Retiro exitoso de $${retirar}`);
        });
    }

   
    if (document.getElementById("movimientos")) {
        mostrarMovimientos();
    }
});




const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Lógica de validación
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;

        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        let usuarioEncontrado = usuarios.find(u =>
            u.correo === email && u.contrasena === password
        );

        console.log(usuarios, usuarioEncontrado);

        if (usuarioEncontrado) {
            alert('Inicio de sesión exitoso!');
            window.location.href = 'index3.html';
        } else {
            alert('Credenciales incorrectas. (Intenta: user@test.com / 1234)');
        }
    });
}

// Registro
const registroForm = document.getElementById('registroForm');
if (registroForm) {
    registroForm.addEventListener('submit', (e) => {
        e.preventDefault();
        //1. Obtener el registro del formulario
        const nombre = document.getElementById('nombre');
        const correo = document.getElementById('correo');
        const contrasena = document.getElementById('contrasena');

        const Cantidad_Disponible = 0.00; 
        const base = '415231364330'; 

        let usuariosExistentes = JSON.parse(localStorage.getItem("usuarios")) || [];
        let conteoUsuarios = usuariosExistentes.length; //Obtenemos la cantidad de usuarios
        let cuenta = base + String(conteoUsuarios).padStart(4, '0'); //Junta la base y le agrega un numero de cuenta desde el 0000, 0001, etc segùn la cantidad de usuarios
        
        
        let usuario = {"nombre":nombre.value, "correo":correo.value, "contrasena":contrasena.value, "Cuenta": cuenta, "Cantidad_Disponible":Cantidad_Disponible };
        console.log("cuenta",cuenta,"usuario", usuario, nombre, correo, contrasena);
        
         

        
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        usuarios.push(usuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        window.location.href = 'index1.html';
    });
}


// -------------- T A R J E T A   D I G I T A L ----------------- //

// TARJETA VIRTUAL 
const tarjeta = document.querySelector('.flip-card');
tarjeta.addEventListener("click", function() {
    tarjeta.classList.toggle("girada");
});


function generarFolio() {
    let folio = "";
    for (let i = 0; i < 16; i++) {
        folio += Math.floor(Math.random() * 10);
        if (i === 3 || i === 7 || i === 11) folio += " ";
    }
    return folio;
}

// Generar CVV
function generarCVV() {
    return Math.floor(100 + Math.random() * 900); 
}

// Generar fecha de vencimiento
function generarFechaExp() {
    const mes = String(Math.floor(Math.random() * 12) + 1).padStart(2, "0");
    const año = String((new Date().getFullYear() + 3) % 100).padStart(2, "0");
    return `${mes}/${año}`;
}

// Render automático al cargar
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("folio").textContent = generarFolio();
    document.getElementById("cvv").textContent = generarCVV();
    document.getElementById("expira").textContent = generarFechaExp();
});

