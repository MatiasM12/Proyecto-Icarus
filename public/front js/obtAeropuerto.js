const url = "http://localhost:3010/obtenerAeropuerto"

const obtAeropuerto = async (codiata, func) => {
    console.log(codiata)

    try {
        fetch(url, {

            method: 'POST',

            body: JSON.stringify({
                "codiata": codiata
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }

        })
            .then(response => response.json())
            .then(data => { { func(data["lat"], data["lon"]) } });
    }
    catch (error) {
        console.log(error)
    }
}



export { obtAeropuerto }