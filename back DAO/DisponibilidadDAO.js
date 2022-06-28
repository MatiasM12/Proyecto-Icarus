
const queryRead = 'SELECT * FROM disponibilidad ORDER BY iddisponibilidad ASC'
const queryReadForId = 'SELECT * FROM disponibilidad WHERE iddisponibilidad= $1'
const queryDelete = 'DELETE FROM disponibilidad WHERE iddisponibilidad = $1'
const queryUpdate = 'UPDATE disponibilidad SET idpersonal_fk=$1, disponible=$2, descripcion_disponibilidad=$3,fechaDeInicio=$4,fechadeFinalizacion=$5 WHERE iddisponibilidad=$6'
const queryInsert = 'INSERT INTO disponibilidad (idpersonal_fk, disponible,descripcion_disponibilidad,fechaDeInicio,fechadeFinalizacion)  VALUES ($1, $2, $3,$4,$5)'
const queryReadForPersonalFechas = 'SELECT * FROM disponibilidad WHERE idpersonal_fk=$1 AND ((fechadeinicio<=$2 AND fechadeinicio>=$3 ) OR (fechadefinalizacion>=$2 AND fechadefinalizacion<=$3));'

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
    const { idpersonal_fk, disponible, descripcion_disponibilidad, fechadeinicio, fechadefinalizacion } = request.body
    var result = await ConexionEstablecida.query(queryInsert, [idpersonal_fk, disponible, descripcion_disponibilidad, fechadeinicio, fechadefinalizacion], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Disponibilidad added `)
    })
}

const update = async (ConexionEstablecida, request, response) => {
    const id = parseInt(request.params.id)
    const { idpersonalfk, disponible, descripcion_disponibilidad, fechadeinicio, fechadefinalizacion } = request.body
    var result = await ConexionEstablecida.query(queryUpdate, [idpersonalfk, disponible, descripcion_disponibilidad, fechadeinicio, fechadefinalizacion, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Disponibilidad modified with ID: ${id}`)
        }
    )
}

const deletee = async (ConexionEstablecida, request, response) => {
    const id = parseInt(request.params.id)
    var result = await ConexionEstablecida.query(queryDelete, [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Disponibilidad deleted with ID: ${id}`)
    })
}

const readPersonalFecha = async (ConexionEstablecida, idPersonal, fechaDespegueEstimada, fechaAterrizajeEstimada) => {
    //me trae las vacacion de idPersonal que se pizan con fechaDepegueEstimada o fechaAterrizajeEstimada
    try {
        var result = await ConexionEstablecida.query(queryReadForPersonalFechas, [idPersonal, fechaDespegueEstimada, fechaAterrizajeEstimada])
        return result.rows;
    }
    catch (err) {
        console.log(err);
    }
}


module.exports = {
    read, readId, deletee, update, insert, readPersonalFecha
}
