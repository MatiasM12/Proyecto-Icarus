
const queryRead = 'SELECT * FROM parentesco ORDER BY personal1_legajo_fk ASC'
const queryReadForId = 'SELECT * FROM parentesco WHERE personal1_legajo_fk= $1 or personal2_legajo_fk= $1 '
const queryDelete = 'DELETE FROM parentesco WHERE personal1_legajo_fk = $1 or personal2_legajo_fk= $1'
const queryUpdate = 'UPDATE parentesco SET relacion=$1,activo=$2,fecha_de_actualizacion=$3 WHERE (personal1_legajo_fk= $4 AND personal2_legajo_fk= $5) or  (personal2_legajo_fk= $4 AND personal1_legajo_fk= $5)'
const queryInsert = 'INSERT INTO parentesco (personal1_legajo_fk, personal2_legajo_fk, relacion, activo, fecha_de_actualizacion) VALUES ($1, $2, $3,$4,$5)'
const queryRelacion = 'SELECT * FROM parentesco exists ()'
const queryExitenciaParentezco = 'SELECT * FROM parentesco WHERE personal1_legajo_fk= $1 or personal2_legajo_fk= $1 and activo=true'
const queryArrayParientes = 'SELECT personal2_legajo_fk FROM parentesco where personal1_legajo_fk = $1;'


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

const insert = async (ConexionEstablecida, request, response) => {
  const { personal1_legajo_fk, personal2_legajo_fk, relacion, activo, fecha_de_actualizacion } = request.body
  var result = await ConexionEstablecida.query(queryInsert, [personal1_legajo_fk, personal2_legajo_fk, relacion, activo, fecha_de_actualizacion], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Parentesco added `)
  })
}

const update = async (ConexionEstablecida, request, response) => {
  const { personal1_legajo_fk, personal2_legajo_fk, relacion, activo, fecha_de_actualizacion } = request.body
  var result = await ConexionEstablecida.query(queryUpdate, [relacion, activo, fecha_de_actualizacion, personal1_legajo_fk, personal2_legajo_fk],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Parentesco modified with ID: ${personal1_legajo_fk}`)
    }
  )
}

const deletee = async (ConexionEstablecida, request, response) => {
  const id = parseInt(request.params.id)
  var result = await ConexionEstablecida.query(queryDelete, [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Parentesco deleted with ID: ${id}`)
  })
}

const readParentesco = async (ConexionEstablecida, idpiloto) => {
  try {
    var result = await ConexionEstablecida.query(queryExitenciaParentezco, [idpiloto])
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}

const buscarParientes = async (ConexionEstablecida, idNuevo) => {
  try {
    var result = await ConexionEstablecida.query(queryArrayParientes, [idNuevo])
    return result.rows;
  }
  catch (err) {
    console.log(err)
  }
}


module.exports = {
  read, readId, deletee, update, insert, readParentesco, buscarParientes
}
