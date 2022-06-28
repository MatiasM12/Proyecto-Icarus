const modelo = require("./backModelo/modelo");
const apis = require("./back conexionAPIS/ConexionAPIS.js");
const creadorPlanVuelos = require("./back creadorPlanVuelo/CreadorPlanVuelo");
const bodyParser = require('body-parser')
const port = 3010
const express = require("express");
const app = express();
const cors = require('cors');;
var cron = require('node-cron');
const mailer = require("./mail")


/*
app.post("/avisoInsumos", async (req, res) => {
    let obtenerClimaXID = await modelo.AvisarInsumos(req, res)
})
app.post("/avisoControl", async (req, res) => {
    let obtenerClimaXID = await modelo.AvisarControles(req, res)
})
IngresoInsumosFinalizado
*/
//-------------------------------------------------------------------------------------------------
//login -------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
app.use('/', express.static('public'));
app.post("/auth", async (req, res) => {
    let DatosQueryUser = await modelo.DatosUsuario(req, res);
    return DatosQueryUser
})

//-------------------------------------------------------------------------------------------------
// cambio de contraseña ---------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------

app.post("/cod-verificacion", async (req, res) => {
    let { username } = req.body;
    const ExisteUsuario = await modelo.usuarioExist(username)
    if (!ExisteUsuario) {
        res.status(200).send("No existe el usuario especificado")
    } else {
        const random = Math.round(Math.random() * 999999);
        const mail = await modelo.solicitarMailUsuario(req, res);
        await mailer.enviarMail("Solicitados cambio de contraseña", "Hola " + username + " tu codigo de recuperacion es: " + random);
        //insert en la tabla solicitud con legajo, usuario, mail y el random
        await modelo.insertarSolicitud(req, mail[0].mail, random);
        res.status(200).send("Se envio el codigo de verificacion a la casilla de correo " + mail[0].mail)
    }
})
app.post("/verificar-cod", async (req, res) => {
    //verificar si existe el codigo en la tabla para el username en la tabla solicitud
    let solicitud = await modelo.verificarCodigo(req, res)
    if (solicitud.length > 0) {
        await modelo.actualizarCodVerificar(true, solicitud[0].idsolicitud, res)
        res.status(200).send(JSON.stringify({ "cod": solicitud[0].idsolicitud, "verificacion": true }))
    }
    else {
        res.status(200).send(JSON.stringify({ "verificacion": false }))
    }
    //update tabla estado=pendiente;
    // const id = queryQue trae el id de la tupla generada;

})

app.post("/solicitar-nueva-contra", async (req, res) => {
    let { username, idsolicitud, nuevaContraseña } = req.body
    //update tabla solicitud nueva_pass=nuevaContraseña
    const hoy = new Date();
    let body = {
        pass: nuevaContraseña,
        id: idsolicitud,
        fecha: hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate()
    }
    await modelo.actualizarNuevaPass(body, res)
    await modelo.actualizarEstadoSolicitud("autorizado", idsolicitud)
    await modelo.actualizarContraseña(username, body.pass, res)
    await mailer.enviarMail("Nueva solicitud cambio de contraseña", "Hola, el usuario " + username + " cambio su contraseña a : " + body.pass).catch(console.error);
    //res.status(200).send("Se actualizo la nueva contraseña de id :" + body.id )
})

app.get("/solicitudes-autorizadas", async (req, res) => {
    return await modelo.obtenerSolicitudes(req, res);
})




//-------------------------------------------------------------------------------------------------
//url vuelo ---------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------

app.get("/vuelos", async (req, res) => {
    let vuelosinfo = await modelo.obtenerVuelos(req, res)
})
app.get("/InfoUsuariosPersonal", async (req, res) => {
    let vuelosinfo = await modelo.obtenerUsuariosPersonal(req, res)
})
app.post("/VuelosPorTripulante", async (req, res) => {
    let vuelosinfo = await modelo.ObtenerVuelosPorTripulante(req, res)
})

