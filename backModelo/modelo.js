const daoNave = require("../back DAO/MaestroAeronaveDAO");
const daoClima = require("../back DAO/ClimaDAO");
const daoEmergencia = require("../back DAO/EmergenciasDAO");
const daoCompania = require("../back DAO/MaestroCompaniaDAO");
const daoPersonal = require("../back DAO/PersonalDAO.js");
const daoParentesco = require("../back DAO/ParentescoDAO.js");
const daoTripulacion = require("../back DAO/TripulacionDAO.js");
const daoUsuario = require("../back DAO/UsuarioDAO.js");
const daoPlanVuelo = require("../back DAO/PlanVueloDAO.js");
const daoMantenimiento = require("../back DAO/MantenimientoDAO.js");
const daoDisponibilidad = require("../back DAO/DisponibilidadDAO.js");
const daoSolicitud = require("../back DAO/SolicitudDAO.js")
const daoHistorial = require("../back DAO/HistorialDAO.js")
const daoInsumos = require("../back DAO/insumosDAO.js")
const conexion = require("../back conexion/conexion");
const apis = require("../back conexionAPIS/ConexionAPIS.js");
const mail = require("../mail.js");
const ConexionEstablecida = conexion.getConexion.establecer;







const AvisarInsumos = async (req, res) => {
    let obtenerClimaXID = await apis.AvisoInsumos(req, res)
}
const AvisarControles = async (req, res) => {
    let obtenerClimaXID = await apis.AvisoControl(req, res)
}

const DarCantInsumos = async (req, res) => {
    let insumos = await apis.insumos(ConexionEstablecida, req, res);
    /*let {idvuelo}= req.body
    for(insumo of insumos){
        body={
            "idvuelo":idvuelo,
            "cantidadInicial":insumo.InitialQuantity, 
            "cantidadFinal":insumo.FinalQuantity, 
            "nombre":insumo.Supply.Name, 
            "descripcion":insumo.Supply.Description, 
            "pesoIndividual":insumo.Supply.Weight
        }
        console.log(body);
        //await daoInsumos.insert(ConexionEstablecida,body,res)
    }*/
    return insumos
}
//-------------------------------------------------------------------------------------------------
//---------------- ASIGNA NAVE Y TRIPULACION ------------------------------------------------------
//-------------------------------------------------------------------------------------------------
const obtenerInfoAeronaves = async (req, res) => {
    let auxNaves = [];
    let listado = {};
    let infoAvion2 = await daoNave.readaAviones(ConexionEstablecida, req, res);
    let infoTecnica = null;
    let modeloAvionAnterior = null;
    for (elem2 of infoAvion2) {

        if (elem2.modeloaeronave != modeloAvionAnterior) {
            modeloAvionAnterior = elem2.modeloaeronave;
            infoTecnica = await apis.PerdirInfoModeloAeronave(elem2.modeloaeronave);

        }
        listado = { ...elem2, ...infoTecnica };
        auxNaves.push(listado)
        listado = {}
    }
    res.send(auxNaves)
}


const IngresarTripulante = async (req, res) => {
    var tripulacion = await daoTripulacion.InsertTripulante(ConexionEstablecida, req, res);
}
const actualizarIataAeronave = async (matricula, iatadestino) => {
    var actualizarIataAeronave = await daoNave.actualizarIataAeronave(ConexionEstablecida, matricula, iatadestino);
}
const actualizarIataPersonal = async (idpersonal, iatadestino) => {
    var IataPersonal = await daoPersonal.actualizarIataPersonal(ConexionEstablecida, idpersonal, iatadestino);
}
const asignarTripulacionAutom = async (data) => {
    let tripulacionAutomatica = await daoTripulacion.readFiltrosTripulantes(ConexionEstablecida, data);
    return tripulacionAutomatica;
}
const obtenerUsuariosPersonal = (req, res) => {
    var InfoUsuario = daoUsuario.readUserPersonal(ConexionEstablecida, req, res);
}
const ObtenerVuelosPorTripulante = async (req, res) => {
    var InfoVuelo = await daoPlanVuelo.readVuelosPorTripulante(ConexionEstablecida, req, res);
}
const asignarTripulacionManual = async (data) => {
    let borrado = await daoTripulacion.deletePorIdVuelo(ConexionEstablecida, data)
    let tripulacionAutomatica = await daoTripulacion.readListadoManual(ConexionEstablecida, data);
    return tripulacionAutomatica;
}
const insertarTripulacion = async (idpersonal, idvuelo) => {
    var InfoTripulaciones = await daoTripulacion.insert(ConexionEstablecida, idpersonal, idvuelo);
    let personal = await obtenerPersonalPorIdPorParametro(idpersonal)
    await mail.enviarMail("Se te a asignado un nuevo vuelo", "Hola " + personal[0].nombre + " " + personal[0].apellido + ", se te a hasignado la posicion de " + personal[0].posicion + " para el vuelo con codigo: " + idvuelo).catch(console.error);
    //await mail.enviarMail("Se te a asignado un nuevo vuelo en el cargo de: "+personal[0].posicion, "Hola " + personal[0].nombre + " " + personal[0].apellido + ", se te a asignado el vuelo con codigo: " + idvuelo).catch(console.error);
}

