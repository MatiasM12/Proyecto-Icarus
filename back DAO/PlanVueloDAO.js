
const queryRead = 'SELECT idvuelo, estado, aeronave_matricula_fk, modeloAeronave, OrigenTeorico_codIATA, OrigenReal_codIATA, DestinoTeorico_codIATA,DestinoReal_codIATA, nombrecompania, rutaTeorica, rutaReal, reglaDeVuelo, tipoDeVuelo, diaDespegue, fechaDespegueEstimado,HoraDespegueEstimado,fechaDespegueReal, horaDespegueReal,fechaAterrizajeEstimado,HoraAterrizajeEstimado,fechaAterrizajeReal ,horaAterrizajeReal, ltscombustibleEstimado, ltscombustibleReal, lubricanteEstimado,lubricanteReal, kilometrajeEstimado,kilometrajeReal, duracionEstimada,duracionReal,checkIn,controlCabina, totalPersonasABordo,pesoCargaOrigen,PesoCargaDestino,motivoEstado FROM planDeVuelo P left join estados E on E.idestados=P.idEstados_fk left join aeronave A on A.matricula=P.aeronave_matricula_fk;';
const queryReadForCodvuelo = 'SELECT idvuelo, estado, aeronave_matricula_fk, modeloAeronave, OrigenTeorico_codIATA, OrigenReal_codIATA, DestinoTeorico_codIATA,DestinoReal_codIATA, nombrecompania, rutaTeorica, rutaReal, reglaDeVuelo, tipoDeVuelo, diaDespegue, fechaDespegueEstimado,HoraDespegueEstimado,fechaDespegueReal, horaDespegueReal,fechaAterrizajeEstimado,HoraAterrizajeEstimado,fechaAterrizajeReal ,horaAterrizajeReal, climaDestino, gradosTemperaturaDestino, velocidadVientokM,ltscombustibleEstimado, ltscombustibleReal, lubricanteEstimado,lubricanteReal, kilometrajeEstimado,kilometrajeReal, duracionEstimada,duracionReal,checkIn,controlCabina, totalPersonasABordo,pesoCargaOrigen,PesoCargaDestino,motivoEstado, aeronavesPosibles FROM planDeVuelo P left join estados E on E.idestados=P.idEstados_fk left join aeronave A on A.matricula=P.aeronave_matricula_fk left join clima CL on CL.idvuelo_fk=P.idvuelo WHERE idvuelo = $1;';
const queryReadVuelosConfirmados = 'SELECT idvuelo, estado, aeronave_matricula_fk, modeloAeronave, OrigenTeorico_codIATA, OrigenReal_codIATA, DestinoTeorico_codIATA,DestinoReal_codIATA, nombrecompania, rutaTeorica, rutaReal, reglaDeVuelo, tipoDeVuelo, diaDespegue, fechaDespegueEstimado,HoraDespegueEstimado,fechaDespegueReal, horaDespegueReal,fechaAterrizajeEstimado,HoraAterrizajeEstimado,fechaAterrizajeReal ,horaAterrizajeReal, ltscombustibleEstimado, ltscombustibleReal, lubricanteEstimado,lubricanteReal, kilometrajeEstimado,kilometrajeReal, duracionEstimada,duracionReal,checkIn,controlCabina, totalPersonasABordo,pesoCargaOrigen,PesoCargaDestino,motivoEstado FROM planDeVuelo P left join estados E on E.idestados=P.idEstados_fk left join aeronave A on A.matricula=P.aeronave_matricula_fk left join clima CL on CL.idvuelo_fk=P.idvuelo WHERE idEstados_fk = 2;';
const queryReadVuelosCancelados = 'SELECT idvuelo, estado, aeronave_matricula_fk, modeloAeronave, OrigenTeorico_codIATA, OrigenReal_codIATA, DestinoTeorico_codIATA,DestinoReal_codIATA, nombrecompania, rutaTeorica, rutaReal, reglaDeVuelo, tipoDeVuelo, diaDespegue, fechaDespegueEstimado,HoraDespegueEstimado,fechaDespegueReal, horaDespegueReal,fechaAterrizajeEstimado,HoraAterrizajeEstimado,fechaAterrizajeReal ,horaAterrizajeReal, ltscombustibleEstimado, ltscombustibleReal, lubricanteEstimado,lubricanteReal, kilometrajeEstimado,kilometrajeReal, duracionEstimada,duracionReal,checkIn,controlCabina, totalPersonasABordo,pesoCargaOrigen,PesoCargaDestino,motivoEstado FROM planDeVuelo P left join estados E on E.idestados=P.idEstados_fk left join aeronave A on A.matricula=P.aeronave_matricula_fk left join clima CL on CL.idvuelo_fk=P.idvuelo WHERE idEstados_fk = 10;';
const queryReadVuelosFinalizados = 'SELECT idvuelo, estado, aeronave_matricula_fk, modeloAeronave, OrigenTeorico_codIATA, OrigenReal_codIATA, DestinoTeorico_codIATA,DestinoReal_codIATA, nombrecompania, rutaTeorica, rutaReal, reglaDeVuelo, tipoDeVuelo, diaDespegue, fechaDespegueEstimado,HoraDespegueEstimado,fechaDespegueReal, horaDespegueReal,fechaAterrizajeEstimado,HoraAterrizajeEstimado,fechaAterrizajeReal ,horaAterrizajeReal, ltscombustibleEstimado, ltscombustibleReal, lubricanteEstimado,lubricanteReal, kilometrajeEstimado,kilometrajeReal, duracionEstimada,duracionReal,checkIn,controlCabina, totalPersonasABordo,pesoCargaOrigen,PesoCargaDestino,motivoEstado FROM planDeVuelo P left join estados E on E.idestados=P.idEstados_fk left join aeronave A on A.matricula=P.aeronave_matricula_fk left join clima CL on CL.idvuelo_fk=P.idvuelo WHERE idEstados_fk = 7;';

