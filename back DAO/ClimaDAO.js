
const queryRead = 'SELECT * FROM clima ORDER BY  idVuelo_FK ASC'
const queryCheckClima = 'SELECT * FROM clima WHERE idVuelo_FK= $1';
const queryDeletee = 'DELETE FROM clima WHERE idVuelo_FK= $1';
const queryUpdate = 'UPDATE clima SET Aeropuerto_codIATA_fk=$1,TemperaturaAlDespegar=$2,climaAlDespegar=$3,velocidadVientokM=$4 WHERE  idVuelo_FK= $5';
const queryInsert = "INSERT INTO clima (idvuelo_fk,climaDestino,gradosTemperaturaDestino,velocidadVientokM,peligrosidad) VALUES ($1, $2, $3,$4,$5);";

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
        const { idvuelo_fk } = request.body;
        console.log(idvuelo_fk)
        var result = await ConexionEstablecida.query(queryCheckClima, [idvuelo_fk])
        response.status(200).json(result.rows)

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

const update = async (ConexionEstablecida, request, response) => {
    try {
        const { aeropuerto_codiata_fk, temperaturaaldespegar, climaaldespegar, velocidadvientokm, idvuelo_fk } = request.body;
        let result = await ConexionEstablecida.query(queryUpdate, [aeropuerto_codiata_fk, temperaturaaldespegar, climaaldespegar, velocidadvientokm, idvuelo_fk]);
        response.status(200).json(result.rows);
        return result.rows;
    }
    catch (err) {
        console.log(err);
    }
}

const insertarClima = async (ConexionEstablecida, body) => {
    try {
        let clima = getClimaDeCodigo(body.climaDestino);
        let temperatura = Number(body.gradosTemperaturaDestino);
        let Velocidadviento = body.velocidadVientokM;
        let peligro = body.velocidadVientokM > 100.0 ? true : false;
        let result = await ConexionEstablecida.query(queryInsert, [body.idvuelo_fk, clima, temperatura, Velocidadviento, peligro]);
        return { "idvuelo_fk": body.idvuelo_fk, "climaDestino": clima, "gradosTemperaturaDestino": temperatura, "velocidadVientokM": Velocidadviento, "peligrosidad": peligro }
    }
    catch (err) {
        console.log(err);
    }

}

function getClimaDeCodigo(codigoString) {
    codigo = Number(codigoString)
    switch (codigo) {
        case 0:
            return "Cielo limpio";
            break;
        case 1:
            return "Despejado";
            break;
        case 2:
            return "Parcialmente Nublado";
            break;

        case 3:
            return "Nublado";
            break;
        case 45:
            return "Niebla";
            break;
        case 48:
            return "Niebla de escarcha";
            break;
        case 51:
            return "Llovizna ligera";
            break;
        case 53:
            return "Llovizna moderada";
            break;
        case 55:
            return "Llovizna densa";
            break;
        case 56:
            return "Lluvia engelante ligera";
            break;
        case 57:
            return "Lluvia engelante densa";
            break;
        case 61:
            return "Lluvia leve";
            break;
        case 63:
            return "Lluvia moderada";
            break;
        case 65:
            return "Lluvia fuerte";
            break;
        case 66:
            return "Lluvia helada ligera";
            break;
        case 67:
            return "Lluvia helada fuerte";
            break;
        case 71:
            return "Caida de nieve ligera";
            break;
        case 73:
            return "Caida de nieve moderada";
            break;
        case 75:
            return "Caida de nieve fuerte";
            break;
        case 77:
            return "Granos de nieve";
            break;
        case 80:
            return "Lluvia leve";
            break;
        case 81:
            return "Lluvia moderada";
            break;
        case 82:
            return "Lluvia fuerte";
            break;
        case 85:
            return "Chubascos de nieve leve";
            break;
        case 86:
            return "Chubascos de nieve fuerte";
            break;
        case 95:
            return "Tormenta";
            break;
        case 96:
            return "Tormenta con granizo leve";
            break;
        case 99:
            return "Tormenta con granizo fuerte";
            break;
        default:
            return "No se detectó el clima"
    }
}

module.exports = {
    read, readId, insertarClima, deletee, update,
};