const PermisosTripulacion = async (idvuelo) => {
    var InfoTripulaciones = await daoPersonal.readPermisosPiloto(ConexionEstablecida, idvuelo);
    console.log(InfoTripulaciones)
    if (InfoTripulaciones[0].licenciapiloto && InfoTripulaciones[0].permisosifr && InfoTripulaciones[0].permisosver)
        return true
    else if (InfoTripulaciones[0].licenciapiloto && InfoTripulaciones[0].permisosifr && InfoTripulaciones[0].regladevuelo == 'IFR')
        return true
    else if (InfoTripulaciones[0].licenciapiloto && InfoTripulaciones[0].permisosvfr && InfoTripulaciones[0].regladevuelo == 'VFR')
        return true
    return false
}
async function asignarPersonal(idNuevo, asignados) {
    var valido = true;
    let parientes = await buscarParientes(idNuevo)
    let parientesArray = parientes.map(p => p.personal2_legajo_fk)
    asignados.forEach(a => parientesArray.forEach(
        function (p) {
            if (a === p) {
                valido = false;
            }
        })
    );
    return valido;
}
const buscarParientes = async (idPersonal) => {
    var parientes = await daoParentesco.buscarParientes(ConexionEstablecida, idPersonal);
    return parientes;
}
const obtenerAeronaveModelo = async (iata, modelo, inicio, fin) => {
    var InfoAeronaveModelo = await daoNave.buscarModelo(ConexionEstablecida, iata, modelo, inicio, fin);
    return InfoAeronaveModelo
}
const obtenerAeronaveDisponible = (req, res) => {
    return aeronavedisponible = daoNave.readdisponible(ConexionEstablecida, req, res);
}
const obtenerAeronaves = async (req, res) => {
    var InfoAeronave = await daoNave.read(ConexionEstablecida, req, res);
    return InfoAeronave
}



const obtenerListadoModeloAeronaves = async (fechadespegue, fechaaterrizaje, modelos) => {
    var listado = [];
    if (modelos != null) {
        for (elem of modelos) {
            var InfoAeronave = await daoNave.readPorArray(ConexionEstablecida, elem, fechadespegue, fechaaterrizaje);
            listado = [...listado, ...InfoAeronave]
        }
        return listado
    }
    else {
        return "no hay aeronave"
    }
}


//-------------------------------------------------------------------------------------------------
//---------------- READS DE PLAN DE VUELO ---------------------------------------------------------
//-------------------------------------------------------------------------------------------------

const obtenerVuelos = async (req, res) => {
    var InfoVuelos = await daoPlanVuelo.read(ConexionEstablecida, req, res);
}
const obtenerVuelo = async (body) => {
    var InfoVuelo = await daoPlanVuelo.readCodVuelo(ConexionEstablecida, body);
    return InfoVuelo;
}
const obtenerVuelo2 = async (body, res) => {
    var InfoVuelo = await daoPlanVuelo.readCodVuelo2(ConexionEstablecida, body, res);
}
const obtenerVueloTabla = async (body, req, res) => {
    let InfoVuelocod = await daoPlanVuelo.readTableCod(ConexionEstablecida, body, req, res);
    return InfoVuelocod;
}
const obtenerVuelosConfirmados = async (req, res) => {
    var InfoVuelo = await daoPlanVuelo.readVuelosConfirmados(ConexionEstablecida, req, res);
    return InfoVuelo;
}
const obtenerVueloCancelados = async (req, res) => {
    var InfoVuelo = await daoPlanVuelo.readVuelosCancelados(ConexionEstablecida, req, res);
    return InfoVuelo;
}
const obtenerVuelosFinalizados = async (req, res) => {
    var InfoVuelo = await daoPlanVuelo.readVuelosFinalizados(ConexionEstablecida, req, res);
    return InfoVuelo;
}
const obtenerVuelosOrigenDestino = async (req, res) => {
    var InfoVueloOrigenDestino = await daoPlanVuelo.readOrigenDestino(ConexionEstablecida, req, res);
    return InfoVueloOrigenDestino;
}
const obtenerVueloAOrigen = async (req, res) => {
    var InfoVueloOrigen = await daoPlanVuelo.readAOrigen(ConexionEstablecida, req, res);
    return InfoVueloOrigen;
}
const obtenerVueloADestino = async (req, res) => {
    var InfoVueloDestino = await daoPlanVuelo.readADestino(ConexionEstablecida, req, res);
    return InfoVueloDestino;
}
const obtenerVueloFOrigen = async (req, res) => {
    var InfoVueloFechaOrigen = await daoPlanVuelo.readFechaOrigen(ConexionEstablecida, req, res);
    return InfoVueloFechaOrigen;
}
const obtenerVueloFDestino = async (req, res) => {
    var InfoVueloFechaDestino = await daoPlanVuelo.readFechaDestino(ConexionEstablecida, req, res);
    return InfoVueloFechaDestino;
}
const obtenerVueloPorFiltros = async (req, res) => {
    var InfoVueloFecha = await daoPlanVuelo.readFiltrosVuelo(ConexionEstablecida, req, res);
    return InfoVueloFecha;
}

const obtenerVueloEstado = async (req, res) => {
    var obtenerRutaAlternativa = await daoPlanVuelo.readEstado(ConexionEstablecida, req, res);
    return obtenerRutaAlternativa
}
const obtenerVueloEstadoRango = async (req, res) => {
    var InfoVueloEstadoRango = await daoPlanVuelo.readEstadoRango(ConexionEstablecida, req, res);
    return InfoVueloEstadoRango
}
const obtenerVueloFechaRango = async (req, res) => {
    var InfoVueloFechaRango = await daoPlanVuelo.readFechaRango(ConexionEstablecida, req, res);
    return InfoVueloFechaRango
}
//nuevos filtros

const obtenerVueloAOE = async (req, res) => {
    var InfoVuelo = await daoPlanVuelo.readAOE(ConexionEstablecida, req, res);
    return InfoVuelo
}
const obtenerVueloAOFL = async (req, res) => {
    var InfoVuelo = await daoPlanVuelo.readAOFL(ConexionEstablecida, req, res);
    return InfoVuelo
}
const obtenerVueloAOFS = async (req, res) => {
    var InfoVuelo = await daoPlanVuelo.readAOFS(ConexionEstablecida, req, res);
    return InfoVuelo
}
const obtenerVueloADFL = async (req, res) => {
    var InfoVuelo = await daoPlanVuelo.readADFL(ConexionEstablecida, req, res);
    return InfoVuelo
}
const obtenerVueloADFS = async (req, res) => {
    var InfoVuelo = await daoPlanVuelo.readADFS(ConexionEstablecida, req, res);
    return InfoVuelo
}

