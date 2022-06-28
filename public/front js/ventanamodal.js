//.descripcion-vuelo

import { getAeronave2, getAeronave } from "./naves.js";
import { obtTripulacion } from "./obtTripulacion.js";
import { ocultarBtns } from "./ocultarVentanaEstado.js";
import { obtClima, obtClima2 } from "./obtclima.js";
import { limpiar, pasarATablaAPI, pasarATablaAPIPlanvuelos, pasarNaveAPI, pasarNaveAPIPlanVuelo } from "./pintarElementos.js";
import { checkearAterrizado, checkearCamposConfirmado, checkearCamposProgramado, checkearDemora, checkearPreembarque, checkearReprogramado } from "./checkearCampos.js";
import { cambiarA, cambiarCanc, cambiarConf, cambiarD, cambiarDem, cambiarF, cambiarPE, cambiarRP, cambiarV } from "./cambiarEstadoM.js";
import { obtAeropuerto } from "./obtAeropuerto.js";
import { eliminarMarcadores, ponerPunto } from "./mapa.js";
import { obtenerHistorial } from "./historial.js";
import { limpiarListasReprogramado } from "./reprogramado.js";
import { limpiarListasProgramado } from "./programado.js";




const $ventanaModal = document.querySelector(".descripcion-vuelo");
const $ventanaModalModificar = document.querySelector(".modificar-vuelo")
const $ventanaHistorial = document.querySelector(".historial-vuelo")
const $ventanaModalProgramado = document.querySelector(".container-cambios");
const $ventanaModalConfirmado = document.querySelector(".container-confirmado");
const $ventanaModalPreembarque = document.querySelector(".container-preembarque");
const $ventanaModalDespegado = document.querySelector(".container-despegado");
const $ventanaModalEnVuelo = document.querySelector(".container-envuelo");
const $ventanaModalAterrizado = document.querySelector(".container-aterrizado");
const $ventanaModalDemorado = document.querySelector(".container-demorado");
const $ventanaModalReprogramado = document.querySelector(".container-reprogramado");
const $ventanaModalCancelado = document.querySelector(".container-cancelado");
const $ventanaModalFinalizado = document.querySelector(".container-finalizado");

const $botonesConfirmar = ".icono-confirmado";
const $botonesCancelar = ".icono-cancelado";
const $botonesPreembarque = ".icono-embarque";
const $botonesDespegue = ".icono-despegado";
const $botonesVuelo = ".icono-viaje";
const $botonesAterrizado = ".icono-aterrizado";
const $botonesDemorado = ".icono-demorado";
const $botonesReprogramado = ".icono-reprogramado";
const $botonesGuardar = ".icono-finalizado";
const $titulo = document.querySelector(".header-desc");
const $tituloM = document.querySelector(".titulo-modificacion")

const $iconos = document.querySelector(".icono-estado")
const $titulo2 = document.querySelector(".header-desc2");
const $iconos2 = document.querySelector(".icono-estado2");
const $tituloVuelo = document.querySelector(".header-desc");
const $tituloAeropuertoS = document.querySelector(".r-salida");
const $tituloAeropuertoL = document.querySelector(".r-llegada");
const $tituloFechaS = document.querySelector(".fyh-salida");
const $tituloFechaL = document.querySelector(".fyh-llegada");
const $emergenciaSemaforo = document.querySelector(".semaforo-emergencia");
const $nave = document.querySelector(".modelo-plan");
const $patente = document.querySelector(".patente-plan");
const $clima = document.querySelector(".clima");
const $iconosClima = document.querySelector(".iconos-clima");
const $ventanaCerrar = document.querySelector(".cartel-alerta");


let programadoE = true;
let confirmadoE = true;
let embarcadoE = true;
let despegadoE = true;
let volandoE = true;
let aterrizadoE = true;
let demoradoE = true;
let reprogramadoE = true;
let canceladoE = true;
let finalizadoE = true;

/*Elementos ventana historial*/

const tituloHistorial = document.querySelector(".vuelo-historial");


/*  ELEMENTOS PARA BLOQUEAR EL FONDO */

const $nav = document.querySelector(".funciones")
const $credenciales = document.querySelector(".SFCredencial");
const $iconoLog = document.querySelector(".logout-s");
const $vuelos = document.querySelector(".vuelos");
const $filtroVuelos = document.querySelector(".filtroVuelos");
const $vuelosDinamicos = document.querySelector(".vuelos-dinamicos");

/*  VENTANA MODAL INFO VUELO*/

const mostrarVentanaHistorial = (e, vuelos) => {


    let indice = e.target.getAttribute("index");

    let vuelo = JSON.parse(localStorage.getItem(indice + ""))


    console.log(vuelo["pv"])


    tituloHistorial.textContent = "Historial de Estados -" + vuelo["pv"];

    obtenerHistorial(vuelo["pv"]);
    $ventanaHistorial.style.display = "flex"

    /* PARA EL BLUR */

    $nav.style.filter = "blur(6px)"
    $credenciales.style.filter = "blur(6px)"
    $vuelos.style.filter = "blur(6px)"
    $iconoLog.style.filter = "blur(6px)"
    $filtroVuelos.style.filter = "blur(6px)"
    $vuelosDinamicos.style.filter = "blur(6px)"

    $nav.style.pointerEvents = "none";
    $credenciales.style.pointerEvents = "none";
    $vuelos.style.pointerEvents = "none";
    $iconoLog.style.pointerEvents = "none";
    $filtroVuelos.style.pointerEvents = "none";
    $vuelosDinamicos.style.pointerEvents = "none";


}

const cerrarVentanaHistorial = () => {

    $ventanaHistorial.style.display = "none"

    /* PARA EL BLUR */

    $nav.style.filter = "blur(0px)"
    $credenciales.style.filter = "blur(0px)"
    $vuelos.style.filter = "blur(0px)"
    $iconoLog.style.filter = "blur(0px)"
    $filtroVuelos.style.filter = "blur(0px)"
    $vuelosDinamicos.style.filter = "blur(0px)"

    $nav.style.pointerEvents = "all";
    $credenciales.style.pointerEvents = "all";
    $vuelos.style.pointerEvents = "all";
    $iconoLog.style.pointerEvents = "all";
    $filtroVuelos.style.pointerEvents = "all";
    $vuelosDinamicos.style.pointerEvents = "all";
}



