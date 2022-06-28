const url = "http://localhost:3010/solicitudes-autorizadas"

const $templateHistorial = document.getElementById("template-historial-contrasena").content;
const $seccionHistorial = document.querySelector(".solitudes-cambios-contrasena");
const $fragmento = document.createDocumentFragment();


const getHistorialContrasena = () => {

    fetch(url, {

        method: 'GET',

        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())//.then(data=>console.log(data))
        .then(data => pintarSolitudCambioContraseña(data));


}



const pintarSolitudCambioContraseña = (data) => {

    limpiar();

    data.forEach(e => {

        $templateHistorial.querySelector(".user-soli").textContent = e["username"]

        $templateHistorial.querySelector(".email-soli").textContent = e["mail"]

        $templateHistorial.querySelector(".fecha-cambio-contra").textContent = (e["fecha"])


        let $clone = document.importNode($templateHistorial, true);
        $fragmento.appendChild($clone);
    })
    $seccionHistorial.appendChild($fragmento);

}



const limpiar = () => {

    while ($seccionHistorial.firstChild) {
        $seccionHistorial.firstChild.remove();
    }


}


export { getHistorialContrasena }