const queryReadFiltros = 'SELECT idvuelo, estado, aeronave_matricula_fk, modeloAeronave, OrigenTeorico_codIATA, OrigenReal_codIATA, DestinoTeorico_codIATA,DestinoReal_codIATA, nombrecompania, rutaTeorica, rutaReal, reglaDeVuelo, tipoDeVuelo, diaDespegue, fechaDespegueEstimado,HoraDespegueEstimado,fechaDespegueReal, horaDespegueReal,fechaAterrizajeEstimado,HoraAterrizajeEstimado,fechaAterrizajeReal ,horaAterrizajeReal, ltscombustibleEstimado, ltscombustibleReal, lubricanteEstimado,lubricanteReal, kilometrajeEstimado,kilometrajeReal, duracionEstimada,duracionReal,checkIn,controlCabina, totalPersonasABordo,pesoCargaOrigen,PesoCargaDestino,motivoEstado FROM planDeVuelo P left join estados E on E.idestados=P.idEstados_fk left join aeronave A on A.matricula=P.aeronave_matricula_fk WHERE (origenteorico_codiata=$1 and destinoteorico_codiata=$2) and ($3 <= fechaDespegueEstimado  and $4>= fechaAterrizajeEstimado) and $5 <= idEstados_fk and $6 >= idEstados_fk ;';
const queryReadForOrigenDestino = 'SELECT idvuelo, estado, aeronave_matricula_fk, modeloAeronave, OrigenTeorico_codIATA, OrigenReal_codIATA, DestinoTeorico_codIATA,DestinoReal_codIATA, nombrecompania, rutaTeorica, rutaReal, reglaDeVuelo, tipoDeVuelo, diaDespegue, fechaDespegueEstimado,HoraDespegueEstimado,fechaDespegueReal, horaDespegueReal,fechaAterrizajeEstimado,HoraAterrizajeEstimado,fechaAterrizajeReal ,horaAterrizajeReal, ltscombustibleEstimado, ltscombustibleReal, lubricanteEstimado,lubricanteReal, kilometrajeEstimado,kilometrajeReal, duracionEstimada,duracionReal,checkIn,controlCabina, totalPersonasABordo,pesoCargaOrigen,PesoCargaDestino,motivoEstado FROM planDeVuelo P left join estados E on E.idestados=P.idEstados_fk left join aeronave A on A.matricula=P.aeronave_matricula_fk WHERE origenteorico_codiata=$1 and destinoteorico_codiata=$2;';
const queryReadForEstadoRango = 'SELECT idvuelo, estado, aeronave_matricula_fk, modeloAeronave, OrigenTeorico_codIATA, OrigenReal_codIATA, DestinoTeorico_codIATA,DestinoReal_codIATA, nombrecompania, rutaTeorica, rutaReal, reglaDeVuelo, tipoDeVuelo, diaDespegue, fechaDespegueEstimado,HoraDespegueEstimado,fechaDespegueReal, horaDespegueReal,fechaAterrizajeEstimado,HoraAterrizajeEstimado,fechaAterrizajeReal ,horaAterrizajeReal, ltscombustibleEstimado, ltscombustibleReal, lubricanteEstimado,lubricanteReal, kilometrajeEstimado,kilometrajeReal, duracionEstimada,duracionReal,checkIn,controlCabina, totalPersonasABordo,pesoCargaOrigen,PesoCargaDestino,motivoEstado FROM planDeVuelo P left join estados E on E.idestados=P.idEstados_fk left join aeronave A on A.matricula=P.aeronave_matricula_fk WHERE $1 <= idEstados_fk and $2 >= idEstados_fk;';
const queryReadRangoFecha = 'SELECT idvuelo, estado, aeronave_matricula_fk, modeloAeronave, OrigenTeorico_codIATA, OrigenReal_codIATA, DestinoTeorico_codIATA,DestinoReal_codIATA, nombrecompania, rutaTeorica, rutaReal, reglaDeVuelo, tipoDeVuelo, diaDespegue, fechaDespegueEstimado,HoraDespegueEstimado,fechaDespegueReal, horaDespegueReal,fechaAterrizajeEstimado,HoraAterrizajeEstimado,fechaAterrizajeReal ,horaAterrizajeReal, ltscombustibleEstimado, ltscombustibleReal, lubricanteEstimado,lubricanteReal, kilometrajeEstimado,kilometrajeReal, duracionEstimada,duracionReal,checkIn,controlCabina, totalPersonasABordo,pesoCargaOrigen,PesoCargaDestino,motivoEstado FROM planDeVuelo P left join estados E on E.idestados=P.idEstados_fk left join aeronave A on A.matricula=P.aeronave_matricula_fk WHERE $1 <= fechaDespegueEstimado   and $2 >= fechaAterrizajeEstimado;';
const queryInsertInicial = 'INSERT INTO planDeVuelo (idVuelo,codVuelo,Aeronave_matricula_fk,OrigenTeorico_codIATA,OrigenReal_codIATA,DestinoTeorico_codIATA,DestinoReal_codIATA,nombreCompania,idEstados_fk,rutaTeorica ,rutaReal, reglaDeVuelo,tipoDeVuelo,diaDespegue , fechaDespegueEstimado, HoraDespegueEstimado, fechaDespegueReal,horaDespegueReal, fechaAterrizajeEstimado,HoraAterrizajeEstimado, fechaAterrizajeReal,horaAterrizajeReal,  ltscombustibleEstimado,ltscombustibleReal, lubricanteEstimado,lubricanteReal, kilometrajeEstimado ,kilometrajeReal, duracionEstimada,duracionReal, checkIn,controlCabina, totalPersonasABordo, pesoCargaOrigen ,pesoCargaDestino , informado , motivoEstado, aeronavesPosibles) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37,$38)';
const queryReadIdEstado = 'SELECT  idEstados_fk,rutateorica from plandevuelo where idVuelo =$1'
// queries para mas filtros
const queryReadAOrigen = 'SELECT idvuelo, estado, aeronave_matricula_fk, modeloAeronave, OrigenTeorico_codIATA, OrigenReal_codIATA, DestinoTeorico_codIATA,DestinoReal_codIATA, nombrecompania, rutaTeorica, rutaReal, reglaDeVuelo, tipoDeVuelo, diaDespegue, fechaDespegueEstimado,HoraDespegueEstimado,fechaDespegueReal, horaDespegueReal,fechaAterrizajeEstimado,HoraAterrizajeEstimado,fechaAterrizajeReal ,horaAterrizajeReal, ltscombustibleEstimado, ltscombustibleReal, lubricanteEstimado,lubricanteReal, kilometrajeEstimado,kilometrajeReal, duracionEstimada,duracionReal,checkIn,controlCabina, totalPersonasABordo,pesoCargaOrigen,PesoCargaDestino,motivoEstado FROM planDeVuelo P left join estados E on E.idestados=P.idEstados_fk left join aeronave A on A.matricula=P.aeronave_matricula_fk WHERE origenteorico_codiata=$1';
const queryReadADestino = 'SELECT idvuelo, estado, aeronave_matricula_fk, modeloAeronave, OrigenTeorico_codIATA, OrigenReal_codIATA, DestinoTeorico_codIATA,DestinoReal_codIATA, nombrecompania, rutaTeorica, rutaReal, reglaDeVuelo, tipoDeVuelo, diaDespegue, fechaDespegueEstimado,HoraDespegueEstimado,fechaDespegueReal, horaDespegueReal,fechaAterrizajeEstimado,HoraAterrizajeEstimado,fechaAterrizajeReal ,horaAterrizajeReal, ltscombustibleEstimado, ltscombustibleReal, lubricanteEstimado,lubricanteReal, kilometrajeEstimado,kilometrajeReal, duracionEstimada,duracionReal,checkIn,controlCabina, totalPersonasABordo,pesoCargaOrigen,PesoCargaDestino,motivoEstado FROM planDeVuelo P left join estados E on E.idestados=P.idEstados_fk left join aeronave A on A.matricula=P.aeronave_matricula_fk WHERE $1=destinoteorico_codiata;';
const queryReadFOrigen = 'SELECT idvuelo, estado, aeronave_matricula_fk, modeloAeronave, OrigenTeorico_codIATA, OrigenReal_codIATA, DestinoTeorico_codIATA,DestinoReal_codIATA, nombrecompania, rutaTeorica, rutaReal, reglaDeVuelo, tipoDeVuelo, diaDespegue, fechaDespegueEstimado,HoraDespegueEstimado,fechaDespegueReal, horaDespegueReal,fechaAterrizajeEstimado,HoraAterrizajeEstimado,fechaAterrizajeReal ,horaAterrizajeReal, ltscombustibleEstimado, ltscombustibleReal, lubricanteEstimado,lubricanteReal, kilometrajeEstimado,kilometrajeReal, duracionEstimada,duracionReal,checkIn,controlCabina, totalPersonasABordo,pesoCargaOrigen,PesoCargaDestino,motivoEstado FROM planDeVuelo P left join estados E on E.idestados=P.idEstados_fk left join aeronave A on A.matricula=P.aeronave_matricula_fk WHERE $1 = fechaDespegueEstimado;';
const queryReadFDestino = 'SELECT idvuelo, estado, aeronave_matricula_fk, modeloAeronave, OrigenTeorico_codIATA, OrigenReal_codIATA, DestinoTeorico_codIATA,DestinoReal_codIATA, nombrecompania, rutaTeorica, rutaReal, reglaDeVuelo, tipoDeVuelo, diaDespegue, fechaDespegueEstimado,HoraDespegueEstimado,fechaDespegueReal, horaDespegueReal,fechaAterrizajeEstimado,HoraAterrizajeEstimado,fechaAterrizajeReal ,horaAterrizajeReal, ltscombustibleEstimado, ltscombustibleReal, lubricanteEstimado,lubricanteReal, kilometrajeEstimado,kilometrajeReal, duracionEstimada,duracionReal,checkIn,controlCabina, totalPersonasABordo,pesoCargaOrigen,PesoCargaDestino,motivoEstado FROM planDeVuelo P left join estados E on E.idestados=P.idEstados_fk left join aeronave A on A.matricula=P.aeronave_matricula_fk WHERE $1 = fechaAterrizajeEstimado;';
// queries cabina (grupo 2)
const queryInforutaXmodelo = 'SELECT modeloaeronave, rutaReal, count(*) FROM planDeVuelo P left join estados E on E.idestados=P.idEstados_fk left join aeronave A on A.matricula=P.aeronave_matricula_fk where idEstados_fk=7 group by modeloaeronave, rutaReal ;';
//-----------------------------------------------------------------------------------------
const queryDelete = 'DELETE FROM planDeVuelo WHERE idvuelo = $1';
const queryUpdateIngresarMatricula = 'UPDATE planDeVuelo SET aeronave_matricula_fk=$1 where idvuelo=$2'
const queryUpdateConfirmado = 'UPDATE planDeVuelo SET idEstados_fk=2 where idvuelo=$1'
const queryIngresoDatosPreEmbarqueCheckin = 'UPDATE planDeVuelo SET checkIn=$1, totalPersonasABordo=$2, pesoCargaOrigen=$3 where idvuelo=$4'
const queryIngresoControlCabina = 'UPDATE planDeVuelo SET controlCabina=$1 where idvuelo=$2'
const queryUpdatePreEmbarque = 'UPDATE planDeVuelo SET idEstados_fk=3, controlCabina=true where idvuelo=$1'
const queryUpdateDespegue = 'UPDATE planDeVuelo SET idestados_fk=4 where idvuelo=$1'
const queryUpdateEnVuelo = 'UPDATE planDeVuelo SET idestados_fk=5 where idvuelo=$1'
const queryUpdateAterrizado = 'UPDATE planDeVuelo SET idestados_fk=6 where idvuelo=$1'
const queryUpdatefinalizado = 'UPDATE planDeVuelo SET OrigenReal_codIATA=$2,DestinoReal_codIATA=$3,fechaDespegueReal=$4, horaDespegueReal=$5,fechaAterrizajeReal=$6     ,horaAterrizajeReal=$7,idEstados_fk=7, rutaReal=$8,ltscombustibleReal=$9,lubricanteReal=$10, kilometrajeReal=$11, duracionReal=$12, pesoCargaDestino=$13    where idvuelo=$1'
const queryIngresoDatosReProgramado = 'UPDATE planDeVuelo SET OrigenTeorico_codIATA=$1, DestinoTeorico_codIATA=$2, rutaTeorica=$3, motivoEstado=$5 where idvuelo=$6'
const queryUpdateReProgramado = 'UPDATE planDeVuelo SET idEstados_fk=9 where idvuelo=$1'
const queryUpdateDemorado = 'UPDATE planDeVuelo SET idEstados_fk=8, motivoEstado=$1 where idvuelo=$2'
const queryUpdateCancelado = 'UPDATE planDeVuelo SET idEstados_fk=10, motivoEstado=$1 where idvuelo=$2'
const queryUpdateMatricula = 'UPDATE planDeVuelo SET aeronave_matricula_fk=$1 where codvuelo=$2'
const queryUpdateInsertMatricula = 'UPDATE planDeVuelo SET aeronave_matricula_fk=$1 where idvuelo=$2'
const queryTripulacionDisponible = 'select idvuelo from plandevuelo LEFT JOIN tripulacion ON tripulacion.idvuelo_fk=$1 and tripulacion.idpersonal_fk=$2 and ((plandevuelo.fechaDespegueEstimado<=$3 AND plandevuelo.fechaDespegueEstimado>=$4 ) OR (plandevuelo.fechaAterrizajeEstimado>=$3 AND plandevuelo.fechaAterrizajeEstimado<=$4))'
const queryUpdateRutaTeorica = 'UPDATE planDeVuelo SET  rutaTeorica=$1,DestinoTeorico_codIATA=$2 where idVuelo=$3'
const queryupdateNuevaRutaTeorica = 'UPDATE planDeVuelo SET origenteorico_codiata=$1,DestinoTeorico_codIATA=$2,  rutaTeorica=$3,ltscombustibleestimado=$4,lubricanteestimado=$5,kilometrajeestimado=$6,aeronavesposibles=$7 where idVuelo=$8';
const queryUpdateRutaReal = ' UPDATE plandevuelo SET rutareal=$1 , origenreal_codiata=$2,destinoreal_codIATA=$3 where idVuelo=$4 '
const queryUpdateMatriculaVacia = 'UPDATE planDeVuelo SET aeronave_matricula_fk=$1 where idvuelo=$2 and aeronave_matricula_fk=$3 '
const queryIdVueloPorFechaMayorIgual = 'select idvuelo from plandevuelo  left join tripulacion on idvuelo_fk=idvuelo where idpersonal_fk=$1 and fechadespegueestimado>=$2'
const queryIdVueloPorFechaMayor = 'select idvuelo from plandevuelo  left join tripulacion on idvuelo_fk=idvuelo where idpersonal_fk=$1 and fechadespegueestimado>$2'
const queryReadPorFechaMayorIgual = 'SELECT * FROM plandevuelo where fechaAterrizajeEstimado>=$1'
const queryReadPorFechaMayor = 'SELECT * FROM plandevuelo where fechaAterrizajeEstimado>$1'
const queryPlanVueloPorTripulante = ' SELECT * FROM plandevuelo left JOIN tripulacion ON idvuelo = idvuelo_Fk where idestados_fk>=1 and idestados_fk<=6 and idpersonal_fk=$1'
//mas filtros