const obtenerVueloADE = async (req, res) => {
    var InfoVuelo = await daoPlanVuelo.readADE(ConexionEstablecida, req, res);
    return InfoVuelo
}

const obtenerVueloFSE = async (req, res) => {
    var InfoVuelo = await daoPlanVuelo.readFSE(ConexionEstablecida, req, res);
    return InfoVuelo
}

const obtenerVueloFLE = async (req, res) => {
    var InfoVuelo = await daoPlanVuelo.readFLE(ConexionEstablecida, req, res);
    return InfoVuelo
}

const obtenerVueloRangoEA = async (req, res) => {
    var InfoVuelo = await daoPlanVuelo.readRangoEA(ConexionEstablecida, req, res);
    return InfoVuelo
}

const obtenerVueloRangoEF = async (req, res) => {
    var InfoVuelo = await daoPlanVuelo.readRangoEF(ConexionEstablecida, req, res);
    return InfoVuelo
}
const obtenerVueloRangoAF = async (req, res) => {
    var InfoVuelo = await daoPlanVuelo.readRangoAF(ConexionEstablecida, req, res);
    return InfoVuelo
}

const obtenerVueloRangoAE = async (req, res) => {
    var InfoVuelo = await daoPlanVuelo.readRangoAE(ConexionEstablecida, req, res);
    return InfoVuelo
}
const obtenerVueloRangoAFL = async (req, res) => {
    var InfoVuelo = await daoPlanVuelo.readRangoAFL(ConexionEstablecida, req, res);
    return InfoVuelo
}
const obtenerVueloRangoAFS = async (req, res) => {
    var InfoVuelo = await daoPlanVuelo.readRangoAFS(ConexionEstablecida, req, res);
    return InfoVuelo
}
const obtenerVueloRangoEAO = async (req, res) => {
    var InfoVuelo = await daoPlanVuelo.readRangoEAO(ConexionEstablecida, req, res);
    return InfoVuelo
}
const obtenerVueloRangoEAD = async (req, res) => {
    var InfoVuelo = await daoPlanVuelo.readRangoEAD(ConexionEstablecida, req, res);
    return InfoVuelo
}
const obtenerVueloRangoEFL = async (req, res) => {
    var InfoVuelo = await daoPlanVuelo.readRangoEFL(ConexionEstablecida, req, res);
    return InfoVuelo
}
const obtenerVueloRangoEFS = async (req, res) => {
    var InfoVuelo = await daoPlanVuelo.readRangoEFS(ConexionEstablecida, req, res);
    return InfoVuelo
}
const obtenerVueloRangoFAO = async (req, res) => {
    var InfoVuelo = await daoPlanVuelo.readRangoFAO(ConexionEstablecida, req, res);
    return InfoVuelo
}
const obtenerVueloRangoFAD = async (req, res) => {
    var InfoVuelo = await daoPlanVuelo.readRangoFAD(ConexionEstablecida, req, res);
    return InfoVuelo
}
const obtenerVueloRangoFE = async (req, res) => {
    var InfoVuelo = await daoPlanVuelo.readRangoFE(ConexionEstablecida, req, res);
    return InfoVuelo
}

const obtenerVueloOrigenFSE = async (req, res) => {
    var InfoVuelo = await daoPlanVuelo.readVueloOrigenFSE(ConexionEstablecida, req, res);
    return InfoVuelo
}

const obtenerVueloOrigenFLE = async (req, res) => {
    var InfoVuelo = await daoPlanVuelo.readVueloOrigenFLE(ConexionEstablecida, req, res);
    return InfoVuelo
}

const obtenerVueloDestinoFSE = async (req, res) => {
    var InfoVuelo = await daoPlanVuelo.readVueloDestinoFSE(ConexionEstablecida, req, res);
    return InfoVuelo
}

const obtenerVueloDestinoFLE = async (req, res) => {
    var InfoVuelo = await daoPlanVuelo.readVueloDestinoFLE(ConexionEstablecida, req, res);
    return InfoVuelo
}
const obtenerVueloCinco = async (req, res) => {
    var InfoVuelo = await daoPlanVuelo.readVueloCinco(ConexionEstablecida, req, res);
    return InfoVuelo
}


const obtenerCantVuelosAvionesXRutaFechaRango = async (req, res) => {
    var InfoCantVuelos = await daoPlanVuelo.readVuelosAvionesXRuta(ConexionEstablecida, req, res);
    return InfoCantVuelos
}
const obtenerEstadoVuelo = async (id) => {
    var InfoEstado = await daoPlanVuelo.readEstadoVuelo(ConexionEstablecida, id);
    return InfoEstado
}
const obtenerAeronavePorVuelo = async (req, res) => {
    var InfoAeronavePorVuelo = await daoPlanVuelo.readAeronavePorPlanDeVuelo(ConexionEstablecida, req, res);
    return InfoAeronavePorVuelo
}
const obtenerTripulanteDisponible = async (idvuelo, idpersonal, fechaDespegueEstimada, fechaAterrizajeEstimada) => {
    var tripulante = await daoPlanVuelo.readTripulacionDisponible(ConexionEstablecida, idvuelo, idpersonal, fechaDespegueEstimada, fechaAterrizajeEstimada);
    return tripulante;
}


//-------------------------------------------------------------------------------------------------
//-------------------------- APIS -----------------------------------------------------------------
//-------------------------------------------------------------------------------------------------

