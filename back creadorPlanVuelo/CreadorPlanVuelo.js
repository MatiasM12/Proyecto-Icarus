const express = require('express');
const fetch = require('cross-fetch');
const { route } = require('express/lib/application');
const { json } = require('express/lib/response');
const rutas = require('../back conexionAPIS/ConexionAPIS');
const modelo = require('../backModelo/modelo');



const diaActualMasSiete = () => { //08-6-2022
    var dia = new Date();
    //var diaActual=('0'+dia.getDate()).slice(-2)+'-'+('0'+dia.getMonth()).slice(-2)+'-'+dia.getFullYear();   
    dia.setDate(dia.getDate() + 7);
    var diaMasSiete = ('0' + dia.getDate()).slice(-2) + '-' + ('0' + (dia.getMonth() + 1)).slice(-2) + '-' + dia.getFullYear(); //dd-mm-aaaa
    // var diaMasSiete = (dia.getFullYear()+'-'+('0'+(dia.getMonth()+1)).slice(-2)+'-'+('0'+dia.getDate()).slice(-2)); //aaaa-mm-dd
    console.log(diaMasSiete);
    return diaMasSiete;
}

const crearPKHoraFecha = (codvuelo, fecha, hora) => {
    const date = new Date(fecha)
    const date2 = new Date("2022-03-10T" + hora + ":00.000+00:00");
    date.setHours(date2.getHours(), date2.getMinutes())
    return codvuelo + "-" + date.toISOString();

}

const pedirRuta = async (fecha) => {
    const ejemplo = await
        //fetch('https://grops-backend-dnj2km2huq-rj.a.run.app/flight/getAll')
        fetch('https://grops-backend-dnj2km2huq-rj.a.run.app/flight/getByDate?date=' + fecha)
            .then(response => response.json());
    console.log(ejemplo);
    return ejemplo;
}

async function crearPlanesDeVuelo() {

    const rutasJson = await pedirRuta(diaActualMasSiete());
    let index = 0;
    for (r of rutasJson) {
        await crearPlanVuelo(r);
    };

}

function TiempoEntreDias(DiaDespegue, horaDespegue, diaAterrizaje, horaAterrizaje) {
    const dia = new Date(DiaDespegue.slice(0, 10) + " " + horaDespegue)
    const dia2 = new Date(diaAterrizaje.slice(0, 10) + " " + horaAterrizaje)
    console.log(dia)
    console.log(dia2)
    var segundos = (dia2 - dia) / 1000
    if ((segundos / 60 / 60) < 10 && (segundos / 60 % 60) < 10) {
        return "0" + (Number.parseInt(segundos / 60 / 60)) + ":0" + segundos / 60 % 60
    }
    else if (segundos / 60 / 60 < 10) {
        return "0" + (Number.parseInt(segundos / 60 / 60)) + ":" + segundos / 60 % 60
    }
    else if (segundos / 60 % 60 < 10) {
        return (Number.parseInt(segundos / 60 / 60)) + ":0" + segundos / 60 % 60
    }
    else {
        return (Number.parseInt(segundos / 60 / 60)) + ":" + segundos / 60 % 60
    }
};

async function crearPlanVuelo(ruta) {

    const data = {

        "idVuelo": ruta.code,
        "codVuelo": ruta.routeCode,
        "Aeronave_matricula_fk": null,
        "OrigenTeorico_codIATA": ruta.origin,
        "OrigenReal_codIATA": null,
        "DestinoTeorico_codIATA": ruta.destination,
        "DestinoReal_codIATA": null,
        "nombreCompania": ruta.company,
        "idEstados_fk": 1,
        "rutaTeorica": ruta.route.replace("[", "").replace("]", ""),
        "rutaReal": null,
        "reglaDeVuelo": ruta.flightRule,
        "tipoDeVuelo": ruta.flightType,
        "diaDespegue": ruta.day,
        "fechaDespegueEstimado": ruta.date,
        "HoraDespegueEstimado": ruta.hour,
        "fechaDespegueReal": null,
        "horaDespegueReal": null,
        "fechaAterrizajeEstimado": ruta.landingDate,
        "HoraAterrizajeEstimado": ruta.landingHour,
        "fechaAterrizajeReal": null,
        "horaAterrizajeReal": null,
        "ltscombustibleEstimado": ruta.fuelConsumption,
        "ltscombustibleReal": null,
        "lubricanteEstimado": ruta.lubricantConsumption,
        "lubricanteReal": null,
        "kilometrajeEstimado": null,
        "kilometrajeReal": null,
        "duracionEstimada": TiempoEntreDias(ruta.date, ruta.hour, ruta.landingDate, ruta.landingHour), //calcular la duracion mediante el calculo de diayfechaorigen - diayfechaaterrizaje
        "duracionReal": null,
        "checkIn": 'false',
        "controlCabina": 'false',
        "totalPersonasABordo": ruta.peopleEstimate,
        "pesoCargaOrigen": null,
        "pesoCargaDestino": null,
        "informado": "false",
        "motivoEstado": null,
        "aeronavesPosibles": ruta.aircrafts

    }


    //matricula
    let bodyAeronaveAutomatica = { "modeloAeronave": ruta.aircraft, "aeropuerto_codiata": ruta.origin, "fechadespegueestimado": ruta.date, "fechaaterrizajeestimado": ruta.landingDate }
    const aeronaveIdeal = await asignarAeronave(ruta.aircraft, ruta.origin, ruta.date, ruta.landingDate)
    let asignacionAutomaticaAvion = false
    if (aeronaveIdeal.length > 0) {
        console.log(ruta.aircraft + ' ' + aeronaveIdeal[0].matricula + ' ' + ruta.code + ' ' + ruta.origin)
        asignacionAutomaticaAvion = true;
        data["Aeronave_matricula_fk"] = aeronaveIdeal[0].matricula;
        await modelo.actualizarIataAeronave(aeronaveIdeal[0].matricula, data.DestinoTeorico_codIATA)
    }

    //inserta vuelo prgramado 
    await modelo.insertVueloInicial(data);

    //tripulacion
    if (asignacionAutomaticaAvion) {
        let infoTecnica = await modelo.obtenerAeronavePorMatricula2(data["Aeronave_matricula_fk"])
        let cantmaxtripulantes = infoTecnica.EquipoTripulacion
        let dosDiasAntes = new Date(Date.parse(ruta.date))
        let dosDiasDespues = new Date(Date.parse(ruta.landingDate))
        dosDiasAntes.setDate(dosDiasAntes.getDate() - 2)
        dosDiasDespues.setDate(dosDiasDespues.getDate() + 2)
        let bodyTripulacionAutomatica = { "idvuelo": ruta.code, "diaAntes": dosDiasAntes, "diaDespues": dosDiasDespues, "codiataOrigen": ruta.origin, "codiataDestino": ruta.destination, "fechadespegueestimado": ruta.date, "fechaaterrizajeestimado": ruta.landingDate };
        let asigTripuAutomatica = await asignarTripulacionAutomaticamente(bodyTripulacionAutomatica, cantmaxtripulantes)
        console.log(cantmaxtripulantes + '  ' + asigTripuAutomatica);
        if (asigTripuAutomatica)
            await modelo.ActualizarVueloConfirmadoPorParametro(ruta.code)
    }


}