const mostrarVentanaModal = (e, vuelos) => {
    cargarDatos(e, vuelos)
    cargarDatosPV(e, vuelos)
    $ventanaModal.style.display = "flex"

    /* PARA EL BLUR */

    $nav.style.filter = "blur(6px)"
    $credenciales.style.filter = "blur(6px)"
    $vuelos.style.filter = "blur(6px)"
    $iconoLog.style.filter = "blur(6px)"
    $filtroVuelos.style.filter = "blur(6px)"
    $vuelosDinamicos.style.filter = "blur(6px)"

    $nav.style.pointerEvents = "none";
    $credenciales.style.pointerEvents = "none";
    $vuelos.style.pointerEvents = "none";
    $iconoLog.style.pointerEvents = "none";
    $filtroVuelos.style.pointerEvents = "none";
    $vuelosDinamicos.style.pointerEvents = "none";

}
const cerrarVentanaModal = () => {

    $ventanaModal.style.display = "none"
    $nav.style.filter = "blur(0px)"
    $credenciales.style.filter = "blur(0px)"
    $vuelos.style.filter = "blur(0px)"
    $iconoLog.style.filter = "blur(0px)"
    $filtroVuelos.style.filter = "blur(0px)"
    $vuelosDinamicos.style.filter = "blur(0px)"

    $nav.style.pointerEvents = "all";
    $credenciales.style.pointerEvents = "all";
    $vuelos.style.pointerEvents = "all";
    $iconoLog.style.pointerEvents = "all";
    $filtroVuelos.style.pointerEvents = "all";
    $vuelosDinamicos.style.pointerEvents = "all";
}

const cerrarVentanaAlerta = () => {
    $ventanaCerrar.style.display = "none"
}



const limpiarIconos = () => {


    $iconos.querySelector(".icono-programado").style.color = "#333"
    $iconos.querySelector(".icono-programado").style.fontSize = "2rem"
    $iconos.querySelector(".icono-confirmado").style.color = "#333"
    $iconos.querySelector(".icono-confirmado").style.fontSize = "2rem"
    $iconos.querySelector(".icono-embarque").style.color = "#333";
    $iconos.querySelector(".icono-embarque").style.fontSize = "2rem"
    $iconos.querySelector(".icono-viaje").style.color = "#333"
    $iconos.querySelector(".icono-viaje").style.fontSize = "2rem"
    $iconos.querySelector(".icono-despegado").style.color = "#333"
    $iconos.querySelector(".icono-despegado").style.fontSize = "2rem"
    $iconos.querySelector(".icono-aterrizado").style.color = "#333"
    $iconos.querySelector(".icono-aterrizado").style.fontSize = "2rem"
    $iconos.querySelector(".icono-demorado").style.color = "#333"
    $iconos.querySelector(".icono-demorado").style.fontSize = "2rem"
    $iconos.querySelector(".icono-cancelado").style.color = "#333"
    $iconos.querySelector(".icono-cancelado").style.fontSize = "2rem"
    $iconos.querySelector(".icono-reprogramado").style.color = "#333"
    $iconos.querySelector(".icono-reprogramado").style.fontSize = "2rem"
    $iconos.querySelector(".icono-finalizado").style.color = "#333"
    $iconos.querySelector(".icono-finalizado").style.fontSize = "2rem"

    limpiarIconosClima();

}

const limpiarIconosClima = () => {

    $iconosClima.querySelector(".calor").style.display = "none"
    $iconosClima.querySelector(".frio").style.display = "none"
    $iconosClima.querySelector(".medio").style.display = "none"


}


const limpiarIconosModificar = () => {


    $iconos2.querySelector(".icono-programado").style.color = "#333"
    $iconos2.querySelector(".icono-programado").style.fontSize = "2rem"
    $iconos2.querySelector(".icono-confirmado").style.color = "#333"
    $iconos2.querySelector(".icono-confirmado").style.fontSize = "2rem"
    $iconos2.querySelector(".icono-embarque").style.color = "#333";
    $iconos2.querySelector(".icono-embarque").style.fontSize = "2rem"
    $iconos2.querySelector(".icono-viaje").style.color = "#333"
    $iconos2.querySelector(".icono-viaje").style.fontSize = "2rem"
    $iconos2.querySelector(".icono-despegado").style.color = "#333"
    $iconos2.querySelector(".icono-despegado").style.fontSize = "2rem"
    $iconos2.querySelector(".icono-aterrizado").style.color = "#333"
    $iconos2.querySelector(".icono-aterrizado").style.fontSize = "2rem"
    $iconos2.querySelector(".icono-demorado").style.color = "#333"
    $iconos2.querySelector(".icono-demorado").style.fontSize = "2rem"
    $iconos2.querySelector(".icono-cancelado").style.color = "#333"
    $iconos2.querySelector(".icono-cancelado").style.fontSize = "2rem"
    $iconos2.querySelector(".icono-reprogramado").style.color = "#333"
    $iconos2.querySelector(".icono-reprogramado").style.fontSize = "2rem"
    $iconos2.querySelector(".icono-finalizado").style.color = "#333"
    $iconos2.querySelector(".icono-finalizado").style.fontSize = "2rem"

}


const cargarDatos = (e) => {
    let index = e.target.getAttribute("index");
    let vuelo = JSON.parse(localStorage.getItem(index + ""))


    $titulo.querySelector(".des-col2").textContent = vuelo["pv"];
    $titulo.querySelector(".est-act").textContent = "Estado: " + vuelo["estado"];

    limpiarIconos();


    switch (vuelo["estado"]) {

        case "programado":
            $iconos.querySelector(".icono-programado").style.color = "rgb(108 145 183)"
            $iconos.querySelector(".icono-programado").style.fontSize = "4rem"

            break;
        case "confirmado":
            $iconos.querySelector(".icono-confirmado").style.color = "rgb(108 145 183)"
            $iconos.querySelector(".icono-confirmado").style.fontSize = "4rem"
            break;
        case "pre-embarque":
            $iconos.querySelector(".icono-embarque").style.color = "rgb(108 145 183)";
            $iconos.querySelector(".icono-embarque").style.fontSize = "4rem"
            break;
        case "en vuelo":
            $iconos.querySelector(".icono-viaje").style.color = "rgb(108 145 183)"
            $iconos.querySelector(".icono-viaje").style.fontSize = "4rem"
            break;
        case "despegado":
            $iconos.querySelector(".icono-despegado").style.color = "rgb(108 145 183)"
            $iconos.querySelector(".icono-despegado").style.fontSize = "4rem"
            break;
        case "aterrizado":
            $iconos.querySelector(".icono-aterrizado").style.color = "rgb(108 145 183)"
            $iconos.querySelector(".icono-aterrizado").style.fontSize = "4rem"
            break;
        case "demorado":
            $iconos.querySelector(".icono-demorado").style.color = "rgb(108 145 183)"
            $iconos.querySelector(".icono-demorado").style.fontSize = "4rem"
            break;
        case "cancelado":
            $iconos.querySelector(".icono-cancelado").style.color = "rgb(108 145 183)"
            $iconos.querySelector(".icono-cancelado").style.fontSize = "4rem"
            break;
        case "Re-programado":
            $iconos.querySelector(".icono-reprogramado").style.color = "rgb(108 145 183)"
            $iconos.querySelector(".icono-reprogramado").style.fontSize = "4rem"
            break;
        case "finalizado":
            $iconos.querySelector(".icono-finalizado").style.color = "rgb(108 145 183)"
            $iconos.querySelector(".icono-finalizado").style.fontSize = "4rem"
            break;

    }
}


