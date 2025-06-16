let secuenciaMaquina = [];
let secuenciaUsuario = [];
const COLORES = ['rojo', 'amarillo', 'azul', 'verde'];

document.querySelector('#comenzar').addEventListener('click', function () {
    // la maquina debe elegir un color aleatorio
    manejarSeleccionMaquina();
});

function manejarSeleccionMaquina() {
    const color = elegirColorAleatorio(COLORES);
    secuenciaMaquina.push(color);
    console.log(document.querySelector('.' + color));
    console.log('maquina', color);
    resaltarCuadro(color);
}

const $colores = document.querySelectorAll('.color');
for (let i = 0; i < $colores.length; i++) {
    const $color = $colores[i];
    $color.addEventListener('click', function () {
        const color = this.dataset.color;
        manejarSeleccionUsuario(color);

    })
}

function resaltarCuadro(color) {
    document.querySelector('.' + color).style.opacity = 1;
    setTimeout(() => { document.querySelector('.' + color).style.opacity = 0.5 }, "500");

}

function manejarSeleccionUsuario(color) {
    console.log('usuario', color);
    secuenciaUsuario.push(color);

    if (color !== secuenciaMaquina[secuenciaUsuario.length - 1]) {
        console.log('Perdiste');
        secuenciaMaquina = [];
        secuenciaUsuario = [];
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

