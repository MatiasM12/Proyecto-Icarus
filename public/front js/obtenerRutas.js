const url = 'http://localhost:3010/vuelos'
const url2 = 'http://localhost:3010/vuelosPorFiltro'
const url3 = 'http://localhost:3010/vuelosFechaRango'
const url4 = 'http://localhost:3010/vuelosEstadoRango'
const url5 = 'http://localhost:3010/vuelosOrigenDestino'

const url6 = 'http://localhost:3010/vuelosPorFiltroDestino'
const url7 = 'http://localhost:3010/vuelosPorFiltroOrigen'
const url8 = 'http://localhost:3010/vuelosPorFiltroFDestino'
const url9 = 'http://localhost:3010/vuelosPorFiltroFOrigen'

const url10 = 'http://localhost:3010/filtroEstado'
const url11 = 'http://localhost:3010/filtroAOE'
const url12 = 'http://localhost:3010/filtroAOFL'
const url13 = 'http://localhost:3010/filtroAOFS'
const url14 = 'http://localhost:3010/filtroADFS'
const url15 = 'http://localhost:3010/filtroADFL'
const url16 = 'http://localhost:3010/filtroADE'
const url17 = 'http://localhost:3010/filtroFSE'
const url18 = 'http://localhost:3010/filtroFLE'
const url19 = 'http://localhost:3010/filtroRangoEA'
const url20 = 'http://localhost:3010/filtroRangoEF'
const url21 = 'http://localhost:3010/filtroRangoAF'
const url22 = 'http://localhost:3010/filtroAOrigenFSE'
const url23 = 'http://localhost:3010/filtroAOrigenFLE'
const url24 = 'http://localhost:3010/filtroADestinoFSE'
const url25 = 'http://localhost:3010/filtroADestinoFLE'
const url26 = 'http://localhost:3010/filtroCinco'
const url27 = 'http://localhost:3010/filtroRangoAE'
const url28 = 'http://localhost:3010/filtroRangoAFL'
const url29 = 'http://localhost:3010/filtroRangoAFS'
const url30 = 'http://localhost:3010/filtroRangoEAO'
const url31 = 'http://localhost:3010/filtroRangoEAD'
const url32 = 'http://localhost:3010/filtroRangoEFS'
const url33 = 'http://localhost:3010/filtroRangoEFL'
const url34 = 'http://localhost:3010/filtroRangoFAO'
const url35 = 'http://localhost:3010/filtroRangoFAD'
const url36 = 'http://localhost:3010/filtroRangoFE'



const $d = document;


const func = (data) => {

    console.log(data)
}

