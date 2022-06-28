
let url = 'http://localhost:3010/Checkclima'

let url2 = 'http://localhost:3010/obtenerClima'

const obtClima = async (id) => {


    document.querySelector(".cliLoader").style.display = "flex";

    let vuelo = JSON.parse(localStorage.getItem(id + ""))

    try {
        fetch(url, {

            method: 'POST',

            body: JSON.stringify({
                "idvuelo": vuelo["pv"],
                "destinoTeoricaIata": vuelo["destino"],
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }

        })
            .then(response => response.json())
            .then(data => { if (data != null) { pintarClima(data) } });
    }
    catch (error) {
        console.log(error)
    }
}

const pintarClima = (data) => {

    console.log("Cargando clima");
    let permisos = JSON.parse(localStorage.getItem('camposVentanaModificar'));
    permisos["permisoClima"] = true;
    localStorage.setItem("camposVentanaModificar", JSON.stringify(permisos));
    document.querySelector(".temperature").textContent = "Temperatura: " + data.gradosTemperaturaDestino
    document.querySelector(".temp-carac").textContent = "Clima: " + data.climaDestino

    //ventana mas info cargamos los datos ahi

    document.querySelector(".cliLoader").style.display = "none";
}


const obtClima2 = async (vuelo, func) => {


    try {
        fetch(url2, {

            method: 'POST',

            body: JSON.stringify({
                "idvuelo_fk": vuelo
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }

        })
            .then(response => response.json())
            .then(async data => await func(data));
    }
    catch (error) {
        console.log(error)
    }
}


const obtClima3 = (id, func, indice) => {



    try {
        fetch(url2, {

            method: 'POST',

            body: JSON.stringify({
                "idvuelo_fk": id
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }

        })
            .then(response => response.json())
            .then(async data => await func(data, indice - 1));
    }
    catch (error) {
        console.log(error)
    }
}




export { obtClima, obtClima2, obtClima3 };
