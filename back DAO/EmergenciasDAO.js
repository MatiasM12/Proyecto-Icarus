
const queryRead = 'SELECT * FROM emergencia ORDER BY idemergencia ASC';
const queryReadId = 'SELECT * FROM emergencia WHERE idvuelo = $1'
const queryDelete = 'DELETE FROM emergencia WHERE idemergencia = $1';
const queryUpdate = "UPDATE emergencia SET idvuelo_fk=$1,emergencia= $2 , procedimiento = $3 where idemergencia = $4";
const queryInsert2 = "INSERT INTO emergencia (idVuelo_fk,emergencia,NivelPrioridad,detalle,protocolo) VALUES ($1,$2,$3,$4,$5)";
const queryInsert = "INSERT INTO emergencia(idVuelo_fk , emergencia ,NivelPrioridad ,detalle, protocolo) SELECT $1, $2,$3,$4,$5 WHERE NOT EXISTS (SELECT * FROM emergencia WHERE emergencia = $2  )"


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
        const { idVuelo_fk, emergencia, NivelPrioridad, detalle, protocolo } = request.body
        var result = await ConexionEstablecida.query(queryInsert2, [idVuelo_fk, emergencia, NivelPrioridad, detalle, protocolo])
    }
    catch (err) {
        console.log(err)
    }
}

/*
const insert = async (ConexionEstablecida, request, response) => {
    try{
        const {idVuelo_fk,emergencia,NivelPrioridad,detalle,protocolo } = request.body
        console.log(idVuelo_fk,emergencia,NivelPrioridad,detalle,protocolo);
        var result = await ConexionEstablecida.query(queryInsert, ["idVuelo_fk","idVuelo_fk",NivelPrioridad,detalle,protocolo])
     }
    catch(err){
        console.log(err)
    }
}*/


module.exports = {
    read, readId, insert,
}

