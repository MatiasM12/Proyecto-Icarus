import { getInfoTecnica } from "./infotecnica.js";
import { InsertTripulante } from "./obtTripulacion.js";

const $d = document;
const $tablaElem = $d.querySelector(".tripulacion-seleccionada");
const $tablaPlan = $d.querySelector(".tripulacion");
const $template = $d.getElementById("template-trip-select").content;
const $templatePlan = $d.getElementById("trip-plan-template").content;
const $fragmento = document.createDocumentFragment();
const $fragmento2 = document.createDocumentFragment();
const url = "http://localhost:3010/IngresoAeronaveManual";

const div_selec_trip = document.querySelector(".asignar-tripulacion");





const pintarTripulante = (e) => {

    console.log(e)
    const elem = (e.target);
    const indiceElem = elem.getAttribute("index");
    document.querySelector(".nombre-cargo" + indiceElem).style.backgroundColor = "#40CFFF";
    document.querySelector(".ubicacion-disponibilidad" + indiceElem).style.backgroundColor = "#40CFFF";
    document.querySelectorAll(".tripulante")[indiceElem].setAttribute("seleccionado", 1);

}

const despintarNave = (elements) => {

    elements.forEach(n => {

        n.style.backgroundColor = "#768da6"
        n.setAttribute("seleccionado", 0);

    })

}

const pintarNave = (e) => {


    const elem = (e.target);
    const indiceElem = elem.getAttribute("index");

    const divs = (document.querySelectorAll("div.pintar-nave"))
    despintarNave(divs);

    divs.forEach(d => {
        if (elem.getAttribute("index") === d.getAttribute("index")) {
            elem.style.backgroundColor = "#40CFFF";
            elem.setAttribute("seleccionado", 1);
        }

    })



    //7 document.querySelector(".nombre-cargo"+indiceElem).style.backgroundColor = "#40CFFF";
    // document.querySelector(".ubicacion-disponibilidad"+indiceElem).style.backgroundColor = "#40CFFF";

    //  document.querySelectorAll(".tripulante")[indiceElem].setAttribute("seleccionado",1);

    //e.target.setAttribute("pintar", "1");

    //e.target.style.backgroundColor = 

}


const pasarNaveSeleccionada = async (idvuelo) => {

    const divs = $d.querySelectorAll("div.pintar-nave");
    let vuelo = JSON.parse(localStorage.getItem(idvuelo + ""))

    divs.forEach(n => {

        if (n.getAttribute("seleccionado") == 1) {
            document.querySelector(".aer-titulo").textContent = n.querySelector(".nombre-aeronave").textContent;
            var aux = n.querySelector(".matricula-aeronave").textContent;
            document.querySelector(".aer-matricula").textContent = aux;

            let permisos = JSON.parse(localStorage.getItem('camposVentanaModificar'));
            permisos["aeronave"] = true;
            localStorage.setItem("camposVentanaModificar", JSON.stringify(permisos));
            PersistirAeronave(vuelo.pv, aux);
            getInfoTecnica(aux)
            div_selec_trip.style.display = "flex"


        }

    })
}


