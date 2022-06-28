const url1 = "http://localhost:3010/actualizarCambioDeTripulacion"
const url2 = "http://localhost:3010/obtenerHistorial";


const $templateHistorial = document.getElementById("historial-generacion-automatica").content;
const $seccionHistorial = document.querySelector(".seccion-historial-automatico");


const $fragmento = document.createDocumentFragment();

const actualizarHistorial = async (pv) => {

    let usuarioCambioEstado = (localStorage.getItem("usuarioActual"))
    let hoy = new Date();

    await fetch(url1, {
        method: 'PUT',
        body: JSON.stringify({
            "estado": "Reprogramado",
            "usuario": usuarioCambioEstado,
            "fecha_y_hora": hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate() + ' ' + (hoy.getHours()) + ':' + hoy.getMinutes(),
            "cambiotripulacion": true,
            "idvuelo": pv
        }),
        headers: {
            'Access-Control-Allow-Origin': '*',
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(response => console.log(response))


}
//Obtener el historial de un plan de vuelo especifico----------------------------------------------------------


/*
const obtenerHistorial = async ()=> {

 await fetch(url2, {
    method: 'POST',
    body: {
        "idvuelo":"SF0051-202206220745"
    } ,
    headers: {
        'Access-Control-Allow-Origin': '*',
        "Content-type": "application/json; charset=UTF-8"
    }
}).then(response => response).then(data => cargarHistorial(data));



}

*/

const obtenerHistorial = (pv) => {


    fetch(url2, {

        method: 'POST',

        body: JSON.stringify({
            "idvuelo": pv
        })
        ,
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())
        .then(data => cargarHistorial(data));




}



const cargarHistorial = (response) => {



    limpiar()


    response.forEach(t => {



        $templateHistorial.querySelector(".estado-his").textContent = t["estado"];
        $templateHistorial.querySelector(".fyh-his").textContent = t["fecha_y_hora"];
        $templateHistorial.querySelector(".aeronave-his").textContent = t["aeronave"];
        $templateHistorial.querySelector(".tripulacion-his").textContent = t["cambiotripulacion"] ? "SI" : "NO";
        $templateHistorial.querySelector(".user-his").textContent = t["usuario"] + ": " + t["nombre"] + " " + t["apellido"];
        let $clone = document.importNode($templateHistorial, true);
        $fragmento.appendChild($clone);

        console.log(t)

    });

    $seccionHistorial.appendChild($fragmento);

}

const limpiar = () => {

    while ($seccionHistorial.firstChild) {
        $seccionHistorial.firstChild.remove();
    }


}




export { obtenerHistorial, actualizarHistorial }