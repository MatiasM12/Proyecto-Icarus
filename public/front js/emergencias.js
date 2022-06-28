const url = "http://localhost:3010/pedirEmergencias"
const textoEmergencia = document.querySelector(".emer");

const obtEmergencia = () => {


    fetch(url, {

        method: 'POST',
        body: JSON.stringify({
            "idvuelo": document.querySelector(".vuelo-mod").textContent
        }),

        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())
        .then(data => pintarEmergencia(data));
}


const pintarEmergencia = (data) => {

    const permisosAterrizado = JSON.parse(localStorage.getItem('camposVentanaModificar'));
    permisosAterrizado.emergencias = true;
    localStorage.setItem("camposVentanaModificar", JSON.stringify(permisosAterrizado));

    if (data.length === 0)
        textoEmergencia.textContent = "Emergencias : NO"
    else
        textoEmergencia.textContent = "Emergencia : SI";

}

export { obtEmergencia };