app.post("/obtenerPlanVuelo", async (req, res) => {
    var body = req.body;
    let obtenerVuelo = await modelo.obtenerVuelo(body)
    res.send(obtenerVuelo)
    return obtenerVuelo;
})
app.post("/obtenerPlanVueloRes", async (req, res) => {
    var body = req.body;
    let obtenerVuelo = await modelo.obtenerVuelo2(body, res)
})
app.get("/vuelosConfirmados", async (req, res) => {
    let vuelosinfo = await modelo.obtenerVuelosConfirmados(req, res)
    return vuelosinfo;
})
app.get("/vuelosCancelados", async (req, res) => {
    let vuelosinfo = await modelo.obtenerVueloCancelados(req, res)
    return vuelosinfo;
})
app.get("/vuelosFinalizados", async (req, res) => {
    let vuelosinfo = await modelo.obtenerVuelosFinalizados(req, res)
    return vuelosinfo;
})
app.post("/vuelosOrigenDestino", async (req, res) => {
    let vuelosOrigenDestino = await modelo.obtenerVuelosOrigenDestino(req, res).then(data => data)
    return vuelosOrigenDestino;
})
app.post("/vuelosFechaRango", async (req, res) => {
    let vuelosRangoF = await modelo.obtenerVueloFechaRango(req, res).then(data => data)
    return vuelosRangoF
})
app.post("/vuelosEstadoRango", async (req, res) => {
    let vuelosRango = await modelo.obtenerVueloEstadoRango(req, res).then(data => data)
    return vuelosRango
})
app.post("/vuelosPorFiltro", async (req, res) => {
    let filtrosVuelo = await modelo.obtenerVueloPorFiltros(req, res).then(data => data)
    return filtrosVuelo;
})
app.post("/vuelosPorFiltroDestino", async (req, res) => {
    let filtrosVuelo = await modelo.obtenerVueloADestino(req, res).then(data => data)
    return filtrosVuelo;
})
app.post("/vuelosPorFiltroOrigen", async (req, res) => {
    let filtrosVuelo = await modelo.obtenerVueloAOrigen(req, res).then(data => data)
    return filtrosVuelo;
})
app.post("/vuelosPorFiltroFDestino", async (req, res) => {
    let filtrosVuelo = await modelo.obtenerVueloFDestino(req, res).then(data => data)
    return filtrosVuelo;
})
app.post("/vuelosPorFiltroFOrigen", async (req, res) => {
    let filtrosVuelo = await modelo.obtenerVueloFOrigen(req, res).then(data => data)
    return filtrosVuelo;
})
app.get("/infoAeronaves", async (req, res) => {
    let InfoAeronave = await modelo.obtenerInfoAeronaves(req, res)
    return InfoAeronave
})

//nuevos filtros

app.post("/filtroEstado", async (req, res) => {
    let filtrosVuelo = await modelo.obtenerVueloEstado(req, res).then(data => data)
    return filtrosVuelo;
})

