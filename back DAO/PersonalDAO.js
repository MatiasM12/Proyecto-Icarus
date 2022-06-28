
const queryRead = 'SELECT * FROM personal ORDER BY idpersonal ASC'
const queryReadForId = 'SELECT * FROM personal WHERE idpersonal= $1'
const queryDelete = 'DELETE FROM personal WHERE idpersonal = $1'
const queryUpdate = 'UPDATE personal SET Aeropuerto_codIATA_fk= $1 , documentacionTripulacion_fk= $2 ,nombre= $3 ,apellido= $4 ,codPais= $5 ,codArea= $6 ,nroContacto= $7,mail= $8,documentacionEnOrden= $9,posicion= $10,activo= $11  WHERE idpersonal = $12'
const queryInsert = 'INSERT INTO personal (Aeropuerto_codIATA_fk , documentacionTripulacion_fk ,nombre ,apellido ,codPais ,codArea ,nroContacto,mail,documentacionEnOrden,posicion,activo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)'
const queryReadPorUbiacacionPosicion = 'SELECT * FROM personal WHERE aeropuerto_codiata= $1 AND posicion=$2'
const queryUpdateIata = 'UPDATE personal SET Aeropuerto_codIATA = $1 WHERE idpersonal = $2';
const queryPermisosPiloto = 'select idvuelo, regladevuelo,idpersonal,licenciapiloto, permisosifr,permisosvfr from personal left join tripulacion on idpersonal_fk=idpersonal inner join plandevuelo on idvuelo=idvuelo_fk  inner join documentacionTripulacion d on d.idpersonal_fk=idpersonal  where posicion =$1 and idvuelo=$2';
const queryUpdateHorasVuelo = 'update documentacionTripulacion set horasdevuelo=horasdevuelo+ $1 where idpersonal_fk=$2'



const updateCantidadHoras = async (ConexionEstablecida, horasdevuelo, idpersonal_fk) => {
  try {
    var result = await ConexionEstablecida.query(queryUpdateHorasVuelo, [horasdevuelo, idpersonal_fk])
  }
  catch (err) {
    console.log(err)
  }
}

const updateIata = async (ConexionEstablecida, iata, idpersonal) => {
  try {
    var result = await ConexionEstablecida.query(queryUpdateIata, [iata, idpersonal])
  }
  catch (err) {
    console.log(err)
  }
}

const readPermisosPiloto = async (ConexionEstablecida, idvuelo) => {
  try {
    var result = await ConexionEstablecida.query(queryPermisosPiloto, ["piloto", idvuelo])
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}

const actualizarIataPersonal = async (ConexionEstablecida, idpersonal, iatadestino) => {
  try {

    var results = await ConexionEstablecida.query(queryUpdateIata, [iatadestino, idpersonal])
  }
  catch (err) {
    console.log(err)
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

const readId = async (ConexionEstablecida, request, response) => {
  try {
    const id = parseInt(request.params.id)
    var result = await ConexionEstablecida.query(queryReadForId, [id])
    response.status(200).json(result.rows)
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}

const readIdPorParametro = async (ConexionEstablecida, id) => {
  try {
    var result = await ConexionEstablecida.query(queryReadForId, [id])
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}

const deletee = async (ConexionEstablecida, request, response) => {
  const id = parseInt(request.params.id)
  var result = await ConexionEstablecida.query(queryDelete, [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Plan de vuelo deleted with ID: ${id}`)
  })
}

const insert = async (ConexionEstablecida, request, response) => {
  const { aeropuerto_codiata_fk, documentaciontripulacion_fk, nombre, apellido, codpais, codarea, nrocontacto, mail, documentacionenorden, posicion, activo } = request.body
  var result = await ConexionEstablecida.query(queryInsert, [aeropuerto_codiata_fk, documentaciontripulacion_fk, nombre, apellido, codpais, codarea, nrocontacto, mail, documentacionenorden, posicion, activo], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Personal added `)
  })
}

const update = async (ConexionEstablecida, request, response) => {
  const id = parseInt(request.params.id)
  const { aeropuerto_codiata_fk, documentaciontripulacion_fk, nombre, apellido, codpais, codarea, nrocontacto, mail, documentacionenorden, posicion, activo } = request.body
  var result = await ConexionEstablecida.query(queryUpdate, [aeropuerto_codiata_fk, documentaciontripulacion_fk, nombre, apellido, codpais, codarea, nrocontacto, mail, documentacionenorden, posicion, activo, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Personal modified with ID: ${id}`)
    }
  )
}

const readDisponiblesPorPosicion = async (ConexionEstablecida, aeropuerto, posicion) => {
  try {
    var result = await ConexionEstablecida.query(queryReadPorUbiacacionPosicion, [aeropuerto, posicion])

    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}



module.exports = {
  updateCantidadHoras, updateIata, read, readId, readIdPorParametro, deletee, update, insert, readDisponiblesPorPosicion, actualizarIataPersonal, readPermisosPiloto
}

