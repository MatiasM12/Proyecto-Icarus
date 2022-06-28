let url = 'http://localhost:3010/mantenimiento'

const url2 = 'https://operaciones-mantenimiento.herokuapp.com/Vuelo/saveControlesXVuelo/'




const getmantenimineto = async () => {

    document.querySelector(".anLoader").style.display = "flex";

    let aux = await fetch(url, {

        method: 'PUT',

        body: JSON.stringify({
            "matricula": document.querySelector(".aer-matricula").textContent
        })
        ,
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())//.then(data=>console.log(data))
        .then(data => pintarMantenimiento(data));
    return aux


}

const pintarMantenimiento = (data) => {


    console.log(data);
    let TextMant = document.querySelector(".integracion-permisos-mant").textContent = "Permisos Aeronave : APROBADO"
    if (data == true) {
        //TextMant = "Mantenimiento Exitoso"
        const permisosProgramado = JSON.parse(localStorage.getItem('camposVentanaModificar'));
        permisosProgramado.permisoAeronave = true;
        localStorage.setItem("camposVentanaModificar", JSON.stringify(permisosProgramado));
    }
    else
        TextMant = "Permisos Aeronave: DESAPROBADO";

    document.querySelector(".anLoader").style.display = "none";

}

const pedirMantenimiento = (id) => {

    let vuelo = JSON.parse(localStorage.getItem(id + ""))
    let idcodVuelo = vuelo["pv"]

    console.log("mantenimiento")


    fetch(url2 + idcodVuelo, {

        method: 'POST',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response)
        .then(data => {

            console.log(data)

            return data;
        });;


}



export { getmantenimineto, pedirMantenimiento }