app.post("/filtroAOE", async (req, res) => {
    let filtrosVuelo = await modelo.obtenerVueloAOE(req, res).then(data => data)
    return filtrosVuelo;
})
app.post("/filtroAOFL", async (req, res) => {
    let filtrosVuelo = await modelo.obtenerVueloAOFL(req, res).then(data => data)
    return filtrosVuelo;
})
app.post("/filtroAOFS", async (req, res) => {
    let filtrosVuelo = await modelo.obtenerVueloAOFS(req, res).then(data => data)
    return filtrosVuelo;
})
app.post("/filtroADFS", async (req, res) => {
    let filtrosVuelo = await modelo.obtenerVueloADFS(req, res).then(data => data)
    return filtrosVuelo;
})
app.post("/filtroADFL", async (req, res) => {
    let filtrosVuelo = await modelo.obtenerVueloADFL(req, res).then(data => data)
    return filtrosVuelo;
})
app.post("/filtroADE", async (req, res) => {
    let filtrosVuelo = await modelo.obtenerVueloADE(req, res).then(data => data)
    return filtrosVuelo;
})
app.post("/filtroFSE", async (req, res) => {
    let filtrosVuelo = await modelo.obtenerVueloFSE(req, res).then(data => data)
    return filtrosVuelo;
})
app.post("/filtroFLE", async (req, res) => {
    let filtrosVuelo = await modelo.obtenerVueloFLE(req, res).then(data => data)
    return filtrosVuelo;
})
app.post("/filtroRangoEA", async (req, res) => {
    let filtrosVuelo = await modelo.obtenerVueloRangoEA(req, res).then(data => data)
    return filtrosVuelo;
})
app.post("/filtroRangoEF", async (req, res) => {
    let filtrosVuelo = await modelo.obtenerVueloRangoEF(req, res).then(data => data)
    return filtrosVuelo;
})
app.post("/filtroRangoAF", async (req, res) => {
    let filtrosVuelo = await modelo.obtenerVueloRangoAF(req, res).then(data => data)
    return filtrosVuelo;
})
app.post("/filtroRangoAE", async (req, res) => {
    let filtrosVuelo = await modelo.obtenerVueloRangoAE(req, res).then(data => data)
    return filtrosVuelo;
})
app.post("/filtroRangoAFL", async (req, res) => {
    let filtrosVuelo = await modelo.obtenerVueloRangoAFL(req, res).then(data => data)
    return filtrosVuelo;
})
app.post("/filtroRangoAFS", async (req, res) => {
    let filtrosVuelo = await modelo.obtenerVueloRangoAFS(req, res).then(data => data)
    return filtrosVuelo;
})
app.post("/filtroRangoEAO", async (req, res) => {
    let filtrosVuelo = await modelo.obtenerVueloRangoEAO(req, res).then(data => data)
    return filtrosVuelo;
})
app.post("/filtroRangoEAD", async (req, res) => {
    let filtrosVuelo = await modelo.obtenerVueloRangoEAD(req, res).then(data => data)
    return filtrosVuelo;
})
app.post("/filtroRangoEFS", async (req, res) => {
    let filtrosVuelo = await modelo.obtenerVueloRangoEFS(req, res).then(data => data)
    return filtrosVuelo;
})
app.post("/filtroRangoEFL", async (req, res) => {
    let filtrosVuelo = await modelo.obtenerVueloRangoEFL(req, res).then(data => data)
    return filtrosVuelo;
})
app.post("/filtroRangoFAO", async (req, res) => {
    let filtrosVuelo = await modelo.obtenerVueloRangoFAO(req, res).then(data => data)
    return filtrosVuelo;
})
app.post("/filtroRangoFAD", async (req, res) => {
    let filtrosVuelo = await modelo.obtenerVueloRangoFAD(req, res).then(data => data)
    return filtrosVuelo;
})
app.post("/filtroRangoFE", async (req, res) => {
    let filtrosVuelo = await modelo.obtenerVueloRangoFE(req, res).then(data => data)
    return filtrosVuelo;
})
app.post("/filtroAOrigenFSE", async (req, res) => {
    let filtrosVuelo = await modelo.obtenerVueloOrigenFSE(req, res).then(data => data)
    return filtrosVuelo;
})
app.post("/filtroAOrigenFLE", async (req, res) => {
    let filtrosVuelo = await modelo.obtenerVueloOrigenFLE(req, res).then(data => data)
    return filtrosVuelo;
})
app.post("/filtroADestinoFSE", async (req, res) => {
    let filtrosVuelo = await modelo.obtenerVueloDestinoFSE(req, res).then(data => data)
    return filtrosVuelo;
})
app.post("/filtroADestinoFLE", async (req, res) => {
    let filtrosVuelo = await modelo.obtenerVueloDestinoFLE(req, res).then(data => data)
    return filtrosVuelo;
})
app.post("/filtroCinco", async (req, res) => {
    let filtrosVuelo = await modelo.obtenerVueloCinco(req, res).then(data => data)
    return filtrosVuelo;
})



//-------------------------------------------------------------------------------------------------
//url tablas --------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------

app.get("/rutasTransitadasXModelo", async (req, res) => {
    let vuelosinfo = await modelo.obtenerCantVuelosAvionesXRutaFechaRango(req, res)
    return vuelosinfo;
})
app.post("/tripulacionPorIdVuelo", async (req, res) => {
    let checkTripulacion = await modelo.obtenerTripulacionPorIdVuelo(req, res).then(data => data)
    return checkTripulacion;
})
app.post("/aeronavePorMatricula", async (req, res) => {
    let InfoAeronave = await modelo.obtenerAeronavePorMatricula(req, res)
    return InfoAeronave
})
app.post("url-mantenieminto", async (req, res) => {
    let filtrosVuelo = await modelo.obtenerVueloPorFiltros(req, res).then(data => data)
    return filtrosVuelo;
})
app.post("url-emergencia", async (req, res) => {
    let filtrosVuelo = await modelo.obtenerVueloPorFiltros(req, res).then(data => data)
    return filtrosVuelo;
})

