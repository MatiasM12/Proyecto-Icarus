const url = "http://localhost:3010/cod-verificacion"

const url2 = "http://localhost:3010/verificar-cod"


const url3 = "http://localhost:3010/solicitar-nueva-contra"


const enviarCodVerificacion = async () => {

    let usuario = document.querySelector(".campo-user").value;

    console.log(document.querySelector(".campo-user"))
    console.log(usuario)


    await fetch(url, {

        method: 'POST',

        body: JSON.stringify({
            "username": usuario
        })
        ,
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response)//.then(data=>console.log(data))
        .then(data => console.log(data));


}


const solicitarNuevaContraseña = async () => {

    let usuario = document.querySelector(".campo-user").value;
    let codigo = document.querySelector(".codigo-usuario").value;

    console.log(document.querySelector(".campo-user"))
    console.log(codigo)


    let cod = await fetch(url2, {

        method: 'POST',

        body: JSON.stringify({
            "codigo": codigo,
            "username": usuario

        })
        ,
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response.json())//.then(data=>console.log(data))
        .then(data => guardarCod(data));


    return cod

}


const guardarCod = (cod) => {

    localStorage.setItem("cod-verificacion", cod["cod"])

    return cod
}

const nuevaContraseña = async () => {


    let usuario = document.querySelector(".campo-user").value;

    let pass = document.querySelector(".pass-input").value

    let id = localStorage.getItem("cod-verificacion");



    await fetch(url3, {

        method: 'POST',

        body: JSON.stringify({
            "username": usuario,
            "idsolicitud": id,
            "nuevaContraseña": pass

        })
        ,
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }

    })
        .then(response => response)//.then(data=>console.log(data))
        .then(data => console.log(data));

}




export { enviarCodVerificacion, solicitarNuevaContraseña, nuevaContraseña }