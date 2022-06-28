
const queryRead = 'SELECT * FROM aeropuerto ORDER BY idaeropuerto ASC'
const queryReadForId = 'SELECT * FROM aeropuerto WHERE idaeropuerto = $1'
const queryDelete = 'DELETE FROM aeropuerto WHERE idaeropuerto = $1'
const queryUpdate = 'UPDATE aeropuerto SET ubicacion_actual_fk = $1 , codiata= $2 , codoaci = $3,nombre = $4 , cantpistas = $5, tipo = $6,canthangares= $7, estado=$8 WHERE idaeropuerto = $9'
const queryInsert = 'INSERT INTO aeropuerto (ubicacion_actual_fk, codiata, codoaci, nombre, cantpistas, tipo, canthangares,estado) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)'

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

const deletee = async (ConexionEstablecida, request, response) => {
  const id = parseInt(request.params.id)

  var result = await ConexionEstablecida.query(queryDelete, [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Aeropuerto deleted with ID: ${id}`)
  })
}

const update = async (ConexionEstablecida, request, response) => {
  const id = parseInt(request.params.id)
  const { ubicacion_actual_fk, codiata, codoaci, nombre, cantpistas, tipo, canthangares, estado } = request.body
  var results = await ConexionEstablecida.query(queryUpdate,
    [ubicacion_actual_fk, codiata, codoaci, nombre, cantpistas, tipo, canthangares, estado, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Aeropuerto modified with ID: ${id}`)
    }
  )
}

const insert = async (ConexionEstablecida, request, response) => {
  const { ubicacion_actual_fk, codiata, codoaci, nombre, cantpistas, tipo, canthangares, estado } = request.body
  var results = await ConexionEstablecida.query(queryInsert, [ubicacion_actual_fk, codiata, codoaci, nombre, cantpistas, tipo, canthangares, estado], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Aeropuerto added `)
  })

}

module.exports = {
  read, readId, deletee, update, insert
}