const queryReadEstado = 'SELECT idvuelo, estado, aeronave_matricula_fk, modeloAeronave, OrigenTeorico_codIATA, OrigenReal_codIATA, DestinoTeorico_codIATA,DestinoReal_codIATA, nombrecompania, rutaTeorica, rutaReal, reglaDeVuelo, tipoDeVuelo, diaDespegue, fechaDespegueEstimado,HoraDespegueEstimado,fechaDespegueReal, horaDespegueReal,fechaAterrizajeEstimado,HoraAterrizajeEstimado,fechaAterrizajeReal ,horaAterrizajeReal, ltscombustibleEstimado, ltscombustibleReal, lubricanteEstimado,lubricanteReal, kilometrajeEstimado,kilometrajeReal, duracionEstimada,duracionReal,checkIn,controlCabina, totalPersonasABordo,pesoCargaOrigen,PesoCargaDestino,motivoEstado FROM planDeVuelo P left join estados E on E.idestados=P.idEstados_fk left join aeronave A on A.matricula=P.aeronave_matricula_fk WHERE $1 = idEstados_fk ;';
const queryReadAOrigenEstado = 'SELECT idvuelo, estado, aeronave_matricula_fk, modeloAeronave, OrigenTeorico_codIATA, OrigenReal_codIATA, DestinoTeorico_codIATA,DestinoReal_codIATA, nombrecompania, rutaTeorica, rutaReal, reglaDeVuelo, tipoDeVuelo, diaDespegue, fechaDespegueEstimado,HoraDespegueEstimado,fechaDespegueReal, horaDespegueReal,fechaAterrizajeEstimado,HoraAterrizajeEstimado,fechaAterrizajeReal ,horaAterrizajeReal, ltscombustibleEstimado, ltscombustibleReal, lubricanteEstimado,lubricanteReal, kilometrajeEstimado,kilometrajeReal, duracionEstimada,duracionReal,checkIn,controlCabina, totalPersonasABordo,pesoCargaOrigen,PesoCargaDestino,motivoEstado FROM planDeVuelo P left join estados E on E.idestados=P.idEstados_fk left join aeronave A on A.matricula=P.aeronave_matricula_fk WHERE origenteorico_codiata=$1 and idEstados_fk =$2;';
const queryReadAOrigenFLlegada = 'SELECT idvuelo, estado, aeronave_matricula_fk, modeloAeronave, OrigenTeorico_codIATA, OrigenReal_codIATA, DestinoTeorico_codIATA,DestinoReal_codIATA, nombrecompania, rutaTeorica, rutaReal, reglaDeVuelo, tipoDeVuelo, diaDespegue, fechaDespegueEstimado,HoraDespegueEstimado,fechaDespegueReal, horaDespegueReal,fechaAterrizajeEstimado,HoraAterrizajeEstimado,fechaAterrizajeReal ,horaAterrizajeReal, ltscombustibleEstimado, ltscombustibleReal, lubricanteEstimado,lubricanteReal, kilometrajeEstimado,kilometrajeReal, duracionEstimada,duracionReal,checkIn,controlCabina, totalPersonasABordo,pesoCargaOrigen,PesoCargaDestino,motivoEstado FROM planDeVuelo P left join estados E on E.idestados=P.idEstados_fk left join aeronave A on A.matricula=P.aeronave_matricula_fk WHERE origenteorico_codiata=$1 and $2 = fechaAterrizajeEstimado;';
const queryReadAOrigenFSalida = 'SELECT idvuelo, estado, aeronave_matricula_fk, modeloAeronave, OrigenTeorico_codIATA, OrigenReal_codIATA, DestinoTeorico_codIATA,DestinoReal_codIATA, nombrecompania, rutaTeorica, rutaReal, reglaDeVuelo, tipoDeVuelo, diaDespegue, fechaDespegueEstimado,HoraDespegueEstimado,fechaDespegueReal, horaDespegueReal,fechaAterrizajeEstimado,HoraAterrizajeEstimado,fechaAterrizajeReal ,horaAterrizajeReal, ltscombustibleEstimado, ltscombustibleReal, lubricanteEstimado,lubricanteReal, kilometrajeEstimado,kilometrajeReal, duracionEstimada,duracionReal,checkIn,controlCabina, totalPersonasABordo,pesoCargaOrigen,PesoCargaDestino,motivoEstado FROM planDeVuelo P left join estados E on E.idestados=P.idEstados_fk left join aeronave A on A.matricula=P.aeronave_matricula_fk WHERE origenteorico_codiata=$1 and $2 = fechaDespegueEstimado;';
const queryReadADestinoFSalida = 'SELECT idvuelo, estado, aeronave_matricula_fk, modeloAeronave, OrigenTeorico_codIATA, OrigenReal_codIATA, DestinoTeorico_codIATA,DestinoReal_codIATA, nombrecompania, rutaTeorica, rutaReal, reglaDeVuelo, tipoDeVuelo, diaDespegue, fechaDespegueEstimado,HoraDespegueEstimado,fechaDespegueReal, horaDespegueReal,fechaAterrizajeEstimado,HoraAterrizajeEstimado,fechaAterrizajeReal ,horaAterrizajeReal, ltscombustibleEstimado, ltscombustibleReal, lubricanteEstimado,lubricanteReal, kilometrajeEstimado,kilometrajeReal, duracionEstimada,duracionReal,checkIn,controlCabina, totalPersonasABordo,pesoCargaOrigen,PesoCargaDestino,motivoEstado FROM planDeVuelo P left join estados E on E.idestados=P.idEstados_fk left join aeronave A on A.matricula=P.aeronave_matricula_fk WHERE destinoteorico_codiata=$1 and $2 = fechaDespegueEstimado;';
const queryReadADestinoFLlegada = 'SELECT idvuelo, estado, aeronave_matricula_fk, modeloAeronave, OrigenTeorico_codIATA, OrigenReal_codIATA, DestinoTeorico_codIATA,DestinoReal_codIATA, nombrecompania, rutaTeorica, rutaReal, reglaDeVuelo, tipoDeVuelo, diaDespegue, fechaDespegueEstimado,HoraDespegueEstimado,fechaDespegueReal, horaDespegueReal,fechaAterrizajeEstimado,HoraAterrizajeEstimado,fechaAterrizajeReal ,horaAterrizajeReal, ltscombustibleEstimado, ltscombustibleReal, lubricanteEstimado,lubricanteReal, kilometrajeEstimado,kilometrajeReal, duracionEstimada,duracionReal,checkIn,controlCabina, totalPersonasABordo,pesoCargaOrigen,PesoCargaDestino,motivoEstado FROM planDeVuelo P left join estados E on E.idestados=P.idEstados_fk left join aeronave A on A.matricula=P.aeronave_matricula_fk WHERE destinoteorico_codiata=$1 and $2 = fechaAterrizajeEstimado;';
const queryReadADestinoEstado = 'SELECT idvuelo, estado, aeronave_matricula_fk, modeloAeronave, OrigenTeorico_codIATA, OrigenReal_codIATA, DestinoTeorico_codIATA,DestinoReal_codIATA, nombrecompania, rutaTeorica, rutaReal, reglaDeVuelo, tipoDeVuelo, diaDespegue, fechaDespegueEstimado,HoraDespegueEstimado,fechaDespegueReal, horaDespegueReal,fechaAterrizajeEstimado,HoraAterrizajeEstimado,fechaAterrizajeReal ,horaAterrizajeReal, ltscombustibleEstimado, ltscombustibleReal, lubricanteEstimado,lubricanteReal, kilometrajeEstimado,kilometrajeReal, duracionEstimada,duracionReal,checkIn,controlCabina, totalPersonasABordo,pesoCargaOrigen,PesoCargaDestino,motivoEstado FROM planDeVuelo P left join estados E on E.idestados=P.idEstados_fk left join aeronave A on A.matricula=P.aeronave_matricula_fk WHERE destinoteorico_codiata=$1 and idEstados_fk =$2;';
const queryReadFOrigenEstado = 'SELECT idvuelo, estado, aeronave_matricula_fk, modeloAeronave, OrigenTeorico_codIATA, OrigenReal_codIATA, DestinoTeorico_codIATA,DestinoReal_codIATA, nombrecompania, rutaTeorica, rutaReal, reglaDeVuelo, tipoDeVuelo, diaDespegue, fechaDespegueEstimado,HoraDespegueEstimado,fechaDespegueReal, horaDespegueReal,fechaAterrizajeEstimado,HoraAterrizajeEstimado,fechaAterrizajeReal ,horaAterrizajeReal, ltscombustibleEstimado, ltscombustibleReal, lubricanteEstimado,lubricanteReal, kilometrajeEstimado,kilometrajeReal, duracionEstimada,duracionReal,checkIn,controlCabina, totalPersonasABordo,pesoCargaOrigen,PesoCargaDestino,motivoEstado FROM planDeVuelo P left join estados E on E.idestados=P.idEstados_fk left join aeronave A on A.matricula=P.aeronave_matricula_fk WHERE $1 = fechaDespegueEstimado and idEstados_fk = $2;';
const queryReadFDestinoEstado = 'SELECT idvuelo, estado, aeronave_matricula_fk, modeloAeronave, OrigenTeorico_codIATA, OrigenReal_codIATA, DestinoTeorico_codIATA,DestinoReal_codIATA, nombrecompania, rutaTeorica, rutaReal, reglaDeVuelo, tipoDeVuelo, diaDespegue, fechaDespegueEstimado,HoraDespegueEstimado,fechaDespegueReal, horaDespegueReal,fechaAterrizajeEstimado,HoraAterrizajeEstimado,fechaAterrizajeReal ,horaAterrizajeReal, ltscombustibleEstimado, ltscombustibleReal, lubricanteEstimado,lubricanteReal, kilometrajeEstimado,kilometrajeReal, duracionEstimada,duracionReal,checkIn,controlCabina, totalPersonasABordo,pesoCargaOrigen,PesoCargaDestino,motivoEstado FROM planDeVuelo P left join estados E on E.idestados=P.idEstados_fk left join aeronave A on A.matricula=P.aeronave_matricula_fk WHERE $1 = fechaAterrizajeEstimado and idEstados_fk = $2;';
const queryReadForRangoEA = 'SELECT idvuelo, estado, aeronave_matricula_fk, modeloAeronave, OrigenTeorico_codIATA, OrigenReal_codIATA, DestinoTeorico_codIATA,DestinoReal_codIATA, nombrecompania, rutaTeorica, rutaReal, reglaDeVuelo, tipoDeVuelo, diaDespegue, fechaDespegueEstimado,HoraDespegueEstimado,fechaDespegueReal, horaDespegueReal,fechaAterrizajeEstimado,HoraAterrizajeEstimado,fechaAterrizajeReal ,horaAterrizajeReal, ltscombustibleEstimado, ltscombustibleReal, lubricanteEstimado,lubricanteReal, kilometrajeEstimado,kilometrajeReal, duracionEstimada,duracionReal,checkIn,controlCabina, totalPersonasABordo,pesoCargaOrigen,PesoCargaDestino,motivoEstado FROM planDeVuelo P left join estados E on E.idestados=P.idEstados_fk left join aeronave A on A.matricula=P.aeronave_matricula_fk WHERE ($1 <= idEstados_fk and $2 >= idEstados_fk) and (origenteorico_codiata=$3 and destinoteorico_codiata=$4);';
const queryReadForRangoEF = 'SELECT idvuelo, estado, aeronave_matricula_fk, modeloAeronave, OrigenTeorico_codIATA, OrigenReal_codIATA, DestinoTeorico_codIATA,DestinoReal_codIATA, nombrecompania, rutaTeorica, rutaReal, reglaDeVuelo, tipoDeVuelo, diaDespegue, fechaDespegueEstimado,HoraDespegueEstimado,fechaDespegueReal, horaDespegueReal,fechaAterrizajeEstimado,HoraAterrizajeEstimado,fechaAterrizajeReal ,horaAterrizajeReal, ltscombustibleEstimado, ltscombustibleReal, lubricanteEstimado,lubricanteReal, kilometrajeEstimado,kilometrajeReal, duracionEstimada,duracionReal,checkIn,controlCabina, totalPersonasABordo,pesoCargaOrigen,PesoCargaDestino,motivoEstado FROM planDeVuelo P left join estados E on E.idestados=P.idEstados_fk left join aeronave A on A.matricula=P.aeronave_matricula_fk WHERE ($1 <= idEstados_fk and $2 >= idEstados_fk) and ($3 <= fechaDespegueEstimado   and $4 >= fechaAterrizajeEstimado);';
const queryReadForRangoAF = 'SELECT idvuelo, estado, aeronave_matricula_fk, modeloAeronave, OrigenTeorico_codIATA, OrigenReal_codIATA, DestinoTeorico_codIATA,DestinoReal_codIATA, nombrecompania, rutaTeorica, rutaReal, reglaDeVuelo, tipoDeVuelo, diaDespegue, fechaDespegueEstimado,HoraDespegueEstimado,fechaDespegueReal, horaDespegueReal,fechaAterrizajeEstimado,HoraAterrizajeEstimado,fechaAterrizajeReal ,horaAterrizajeReal, ltscombustibleEstimado, ltscombustibleReal, lubricanteEstimado,lubricanteReal, kilometrajeEstimado,kilometrajeReal, duracionEstimada,duracionReal,checkIn,controlCabina, totalPersonasABordo,pesoCargaOrigen,PesoCargaDestino,motivoEstado FROM planDeVuelo P left join estados E on E.idestados=P.idEstados_fk left join aeronave A on A.matricula=P.aeronave_matricula_fk WHERE (origenteorico_codiata=$1 and destinoteorico_codiata=$2) and ($3 <= fechaDespegueEstimado and $4 >= fechaAterrizajeEstimado);';
const queryReadAOrigenFSE = 'SELECT idvuelo, estado, aeronave_matricula_fk, modeloAeronave, OrigenTeorico_codIATA, OrigenReal_codIATA, DestinoTeorico_codIATA,DestinoReal_codIATA, nombrecompania, rutaTeorica, rutaReal, reglaDeVuelo, tipoDeVuelo, diaDespegue, fechaDespegueEstimado,HoraDespegueEstimado,fechaDespegueReal, horaDespegueReal,fechaAterrizajeEstimado,HoraAterrizajeEstimado,fechaAterrizajeReal ,horaAterrizajeReal, ltscombustibleEstimado, ltscombustibleReal, lubricanteEstimado,lubricanteReal, kilometrajeEstimado,kilometrajeReal, duracionEstimada,duracionReal,checkIn,controlCabina, totalPersonasABordo,pesoCargaOrigen,PesoCargaDestino,motivoEstado FROM planDeVuelo P left join estados E on E.idestados=P.idEstados_fk left join aeronave A on A.matricula=P.aeronave_matricula_fk WHERE origenteorico_codiata=$1 and $2 = fechaDespegueEstimado and idEstados_fk =$3;';
const queryReadAOrigenFLE = 'SELECT idvuelo, estado, aeronave_matricula_fk, modeloAeronave, OrigenTeorico_codIATA, OrigenReal_codIATA, DestinoTeorico_codIATA,DestinoReal_codIATA, nombrecompania, rutaTeorica, rutaReal, reglaDeVuelo, tipoDeVuelo, diaDespegue, fechaDespegueEstimado,HoraDespegueEstimado,fechaDespegueReal, horaDespegueReal,fechaAterrizajeEstimado,HoraAterrizajeEstimado,fechaAterrizajeReal ,horaAterrizajeReal, ltscombustibleEstimado, ltscombustibleReal, lubricanteEstimado,lubricanteReal, kilometrajeEstimado,kilometrajeReal, duracionEstimada,duracionReal,checkIn,controlCabina, totalPersonasABordo,pesoCargaOrigen,PesoCargaDestino,motivoEstado FROM planDeVuelo P left join estados E on E.idestados=P.idEstados_fk left join aeronave A on A.matricula=P.aeronave_matricula_fk WHERE origenteorico_codiata=$1 and $2 = fechaAterrizajeEstimado and idEstados_fk =$3;';
const queryReadADestinoFSE = 'SELECT idvuelo, estado, aeronave_matricula_fk, modeloAeronave, OrigenTeorico_codIATA, OrigenReal_codIATA, DestinoTeorico_codIATA,DestinoReal_codIATA, nombrecompania, rutaTeorica, rutaReal, reglaDeVuelo, tipoDeVuelo, diaDespegue, fechaDespegueEstimado,HoraDespegueEstimado,fechaDespegueReal, horaDespegueReal,fechaAterrizajeEstimado,HoraAterrizajeEstimado,fechaAterrizajeReal ,horaAterrizajeReal, ltscombustibleEstimado, ltscombustibleReal, lubricanteEstimado,lubricanteReal, kilometrajeEstimado,kilometrajeReal, duracionEstimada,duracionReal,checkIn,controlCabina, totalPersonasABordo,pesoCargaOrigen,PesoCargaDestino,motivoEstado FROM planDeVuelo P left join estados E on E.idestados=P.idEstados_fk left join aeronave A on A.matricula=P.aeronave_matricula_fk WHERE destinoteorico_codiata=$1 and $2 = fechaDespegueEstimado and idEstados_fk =$3;';
const queryReadADestinoFLE = 'SELECT idvuelo, estado, aeronave_matricula_fk, modeloAeronave, OrigenTeorico_codIATA, OrigenReal_codIATA, DestinoTeorico_codIATA,DestinoReal_codIATA, nombrecompania, rutaTeorica, rutaReal, reglaDeVuelo, tipoDeVuelo, diaDespegue, fechaDespegueEstimado,HoraDespegueEstimado,fechaDespegueReal, horaDespegueReal,fechaAterrizajeEstimado,HoraAterrizajeEstimado,fechaAterrizajeReal ,horaAterrizajeReal, ltscombustibleEstimado, ltscombustibleReal, lubricanteEstimado,lubricanteReal, kilometrajeEstimado,kilometrajeReal, duracionEstimada,duracionReal,checkIn,controlCabina, totalPersonasABordo,pesoCargaOrigen,PesoCargaDestino,motivoEstado FROM planDeVuelo P left join estados E on E.idestados=P.idEstados_fk left join aeronave A on A.matricula=P.aeronave_matricula_fk WHERE destinoteorico_codiata=$1 and $2 = fechaAterrizajeEstimado and idEstados_fk=$3;';
const queryReadForRangoAFE = 'SELECT idvuelo, estado, aeronave_matricula_fk, modeloAeronave, OrigenTeorico_codIATA, OrigenReal_codIATA, DestinoTeorico_codIATA,DestinoReal_codIATA, nombrecompania, rutaTeorica, rutaReal, reglaDeVuelo, tipoDeVuelo, diaDespegue, fechaDespegueEstimado,HoraDespegueEstimado,fechaDespegueReal, horaDespegueReal,fechaAterrizajeEstimado,HoraAterrizajeEstimado,fechaAterrizajeReal ,horaAterrizajeReal, ltscombustibleEstimado, ltscombustibleReal, lubricanteEstimado,lubricanteReal, kilometrajeEstimado,kilometrajeReal, duracionEstimada,duracionReal,checkIn,controlCabina, totalPersonasABordo,pesoCargaOrigen,PesoCargaDestino,motivoEstado FROM planDeVuelo P left join estados E on E.idestados=P.idEstados_fk left join aeronave A on A.matricula=P.aeronave_matricula_fk WHERE (origenteorico_codiata=$1 and destinoteorico_codiata=$2) and ($3 <= fechaDespegueEstimado and $4 >= fechaAterrizajeEstimado) and idEstados_fk=$5;';
const queryReadForRangoAE = 'SELECT idvuelo, estado, aeronave_matricula_fk, modeloAeronave, OrigenTeorico_codIATA, OrigenReal_codIATA, DestinoTeorico_codIATA,DestinoReal_codIATA, nombrecompania, rutaTeorica, rutaReal, reglaDeVuelo, tipoDeVuelo, diaDespegue, fechaDespegueEstimado,HoraDespegueEstimado,fechaDespegueReal, horaDespegueReal,fechaAterrizajeEstimado,HoraAterrizajeEstimado,fechaAterrizajeReal ,horaAterrizajeReal, ltscombustibleEstimado, ltscombustibleReal, lubricanteEstimado,lubricanteReal, kilometrajeEstimado,kilometrajeReal, duracionEstimada,duracionReal,checkIn,controlCabina, totalPersonasABordo,pesoCargaOrigen,PesoCargaDestino,motivoEstado FROM planDeVuelo P left join estados E on E.idestados=P.idEstados_fk left join aeronave A on A.matricula=P.aeronave_matricula_fk WHERE (origenteorico_codiata=$1 and destinoteorico_codiata=$2) and idEstados_fk=$3;';
const queryReadForRangoAFL = 'SELECT idvuelo, estado, aeronave_matricula_fk, modeloAeronave, OrigenTeorico_codIATA, OrigenReal_codIATA, DestinoTeorico_codIATA,DestinoReal_codIATA, nombrecompania, rutaTeorica, rutaReal, reglaDeVuelo, tipoDeVuelo, diaDespegue, fechaDespegueEstimado,HoraDespegueEstimado,fechaDespegueReal, horaDespegueReal,fechaAterrizajeEstimado,HoraAterrizajeEstimado,fechaAterrizajeReal ,horaAterrizajeReal, ltscombustibleEstimado, ltscombustibleReal, lubricanteEstimado,lubricanteReal, kilometrajeEstimado,kilometrajeReal, duracionEstimada,duracionReal,checkIn,controlCabina, totalPersonasABordo,pesoCargaOrigen,PesoCargaDestino,motivoEstado FROM planDeVuelo P left join estados E on E.idestados=P.idEstados_fk left join aeronave A on A.matricula=P.aeronave_matricula_fk WHERE (origenteorico_codiata=$1 and destinoteorico_codiata=$2) and $3= fechaAterrizajeEstimado;';
const queryReadForRangoAFS = 'SELECT idvuelo, estado, aeronave_matricula_fk, modeloAeronave, OrigenTeorico_codIATA, OrigenReal_codIATA, DestinoTeorico_codIATA,DestinoReal_codIATA, nombrecompania, rutaTeorica, rutaReal, reglaDeVuelo, tipoDeVuelo, diaDespegue, fechaDespegueEstimado,HoraDespegueEstimado,fechaDespegueReal, horaDespegueReal,fechaAterrizajeEstimado,HoraAterrizajeEstimado,fechaAterrizajeReal ,horaAterrizajeReal, ltscombustibleEstimado, ltscombustibleReal, lubricanteEstimado,lubricanteReal, kilometrajeEstimado,kilometrajeReal, duracionEstimada,duracionReal,checkIn,controlCabina, totalPersonasABordo,pesoCargaOrigen,PesoCargaDestino,motivoEstado FROM planDeVuelo P left join estados E on E.idestados=P.idEstados_fk left join aeronave A on A.matricula=P.aeronave_matricula_fk WHERE (origenteorico_codiata=$1 and destinoteorico_codiata=$2) and $3= fechaDespegueEstimado;';
const queryReadForRangoEAO = 'SELECT idvuelo, estado, aeronave_matricula_fk, modeloAeronave, OrigenTeorico_codIATA, OrigenReal_codIATA, DestinoTeorico_codIATA,DestinoReal_codIATA, nombrecompania, rutaTeorica, rutaReal, reglaDeVuelo, tipoDeVuelo, diaDespegue, fechaDespegueEstimado,HoraDespegueEstimado,fechaDespegueReal, horaDespegueReal,fechaAterrizajeEstimado,HoraAterrizajeEstimado,fechaAterrizajeReal ,horaAterrizajeReal, ltscombustibleEstimado, ltscombustibleReal, lubricanteEstimado,lubricanteReal, kilometrajeEstimado,kilometrajeReal, duracionEstimada,duracionReal,checkIn,controlCabina, totalPersonasABordo,pesoCargaOrigen,PesoCargaDestino,motivoEstado FROM planDeVuelo P left join estados E on E.idestados=P.idEstados_fk left join aeronave A on A.matricula=P.aeronave_matricula_fk WHERE ($1 <= idEstados_fk and $2 >= idEstados_fk) and $3= origenteorico_codiata;';
const queryReadForRangoEAD = 'SELECT idvuelo, estado, aeronave_matricula_fk, modeloAeronave, OrigenTeorico_codIATA, OrigenReal_codIATA, DestinoTeorico_codIATA,DestinoReal_codIATA, nombrecompania, rutaTeorica, rutaReal, reglaDeVuelo, tipoDeVuelo, diaDespegue, fechaDespegueEstimado,HoraDespegueEstimado,fechaDespegueReal, horaDespegueReal,fechaAterrizajeEstimado,HoraAterrizajeEstimado,fechaAterrizajeReal ,horaAterrizajeReal, ltscombustibleEstimado, ltscombustibleReal, lubricanteEstimado,lubricanteReal, kilometrajeEstimado,kilometrajeReal, duracionEstimada,duracionReal,checkIn,controlCabina, totalPersonasABordo,pesoCargaOrigen,PesoCargaDestino,motivoEstado FROM planDeVuelo P left join estados E on E.idestados=P.idEstados_fk left join aeronave A on A.matricula=P.aeronave_matricula_fk WHERE ($1 <= idEstados_fk and $2 >= idEstados_fk) and $3= destinoteorico_codiata;';
const queryReadForRangoEFS = 'SELECT idvuelo, estado, aeronave_matricula_fk, modeloAeronave, OrigenTeorico_codIATA, OrigenReal_codIATA, DestinoTeorico_codIATA,DestinoReal_codIATA, nombrecompania, rutaTeorica, rutaReal, reglaDeVuelo, tipoDeVuelo, diaDespegue, fechaDespegueEstimado,HoraDespegueEstimado,fechaDespegueReal, horaDespegueReal,fechaAterrizajeEstimado,HoraAterrizajeEstimado,fechaAterrizajeReal ,horaAterrizajeReal, ltscombustibleEstimado, ltscombustibleReal, lubricanteEstimado,lubricanteReal, kilometrajeEstimado,kilometrajeReal, duracionEstimada,duracionReal,checkIn,controlCabina, totalPersonasABordo,pesoCargaOrigen,PesoCargaDestino,motivoEstado FROM planDeVuelo P left join estados E on E.idestados=P.idEstados_fk left join aeronave A on A.matricula=P.aeronave_matricula_fk WHERE ($1 <= idEstados_fk and $2 >= idEstados_fk) and $3 = fechaDespegueEstimado;';
const queryReadForRangoEFL = 'SELECT idvuelo, estado, aeronave_matricula_fk, modeloAeronave, OrigenTeorico_codIATA, OrigenReal_codIATA, DestinoTeorico_codIATA,DestinoReal_codIATA, nombrecompania, rutaTeorica, rutaReal, reglaDeVuelo, tipoDeVuelo, diaDespegue, fechaDespegueEstimado,HoraDespegueEstimado,fechaDespegueReal, horaDespegueReal,fechaAterrizajeEstimado,HoraAterrizajeEstimado,fechaAterrizajeReal ,horaAterrizajeReal, ltscombustibleEstimado, ltscombustibleReal, lubricanteEstimado,lubricanteReal, kilometrajeEstimado,kilometrajeReal, duracionEstimada,duracionReal,checkIn,controlCabina, totalPersonasABordo,pesoCargaOrigen,PesoCargaDestino,motivoEstado FROM planDeVuelo P left join estados E on E.idestados=P.idEstados_fk left join aeronave A on A.matricula=P.aeronave_matricula_fk WHERE ($1 <= idEstados_fk and $2 >= idEstados_fk) and $3 = fechaAterrizajeEstimado;';
const queryReadForRangoFAO = 'SELECT idvuelo, estado, aeronave_matricula_fk, modeloAeronave, OrigenTeorico_codIATA, OrigenReal_codIATA, DestinoTeorico_codIATA,DestinoReal_codIATA, nombrecompania, rutaTeorica, rutaReal, reglaDeVuelo, tipoDeVuelo, diaDespegue, fechaDespegueEstimado,HoraDespegueEstimado,fechaDespegueReal, horaDespegueReal,fechaAterrizajeEstimado,HoraAterrizajeEstimado,fechaAterrizajeReal ,horaAterrizajeReal, ltscombustibleEstimado, ltscombustibleReal, lubricanteEstimado,lubricanteReal, kilometrajeEstimado,kilometrajeReal, duracionEstimada,duracionReal,checkIn,controlCabina, totalPersonasABordo,pesoCargaOrigen,PesoCargaDestino,motivoEstado FROM planDeVuelo P left join estados E on E.idestados=P.idEstados_fk left join aeronave A on A.matricula=P.aeronave_matricula_fk WHERE ($1 <= fechaDespegueEstimado and $2 >= fechaAterrizajeEstimado) and origenteorico_codiata=$3 ;';
const queryReadForRangoFAD = 'SELECT idvuelo, estado, aeronave_matricula_fk, modeloAeronave, OrigenTeorico_codIATA, OrigenReal_codIATA, DestinoTeorico_codIATA,DestinoReal_codIATA, nombrecompania, rutaTeorica, rutaReal, reglaDeVuelo, tipoDeVuelo, diaDespegue, fechaDespegueEstimado,HoraDespegueEstimado,fechaDespegueReal, horaDespegueReal,fechaAterrizajeEstimado,HoraAterrizajeEstimado,fechaAterrizajeReal ,horaAterrizajeReal, ltscombustibleEstimado, ltscombustibleReal, lubricanteEstimado,lubricanteReal, kilometrajeEstimado,kilometrajeReal, duracionEstimada,duracionReal,checkIn,controlCabina, totalPersonasABordo,pesoCargaOrigen,PesoCargaDestino,motivoEstado FROM planDeVuelo P left join estados E on E.idestados=P.idEstados_fk left join aeronave A on A.matricula=P.aeronave_matricula_fk WHERE ($1 <= fechaDespegueEstimado and $2 >= fechaAterrizajeEstimado) and destinoteorico_codiata=$3;';
const queryReadForRangoFE = 'SELECT idvuelo, estado, aeronave_matricula_fk, modeloAeronave, OrigenTeorico_codIATA, OrigenReal_codIATA, DestinoTeorico_codIATA,DestinoReal_codIATA, nombrecompania, rutaTeorica, rutaReal, reglaDeVuelo, tipoDeVuelo, diaDespegue, fechaDespegueEstimado,HoraDespegueEstimado,fechaDespegueReal, horaDespegueReal,fechaAterrizajeEstimado,HoraAterrizajeEstimado,fechaAterrizajeReal ,horaAterrizajeReal, ltscombustibleEstimado, ltscombustibleReal, lubricanteEstimado,lubricanteReal, kilometrajeEstimado,kilometrajeReal, duracionEstimada,duracionReal,checkIn,controlCabina, totalPersonasABordo,pesoCargaOrigen,PesoCargaDestino,motivoEstado FROM planDeVuelo P left join estados E on E.idestados=P.idEstados_fk left join aeronave A on A.matricula=P.aeronave_matricula_fk WHERE ($1 <= fechaDespegueEstimado and $2 >= fechaAterrizajeEstimado) and idEstados_fk=$3;';



