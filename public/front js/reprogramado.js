//import { getInfoTecnica } from "./infotecnica";
import { actualizarHistorial } from "./historial.js";
import { getInfoTecnica } from "./infotecnica.js";
const url = "http://localhost:3010/rutaAlternativaReprogramar";
const url3 = 'http://localhost:3010/IngresoTripulante';
const url2 = "http://localhost:3010/IngresoAeronaveManual"


const $seccionCambioRutas = document.querySelector(".cambio-rutas");
const $seccionCambioExcluir = document.querySelector(".cambio-rutas-excluir");
const $template = document.getElementById("template-cambio-rutas").content;
//cambio-rutas-excluir
const $template2 = document.getElementById("template-cambio-rutas-excluir").content;
//"  "lista-aeronave lista-aviones-reprogramado""template-avion-reprogramado"
const $template3 = document.getElementById("template-trip-reprogramado").content;





/*Elementos tripulantes seleccionados*/
const $tablaElem = document.querySelector(".tripulacion-seleccionada");

const $templateTripSeleccionada = document.getElementById("template-trip-select").content;

const $fragmento2 = document.createDocumentFragment();



const $seccionTripulantesreprogramados = document.querySelector(".lista-tripulantes-reprogramado");

const $templateTrip = document.getElementById("template-trip-reprogramado").content;

const $fragmento = document.createDocumentFragment();


/*ELEMENTOS AERONAVE*/
const $seccionAeronaveRepro = document.querySelector(".lista-aviones-repro");

const $templateaeronave = document.getElementById("template-avion-repro").content

const $fragmento3 = document.createDocumentFragment();


// ventana de tripulantes

const traerTrip = document.querySelectorAll(".asignar-tripulacion")[1];