async function asignarAeronave(iata, naveModelo, inicio, fin) {
    return res = await modelo.obtenerAeronaveModelo(iata, naveModelo, inicio, fin);
}

async function asignarTripulacionAutomaticamente(data, cantmaxtripulantes) {
    const res = await modelo.asignarTripulacionAutom(data);
    var cantPiloto = 0;
    var cantCoPiloto = 0;
    var cantAux = 0;
    var tripulacion = []
    for (elem of res) {
        if (cantPiloto < 1 && elem.posicion == 'piloto' && await modelo.asignarPersonal(elem.idpersonal, tripulacion)) {
            tripulacion.push(elem)
            cantPiloto++
        }
        if (cantCoPiloto < 1 && elem.posicion == 'co-piloto' && await modelo.asignarPersonal(elem.idpersonal, tripulacion)) {
            tripulacion.push(elem)
            cantCoPiloto++
        }
        if (cantAux < cantmaxtripulantes - 2 && elem.posicion == 'auxiliar' && await modelo.asignarPersonal(elem.idpersonal, tripulacion)) {
            tripulacion.push(elem)
            cantAux++
        }
    }
    if (cantmaxtripulantes == tripulacion.length) {
        for (t of tripulacion) {
            await modelo.insertarTripulacion(t.idpersonal, data.idvuelo)
            await modelo.actualizarIataPersonal(t.idpersonal, data.codiataDestino)
        }
        console.log(cantmaxtripulantes, tripulacion);
        return true
    }

    return false
}

const diaActualMasSeis = () => {
    var dia = new Date();
    //var diaActual=('0'+dia.getDate()).slice(-2)+'-'+('0'+dia.getMonth()).slice(-2)+'-'+dia.getFullYear();   
    dia.setDate(dia.getDate() + 6);
    var diaMasSiete = ('0' + dia.getDate()).slice(-2) + '-' + ('0' + (dia.getMonth() + 1)).slice(-2) + '-' + dia.getFullYear(); //dd-mm-aaaa
    // var diaMasSiete = (dia.getFullYear()+'-'+('0'+(dia.getMonth()+1)).slice(-2)+'-'+('0'+dia.getDate()).slice(-2)); //aaaa-mm-dd
    console.log(diaMasSiete);
    return diaMasSiete;
}

const diaActualMasCinco = () => {
    var dia = new Date();
    //var diaActual=('0'+dia.getDate()).slice(-2)+'-'+('0'+dia.getMonth()).slice(-2)+'-'+dia.getFullYear();   
    dia.setDate(dia.getDate() + 5);
    var diaMasSiete = ('0' + dia.getDate()).slice(-2) + '-' + ('0' + (dia.getMonth() + 1)).slice(-2) + '-' + dia.getFullYear(); //dd-mm-aaaa
    // var diaMasSiete = (dia.getFullYear()+'-'+('0'+(dia.getMonth()+1)).slice(-2)+'-'+('0'+dia.getDate()).slice(-2)); //aaaa-mm-dd
    console.log(diaMasSiete);
    return diaMasSiete;
}

async function crearPlanesDeVueloDiaAyer() {

    const rutasJson = await pedirRuta(diaActualMasSeis());
    let index = 0;
    for (r of rutasJson) {
        await crearPlanVuelo(r);
    };

}

async function crearPlanesDeVueloDiaAntesAyer() {

    const rutasJson = await pedirRuta(diaActualMasCinco());
    let index = 0;
    for (r of rutasJson) {
        await crearPlanVuelo(r);
    };

}



module.exports = { crearPlanesDeVuelo, crearPKHoraFecha, crearPlanesDeVueloDiaAyer, crearPlanesDeVueloDiaAntesAyer }
