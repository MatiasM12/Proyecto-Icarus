const urlC = "http://localhost:3010/actualizarVueloConfirmado"
const urlPE = "http://localhost:3010/actualizarVueloPreEmbarque"
const urlD = "http://localhost:3010/actualizarVueloDespegue"
const urlV = "http://localhost:3010/actualizarEstadoEnVuelo"
const urlA = "http://localhost:3010/actualizarVueloAterrizado"
const urlDe = "http://localhost:3010/actualizarVueloDemorado"
const urlCanc = "http://localhost:3010/actualizarVueloCancelado"
const urlRP = "http://localhost:3010/actualizarReprogramado"
const urlF = "http://localhost:3010/actualizarVueloFinalizado"

const cambiarConf = async (indice) => {

    let vuelo = JSON.parse(localStorage.getItem(indice + ""))

    let usuarioCambioEstado = (localStorage.getItem("usuarioActual"))

    let matricula = vuelo["aeronave"]

    await fetch(urlC, {
        method: 'PUT',
        body: JSON.stringify({
            "idvuelo": vuelo["pv"],
            "username": usuarioCambioEstado
            //"aeronave_matricula_fk" : matricula
        }),
        headers: {
            'Access-Control-Allow-Origin': '*',
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => console.log(response))
}
const cambiarPE = async (indice) => {

    let vuelo = JSON.parse(localStorage.getItem(indice + ""))



    let usuarioCambioEstado = (localStorage.getItem("usuarioActual"))

    console.log(usuarioCambioEstado)

    await fetch(urlPE, {

        method: 'PUT',

        body: JSON.stringify({
            "idvuelo": vuelo["pv"],
            "username": usuarioCambioEstado
        }),


        headers: {

            'Access-Control-Allow-Origin': '*',
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => console.log(response))
}
const cambiarD = async (indice) => {
    let vuelo = JSON.parse(localStorage.getItem(indice + ""))

    let usuarioCambioEstado = (localStorage.getItem("usuarioActual"))

    await fetch(urlD, {

        method: 'PUT',


        body: JSON.stringify({
            "idvuelo": vuelo["pv"],
            "username": usuarioCambioEstado
        }),


        headers: {
            'Access-Control-Allow-Origin': '*',
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => console.log(response))
}
const cambiarV = async (indice) => {

    let usuarioCambioEstado = (localStorage.getItem("usuarioActual"))

    let vuelo = JSON.parse(localStorage.getItem(indice + ""))

    await fetch(urlV, {

        method: 'PUT',

        body: JSON.stringify({
            "idvuelo": vuelo["pv"],
            "username": usuarioCambioEstado
        }),


        headers: {
            'Access-Control-Allow-Origin': '*',
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => console.log(response))
}
const cambiarA = async (indice) => {

    let vuelo = JSON.parse(localStorage.getItem(indice + ""))
    let usuarioCambioEstado = (localStorage.getItem("usuarioActual"))

    await fetch(urlA, {

        method: 'PUT',

        body: JSON.stringify({
            "idvuelo": vuelo["pv"],
            "username": usuarioCambioEstado
        }),


        headers: {
            'Access-Control-Allow-Origin': '*',
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => console.log(response))
}
const cambiarCanc = async (indice) => {

    let vuelo = JSON.parse(localStorage.getItem(indice + ""))
    let textCancelado = document.querySelector(".texto-cancelado").value;

    let usuarioCambioEstado = (localStorage.getItem("usuarioActual"))

    await fetch(urlCanc, {

        method: 'PUT',

        body: JSON.stringify({
            "motivoEstado": textCancelado,
            "idvuelo": vuelo["pv"],
            "username": usuarioCambioEstado

        }),


        headers: {
            'Access-Control-Allow-Origin': '*',
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => {

            let cartel = document.querySelector(".cartel-alerta");
            cartel.style.display = "flex"
            cartel.querySelector(".msj-alerta").textContent = "Usted a ingresado el motivo de demora: " + textCancelado;
            console.log(response)
        })
}
const cambiarDem = async (indice) => {

    let vuelo = JSON.parse(localStorage.getItem(indice + ""))
    let textoEstado = document.querySelector(".texto-demora").value;
    console.log(textoEstado);

    let usuarioCambioEstado = (localStorage.getItem("usuarioActual"))

    await fetch(urlDe, {

        method: 'PUT',

        body: JSON.stringify({
            "motivoEstado": textoEstado,
            "idvuelo": vuelo["pv"],
            "username": usuarioCambioEstado

        }),


        headers: {
            'Access-Control-Allow-Origin': '*',
            "Content-type": "application/json; charset=UTF-8"
        }

    }).then(response => {

        let cartel = document.querySelector(".cartel-alerta");
        cartel.style.display = "flex"
        cartel.querySelector(".msj-alerta").textContent = "Usted a ingresado el motivo de demora: " + textoEstado;
        console.log(response)


    })
}
const cambiarRP = async (indice) => {

    let vuelo = JSON.parse(localStorage.getItem(indice + ""))
    let usuarioCambioEstado = (localStorage.getItem("usuarioActual"))

    await fetch(urlRP, {

        method: 'PUT',

        body: JSON.stringify({
            "idvuelo": vuelo["pv"],
            "username": usuarioCambioEstado
        }),


        headers: {
            'Access-Control-Allow-Origin': '*',
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => console.log(response))
}



const cambiarF = async (indice) => {
    let vuelo = JSON.parse(localStorage.getItem(indice + ""))
    let usuarioCambioEstado = (localStorage.getItem("usuarioActual"))

    let auxbody = {
        "idvuelo": vuelo["pv"],
        "username": usuarioCambioEstado,
        "DestinoTeorico_codiata": vuelo["destino"],
        "fechaaterrizajeestimado": vuelo["fechallegada"],
        "matricula": vuelo["matricula"],
        "OrigenReal_codIATA": document.querySelector(".datos-aterrizado").querySelector(".aeropuertoS-vuelo").value,
        "DestinoReal_codIATA": document.querySelector(".datos-aterrizado").querySelector(".aeropuertoL-vuelo").value,
        "fechaDespegueReal": document.querySelector(".datos-aterrizado").querySelector(".fecha-salida-real").value,
        "horaDespegueReal": document.querySelector(".datos-aterrizado").querySelector(".hora-salida").value,
        "fechaAterrizajeReal": document.querySelector(".datos-aterrizado").querySelector(".fecha-llegada").value,
        "horaAterrizajeReal": document.querySelector(".datos-aterrizado").querySelector(".hora-llegada").value,
        "rutaReal": document.querySelector(".datos-aterrizado").querySelector(".ruta-vuelo").textContent.slice(12),
        "ltscombustibleReal": document.querySelector(".datos-aterrizado").querySelector(".combustible-vuelo").textContent.slice(24),
        "lubricanteReal": document.querySelector(".datos-aterrizado").querySelector(".lubricante-vuelo").textContent.slice(23),
        "kilometrajeReal": document.querySelector(".datos-aterrizado").querySelector(".kilometraje-vuelo").textContent.slice(24),
        "duracionReal": TiempoEntreDias(document.querySelector(".datos-aterrizado").querySelector(".fecha-salida-real").value, document.querySelector(".datos-aterrizado").querySelector(".hora-salida").value, document.querySelector(".datos-aterrizado").querySelector(".fecha-llegada").value, document.querySelector(".datos-aterrizado").querySelector(".hora-llegada").value),
        "pesoCargaDestino": document.querySelector(".datos-aterrizado").querySelector(".pesoCarga-vuelo").value
    };

    await fetch(urlF, {

        method: 'PUT',

        body: JSON.stringify(auxbody),


        headers: {
            'Access-Control-Allow-Origin': '*',
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => console.log(response))
}

function TiempoEntreDias(DiaDespegue, horaDespegue, diaAterrizaje, horaAterrizaje) {
    const dia = new Date(DiaDespegue.slice(0, 10) + " " + horaDespegue)
    const dia2 = new Date(diaAterrizaje.slice(0, 10) + " " + horaAterrizaje)
    console.log(dia)
    console.log(dia2)
    var segundos = (dia2 - dia) / 1000
    if (segundos / 60 % 60 > 10 && segundos / 60 / 60 > 10) {
        return (Number.parseInt(segundos / 60 / 60)) + ":" + segundos / 60 % 60
    }
    else if (segundos / 60 % 60 < 10 && segundos / 60 / 60 < 10) {
        return ("0" + Number.parseInt(segundos / 60 / 60)) + ":0" + segundos / 60 % 60
    }
    else if (segundos / 60 % 60 < 10) {
        return (Number.parseInt(segundos / 60 / 60)) + ":0" + segundos / 60 % 60
    }
    else {
        return ("0" + Number.parseInt(segundos / 60 / 60)) + ":" + segundos / 60 % 60
    }
};

export { cambiarA, cambiarCanc, cambiarConf, cambiarD, cambiarDem, cambiarF, cambiarPE, cambiarRP, cambiarV }