//-------------------------------------------------------------------------------------------------
//automatizacion del algoritmo --------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
//configurar hora +3 para q funcione en heroku
cron.schedule('0 45 21 * * *', async () => {
    await creadorPlanVuelos.crearPlanesDeVuelo();

});

app.get("/c", async (req, res) => {
    let control = await creadorPlanVuelos.crearPlanesDeVuelo()
    res.status(200).send(control)
    return control
})
app.get("/c1", async (req, res) => {
    let control = await creadorPlanVuelos.crearPlanesDeVueloDiaAyer()
    res.status(200).send(control)
    return control
})

app.get("/c2", async (req, res) => {
    let control = await creadorPlanVuelos.crearPlanesDeVueloDiaAntesAyer()
    res.status(200).send(control)
    return control

})

//-------------------------------------------------------------------------------------------------
//interaccion programdo ---------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
app.post("/ListadoaeronavesManual", async (req, res) => {
    var idvuelo = req.body;
    let infoModelosvuelo = await modelo.obtenerVuelo(idvuelo)
    console.log(req.body);
    let InfoAeronave = await modelo.obtenerListadoModeloAeronaves(infoModelosvuelo[0].fechadespegueestimado, infoModelosvuelo[0].fechaaterrizajeestimado, infoModelosvuelo[0].aeronavesposibles)
    res.send(InfoAeronave)
    return InfoAeronave
})
app.put("/IngresoAeronaveManual", async (req, res) => {
    let ingresarMatircula = await modelo.ActualizarVueloMatriculaManual(req, res)
})
app.post("/personal", async (req, res) => {
    auxbody = req.body
    let personal = await modelo.asignarTripulacionManual(auxbody)
    res.status(200).send(personal)
})
app.post("/IngresoTripulante", async (req, res) => {
    let personal = await modelo.IngresarTripulante(req, res)
    res.status(200).send(personal)
})
app.get("/aeronaves", async (req, res) => {
    let InfoAeronave = await modelo.obtenerAeronaves(req, res)
    return InfoAeronave
})
//-------------------------------------------------------------------------------------------------
//interaccion confirmado. -------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
app.post("/getpermisosTripulacion", async (req, res) => {
    let { idvuelo } = req.body
    let InfoAeronave = await modelo.PermisosTripulacion(idvuelo)
    res.status(200).send(InfoAeronave)
})
app.put("/mantenimiento", async (req, res) => {
    let mantenimiento = await modelo.obtenerMantenimientoApi(req, res)
})
app.put("/actualizarVueloConfirmado", async (req, res) => {
    let updateConfirmado = await modelo.ActualizarVueloConfirmado(req, res)
})
//-------------------------------------------------------------------------------------------------
//interacciones preembarque -----------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
app.post("/tomarInsumos", async (req, res) => {
    return insumos = await modelo.obtenerCantInsumos(req, res);
})
app.post("/controlCabina", async (req, res) => {
    let control = await modelo.obtenerControlCabinaApi(req, res)
})
app.post("/Checkin", async (req, res) => {
    let check = await modelo.obtenerCheckIn(req, res)
})
app.post("/Checkclima", async (req, res) => {
    try {
        Json = req.body
        let obtenerAeropuerto = await modelo.ObtenerAeropueto(Json.destinoTeoricaIata)
        let Clima = await modelo.ObtenerClima(Json.idvuelo, obtenerAeropuerto.lat, obtenerAeropuerto.lon)
        res.send(Clima)
    }
    catch (err) {
        res.send(null)
    }
})
app.put("/actualizarVueloPreEmbarque", async (req, res) => {
    let updatePreEmbarque = await modelo.ActualizarVueloPreEmbarque(req, res)
})
app.post("/obtenerClima", async (req, res) => {
    let obtenerClimaXID = modelo.obtenerClima(req, res)
})


