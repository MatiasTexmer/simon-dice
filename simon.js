let secuenciaMaquina = [];
let secuenciaUsuario = [];

const $ronda = document.querySelector('#ronda');
let ronda = 0;
const $estado = document.querySelector('#estado');
const COLORES = ['rojo', 'amarillo', 'azul', 'verde'];
reiniciar();
document.querySelector('#comenzar').addEventListener('click', function () {
    // la maquina debe elegi r un color aleatorio
    manejarSeleccionMaquina();
});

function manejarSeleccionMaquina() {
    actualizarEstado('Turno de la maquina...');
    const color = elegirColorAleatorio(COLORES);
    secuenciaMaquina.push(color);
    console.log('maquina', color);

    incrementarRonda();

    for (let i = 0; i < secuenciaMaquina.length; i++) {
        setTimeout(() => { resaltarCuadro(secuenciaMaquina[i]); }, "1000" * (i + 1));
    }

    setTimeout(function () {
        desbloquearUsuario();
        actualizarEstado('Turno del jugador...');
    }, "1000" * secuenciaMaquina.length)

}


function bloquearUsuario() {
    const $colores = document.querySelectorAll('.color');
    for (let i = 0; i < $colores.length; i++) {
        const $color = $colores[i];
        $color.onclick = function () { };
    }
};

function desbloquearUsuario() {
    const $colores = document.querySelectorAll('.color');
    for (let i = 0; i < $colores.length; i++) {
        const $color = $colores[i];
        $color.onclick = function () {
            const color = this.dataset.color;
            manejarSeleccionUsuario(color);

        }
    }
}


function resaltarCuadro(color) {
    document.querySelector('.' + color).style.opacity = 1;
    setTimeout(() => { document.querySelector('.' + color).style.opacity = 0.5 }, "500");

}

function manejarSeleccionUsuario(color) {
    console.log('usuario', color);
    secuenciaUsuario.push(color);
    resaltarCuadro(color);
    if (color !== secuenciaMaquina[secuenciaUsuario.length - 1]) {
        reiniciar(true);
        return;
    }

    if (secuenciaUsuario.length === secuenciaMaquina.length) {
        secuenciaUsuario = [];
        manejarSeleccionMaquina();
    }
}
function elegirColorAleatorio(colores) {
    const indiceAleatorio = Math.floor(Math.random() * colores.length);
    return colores[indiceAleatorio];
}

function incrementarRonda() {
    $ronda.textContent = ++ronda;

}

function reiniciarRonda() {
    ronda = 0;
    $ronda.textContent = ronda;
}

function actualizarEstado(estado) {
    $estado.textContent = estado;
}

function reiniciar(usuarioPerdio = false) {
    if (usuarioPerdio) {
        actualizarEstado('Perdiste! Toca "Comenzar" para reiniciar el juego.')
    } else {
        actualizarEstado('Toca Comenzar" para iniciar el juego')
    }
    bloquearUsuario();
    secuenciaMaquina = [];
    secuenciaUsuario = [];
    reiniciarRonda();
}