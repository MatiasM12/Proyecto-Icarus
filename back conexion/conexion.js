const Pool = require('pg').Pool

class Conexion {
    static instancia;
    establecer;
    constructor(establecer) {
        if (Conexion.instancia) {
            return Conexion.instancia;
        }
        Conexion.instancia = this;
        this.establecer = establecer;
    }


}
//establece la conecion a la bdd
const getConexion = new Conexion(new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'api',
    password: 'root',
    port: 5432,
}));


module.exports = { getConexion };



