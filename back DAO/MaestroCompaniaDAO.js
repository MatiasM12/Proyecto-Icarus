
const queryRead = 'SELECT * FROM compania ORDER BY idcompania ASC'
const queryReadForId = 'SELECT * FROM compania WHERE idcompania = $1'
const queryDelete = 'DELETE FROM compania WHERE idcompania = $1'
const queryUpdate = 'UPDATE compania SET nombre=$1, activo=$2 WHERE idcompania = $3'
const queryInsert = 'INSERT INTO compania(nombre,activo) VALUES ($1,$2)'


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
    response.status(200).send(`Compania deleted with ID: ${id}`)
  })
}

const update = async (ConexionEstablecida, request, response) => {
  const id = parseInt(request.params.id)
  const { nombre, activo } = request.body
  var results = await ConexionEstablecida.query(queryUpdate,
    [nombre, activo, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Compania modified with ID: ${id}`)
    }
  )
}

const insert = async (ConexionEstablecida, request, response) => {
  const { nombre, activo } = request.body
  var results = await ConexionEstablecida.query(queryInsert, [nombre, activo], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Compania added `)
  })
}


module.exports = {
  read, readId, deletee, update, insert
}