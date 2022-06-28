
const queryRead = 'SELECT * FROM aeronave ORDER BY modeloAeronave ASC'
const queryReadForModelo = 'SELECT * FROM aeronave WHERE modeloAeronave = $1';
const queryReadForModeloUbicacion = 'SELECT * FROM aeronave WHERE modeloAeronave = $1 and Aeropuerto_codIATA = $2';
const queryDelete = 'DELETE FROM aeronave WHERE matricula = $1';
const queryUpdate = 'UPDATE aeronave SET Aeropuerto_codIATA_fk= $1,idMantenimiento_fk= $2,kilometraje= $3 ,kilometrajeMaximo = $4,kmUltimoMantenimiento = $5,modelo= $6 ,capacidad= $7 ,tipoAeronave= $8 ,capacidadTanqueLts= $9 ,kmPorLitroCombustible= $10,litrosLubricantePorKilometro= $11,autorizado= $12,pesoKg= $13,activo= $14,fecha_de_actividad= $15 WHERE matricula = $16';
const queryUpdatAutorizacion = 'UPDATE aeronave SET autorizado=$1 WHERE matricula = $2';
const queryInsert = 'INSERT INTO aeronave (matricula,Aeropuerto_codIATA_fk,idMantenimiento_fk,kilometraje ,kilometrajeMaximo ,kmUltimoMantenimiento ,modelo ,capacidad ,tipoAeronave ,capacidadTanqueLts ,kmPorLitroCombustible,litrosLubricantePorKilometro,autorizado,pesoKg,activo,fecha_de_actividad) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)'
const queryDisponible = '(SELECT matricula from aeronave where modeloAeronave=$1 and aeropuerto_codiata=$2) except all (select distinct (matricula) FROM aeronave a left join plandevuelo p on p.aeronave_Matricula_fk=a.matricula where modeloAeronave=$1 and aeropuerto_codiata=$2 and (fechadespegueestimado<=$3 and $3<=fechaaterrizajeestimado) or (fechadespegueestimado <=$4 and $4<=fechaaterrizajeestimado)) order by matricula'
const queryReadForMatricula = 'SELECT * FROM aeronave WHERE matricula = $1'
const queryUpdateIata = 'UPDATE aeronave SET Aeropuerto_codIATA = $1 WHERE matricula = $2';
const querylistadoManual = '(SELECT matricula,modeloaeronave from aeronave where modeloAeronave=$1) except all (select distinct (matricula),modeloaeronave FROM aeronave a left join plandevuelo p on p.aeronave_Matricula_fk=a.matricula where modeloAeronave=$1 and (fechadespegueestimado<=$2 and $2<=fechaaterrizajeestimado) or (fechadespegueestimado <=$3 and $3<=fechaaterrizajeestimado)) order by matricula';
const queryUpdateKmRecorridos = 'update aeronave set kmrecorridos=kmrecorridos+ $1 where matricula=$2';



const updateKmRecorrido = async (ConexionEstablecida, kmrecorridos, matricula) => {
  try {
    var results = await ConexionEstablecida.query(queryUpdateKmRecorridos, [kmrecorridos, matricula])
  }
  catch (err) {
    console.log(err)
  }
}