const obtRutas = (pintarRutas) => {


    fetch(url, {

        method: 'GET',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())
        .then(data => pintarRutas(data));



}


const obtRutasConFiltros = (pintarRutas) => {

    const aeOrigen = $d.querySelector(".aeropuertoOr").value
    const aeDestino = $d.querySelector(".aeropuertoDes").value
    const fSalida = $d.querySelector(".fechaS").value
    const fLlegada = $d.querySelector(".fechaL").value
    const estado1 = $d.querySelector(".estado1").value
    const estado2 = $d.querySelector(".estado2").value


    fetch(url2, {

        method: 'POST',
        body: JSON.stringify({


            "origen_codiata_fk": aeOrigen,
            "destino_codiata_fk": aeDestino,
            "fechadespegueestimado": fSalida,
            "fechaaterrizajeestimado": fLlegada,
            "idestado1": estado1,
            "idestado2": estado2


        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())
        .then(data => pintarRutas(data));


}

const obtRutasFE1 = (pintarRutas) => {


    const fSalida = $d.querySelector(".fechaS").value
    const fLlegada = $d.querySelector(".fechaL").value
    const estado1 = $d.querySelector(".estado1").value


    fetch(url36, {

        method: 'POST',
        body: JSON.stringify({


            "fechadespegueestimado": fSalida,
            "fechaaterrizajeestimado": fLlegada,
            "idestado": estado1


        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())
        .then(data => pintarRutas(data));


}

const obtRutasFE2 = (pintarRutas) => {


    const fSalida = $d.querySelector(".fechaS").value
    const fLlegada = $d.querySelector(".fechaL").value
    const estado1 = $d.querySelector(".estado2").value


    fetch(url36, {

        method: 'POST',
        body: JSON.stringify({


            "fechadespegueestimado": fSalida,
            "fechaaterrizajeestimado": fLlegada,
            "idestado": estado1


        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())
        .then(data => pintarRutas(data));


}

const obtRutasFAD = (pintarRutas) => {

    const aeDestino = $d.querySelector(".aeropuertoDes").value
    const fSalida = $d.querySelector(".fechaS").value
    const fLlegada = $d.querySelector(".fechaL").value



    fetch(url35, {

        method: 'POST',
        body: JSON.stringify({



            "fechadespegueestimado": fSalida,
            "fechaaterrizajeestimado": fLlegada,
            "destinoteorico_codiata": aeDestino


        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())
        .then(data => pintarRutas(data));


}

const obtRutasFAO = (pintarRutas) => {

    const aeOrigen = $d.querySelector(".aeropuertoOr").value
    const fSalida = $d.querySelector(".fechaS").value
    const fLlegada = $d.querySelector(".fechaL").value


    fetch(url34, {

        method: 'POST',
        body: JSON.stringify({



            "fechadespegueestimado": fSalida,
            "fechaaterrizajeestimado": fLlegada,
            "origenteorico_codiata": aeOrigen


        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())
        .then(data => pintarRutas(data));


}

const obtRutasEFL = (pintarRutas) => {

    const fLlegada = $d.querySelector(".fechaL").value
    const estado1 = $d.querySelector(".estado1").value
    const estado2 = $d.querySelector(".estado2").value


    fetch(url33, {

        method: 'POST',
        body: JSON.stringify({

            "estado1": estado1,
            "estado2": estado2,
            "fechaaterrizajeestimado": fLlegada


        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())
        .then(data => pintarRutas(data));


}

const obtRutasEFS = (pintarRutas) => {

    const fSalida = $d.querySelector(".fechaS").value
    const estado1 = $d.querySelector(".estado1").value
    const estado2 = $d.querySelector(".estado2").value


    fetch(url32, {

        method: 'POST',
        body: JSON.stringify({



            "estado1": estado1,
            "estado2": estado2,
            "fechadespegueestimado": fSalida


        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())
        .then(data => pintarRutas(data));


}


const obtRutasEAD = (pintarRutas) => {

    const aeDestino = $d.querySelector(".aeropuertoDes").value
    const estado1 = $d.querySelector(".estado1").value
    const estado2 = $d.querySelector(".estado2").value


    fetch(url31, {

        method: 'POST',
        body: JSON.stringify({



            "estado1": estado1,
            "estado2": estado2,
            "destinoteorico_codiata": aeDestino


        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())
        .then(data => pintarRutas(data));


}

const obtRutasEAO = (pintarRutas) => {

    const aeOrigen = $d.querySelector(".aeropuertoOr").value
    const estado1 = $d.querySelector(".estado1").value
    const estado2 = $d.querySelector(".estado2").value

    console.log("soy el aer origen :" + aeOrigen)
    console.log("soy el estado1 :" + estado1)
    console.log("soy el estado2 :" + estado2)


    fetch(url30, {

        method: 'POST',
        body: JSON.stringify({

            "estado1": estado1,
            "estado2": estado2,
            "origenteorico_codiata": aeOrigen


        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())
        .then(data => pintarRutas(data));


}

const obtRutasAFS = (pintarRutas) => {

    const aeOrigen = $d.querySelector(".aeropuertoOr").value
    const aeDestino = $d.querySelector(".aeropuertoDes").value
    const fSalida = $d.querySelector(".fechaS").value


    fetch(url29, {

        method: 'POST',
        body: JSON.stringify({


            "origen_codiata_fk": aeOrigen,
            "destino_codiata_fk": aeDestino,
            "fechadespegueestimado": fSalida


        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())
        .then(data => pintarRutas(data));


}


const obtRutasAFL = (pintarRutas) => {

    const aeOrigen = $d.querySelector(".aeropuertoOr").value
    const aeDestino = $d.querySelector(".aeropuertoDes").value
    const fLlegada = $d.querySelector(".fechaL").value


    fetch(url28, {

        method: 'POST',
        body: JSON.stringify({


            "origen_codiata_fk": aeOrigen,
            "destino_codiata_fk": aeDestino,
            "fechaaterrizajeestimado": fLlegada


        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())
        .then(data => pintarRutas(data));


}


const obtRutasAE1 = (pintarRutas) => {

    const aeOrigen = $d.querySelector(".aeropuertoOr").value
    const aeDestino = $d.querySelector(".aeropuertoDes").value
    const estado1 = $d.querySelector(".estado1").value


    fetch(url27, {

        method: 'POST',
        body: JSON.stringify({


            "origen_codiata_fk": aeOrigen,
            "destino_codiata_fk": aeDestino,
            "idestado": estado1


        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())
        .then(data => pintarRutas(data));


}

const obtRutasAE2 = (pintarRutas) => {

    const aeOrigen = $d.querySelector(".aeropuertoOr").value
    const aeDestino = $d.querySelector(".aeropuertoDes").value
    const estado1 = $d.querySelector(".estado2").value


    fetch(url27, {

        method: 'POST',
        body: JSON.stringify({


            "origen_codiata_fk": aeOrigen,
            "destino_codiata_fk": aeDestino,
            "idestado": estado1


        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())
        .then(data => pintarRutas(data));


}



const obtRutasCinco1 = (pintarRutas) => {

    const aeOrigen = $d.querySelector(".aeropuertoOr").value
    const aeDestino = $d.querySelector(".aeropuertoDes").value
    const fSalida = $d.querySelector(".fechaS").value
    const fLlegada = $d.querySelector(".fechaL").value
    const estado1 = $d.querySelector(".estado1").value


    fetch(url26, {

        method: 'POST',
        body: JSON.stringify({


            "origen_codiata_fk": aeOrigen,
            "destino_codiata_fk": aeDestino,
            "fechadespegueestimado": fSalida,
            "fechaaterrizajeestimado": fLlegada,
            "idestado": estado1


        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())
        .then(data => pintarRutas(data));


}

const obtRutasCinco2 = (pintarRutas) => {

    const aeOrigen = $d.querySelector(".aeropuertoOr").value
    const aeDestino = $d.querySelector(".aeropuertoDes").value
    const fSalida = $d.querySelector(".fechaS").value
    const fLlegada = $d.querySelector(".fechaL").value
    const estado1 = $d.querySelector(".estado2").value


    fetch(url26, {

        method: 'POST',
        body: JSON.stringify({


            "origen_codiata_fk": aeOrigen,
            "destino_codiata_fk": aeDestino,
            "fechadespegueestimado": fSalida,
            "fechaaterrizajeestimado": fLlegada,
            "idestado": estado1


        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())
        .then(data => pintarRutas(data));


}


const obtRutasADFLE1 = (pintarRutas) => {

    const aeDestino = $d.querySelector(".aeropuertoDes").value
    const fLlegada = $d.querySelector(".fechaL").value
    const estado1 = $d.querySelector(".estado1").value


    fetch(url25, {

        method: 'POST',
        body: JSON.stringify({


            "destino_codiata_fk": aeDestino,
            "fechaaterrizajeestimado": fLlegada,
            "idestado": estado1


        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())
        .then(data => pintarRutas(data));


}

const obtRutasADFLE2 = (pintarRutas) => {

    const aeDestino = $d.querySelector(".aeropuertoDes").value
    const fLlegada = $d.querySelector(".fechaL").value
    const estado1 = $d.querySelector(".estado2").value


    fetch(url25, {

        method: 'POST',
        body: JSON.stringify({


            "destino_codiata_fk": aeDestino,
            "fechaaterrizajeestimado": fLlegada,
            "idestado": estado1


        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())
        .then(data => pintarRutas(data));


}



const obtRutasADFSE1 = (pintarRutas) => {

    const aeDestino = $d.querySelector(".aeropuertoDes").value
    const fSalida = $d.querySelector(".fechaS").value
    const estado2 = $d.querySelector(".estado1").value


    fetch(url24, {

        method: 'POST',
        body: JSON.stringify({


            "destino_codiata_fk": aeDestino,
            "fechadespegueestimado": fSalida,
            "idestado": estado2


        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())
        .then(data => pintarRutas(data));


}

const obtRutasADFSE2 = (pintarRutas) => {

    const aeDestino = $d.querySelector(".aeropuertoDes").value
    const fSalida = $d.querySelector(".fechaS").value
    const estado2 = $d.querySelector(".estado2").value


    fetch(url24, {

        method: 'POST',
        body: JSON.stringify({


            "destino_codiata_fk": aeDestino,
            "fechadespegueestimado": fSalida,
            "idestado": estado2


        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())
        .then(data => pintarRutas(data));


}


const obtRutasAOFLE1 = (pintarRutas) => {

    const aeOrigen = $d.querySelector(".aeropuertoOr").value
    const fLlegada = $d.querySelector(".fechaL").value
    const estado1 = $d.querySelector(".estado1").value


    fetch(url23, {

        method: 'POST',
        body: JSON.stringify({


            "origen_codiata_fk": aeOrigen,
            "fechaaterrizajeestimado": fLlegada,
            "idestado": estado1


        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())
        .then(data => pintarRutas(data));


}


const obtRutasAOFLE2 = (pintarRutas) => {

    const aeOrigen = $d.querySelector(".aeropuertoOr").value
    const fLlegada = $d.querySelector(".fechaL").value
    const estado1 = $d.querySelector(".estado2").value


    fetch(url23, {

        method: 'POST',
        body: JSON.stringify({


            "origen_codiata_fk": aeOrigen,
            "fechaaterrizajeestimado": fLlegada,
            "idestado": estado1


        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())
        .then(data => pintarRutas(data));


}



const obtRutasAOFSE1 = (pintarRutas) => {

    const aeOrigen = $d.querySelector(".aeropuertoOr").value
    const fSalida = $d.querySelector(".fechaS").value
    const estado1 = $d.querySelector(".estado1").value


    fetch(url22, {

        method: 'POST',
        body: JSON.stringify({


            "origen_codiata_fk": aeOrigen,
            "fechadespegueestimado": fSalida,
            "idestado": estado1


        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())
        .then(data => pintarRutas(data));


}
const obtRutasAOFSE2 = (pintarRutas) => {

    const aeOrigen = $d.querySelector(".aeropuertoOr").value
    const fSalida = $d.querySelector(".fechaS").value
    const estado1 = $d.querySelector(".estado2").value


    fetch(url22, {

        method: 'POST',
        body: JSON.stringify({


            "origen_codiata_fk": aeOrigen,
            "fechadespegueestimado": fSalida,
            "idestado": estado1


        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())
        .then(data => pintarRutas(data));


}




const obtRutasRangoAF = (pintarRutas) => {

    const aeOrigen = $d.querySelector(".aeropuertoOr").value
    const aeDestino = $d.querySelector(".aeropuertoDes").value
    const fSalida = $d.querySelector(".fechaS").value
    const fLlegada = $d.querySelector(".fechaL").value


    fetch(url21, {

        method: 'POST',
        body: JSON.stringify({


            "origen_codiata_fk": aeOrigen,
            "destino_codiata_fk": aeDestino,
            "fechadespegueestimado": fSalida,
            "fechaaterrizajeestimado": fLlegada


        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())
        .then(data => pintarRutas(data));


}


const obtRutasRangoEF = (pintarRutas) => {

    const estado1 = $d.querySelector(".estado1").value
    const estado2 = $d.querySelector(".estado2").value
    const fSalida = $d.querySelector(".fechaS").value
    const fLlegada = $d.querySelector(".fechaL").value



    fetch(url20, {

        method: 'POST',
        body: JSON.stringify({

            "estado1": estado1,
            "estado2": estado2,
            "fechadespegueestimado": fSalida,
            "fechaaterrizajeestimado": fLlegada



        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())
        .then(data => pintarRutas(data));


}

const obtRutasRangoEA = (pintarRutas) => {

    const estado1 = $d.querySelector(".estado1").value
    const estado2 = $d.querySelector(".estado2").value
    const aeOrigen = $d.querySelector(".aeropuertoOr").value
    const aeDestino = $d.querySelector(".aeropuertoDes").value



    fetch(url19, {

        method: 'POST',
        body: JSON.stringify({

            "estado1": estado1,
            "estado2": estado2,
            "origen_codiata_fk": aeOrigen,
            "destino_codiata_fk": aeDestino



        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())
        .then(data => pintarRutas(data));


}


const obtRutasFLE1 = (pintarRutas) => {

    const fLlegada = $d.querySelector(".fechaL").value
    const estado1 = $d.querySelector(".estado1").value


    fetch(url18, {

        method: 'POST',
        body: JSON.stringify({


            "fechaaterrizajeestimado": fLlegada,
            "idestados_fk": estado1,


        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())
        .then(data => pintarRutas(data));


}


const obtRutasFLE2 = (pintarRutas) => {

    const fLlegada = $d.querySelector(".fechaL").value
    const estado1 = $d.querySelector(".estado2").value


    fetch(url18, {

        method: 'POST',
        body: JSON.stringify({


            "fechaaterrizajeestimado": fLlegada,
            "idestados_fk": estado1,


        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())
        .then(data => pintarRutas(data));


}


const obtRutasFSE1 = (pintarRutas) => {

    const fSalida = $d.querySelector(".fechaS").value
    const estado1 = $d.querySelector(".estado1").value


    fetch(url17, {

        method: 'POST',
        body: JSON.stringify({


            "fechadespegueestimado": fSalida,
            "idestados_fk": estado1,


        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())
        .then(data => pintarRutas(data));


}

const obtRutasFSE2 = (pintarRutas) => {

    const fSalida = $d.querySelector(".fechaS").value
    const estado1 = $d.querySelector(".estado2").value


    fetch(url17, {

        method: 'POST',
        body: JSON.stringify({


            "fechadespegueestimado": fSalida,
            "idestados_fk": estado1,


        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())
        .then(data => pintarRutas(data));


}


const obtRutasADE2 = (pintarRutas) => {

    const aeDestino = $d.querySelector(".aeropuertoDes").value
    const estado1 = $d.querySelector(".estado2").value


    fetch(url16, {

        method: 'POST',
        body: JSON.stringify({


            "destino_codiata_fk": aeDestino,
            "idestados_fk": estado1


        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())
        .then(data => pintarRutas(data));


}

const obtRutasADE1 = (pintarRutas) => {

    const aeDestino = $d.querySelector(".aeropuertoDes").value
    const estado1 = $d.querySelector(".estado1").value


    fetch(url16, {

        method: 'POST',
        body: JSON.stringify({


            "destino_codiata_fk": aeDestino,
            "idestados_fk": estado1


        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())
        .then(data => pintarRutas(data));


}

const obtRutasADFL = (pintarRutas) => {

    const aeDestino = $d.querySelector(".aeropuertoDes").value
    const fLlegada = $d.querySelector(".fechaL").value


    fetch(url15, {

        method: 'POST',
        body: JSON.stringify({


            "destino_codiata_fk": aeDestino,
            "fechaaterrizajeestimado": fLlegada

        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())
        .then(data => pintarRutas(data));


}

const obtRutasADFS = (pintarRutas) => {

    const aeDestino = $d.querySelector(".aeropuertoDes").value
    const fSalida = $d.querySelector(".fechaS").value


    fetch(url14, {

        method: 'POST',
        body: JSON.stringify({


            "destino_codiata_fk": aeDestino,
            "fechadespegueestimado": fSalida

        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())
        .then(data => pintarRutas(data));


}


const obtRutasAOFS = (pintarRutas) => {

    const aeOrigen = $d.querySelector(".aeropuertoOr").value
    const fSalida = $d.querySelector(".fechaS").value


    fetch(url13, {

        method: 'POST',
        body: JSON.stringify({



            "origen_codiata_fk": aeOrigen,
            "fechadespegueestimado": fSalida


        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())
        .then(data => pintarRutas(data));


}


const obtRutasAOFL = (pintarRutas) => {

    const aeOrigen = $d.querySelector(".aeropuertoOr").value
    const fLlegada = $d.querySelector(".fechaL").value


    fetch(url12, {

        method: 'POST',
        body: JSON.stringify({


            "origen_codiata_fk": aeOrigen,
            "fechaaterrizajeestimado": fLlegada


        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())
        .then(data => pintarRutas(data));


}


const obtRutasAOE1 = (pintarRutas) => {

    const aeOrigen = $d.querySelector(".aeropuertoOr").value
    const estado1 = $d.querySelector(".estado1").value


    fetch(url11, {

        method: 'POST',
        body: JSON.stringify({


            "origen_codiata_fk": aeOrigen,
            "idestados_fk": estado1


        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())
        .then(data => pintarRutas(data));


}

const obtRutasAOE2 = (pintarRutas) => {

    const aeOrigen = $d.querySelector(".aeropuertoOr").value
    const estado1 = $d.querySelector(".estado2").value


    fetch(url11, {

        method: 'POST',
        body: JSON.stringify({


            "origen_codiata_fk": aeOrigen,
            "idestados_fk": estado1


        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())
        .then(data => pintarRutas(data));


}



const obtRutasEstado1 = (pintarRutas) => {


    const estado1 = $d.querySelector(".estado1").value


    fetch(url10, {

        method: 'POST',
        body: JSON.stringify({

            "idestados_fk": estado1


        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())
        .then(data => pintarRutas(data));


}

const obtRutasEstado2 = (pintarRutas) => {


    const estado1 = $d.querySelector(".estado2").value


    fetch(url10, {

        method: 'POST',
        body: JSON.stringify({

            "idestados_fk": estado1


        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())
        .then(data => pintarRutas(data));


}


const obtRutasFiltroFecha = (pintarRutas) => {

    const fSalida = $d.querySelector(".fechaS").value
    const fLlegada = $d.querySelector(".fechaL").value

    fetch(url3, {

        method: 'POST',
        body: JSON.stringify({


            "fechadespegueestimado": fSalida,
            "fechaaterrizajeestimado": fLlegada


        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())
        .then(data => pintarRutas(data));

}
const obtRutasFiltroFechaO = (pintarRutas) => {

    const fSalida = $d.querySelector(".fechaS").value

    fetch(url9, {

        method: 'POST',
        body: JSON.stringify({


            "fechadespegueestimado": fSalida


        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())
        .then(data => pintarRutas(data));

}
const obtRutasFiltroFechaD = (pintarRutas) => {

    const fLlegada = $d.querySelector(".fechaL").value

    fetch(url8, {

        method: 'POST',
        body: JSON.stringify({


            "fechaaterrizajeestimado": fLlegada


        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())
        .then(data => pintarRutas(data));

}


const obtPlanRangoEstado = (pintarRutas) => {

    const estado1 = $d.querySelector(".estado1").value
    const estado2 = $d.querySelector(".estado2").value


    fetch(url4, {

        method: 'POST',
        body: JSON.stringify({

            "estado1": estado1,
            "estado2": estado2


        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())
        .then(data => pintarRutas(data));



}


const obtPlanOrigen = (pintarRutas) => {

    const aeOrigen = $d.querySelector(".aeropuertoOr").value


    fetch(url7, {

        method: 'POST',
        body: JSON.stringify({

            "origen_codiata_fk": aeOrigen


        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())
        .then(data => pintarRutas(data));


}
const obtPlanDestino = (pintarRutas) => {

    const aeDestino = $d.querySelector(".aeropuertoDes").value


    fetch(url6, {

        method: 'POST',
        body: JSON.stringify({


            "destino_codiata_fk": aeDestino


        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())
        .then(data => pintarRutas(data));


}

const obtPlanOrigenDestino = (pintarRutas) => {

    const aeOrigen = $d.querySelector(".aeropuertoOr").value
    const aeDestino = $d.querySelector(".aeropuertoDes").value


    fetch(url5, {

        method: 'POST',
        body: JSON.stringify({

            "origen_codiata_fk": aeOrigen,
            "destino_codiata_fk": aeDestino


        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())
        .then(data => pintarRutas(data));


}



export {
    obtRutas, obtRutasConFiltros, obtRutasFiltroFecha, obtPlanRangoEstado, obtPlanOrigenDestino, obtRutasFiltroFechaD, obtRutasFiltroFechaO,
    obtPlanDestino, obtPlanOrigen, obtRutasEstado1, obtRutasEstado2, obtRutasAOE1, obtRutasAOE2,
    obtRutasAOFL, obtRutasAOFS, obtRutasADFS, obtRutasADFL,
    obtRutasADE1, obtRutasADE2, obtRutasFSE1, obtRutasFSE2, obtRutasFLE1,
    obtRutasFLE2, obtRutasRangoAF, obtRutasRangoEA, obtRutasRangoEF, obtRutasAOFSE1, obtRutasAOFSE2,
    obtRutasAOFLE1, obtRutasAOFLE2, obtRutasADFLE1, obtRutasADFLE2, obtRutasADFSE1, obtRutasADFSE2, obtRutasCinco1, obtRutasCinco2,
    obtRutasAE1, obtRutasAE2, obtRutasAFL, obtRutasAFS, obtRutasEAO, obtRutasEAD,
    obtRutasEFS, obtRutasEFL, obtRutasFAO, obtRutasFAD, obtRutasFE1, obtRutasFE2
};
