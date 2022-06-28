import { getHistorialContrasena } from "./historialCambio.js";

const $pantallaVuelos = ".vuelos";
const $pantallaInformes = ".informes";
const $pantallaSolicitudes = ".solicitudes";
const permisoAu = "auditor"
const permisoAux = "auxiliar"
const permisoSupe = "supervisor"

const $d = document;
const informeAeronave = $d.querySelector(".informe-aeronave")
const informeVuelo = $d.querySelector(".informe-vuelo")
const informePersonal = $d.querySelector(".informe-personal")
const informeClima = $d.querySelector(".informe-clima")
const informeMantenimiento = $d.querySelector(".informe-mantenimiento")
const informeEmergencia = $d.querySelector(".informe-emergencia")
const informeParentesco = $d.querySelector(".informe-parentesco")
const informeUsuario = $d.querySelector(".informe-usuario")
const informeTripulacion = $d.querySelector(".informe-tripulacion")
const informeAeropuerto = $d.querySelector(".informe-aeropuerto")

const mostrarPlanesDeVuelo = () => {

    document.querySelector($pantallaInformes).style.display = "none";

    document.querySelector($pantallaVuelos).style.display = "flex";

    document.querySelector($pantallaSolicitudes).style.display = "none";
}

const mostrarInformes = (permiso) => {

    document.querySelector($pantallaVuelos).style.display = "none";

    document.querySelector($pantallaInformes).style.display = "grid";
    document.querySelector($pantallaSolicitudes).style.display = "none";

    mostrarInformePorPermiso(permiso);
}

const mostrarSolicitudes = (permiso) => {

    if (permiso === permisoAu) {

        getHistorialContrasena();

        document.querySelector($pantallaVuelos).style.display = "none";

        document.querySelector($pantallaInformes).style.display = "none";

        document.querySelector($pantallaSolicitudes).style.display = "flex";

    }

}


const mostrarInformePorPermiso = (permiso) => {



    if (permiso === permisoAux) {
        informeEmergencia.style.backgroundColor = "grey";
        informeAeropuerto.style.backgroundColor = "grey";
        informeUsuario.style.backgroundColor = "grey";

    }

    if (permisoSupe === permiso) {
        informeEmergencia.style.backgroundColor = "#01061d";
        informeAeropuerto.style.backgroundColor = "#01061d";
        informeUsuario.style.backgroundColor = "grey";

    }

    if (permiso === permisoAu) {
        informeEmergencia.style.backgroundColor = "#01061d";
        informeAeropuerto.style.backgroundColor = "#01061d";
        informeUsuario.style.backgroundColor = "#01061d";

    }



}



export { mostrarPlanesDeVuelo, mostrarInformes, mostrarSolicitudes };
