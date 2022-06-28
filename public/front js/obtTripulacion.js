const url = 'http://localhost:3010/tripulacionPorIdVuelo';
const url2 = 'http://localhost:3010/personal';
const url3 = 'http://localhost:3010/IngresoTripulante';


const obtTripulacion = (func, idvuelo_fk) => {

    console.log(idvuelo_fk);
    fetch(url, {

        method: 'POST',

        body: JSON.stringify({
            "idvuelo": idvuelo_fk
        })
        ,
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())
        .then(data => func(data));




}

const obtTodalaTripulacion = async (func, id) => {
    let vuelo = JSON.parse(localStorage.getItem(id + ""))



    //let cantmaxtripulantes = infoTecnica.EquipoTripulacion
    let dosDiasAntes = new Date(Date.parse(vuelo.fechasalida))
    let dosDiasDespues = new Date(Date.parse(vuelo.fechallegada))
    dosDiasAntes.setDate(dosDiasAntes.getDate() - 2)
    dosDiasDespues.setDate(dosDiasDespues.getDate() + 2)

    await fetch(url2, {
        method: 'POST',
        body: JSON.stringify({
            "idvuelo": vuelo["pv"],
            "diaAntes": dosDiasAntes,
            "diaDespues": dosDiasDespues,
            "fechadespegueestimado": vuelo.fechasalida,
            "fechaaterrizajeestimado": vuelo.fechallegada
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())
        .then(data => func(data));




}


const InsertTripulante = async (tripulante) => {


    await fetch(url3, {

        method: 'POST',

        body: JSON.stringify(tripulante)
        ,
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())

}



export { obtTripulacion, obtTodalaTripulacion, InsertTripulante };