const obtenerEmergenciaApi = async (req, res) => {
    var emergencia = await apis.emergencia(ConexionEstablecida, req, res);
}
const obtenerCantInsumos = async (req, res) => {
    try {
        let enviarVuelo = await apis.enviarVueloParaInsumos(req, res);
        console.log("Somos esto", enviarVuelo);
        let insumos = await apis.insumos(ConexionEstablecida, req, res);
        let { idvuelo } = req.body
        for (insumo of insumos) {
            body = {
                "idvuelo": idvuelo,
                "cantidadInicial": insumo.InitialQuantity,
                "cantidadFinal": insumo.FinalQuantity,
                "nombre": insumo.Supply.Name,
                "descripcion": insumo.Supply.Description,
                "pesoIndividual": insumo.Supply.Weight
            }
            console.log(body);
            await daoInsumos.insert(ConexionEstablecida, body, res)
        }
        return insumos
    }
    catch (error) {
        return "error"
    }
}
const obtenerCheckIn = async (req, res) => {
    var checkIn = await apis.checkIn(ConexionEstablecida, req, res);
}
const ObtenerAeropueto = async (codiata) => {
    var Aeropueto = await apis.pedirDatosAeropuerto(codiata);
    return Aeropueto
}
const ObtenerAeropuetoFront = async (codiata) => {
    var Aeropueto = await apis.pedirDatosAeroFront(codiata);
    return Aeropueto;
}
const ObtenerClima = async (codvuelo, latitud, longitud) => {
    var clima = await apis.PerdirClima(ConexionEstablecida, codvuelo, latitud, longitud);
    return clima
}
const obtenerAeronavePorMatricula = async (req, res) => {
    let aux = [];
    let InfoEspecificaAvion = await daoNave.readAeronaveMatricula(ConexionEstablecida, req, res);
    let infoTecnicaAvion = await apis.PerdirInfoModeloAeronave(InfoEspecificaAvion[0].modeloaeronave);
    let listado = { ...InfoEspecificaAvion[0], ...infoTecnicaAvion };
    res.send(listado)
    return listado;
}
const obtenerAeronavePorMatricula2 = async (matricula) => {
    var InfoEspecificaAvion = await daoNave.readAeronaveMatricula2(ConexionEstablecida, matricula);
    var infoTecnicaAvion = await apis.PerdirInfoModeloAeronave(InfoEspecificaAvion[0].modeloaeronave);
    var listado = { ...InfoEspecificaAvion[0], ...infoTecnicaAvion };
    return listado;
}
const obtenerMantenimientoApi = async (req, res) => {
    let mantenimiento = await apis.pedirMantenimiento(ConexionEstablecida, req, res)
}
const obtenerControlCabinaApi = async (req, res) => {
    let enviarVuelo = await apis.enviarVueloParaControl(req, res)
    console.log("control:", enviarVuelo);
    let control = await apis.pedirControlCabina(ConexionEstablecida, req, res);
    console.log("control respuesta:", control);
    return control
}


//-------------------------------------------------------------------------------------------------
//--------------------------- RUTA ALTERNATIVA ----------------------------------------------------
//-------------------------------------------------------------------------------------------------

const obtenerRutaAlternativa = async (req, res) => {
    const { idvuelo, matricula, fechaaterrizajeestimado } = req.body
    let ruta = await apis.pedirRutaAlternativa(req, res).catch(err => console.log("error iata"));
}
const ActualizarVueloFinalizado = async (request, res) => {
    const { idvuelo, rutaReal, DestinoReal_codIATA, fechaaterrizajeestimado, matricula, duracionReal, kilometrajeReal } = request.body
    var VueloFinalizado = await daoPlanVuelo.updateFinalizado(ConexionEstablecida, request, res);
    await añadirAlHistorial(request, res, "Finalizado", false)
    await daoNave.updateKmRecorrido(ConexionEstablecida, kilometrajeReal, matricula)

    let tripulacion = await daoTripulacion.readPorCodVueloPorParametro(ConexionEstablecida, idvuelo)
    if (tripulacion.length > 0) {
        for (elem of tripulacion) {
            await daoPersonal.updateCantidadHoras(ConexionEstablecida, duracionReal, elem.idpersonal_fk)
        }
    }
    await DesasignarTripuAvionRutaRealDiferenteFinalizado(idvuelo, rutaReal, DestinoReal_codIATA, fechaaterrizajeestimado, matricula, duracionReal, tripulacion)

}
const DesasignarTripuAvionRutaRealDiferenteFinalizado = async (idvuelo, rutaReal, DestinoReal_codIATA, fechaaterrizajeestimado, matricula, duracionReal, tripulacion) => {

    let estado = await obtenerEstadoVuelo(idvuelo)
    if (estado[0].rutateorica.replaceAll(" ", "").slice(0, 3) != (rutaReal[0]) || estado[0].rutateorica.replaceAll(" ", "").slice(-3) != rutaReal[rutaReal.length - 1]) {
        await eliminarTripulacionAterrizado(idvuelo, DestinoReal_codIATA, fechaaterrizajeestimado, duracionReal, tripulacion)
        await eliminarNaveAterrizado(matricula, fechaaterrizajeestimado)
        await daoNave.updateIata(ConexionEstablecida, DestinoReal_codIATA, matricula)

    }
}
const eliminarNaveAterrizado = async (matricula, fechaaterrizajeestimado) => {
    let vuelos = await daoPlanVuelo.readVuelosPorFechaMayor(ConexionEstablecida, fechaaterrizajeestimado)
    for (n of vuelos) {
        await daoPlanVuelo.updateMatriculaVacia(ConexionEstablecida, null, n.idvuelo, matricula)
    }
}
const eliminarTripulacionAterrizado = async (idvuelo, DestinoReal_codIATA, fechaaterrizajeestimado, duracionReal, tripulacion) => {
    if (tripulacion.length > 0) {
        for (elem of tripulacion) {
            await daoPersonal.updateIata(ConexionEstablecida, DestinoReal_codIATA, elem.idpersonal_fk)
        }
        let listado = await daoPlanVuelo.readIdVueloPorFechaMayor(ConexionEstablecida, tripulacion[0].idpersonal_fk, fechaaterrizajeestimado)
        for (l of listado) {
            await daoTripulacion.deletePorIdVuelo(ConexionEstablecida, l.idvuelo)
        }
    }
}

