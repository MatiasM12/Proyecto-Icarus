
const queryRead = 'SELECT * FROM insumo ORDER BY idinsumo ASC';
const queryReadId = 'SELECT * FROM insumo WHERE idvuelo_fk = $1';
const queryInsert = "INSERT INTO insumo (idVuelo_fk,cantidadInicial,cantidadFinal,nombre,descripcion,pesoIndividual) VALUES ($1,$2,$3,$4,$5,$6);";

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
        const { idvuelo_fk } = request.body
        var result = await ConexionEstablecida.query(queryReadId, [idvuelo_fk])
        response.status(200).json(result.rows)
        return result.rows;
    }
    catch (err) {
        console.log(err);
    }
}

const insert = async (ConexionEstablecida, request, response) => {
    try {
        const { idVuelo, cantidadInicial, cantidadFinal, nombre, descripcion, pesoIndividual } = request
        var result = await ConexionEstablecida.query(queryInsert, [idVuelo, cantidadInicial, cantidadFinal, nombre, descripcion, pesoIndividual])

    }
    catch (err) {
        console.log(err)
    }

}



module.exports = {
    read, readId, insert,
}

