
const queryRead = 'SELECT * FROM ubicacionActual ORDER BY idUbicacion ASC'
const queryReadForId = 'SELECT * FROM ubicacionActual WHERE idUbicacion= $1'
const queryDelete = 'DELETE FROM ubicacionActual WHERE idUbicacion = $1'
const queryUpdate = 'UPDATE ubicacionActual SET pais = $1, provincia = $2, ciudad = $3, calle = $4, altura = $5, piso = $6, departamento = $7 WHERE idUbicacion=$8'
const queryInsert = 'INSERT INTO ubicacionActual (pais,provincia,ciudad,calle,altura,piso,departamento)  VALUES ($1, $2,$3, $4,$5, $6,$7)'


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
  const { pais, provincia, ciudad, calle, altura, piso, departamento } = request.body
  var result = await ConexionEstablecida.query(queryInsert, [pais, provincia, ciudad, calle, altura, piso, departamento], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Ubicacion actual added`)
  })
}

const update = async (ConexionEstablecida, request, response) => {
  const id = parseInt(request.params.id)
  const { pais, provincia, ciudad, calle, altura, piso, departamento } = request.body
  var result = await ConexionEstablecida.query(queryUpdate, [pais, provincia, ciudad, calle, altura, piso, departamento, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Ubicacion actual modified with ID: ${id}`)
    }
  )
}

const deletee = async (ConexionEstablecida, request, response) => {
  const id = parseInt(request.params.id)
  var result = await ConexionEstablecida.query(queryDelete, [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Ubicacion actual deleted with ID: ${id}`)
  })
}



module.exports = {
  read, readId, deletee, update, insert
}
