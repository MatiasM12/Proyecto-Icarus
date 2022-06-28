
const queryRead = 'SELECT idvuelo_fk, aeropuerto_codiata, nombre, apellido, mail, documentacionenorden, posicion,activo FROM tripulacion t left join personal p on t.idpersonal_fk=p.idpersonal;';
const queryReadIdVuelo = 'SELECT idvuelo_fk,idpersonal_fk, aeropuerto_codiata, nombre, apellido, mail, documentacionenorden, posicion,activo FROM tripulacion t left join personal p on t.idpersonal_fk=p.idpersonal WHERE idVuelo_fk= $1;'
const queryDelete = 'DELETE FROM tripulacion WHERE idpersonal_fk = $1'

const queryUpdate = 'UPDATE tripulacion SET idvuelo_fk=$1 WHERE idpersonal_fk=$2'
const queryInsert = 'INSERT INTO tripulacion (idpersonal_fk,idvuelo_fk)  VALUES ($1, $2)'
const queryTripulacionXrangoFecha = '(SELECT distinct on(idpersonal) idpersonal ,posicion  FROM personal p left join disponibilidad di on di.idpersonal_fk= p.idpersonal WHERE (posicion=$6 or posicion=$7 or posicion=$8)and aeropuerto_codiata=$1) except all (select distinct on (idpersonal) idpersonal, posicion FROM tripulacion t  left join personal p on t.idpersonal_fk=p.idpersonal left join plandevuelo V on V.idvuelo=t.idvuelo_fk left join disponibilidad di on di.idpersonal_fk= p.idpersonal where (posicion=$6 or posicion=$7 or posicion=$8) and  (($2<=fechadespegueestimado and fechadespegueestimado<=$3) or ($2<=fechaaterrizajeestimado and fechaaterrizajeestimado<=$3) or	 ($4<=fechaDeInicio and fechaDeInicio<=$5) or ($4<=fechaDeFinalizacion and fechaDeFinalizacion<=$5))) order by posicion desc'
const queryTripulacionListadoManual = '(SELECT distinct on(idpersonal) idpersonal ,nombre,posicion,codarea,activo  FROM personal p left join disponibilidad di on di.idpersonal_fk= p.idpersonal WHERE (posicion=$5 or posicion=$6 or posicion=$7)and p.activo=true) except all (select distinct on (idpersonal)idpersonal, nombre,posicion,codarea,activo FROM tripulacion t    left join personal p on t.idpersonal_fk=p.idpersonal left join plandevuelo V on V.idvuelo=t.idvuelo_fk   left join disponibilidad di on di.idpersonal_fk= p.idpersonal where (posicion=$5 or posicion=$6 or posicion=$7) and   (($1<=fechadespegueestimado and fechadespegueestimado<=$2) or ($1<=fechaaterrizajeestimado and fechaaterrizajeestimado<=$2) or  ($3<=fechaDeInicio and fechaDeInicio<=$4) or ($3<=fechaDeFinalizacion and fechaDeFinalizacion<=$4)) and p.activo=true  ) order by posicion,idpersonal desc';
const queryRearCodigoVuelo = 'select * from tripulacion where idvuelo_fk=$1'
const queryDeletePorCodVuelo = 'delete from tripulacion where idvuelo_fk=$1 '


const InsertTripulante = async (ConexionEstablecida, req, res) => {
  try {
    const { idpersonal_fk, idvuelo_fk } = req.body
    console.log(req.body)
    var result = await ConexionEstablecida.query(queryInsert, [idpersonal_fk, idvuelo_fk])
    res.status(200).send(result)
  }
  catch (err) {
    console.log(err)
  }
}

const deletee = async (ConexionEstablecida, id) => {

  var result = await ConexionEstablecida.query(queryDelete, [id], (error, results) => {
    if (error) {
      throw error
    }

  })
}

const deletePorIdVuelo = async (ConexionEstablecida, data) => {
  try {
    console.log("-------------")
    console.log("-------------")
    console.log("-------------")
    console.log(data)
    var result = await ConexionEstablecida.query(queryDeletePorCodVuelo, [data.idvuelo])
  }
  catch (err) {
    console.log("ERROR")
  }
}

const readPorCodVueloPorParametro = async (ConexionEstablecida, idvuelo) => {
  try {
    var result = await ConexionEstablecida.query(queryRearCodigoVuelo, [idvuelo])
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}

const insert = async (ConexionEstablecida, idpersonal, idvuelo) => {
  var result = await ConexionEstablecida.query(queryInsert, [idpersonal, idvuelo], (error, results) => {
    if (error) {
      throw error
    }
    return result
  })
}

const readFiltrosTripulantes = async (ConexionEstablecida, body) => {
  try {
    let piloto = 'piloto'
    let copiloto = 'co-piloto'
    let auxiliar = 'auxiliar'
    var result = await ConexionEstablecida.query(queryTripulacionXrangoFecha, [body.codiataOrigen, body.diaAntes, body.diaDespues, body.fechadespegueestimado, body.fechaaterrizajeestimado, piloto, copiloto, auxiliar])
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}

const readListadoManual = async (ConexionEstablecida, body) => {
  try {
    let piloto = 'piloto'
    let copiloto = 'co-piloto'
    let auxiliar = 'auxiliar'
    var result = await ConexionEstablecida.query(queryTripulacionListadoManual, [body.diaAntes, body.diaDespues, body.fechadespegueestimado, body.fechaaterrizajeestimado, piloto, copiloto, auxiliar])
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

const readPorCodVuelo = async (ConexionEstablecida, request, response) => {
  try {
    const { idvuelo } = request.body;
    var result = await ConexionEstablecida.query(queryReadIdVuelo, [idvuelo])
    response.status(200).json(result.rows)
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}

const update = async (ConexionEstablecida, request, response) => {
  const id = parseInt(request.params.id)
  const { idvuelo_fk } = request.body;
  var result = await ConexionEstablecida.query(queryUpdate, [idvuelo_fk, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Tripulante modified with ID: ${id}`)
    }
  )
}



module.exports = {
  readPorCodVueloPorParametro, deletePorIdVuelo, read, readPorCodVuelo, deletee, update, InsertTripulante, readFiltrosTripulantes, readListadoManual, insert
}


