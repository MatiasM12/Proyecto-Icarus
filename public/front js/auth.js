//import { limpiar } from "./pintarRutas";

const url = 'http://localhost:3010/auth';
const $d = document;
const $pass = $d.querySelector(".campos");
const $pass1 = $d.querySelector(".campo-contra");
const $ventanaModal = $d.querySelector(".credenciales");
const $iconoLogout = $d.querySelector(".logout-s");
const $pantallaVuelos = ".vuelos";
const $pantallaInformes = ".informes";
const $pantallaSolicitudes = ".solicitudes";
const $seccionRutas = document.querySelector(".vuelos-dinamicos")


const autentificar = (authfunc, json) => {

    let jsonAuth = json;

    //console.log(jsonAuth);

    try {
        let usuario = jsonAuth[0]["posicion"];
        if (jsonAuth[0]["pass"] == $pass1.value && (usuario === "auditor" || usuario === "supervisor" || usuario === "auxiliar")) {
            $ventanaModal.style.display = "none";
            $iconoLogout.style.display = "flex";
            authfunc = jsonAuth[0]["pass"];
            localStorage.setItem('permiso', (jsonAuth[0]["posicion"]))

            localStorage.setItem('usuarioActual', $pass.value);
            document.querySelector(".logout").style.display = "flex";
            /*
    debemos hacer una llamada a la api rest de nuestro modulo para que nos devuelve el home de la pagina
 
 
*/
        }
        else {
            /*
                pedir que el usuario vuelva a ingresar el user y pass
            */
            mostrarMensajeError()
        }
    }
    catch (err) {
        console.log(err);

    }

    //console.log(jsonAuth[0])



}

const jsonAuth = (authfunc) => {

    let authObt;

    fetch(url, {

        // Adding method type
        method: "POST",

        // Adding body or contents to send
        body: JSON.stringify({
            username: `${$pass.value}`
        }),
        //  mode : "no-cors",

        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(response => response.json())
        .then(json => autentificar(authfunc, json));


    return authObt;
}

const limpiar = () => {

    while ($seccionRutas.firstChild) {
        $seccionRutas.firstChild.remove();
    }


}

const logout = () => {


    document.querySelector($pantallaInformes).style.display = "none";

    document.querySelector($pantallaVuelos).style.display = "none";

    document.querySelector($pantallaSolicitudes).style.display = "none";

    document.querySelector(".logout").style.display = "none";

    limpiar();
    localStorage.clear();
    $ventanaModal.style.display = "flex";


}



const encontreUsuario = () => {

    /*Se debe buscar el usuario en la api. */





    return true
}

const mostrarMensajeError = () => {

    /*Esta funcion deberia mostrar un msj de error*/
}


export { jsonAuth, logout };