const PersistirAeronave = async (idvuelo, matricula) => {

    await fetch(url, {

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

const pasarATabla = async () => {

    let tripulantes = $d.querySelectorAll(".tripulante");
    limpiar()

    //let tripulanteAInsertar = []
    let cantidadAux = parseInt(document.querySelector(".cantidad-aux").textContent);
    let cantidadPiloto = parseInt(document.querySelector(".cantidad-pil").textContent);
    let cantidadCopiloto = parseInt(document.querySelector(".cantidad-copil").textContent);

    let tripulantesASeleccionar = [];

    tripulantes.forEach(t => {
        if (t.getAttribute("seleccionado") === "1") {

            if (t.querySelector(".cargo-tripulante").textContent === "auxiliar") {
                console.log("soy auxiliar nico")
                tripulantesASeleccionar.push(t)
                cantidadAux--;
            }

            if (t.querySelector(".cargo-tripulante").textContent === "piloto") {
                console.log("soy piloto nico")
                tripulantesASeleccionar.push(t)
                cantidadPiloto--;
            }

            if (t.querySelector(".cargo-tripulante").textContent === "co-piloto") {
                console.log("soy co-piloto nico")
                tripulantesASeleccionar.push(t)
                cantidadCopiloto--;
            }

        }
    });

    console.log(cantidadAux, cantidadPiloto, cantidadCopiloto)

    if (cantidadAux === 0 && cantidadPiloto === 0 && cantidadCopiloto === 0) {

        for (let t of tripulantesASeleccionar) {
            $template.querySelector(".nombre-tripulante-seleccionado").textContent = t.querySelector(".nombre-tripulante").textContent
            $template.querySelector(".rango-tripulante-seleccionado").textContent = t.querySelector(".cargo-tripulante").textContent
            let insertTripulacion = { "idpersonal_fk": parseInt(t.querySelector(".ubicacion-disponibilidad").getAttribute("idpersonal")), "idvuelo_fk": document.querySelector(".vuelo-mod").textContent }
            InsertTripulante(insertTripulacion)
            let $clone = document.importNode($template, true);
            $fragmento.appendChild($clone);
        }

        $tablaElem.appendChild($fragmento);
        let permisos = JSON.parse(localStorage.getItem('camposVentanaModificar'));
        permisos["tripulacion"] = true;
        localStorage.setItem("camposVentanaModificar", JSON.stringify(permisos));


    }

    else {
        let cartel = document.querySelector(".cartel-alerta");
        cartel.style.display = "flex"
        cartel.querySelector(".msj-alerta").textContent = "Los tripulantes seleccionados no cumplen con los requisitos"
    }

}
const pasarATablaAPI = (json) => {

    console.log(json);


    limpiar()
    json.forEach(t => {

        $template.querySelector(".nombre-tripulante-seleccionado").textContent = t["nombre"];
        $template.querySelector(".rango-tripulante-seleccionado").textContent = t["posicion"];
        let $clone = document.importNode($template, true);
        $fragmento.appendChild($clone);

    });

    $tablaElem.appendChild($fragmento);

}

const pasarATablaAPIPlanvuelos = (json) => {
    limpiarTablaPlan()
    json.forEach(t => {

        $templatePlan.querySelector(".nombre-tripulante-plan").textContent = t["nombre"];
        $templatePlan.querySelector(".rango-tripulante-plan").textContent = t["posicion"];
        let $clone = document.importNode($templatePlan, true);
        $fragmento2.appendChild($clone);

    });

    $tablaPlan.appendChild($fragmento2);
}
const limpiarTablaPlan = () => {

    while ($tablaPlan.firstChild) {
        $tablaPlan.firstChild.remove();
    }


}

const limpiar = () => {

    while ($tablaElem.firstChild) {
        $tablaElem.firstChild.remove();
    }


}

const pasarNaveAPI = (json) => {


    try {

        document.querySelector(".aer-titulo").textContent = "Modelo Aeronave: " + (json[0]["modeloaeronave"] === null ? "Nave no asignada" : json[0]["modeloaeronave"])
        document.querySelector(".aer-matricula").textContent = "Matricula: " + (json[0]["aeronave_matricula_fk"] === null ? "Nave no asignada" : json[0]["aeronave_matricula_fk"])
        if (json[0]["aeronave_matricula_fk"] != null) {
            getInfoTecnica(json[0]["aeronave_matricula_fk"])
        }

    }
    catch (err) {

        document.querySelector(".aer-titulo").textContent = "Modelo Aeronave: Indefinido"
        document.querySelector(".aer-matricula").textContent = "Matricula: Indefinido"
    }

}

const pasarNaveAPIPlanVuelo = (json) => {


    console.log("soy mas info" + json)

    try {
        document.querySelector(".modelo-plan").textContent = "Modelo Aeronave: " + (json[0]["modeloaeronave"] === null ? "Nave no asignada" : json[0]["modeloaeronave"])
        document.querySelector(".patente-plan").textContent = "Matricula: " + (json[0]["aeronave_matricula_fk"] === null ? "Nave no asignada" : json[0]["aeronave_matricula_fk"])

    }
    catch (err) {
        document.querySelector(".modelo-plan").textContent = "Modelo Aeronave: Indefinido."
        document.querySelector(".patente-plan").textContent = "Matricula: Indefinido."
    }



}




export { limpiar, pintarTripulante, pasarATabla, pintarNave, pasarNaveSeleccionada, pasarATablaAPI, pasarATablaAPIPlanvuelos, pasarNaveAPI, pasarNaveAPIPlanVuelo };