//Desasignar tripulacion reprogramado (ejecutar cunado se ejecuta el cambio de ruta) --------------
const obtenerRutaAlternativaReprogramado = async (req, res) => {

    const { idvuelo, matricula, fechaaterrizajeestimado } = req.body
    let ruta = await apis.pedirRutaAlternativa(req, res).catch(err => console.log("error iata"));
    await DesasignarTripuAvionVueloReprogramado(idvuelo, ruta, fechaaterrizajeestimado, matricula).catch(err => console.log("error iata"));


}
const DesasignarTripuAvionVueloReprogramado = async (idvuelo, ruta, fechaaterrizajeestimado, matricula) => {
    await daoPlanVuelo.updateRutaTeoricaReprogramado(ConexionEstablecida, ruta.route[0], ruta.route[ruta.route.length - 1], ruta.route, ruta.combustibleEstimado, ruta.lubricanteEstimado, ruta.distance, ruta.optimalAircrafts, idvuelo)
    await eliminarTripulacionReprogramado(idvuelo, fechaaterrizajeestimado)
    await eliminarNaveReprogramado(matricula, fechaaterrizajeestimado)
}
const eliminarNaveReprogramado = async (matricula, fechaaterrizajeestimado) => {
    let vuelos = await daoPlanVuelo.readVuelosPorFechaMayorIgual(ConexionEstablecida, fechaaterrizajeestimado)
    for (n of vuelos) {
        await daoPlanVuelo.updateMatriculaVacia(ConexionEstablecida, null, n.idvuelo, matricula)
    }
}
const eliminarTripulacionReprogramado = async (idvuelo, fechaaterrizajeestimado) => {
    let tripulacion = await daoTripulacion.readPorCodVueloPorParametro(ConexionEstablecida, idvuelo)
    if (tripulacion.length > 0) {
        let listado = await daoPlanVuelo.readIdVueloPorFechaMayotIgual(ConexionEstablecida, tripulacion[0].idpersonal_fk, fechaaterrizajeestimado)
        for (l of listado) {
            await daoTripulacion.deletePorIdVuelo(ConexionEstablecida, l.idvuelo)
        }
    }
}


//-------------------------------------------------------------------------------------------------
//---------------------------- ACTUALIZAR PLAN DE VUELO -------------------------------------------
//-------------------------------------------------------------------------------------------------

const ActualizarVueloMatricula = async (body, req, res) => {
    var VueloMatricula = await daoPlanVuelo.updateMatricula(ConexionEstablecida, body, req, res);
}
const ActualizarVueloMatriculaManual = async (req, res) => {
    var VueloMatricula = await daoPlanVuelo.updateMatricula2(ConexionEstablecida, req, res);
}
const ActualizarVueloConfirmado = async (req, res) => {
    var VueloConfirmado = await daoPlanVuelo.updateConfirmado(ConexionEstablecida, req, res);
    await añadirAlHistorial(req, res, "Confirmado", false)
}
const ActualizarVueloConfirmadoPorParametro = async (idvuelo) => {
    var VueloConfirmado = await daoPlanVuelo.updateConfirmadoPorParametro(ConexionEstablecida, idvuelo);
}
const ActualizarVueloPreEmbarque = async (req, res) => {
    var VueloPreEmbarque = await daoPlanVuelo.updateEstadoPreEmbarque(ConexionEstablecida, req, res);
    await añadirAlHistorial(req, res, "Pre embarque", false)
}
const ActualizarVueloDespegue = async (req, res) => {
    var VueloDespegue = await daoPlanVuelo.updateDespegue(ConexionEstablecida, req, res);
    await añadirAlHistorial(req, res, "Despegue", false)
}
const ActualizarVueloEnVuelo = async (req, res) => {
    var VueloEnVuelo = await daoPlanVuelo.updateEnVuelo(ConexionEstablecida, req, res);
    await añadirAlHistorial(req, res, "En vuelo", false)
}
const ActualizarVueloAterrizado = async (req, res) => {
    var VueloAterrizado = await daoPlanVuelo.updateAterrizado(ConexionEstablecida, req, res);
    await añadirAlHistorial(req, res, "Aterrizado", false)
}
const ActualizarVueloReProgramado = async (req, res) => {
    var VueloReProgramado = await daoPlanVuelo.updateEstadoReProgramado(ConexionEstablecida, req, res);
    await añadirAlHistorial(req, res, "Reprogramado", false)
}
const ActualizarVueloDemorado = async (req, res) => {
    var VueloDemorado = await daoPlanVuelo.updateDemorado(ConexionEstablecida, req, res);
    await añadirAlHistorial(req, res, "Demorado", false)
}
const ActualizarVueloCancelado = async (req, res) => {
    var VueloCancelado = await daoPlanVuelo.updateCancelado(ConexionEstablecida, req, res);
    await añadirAlHistorial(req, res, "Cancelado", false)
}

const añadirAlHistorial = async (req, res, estadoActual, cambioDeTripulacion) => {
    const hoy = new Date();
    const request = req.body
    console.log(request);
    let vuelo = await obtenerVuelo(request, res);
    let body = {
        idvuelo_fk: vuelo[0].idvuelo,
        estado: estadoActual,
        usuario: request.username,
        fecha_y_hora: hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate() + ' ' + (hoy.getHours() <= 9 ? "0" + hoy.getHours() : hoy.getHours()) + ':' + (hoy.getMinutes() <= 9 ? "0" + hoy.getMinutes() : hoy.getMinutes()),
        cambiotripulacion: cambioDeTripulacion,
        aeronave: vuelo[0].aeronave_matricula_fk
    }
    await insertarAlHistorial(body, res)
}

function subtractTimeFromDate(objDate, intHours) {
    var numberOfMlSeconds = objDate.getTime();
    var addMlSeconds = (intHours * 60) * 60000;
    var newDateObj = new Date(numberOfMlSeconds - addMlSeconds);
    return newDateObj;
}