const obtRutaAlternativa = (indice) => {

    let vuelo = JSON.parse(localStorage.getItem(indice + ""))
    let inputsDestinos = document.querySelectorAll(".input-cod-iata");
    let inputsExcluir = document.querySelectorAll(".input-cod-iata-ex");
    let arr = []
    let arr2 = []

    inputsDestinos.forEach((elem) => {
        arr.push(elem.value)
    })
    inputsExcluir.forEach(elem => {
        arr2.push(elem.value)
    })


    fetch(url, {

        method: 'POST',

        body: JSON.stringify({

            "idvuelo": vuelo["pv"],
            "matricula": vuelo["matricula"],
            "fechaaterrizajeestimado": vuelo["fechallegada"],
            "aircraft": null,
            "includeDestinations": arr,
            "excludeDestinations": arr2
        }),

        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())
        .then(data => pintarNuevaRuta(data)).catch(err => alert("Error codigo iata"));

}


const pintarNuevaRuta = (data) => {
    document.querySelector(".ruta-modificar").textContent = "Ruta :" + data["route"]
}

const pintarInputsRuta = () => {
    let cantInputs = document.querySelector(".cant-rutas").value;
    limpiar();
    for (let i = 1; i <= cantInputs; i++) {

        let $clone = document.importNode($template, true);
        $fragmento.appendChild($clone);
    }

    $seccionCambioRutas.appendChild($fragmento);
}

const pintarInputsRutaExcluir = () => {
    let cantInputsAExcluir = document.querySelector(".cant-rutas-excluir").value;
    limpiar2();

    for (let i = 1; i <= cantInputsAExcluir; i++) {

        let $clone = document.importNode($template2, true);
        $fragmento2.appendChild($clone);
    }

    $seccionCambioExcluir.appendChild($fragmento2);
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




/*Traer tripulacion*/
const traerTripulacionRepro = (trip) => {
    limpiar()
    let index = 0;

    console.log(trip);

    trip.forEach(p => {
        $templateTrip.querySelector(".nombre-tripulante-repro").textContent = p["nombre"]
        $templateTrip.querySelector(".cargo-tripulante-repro").textContent = p["posicion"]
        $templateTrip.querySelector(".disponibilidad-tripulante-repro").textContent = "ID: " + p["idpersonal"]
        $templateTrip.querySelector(".ubicacion-tripulante-repro").textContent = p["activo"] ? "Disponible" : "No Disponible"
        $templateTrip.querySelector(".ubicacion-disponibilidad-repro").classList.toggle("ubicacion-disponibilidad-repro" + index)
        $templateTrip.querySelector(".nombre-cargo-repro").classList.toggle("nombre-cargo-repro" + index)

        //$templateTrip.querySelector(".tripulante-repro").classList.toggle("nombre-cargo-repro"+index)

        //tripulante        
        $templateTrip.querySelector(".tripulante-repro").setAttribute("indexRepro", index);
        $templateTrip.querySelector(".nombre-cargo-repro").setAttribute("indexRepro", index);
        $templateTrip.querySelector(".ubicacion-disponibilidad-repro").setAttribute("idpersonal", p["idpersonal"]);
        $templateTrip.querySelector(".ubicacion-disponibilidad-repro").setAttribute("indexRepro", index);
        index++;
        let $clone = document.importNode($templateTrip, true);
        $fragmento.appendChild($clone);

    })
    $seccionTripulantesreprogramados.appendChild($fragmento);



}
/*Pasar tripulante a la tabla*/
const pasarATablaReprogramado = async () => {

    let tripulantes = document.querySelectorAll(".tripulante-repro");

    limpiarSeleccionados();

    let cantidadAux = parseInt(document.querySelector(".cantidad-aux").textContent);
    let cantidadPiloto = parseInt(document.querySelector(".cantidad-pil").textContent);
    let cantidadCopiloto = parseInt(document.querySelector(".cantidad-copil").textContent);

    let tripulantesASeleccionar = [];

    tripulantes.forEach(t => {

        if (t.getAttribute("seleccionado") === "1") {
            //console.log("Entre")

            if (t.querySelector(".cargo-tripulante-repro").textContent === "auxiliar") {
                console.log("soy auxiliar nico")
                tripulantesASeleccionar.push(t)
                cantidadAux--;
            }

            if (t.querySelector(".cargo-tripulante-repro").textContent === "piloto") {
                console.log("soy piloto nico")
                tripulantesASeleccionar.push(t)
                cantidadPiloto--;
            }

            if (t.querySelector(".cargo-tripulante-repro").textContent === "co-piloto") {
                console.log("soy co-piloto nico")
                tripulantesASeleccionar.push(t)
                cantidadCopiloto--;
            }

            /* 
             $templateTripSeleccionada.querySelector(".nombre-tripulante-seleccionado").textContent = t.querySelector(".nombre-tripulante-repro").textContent
             $templateTripSeleccionada.querySelector(".rango-tripulante-seleccionado").textContent = t.querySelector(".cargo-tripulante-repro").textContent
             let insertTripulacion={"idpersonal_fk":parseInt(t.querySelector(".ubicacion-disponibilidad-repro").getAttribute("idpersonal")),"idvuelo_fk": document.querySelector(".vuelo-mod").textContent}           
             InsertTripulante(insertTripulacion)
             let $clone = document.importNode($templateTripSeleccionada, true);
             $fragmento2.appendChild($clone);
             */
        }
    });

    if (cantidadAux === 0 && cantidadPiloto === 0 && cantidadCopiloto === 0) {
        for (let t of tripulantesASeleccionar) {
            $templateTripSeleccionada.querySelector(".nombre-tripulante-seleccionado").textContent = t.querySelector(".nombre-tripulante-repro").textContent
            $templateTripSeleccionada.querySelector(".rango-tripulante-seleccionado").textContent = t.querySelector(".cargo-tripulante-repro").textContent
            let insertTripulacion = { "idpersonal_fk": parseInt(t.querySelector(".ubicacion-disponibilidad-repro").getAttribute("idpersonal")), "idvuelo_fk": document.querySelector(".vuelo-mod").textContent }
            InsertTripulante(insertTripulacion)

            ///Aca hay que actualizar 

            actualizarHistorial(document.querySelector(".vuelo-mod").textContent);

            let $clone = document.importNode($templateTripSeleccionada, true);
            $fragmento2.appendChild($clone);
        }
        $tablaElem.appendChild($fragmento2);
        let permisos = JSON.parse(localStorage.getItem('camposVentanaModificar'));
        permisos["reprotripulacion"] = true;
        localStorage.setItem("camposVentanaModificar", JSON.stringify(permisos));
    }


    else {
        let cartel = document.querySelector(".cartel-alerta");
        cartel.style.display = "flex"
        cartel.querySelector(".msj-alerta").textContent = "Los tripulantes seleccionados no cumplen con los requisitos"
    }



}

/*Pintar tripulante*/

const pintarTripulanteRepro = (e) => {
    const elem = (e.target);
    const indiceElem = parseInt(elem.getAttribute("indexrepro"));
    document.querySelector(".nombre-cargo-repro" + indiceElem).style.backgroundColor = "#40CFFF";
    document.querySelector(".ubicacion-disponibilidad-repro" + indiceElem).style.backgroundColor = "#40CFFF";
    document.querySelectorAll("div.tripulante-repro")[indiceElem].setAttribute("seleccionado", 1);
}


/*---------------------------------------Traer aeronave y pintarla--------------------------*/

/*Traer aeronaves*/

const traerNavesRepro = async (navesJSON) => {
    limpiarAeronave()
    limpiar();
    traerTrip.style.display = "none";
    let indice = 0;
    for (let n of navesJSON) {

        $templateaeronave.querySelector(".nombre-aeronave-repro").textContent = "Modelo: " + n.modeloaeronave
        $templateaeronave.querySelector(".matricula-aeronave-repro").textContent = n["matricula"]
        $templateaeronave.querySelectorAll(".seleccionar-nave-repro")[indice].setAttribute("matriculaRepro", n["matricula"]);
        $templateaeronave.querySelectorAll(".seleccionar-nave-repro")[indice].setAttribute("indexRepro", indice);
        $templateaeronave.querySelectorAll(".seleccionar-nave-repro")[indice].setAttribute("seleccionado", 0);
        let $clone = document.importNode($templateaeronave, true);
        $fragmento3.appendChild($clone);
    }

    $seccionAeronaveRepro.appendChild($fragmento3);

}

const pintarNaveRepro = (e) => {


    const elem = (e.target);
    //const indiceElem = elem.getAttribute("index");

    const divs = (document.querySelectorAll("div.pintar-nave-repro"))
    despintarNave(divs);

    divs.forEach(d => {
        if (elem.getAttribute("index") === d.getAttribute("index")) {
            elem.style.backgroundColor = "#40CFFF";
            elem.setAttribute("seleccionado", 1);
        }

    })
}

const despintarNave = (elements) => {

    elements.forEach(n => {
        n.style.backgroundColor = "#768da6"
        n.setAttribute("seleccionado", 0);

    })

}

const pasarNaveSeleccionadaRepro = async (idvuelo) => {

    const divs = document.querySelectorAll("div.pintar-nave-repro");
    let vuelo = JSON.parse(localStorage.getItem(idvuelo + ""))

    divs.forEach(n => {

        if (n.getAttribute("seleccionado") == 1) {
            document.querySelector(".aer-titulo").textContent = n.querySelector(".nombre-aeronave-repro").textContent;
            var aux = n.querySelector(".matricula-aeronave-repro").textContent;
            document.querySelector(".aer-matricula").textContent = aux;
            let permisos = JSON.parse(localStorage.getItem('camposVentanaModificar'));
            permisos["repronave"] = true;
            localStorage.setItem("camposVentanaModificar", JSON.stringify(permisos));
            PersistirAeronave(vuelo.pv, aux);
            getInfoTecnica(aux)
            traerTrip.style.display = "flex";

        }

    })
}

const PersistirAeronave = async (idvuelo, matricula) => {

    await fetch(url2, {

        method: 'PUT',

        body: JSON.stringify({
            "idvuelo": idvuelo,
            "aeronave_matricula_fk": matricula
        })
        ,
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })


}



/*---------------------------------------LIMPIAR AERONAVES Y TRIPULACION-------------------------*/
const limpiarListasReprogramado = () => {

    document.querySelector(".asignar-reprotripulacion").style.display = "none";

    limpiarAeronave();
    limpiar();
    limpiar2();
}



const limpiarAeronave = () => {

    while ($seccionAeronaveRepro.firstChild) {
        $seccionAeronaveRepro.firstChild.remove();
    }


}


const limpiar = () => {
    while ($seccionTripulantesreprogramados.firstChild) {
        $seccionTripulantesreprogramados.firstChild.remove();
    }
}

const limpiar2 = () => {
    while ($seccionCambioExcluir.firstChild) {
        $seccionCambioExcluir.firstChild.remove();
    }
}

/*Limpiar tabla tripulantes seleccionados*/

const limpiarSeleccionados = () => {

    while ($tablaElem.firstChild) {
        $tablaElem.firstChild.remove();
    }

}



export {
    limpiarListasReprogramado, pintarTripulanteRepro, pintarInputsRuta, traerNavesRepro, pasarATablaReprogramado,
    traerTripulacionRepro, pintarInputsRutaExcluir, obtRutaAlternativa, pintarNaveRepro, pasarNaveSeleccionadaRepro
}



