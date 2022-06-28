const url = "http://localhost:3010/InformarCargaDestino"

const textoAviso = document.querySelector(".aviso-des");


const avisarDespacho = () => {


    document.querySelector(".desLoader").style.display = "flex";

    fetch(url, {

        method: 'PUT',

        body: JSON.stringify({
            "idvuelo": document.querySelector(".vuelo-mod").textContent
        }),


        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())
        .then(data => pintarAviso(data));
}


const pintarAviso = (data) => {

    if (data) {
        textoAviso.style.display = "flex";
        const permisosAterrizado = JSON.parse(localStorage.getItem('camposVentanaModificar'));
        permisosAterrizado.envioDespacho = true;
        localStorage.setItem("camposVentanaModificar", JSON.stringify(permisosAterrizado));
    }

    document.querySelector(".desLoader").style.display = "none";




}

export { avisarDespacho };
