const $botonesConfirmar = ".confirmar";
const $botonesCancelar = ".cancelar";
const $botonesPreembarque = ".preembarcar";
const $botonesDespegue = ".despegar";
const $botonesVuelo = ".envuelo";
const $botonesAterrizado = ".aterrizar";
const $botonesDemorado = ".demorar";
const $botonesReprogramado = ".reprogramar";
const $botonesGuardar = ".guardar";
const $d = document;



const ocultarBtns = () => {

  $d.querySelector($botonesConfirmar).style.display = "none";
  //  $d.querySelector($botonesAterrizado).style.display = "none";
  $d.querySelector($botonesDemorado).style.display = "none";
  $d.querySelector($botonesGuardar).style.display = "none";
  $d.querySelector($botonesPreembarque).style.display = "none";
  $d.querySelector($botonesReprogramado).style.display = "none";
  $d.querySelector($botonesCancelar).style.display = "none";
  $d.querySelector($botonesVuelo).style.display = "none";
  $d.querySelector($botonesDespegue).style.display = "none";





}


export { ocultarBtns };


