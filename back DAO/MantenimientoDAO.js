const queryRead = 'SELECT * FROM mantenimiento ORDER BY idmantenimiento ASC'
const queryReadForId = 'SELECT * FROM mantenimiento WHERE idmantenimiento= $1'
const queryDelete = 'DELETE FROM mantenimiento WHERE idmantenimiento = $1'
const queryUpdate = 'UPDATE mantenimiento SET idpersonalfk=$1,matriculaFK=$2,nombre_mantenimiento=$3,descripcion_mantenimiento=$4,fechaderealizacion=$5 WHERE idmantenimiento=$6'
const queryInsert = 'INSERT INTO mantenimiento (idpersonalfk,matriculaFK,nombre_mantenimiento,descripcion_mantenimiento,fechaderealizacion)  VALUES ($1, $2, $3,$4,$5)'


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
    const { idpersonalfk, matriculafk, nombre_mantenimiento, descripcion_mantenimiento, fechaderealizacion } = request.body
    var result = await ConexionEstablecida.query(queryInsert, [idpersonalfk, matriculafk, nombre_mantenimiento, descripcion_mantenimiento, fechaderealizacion], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Mantenimiento added `)
    })
}


const update = async (ConexionEstablecida, request, response) => {
    const id = parseInt(request.params.id)
    const { idpersonalfk, matriculafk, nombre_mantenimiento, descripcion_mantenimiento, fechaderealizacion } = request.body
    var result = await ConexionEstablecida.query(queryUpdate, [idpersonalfk, matriculafk, nombre_mantenimiento, descripcion_mantenimiento, fechaderealizacion, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Mantenimiento modified with ID: ${id}`)
        }
    )
}

const deletee = async (ConexionEstablecida, request, response) => {
    const id = parseInt(request.params.id)
    var result = await ConexionEstablecida.query(queryDelete, [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Mantenimineto deleted with ID: ${id}`)
    })
}



module.exports = {
    read, readId, deletee, update, insert
}
