const url2 = "http://localhost:3010/checkIn"

const textoCheck = document.querySelector(".estado-check");
const textoPasajeros = document.querySelector(".pasajeros");//peso-checkin
const textoPeso = document.querySelector(".peso-checkin");


const obtCheck = (indice) => {

    document.querySelector(".checkLoader").style.display = "flex";

    let vuelo = JSON.parse(localStorage.getItem(indice + ""))

    fetch(url2, {

        method: 'POST',

        body: JSON.stringify({
            "idvuelo": vuelo["pv"]
        }),

        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())
        .then(data => pintarCheck(data));
}



const pintarCheck = (data) => {

    if (data["sobrecarga"])
        textoCheck.textContent = "Check-in: Desaprobado ";

    else {
        textoCheck.textContent = "Check-in: Aprobado ";
        let permisos = JSON.parse(localStorage.getItem('camposVentanaModificar'));
        permisos["permisoCheckIn"] = true;
        localStorage.setItem("camposVentanaModificar", JSON.stringify(permisos));

    }

    textoPasajeros.textContent = "Cantidad de Pasajeros: " + (data["cantidadPasajeros"] === null ? "0" : data["cantidadPasajeros"])

    textoPeso.textContent = "Carga Aeronave en KG: " + (data["pesoKG"] === null ? "0" : data["pesoKG"]);

    document.querySelector(".checkLoader").style.display = "none";

}

export { obtCheck };

