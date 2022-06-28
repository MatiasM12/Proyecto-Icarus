const url = "http://localhost:3010/enviarReporte";


const mandarEmail = async (link, tipoReporte) => {


    try {
        fetch(url, {

            method: 'POST',

            body: JSON.stringify({
                "link": link,
                "reporte": tipoReporte
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }

        })
            .then(response => response)

    }
    catch (error) {
        console.log(error)
    }
}



export { mandarEmail }