const res = require("express/lib/response")

const queryRead = 'SELECT * FROM solicitud ORDER BY idsolicitud ASC'
const queryReadautorizadas = "SELECT * FROM solicitud where estado='autorizado' and cod_verificado = true"
const queryReadUserYCodigo = "SELECT * FROM solicitud where username=$1 and codigo=$2"
const queryReadForId = 'SELECT * FROM solicitud WHERE idsolicitud= $1'
const queryUpdate = 'UPDATE solicitud SET username=$1, mail=$2, codigo=$3 WHERE idsolicitud=$4'
const queryUpdateCodVerificar = 'UPDATE solicitud SET cod_verificado=$1 WHERE idsolicitud=$2'
const queryUpdateEstado = 'UPDATE solicitud SET estado=$1 WHERE idsolicitud=$2'
const queryUpdateNuevaContraseña = 'UPDATE solicitud SET nueva_pass=$1, fecha=$2 WHERE idsolicitud=$3'
const queryInsert = 'INSERT INTO solicitud (username, mail, codigo)  VALUES ($1, $2, $3)'
const queryDelete = 'DELETE FROM solicitud WHERE idsolicitud = $1'
const queryTraerMail = 'select mail from personal where idpersonal=(select personal_legajo_fk from usuario where username=$1)';
const queryDeleteUser = 'DELETE FROM solicitud WHERE username=$1'

const read = async (ConexionEstablecida, request, response) => {
    try {
        var result = await ConexionEstablecida.query(queryRead)
        return result.rows;
    }
    catch (err) {
        console.log(err);
    }
}

const readautorizadas = async (ConexionEstablecida, request, response) => {
    try {
        var result = await ConexionEstablecida.query(queryReadautorizadas)
        response.status(200).json(result.rows)
        return result.rows;
    }
    catch (err) {
        console.log(err);
    }
}

const readUserYCodigo = async (ConexionEstablecida, request, response) => {
    try {
        const { username, codigo } = request.body
        console.log(username, codigo);
        var result = await ConexionEstablecida.query(queryReadUserYCodigo, [username, codigo])
        return result.rows;
    }
    catch (err) {
        console.log(err);
    }
}

const readId = async (ConexionEstablecida, id) => {
    try {
        const { id } = req.body
        var result = await ConexionEstablecida.query(queryReadForId, [id])
        return result.rows;
    }
    catch (err) {
        console.log(err);
    }
}

const update = async (ConexionEstablecida, request, response) => {
    const { username, mail, codigo, id } = request.body
    var result = await ConexionEstablecida.query(queryUpdate, [username, mail, codigo, id],
        (error, results) => {
            if (error) {
                throw error
            }
        }
    )
}

const updateCodVerificar = async (ConexionEstablecida, cod_verificar, id, response) => {
    var result = await ConexionEstablecida.query(queryUpdateCodVerificar, [cod_verificar, id],
        (error, results) => {
            if (error) {
                throw error
            }
        }
    )
}

const updateEstado = async (ConexionEstablecida, estado, id) => {
    var result = await ConexionEstablecida.query(queryUpdateEstado, [estado, id],
        (error, results) => {
            if (error || id == undefined) {
                throw error
            }
        }

    )
}

const updateNuevaContraseña = async (ConexionEstablecida, request, response) => {
    const { pass, fecha, id } = request
    var result = await ConexionEstablecida.query(queryUpdateNuevaContraseña, [pass, fecha, id],
        (error, results) => {
            if (error) {
                throw error
            }
        }
    )
}

const deletee = async (ConexionEstablecida, request, response) => {
    const id = parseInt(request.params.id)
    var result = await ConexionEstablecida.query(queryDelete, [id], (error, results) => {
        if (error) {
            throw error
        }
    })
}

const insert = async (ConexionEstablecida, request, mail, codigoVerifcacion) => {
    const { username } = request.body
    var result = await ConexionEstablecida.query(queryInsert, [username, mail, codigoVerifcacion], (error, results) => {
        if (error) {
            throw error
        }
    })
}

const readMail = async (ConexionEstablecida, request, response) => {
    try {
        const { username } = request.body
        var result = await ConexionEstablecida.query(queryTraerMail, [username])
        return result.rows;
    }
    catch (err) {
        console.log(err);
    }
}

const deletexUsername = async (ConexionEstablecida, request, response) => {
    const { username } = request.body;
    var result = await ConexionEstablecida.query(queryDeleteUser, [username], (error, results) => {
        if (error) {
            throw error
        }
        // response.status(200).send(`Se borraron las solicitudes de el usuario: ${username}`
    })
}



module.exports = {
    read, readId, deletee, update, insert, readMail, deletexUsername, updateCodVerificar, updateEstado, updateNuevaContraseña, readautorizadas, readUserYCodigo
}
