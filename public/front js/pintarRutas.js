//import { obtClima } from "./obtclima";

import { obtClima, obtClima2, obtClima3 } from "./obtclima.js";

const url = 'https://proyecto-icarus.herokuapp.com/vuelos';

const $seccionRutas = document.querySelector(".vuelos-dinamicos");
const $template = document.getElementById("template").content;
const $fragmento = document.createDocumentFragment();

let colorSemaforo = ""

const pintarRutas = async (vuelosAPI) => {

  console.log(vuelosAPI)
  limpiar();
  let indice = 1;
  for (let v of vuelosAPI) {
    //let clima = obtClima(v["idvuelo"]);
    // $template.querySelector()



    $template.querySelector(".plan-vuelo").textContent = v["idvuelo"];
    $template.querySelector(".aeropuerto-llegada").textContent = v["origenteorico_codiata"];
    $template.querySelector(".aeropuerto-destino").textContent = v["destinoteorico_codiata"];
    $template.querySelector(".hora-salida").textContent = v["fechadespegueestimado"].slice(0, 10) + " " + v["horadespegueestimado"].slice(0, 5);
    $template.querySelector(".hora-llegada").textContent = v["fechaaterrizajeestimado"].slice(0, 10) + " " + v["horaaterrizajeestimado"].slice(0, 5);
    $template.querySelector(".estado-vuelo").textContent = v["estado"];


    //$template.querySelector(".semaforo-clima").style.backgroundColor = "green"



    //obtClima3(v["idvuelo"], calcularClima, indice);



    $template.querySelector(".btn-masinfo").setAttribute("index", indice);
    $template.querySelector(".masinfo").setAttribute("index", indice);
    $template.querySelector(".btn-modificar").setAttribute("index", indice);
    $template.querySelector(".historial").setAttribute("index", indice);

    localStorage.setItem(indice + "", JSON.stringify(
      {
        "pv": v["idvuelo"],
        "origen": v["origenteorico_codiata"],
        "destino": v["destinoteorico_codiata"],
        "fechasalida": v["fechadespegueestimado"].slice(0, 10),
        "horasalida": v["horadespegueestimado"],
        "fechallegada": v["fechaaterrizajeestimado"].slice(0, 10),
        "horallegada": v["horaaterrizajeestimado"],
        "estado": v["estado"],
        "aereonave": null,
        "tipovuelo": v["tipodevuelo"],
        "ruta": v["rutateorica"],
        "regladevuelo": v["regladevuelo"],
        "temperatura": v["gradostemperaturadestino"],
        "matricula": v["aeronave_matricula_fk"],
        //---- programado-------
        //"asignacionAutomaticaAvion": false,
        //"asignacionAutomaticaTripulacion": null, 
        //------------- confirmado ------------------
        "PermisoAeronave/mantenimineto": null,
        "PermisoTripulacion": null,
        //------------ preembarque------------------
        "Checkin": null,
        "controlCabina": null,
        "PersistenciaInsumos": null,
        "Clima": null,
        //----------- aterrizado ------------------
        "Emergencias": null,
        "CargaDestino/despacho": null,
        "RutaReal": null,
        "motivoestado": v["motivoestado"]

      }))


    obtClima3(v["idvuelo"], calcularClima, indice);
    indice++;



    let $clone = document.importNode($template, true);
    $fragmento.appendChild($clone);
  };

  $seccionRutas.appendChild($fragmento);


  //return vuelos;


}


const calcularClima = (data, indice) => {


  try {

    if (data[0]["peligrosidad"] === false) {

      cambiarVerde(indice)
    }

    else {
      cambiarRojo(indice);

    }


  }
  catch (error) {
    cambiarNegro(indice);

  }

}

const cambiarVerde = (indice) => {
  document.querySelectorAll(".semaforo-clima")[indice].style.backgroundColor = "green";

}

const cambiarRojo = (indice) => {
  document.querySelectorAll(".semaforo-clima")[indice].style.backgroundColor = "red";

}

const cambiarNegro = (indice) => {
  document.querySelectorAll(".semaforo-clima")[indice].style.backgroundColor = "black";
}



const limpiar = () => {

  while ($seccionRutas.firstChild) {
    $seccionRutas.firstChild.remove();
  }


}


export { pintarRutas, limpiar };


/*
planDeVuelo (
  idVuelo SERIAL PRIMARY KEY,
  Aeronave_matricula_fk VARCHAR(30),
  OrigenTeorico_codIATA_FK VARCHAR(3), 
  OrigenReal_codIATA_FK VARCHAR(3), 
  DestinoTeorico_codIATA_FK VARCHAR(3), 
  DestinoReal_codIATA_FK VARCHAR(3), 
  idCompania_fk int,
  idEstados_fk int,
  rutaTeorica VARCHAR(50),   
  rutaReal VARCHAR(50),   
  reglaDeVuelo VARCHAR(10),
  tipoDeVuelo VARCHAR(10),
  fechaYHoraDespegueReal timestamp,
  fechaYHoraAterrizajeReal timestamp,
  fechaYHoraDespegueEstimado timestamp,
  fechaYHoraAterrizajeEstimado timestamp, 
  ltscombustibleEstimado integer,
  ltscombustibleReal integer,
  lubricanteEstimado int,
  lubricanteReal int,
  kilometrajeEstimado float,
  kilometrajeReal float,
  verificaciones boolean,
  totalPersonasABordo integer,
  duracionEstimada time,
  duracionReal time,
  insumosConsumidos int,
  pesoCargaDestino float,  
  informado boolean, -- varia dependiendo de si fue enviado o no al modulo de operaciones de cabina
  FOREIGN KEY (Aeronave_matricula_fk) REFERENCES aeronave(matricula),
  FOREIGN KEY (OrigenTeorico_codIATA_FK) REFERENCES aeropuerto(codIata),
  FOREIGN KEY (OrigenReal_codIATA_FK) REFERENCES aeropuerto(codIata),
  FOREIGN KEY (DestinoTeorico_codIATA_FK) REFERENCES aeropuerto(codIata),
  FOREIGN KEY (DestinoReal_codIATA_FK) REFERENCES aeropuerto(codIata),
  FOREIGN KEY (idCompania_fk) REFERENCES Compania(idCompania),
  FOREIGN KEY (idEstados_fk) REFERENCES estados(idEstados) 
); */