//-------------------------------------------------------------------------------------------------
//---------------------------- METODOS DE TABLAS --------------------------------------------------
//-------------------------------------------------------------------------------------------------

//Plan de vuelo -----------------------------------------------------------------------------------
const insertarVueloProgramado = (req) => {
    var vueloAInsertar = daoPlanVuelo.insertInicial(ConexionEstablecida, req);
}
const borrarVuelo = (req, res) => {
    var vueloABorrar = daoPlanVuelo.deletee(ConexionEstablecida, req, res);
}
const insertarVuelo = (req, res) => {
    var vueloAInsertar = daoPlanVuelo.insert(ConexionEstablecida, req, res);
}
const insertVueloInicial = async (rutas) => {
    var vueloAInsertar = await daoPlanVuelo.insertInicial(ConexionEstablecida, rutas);
}
const actualizarMatriculaVuelo = async (req, res) => {
    var vueloAActualizar = await daoPlanVuelo.update(ConexionEstablecida, req, res);
}
//Clima -------------------------------------------------------------------------------------------
const obtenerClimaporVuelo = (req, res) => {
    var InfoVuelos = daoClima.read(ConexionEstablecida, req, res);
}
const obtenerClima = (req, res) => {
    var InfoVuelos = daoClima.readId(ConexionEstablecida, req, res);
}
const eliminarClima = (req, res) => {
    let InfoClima = daoClima.deletee(ConexionEstablecida, req, res);
}
const updateClima = (req, res) => {
    let infoClima = daoClima.update(ConexionEstablecida, req, res);
}
const checkclima = async (req, res) => {
    var InfoVuelos = await daoClima.insertarYobtenerClima(ConexionEstablecida, req, res).then(data => data);
    return InfoVuelos;
}
//Emergencias -------------------------------------------------------------------------------------
const obtenerEmergencias = (req, res) => {
    var InfoEmergencias = daoEmergencia.read(ConexionEstablecida, req, res);
}
const obtenerEmergencia = (req, res) => {
    var InfoEmergencias = daoEmergencia.readId(ConexionEstablecida, req, res);
}
const eliminarEmergencia = (req, res) => {
    let InfoEmergencia = daoEmergencia.remove(ConexionEstablecida, req, res);
}
const insertEmergencia = (req, res) => {
    let InfoEmergencia = daoEmergencia.insert(ConexionEstablecida, req, res);
}
const updateEmergencia = (req, res) => {
    let infoEmergencia = daoEmergencia.update(ConexionEstablecida, req, res);
}
//Personal ----------------------------------------------------------------------------------------
const obtenerPersonal = (req, res) => {
    var InfoPersonal = daoPersonal.read(ConexionEstablecida, req, res);
}
const obtenerPersonalPorId = (req, res) => {
    var InfoPersonal = daoPersonal.readId(ConexionEstablecida, req, res);
}
const obtenerPersonalPorIdPorParametro = (id) => {
    var InfoPersonal = daoPersonal.readIdPorParametro(ConexionEstablecida, id);
    return InfoPersonal
}
const eliminarPersonal = (req, res) => {
    var InfoPersonal = daoPersonal.deletee(ConexionEstablecida, req, res);
}
const insertarPersonal = (req, res) => {
    var InfoPersonal = daoPersonal.insert(ConexionEstablecida, req, res);
}
const actualizarPersonal = (req, res) => {
    var InfoPersonal = daoPersonal.update(ConexionEstablecida, req, res);
}
const obtenerDisponiblesPorPosicion = async (aeropuerto, posicion) => {
    var disponibles = await daoPersonal.readDisponiblesPorPosicion(ConexionEstablecida, aeropuerto, posicion);
    return disponibles;
}
//Parentesco --------------------------------------------------------------------------------------
const obtenerParentescos = (req, res) => {
    var InfoParentescos = daoParentesco.read(ConexionEstablecida, req, res);
}
const obtenerParentescosPorId = (req, res) => {
    var InfoParentescos = daoParentesco.readId(ConexionEstablecida, req, res);
}
const eliminarParentescos = (req, res) => {
    var InfoParentescos = daoParentesco.deletee(ConexionEstablecida, req, res);
}
const insertarParentescos = (req, res) => {
    var InfoParentescos = daoParentesco.insert(ConexionEstablecida, req, res);
}
const actualizarParentescos = (req, res) => {
    var InfoParentescos = daoParentesco.update(ConexionEstablecida, req, res);
}
//Usuario -----------------------------------------------------------------------------------------
const obtenerUsuarios = (req, res) => {
    var InfoUsuario = daoUsuario.read(ConexionEstablecida, req, res);
}
const obtenerUsuarioPorId = (req, res) => {
    var InfoUsuario = daoUsuario.readId(ConexionEstablecida, req, res);
}
const eliminarUsuario = (req, res) => {
    var InfoUsuario = daoUsuario.deletee(ConexionEstablecida, req, res);
}
const insertarUsuario = (req, res) => {
    var InfoUsuario = daoUsuario.insert(ConexionEstablecida, req, res);
}
const DatosUsuario = async (req, res) => {
    var InfoUsuario = await daoUsuario.readUserPass(ConexionEstablecida, req, res);
    return InfoUsuario;
}
const actualizarUsuario = async (req, res) => {
    var InfoUsuario = await daoUsuario.update(ConexionEstablecida, req, res);
}
const actualizarContraseña = (username, pass, res) => {
    var InfoUsuario = daoUsuario.updatePass(ConexionEstablecida, username, pass, res);
}
const usuarioExist = async (username) => {
    const result = await daoUsuario.readUser(ConexionEstablecida, username);
    console.log(result.length);
    if (result.length == 0) {
        return false
    }
    return true;
}

