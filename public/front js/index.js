import { jsonAuth, logout } from "./auth.js";
import { pintarRutas } from "./pintarRutas.js";
import {
  obtRutas, obtRutasConFiltros, obtRutasFiltroFecha, obtPlanRangoEstado, obtPlanOrigenDestino, obtPlanOrigen,
  obtPlanDestino, obtRutasFiltroFechaO, obtRutasFiltroFechaD, obtRutasEstado1, obtRutasEstado2, obtRutasAOE1,
  obtRutasAOFL, obtRutasAOFS, obtRutasADE1, obtRutasADE2, obtRutasADFL, obtRutasADFS, obtRutasADFLE1, obtRutasADFLE2,
  obtRutasAOFLE1, obtRutasAOFLE2, obtRutasAOFSE1, obtRutasAOFSE2, obtRutasADFSE1, obtRutasADFSE2, obtRutasFSE1,
  obtRutasFSE2, obtRutasFLE1, obtRutasFLE2, obtRutasCinco1, obtRutasCinco2, obtRutasRangoAF, obtRutasRangoEF,
  obtRutasRangoEA, obtRutasAOE2, obtRutasAE1, obtRutasAE2, obtRutasAFL, obtRutasAFS, obtRutasEAO, obtRutasEAD,
  obtRutasEFS, obtRutasEFL, obtRutasFAO, obtRutasFE1, obtRutasFE2, obtRutasFAD
} from "./obtenerRutas.js";

import {
  mostrarVentanaModal, cerrarVentanaModal,
  mostrarVentanaModalModificar, cerrarVentanaModalModificar, mostrarVentanaEstado, cargarDatos, cargarDatosModificar, mostrarVentanaHistorial, cerrarVentanaHistorial, cerrarVentanaAlerta
} from "./ventanamodal.js";
import { mostrarPlanesDeVuelo, mostrarInformes, mostrarSolicitudes } from "./pintarPantallas.js";
import { traerTripulacion, traerNaves } from "./programado.js"
import { pintarTripulante, pasarATabla, pintarNave, pasarNaveSeleccionada } from "./pintarElementos.js"
import { obtTodalaTripulacion } from "./obtTripulacion.js";
import { getAeronaves, getAeronavesRepro } from "./naves.js";
import { obtCheck } from "./checkin.js";
import { openChangePass, openAvisoPass, volverPrincipal, openCodePass, openNewPass } from "./resetPass.js"
import { obtEmergencia } from "./emergencias.js";
import { avisarDespacho } from "./avisarDespacho.js";
import { cambiarA, cambiarCanc, cambiarDem, cambiarRP, cambiarV } from "./cambiarEstadoM.js";
import { getmantenimineto, pedirMantenimiento } from "./MantenientoCofimado.js";
import { obtInsumo, pedirInsumo, pedirInsumoFinal } from "./insumos.js";
import { getControlCabina } from "./controlcabina.js";
import { obtClima } from "./obtclima.js";
import { pasarATablaReprogramado, pasarNaveSeleccionadaRepro, pintarNaveRepro, pintarTripulanteRepro, traerNavesRepro, traerTripulacionRepro, pintarInputsRutaExcluir, pintarInputsRuta, obtRutaAlternativa } from "./reprogramado.js";
import { obtRutaReal } from "./obtRutaAlternativa.js";
import { getPermisosTripulacion } from "./PermisosTripulacion.js";
import { checkearPreembarque } from "./checkearCampos.js";
import { enviarCodVerificacion, nuevaContraseña, solicitarNuevaContraseña } from "./cambioContraseña.js";
import { mandarEmail } from "./mandaEmail.js";
const $recuperacion = ".recuperar";
const $btnSend = ".verificar-datos";