const cargarDatosPV = async (e) => {
    let index = e.target.getAttribute("index");

    let vuelo = JSON.parse(localStorage.getItem(index + ""))

    obtClima2(vuelo["pv"], cargarTemperatura);

    obtTripulacion(pasarATablaAPIPlanvuelos, vuelo["pv"])

    getAeronave2(pasarNaveAPIPlanVuelo, vuelo["pv"]);

    eliminarMarcadores()
    let cod1 = await obtAeropuerto(vuelo["origen"], ponerPunto)
    let cod2 = await obtAeropuerto(vuelo["destino"], ponerPunto)

    $tituloVuelo.querySelector(".des-col2").textContent = vuelo["pv"];


    $tituloAeropuertoS.querySelector(".izq").textContent = "Aeropuerto Salida: " + vuelo["origen"];

    $tituloAeropuertoL.querySelector(".der").textContent = "Aeropuerto Llegada: " + vuelo["destino"];


    $tituloFechaS.querySelector(".fecha-salida").textContent = "Fecha despegue : " + vuelo["fechasalida"];

    $tituloFechaS.querySelector(".hora-salida").textContent = "Hora despegue : " + vuelo["horasalida"];

    $tituloFechaL.querySelector(".fecha-llegada").textContent = "Fecha aterrizaje : " + vuelo["fechallegada"];

    $tituloFechaL.querySelector(".hora-llegada").textContent = "Hora despegue : " + vuelo["horallegada"];

    $tituloFechaS.querySelector(".ruta-estimada").textContent = " Ruta : " + vuelo["ruta"]

    document.querySelector(".izq-tipo-vuelo").textContent = "Tipo de vuelo: " + vuelo["tipovuelo"];

    $emergenciaSemaforo.style.backgroundColor = vuelo["emergencia"];

}


/* VENTANA MODAL MODIFICAR */

const mostrarVentanaModalModificar = (e, iden) => {

    let indiceBTNmod = cargarDatosModificar(e, iden);
    $ventanaModalModificar.style.display = "flex";

    /* PARA EL BLUR */

    $nav.style.filter = "blur(6px)"
    $credenciales.style.filter = "blur(6px)"
    $vuelos.style.filter = "blur(6px)"
    $iconoLog.style.filter = "blur(6px)"
    $filtroVuelos.style.filter = "blur(6px)"
    $vuelosDinamicos.style.filter = "blur(6px)"

    $nav.style.pointerEvents = "none";
    $credenciales.style.pointerEvents = "none";
    $vuelos.style.pointerEvents = "none";
    $iconoLog.style.pointerEvents = "none";
    $filtroVuelos.style.pointerEvents = "none";
    $vuelosDinamicos.style.pointerEvents = "none";

    return indiceBTNmod;


}

const cerrarVentanaModalModificar = () => {
    localStorage.setItem("camposVentanaModificar", JSON.stringify(
        {
            "aeronave": false,
            "tripulacion": false,
            "permisoAeronave": false,
            "permisoTripulacion": false,
            "permisoClima": false,
            "permisoCheckIn": false,
            "insumos": false,
            "controles": false,
            "clima": false,
            "emergencias": false,
            "envioDespacho": false,
            "reprotripulacion": false,
            "repronave": false

        }
    ))

    limpiarListasProgramado();
    limpiarListasReprogramado();

    $ventanaModalModificar.style.display = "none";

    $nav.style.filter = "blur(0px)"
    $credenciales.style.filter = "blur(0px)"
    $vuelos.style.filter = "blur(0px)"
    $iconoLog.style.filter = "blur(0px)"
    $filtroVuelos.style.filter = "blur(0px)"
    $vuelosDinamicos.style.filter = "blur(0px)"

    $nav.style.pointerEvents = "all";
    $credenciales.style.pointerEvents = "all";
    $vuelos.style.pointerEvents = "all";
    $iconoLog.style.pointerEvents = "all";
    $filtroVuelos.style.pointerEvents = "all";
    $vuelosDinamicos.style.pointerEvents = "all";
}


//metodo cuando entra en la ventana modal 


