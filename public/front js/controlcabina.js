// "SF1111-202205311830"
const url = "https://operaciones-mantenimiento.herokuapp.com/ControlXVuelo/allByVuelo/"

const $seccionControl = document.querySelector(".control-cabina");
const $template = document.getElementById("template-cabina").content;
const $fragmento = document.createDocumentFragment();

const getControlCabina = async (id) => {

    document.querySelector(".caLoader").style.display = "flex";

    let vuelo = JSON.parse(localStorage.getItem(id + ""))


    let aux = await fetch(url + vuelo["pv"], {

        method: 'GET',

        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())//.then(data=>console.log(data))
        .then(data => pintarControlesEnPantalla(data));

    return aux


}

const pintarControlesEnPantalla = (json) => {


    limpiar();
    document.querySelector(".resultado-control-cabina").textContent = "Control " + (json["Approved"] ? "Aprobado" : "Desaprobado")
    json["AllControls"].forEach(control => {


        $template.querySelector(".nombre-control").textContent = control["Control"]["Name"]
        $template.querySelector(".descripcion-control").textContent = control["Control"]["Description"]
        // $template.querySelector(".cantidad-insumo").textContent ="Cantidad final: "+ control["FinalQuantity"]
        let $clone = document.importNode($template, true);
        $fragmento.appendChild($clone);
    })

    if (json["Approved"]) {
        let permisos = JSON.parse(localStorage.getItem('camposVentanaModificar'));
        permisos["controles"] = true;
        localStorage.setItem("camposVentanaModificar", JSON.stringify(permisos));

    }


    $seccionControl.appendChild($fragmento);

    document.querySelector(".caLoader").style.display = "none";

}


const limpiar = () => {

    while ($seccionControl.firstChild) {
        $seccionControl.firstChild.remove();



    }


}


export { getControlCabina }

