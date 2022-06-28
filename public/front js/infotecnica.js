const url = "http://localhost:3010/aeronavePorMatricula";

const $cantAux = document.querySelector(".cantidad-aux");


const getInfoTecnica = async (matricula) => {

    await fetch(url, {

        method: 'POST',

        body: JSON.stringify({
            "matricula": matricula
        })
        ,
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())
        .then(data => pintarCantidadAux(data));

}


const pintarCantidadAux = (data) => {

    console.log(data);

    $cantAux.textContent = data["EquipoTripulacion"] - 2;


}




export { getInfoTecnica }