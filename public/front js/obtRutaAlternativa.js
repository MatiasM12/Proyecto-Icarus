const url = "http://localhost:3010/rutaAlternativa";
const urlReprogramado = "http://localhost:3010/rutaAlternativaReprogramar"

let textoRuta = document.querySelector(".ruta-vuelo");
let textoCombustible = document.querySelector(".combustible-vuelo");
let textoLubricante = document.querySelector(".lubricante-vuelo");
let textoDistancia = document.querySelector(".kilometraje-vuelo");


const obtNuevaRutaReprogramado = async (indice) => {
    let vuelo = JSON.parse(localStorage.getItem(indice + ""))

    let aeropuertos = [];
    let listadoAeropuetos = document.querySelectorAll(".input-cod-iata");
    for (let elem of listadoAeropuetos) {
        aeropuertos.push(elem.value)
    }

    await fetch(urlReprogramado, {

        method: 'POST',
        //reveer el los campos de donde toma los datos
        body: JSON.stringify({
            "idvuelo": vuelo["pv"],
            "matricula": vuelo["matricula"],
            "fechaaterrizajeestimado": vuelo["fechallegada"],
            "aircraft": null,
            "includeDestinations": aeropuertos,
            "excludeDestinations": []
        }),

        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())
        .then(data => console.log(data));
    //agregar la funicon depitnar los elementos

}


const obtRutaReal = async (indice) => {

    document.querySelector(".atrLoader").style.display = "flex";
    let vuelo = JSON.parse(localStorage.getItem(indice + ""))
    let aeropuertos = [];
    aeropuertos.push(document.querySelector(".datos-aterrizado").querySelector(".aeropuertoS-vuelo").value);
    aeropuertos.push(document.querySelector(".datos-aterrizado").querySelector(".aeropuertoL-vuelo").value);

    await fetch(url, {

        method: 'POST',

        body: JSON.stringify({
            "idvuelo": vuelo["pv"],
            "matricula": vuelo["matricula"],
            "fechaaterrizajeestimado": vuelo["fechallegada"],
            "aircraft": null,
            "includeDestinations": aeropuertos,
            "excludeDestinations": []
        }),

        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())
        .then(data => pintarReal(data)).catch(err => alert("Error codigo iata"));

}

const separar = (lista) => {

    let array = [];
    let variable = "";


    for (let i = 0; i < lista.length; i++) {


        if (lista[i] != "," && lista[i] != "[" && lista[i] != "]") {

            variable += lista[i];


        }
        if (lista[i] === "," || lista[i] === "]") {

            array.push(variable);
            variable = "";

        }

    }

    return array;
}



const pintarReal = (data) => {

    textoRuta.textContent = "Ruta Real : " + data["route"];
    textoCombustible.textContent = "Litros de combustible : " + data["combustibleEstimado"];
    textoLubricante.textContent = "Litros de lubricante : " + data["lubricanteEstimado"];
    textoDistancia.textContent = "Kilometros recorridos : " + data["distance"];

    document.querySelector(".atrLoader").style.display = "none";
}


export { obtRutaReal, obtNuevaRutaReprogramado };