

const checkearCamposProgramado = () => {
    const permisosProgramado = JSON.parse(localStorage.getItem('camposVentanaModificar'));

    return permisosProgramado["aeronave"] && permisosProgramado["tripulacion"] ? true : false;

}


const checkearCamposConfirmado = () => {
    const permisosProgramado = JSON.parse(localStorage.getItem('camposVentanaModificar'));

    return permisosProgramado["permisoAeronave"] && permisosProgramado["permisoTripulacion"] ? true : false;

}

const checkearReprogramado = () => {
    const permisosReProgramado = JSON.parse(localStorage.getItem('camposVentanaModificar'));

    return permisosReProgramado["reprotripulacion"] && permisosReProgramado["repronave"];
}


const checkearPreembarque = () => {
    const permisosProgramado = JSON.parse(localStorage.getItem('camposVentanaModificar'));


    return permisosProgramado["permisoClima"] && permisosProgramado["permisoCheckIn"] &&
        permisosProgramado["insumos"] && permisosProgramado["controles"] ? true : false;

}


const checkearAterrizado = () => {
    try {
        var permisosAterrizado = JSON.parse(localStorage.getItem('camposVentanaModificar'));
        var fechaSalida = document.querySelector(".datos-aterrizado").querySelector(".fecha-salida-real").value;
        var horaSalida = document.querySelector(".datos-aterrizado").querySelector(".hora-salida").value;
        var fechallegada = document.querySelector(".datos-aterrizado").querySelector(".fecha-llegada").value;
        var horallegada = document.querySelector(".datos-aterrizado").querySelector(".hora-llegada").value;
        var duracionVuelo = document.querySelector(".duracion-vuelo").value;
        var insumosConsumidos = document.querySelector(".datos-aterrizado").querySelector(".insumosC-vuelo").textContent;
        var ruta = document.querySelector(".datos-aterrizado").querySelector(".ruta-vuelo").textContent;
        var aeropuertoSalida = document.querySelector(".datos-aterrizado").querySelector(".aeropuertoS-vuelo").value;
        var aeropuertoLlegada = document.querySelector(".datos-aterrizado").querySelector(".aeropuertoL-vuelo").value;
        var ltsCombustible = document.querySelector(".datos-aterrizado").querySelector(".combustible-vuelo").textContent;
        var ltsLubricante = document.querySelector(".datos-aterrizado").querySelector(".lubricante-vuelo").textContent;
        var kmRecorridos = document.querySelector(".datos-aterrizado").querySelector(".kilometraje-vuelo").textContent;
        var pesoCargaDestino = document.querySelector(".datos-aterrizado").querySelector(".pesoCarga-vuelo").value;

    }
    catch (err) {
        alert("valores en null")
    }



    const camposCompletos = fechaSalida != "" && horaSalida != "" && fechallegada != "" && horallegada != "" && duracionVuelo != "" && insumosConsumidos != "" && ruta != "" && aeropuertoSalida != ""
        && aeropuertoLlegada != "" && ltsCombustible != "" && ltsLubricante != "" && kmRecorridos != "" && pesoCargaDestino != "";

    return permisosAterrizado["emergencias"] && permisosAterrizado["envioDespacho"] && camposCompletos ? true : false;

}

const checkearDemora = (estado) => {
    const txtMotivo = document.querySelector(".datos-demorado").querySelector(".texto-demora").value;


    console.log(estado + "-----------")

    if (txtMotivo && txtMotivo != "--Seleccionar" || estado != null)
        return true;
}





export { checkearReprogramado, checkearDemora, checkearCamposProgramado, checkearCamposConfirmado, checkearPreembarque, checkearAterrizado };