//------------------------------------------------------------------------------------------------
// metodos actualizar ----------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------
const readVuelosPorTripulante = async (ConexionEstablecida, req, res) => {
  try {
    const { idpersonal_fk } = req.body
    var result = await ConexionEstablecida.query(queryPlanVueloPorTripulante, [idpersonal_fk])
    res.status(200).send(result.rows)
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}
const updateConfirmado = async (ConexionEstablecida, request, body) => {
  try {
    const { idvuelo } = request.body
    var results = await ConexionEstablecida.query(queryUpdateConfirmado, [idvuelo])
  }
  catch (err) {
    console.log(err)
  }
}

const updateConfirmadoPorParametro = async (ConexionEstablecida, idvuelo) => {
  try {
    var results = await ConexionEstablecida.query(queryUpdateConfirmado, [idvuelo])

  }
  catch (err) {
    console.log(err)
  }
}

const updateDatosEmbarqueCheckin = async (ConexionEstablecida, body) => {
  try {
    var results = await ConexionEstablecida.query(queryIngresoDatosPreEmbarqueCheckin, [body.checkIn, body.totalPersonasABordo, body.pesoCargaOrigen, body.idvuelo])

  }
  catch (err) {
    console.log(err)
  }
}

const updateDatosEmbarqueControlCabina = async (ConexionEstablecida, body) => {
  try {
    var results = await ConexionEstablecida.query(queryIngresoControlCabina, [body.controlCabina, body.idvuelo])

  }
  catch (err) {
    console.log(err)
  }
}

const updateEstadoPreEmbarque = async (ConexionEstablecida, request, response) => {
  try {
    const { idvuelo } = request.body
    var results = await ConexionEstablecida.query(queryUpdatePreEmbarque, [idvuelo])
    response.status(200).send(`update exitoso`)
  }
  catch (err) {
    console.log(err)
  }
}

const updateDespegue = async (ConexionEstablecida, request, response) => {
  try {
    const { idvuelo } = request.body
    var results = await ConexionEstablecida.query(queryUpdateDespegue, [idvuelo])
    response.status(200).send(`User modified with ID: ${idvuelo}`)
  }
  catch (err) {
    console.log(err)
  }
}

const updateEnVuelo = async (ConexionEstablecida, request, response) => {
  try {
    const { idvuelo } = request.body
    var results = await ConexionEstablecida.query(queryUpdateEnVuelo, [idvuelo])
    response.status(200).send(`User modified with ID: ${idvuelo}`)
  }
  catch (err) {
    console.log(err)
  }
}

const updateAterrizado = async (ConexionEstablecida, request, response) => {
  try {
    const { idvuelo } = request.body
    var results = await ConexionEstablecida.query(queryUpdateAterrizado, [idvuelo])
    response.status(200).send(`User modified with ID: ${idvuelo}`)
  }
  catch (err) {
    console.log(err)
  }
}

const updateFinalizado = async (ConexionEstablecida, request, response) => {
  try {
    const { idvuelo, OrigenReal_codIATA, DestinoReal_codIATA, fechaDespegueReal, horaDespegueReal, fechaAterrizajeReal, horaAterrizajeReal, rutaReal, ltscombustibleReal, lubricanteReal, kilometrajeReal, duracionReal, pesoCargaDestino } = request.body
    var results = await ConexionEstablecida.query(queryUpdatefinalizado,
      [idvuelo, OrigenReal_codIATA, DestinoReal_codIATA, fechaDespegueReal, horaDespegueReal, fechaAterrizajeReal, horaAterrizajeReal, rutaReal, ltscombustibleReal, lubricanteReal, kilometrajeReal, duracionReal, pesoCargaDestino])
    response.status(200).send(`User modified with ID: ${idvuelo}`)
  }
  catch (err) {
    console.log(err)
  }
}

const updateDatosReProgramado = async (ConexionEstablecida, request, response) => {
  try {
    const { checkIn, controlCabina, totalPersonasABordo, cantinsumosAlDespeguar, pesoCargaOrigen, idvuelo } = request.body
    var results = await ConexionEstablecida.query(queryUpdatePreEmbarque,
      [checkIn, controlCabina, totalPersonasABordo, cantinsumosAlDespeguar, pesoCargaOrigen, idvuelo])
    response.status(200).send(`User modified with ID: ${idvuelo}`)
  }
  catch (err) {
    console.log(err)
  }
}

const updateEstadoReProgramado = async (ConexionEstablecida, request, response) => {
  try {
    const { idvuelo } = request.body
    var results = await ConexionEstablecida.query(queryUpdateReProgramado, [idvuelo])
    response.status(200).send(`User modified with ID: ${idvuelo}`)
  }
  catch (err) {
    console.log(err)
  }
}

const updateEstadoReProgramadoPorParametro = async (ConexionEstablecida, idvuelo) => {
  try {
    var results = await ConexionEstablecida.query(queryUpdateReProgramado, [idvuelo])
  }
  catch (err) {
    console.log(err)
  }
}

const updateDemorado = async (ConexionEstablecida, request, response) => {
  try {
    const { motivoEstado, idvuelo } = request.body
    var results = await ConexionEstablecida.query(queryUpdateDemorado, [motivoEstado, idvuelo])
    response.status(200).send(`User modified with ID: ${idvuelo}`)
  }
  catch (err) {
    console.log(err)
  }
}

const updateCancelado = async (ConexionEstablecida, request, response) => {
  try {
    const { motivoEstado, idvuelo } = request.body
    var results = await ConexionEstablecida.query(queryUpdateCancelado, [motivoEstado, idvuelo])
    response.status(200).send(`User modified with ID: ${idvuelo}`)
  }
  catch (err) {
    console.log(err)
  }
}

const updateMatricula = async (ConexionEstablecida, body, request, response) => {
  try {
    const { aeronave_matricula_fk, codvuelo } = body
    var results = await ConexionEstablecida.query(queryUpdateMatricula,
      [aeronave_matricula_fk, codvuelo])
    response.status(200).send(`User modified with ID: ${idvuelo}`)
  }
  catch (err) {
    console.log(err)
  }
}

const updateMatricula2 = async (ConexionEstablecida, request, response) => {
  try {
    const { aeronave_matricula_fk, idvuelo } = request.body
    var results = await ConexionEstablecida.query(queryUpdateInsertMatricula,
      [aeronave_matricula_fk, idvuelo])
    response.status(200).send(`User modified with ID: ${idvuelo}`)
  }
  catch (err) {
    console.log(err)
  }
}

//'UPDATE planDeVuelo SET origenteorico_codiata=$1,DestinoTeorico_codIATA=$2,  rutaTeorica=$3,ltscombustibleestimado=$4,lubricanteestimado=$5,kilometrajeestimado=$6,aeronavesposibles=$7 where idVuelo=$8';
const updateRutaTeoricaReprogramado = async (ConexionEstablecida, codiata_origen, codiata_destino, ruta, ltscombustibleestimado, lubricanteestimado, kilometrajeestimado, aeronavesposibles, idVuelo) => {
  try {
    var results = await ConexionEstablecida.query(queryupdateNuevaRutaTeorica, [codiata_origen, codiata_destino, (ruta + ""), ltscombustibleestimado, lubricanteestimado, kilometrajeestimado, aeronavesposibles, idVuelo])
  }
  catch (err) {
    console.log(err)
  }
}

const updateRutaTeorica = async (ConexionEstablecida, ruta, destino, idvuelo) => {
  try {
    var results = await ConexionEstablecida.query(queryUpdateRutaTeorica, [ruta, destino, idvuelo])
  }
  catch (err) {
    console.log(err)
  }
}

const updateRutaReal = async (ConexionEstablecida, ruta, origen, destino, idvuelo) => {
  try {
    var results = await ConexionEstablecida.query(queryUpdateRutaReal, [ruta, origen, destino, idvuelo])
  }
  catch (err) {
    console.log(err)
  }
}

const updateMatriculaVacia = async (ConexionEstablecida, vacia, idvuelo, aeronave_matricula_fk) => {
  try {
    var results = await ConexionEstablecida.query(queryUpdateMatriculaVacia, [vacia, idvuelo, aeronave_matricula_fk])
  }
  catch (err) {
    console.log(err)
  }
}

//-------------------------------------------------------------------------------------------------
// metodos read -----------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
const read = async (ConexionEstablecida, request, response) => {
  try {
    var result = await ConexionEstablecida.query(queryRead)
    response.status(200).json(result.rows)

  }
  catch (err) {
    console.log(err);
  }
}

const readCodVuelo = async (ConexionEstablecida, body) => {
  try {
    const { idvuelo } = body
    console.log(idvuelo);
    var result = await ConexionEstablecida.query(queryReadForCodvuelo, [idvuelo])
    //response.status(200).json(result.rows)
    console.log("soy yo", result.rows);
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}

const readCodVuelo2 = async (ConexionEstablecida, body, response) => {
  try {
    const { idvuelo } = body
    var result = await ConexionEstablecida.query(queryReadForCodvuelo, [idvuelo])
    response.status(200).json(result.rows)
    //return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}

const readVuelosConfirmados = async (ConexionEstablecida, request, response) => {
  try {
    var result = await ConexionEstablecida.query(queryReadVuelosConfirmados)
    response.status(200).json(result.rows)
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}

const readVuelosCancelados = async (ConexionEstablecida, request, response) => {
  try {
    var result = await ConexionEstablecida.query(queryReadVuelosCancelados)
    response.status(200).json(result.rows)
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}

const readVuelosFinalizados = async (ConexionEstablecida, request, response) => {
  try {
    var result = await ConexionEstablecida.query(queryReadVuelosFinalizados)
    response.status(200).json(result.rows)
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}

const readOrigenDestino = async (ConexionEstablecida, request, response) => {
  try {
    const { origen_codiata_fk, destino_codiata_fk } = request.body
    var result = await ConexionEstablecida.query(queryReadForOrigenDestino, [origen_codiata_fk, destino_codiata_fk])
    response.status(200).json(result.rows)
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}
const readAOrigen = async (ConexionEstablecida, request, response) => {
  try {
    const { origen_codiata_fk } = request.body
    var result = await ConexionEstablecida.query(queryReadAOrigen, [origen_codiata_fk])
    response.status(200).json(result.rows)
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}
const readADestino = async (ConexionEstablecida, request, response) => {
  try {
    const { destino_codiata_fk } = request.body
    var result = await ConexionEstablecida.query(queryReadADestino, [destino_codiata_fk])
    response.status(200).json(result.rows)
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}




const readFechaOrigen = async (ConexionEstablecida, request, response) => {
  try {
    const { fechadespegueestimado } = request.body
    var result = await ConexionEstablecida.query(queryReadFOrigen, [fechadespegueestimado])
    response.status(200).json(result.rows)
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}
const readFechaDestino = async (ConexionEstablecida, request, response) => {
  try {
    const { fechaaterrizajeestimado } = request.body
    var result = await ConexionEstablecida.query(queryReadRangoFecha, [fechaaterrizajeestimado])
    response.status(200).json(result.rows)
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}
const readFiltrosVuelo = async (ConexionEstablecida, request, response) => {
  try {
    const { origen_codiata_fk, destino_codiata_fk, fechadespegueestimado, fechaaterrizajeestimado, idestado1, idestado2 } = request.body

    console.log(origen_codiata_fk, destino_codiata_fk, fechadespegueestimado, fechaaterrizajeestimado, idestado1, idestado2);

    var result = await ConexionEstablecida.query(queryReadFiltros, [origen_codiata_fk, destino_codiata_fk, fechadespegueestimado, fechaaterrizajeestimado, idestado1, idestado2])
    console.log(result.rows);
    response.status(200).json(result.rows)
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}

const readEstadoRango = async (ConexionEstablecida, request, response) => {
  try {
    const { estado1, estado2 } = request.body

    var result = await ConexionEstablecida.query(queryReadForEstadoRango, [estado1, estado2])
    response.status(200).json(result.rows)
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}

const readFechaRango = async (ConexionEstablecida, request, response) => {
  try {
    const { fechadespegueestimado, fechaaterrizajeestimado } = request.body
    var result = await ConexionEstablecida.query(queryReadRangoFecha, [fechadespegueestimado, fechaaterrizajeestimado])
    response.status(200).json(result.rows)
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}


const readVuelosAvionesXRuta = async (ConexionEstablecida, request, response) => {
  try {
    var result = await ConexionEstablecida.query(queryInforutaXmodelo)
    response.status(200).json(result.rows)
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}

const readEstado = async (ConexionEstablecida, request, response) => {
  try {
    const { idestados_fk } = request.body

    var result = await ConexionEstablecida.query(queryReadEstado, [idestados_fk])
    response.status(200).json(result.rows)
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}

//mas filtros

const readAOE = async (ConexionEstablecida, request, response) => {
  try {
    const { origen_codiata_fk, idestados_fk } = request.body
    var result = await ConexionEstablecida.query(queryReadAOrigenEstado, [origen_codiata_fk, idestados_fk])
    response.status(200).json(result.rows)
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}

const readAOFL = async (ConexionEstablecida, request, response) => {
  try {
    const { origen_codiata_fk, fechaaterrizajeestimado } = request.body
    var result = await ConexionEstablecida.query(queryReadAOrigenFLlegada, [origen_codiata_fk, fechaaterrizajeestimado])
    response.status(200).json(result.rows)
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}


const readAOFS = async (ConexionEstablecida, request, response) => {
  try {
    const { origen_codiata_fk, fechadespegueestimado } = request.body
    var result = await ConexionEstablecida.query(queryReadAOrigenFSalida, [origen_codiata_fk, fechadespegueestimado])
    response.status(200).json(result.rows)
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}

const readADFS = async (ConexionEstablecida, request, response) => {
  try {
    const { destino_codiata_fk, fechadespegueestimado } = request.body
    var result = await ConexionEstablecida.query(queryReadADestinoFSalida, [destino_codiata_fk, fechadespegueestimado])
    response.status(200).json(result.rows)
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}

const readADFL = async (ConexionEstablecida, request, response) => {
  try {
    const { destino_codiata_fk, fechaaterrizajeestimado } = request.body
    var result = await ConexionEstablecida.query(queryReadADestinoFLlegada, [destino_codiata_fk, fechaaterrizajeestimado])
    response.status(200).json(result.rows)
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}

const readADE = async (ConexionEstablecida, request, response) => {
  try {
    const { destino_codiata_fk, idestados_fk } = request.body
    var result = await ConexionEstablecida.query(queryReadADestinoEstado, [destino_codiata_fk, idestados_fk])
    response.status(200).json(result.rows)
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}

const readFSE = async (ConexionEstablecida, request, response) => {
  try {
    const { fechadespegueestimado, idestados_fk } = request.body
    var result = await ConexionEstablecida.query(queryReadFOrigenEstado, [fechadespegueestimado, idestados_fk])
    response.status(200).json(result.rows)
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}


const readFLE = async (ConexionEstablecida, request, response) => {
  try {
    const { fechaaterrizajeestimado, idestados_fk } = request.body
    var result = await ConexionEstablecida.query(queryReadFDestinoEstado, [fechaaterrizajeestimado, idestados_fk])
    response.status(200).json(result.rows)
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}

const readRangoEA = async (ConexionEstablecida, request, response) => {
  try {
    const { estado1, estado2, origen_codiata_fk, destino_codiata_fk } = request.body

    var result = await ConexionEstablecida.query(queryReadForRangoEA, [estado1, estado2, origen_codiata_fk, destino_codiata_fk])
    response.status(200).json(result.rows)
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}


const readRangoEF = async (ConexionEstablecida, request, response) => {
  try {
    const { estado1, estado2, fechadespegueestimado, fechaaterrizajeestimado } = request.body

    var result = await ConexionEstablecida.query(queryReadForRangoEF, [estado1, estado2, fechadespegueestimado, fechaaterrizajeestimado])
    response.status(200).json(result.rows)
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}


const readRangoAF = async (ConexionEstablecida, request, response) => {
  try {
    const { origen_codiata_fk, destino_codiata_fk, fechadespegueestimado, fechaaterrizajeestimado } = request.body
    var result = await ConexionEstablecida.query(queryReadForRangoAF, [origen_codiata_fk, destino_codiata_fk, fechadespegueestimado, fechaaterrizajeestimado])
    response.status(200).json(result.rows)
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}

const readRangoAE = async (ConexionEstablecida, request, response) => {
  try {
    const { origen_codiata_fk, destino_codiata_fk, idestado } = request.body
    var result = await ConexionEstablecida.query(queryReadForRangoAE, [origen_codiata_fk, destino_codiata_fk, idestado])
    response.status(200).json(result.rows)
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}

const readRangoAFL = async (ConexionEstablecida, request, response) => {
  try {
    const { origen_codiata_fk, destino_codiata_fk, fechaaterrizajeestimado } = request.body
    var result = await ConexionEstablecida.query(queryReadForRangoAFL, [origen_codiata_fk, destino_codiata_fk, fechaaterrizajeestimado])
    response.status(200).json(result.rows)
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}

const readRangoAFS = async (ConexionEstablecida, request, response) => {
  try {
    const { origen_codiata_fk, destino_codiata_fk, fechadespegueestimado } = request.body
    var result = await ConexionEstablecida.query(queryReadForRangoAFS, [origen_codiata_fk, destino_codiata_fk, fechadespegueestimado])
    response.status(200).json(result.rows)
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}

const readRangoEAO = async (ConexionEstablecida, request, response) => {
  try {
    const { estado1, estado2, origenteorico_codiata } = request.body
    var result = await ConexionEstablecida.query(queryReadForRangoEAO, [estado1, estado2, origenteorico_codiata])
    response.status(200).json(result.rows)
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}

const readRangoEAD = async (ConexionEstablecida, request, response) => {
  try {
    const { estado1, estado2, destinoteorico_codiata } = request.body
    var result = await ConexionEstablecida.query(queryReadForRangoEAD, [estado1, estado2, destinoteorico_codiata])
    response.status(200).json(result.rows)
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}

const readRangoEFS = async (ConexionEstablecida, request, response) => {
  try {
    const { estado1, estado2, fechadespegueestimado } = request.body
    var result = await ConexionEstablecida.query(queryReadForRangoEFS, [estado1, estado2, fechadespegueestimado])
    response.status(200).json(result.rows)
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}

const readRangoEFL = async (ConexionEstablecida, request, response) => {
  try {
    const { estado1, estado2, fechaaterrizajeestimado } = request.body
    var result = await ConexionEstablecida.query(queryReadForRangoEFL, [estado1, estado2, fechaaterrizajeestimado])
    response.status(200).json(result.rows)
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}

const readVueloOrigenFSE = async (ConexionEstablecida, request, response) => {
  try {
    const { origen_codiata_fk, fechadespegueestimado, idestado } = request.body

    console.log(origen_codiata_fk, fechadespegueestimado, idestado);

    var result = await ConexionEstablecida.query(queryReadAOrigenFSE, [origen_codiata_fk, fechadespegueestimado, idestado])
    console.log(result.rows);
    response.status(200).json(result.rows)
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}

const readVueloOrigenFLE = async (ConexionEstablecida, request, response) => {
  try {
    const { origen_codiata_fk, fechaaterrizajeestimado, idestado } = request.body

    console.log(origen_codiata_fk, fechaaterrizajeestimado, idestado);

    var result = await ConexionEstablecida.query(queryReadAOrigenFLE, [origen_codiata_fk, fechaaterrizajeestimado, idestado])
    console.log(result.rows);
    response.status(200).json(result.rows)
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}

const readVueloDestinoFSE = async (ConexionEstablecida, request, response) => {
  try {
    const { destino_codiata_fk, fechadespegueestimado, idestado } = request.body

    console.log(destino_codiata_fk, fechadespegueestimado, idestado);

    var result = await ConexionEstablecida.query(queryReadADestinoFSE, [destino_codiata_fk, fechadespegueestimado, idestado])
    console.log(result.rows);
    response.status(200).json(result.rows)
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}


const readVueloDestinoFLE = async (ConexionEstablecida, request, response) => {
  try {
    const { destino_codiata_fk, fechaaterrizajeestimado, idestado } = request.body

    console.log(destino_codiata_fk, fechaaterrizajeestimado, idestado);

    var result = await ConexionEstablecida.query(queryReadADestinoFLE, [destino_codiata_fk, fechaaterrizajeestimado, idestado])
    console.log(result.rows);
    response.status(200).json(result.rows)
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}

const readRangoFAO = async (ConexionEstablecida, request, response) => {
  try {
    const { fechadespegueestimado, fechaaterrizajeestimado, origenteorico_codiata } = request.body
    var result = await ConexionEstablecida.query(queryReadForRangoFAO, [fechadespegueestimado, fechaaterrizajeestimado, origenteorico_codiata])
    response.status(200).json(result.rows)
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}
const readRangoFAD = async (ConexionEstablecida, request, response) => {
  try {
    const { fechadespegueestimado, fechaaterrizajeestimado, destinoteorico_codiata } = request.body
    var result = await ConexionEstablecida.query(queryReadForRangoFAD, [fechadespegueestimado, fechaaterrizajeestimado, destinoteorico_codiata])
    response.status(200).json(result.rows)
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}
const readRangoFE = async (ConexionEstablecida, request, response) => {
  try {
    const { fechadespegueestimado, fechaaterrizajeestimado, idestado } = request.body
    var result = await ConexionEstablecida.query(queryReadForRangoFE, [fechadespegueestimado, fechaaterrizajeestimado, idestado])
    response.status(200).json(result.rows)
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}


const readVueloCinco = async (ConexionEstablecida, request, response) => {
  try {
    const { origen_codiata_fk, destino_codiata_fk, fechadespegueestimado, fechaaterrizajeestimado, idestado } = request.body

    console.log(origen_codiata_fk, destino_codiata_fk, fechadespegueestimado, fechaaterrizajeestimado, idestado);

    var result = await ConexionEstablecida.query(queryReadForRangoAFE, [origen_codiata_fk, destino_codiata_fk, fechadespegueestimado, fechaaterrizajeestimado, idestado])
    console.log(result.rows);
    response.status(200).json(result.rows)
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}



const readAeronavePorPlanDeVuelo = async (ConexionEstablecida, request, response) => {
  try {
    const { idvuelo_fk } = request.body

    var result = await ConexionEstablecida.query(queryReadForAeronave, [idvuelo_fk])
    response.status(200).json(result.rows)
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}


const readIdVueloPorFechaMayotIgual = async (ConexionEstablecida, idpersonal, fechaaterrizajeestimado) => {
  try {
    var result = await ConexionEstablecida.query(queryIdVueloPorFechaMayorIgual, [idpersonal, fechaaterrizajeestimado])
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}

const readIdVueloPorFechaMayor = async (ConexionEstablecida, idpersonal, fechaaterrizajeestimado) => {
  try {
    var result = await ConexionEstablecida.query(queryIdVueloPorFechaMayor, [idpersonal, fechaaterrizajeestimado])
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}

const readVuelosPorFechaMayorIgual = async (ConexionEstablecida, fechaaterrizajeestimado) => {
  try {
    var result = await ConexionEstablecida.query(queryReadPorFechaMayorIgual, [fechaaterrizajeestimado])
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}

const readVuelosPorFechaMayor = async (ConexionEstablecida, fechaaterrizajeestimado) => {
  try {
    var result = await ConexionEstablecida.query(queryReadPorFechaMayor, [fechaaterrizajeestimado])
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}

const readTripulacionDisponible = async (ConexionEstablecida, idvuelo, idpersonal, fechaAterrizajeEstimada, fechaDespegueEstimada) => {
  try {
    var result = await ConexionEstablecida.query(queryTripulacionDisponible, [idvuelo, idpersonal, fechaDespegueEstimada, fechaAterrizajeEstimada])
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}

const readEstadoVuelo = async (ConexionEstablecida, idvuelo) => {
  try {
    var result = await ConexionEstablecida.query(queryReadIdEstado, [idvuelo])
    return result.rows;
  }
  catch (err) {
    console.log(err);
  }
}
//-------------------------------------------------------------------------------------------------
// metodos insert y delete ------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
const deletee = async (ConexionEstablecida, request, response) => {
  const id = parseInt(request.params.id)
  var result = await ConexionEstablecida.query(queryDelete, [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Plan de vuelo deleted with ID: ${id}`)
  })
}

const insert = async (ConexionEstablecida, request, response) => {
  const { aeronave_matricula_fk, origenteorico_codiata_fk, origenreal_codiata_fk, destinoteorico_codiata_fk, estinoreal_codiata_fk, idcompania_fk, idestados_fk, rutateorica, rutareal, regladevuelo, tipodevuelo, fechadespegueestimado, horadespegueestimado, fechadespeguereal, horadespeguereal, fechaaterrizajeestimado, horaaterrizajeestimado, fechaaterrizajereal, horaAterrizajeReal, ltscombustibleestimado, ltscombustiblereal, lubricanteestimado, lubricantereal, kilometrajeestimado, kilometrajereal, verificaciones, totalpersonasabordo, duracionestimada, duracionreal, insumosconsumidos, pesocargadestino, informado, estado, clima } = request.body

  var results = await ConexionEstablecida.query(queryInsert, [aeronave_matricula_fk, origenteorico_codiata_fk, origenreal_codiata_fk, destinoteorico_codiata_fk, estinoreal_codiata_fk, idcompania_fk, idestados_fk, rutateorica, rutareal, regladevuelo, tipodevuelo, fechadespegueestimado, horadespegueestimado, fechadespeguereal, horadespeguereal, fechaaterrizajeestimado, horaaterrizajeestimado, fechaaterrizajereal, horaAterrizajeReal, ltscombustibleestimado, ltscombustiblereal, lubricanteestimado, lubricantereal, kilometrajeestimado, kilometrajereal, verificaciones, totalpersonasabordo, duracionestimada, duracionreal, insumosconsumidos, pesocargadestino, informado, estado, clima], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Plan de vuelo added `)
  })

}

const insertInicial = async (ConexionEstablecida, datos) => {
  const { idVuelo, codVuelo, Aeronave_matricula_fk, OrigenTeorico_codIATA, OrigenReal_codIATA, DestinoTeorico_codIATA, DestinoReal_codIATA, nombreCompania, idEstados_fk, rutaTeorica, rutaReal, reglaDeVuelo, tipoDeVuelo, diaDespegue, fechaDespegueEstimado, HoraDespegueEstimado, fechaDespegueReal, horaDespegueReal, fechaAterrizajeEstimado, HoraAterrizajeEstimado, fechaAterrizajeReal, horaAterrizajeReal, ltscombustibleEstimado, ltscombustibleReal, lubricanteEstimado, lubricanteReal, kilometrajeEstimado, kilometrajeReal, duracionEstimada, duracionReal, checkIn, controlCabina, totalPersonasABordo, pesoCargaOrigen, pesoCargaDestino, informado, motivoEstado, aeronavesPosibles } = datos
  var results = await ConexionEstablecida.query(queryInsertInicial, [idVuelo, codVuelo, Aeronave_matricula_fk, OrigenTeorico_codIATA, OrigenReal_codIATA, DestinoTeorico_codIATA, DestinoReal_codIATA, nombreCompania, idEstados_fk, rutaTeorica, rutaReal, reglaDeVuelo, tipoDeVuelo, diaDespegue, fechaDespegueEstimado, HoraDespegueEstimado, fechaDespegueReal, horaDespegueReal, fechaAterrizajeEstimado, HoraAterrizajeEstimado, fechaAterrizajeReal, horaAterrizajeReal, ltscombustibleEstimado, ltscombustibleReal, lubricanteEstimado, lubricanteReal, kilometrajeEstimado, kilometrajeReal, duracionEstimada, duracionReal, checkIn, controlCabina, totalPersonasABordo, pesoCargaOrigen, pesoCargaDestino, informado, motivoEstado, aeronavesPosibles], (error, results) => {
    if (error) {
      throw error
    }
  })

}


//----------------------------------------------------------------------------------------------
module.exports = {
  updateMatricula2, readEstadoVuelo, updateRutaTeorica, updateRutaReal, updateMatriculaVacia, readIdVueloPorFechaMayotIgual, readIdVueloPorFechaMayor,
  read, readCodVuelo, readCodVuelo2, readVuelosConfirmados, readVuelosCancelados, readVuelosFinalizados, updateConfirmadoPorParametro,
  readOrigenDestino, readFiltrosVuelo, readVuelosAvionesXRuta, readEstado, readEstadoRango, updateDatosEmbarqueControlCabina, updateEstadoReProgramadoPorParametro,
  readFechaRango, readAeronavePorPlanDeVuelo, deletee, updateConfirmado, readVuelosPorFechaMayorIgual, readVuelosPorFechaMayorIgual, readVuelosPorFechaMayor,
  updateDespegue, updateEnVuelo, updateAterrizado, updateDatosEmbarqueCheckin, updateEstadoPreEmbarque, updateFinalizado, updateDatosReProgramado, updateEstadoReProgramado,
  updateDemorado, updateCancelado, insert, insertInicial, updateMatricula, readTripulacionDisponible,
  readFechaDestino, readFechaOrigen, readAOrigen, readADestino, updateRutaTeoricaReprogramado,
  readVueloCinco, readVueloDestinoFLE, readVueloDestinoFSE, readVueloOrigenFLE,
  readVueloOrigenFSE, readRangoAF, readRangoEA, readRangoEF, readFLE,
  readFSE, readADE, readADFL, readADFS, readAOFS, readAOFL, readAOE, readRangoAE, readRangoAFL, readRangoAFS, readRangoEAO, readRangoEAD,
  readRangoEFS, readRangoEFL, readRangoFAO, readRangoFAD, readRangoFE, readVuelosPorTripulante

}
