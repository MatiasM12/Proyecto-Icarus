const queryRead = 'SELECT * FROM usuario ORDER BY personal_legajo_fk ASC'
const queryReadForId = 'SELECT * FROM usuario WHERE personal_legajo_fk= $1'
const queryDelete = 'DELETE FROM usuario WHERE personal_legajo_fk = $1'
const queryUpdate = 'UPDATE usuario SET username=$1, pass=$2, activo=$3, fecha_alta=$4 WHERE personal_legajo_fk=$5'
const queryUpdatePass = 'UPDATE usuario SET pass=$1 WHERE username=$2'
const queryInsert = 'INSERT INTO usuario (personal_legajo_fk,username,pass, activo, fecha_alta)  VALUES ($1, $2, $3, $4, $5)'
const queryAutenticacion = "SELECT pass, posicion, usuario.activo FROM usuario INNER JOIN personal ON idPersonal = personal_legajo_fk where username= $1 and personal.activo=true;"
const queryInfo = "SELECT pass, posicion, usuario.activo, mail FROM usuario INNER JOIN personal ON idPersonal = personal_legajo_fk where username= $1 and personal.activo=true;"
const queryreadForUsername = 'SELECT * FROM usuario WHERE username= $1'
const queryreadUserPersonal = ' SELECT * FROM usuario right JOIN  personal ON idPersonal = personal_legajo_fk;';

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
const readUserPersonal = async (ConexionEstablecida, request, response) => {
  try {
    var result = await ConexionEstablecida.query(queryreadUserPersonal)
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

const readUser = async (ConexionEstablecida, username) => {
  const result = await ConexionEstablecida.query(queryreadForUsername, [username])
  return result.rows;
}

const readUserPass = async (ConexionEstablecida, request, response) => {
  try {
    const { username } = request.body
    var result = await ConexionEstablecida.query(queryAutenticacion, [username])
    response.status(201).send(result.rows)
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}

const readUserInfo = async (ConexionEstablecida, request, response) => {

  try {
    const { username } = request.body
    var result = await ConexionEstablecida.query(queryInfo, [username])
    response.status(201).send(result.rows)
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}

const insert = async (ConexionEstablecida, request, response) => {
  const { personal_legajo_fk, username, pass, activo, fecha_alta } = request.body
  var result = await ConexionEstablecida.query(queryInsert, [personal_legajo_fk, username, pass, activo, fecha_alta], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added `)
  })
}

const update = async (ConexionEstablecida, request, response) => {
  const id = parseInt(request.params.id)
  const { username, pass, activo, fecha_alta } = request.body
  var result = await ConexionEstablecida.query(queryUpdate, [username, pass, activo, fecha_alta, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const updatePass = async (ConexionEstablecida, username, pass, response) => {
  var result = await ConexionEstablecida.query(queryUpdatePass, [pass, username],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send("User modified ")
    }
  )
}

const deletee = async (ConexionEstablecida, request, response) => {
  const id = parseInt(request.params.id)
  var result = await ConexionEstablecida.query(queryDelete, [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}



module.exports = {
  read, readId, readUserPass, deletee, update, insert, readUserInfo, updatePass, readUser, readUserPersonal
}
