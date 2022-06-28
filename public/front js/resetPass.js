
const $d = document;

const $ventanaModalPass = $d.querySelector(".reset-pass");

const $ventanaCodigo = $d.querySelector(".code-user");

const $ventanaNuevaC = $d.querySelector(".pass-user")


const $ventanaInit = $d.querySelector(".init-session");

const $ventanaAviso = $d.querySelector(".valid-user");

const $ventanaAviso2 = $d.querySelector(".send-request");





const openChangePass = () => {

    $ventanaInit.style.display = "none";


    $ventanaModalPass.style.display = "flex";

}


const openCodePass = () => {


    $ventanaAviso.style.display = "none";
    $ventanaCodigo.style.display = "flex";


}

const openNewPass = () => {


    $ventanaCodigo.style.display = "none";
    $ventanaNuevaC.style.display = "flex";


}


const openAvisoPass = () => {


    $ventanaNuevaC.style.display = "none";
    $ventanaAviso2.style.display = "flex";


}

const volverPrincipal = () => {


    $ventanaAviso.style.display = "none";
    $ventanaAviso2.style.display = "none";
    $ventanaModalPass.style.display = "none";
    $ventanaCodigo.style.display = "none";
    $ventanaNuevaC.style.display = "none";
    $ventanaInit.style.display = "flex";


}



export {
    openChangePass, openAvisoPass, volverPrincipal, openCodePass, openNewPass
};