//-------------------------------------------------------------------------------------------------
//interaccion despegue ----------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
app.put("/actualizarVueloDespegue", async (req, res) => {
    let updateEnVuelo = await modelo.ActualizarVueloDespegue(req, res)
})
//-------------------------------------------------------------------------------------------------
//interaccion en vuelo ----------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
app.put("/actualizarEstadoEnVuelo", async (req, res) => {
    let updateEnVuelo = await modelo.ActualizarVueloEnVuelo(req, res)
})
//-------------------------------------------------------------------------------------------------
//interaccion aterrizado --------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
app.post("/pedirEmergencias", async (req, res) => {
    let emergencia = await modelo.obtenerEmergenciaApi(req, res)
})
app.put("/InformarCargaDestino", async (req, res) => {
    apis.actualizarCargaDestino(req, res)
})
app.post("/enviarInsumos", async (req, res) => {
    // insumos() preguntar 
})
app.put("/actualizarVueloAterrizado", async (req, res) => {
    let updateAterrizado = await modelo.ActualizarVueloAterrizado(req, res)
})
//-------------------------------------------------------------------------------------------------
//interaccion finalizado --------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
app.put("/actualizarVueloFinalizado", async (req, res) => {
    console.log(req.body)
    let updateFinalizado = await modelo.ActualizarVueloFinalizado(req, res)
})
app.post("/rutaAlternativa", async (req, res) => {
    let ruta = await modelo.obtenerRutaAlternativa(req, res).catch(err => console.log("error iata"))
})
//-------------------------------------------------------------------------------------------------
//interaccion reprograma --------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
app.post("/rutaAlternativaReprogramar", async (req, res) => {

    let ruta = await modelo.obtenerRutaAlternativaReprogramado(req, res).catch(err => console.log("error iata"))

})

app.post("/ListadoAeronavesReprogramado", async (req, res) => {
    auxbody = req.body
    await modelo.eliminarTripulacionReprogramado(auxbody.idvuelo, auxbody.fechaaterrizajeestimado)
    await modelo.eliminarNaveReprogramado(auxbody.matricula, auxbody.fechaaterrizajeestimado)
    let infoModelosvuelo = await modelo.obtenerVuelo(auxbody)
    let InfoAeronave = await modelo.obtenerListadoModeloAeronaves(infoModelosvuelo[0].fechadespegueestimado, infoModelosvuelo[0].fechaaterrizajeestimado, infoModelosvuelo[0].aeronavesposibles)
    res.send(InfoAeronave)
    return InfoAeronave
})
app.get("/aeronaves", async (req, res) => {
    let InfoAeronave = await modelo.obtenerAeronaves(req, res)
    return InfoAeronave
})
app.put("/actualizarReprogramado", async (req, res) => {
    let updateReProgramado = await modelo.ActualizarVueloReProgramado(req, res)
})
//-------------------------------------------------------------------------------------------------
//interacion demorado -----------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
app.put("/actualizarVueloDemorado", async (req, res) => {
    let updateDemorado = await modelo.ActualizarVueloDemorado(req, res)
})
//-------------------------------------------------------------------------------------------------
//interaccion cancelo -----------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
app.put("/actualizarVueloCancelado", async (req, res) => {
    let updateDemorado = await modelo.ActualizarVueloCancelado(req, res)
})


//-------------------------------------------------------------------------------------------------
//historial ---------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
app.post("/obtenerHistorial", async (req, res) => {
    let historial = await modelo.obtenerHistorialPorIdVuelo(req, res)

    return historial

})
app.put("/actualizarCambioDeTripulacion", async (req, res) => {
    let updateHistorial = await modelo.actualizarElHistorial(req, res)
})


//-------------------------------------------------------------------------------------------------
//crear plan de vuelo -----------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------

app.post("/obtenerAeropuerto", async (req, res) => {
    var { codiata } = req.body;

    console.log(codiata)

    let obtenerAeropuerto = await modelo.ObtenerAeropuetoFront(codiata)

    console.log(obtenerAeropuerto)

    res.status(200).send(obtenerAeropuerto)
})

//-------------------------------------------------------------------------------------------------
//enviar mail  ------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
app.post("/enviarReporte", async (req, res) => {
    await modelo.enviarReporte(req, res)
})



app.listen(port, function () {
    // process.env.TZ = "UTC-3";
    console.log('Aplicación ejemplo, escuchando el puerto', port);
});