const cargarDatosModificar = (e, iden) => {

    let index = e.target.getAttribute("index");
    let vuelo = JSON.parse(localStorage.getItem(index + ""))


    obtTripulacion(pasarATablaAPI, vuelo["pv"]);

    getAeronave2(pasarNaveAPI, vuelo["pv"]);



    $tituloM.querySelector(".vuelo-mod").textContent = vuelo["pv"];


    document.querySelector(".ruta-modificar").textContent = "Ruta: " + vuelo["ruta"];
    document.querySelector(".titulo-aeropuerto").textContent = "Aeropuerto salida: " + vuelo["origen"];
    document.querySelector(".titulo-aeropuerto-aterrizaje").textContent = "Aeropuerto llegada: " + vuelo["destino"];
    document.querySelector(".fecha-salida-modificar").textContent = vuelo["fechasalida"];
    document.querySelector(".hora-salida-modificar").textContent = vuelo["horasalida"];
    document.querySelector(".fecha-destino-modificar").textContent = vuelo["fechallegada"];
    document.querySelector(".hora-destino-modificar").textContent = vuelo["horallegada"];
    document.querySelector(".tipo-vuelo-modificar").textContent = "Tipo de vuelo: " + vuelo["tipovuelo"];


    limpiarIconosModificar();

    limpiarVentanas();


    switch (vuelo["estado"]) {

        case "programado":
            limpiarProgramado()

            if (iden == "supervisor") {

                $titulo2.querySelector(".des-col3").textContent = "Estado: Programado ";
                $iconos2.querySelector(".icono-programado").style.color = "rgb(108 145 183)";
                $iconos2.querySelector(".icono-programado").style.fontSize = "4rem";
                $iconos2.querySelector(".icono-confirmado").style.color = "rgb(68 207 66)"
                $iconos2.querySelector(".icono-cancelado").style.color = "rgb(68 207 66)"
                $iconos2.querySelector(".icono-reprogramado").style.color = "rgb(68 207 66)"

                programadoE = true;
                confirmadoE = true;
                embarcadoE = false;
                despegadoE = false;
                volandoE = false;
                aterrizadoE = false;
                demoradoE = false;
                reprogramadoE = true;
                canceladoE = true;
                finalizadoE = false;

            } if (iden == "auditor") {

                $titulo2.querySelector(".des-col3").textContent = "Estado: Programado ";
                $iconos2.querySelector(".icono-programado").style.color = "rgb(108 145 183)";
                $iconos2.querySelector(".icono-programado").style.fontSize = "4rem";
                $iconos2.querySelector(".icono-cancelado").style.color = "rgb(68 207 66)"


                programadoE = false;
                confirmadoE = false;
                embarcadoE = false;
                despegadoE = false;
                volandoE = false;
                aterrizadoE = false;
                demoradoE = false;
                reprogramadoE = false;
                canceladoE = true;
                finalizadoE = false;

            }
            if (iden === "auxiliar") {
                $titulo2.querySelector(".des-col3").textContent = "Estado: Programado ";

                $iconos2.querySelector(".icono-programado").style.color = "rgb(108 145 183)";
                $iconos2.querySelector(".icono-programado").style.fontSize = "4rem";

                programadoE = false;
                confirmadoE = false;
                embarcadoE = false;
                despegadoE = false;
                volandoE = false;
                aterrizadoE = false;
                demoradoE = false;
                reprogramadoE = false;
                canceladoE = false;
                finalizadoE = false;

            }

            ponerNone($ventanaModalProgramado, iden, vuelo);

            break;
        case "confirmado":
            limpiarConfirmado()

            if (iden == "supervisor") {
                $titulo2.querySelector(".des-col3").textContent = "Estado: Confirmado ";
                $iconos2.querySelector(".icono-confirmado").style.color = "rgb(108 145 183)"
                $iconos2.querySelector(".icono-confirmado").style.fontSize = "4rem"
                $iconos2.querySelector(".icono-embarque").style.color = "rgb(68 207 66)"
                $iconos2.querySelector(".icono-reprogramado").style.color = "rgb(68 207 66)"
                $iconos2.querySelector(".icono-cancelado").style.color = "rgb(68 207 66)"
                $iconos2.querySelector(".icono-demorado").style.color = "rgb(68 207 66)"

                programadoE = false;
                confirmadoE = true;
                embarcadoE = true;
                despegadoE = false;
                volandoE = false;
                aterrizadoE = false;
                demoradoE = true;
                reprogramadoE = true;
                canceladoE = true;
                finalizadoE = false;


            } if (iden == "auditor") {

                $titulo2.querySelector(".des-col3").textContent = "Estado: Confirmado ";

                $iconos2.querySelector(".icono-confirmado").style.color = "rgb(108 145 183)";
                $iconos2.querySelector(".icono-confirmado").style.fontSize = "4rem";
                $iconos2.querySelector(".icono-cancelado").style.color = "rgb(68 207 66)"

                programadoE = false;
                confirmadoE = false;
                embarcadoE = false;
                despegadoE = false;
                volandoE = false;
                aterrizadoE = false;
                demoradoE = false;
                reprogramadoE = false;
                canceladoE = true;
                finalizadoE = false;


            }
            if (iden === "auxiliar") {
                $titulo2.querySelector(".des-col3").textContent = "Estado: Confirmado ";

                $iconos2.querySelector(".icono-confirmado").style.color = "rgb(108 145 183)";
                $iconos2.querySelector(".icono-confirmado").style.fontSize = "4rem";

                programadoE = false;
                confirmadoE = false;
                embarcadoE = false;
                despegadoE = false;
                volandoE = false;
                aterrizadoE = false;
                demoradoE = false;
                reprogramadoE = false;
                canceladoE = false;
                finalizadoE = false;

            }
            ponerNone($ventanaModalConfirmado, iden, vuelo);
            break;
        case "pre-embarque":
            limpiarPreEmbarque()
            if (iden == "supervisor") {
                $titulo2.querySelector(".des-col3").textContent = "Estado: Pre-Embarque ";
                $iconos2.querySelector(".icono-embarque").style.color = "rgb(108 145 183)";
                $iconos2.querySelector(".icono-embarque").style.fontSize = "4rem";
                $iconos2.querySelector(".icono-cancelado").style.color = "rgb(68 207 66)"
                $iconos2.querySelector(".icono-reprogramado").style.color = "rgb(68 207 66)"
                $iconos2.querySelector(".icono-demorado").style.color = "rgb(68 207 66)"
                $iconos2.querySelector(".icono-despegado").style.color = "rgb(68 207 66)"

                programadoE = false;
                confirmadoE = false;
                embarcadoE = true;
                despegadoE = true;
                volandoE = false;
                aterrizadoE = false;
                demoradoE = true;
                reprogramadoE = true;
                canceladoE = true;
                finalizadoE = false;
            } if (iden === "auditor") {

                $titulo2.querySelector(".des-col3").textContent = "Estado: Pre-Embarque ";
                $iconos2.querySelector(".icono-embarque").style.color = "rgb(108 145 183)";
                $iconos2.querySelector(".icono-embarque").style.fontSize = "4rem";
                $iconos2.querySelector(".icono-cancelado").style.color = "rgb(68 207 66)"

                programadoE = false;
                confirmadoE = false;
                embarcadoE = false;
                despegadoE = false;
                volandoE = false;
                aterrizadoE = false;
                demoradoE = false;
                reprogramadoE = false;
                canceladoE = true;
                finalizadoE = false;

            }
            if (iden === "auxiliar") {
                $titulo2.querySelector(".des-col3").textContent = "Estado: Pre-Embarque ";
                $iconos2.querySelector(".icono-embarque").style.color = "rgb(108 145 183)";
                $iconos2.querySelector(".icono-embarque").style.fontSize = "4rem";

                programadoE = false;
                confirmadoE = false;
                embarcadoE = false;
                despegadoE = false;
                volandoE = false;
                aterrizadoE = false;
                demoradoE = false;
                reprogramadoE = false;
                canceladoE = false;
                finalizadoE = false;

            }

            ponerNone($ventanaModalPreembarque, iden, vuelo);
            break;
        case "en vuelo":
            if (iden == "supervisor") {
                $titulo2.querySelector(".des-col3").textContent = "Estado: En Vuelo ";

                $iconos2.querySelector(".icono-viaje").style.color = "rgb(108 145 183)"
                $iconos2.querySelector(".icono-viaje").style.fontSize = "4rem"
                $iconos2.querySelector(".icono-aterrizado").style.color = "rgb(68 207 66)"

                programadoE = false;
                confirmadoE = false;
                embarcadoE = false;
                despegadoE = false;
                volandoE = false;
                aterrizadoE = true;
                demoradoE = false;
                reprogramadoE = false;
                canceladoE = false;
                finalizadoE = false;
            }
            if (iden === "auditor" || iden === "auxiliar") {
                $titulo2.querySelector(".des-col3").textContent = "Estado: En Vuelo ";

                $iconos2.querySelector(".icono-viaje").style.color = "rgb(108 145 183)"
                $iconos2.querySelector(".icono-viaje").style.fontSize = "4rem"

                programadoE = false;
                confirmadoE = false;
                embarcadoE = false;
                despegadoE = false;
                volandoE = false;
                aterrizadoE = false;
                demoradoE = false;
                reprogramadoE = false;
                canceladoE = false;
                finalizadoE = false;

            }

            ponerNone($ventanaModalEnVuelo, iden, vuelo);
            break;
        case "despegado":

            if (iden == "supervisor") {
                $titulo2.querySelector(".des-col3").textContent = "Estado: Despegado ";

                $iconos2.querySelector(".icono-despegado").style.color = "rgb(108 145 183)";
                $iconos2.querySelector(".icono-despegado").style.fontSize = "4rem";
                $iconos2.querySelector(".icono-viaje").style.color = "rgb(68 207 66)";

                programadoE = false;
                confirmadoE = false;
                embarcadoE = false;
                despegadoE = false;
                volandoE = true;
                aterrizadoE = false;
                demoradoE = false;
                reprogramadoE = false;
                canceladoE = false;
                finalizadoE = false;

            }
            if (iden === "auditor" || iden === "auxiliar") {
                $titulo2.querySelector(".des-col3").textContent = "Estado: Despegado ";

                $iconos2.querySelector(".icono-despegado").style.color = "rgb(108 145 183)";
                $iconos2.querySelector(".icono-despegado").style.fontSize = "4rem";
                programadoE = false;
                confirmadoE = false;
                embarcadoE = false;
                despegadoE = false;
                volandoE = false;
                aterrizadoE = false;
                demoradoE = false;
                reprogramadoE = false;
                canceladoE = false;
                finalizadoE = false;

            }

            ponerNone($ventanaModalDespegado, iden, vuelo);
            break;
        case "aterrizado":

            limpiarAterrizado(vuelo);
            if (iden === "supervisor" || iden === "auxiliar") {

                $titulo2.querySelector(".des-col3").textContent = "Estado: Aterrizado ";

                $iconos2.querySelector(".icono-aterrizado").style.color = "rgb(108 145 183)"
                $iconos2.querySelector(".icono-aterrizado").style.fontSize = "4rem"
                $iconos2.querySelector(".icono-finalizado").style.color = "rgb(68 207 66)"

                programadoE = false;
                confirmadoE = false;
                embarcadoE = false;
                despegadoE = false;
                volandoE = false;
                aterrizadoE = false;
                demoradoE = false;
                reprogramadoE = false;
                canceladoE = false;
                finalizadoE = true;
            }
            if (iden === "auditor") {
                $titulo2.querySelector(".des-col3").textContent = "Estado: Aterrizado ";

                $iconos2.querySelector(".icono-aterrizado").style.color = "rgb(108 145 183)"
                $iconos2.querySelector(".icono-aterrizado").style.fontSize = "4rem"

                programadoE = false;
                confirmadoE = false;
                embarcadoE = false;
                despegadoE = false;
                volandoE = false;
                aterrizadoE = false;
                demoradoE = false;
                reprogramadoE = false;
                canceladoE = false;
                finalizadoE = false;

            }

            ponerNone($ventanaModalAterrizado, iden, vuelo);
            break;
        case "demorado":
            limpiarDemorado()
            if (vuelo["motivoestado"] != "") {
                document.querySelector(".texto-demora").value = vuelo["motivoestado"];
            }


            if (iden === "supervisor") {
                $titulo2.querySelector(".des-col3").textContent = "Estado: Demorado ";

                $iconos2.querySelector(".icono-demorado").style.color = "rgb(108 145 183)"
                $iconos2.querySelector(".icono-demorado").style.fontSize = "4rem"
                $iconos2.querySelector(".icono-confirmado").style.color = "rgb(68 207 66)"
                $iconos2.querySelector(".icono-reprogramado").style.color = "rgb(68 207 66)"
                $iconos2.querySelector(".icono-cancelado").style.color = "rgb(68 207 66)"

                programadoE = false;
                confirmadoE = true;
                embarcadoE = false;
                despegadoE = false;
                volandoE = false;
                aterrizadoE = false;
                demoradoE = false;
                reprogramadoE = true;
                canceladoE = true;
                finalizadoE = false;

            }
            if (iden === "auditor") {
                $titulo2.querySelector(".des-col3").textContent = "Estado: Demorado ";

                $iconos2.querySelector(".icono-demorado").style.color = "rgb(108 145 183)"
                $iconos2.querySelector(".icono-demorado").style.fontSize = "4rem"
                $iconos2.querySelector(".icono-cancelado").style.color = "rgb(68 207 66)"
                programadoE = false;
                confirmadoE = false;
                embarcadoE = false;
                despegadoE = false;
                volandoE = false;
                aterrizadoE = false;
                demoradoE = false;
                reprogramadoE = false;
                canceladoE = true;
                finalizadoE = false;

            }
            if (iden === "auxiliar") {
                $titulo2.querySelector(".des-col3").textContent = "Estado: Demorado ";

                $iconos2.querySelector(".icono-demorado").style.color = "rgb(108 145 183)"
                $iconos2.querySelector(".icono-demorado").style.fontSize = "4rem"
                programadoE = false;
                confirmadoE = false;
                embarcadoE = false;
                despegadoE = false;
                volandoE = false;
                aterrizadoE = false;
                demoradoE = false;
                reprogramadoE = false;
                canceladoE = false;
                finalizadoE = false;

            }


            ponerNone($ventanaModalDemorado, iden, vuelo);
            break;


        case "cancelado":
            limpiarCancelado()
            if (vuelo["motivoestado"] != "") {
                document.querySelector(".texto-cancelado").value = vuelo["motivoestado"];
            }

            if (iden === "supervisor" || iden === "auditor") {
                console.log(" entre con " + iden)
                $titulo2.querySelector(".des-col3").textContent = "Estado: Cancelado ";

                $iconos2.querySelector(".icono-cancelado").style.color = "rgb(108 145 183)"
                $iconos2.querySelector(".icono-cancelado").style.fontSize = "4rem"

                programadoE = false;
                confirmadoE = false;
                embarcadoE = false;
                despegadoE = false;
                volandoE = false;
                aterrizadoE = false;
                demoradoE = false;
                reprogramadoE = false;
                canceladoE = true;
                finalizadoE = false;

            }
            if (iden === "auxiliar") {
                $titulo2.querySelector(".des-col3").textContent = "Estado: Cancelado ";

                $iconos2.querySelector(".icono-cancelado").style.color = "rgb(108 145 183)"
                $iconos2.querySelector(".icono-cancelado").style.fontSize = "4rem"
                programadoE = false;
                confirmadoE = false;
                embarcadoE = false;
                despegadoE = false;
                volandoE = false;
                aterrizadoE = false;
                demoradoE = false;
                reprogramadoE = false;
                canceladoE = false;
                finalizadoE = false;

            }

            ponerNone($ventanaModalCancelado, iden, vuelo);
            break;
        case "Re-programado":
            limpiarReprogramado()
            if (iden === "supervisor") {
                $titulo2.querySelector(".des-col3").textContent = "Estado: Re-Programado ";

                $iconos2.querySelector(".icono-reprogramado").style.color = "rgb(108 145 183)"
                $iconos2.querySelector(".icono-reprogramado").style.fontSize = "4rem"
                $iconos2.querySelector(".icono-cancelado").style.color = "rgb(68 207 66)"
                $iconos2.querySelector(".icono-confirmado").style.color = "rgb(68 207 66)"

                programadoE = false;
                confirmadoE = true;
                embarcadoE = false;
                despegadoE = false;
                volandoE = false;
                aterrizadoE = false;
                demoradoE = false;
                reprogramadoE = false;
                canceladoE = true;
                finalizadoE = false;

            }
            if (iden === "auditor") {
                $titulo2.querySelector(".des-col3").textContent = "Estado: Re-Programado ";

                $iconos2.querySelector(".icono-reprogramado").style.color = "rgb(108 145 183)"
                $iconos2.querySelector(".icono-reprogramado").style.fontSize = "4rem"
                $iconos2.querySelector(".icono-cancelado").style.color = "rgb(68 207 66)"

                programadoE = false;
                confirmadoE = false;
                embarcadoE = false;
                despegadoE = false;
                volandoE = false;
                aterrizadoE = false;
                demoradoE = false;
                reprogramadoE = false;
                canceladoE = true;
                finalizadoE = false;


            }
            if (iden === "auxiliar") {
                $titulo2.querySelector(".des-col3").textContent = "Estado: Re-Programado ";

                $iconos2.querySelector(".icono-reprogramado").style.color = "rgb(108 145 183)"
                $iconos2.querySelector(".icono-reprogramado").style.fontSize = "4rem"

                programadoE = false;
                confirmadoE = false;
                embarcadoE = false;
                despegadoE = false;
                volandoE = false;
                aterrizadoE = false;
                demoradoE = false;
                reprogramadoE = false;
                canceladoE = false;
                finalizadoE = false;


            }



            ponerNone($ventanaModalReprogramado, iden, vuelo);
            break;

        case "finalizado":
            if (iden === "supervisor") {
                $titulo2.querySelector(".des-col3").textContent = "Estado: Finalizado ";
                $iconos2.querySelector(".icono-finalizado").style.color = "rgb(108 145 183)"
                $iconos2.querySelector(".icono-finalizado").style.fontSize = "4rem"

                programadoE = false;
                confirmadoE = false;
                embarcadoE = false;
                despegadoE = false;
                volandoE = false;
                aterrizadoE = false;
                demoradoE = false;
                reprogramadoE = false;
                canceladoE = false;
                finalizadoE = false;

            }
            if (iden === "auxiliar" || iden === "auditor") {
                $titulo2.querySelector(".des-col3").textContent = "Estado: Finalizado ";
                $iconos2.querySelector(".icono-finalizado").style.color = "rgb(108 145 183)"
                $iconos2.querySelector(".icono-finalizado").style.fontSize = "4rem"

                programadoE = false;
                confirmadoE = false;
                embarcadoE = false;
                despegadoE = false;
                volandoE = false;
                aterrizadoE = false;
                demoradoE = false;
                reprogramadoE = false;
                canceladoE = false;
                finalizadoE = false;


            }

            ponerNone($ventanaModalFinalizado, iden, vuelo);
            break;

    }

    return index;
}





