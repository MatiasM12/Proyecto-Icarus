
const queryRead = 'SELECT * FROM historial ORDER BY  idVuelo_FK ASC'
const queryReadId = 'select estado, fecha_y_hora, aeronave, cambiotripulacion, usuario, nombre, apellido from (historial h left join usuario u on h.usuario=u.username) left join personal on personal_legajo_fk=idpersonal WHERE idVuelo_FK= $1';
const queryDeletee = 'DELETE FROM historial WHERE idVuelo_FK= $1';
const queryUpdate = 'UPDATE historial SET usuario=$1,fecha_y_hora=$2,cambiotripulacion=$3 WHERE estado=$4 and idVuelo_FK= $5';
const queryInsert = "INSERT INTO historial (idvuelo_fk,estado,usuario,fecha_y_hora,cambiotripulacion,aeronave) VALUES ($1, $2, $3,$4,$5,$6);";

const read = async (ConexionEstablecida, request, response) => {
    try {
        var result = await ConexionEstablecida.query(queryRead);
        response.status(200).json(result.rows);
        return result.rows;
    }
    catch (err) {
        console.log(err);
    }
}

const readId = async (ConexionEstablecida, request, response) => {
    try {
        const { idvuelo } = request.body;
        var result = await ConexionEstablecida.query(queryReadId, [idvuelo])
        response.status(200).json(result.rows);
        return result.rows

    }
    catch (err) {
        console.log(err);
    }
}


const deletee = async (ConexionEstablecida, request, response) => {
    const { idvuelo_fk } = request.body;
    var result = await ConexionEstablecida.query(queryDeletee, [idvuelo_fk], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Clima deleted with ID: ${idvuelo_fk}`)
    })
}

const updateTripulacion = async (ConexionEstablecida, request, response) => {
    try {
        const { estado, usuario, fecha_y_hora, cambiotripulacion, idvuelo } = request.body;

        console.log(estado + "---------------" + fecha_y_hora + "----------------------------" + cambiotripulacion);

        let result = await ConexionEstablecida.query(queryUpdate, [usuario, fecha_y_hora, cambiotripulacion, estado, idvuelo]);
        response.status(200).json(result.rows);
        return result.rows;
    }
    catch (err) {
        console.log(err);
    }
}

const insert = async (ConexionEstablecida, request, mail, codigoVerifcacion) => {
    const { idvuelo_fk, estado, usuario, fecha_y_hora, cambiotripulacion, aeronave } = request
    var result = await ConexionEstablecida.query(queryInsert, [idvuelo_fk, estado, usuario, fecha_y_hora, cambiotripulacion, aeronave], (error, results) => {
        if (error) {
            throw error
        }
    })
}

module.exports = {
    read, readId, deletee, updateTripulacion, insert
};