//Tripulacion -------------------------------------------------------------------------------------
const obtenerTripulaciones = (req, res) => {
    var InfoTripulaciones = daoTripulacion.read(ConexionEstablecida, req, res);
}
const eliminarTripulacion = (req, res) => {
    var InfoTripulaciones = daoTripulacion.deletee(ConexionEstablecida, req, res);
}
const actualizarTripulacion = (req, res) => {
    var InfoTripulaciones = daoTripulacion.update(ConexionEstablecida, req, res);
}
const obtenerTripulacionPorIdVuelo = async (req, res) => {
    var InfoTripulaciones = await daoTripulacion.readPorCodVuelo(ConexionEstablecida, req, res);
    return InfoTripulaciones;
}
//Compania ----------------------------------------------------------------------------------------
const obtenerCompanias = (req, res) => {
    var InfoCompanias = daoCompania.read(ConexionEstablecida, req, res);
}
const obtenerCompaniaPorId = (req, res) => {
    var InfoCompaniaPorId = daoCompania.readId(ConexionEstablecida, req, res);
}
const borrarCompania = (req, res) => {
    var companiaABorrar = daoCompania.deletee(ConexionEstablecida, req, res);
}
const insertarCompania = (req, res) => {
    var companiaAInsertar = daoCompania.insert(ConexionEstablecida, req, res);
}
const actualizarCompania = (req, res) => {
    var companiaAActualizar = daoCompania.update(ConexionEstablecida, req, res);
}
//Naves -------------------------------------------------------------------------------------------
const obtenerAeronave = (req, res) => {
    var InfoAeronave = daoNave.readId(ConexionEstablecida, req, res);
}
const borrarAeronave = (req, res) => {
    var aeronaveABorrar = daoNave.deletee(ConexionEstablecida, req, res);
}
const actualizarAeronave = (req, res) => {
    var aeronaveAActualizar = daoNave.update(ConexionEstablecida, req, res);
}
const insertarAeronave = (req, res) => {
    var aeronaveAInsertar = daoNave.insert(ConexionEstablecida, req, res);
}
//Mantenimiento -----------------------------------------------------------------------------------
const obtenerMantenimiento = (req, res) => {
    var InfoMantenimiento = daoMantenimiento.read(ConexionEstablecida, req, res);
}
const obtenerMantenimientoID = (req, res) => {
    var InfoMantenimientoID = daoMantenimiento.readId(ConexionEstablecida, req, res);
}
const borrarMantenimiento = (req, res) => {
    var mantenimientoABorrar = daoMantenimiento.deletee(ConexionEstablecida, req, res);
}
const actualizarMantenimiento = (req, res) => {
    var mantenimientoAActualizar = daoMantenimiento.update(ConexionEstablecida, req, res);
}
const insertarMantenimiento = (req, res) => {
    var mantenimientoAInsertar = daoMantenimiento.insert(ConexionEstablecida, req, res);
}
//Disponibilidad ----------------------------------------------------------------------------------
const obtenerDisponibilidad = (req, res) => {
    var InfoDisponibilidad = daoDisponibilidad.read(ConexionEstablecida, req, res);
}
const obtenerDisponibilidadID = (req, res) => {
    var InfoDisponibilidadID = daoDisponibilidad.readId(ConexionEstablecida, req, res);
}
const borrarDisponibilidad = (req, res) => {
    var disponibilidadABorrar = daoDisponibilidad.deletee(ConexionEstablecida, req, res);
}
const actualizarDisponibilidad = (req, res) => {
    var disponibilidadAActualizar = daoDisponibilidad.update(ConexionEstablecida, req, res);
}
const insertarDisponibilidad = (req, res) => {
    var disponibilidadAInsertar = daoDisponibilidad.insert(ConexionEstablecida, req, res);
}
const obtenerDisponibilidadPersonalFecha = async (idPersonal, fechaDespegueEstimada, fechaAterrizajeEstimada) => {
    var result = await daoDisponibilidad.readPersonalFecha(ConexionEstablecida, idPersonal, fechaDespegueEstimada, fechaAterrizajeEstimada);
    return result;
}
//Solicitud cambio contraseña----------------------------------------------------------------------
const obtenerSolicitudes = async (req, res) => {
    var pendientes = await daoSolicitud.readautorizadas(ConexionEstablecida, req, res);
    return pendientes;
}
const obtenerSolicitud = async (idsolicitud) => {
    return await daoSolicitud.readId(ConexionEstablecida, idsolicitud);
}
const verificarCodigo = async (req, res) => {
    var solicitud = await daoSolicitud.readUserYCodigo(ConexionEstablecida, req, res);
    return solicitud
}
const actualizarEstadoSolicitud = async (estado, id) => {
    await daoSolicitud.updateEstado(ConexionEstablecida, estado, id);
}
const actualizarCodVerificar = async (boolean, id, res) => {
    await daoSolicitud.updateCodVerificar(ConexionEstablecida, boolean, id, res);
}
const actualizarNuevaPass = async (req, res) => {
    let pass = await daoSolicitud.updateNuevaContraseña(ConexionEstablecida, req, res);
}
const insertarSolicitud = (req, mail, codigoVerifcacion) => {
    var solicitud = daoSolicitud.insert(ConexionEstablecida, req, mail, codigoVerifcacion);
}
const solicitarMailUsuario = async (req, res) => {
    return await daoSolicitud.readMail(ConexionEstablecida, req, res);
}
const deleteSolicitudesPrevias = async (req, res) => {
    await daoSolicitud.deletexUsername(ConexionEstablecida, req, res);
}
//Historial ---------------------------------------------------------------------------------------
const obtenerHistorial = async (req, res) => {
    await daoHistorial.read(ConexionEstablecida, req, res);
}
const obtenerHistorialPorIdVuelo = async (req, res) => {
    return await daoHistorial.readId(ConexionEstablecida, req, res);
}
const insertarAlHistorial = async (req, res) => {
    await daoHistorial.insert(ConexionEstablecida, req, res);
}
const actualizarElHistorial = async (req, res) => {
    await daoHistorial.updateTripulacion(ConexionEstablecida, req, res);
}
const borrarDelHistorial = async (req, res) => {
    await daoHistorial.deletee(ConexionEstablecida, req, res);
}
//Enviar mail---------------------------------------------------------------------------------------
const enviarReporte = async (req, res) => {
    const { reporte, link } = req.body
    await mail.enviarMail("Se te a enviardo un reporte de: " + reporte, "Hola, a continuacion se adjunta el link del reportes: " + link).catch(console.error);
    res.status(200).send("se envio");
}