const cargarTemperatura = (vuelo) => {


    try {

        $clima.querySelector(".temperatura").textContent = vuelo[0]["gradostemperaturadestino"] + "°";


        $clima.querySelector(".caracteristicas").textContent = vuelo[0]["climadestino"];

        cargarIconosTemperatura(vuelo[0]["gradostemperaturadestino"]);


    }
    catch (err) {

        $clima.querySelector(".temperatura").textContent = "No se cargaron datos";


        $clima.querySelector(".caracteristicas").textContent = "Clima aún no calculado.";

    }


}

const cargarIconosTemperatura = (temp) => {



    if (temp => 30) {
        limpiarIconosClima()
        $iconosClima.querySelector(".calor").style.display = "flex";
        $iconosClima.querySelector(".calor").style.color = "red";
        $iconosClima.querySelector(".calor").style.fontSize = "3rem";

    }

    if (temp < 30 && temp > 10) {
        limpiarIconosClima()
        $iconosClima.querySelector(".medio").style.display = "flex";
        $iconosClima.querySelector(".medio").style.color = "orange";
        $iconosClima.querySelector(".medio").style.fontSize = "3rem";
    }
    if (temp < 10) {
        limpiarIconosClima()
        $iconosClima.querySelector(".frio").style.display = "flex";
        $iconosClima.querySelector(".frio").style.color = "blue";
        $iconosClima.querySelector(".frio").style.fontSize = "3rem";
    }


}



