const fetch = require('cross-fetch');
const res = require('express/lib/response');
const daoPlanVuelo = require("../back DAO/PlanVueloDAO.js");
const daoAeronave = require("../back DAO/MaestroAeronaveDAO.js");
const daoClima = require("../back DAO/ClimaDAO");



//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// finalizadas
//-----------------------------------------------------------------------------------------------------------------------------------------

const PerdirClima = async (ConexionEstablecida, idvuelo, latitud, longitud) => {
    try {
        const datosFetch = await fetch("https://api.open-meteo.com/v1/forecast?current_weather=true&latitude=" + latitud + "&longitude=" + longitud + "&timezone=America%2FSao_Paulo")
            .then(data => data.json());

        insertjson = { "idvuelo_fk": idvuelo, "climaDestino": datosFetch.current_weather.weathercode, "gradosTemperaturaDestino": datosFetch.current_weather.temperature, "velocidadVientokM": datosFetch.current_weather.windspeed }
        return daoClima.insertarClima(ConexionEstablecida, insertjson)
    }
    catch (err) {
        console.log(err);
    }
}

const pedirDatosAeropuerto = async (codigoIATA) => {
    var datosAeropuerto = await fetch('https://grops-backend-dnj2km2huq-rj.a.run.app/airport/getByIata?iata=' + codigoIATA)
        .then(response => response.json());

    return datosAeropuerto;
};

const pedirDatosAeroFront = async (codigoIATA) => {
    var datosAeropuerto = await fetch('https://grops-backend-dnj2km2huq-rj.a.run.app/airport/getByIata?iata=' + codigoIATA)
        .then(response => response.json());

    return datosAeropuerto;
};


var actualizarCargaDestino = async (req, res) => {
    //informa el despacho
    const { idvuelo } = req.body

    const url = 'https://opr-terrestres.herokuapp.com/v1/losilegales/carga/' + idvuelo + '/Despachado'
    const resp = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
    })
    res.status(200).send(resp)
}

const PerdirInfoModeloAeronave = async (modelo) => {
    try {
        var body;
        const datosFetch = await fetch("https://grops-backend-dnj2km2huq-rj.a.run.app/aircraft/getAll")
            .then(data => data.json());
        for (elem of datosFetch) {
            if (elem.model == modelo) {
                body = {
                    "consumoCombustibleTeorico": elem.fuelConsumption, "consumolubricanteTeorico": elem.lubricantConsumption, "capacidadTeorica": elem.passengerCapacity,
                    "MaxPesoTolerable": elem.weightTolerance, "MaxDistancia": elem.maxDistance, "EquipoTripulacion": elem.crewMembers
                };
            }
        }


        return body;

    }
    catch (err) {
        console.log(err);
    }

}

const pedirMantenimiento = async (ConexionEstablecida, req, res) => {
    try {
        let { matricula } = req.body
        var mantenimiento = await fetch('https://operaciones-mantenimiento.herokuapp.com/Mantenimientos/allByAeronave/' + matricula)
            .then(response => response.json());
        let json = { "autorizado": mantenimiento.Approved, "matricula": matricula }

        await daoAeronave.updateAutorizadoAeronave(ConexionEstablecida, json)
        res.send(mantenimiento.Approved);
    }
    catch (err) {
        console.log(err);
    }
};

var checkIn = async (ConexionEstablecida, req, res) => {
    const { idvuelo } = req.body
    var url = 'https://opr-terrestres.herokuapp.com/v1/losilegales/pesoAeronave/' + idvuelo
    const check = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },

    }).then(response => response.json());
    body = { "checkIn": (!check.sobrecarga), "totalPersonasABordo": (check.cantidadPasajeros), "pesoCargaOrigen": (check.pesoKG), "idvuelo": idvuelo }
    daoPlanVuelo.updateDatosEmbarqueCheckin(ConexionEstablecida, body)
    res.status(200).send(check)
}


//----------------------------------------------------------------------------------------------------------
// a medio completar
//---------------------------------------------------------------------------------------------------------
//implementados con el front
//falta persistencia en el back


var emergencia = async (ConexionEstablecida, req, res) => {
    const { idvuelo } = req.body
    var url = 'https://operaciones-mantenimiento.herokuapp.com/Emergencia/allByVuelo/' + idvuelo
    const emer = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },

    }).then(response => response.json())
    console.log(emer)
    //persistir emergencias: insert de info
    res.send(emer)
}

var insumos = async (ConexionEstablecida, req, res) => {
    const { idvuelo } = req.body
    var url = 'https://operaciones-mantenimiento.herokuapp.com/Insumo/Vuelo/allByVuelo/' + idvuelo
    const json = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },

    }).then(response => response.json());
    console.log(json)
    res.send(json)
    return json
}

const pedirControlCabina = async (ConexionEstablecida, req, res) => {
    console.log(req.body)
    const { idvuelo } = req.body

    try {
        var control = await fetch('https://operaciones-mantenimiento.herokuapp.com/ControlXVuelo/allByVuelo/' + idvuelo)
            .then(response => response.json());


        let auxbody = { "controlCabina": control.Approved, "idvuelo": idvuelo }
        console.log(auxbody);
        await daoPlanVuelo.updateDatosEmbarqueControlCabina(ConexionEstablecida, auxbody)
        res.send(control);
    }
    catch (err) {
        console.log("error paaaaaaa")
        res.send({ "controlCabina": false, "idvuelo": idvuelo });
    }

};


const pedirRutaAlternativa = async (req, res) => {
    const { aircraft, includeDestinations, excludeDestinations } = req.body
    let json = {
        "aircraft": aircraft,
        "includeDestinations": includeDestinations,
        "excludeDestinations": excludeDestinations
    }
    console.log(json);
    var ruta = await fetch('https://grops-backend-dnj2km2huq-rj.a.run.app/flightRouteMaster/api/generateFlightRoute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(json)

    })
        .then(response => response.json()).catch(err => console.log("error iata"));
    res.status(200).send(ruta);
    return ruta
};


const AvisoInsumos = async (req, res) => {
    const { idvuelo } = req.body
    let url = 'https://operaciones-mantenimiento.herokuapp.com/Vuelo/saveInsumosXVuelo/' + idvuelo;
    var ruta = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body)

    })
        .then(response => response.json());
    //  res.status(200).send(ruta);
    return ruta
    console.log(idvuelo)

};

const AvisoControl = async (req, res) => {
    const { idvuelo } = req.body
    let url = 'https://operaciones-mantenimiento.herokuapp.com/Vuelo/saveControlesXVuelo/' + idvuelo;
    var ruta = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body)

    })
        .then(response => response.json());
    //  res.status(200).send(ruta);
    return ruta


};


module.exports = { AvisoInsumos, AvisoControl, PerdirInfoModeloAeronave, pedirDatosAeroFront, PerdirClima, checkIn, insumos, actualizarCargaDestino, emergencia, pedirDatosAeropuerto, pedirMantenimiento, pedirControlCabina, pedirRutaAlternativa };



