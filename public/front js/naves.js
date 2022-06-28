const url = "http://localhost:3010/ListadoaeronavesManual"
const url2 = "http://localhost:3010/obtenerPlanVuelo"
const url3 = "http://localhost:3010/obtenerPlanVuelo"
const url4 = "http://localhost:3010/ListadoAeronavesReprogramado"

const getAeronaves = async (func, id) => {

    let vuelo = JSON.parse(localStorage.getItem(id + ""))

    try {
        let aux = await fetch(url, {

            method: 'POST',

            body: JSON.stringify({
                "idvuelo": vuelo.pv
            })
            ,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }

        })
            .then(response => response.json())//.then(data=>console.log(data))
            .then(data => func(data));
        return aux
    }
    catch (error) {
        let cartel = document.querySelector(".cartel-alerta");
        cartel.style.display = "flex"
        cartel.querySelector(".msj-alerta").textContent = "No hay Naves disponibles"
    }

}

const getAeronavesRepro = async (func, id) => {

    let vuelo = JSON.parse(localStorage.getItem(id + ""))

    let aux = await fetch(url4, {

        method: 'POST',

        body: JSON.stringify({
            "idvuelo": vuelo.pv,
            "matricula": document.querySelector(".aer-matricula").textContent.slice(-6),
            "fechaaterrizajeestimado": vuelo.fechallegada
        })
        ,
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())//.then(data=>console.log(data))
        .then(data => func(data));
    return aux


}

const getAeronave = (func, id) => {

    fetch(url2, {

        method: 'POST',

        body: JSON.stringify({
            "idvuelo": id
        })
        ,
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())
        .then(data => func(data));

}

const getAeronave2 = (func, id) => {

    fetch(url3, {

        method: 'POST',

        body: JSON.stringify({
            "idvuelo": id
        })
        ,
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())
        .then(data => func(data));

}


export { getAeronaves, getAeronave, getAeronave2, getAeronavesRepro }