const mostrarVentanaEstado = (e, iden, indice) => {

    let boton = e.target;

    let vuelo = JSON.parse(localStorage.getItem(indice + ""))


    if (e.target.matches($botonesConfirmar) && confirmadoE && iden === "supervisor") {

        if (checkearCamposProgramado() || checkearDemora(vuelo["motivoestado"]) || checkearReprogramado()) {

            cambiarConf(indice);

            cambiarASiguienteEstado($ventanaModalConfirmado);
            limpiarConfirmado();

            $titulo2.querySelector(".des-col3").textContent = "Estado: Confirmado ";
            $iconos2.querySelector(".icono-confirmado").style.color = "rgb(108 145 183)"
            $iconos2.querySelector(".icono-confirmado").style.fontSize = "4rem"
            $iconos2.querySelector(".icono-embarque").style.color = "rgb(68 207 66)"
            $iconos2.querySelector(".icono-reprogramado").style.color = "rgb(68 207 66)"
            $iconos2.querySelector(".icono-cancelado").style.color = "rgb(68 207 66)"
            $iconos2.querySelector(".icono-demorado").style.color = "rgb(68 207 66)"

            programadoE = false;
            confirmadoE = false;
            embarcadoE = true;
            despegadoE = false;
            volandoE = false;
            aterrizadoE = false;
            demoradoE = true;
            reprogramadoE = true;
            canceladoE = true;
            finalizadoE = false;
        }




    }

    if (e.target.matches($botonesCancelar) && canceladoE && (iden === "supervisor" || iden === "auditor")) {

        //arreglar esta cosa para dsps

        cambiarASiguienteEstado($ventanaModalCancelado);
        limpiarCancelado()
        $titulo2.querySelector(".des-col3").textContent = "Estado: Cancelado ";
        $iconos2.querySelector(".icono-cancelado").style.color = "rgb(108 145 183)"
        $iconos2.querySelector(".icono-cancelado").style.fontSize = "4rem"


        programadoE = false;
        confirmadoE = false;
        embarcadoE = false;
        despegadoE = false;
        volandoE = false;
        aterrizadoE = false;
        demoradoE = false;
        reprogramadoE = false;
        canceladoE = false;
        finalizadoE = false;


    }

    if (e.target.matches($botonesDemorado) && demoradoE && iden === "supervisor") {

        //cambiarDem(indice);

        cambiarASiguienteEstado($ventanaModalDemorado);
        limpiarDemorado()
        $titulo2.querySelector(".des-col3").textContent = "Estado: Demorado ";
        $iconos2.querySelector(".icono-demorado").style.color = "rgb(108 145 183)"
        $iconos2.querySelector(".icono-demorado").style.fontSize = "4rem"
        $iconos2.querySelector(".icono-confirmado").style.color = "rgb(68 207 66)"
        $iconos2.querySelector(".icono-reprogramado").style.color = "rgb(68 207 66)"
        $iconos2.querySelector(".icono-cancelado").style.color = "rgb(68 207 66)"

        programadoE = false;
        confirmadoE = true;
        embarcadoE = false;
        despegadoE = false;
        volandoE = false;
        aterrizadoE = false;
        demoradoE = false;
        reprogramadoE = true;
        canceladoE = true;
        finalizadoE = false;

    }

    if (e.target.matches($botonesReprogramado) && reprogramadoE && iden === "supervisor") {

        cambiarRP(indice);

        cambiarASiguienteEstado($ventanaModalReprogramado);
        limpiarReprogramado()
        $titulo2.querySelector(".des-col3").textContent = "Estado: Re-Programado ";
        $iconos2.querySelector(".icono-reprogramado").style.color = "rgb(108 145 183)"
        $iconos2.querySelector(".icono-reprogramado").style.fontSize = "4rem"
        $iconos2.querySelector(".icono-cancelado").style.color = "rgb(68 207 66)"
        $iconos2.querySelector(".icono-confirmado").style.color = "rgb(68 207 66)"




        programadoE = false;
        confirmadoE = true;
        embarcadoE = false;
        despegadoE = false;
        volandoE = false;
        aterrizadoE = false;
        demoradoE = false;
        reprogramadoE = false;
        canceladoE = true;
        finalizadoE = false;

    }

    if (e.target.matches($botonesPreembarque) && embarcadoE && iden === "supervisor") {

        console.log(checkearCamposConfirmado())

        if (checkearCamposConfirmado()) {

            cambiarPE(indice)
            cambiarASiguienteEstado($ventanaModalPreembarque);
            limpiarPreEmbarque()
            $titulo2.querySelector(".des-col3").textContent = "Estado: Pre-Embarque ";
            $iconos2.querySelector(".icono-embarque").style.color = "rgb(108 145 183)";
            $iconos2.querySelector(".icono-embarque").style.fontSize = "4rem";
            $iconos2.querySelector(".icono-cancelado").style.color = "rgb(68 207 66)"
            $iconos2.querySelector(".icono-reprogramado").style.color = "rgb(68 207 66)"
            $iconos2.querySelector(".icono-demorado").style.color = "rgb(68 207 66)"
            $iconos2.querySelector(".icono-despegado").style.color = "rgb(68 207 66)"


            programadoE = false;
            confirmadoE = false;
            embarcadoE = false;
            despegadoE = true;
            volandoE = false;
            aterrizadoE = false;
            demoradoE = true;
            reprogramadoE = true;
            canceladoE = true;
            finalizadoE = false;
        }

    }

    if (e.target.matches($botonesDespegue) && despegadoE && iden === "supervisor") {

        console.log("preembarque check : " + checkearPreembarque())

        if (checkearPreembarque()) {
            cambiarD(indice)
            cambiarASiguienteEstado($ventanaModalDespegado);
            $titulo2.querySelector(".des-col3").textContent = "Estado: Despegado ";
            $iconos2.querySelector(".icono-despegado").style.color = "rgb(108 145 183)";
            $iconos2.querySelector(".icono-despegado").style.fontSize = "4rem";
            $iconos2.querySelector(".icono-viaje").style.color = "rgb(68 207 66)";


            programadoE = false;
            confirmadoE = false;
            embarcadoE = false;
            despegadoE = false;
            volandoE = true;
            aterrizadoE = false;
            demoradoE = false;
            reprogramadoE = false;
            canceladoE = false;
            finalizadoE = false;
        }
    }

    if (e.target.matches($botonesVuelo) && volandoE && iden === "supervisor") {

        cambiarV(indice);

        cambiarASiguienteEstado($ventanaModalEnVuelo);
        $titulo2.querySelector(".des-col3").textContent = "Estado: En Vuelo ";
        $iconos2.querySelector(".icono-viaje").style.color = "rgb(108 145 183)"
        $iconos2.querySelector(".icono-viaje").style.fontSize = "4rem"
        $iconos2.querySelector(".icono-aterrizado").style.color = "rgb(68 207 66)"


        programadoE = false;
        confirmadoE = false;
        embarcadoE = false;
        despegadoE = false;
        volandoE = false;
        aterrizadoE = true;
        demoradoE = false;
        reprogramadoE = false;
        canceladoE = false;
        finalizadoE = false;


    }

    if (e.target.matches($botonesAterrizado) && aterrizadoE && iden === "supervisor") {

        cambiarA(indice);

        cambiarASiguienteEstado($ventanaModalAterrizado);
        limpiarAterrizado(vuelo);
        $titulo2.querySelector(".des-col3").textContent = "Estado: Aterrizado ";
        $iconos2.querySelector(".icono-aterrizado").style.color = "rgb(108 145 183)"
        $iconos2.querySelector(".icono-aterrizado").style.fontSize = "4rem"
        $iconos2.querySelector(".icono-finalizado").style.color = "rgb(68 207 66)"



        programadoE = false;
        confirmadoE = false;
        embarcadoE = false;
        despegadoE = false;
        volandoE = false;
        aterrizadoE = false;
        demoradoE = false;
        reprogramadoE = false;
        canceladoE = false;
        finalizadoE = true;

    }

    if (e.target.matches($botonesGuardar) && finalizadoE && checkearAterrizado() && (iden === "supervisor" || iden === "auxiliar")) {

        cambiarF(indice);

        cambiarASiguienteEstado($ventanaModalFinalizado);
        $titulo2.querySelector(".des-col3").textContent = "Estado: Finalizado ";
        $iconos2.querySelector(".icono-finalizado").style.color = "rgb(108 145 183)"
        $iconos2.querySelector(".icono-finalizado").style.fontSize = "4rem"


        programadoE = false;
        confirmadoE = false;
        embarcadoE = false;
        despegadoE = false;
        volandoE = false;
        aterrizadoE = false;
        demoradoE = false;
        reprogramadoE = false;
        canceladoE = false;
        finalizadoE = false;


    }
}






