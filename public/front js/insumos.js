const url = 'https://operaciones-mantenimiento.herokuapp.com/Insumo/Vuelo/allCateringByVuelo/';
const url2 = 'https://operaciones-mantenimiento.herokuapp.com/Vuelo/saveInsumosXVuelo/';
const url3 = 'https://operaciones-mantenimiento.herokuapp.com/Insumo/Vuelo/cantidadFinalByCodVuelo/'

const $seccionInsumos = document.querySelector(".insumos-aeronave");
const $template = document.getElementById("template-insumos").content;
const $fragmento = document.createDocumentFragment();
const $iconoLoad = document.querySelector(".insumosLoader")

const obtInsumo = (id) => {

    document.querySelector(".inLoader").style.display = "flex";
    let vuelo = JSON.parse(localStorage.getItem(id + ""))

    let idcodVuelo = vuelo["pv"]



    fetch(url + idcodVuelo, {

        method: 'GET',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())
        .then(data => pintarInsumosENPantalla(data));




}

const pedirInsumo = (id) => {

    let vuelo = JSON.parse(localStorage.getItem(id + ""))
    let idcodVuelo = vuelo["pv"]
    $iconoLoad.style.display = "flex"

    console.log(idcodVuelo)


    fetch(url2 + idcodVuelo, {

        method: 'POST',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response)
        .then(data => {

            console.log(data)
            $iconoLoad.style.display = "none"
            let cartel = document.querySelector(".cartel-alerta");
            cartel.style.display = "flex"
            cartel.querySelector(".msj-alerta").textContent = "Se ha enviado la solicitud.";

            return data;
        });


}


const pedirInsumoFinal = (id) => {

    let vuelo = JSON.parse(localStorage.getItem(id + ""))
    let idcodVuelo = vuelo["pv"]


    console.log(idcodVuelo)


    fetch(url3 + idcodVuelo, {

        method: 'GET',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())
        .then(data => pintarInsumosFinal(data));


}


const pintarInsumosENPantalla = (json) => {

    limpiar();
    json.forEach(insumo => {
        $template.querySelector(".nombre-insumo").textContent = insumo["Supply"]["Name"]
        $template.querySelector(".descripcion-insumo").textContent = insumo["Supply"]["Description"]
        $template.querySelector(".cantidad-insumo").textContent = "Cantidad final: " + insumo["FinalQuantity"]
        let $clone = document.importNode($template, true);
        $fragmento.appendChild($clone);
    })

    $seccionInsumos.appendChild($fragmento);
    let permisos = JSON.parse(localStorage.getItem('camposVentanaModificar'));
    permisos["insumos"] = true;
    localStorage.setItem("camposVentanaModificar", JSON.stringify(permisos));
    document.querySelector(".inLoader").style.display = "none";


}

const pintarInsumosFinal = (json) => {

    console.log(json)

    console.log("pinte insumos " + json)

    document.querySelector(".insumosC-vuelo").textContent = "Insumos : " + json;


}


const limpiar = () => {

    while ($seccionInsumos.firstChild) {
        $seccionInsumos.firstChild.remove();


    }


}




export { obtInsumo, pedirInsumo, pedirInsumoFinal }
