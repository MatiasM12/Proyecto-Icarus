const url = "http://localhost:3010/getpermisosTripulacion"



const getPermisosTripulacion = async (idvuelo) => {

    document.querySelector(".triLoader").style.display = "flex";

    let vuelo = JSON.parse(localStorage.getItem(idvuelo))


    let aux = await fetch(url, {

        method: 'POST',

        body: JSON.stringify({
            "idvuelo": vuelo.pv
        })
        ,
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())//.then(data=>console.log(data))
        .then(data => pintarPermisosTripulacion(data));// pintarPermisosTripulacion(data)) ;

    return aux


}




const pintarPermisosTripulacion = (data) => {
    console.log("asd")
    if (data) {
        const permisosProgramado = JSON.parse(localStorage.getItem('camposVentanaModificar'));
        permisosProgramado["permisoTripulacion"] = true;
        localStorage.setItem("camposVentanaModificar", JSON.stringify(permisosProgramado));
        document.querySelector(".permisoT").textContent = "Permisos Tripulacion: APROBADO"
    }
    else {
        console.log("asd")
        document.querySelector(".permisoT").textContent = "Permisos Tripulacion: DESAPROBADO";
    }

    document.querySelector(".triLoader").style.display = "none";
}

export { getPermisosTripulacion }