const $btnCodigo = ".verificar-codigo";
const $btnPass = ".verificar-pass";
const $btnBack = ".volverP";
const $dom = document;
const $btnIdentificacion = ".autentificador";
const $btnSolicitudes = ".obt-solicitudes";
const $btnInformes = ".obt-informes"
const $btnObtenerRutas = ".filtrar";
const $btnsPlanVuelo = ".btn-masinfo";
const $btnHistorial = ".btn-historial";
const $h3listas = ".lista-vuelo";
const $cerrar = ".cerrar";
const $iconoCerrar = ".fa-x";
const $btnplavuelo = ".obt-rutas";
const $btnModificar = ".btn-modificar"
const $btnLimpiar1 = ".btn-select1"
const $btnLimpiar2 = ".btn-select2"
const $btnsActualizar = ".btn-traerTodo"
let planesDevuelo;
let identificacion;
let ultimoBtnModificar;
const $btnTraerTrip = ".btn-traerT"
//--------------------------------------
//-----------------btn paso estados de vuelo
const $btnEstadoConf = ".c-modificar"
const $btnEstadoPE = ".pe-modificar"
const $btnEstadoEnVuelo = ".v-modificar"
const $btnEstadoD = ".d-modificar"
const $btnEstadoA = ".a-modificar"
const $btnEstadoF = ".f-modificar"
const $btnEstadoDe = ".btn-actualizar-demorado"
const $btnEstadoCan = ".btn-actualizar-cancelado"
const $btnEstadoRP = ".re-modificar"
//--------------------------------------
//--------------------------------------
const $aeroOr = $dom.querySelector(".aeropuertoOr")
const $aeroDes = $dom.querySelector(".aeropuertoDes")
const $fechaS = $dom.querySelector(".fechaS")
const $fechaL = $dom.querySelector(".fechaL")
const $estadoD = $dom.querySelector(".estado1")
const $estadoH = $dom.querySelector(".estado2")
const $filtroTodo = $dom.querySelector(".all")
const $filtroAeropuertos = $dom.querySelector(".dosf")
const $filtroFechas = $dom.querySelector(".tresf")
const $filtroEstados = $dom.querySelector(".cuatrof")
let logoutbool = false
const textoAviso = document.querySelector(".aviso-des");