module.exports = {
    ObtenerClima, ObtenerAeropueto, obtenerAeronavePorMatricula, enviarReporte,
    obtenerCheckIn, actualizarContraseña, deleteSolicitudesPrevias, solicitarMailUsuario,
    ActualizarVueloConfirmado, insertarSolicitud, actualizarNuevaPass, actualizarCodVerificar,
    ActualizarVueloConfirmadoPorParametro, actualizarEstadoSolicitud, obtenerHistorialPorIdVuelo,
    ActualizarVueloPreEmbarque, verificarCodigo, obtenerSolicitudes, insertarAlHistorial,
    ActualizarVueloFinalizado, obtenerSolicitud, obtenerHistorial, actualizarElHistorial,
    ActualizarVueloReProgramado, borrarDelHistorial,
    ActualizarVueloDespegue,
    ActualizarVueloEnVuelo,
    ActualizarVueloAterrizado,
    obtenerCantInsumos,
    ActualizarVueloDemorado,
    ActualizarVueloCancelado,
    ActualizarVueloMatricula,
    obtenerVuelosConfirmados,
    obtenerVueloCancelados,
    obtenerVuelosFinalizados,
    obtenerClimaporVuelo,
    obtenerCantVuelosAvionesXRutaFechaRango,
    obtenerClima,
    eliminarClima,
    updateClima,
    obtenerEmergencias,
    obtenerEmergencia,
    insertEmergencia,
    eliminarEmergencia,
    updateEmergencia,
    obtenerVuelos,
    obtenerVuelo,
    obtenerVuelo2,
    obtenerVueloTabla,
    obtenerVuelosOrigenDestino,
    obtenerAeronavePorVuelo,
    obtenerVueloAOrigen,
    obtenerVueloADestino,
    obtenerVueloFOrigen,
    obtenerVueloFDestino,
    obtenerVueloPorFiltros,
    obtenerVueloEstado,
    obtenerVueloEstadoRango, asignarTripulacionAutom,
    obtenerVueloFechaRango, asignarTripulacionManual,
    borrarVuelo,
    insertarVuelo,
    insertVueloInicial,
    obtenerPersonal,
    obtenerPersonalPorId,
    insertarPersonal,
    eliminarPersonal,
    actualizarPersonal,
    obtenerParentescos,
    obtenerParentescosPorId, obtenerListadoModeloAeronaves,
    insertarParentescos,
    eliminarParentescos,
    actualizarParentescos,
    obtenerUsuarios,
    obtenerUsuarioPorId,
    insertarUsuario,
    eliminarUsuario,
    actualizarUsuario,
    obtenerTripulaciones,
    obtenerTripulacionPorIdVuelo,
    eliminarTripulacion,
    insertarTripulacion,
    actualizarTripulacion,
    obtenerCompanias,
    obtenerCompaniaPorId,
    borrarCompania,
    insertarCompania, obtenerRutaAlternativaReprogramado,
    actualizarCompania,
    ActualizarVueloMatriculaManual,
    obtenerAeronaves,
    obtenerAeronave, obtenerInfoAeronaves,
    actualizarAeronave,
    insertarAeronave, obtenerUsuariosPersonal, ObtenerVuelosPorTripulante,
    borrarAeronave, actualizarMatriculaVuelo,
    obtenerMantenimiento,
    obtenerMantenimientoID,
    borrarMantenimiento,
    actualizarMantenimiento,
    insertarMantenimiento,
    obtenerDisponibilidad,
    obtenerDisponibilidadID,
    borrarDisponibilidad,
    actualizarDisponibilidad,
    insertarDisponibilidad,
    obtenerDisponibilidadPersonalFecha,
    DatosUsuario, insertarVueloProgramado,
    checkclima, usuarioExist,
    obtenerAeronaveModelo,
    obtenerAeronaveDisponible,
    asignarPersonal,
    obtenerEmergenciaApi, IngresarTripulante,
    obtenerMantenimientoApi,
    obtenerControlCabinaApi, eliminarTripulacionReprogramado,
    obtenerRutaAlternativa, DesasignarTripuAvionVueloReprogramado,
    obtenerDisponiblesPorPosicion,
    obtenerTripulanteDisponible, eliminarNaveReprogramado,
    obtenerAeronavePorMatricula2, actualizarIataPersonal, actualizarIataAeronave, PermisosTripulacion, ObtenerAeropuetoFront,
    obtenerVueloAOE,
    obtenerVueloAOFL,
    obtenerVueloAOFS,
    obtenerVueloADFS,
    obtenerVueloADFL,
    obtenerVueloADE,
    obtenerVueloFSE,
    obtenerVueloFLE,
    obtenerVueloRangoEA, obtenerVueloRangoAF, obtenerVueloRangoEF,
    obtenerVueloOrigenFSE,
    obtenerVueloOrigenFLE,
    obtenerVueloDestinoFSE,
    obtenerVueloDestinoFLE,
    obtenerVueloDestinoFSE,
    obtenerVueloCinco,
    obtenerVueloRangoAE, obtenerVueloRangoAFL, obtenerVueloRangoAFS, obtenerVueloRangoEAO,
    obtenerVueloRangoEAD, obtenerVueloRangoEFL, obtenerVueloRangoEFS, obtenerVueloRangoFAO,
    obtenerVueloRangoFAD, obtenerVueloRangoFE, AvisarControles, AvisarInsumos, DarCantInsumos

};