const cambiarASiguienteEstado = (ventana) => {
    $ventanaModalProgramado.style.display = "none";
    $ventanaModalConfirmado.style.display = "none";
    $ventanaModalPreembarque.style.display = "none";
    $ventanaModalDespegado.style.display = "none";
    $ventanaModalEnVuelo.style.display = "none";
    $ventanaModalAterrizado.style.display = "none";
    $ventanaModalDemorado.style.display = "none";
    $ventanaModalReprogramado.style.display = "none";
    $ventanaModalCancelado.style.display = "none";
    $ventanaModalCancelado.style.display = "none"
    $ventanaModalFinalizado.style.display = "none";

    ventana.style.display = "flex";

    limpiarIconosModificar();

}



const ponerNone = (ventana, iden, vuelo) => {

    $ventanaModalProgramado.style.display = "none";
    $ventanaModalConfirmado.style.display = "none";
    $ventanaModalPreembarque.style.display = "none";
    $ventanaModalDespegado.style.display = "none";
    $ventanaModalEnVuelo.style.display = "none";
    $ventanaModalAterrizado.style.display = "none";
    $ventanaModalDemorado.style.display = "none";
    $ventanaModalReprogramado.style.display = "none";
    $ventanaModalCancelado.style.display = "none";
    $ventanaModalFinalizado.style.display = "none";



    //console.log(vuelo["estado"] + "     es el de auxiliar");

    if (iden === "auxiliar" && vuelo["estado"] === "aterrizado") {

        // console.log(vuelo["estado"] + "     es el de auxiliar 2");

        $ventanaModalAterrizado.style.display = "flex";
    }

    else if (iden === "auditor" && vuelo["estado"] === "cancelado") {

        //  console.log(vuelo["estado"] + "     es el de auxiliar 3");
        //otra cosa pasa
        ventana.style.display = "flex";
    }


    else if (iden === "supervisor") {

        //  console.log(vuelo["estado"] + "     es el de auxiliar 5");
        ventana.style.display = "flex"

    }

}


