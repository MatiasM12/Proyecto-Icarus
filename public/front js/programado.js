const url = "http://localhost:3010/aeronavePorMatricula"



const personal = [

    {
        "nombre": "Juan",
        "cargo": "piloto",
        "ubicacion": "San juan",
        "disponibilidad": "disponible"

    },
    {
        "nombre": "monica",
        "cargo": "copiloto",
        "ubicacion": "San juan",
        "disponibilidad": "disponible"

    },
    {
        "nombre": "silvestre",
        "cargo": "auxiliar",
        "ubicacion": "San juan",
        "disponibilidad": "disponible"

    },
    {
        "nombre": "Esteban",
        "cargo": "auxiliar",
        "ubicacion": "San juan",
        "disponibilidad": "disponible"

    }


]
const naves = [

    {
        "nombre": "AEROBUS 4556",
        "matricula": "ABC-ael"


    },
    {
        "nombre": "VelezSinGEnte 4556",
        "matricula": "ABC-ael"
    },
    {
        "nombre": "Gas 4556",
        "matricula": "ABC-choto"
    },
    {
        "nombre": "bocagon 4556",
        "matricula": "ABC-ael"
    }


]




const $secciontrip = document.querySelector(".lista-tripulantes");
const $seccionNaves = document.querySelector(".lista-aeronave");
const $template = document.getElementById("template-trip").content;
const $template2 = document.getElementById("lista-aeronaves").content;
const $fragmento = document.createDocumentFragment();
const $fragmento2 = document.createDocumentFragment();
const traerTrip = document.querySelectorAll(".asignar-tripulacion")[0];


const traerNaves = async (navesJSON) => {
    limpiarAeronave()
    limpiar();
    traerTrip.style.display = "none";
    let indice = 0;
    for (let n of navesJSON) {

        $template2.querySelector(".nombre-aeronave").textContent = "Modelo: " + n.modeloaeronave
        $template2.querySelector(".matricula-aeronave").textContent = n["matricula"]
        $template2.querySelectorAll(".seleccionar-nave")[indice].setAttribute("matricula", n["matricula"]);
        $template2.querySelectorAll(".seleccionar-nave")[indice].setAttribute("index", indice);
        $template2.querySelectorAll(".seleccionar-nave")[indice].setAttribute("seleccionado", 0);
        let $clone = document.importNode($template2, true);
        $fragmento2.appendChild($clone);
    }

    $seccionNaves.appendChild($fragmento2);

}

const traerModelo = async (matricula) => {

    return await fetch(url, {

        method: 'POST',

        body: JSON.stringify({
            "matricula": matricula
        }),

        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json());

}


const traerTripulacion = (trip) => {
    console.log(trip)
    limpiar()
    let index = 0;
    trip.forEach(p => {

        $template.querySelector(".nombre-tripulante").textContent = p["nombre"]
        $template.querySelector(".cargo-tripulante").textContent = p["posicion"]
        $template.querySelector(".disponibilidad-tripulante").textContent = "ID: " + p["idpersonal"]
        $template.querySelector(".ubicacion-tripulante").textContent = p["activo"] ? "Disponible" : "No Disponible"
        $template.querySelector(".ubicacion-disponibilidad").classList.toggle("ubicacion-disponibilidad" + index)
        $template.querySelector(".nombre-cargo").classList.toggle("nombre-cargo" + index)
        $template.querySelector(".tripulante").classList.toggle("nombre-cargo" + index)
        //tripulante        
        $template.querySelector(".tripulante").setAttribute("index", index);
        $template.querySelector(".nombre-cargo").setAttribute("index", index);
        $template.querySelector(".ubicacion-disponibilidad").setAttribute("idpersonal", p["idpersonal"]);
        $template.querySelector(".ubicacion-disponibilidad").setAttribute("index", index);
        index++;
        let $clone = document.importNode($template, true);
        $fragmento.appendChild($clone);

    })
    $secciontrip.appendChild($fragmento);



}


const limpiarListasProgramado = () => {

    document.querySelector(".asignar-tripulacion").style.display = "none";
    limpiarAeronave();
    limpiar();
    document.querySelector(".cantidad-aux").textContent = "0";

}



const limpiar = () => {

    while ($secciontrip.firstChild) {
        $secciontrip.firstChild.remove();
    }


}


const limpiarAeronave = () => {

    while ($seccionNaves.firstChild) {
        $seccionNaves.firstChild.remove();
    }


}




export { traerTripulacion, traerNaves, limpiarListasProgramado };