$dom.addEventListener("click", async e => {

  console.log(identificacion)

  if (identificacion == undefined || logout) {
    identificacion = (localStorage.getItem('permiso'))
  }

  if (e.target.matches($btnIdentificacion)) {
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

    jsonAuth(authSTR);
  }

  if (e.target.matches($recuperacion)) {

    openChangePass()
  };

  if (e.target.matches($btnSend)) {
    enviarCodVerificacion();

    openCodePass()

  };

  if (e.target.matches($btnCodigo)) {
    console.log("Hola te ganaste un millon de pesos sadsadsadsadasdkash")
    let infoCambioContrasena = await solicitarNuevaContraseña();

    console.log(infoCambioContrasena)

    if (infoCambioContrasena["verificacion"])
      openNewPass();

  }

  if (e.target.matches($btnPass)) {

    nuevaContraseña();

    openAvisoPass()
  };

  if (e.target.matches($btnBack)) volverPrincipal();

  if (e.target.matches($btnObtenerRutas) || e.target.matches(".btn-filtro")) {

    console.log("aeropuerto origen selec: " + $aeroOr.value)
    console.log("aeropuerto destino selec: " + $aeroDes.value)
    console.log("fecha salida selec: " + $fechaS.value)
    console.log("fecha llegada selec: " + $fechaL.value)
    console.log("estado 1 selec: " + $estadoD.value)
    console.log("estado 2 selec: " + $estadoH.value)

    //filtro de rango de estados

    if ($aeroOr.value === "" && $aeroDes.value === "" && $fechaS.value === "" && $fechaL.value === "" && $estadoD.value != "" && $estadoH.value != "" && $estadoD.value != "--Seleccionar" && $estadoH.value === "--Seleccionar") {
      obtRutasEstado1(pintarRutas);
      console.log("HOLA SOY EL FILTRO DE ESTADO 1")

    }
    if ($aeroOr.value === "" && $aeroDes.value === "" && $fechaS.value === "" && $fechaL.value === "" && $estadoD.value != "" && $estadoH.value != "" && $estadoD.value === "--Seleccionar" && $estadoH.value != "--Seleccionar") {
      obtRutasEstado2(pintarRutas);
      console.log("HOLA SOY EL FILTRO DE ESTADO 2")

    }

    if ($aeroOr.value === "" && $aeroDes.value === "" && $fechaS.value === "" && $fechaL.value === "" && $estadoD.value != "" && $estadoH.value != "" && $estadoD.value != "--Seleccionar" && $estadoH.value != "--Seleccionar") {
      obtPlanRangoEstado(pintarRutas);
      console.log("HOLA SOY EL FILTRO DE ESTADOS")

    }

    //filtro de ambos aeropuertos   agregar de cada uno(origen, destino)

    if ($aeroOr.value != "" && $aeroDes.value === "" && $fechaS.value === "" && $fechaL.value === "" && $estadoD.value === "--Seleccionar" && $estadoH.value === "--Seleccionar") {
      obtPlanOrigen(pintarRutas);
      console.log("HOLA SOY EL FILTRO DE AEROPUERTOS ORIGEN")
    }

    if ($aeroOr.value != "" && $aeroDes.value === "" && $fechaS.value === "" && $fechaL.value === "" && $estadoD.value != "--Seleccionar" && $estadoH.value === "--Seleccionar") {
      obtRutasAOE1(pintarRutas);
      console.log("HOLA SOY EL FILTRO DE AEROPUERTOS ORIGEN estado 1")
    }
    if ($aeroOr.value != "" && $aeroDes.value === "" && $fechaS.value === "" && $fechaL.value === "" && $estadoD.value === "--Seleccionar" && $estadoH.value != "--Seleccionar") {
      obtRutasAOE2(pintarRutas);
      console.log("HOLA SOY EL FILTRO DE AEROPUERTOS ORIGEN estado 2")
    }

    if ($aeroOr.value != "" && $aeroDes.value === "" && $fechaS.value === "" && $fechaL.value != "" && $estadoD.value === "--Seleccionar" && $estadoH.value === "--Seleccionar") {
      obtRutasAOFL(pintarRutas);
      console.log("HOLA SOY EL FILTRO DE AEROPUERTOS ORIGEN fecha llegada")
    }

    if ($aeroOr.value != "" && $aeroDes.value === "" && $fechaS.value != "" && $fechaL.value === "" && $estadoD.value === "--Seleccionar" && $estadoH.value === "--Seleccionar") {
      obtRutasAOFS(pintarRutas);
      console.log("HOLA SOY EL FILTRO DE AEROPUERTOS ORIGEN fecha salida")
    }

    if ($aeroOr.value === "" && $aeroDes.value != "" && $fechaS.value === "" && $fechaL.value === "" && $estadoD.value === "--Seleccionar" && $estadoH.value === "--Seleccionar") {
      obtPlanDestino(pintarRutas);
      console.log("HOLA SOY EL FILTRO DE AEROPUERTOS DESTINO")
    }

    if ($aeroOr.value === "" && $aeroDes.value != "" && $fechaS.value === "" && $fechaL.value === "" && $estadoD.value != "--Seleccionar" && $estadoH.value === "--Seleccionar") {
      obtRutasADE1(pintarRutas);
      console.log("HOLA SOY EL FILTRO DE AEROPUERTOS destino estado 1")
    }
    if ($aeroOr.value === "" && $aeroDes.value != "" && $fechaS.value === "" && $fechaL.value === "" && $estadoD.value === "--Seleccionar" && $estadoH.value != "--Seleccionar") {
      obtRutasADE2(pintarRutas);
      console.log("HOLA SOY EL FILTRO DE AEROPUERTOS destino estado 2")
    }

    if ($aeroOr.value === "" && $aeroDes.value != "" && $fechaS.value === "" && $fechaL.value != "" && $estadoD.value === "--Seleccionar" && $estadoH.value === "--Seleccionar") {
      obtRutasADFL(pintarRutas);
      console.log("HOLA SOY EL FILTRO DE AEROPUERTOS destino fecha llegada")
    }

    if ($aeroOr.value === "" && $aeroDes.value != "" && $fechaS.value != "" && $fechaL.value === "" && $estadoD.value === "--Seleccionar" && $estadoH.value === "--Seleccionar") {
      obtRutasADFS(pintarRutas);
      console.log("HOLA SOY EL FILTRO DE AEROPUERTOS destino fecha salida")
    }

    if ($aeroOr.value != "" && $aeroDes.value != "" && $fechaS.value === "" && $fechaL.value === "" && $estadoD.value === "--Seleccionar" && $estadoH.value === "--Seleccionar") {
      obtPlanOrigenDestino(pintarRutas);
      console.log("HOLA SOY EL FILTRO DE AEROPUERTOS")
    }

    if ($aeroOr.value === "" && $aeroDes.value != "" && $fechaS.value === "" && $fechaL.value != "" && $estadoD.value != "--Seleccionar" && $estadoH.value === "--Seleccionar") {
      obtRutasADFLE1(pintarRutas);
      console.log("HOLA SOY EL FILTRO DE DESTINO, FECHA LLEGADA  Y ESTADO 1")
    }

    if ($aeroOr.value === "" && $aeroDes.value != "" && $fechaS.value === "" && $fechaL.value != "" && $estadoD.value === "--Seleccionar" && $estadoH.value != "--Seleccionar") {
      obtRutasADFLE2(pintarRutas);
      console.log("HOLA SOY EL FILTRO DE DESTINO, FECHA LLEGADA  Y ESTADO 2")
    }

    if ($aeroOr.value != "" && $aeroDes.value === "" && $fechaS.value === "" && $fechaL.value != "" && $estadoD.value != "--Seleccionar" && $estadoH.value === "--Seleccionar") {
      obtRutasAOFLE1(pintarRutas);
      console.log("HOLA SOY EL FILTRO DE ORIGEN, FECHA LLEGADA  Y ESTADO 1")
    }

    if ($aeroOr.value != "" && $aeroDes.value === "" && $fechaS.value === "" && $fechaL.value != "" && $estadoD.value === "--Seleccionar" && $estadoH.value != "--Seleccionar") {
      obtRutasAOFLE2(pintarRutas);
      console.log("HOLA SOY EL FILTRO DE ORIGEN, FECHA LLEGADA  Y ESTADO 2")
    }

    if ($aeroOr.value != "" && $aeroDes.value === "" && $fechaS.value != "" && $fechaL.value === "" && $estadoD.value != "--Seleccionar" && $estadoH.value === "--Seleccionar") {
      obtRutasAOFSE1(pintarRutas);
      console.log("HOLA SOY EL FILTRO DE ORIGEN, FECHA SALIDA  Y ESTADO 1")
    }

    if ($aeroOr.value != "" && $aeroDes.value === "" && $fechaS.value != "" && $fechaL.value === "" && $estadoD.value === "--Seleccionar" && $estadoH.value != "--Seleccionar") {
      obtRutasAOFSE2(pintarRutas);
      console.log("HOLA SOY EL FILTRO DE ORIGEN, FECHA SALIDA  Y ESTADO 2")
    }

    if ($aeroOr.value === "" && $aeroDes.value != "" && $fechaS.value != "" && $fechaL.value === "" && $estadoD.value != "--Seleccionar" && $estadoH.value === "--Seleccionar") {
      obtRutasADFSE1(pintarRutas);
      console.log("HOLA SOY EL FILTRO DE destino, FECHA SALIDA  Y ESTADO 1")
    }

    if ($aeroOr.value === "" && $aeroDes.value != "" && $fechaS.value != "" && $fechaL.value === "" && $estadoD.value === "--Seleccionar" && $estadoH.value != "--Seleccionar") {
      obtRutasADFSE2(pintarRutas);
      console.log("HOLA SOY EL FILTRO DE destino, FECHA SALIDA  Y ESTADO 2")
    }

    //filtro de rango de fechas 


    if ($aeroOr.value === "" && $aeroDes.value === "" && $estadoD.value === "--Seleccionar" && $estadoH.value === "--Seleccionar" && $fechaS.value != "" && $fechaL.value != "") {
      obtRutasFiltroFecha(pintarRutas);
      console.log("HOLA SOY EL FILTRO DE FECHAS")

    }
    if ($aeroOr.value === "" && $aeroDes.value === "" && $estadoD.value === "--Seleccionar" && $estadoH.value === "--Seleccionar" && $fechaS.value != "" && $fechaL.value === "") {
      obtRutasFiltroFechaO(pintarRutas);
      console.log("HOLA SOY EL FILTRO DE FECHAS SALIDA")

    }
    if ($aeroOr.value === "" && $aeroDes.value === "" && $estadoD.value != "--Seleccionar" && $estadoH.value === "--Seleccionar" && $fechaS.value != "" && $fechaL.value === "") {
      obtRutasFSE1(pintarRutas);
      console.log("HOLA SOY EL FILTRO DE FECHAS SALIDA estado 1")

    }
    if ($aeroOr.value === "" && $aeroDes.value === "" && $estadoD.value === "--Seleccionar" && $estadoH.value != "--Seleccionar" && $fechaS.value != "" && $fechaL.value === "") {
      obtRutasFSE2(pintarRutas);
      console.log("HOLA SOY EL FILTRO DE FECHAS SALIDA estado 2")

    }
    if ($aeroOr.value === "" && $aeroDes.value === "" && $estadoD.value === "--Seleccionar" && $estadoH.value === "--Seleccionar" && $fechaS.value === "" && $fechaL.value != "") {
      obtRutasFiltroFechaD(pintarRutas);
      console.log("HOLA SOY EL FILTRO DE FECHAS llegada")

    }
    if ($aeroOr.value === "" && $aeroDes.value === "" && $estadoD.value != "--Seleccionar" && $estadoH.value === "--Seleccionar" && $fechaS.value === "" && $fechaL.value != "") {
      obtRutasFLE1(pintarRutas);
      console.log("HOLA SOY EL FILTRO DE FECHAS llegada estado 1")

    }
    if ($aeroOr.value === "" && $aeroDes.value === "" && $estadoD.value === "--Seleccionar" && $estadoH.value != "--Seleccionar" && $fechaS.value === "" && $fechaL.value != "") {
      obtRutasFLE2(pintarRutas);
      console.log("HOLA SOY EL FILTRO DE FECHAS llegada estado 2")

    }

    //el filtro para todos los filtros


    if ($aeroOr.value != "" && $aeroDes.value != "" && $estadoD.value != "--Seleccionar" && $estadoH.value === "--Seleccionar" && $fechaS.value === "" && $fechaL.value === "") {
      obtRutasAE1(pintarRutas);
      console.log("HOLA SOY EL FILTRO DE RANGO AERO Y ESTADO 1")
    }

    if ($aeroOr.value != "" && $aeroDes.value != "" && $estadoD.value === "--Seleccionar" && $estadoH.value != "--Seleccionar" && $fechaS.value === "" && $fechaL.value === "") {
      obtRutasAE2(pintarRutas);
      console.log("HOLA SOY EL FILTRO DE RANGO AERO Y ESTADO 2")
    }

    if ($aeroOr.value != "" && $aeroDes.value != "" && $estadoD.value === "--Seleccionar" && $estadoH.value === "--Seleccionar" && $fechaS.value === "" && $fechaL.value != "") {
      obtRutasAFL(pintarRutas);
      console.log("HOLA SOY EL FILTRO DE RANGO AERO Y FECHA LLEGADA")
    }
    if ($aeroOr.value != "" && $aeroDes.value != "" && $estadoD.value === "--Seleccionar" && $estadoH.value === "--Seleccionar" && $fechaS.value != "" && $fechaL.value === "") {
      obtRutasAFS(pintarRutas);
      console.log("HOLA SOY EL FILTRO DE RANGO AERO Y FECHA SALIDA")
    }
    if ($aeroOr.value != "" && $aeroDes.value === "" && $estadoD.value != "--Seleccionar" && $estadoH.value != "--Seleccionar" && $fechaS.value === "" && $fechaL.value === "") {
      obtRutasEAO(pintarRutas);
      console.log("HOLA SOY EL FILTRO DE RANGO ESTADO Y AEROPUERTO ORIGEN")
    }
    if ($aeroOr.value === "" && $aeroDes.value != "" && $estadoD.value != "--Seleccionar" && $estadoH.value != "--Seleccionar" && $fechaS.value === "" && $fechaL.value === "") {
      obtRutasEAD(pintarRutas);
      console.log("HOLA SOY EL FILTRO DE RANGO ESTADO Y AEROPUERTO DESTINO")
    }
    if ($aeroOr.value === "" && $aeroDes.value === "" && $estadoD.value != "--Seleccionar" && $estadoH.value != "--Seleccionar" && $fechaS.value != "" && $fechaL.value === "") {
      obtRutasEFS(pintarRutas);
      console.log("HOLA SOY EL FILTRO DE RANGO ESTADO Y FECHA SALIDA")
    }
    if ($aeroOr.value === "" && $aeroDes.value === "" && $estadoD.value != "--Seleccionar" && $estadoH.value != "--Seleccionar" && $fechaS.value === "" && $fechaL.value != "") {
      obtRutasEFL(pintarRutas);
      console.log("HOLA SOY EL FILTRO DE RANGO ESTADO Y FECHA LLEGADA")
    }
    if ($aeroOr.value != "" && $aeroDes.value === "" && $estadoD.value === "--Seleccionar" && $estadoH.value === "--Seleccionar" && $fechaS.value != "" && $fechaL.value != "") {
      obtRutasFAO(pintarRutas);
      console.log("HOLA SOY EL FILTRO DE RANGO FECHAS Y AEROPUERTO ORIGEN")
    }
    if ($aeroOr.value === "" && $aeroDes.value != "" && $estadoD.value === "--Seleccionar" && $estadoH.value === "--Seleccionar" && $fechaS.value != "" && $fechaL.value != "") {
      obtRutasFAD(pintarRutas);
      console.log("HOLA SOY EL FILTRO DE RANGO FECHAS Y AEROPUERTO DESTINO")
    }
    if ($aeroOr.value === "" && $aeroDes.value === "" && $estadoD.value != "--Seleccionar" && $estadoH.value === "--Seleccionar" && $fechaS.value != "" && $fechaL.value != "") {
      obtRutasFE1(pintarRutas);
      console.log("HOLA SOY EL FILTRO DE RANGO FECHAS Y ESTADO 1")
    }

    if ($aeroOr.value === "" && $aeroDes.value === "" && $estadoD.value === "--Seleccionar" && $estadoH.value != "--Seleccionar" && $fechaS.value != "" && $fechaL.value != "") {
      obtRutasFE2(pintarRutas);
      console.log("HOLA SOY EL FILTRO DE RANGO FECHAS Y ESTADO 2")
    }


    if ($aeroOr.value != "" && $aeroDes.value != "" && $estadoD.value != "--Seleccionar" && $estadoH.value != "--Seleccionar" && $fechaS.value === "" && $fechaL.value === "") {
      obtRutasRangoEA(pintarRutas);
      console.log("HOLA SOY EL FILTRO DE RANGO ESTADO Y RANGO AEROPUERTO")
    }

    if ($aeroOr.value === "" && $aeroDes.value === "" && $estadoD.value != "--Seleccionar" && $estadoH.value != "--Seleccionar" && $fechaS.value != "" && $fechaL.value != "") {
      obtRutasRangoEF(pintarRutas);
      console.log("HOLA SOY EL FILTRO DE RANGO ESTADO Y RANGO FECHAS ")
    }

    if ($aeroOr.value != "" && $aeroDes.value != "" && $estadoD.value === "--Seleccionar" && $estadoH.value === "--Seleccionar" && $fechaS.value != "" && $fechaL.value != "") {
      obtRutasRangoAF(pintarRutas);
      console.log("HOLA SOY EL FILTRO DE RANGO FECHAS Y RANGO AEROPUERTO")
    }

    if ($aeroOr.value != "" && $aeroDes.value != "" && $estadoD.value != "--Seleccionar" && $estadoH.value != "--Seleccionar" && $fechaS.value != "" && $fechaL.value != "") {
      obtRutasConFiltros(pintarRutas);
      console.log("HOLA SOY EL FILTRO DE TODOS")
    }

    if ($aeroOr.value != "" && $aeroDes.value != "" && $estadoD.value != "--Seleccionar" && $estadoH.value === "--Seleccionar" && $fechaS.value != "" && $fechaL.value != "") {
      obtRutasCinco1(pintarRutas);
      console.log("HOLA SOY EL FILTRO DE CINCO Y ESTADO 1")
    }

    if ($aeroOr.value != "" && $aeroDes.value != "" && $estadoD.value === "--Seleccionar" && $estadoH.value != "--Seleccionar" && $fechaS.value != "" && $fechaL.value != "") {
      obtRutasCinco2(pintarRutas);
      console.log("HOLA SOY EL FILTRO DE CINCO Y ESTADO 2")
    }

  }




  if (e.target.matches($btnLimpiar1)) {

    console.log("aprete el limpiar 1")

    document.querySelector(".estado1").selectedIndex = "0";
  }

  if (e.target.matches($btnLimpiar2)) {

    console.log("aprete el limpiar 2")

    document.querySelector(".estado2").selectedIndex = "0";
  }

  if (e.target.matches($btnsActualizar)) obtRutas(pintarRutas);

  if (e.target.matches($cerrar) || e.target.matches($iconoCerrar)) {
    cerrarVentanaModal();
    cerrarVentanaModalModificar();
    cerrarVentanaHistorial();
    obtRutas(pintarRutas);
    textoAviso.style.display = "none";
  }

  if (e.target.matches($btnplavuelo)) {
    mostrarPlanesDeVuelo()
    obtRutas(pintarRutas);
  }

  if (e.target.matches($btnInformes)) mostrarInformes(identificacion);

  if (e.target.matches($btnSolicitudes) && identificacion === "auditor") mostrarSolicitudes(identificacion);


  if (e.target.matches($btnSolicitudes) && identificacion != "auditor") {
    let cartel = document.querySelector(".cartel-alerta");
    cartel.style.display = "flex"
    cartel.querySelector(".msj-alerta").textContent = "El " + identificacion + " no puede acceder al historial de cambio de contraseñas"
  }

  if (e.target.matches($btnModificar)) {
    ultimoBtnModificar = mostrarVentanaModalModificar(e, identificacion)

  };

  if (e.target.matches($btnsPlanVuelo) || e.target.matches(".masinfo")) {
    mostrarVentanaModal(e, planesDevuelo);
  }


  if (e.target.matches(".historial")) {
    mostrarVentanaHistorial(e)

  }


  //aca estaban los metodos de cambio de estado, ahora estan en ventana modal

  if (e.target.matches(".btn-pedir-insumos")) {

    pedirInsumo(ultimoBtnModificar);
    pedirMantenimiento(ultimoBtnModificar)

  }


  if (e.target.matches(".btn-permisosAN")) {
    getmantenimineto()
  }




  /* METODOS PARA LA VENTANA PROGRAMADO*/

  //console.log(planesDevuelo,planesDevuelo[ultimoBtnModificar])

  mostrarVentanaEstado(e, identificacion, ultimoBtnModificar);

  /*Metodos entre ventanas*/
  //------------------------------------------------------------ listado manual programado
  if (e.target.matches($btnTraerTrip)) {
    obtTodalaTripulacion(traerTripulacion, ultimoBtnModificar)
    document.querySelector(".lista-tripulantes").style.display = "grid";
  }

  if (e.target.matches(".btn-selecT")) pasarATabla();

  if (e.target.matches(".selec-trip")) pintarTripulante(e);

  if (e.target.matches(".pintar-nave")) pintarNave(e);


  if (e.target.matches(".btn-traerAN")) {

    getAeronaves(traerNaves, ultimoBtnModificar) //pintarTripulante(e);
    document.querySelector(".lista-aeronave").style.display = "grid";
  }

  if (e.target.matches(".btn-selecAN")) pasarNaveSeleccionada(ultimoBtnModificar);//pasarATabla();

  //------------------------------------------------------------

  //------------------------------------------------------------ listado manual reprogramado

  if (e.target.matches(".listadoTripulacionReprogramado")) obtTodalaTripulacion(traerTripulacionRepro, ultimoBtnModificar)

  if (e.target.matches(".selec-trip-repro")) pintarTripulanteRepro(e);

  if (e.target.matches(".SeleccionarTripulacionReprogramado")) pasarATablaReprogramado();

  if (e.target.matches(".btn-traerAN-repro")) getAeronavesRepro(traerNavesRepro, ultimoBtnModificar);

  if (e.target.matches(".pintar-nave-repro")) { pintarNaveRepro(e) }

  //if (e.target.matches(".pintar-nave")) pintarNave(e);  

  // if (e.target.matches(". listadoAvionReprogramado")) getAeronaves(traerNaves,ultimoBtnModificar) //pintarTripulante(e);

  if (e.target.matches(".btn-selectAN-repro")) pasarNaveSeleccionadaRepro(ultimoBtnModificar);//pasarATabla();
  //------------------------------------------------------------

  if (e.target.matches(".btn-alerta")) cerrarVentanaAlerta();

  if (e.target.matches(".logout")) {

    identificacion = "";
    logoutbool = true;
    logout()
    cerrarVentanaModal();
    cerrarVentanaModalModificar();
    cerrarVentanaHistorial();

  }

  if (e.target.matches(".verificar-emer")) {
    obtRutaReal(ultimoBtnModificar)
    obtEmergencia("asd");
    pedirInsumoFinal(ultimoBtnModificar)
  }

  if (e.target.matches(".guardar")) {
    avisarDespacho("SF1364");
  }

  if (e.target.matches(".boton-check")) {

    obtCheck(ultimoBtnModificar)
  }

  if (e.target.matches(".btn-insumos")) {

    document.querySelector(".insumos-aeronave").style.display = "grid";



    obtInsumo(ultimoBtnModificar);
  }

  if (e.target.matches(".btn-control-cabina")) {

    document.querySelector(".control-cabina").style.display = "grid";
    document.querySelector(".resultado-control-cabina").style.display = "flex";
    getControlCabina(ultimoBtnModificar)
  }

  if (e.target.matches(".boton-clima")) {
    obtClima(ultimoBtnModificar)
  }

  if (e.target.matches(".btn-cant-rutas")) {
    pintarInputsRuta();
  }

  if (e.target.matches(".btn-cant-rutas-excluir")) {
    pintarInputsRutaExcluir()
  }

  if (e.target.matches(".btn-cambiar-ruta")) {

    obtRutaAlternativa(ultimoBtnModificar);


  }
  if (e.target.matches(".btn-permisosT")) {
    getPermisosTripulacion(ultimoBtnModificar);
  }

  if (e.target.matches($btnEstadoCan)) {
    cambiarCanc(ultimoBtnModificar);
  }

  /*Informe de vuelos*/


  if (e.target.matches(".informe-vuelo")) {
    let link = 'https://icarusproyectoaguila.metabaseapp.com/public/dashboard/040a3cfe-dc91-4684-a7ed-d98e482eb929';
    window.open('https://icarusproyectoaguila.metabaseapp.com/public/dashboard/040a3cfe-dc91-4684-a7ed-d98e482eb929', '_blank');
    mandarEmail(link, 'vuelo');
  }


  if (e.target.matches(".informe-aeronave")) {

    let link = 'https://icarusproyectoaguila.metabaseapp.com/public/dashboard/19b81a9b-c55e-4a23-a6b1-5805856f1251'

    window.open('https://icarusproyectoaguila.metabaseapp.com/public/dashboard/19b81a9b-c55e-4a23-a6b1-5805856f1251', '_blank');
    mandarEmail(link, 'aeronave')

  }
  //informe-mantenimiento
  if (e.target.matches(".informe-mantenimiento")) {
    let link = 'https://icarusproyectoaguila.metabaseapp.com/public/dashboard/117bd88b-5392-4b3a-82ee-b9b102a9339b'
    window.open('https://icarusproyectoaguila.metabaseapp.com/public/dashboard/117bd88b-5392-4b3a-82ee-b9b102a9339b', '_blank');
    mandarEmail(link, 'mantenimiento')
  }
  //informe-emergencia
  if (e.target.matches(".informe-emergencia") && identificacion != "auxiliar") {
    let link = 'https://icarusproyectoaguila.metabaseapp.com/public/dashboard/d873b880-45d8-4e1a-a1f1-ede0544812da';
    window.open('https://icarusproyectoaguila.metabaseapp.com/public/dashboard/d873b880-45d8-4e1a-a1f1-ede0544812da', '_blank');
    mandarEmail(link, 'emergencia')
  }
  //informe-clima

  if (e.target.matches(".informe-clima")) {
    let link = 'https://icarusproyectoaguila.metabaseapp.com/public/dashboard/47a8f7da-60e8-4163-9aa3-ae8789445b3f';
    window.open('https://icarusproyectoaguila.metabaseapp.com/public/dashboard/47a8f7da-60e8-4163-9aa3-ae8789445b3f', '_blank');
    mandarEmail(link, 'clima')
  }
  //informe-tripulacion
  if (e.target.matches(".informe-tripulacion")) {
    let link = 'https://icarusproyectoaguila.metabaseapp.com/public/dashboard/6e7f87a3-6170-4720-9546-2645c9d443a0';
    window.open('https://icarusproyectoaguila.metabaseapp.com/public/dashboard/6e7f87a3-6170-4720-9546-2645c9d443a0', '_blank');
    mandarEmail(link, 'tripulacion');
  }

  //informe-usuario
  if (e.target.matches(".informe-usuario") && identificacion != "auxiliar" && identificacion != "supervisor") {
    let link = 'https://icarusproyectoaguila.metabaseapp.com/public/dashboard/166cbd49-bf03-4aaf-bc00-96b46dc67bcb';
    window.open('https://icarusproyectoaguila.metabaseapp.com/public/dashboard/166cbd49-bf03-4aaf-bc00-96b46dc67bcb', '_blank');
    mandarEmail(link, 'usuario');
  }
  //informe-aeropuerto
  if (e.target.matches(".informe-aeropuerto") && identificacion != "auxiliar") {
    let link = 'https://icarusproyectoaguila.metabaseapp.com/public/dashboard/d72ee7c9-f1cd-40e3-b8df-6b73f3f29b38';

    window.open('https://icarusproyectoaguila.metabaseapp.com/public/dashboard/d72ee7c9-f1cd-40e3-b8df-6b73f3f29b38', '_blank');
    mandarEmail(link, 'aeropuerto')

  }


  if (e.target.matches(".informe-usuario") && (identificacion === "auxiliar" || identificacion === "supervisor")) {
    let cartel = document.querySelector(".cartel-alerta");
    cartel.style.display = "flex"
    cartel.querySelector(".msj-alerta").textContent = "El " + identificacion + " no puede acceder al informe"
  }


  if (e.target.matches(".informe-aeropuerto") && identificacion === "auxiliar") {
    let cartel = document.querySelector(".cartel-alerta");
    cartel.style.display = "flex"
    cartel.querySelector(".msj-alerta").textContent = "El " + identificacion + " no puede acceder al informe"
  }

  if (e.target.matches(".informe-emergencia") && identificacion === "auxiliar") {
    let cartel = document.querySelector(".cartel-alerta");
    cartel.style.display = "flex"
    cartel.querySelector(".msj-alerta").textContent = "El " + identificacion + " no puede acceder al informe"
  }


  if (e.target.matches($btnEstadoDe)) {
    cambiarDem(ultimoBtnModificar);
  }



})

const authSTR = (str) => {
  identificacion = str;


}


const limpiarSesion = () => {

  localStorage.clear();
}

window.onload = limpiarSesion;