const limpiarVentanas = () => {

    $ventanaModalProgramado.style.display = "none";
    $ventanaModalConfirmado.style.display = "none";
    $ventanaModalPreembarque.style.display = "none";
    $ventanaModalDespegado.style.display = "none";
    $ventanaModalEnVuelo.style.display = "none";
    $ventanaModalAterrizado.style.display = "none";
    $ventanaModalDemorado.style.display = "none";
    $ventanaModalReprogramado.style.display = "none";
    $ventanaModalCancelado.style.display = "none";
    $ventanaModalFinalizado.style.display = "none";


}


const limpiarProgramado = () => {

    console.log("limpieza")

    document.querySelector(".lista-aeronave").style.display = "none";

    document.querySelector(".lista-tripulantes").style.display = "none";



}

const limpiarReprogramado = () => {
    console.log("limpieza")
    let permisos = JSON.parse(localStorage.getItem('camposVentanaModificar'));
    permisos["nave"] = false;
    permisos["tripulacion"] = false;
    permisos["repronave"] = false;
    permisos["reprotripulacion"] = false;
    localStorage.setItem("camposVentanaModificar", JSON.stringify(permisos));
    document.querySelector(".datos-demorado").querySelector(".texto-demora").value = "--Seleccionar";

}
const limpiarConfirmado = () => {
    console.log("limpieza")

    document.querySelector(".integracion-permisos-mant").textContent = "Permisos aeronave: --Pendiente";
    document.querySelector(".permisoT").textContent = "Permisos Tripulacion: --Pendiente";

}

const limpiarPreEmbarque = () => {
    console.log("limpieza")


    document.querySelector(".temperature").textContent = "Temperatura: --Pendiente"
    document.querySelector(".temp-carac").textContent = "Clima: --Pendiente"

    document.querySelector(".estado-check").textContent = "Check-in: Desaprobado: --Pendiente ";
    document.querySelector(".pasajeros").textContent = "Cantidad de Pasajeros: --Pendiente";//peso-checkin
    document.querySelector(".peso-checkin").textContent = "Carga Aeronave en KG: --Pendiente";


    document.querySelector(".insumos-aeronave").style.display = "none";

    document.querySelector(".control-cabina").style.display = "none";


    document.querySelector(".resultado-control-cabina").style.display = "none";




}


const limpiarDemorado = () => {
    console.log("limpieza")

    document.querySelector(".texto-demora").selectedIndex = "0";


}


const limpiarCancelado = () => {
    console.log("limpieza")
    document.querySelector(".texto-cancelado").selectedIndex = "0";

}



const limpiarAterrizado = (vuelo) => {
    console.log("limpieza")

    // DIFERENCIA DURACION

    const fecha1 = new Date();

    const fecha2 = new Date();

    const opciones = { year: 'numeric', month: 'short', day: 'numeric' };

    var a = new Date(fecha1.toLocaleDateString('en-us', opciones) + " " + vuelo["horasalida"]);
    var b = new Date(fecha2.toLocaleDateString('en-us', opciones) + " " + vuelo["horallegada"]);
    var c = ((b - a) / 1000);

    var d = secondsToString(c);

    //CARGA DE DATOS

    document.querySelector(".datos-aterrizado").querySelector(".fecha-salida-real").value = vuelo["fechasalida"];
    document.querySelector(".datos-aterrizado").querySelector(".hora-salida").value = vuelo["horasalida"];
    document.querySelector(".datos-aterrizado").querySelector(".fecha-llegada").value = vuelo["fechallegada"];
    document.querySelector(".datos-aterrizado").querySelector(".hora-llegada").value = vuelo["horallegada"]
    document.querySelector(".duracion-vuelo").value = d;
    document.querySelector(".datos-aterrizado").querySelector(".insumosC-vuelo").textContent = "Insumos : --Pendiente";
    document.querySelector(".datos-aterrizado").querySelector(".aeropuertoS-vuelo").value = vuelo["origen"];
    document.querySelector(".datos-aterrizado").querySelector(".aeropuertoL-vuelo").value = vuelo["destino"];

    document.querySelector(".datos-aterrizado").querySelector(".pesoCarga-vuelo").value = null;

    document.querySelector(".ruta-vuelo").textContent = "Ruta Real : --Pendiente";
    document.querySelector(".combustible-vuelo").textContent = "  Litros de combustible : --Pendiente";
    document.querySelector(".lubricante-vuelo").textContent = "  Litros de lubricante : --Pendiente";
    document.querySelector(".kilometraje-vuelo").textContent = "Kilometros recorridos : --Pendiente";

    document.querySelector(".emer").textContent = "Emergencias: --Pendiente";

    document.querySelector(".aviso-des").style.display = "none";


}

function secondsToString(seconds) {
    var hour = Math.floor(seconds / 3600);
    hour = (hour < 10) ? '0' + hour : hour;
    var minute = Math.floor((seconds / 60) % 60);
    minute = (minute < 10) ? '0' + minute : minute;
    var second = seconds % 60;
    second = (second < 10) ? '0' + second : second;
    return hour + ':' + minute + ':' + second;
}



export {
    mostrarVentanaModal, mostrarVentanaHistorial, cerrarVentanaModal, cerrarVentanaHistorial,
    mostrarVentanaModalModificar, cerrarVentanaAlerta, cerrarVentanaModalModificar, mostrarVentanaEstado, cargarDatos, cargarDatosModificar, cargarTemperatura
};