const readPorArray = async (ConexionEstablecida, modelo, fechadespegue, fechaaterrizaje) => {
  try {
    var result = await ConexionEstablecida.query(querylistadoManual, [modelo, fechadespegue, fechaaterrizaje])
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}
const readaAviones = async (ConexionEstablecida, request, response) => {
  try {
    var result = await ConexionEstablecida.query(queryRead)

    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}
const read = async (ConexionEstablecida, request, response) => {
  try {
    var result = await ConexionEstablecida.query(queryRead)
    response.status(200).json(result.rows)
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}

const updateAutorizadoAeronave = async (ConexionEstablecida, body) => {
  try {
    var results = await ConexionEstablecida.query(queryUpdatAutorizacion, [body.autorizado, body.matricula])
  }
  catch (err) {
    console.log(err)
  }
}

const updateIata = async (ConexionEstablecida, iata, matricula) => {
  try {
    var results = await ConexionEstablecida.query(queryUpdateIata, [iata, matricula])
  }
  catch (err) {
    console.log(err)
  }
}

const actualizarIataAeronave = async (ConexionEstablecida, matricula, iatadestino) => {
  try {
    var results = await ConexionEstablecida.query(queryUpdateIata, [iatadestino, matricula])
  }
  catch (err) {
    console.log(err)
  }
}

const readId = async (ConexionEstablecida, request, response) => {
  try {
    const matricula = request.params.id
    var result = await ConexionEstablecida.query(queryReadForId, [matricula])
    response.status(200).json(result.rows)
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}

const readAeronaveMatricula2 = async (ConexionEstablecida, matricula) => {
  try {
    var result = await ConexionEstablecida.query(queryReadForMatricula, [matricula])
    //response.status(200).json(result.rows)
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}

const readAeronaveMatricula = async (ConexionEstablecida, request, response) => {
  try {
    const { matricula } = request.body
    var result = await ConexionEstablecida.query(queryReadForMatricula, [matricula])
    //response.status(200).json(result.rows)
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}

const deletee = async (ConexionEstablecida, request, response) => {
  const { matricula } = request.body
  var result = await ConexionEstablecida.query(queryDelete, [matricula], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Aeronave deleted with matricula: ${matricula}`)
  })
}

const update = async (ConexionEstablecida, request, response) => {
  const { matricula, aeropuerto_codiata_fk, idmantenimiento_fk, kilometraje, kilometrajemaximo, kmultimomantenimiento, modelo, capacidad, tipoaeronave, capacidadtanquelts, kmporlitrocombustible, litroslubricanteporkilometro, autorizado, pesokg, activo, fecha_de_actividad } = request.body
  var results = await ConexionEstablecida.query(queryUpdate,
    [aeropuerto_codiata_fk, idmantenimiento_fk, kilometraje, kilometrajemaximo, kmultimomantenimiento, modelo, capacidad, tipoaeronave, capacidadtanquelts, kmporlitrocombustible, litroslubricanteporkilometro, autorizado, pesokg, activo, fecha_de_actividad, matricula],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Aeronave modified with matricula: ${matricula}`)
    }
  )
}

const insert = async (ConexionEstablecida, request, response) => {
  const { matricula, aeropuerto_codiata_fk, idmantenimiento_fk, kilometraje, kilometrajemaximo, kmultimomantenimiento, modelo, capacidad, tipoaeronave, capacidadtanquelts, kmporlitrocombustible, litroslubricanteporkilometro, autorizado, pesokg, activo, fecha_de_actividad } = request.body
  var results = await ConexionEstablecida.query(queryInsert, [matricula, aeropuerto_codiata_fk, idmantenimiento_fk, kilometraje, kilometrajemaximo, kmultimomantenimiento, modelo, capacidad, tipoaeronave, capacidadtanquelts, kmporlitrocombustible, litroslubricanteporkilometro, autorizado, pesokg, activo, fecha_de_actividad], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Aeronave added `)
  })

}

const readdisponible = async (ConexionEstablecida, request, response) => {
  try {
    const { modeloaeronave, aeropuerto_codiata, fechadespegueestimado, fechaaterrizajeestimado } = request.body
    var result = await ConexionEstablecida.query(queryDisponible, [modeloaeronave, aeropuerto_codiata, fechadespegueestimado, fechaaterrizajeestimado])
    response.status(200).json(result.rows)
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}

const readModelo = async (ConexionEstablecida, request, response) => {
  try {
    const { modeloaeronave } = request.body
    var result = await ConexionEstablecida.query(queryReadForModelo, [modeloaeronave])
    response.status(200).json(result.rows)
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}

const buscarModelo = async (ConexionEstablecida, iata, modelo, inicio, fin) => {
  try {
    var result = await ConexionEstablecida.query(queryDisponible,
      [iata, modelo, inicio, fin])
    console.log(result.rows)
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}



module.exports = {
  readaAviones, updateKmRecorrido, updateIata, actualizarIataAeronave, readPorArray, read, updateAutorizadoAeronave, readAeronaveMatricula, readId, deletee, update, insert, readModelo, readdisponible, buscarModelo, readAeronaveMatricula2
}
