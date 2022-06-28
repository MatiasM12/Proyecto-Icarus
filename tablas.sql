drop database if exists api;
CREATE database api;
\c api

CREATE TABLE estados (
  idEstados serial PRIMARY KEY,
  Estado VARCHAR(20)
 );

CREATE TABLE compania(
  nombreCompania varchar(25) PRIMARY KEY,
  siglaCompania VARCHAR(2),  
  activo boolean
);


CREATE TABLE personal(
  idPersonal serial PRIMARY KEY,
  Aeropuerto_codIATA varchar(3), 
  nombre varchar(25),
  apellido varchar(25),
  codPais varchar(25),
  codArea varchar(25),
  nroContacto varchar(25),
  mail varchar(50),
  documentacionEnOrden boolean,
  posicion varchar(25),
  activo boolean  
);

CREATE TABLE documentacionTripulacion(
  idpersonal_fk int PRIMARY KEY,
  licenciaPiloto boolean,
  permisosIFR boolean,
  permisosVFR boolean,   
  HorasDeVuelo interval,
  FOREIGN KEY (idpersonal_fk) REFERENCES personal(idPersonal)
);


CREATE TABLE disponibilidad(
 idDisponibilidad serial PRIMARY KEY ,
 idpersonal_fk int,
 fechaDeInicio date,
 fechaDeFinalizacion date ,
 FOREIGN KEY (idpersonal_fk) REFERENCES personal(idPersonal)
);

CREATE TABLE parentesco(
  personal1_legajo_fk int,
  personal2_legajo_fk int,
  relacion varchar(25),
  activo boolean,
  fecha_de_actualizacion DATE,
  FOREIGN KEY (personal1_legajo_fk) REFERENCES personal(idPersonal),
  FOREIGN KEY (personal2_legajo_fk) REFERENCES personal(idPersonal),
  PRIMARY KEY (Personal1_legajo_fk, Personal2_legajo_fk)
);  

CREATE TABLE usuario(
  personal_legajo_fk int,
  userName varchar(25),
  pass varchar(25),
  activo boolean,
  fecha_alta DATE,
  FOREIGN KEY (personal_legajo_fk) REFERENCES personal(idPersonal),
  PRIMARY KEY (userName)
);


CREATE TABLE aeronave (
  matricula VARCHAR(30) PRIMARY KEY,
  Aeropuerto_codIATA varchar(3),
  modeloAeronave VARCHAR(30),
  capacidadReal int,
  kmRecorridos float,
  autorizado boolean,
  activo boolean,
  ultimoMantenimiento DATE
);

CREATE TABLE mantenimiento(
  idMantenimiento SERIAL PRIMARY KEY ,
  matriculaFK varchar(30),
  nombre_mantenimiento VARCHAR(50),
  descripcion_mantenimiento VARCHAR(200),
  fechaDeRealizacion date,
  FOREIGN KEY (matriculaFK) REFERENCES aeronave(matricula)
);

CREATE TABLE planDeVuelo (
  idVuelo varchar(50) PRIMARY KEY,
  codVuelo varchar(30), 
  Aeronave_matricula_fk VARCHAR(30),
  OrigenTeorico_codIATA VARCHAR(3), OrigenReal_codIATA VARCHAR(3), 
  DestinoTeorico_codIATA VARCHAR(3), DestinoReal_codIATA VARCHAR(3), 
  nombreCompania VARCHAR(50),  idEstados_fk int,  rutaTeorica VARCHAR(50),   
  rutaReal VARCHAR(50), reglaDeVuelo VARCHAR(10), tipoDeVuelo VARCHAR(20),
  diaDespegue VARCHAR(10), fechaDespegueEstimado date,
  HoraDespegueEstimado time, fechaDespegueReal date,
  horaDespegueReal time, fechaAterrizajeEstimado date,
  HoraAterrizajeEstimado time, fechaAterrizajeReal date,
  horaAterrizajeReal time,  ltscombustibleEstimado float,
  ltscombustibleReal float, lubricanteEstimado float,
  lubricanteReal float, kilometrajeEstimado integer,
  kilometrajeReal integer, duracionEstimada varchar(6),
  duracionReal varchar(6), checkIn boolean, 
  controlCabina boolean, totalPersonasABordo integer, pesoCargaOrigen float,  
  pesoCargaDestino float, informado boolean, motivoEstado VARCHAR(30),aeronavesPosibles VARCHAR [], -- varia dependiendo de si fue enviado o no al modulo de operaciones de cabina
  FOREIGN KEY (nombreCompania) REFERENCES Compania(nombreCompania),
  FOREIGN KEY (idEstados_fk) REFERENCES estados(idEstados) 
); 

CREATE TABLE emergencia(
  idEmergencia serial PRIMARY KEY,
  idVuelo_fk varchar(20),
  emergencia varchar(50),
  NivelPrioridad int,
  detalle varchar(100), 
  protocolo varchar (50),
  FOREIGN KEY (idVuelo_fk) REFERENCES planDeVuelo(idVuelo)
); 

CREATE TABLE insumo(
  idInsumo serial PRIMARY KEY,
  idVuelo_fk varchar(50),
  cantidadInicial int,
  cantidadFinal int,
  nombre varchar (50),
  descripcion varchar(50),
  pesoIndividual float, 
  FOREIGN KEY (idVuelo_fk) REFERENCES planDeVuelo(idVuelo)
);


CREATE TABLE tripulacion(
  idpersonal_fk int,
  idVuelo_fk varchar(100),
  FOREIGN KEY (idpersonal_fk) REFERENCES personal(idPersonal),
  FOREIGN KEY (idVuelo_fk) REFERENCES planDeVuelo(idVuelo),
  PRIMARY KEY (idpersonal_fk, idVuelo_fk)
);
CREATE TABLE clima(
  idVuelo_fk varchar(20),
  climaDestino VARCHAR(30),
  gradosTemperaturaDestino float,
  velocidadVientokM float,
  peligrosidad boolean,
  FOREIGN KEY (idVuelo_fk) REFERENCES planDeVuelo(idVuelo) 
  );

  CREATE TABLE solicitud(
    idsolicitud serial primary key,
    userName varchar(25),
    mail varchar(50),
    nueva_pass varchar(25),
    cod_verificado boolean,
    estado varchar(25),
    codigo int,
    fecha varchar(25),
    FOREIGN KEY (userName) REFERENCES usuario(userName)
);

CREATE TABLE historial(
  idVuelo_fk varchar(20),
  estado VARCHAR(30),
  usuario VARCHAR(30),
  fecha_y_hora VARCHAR(30),--date
  cambiotripulacion boolean,
  aeronave VARCHAR(30),
  FOREIGN KEY (idVuelo_fk) REFERENCES planDeVuelo(idVuelo) 
);

--------------------------------------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------Inserts-------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------------------------------------------------------------

 

INSERT INTO estados (Estado) Values ('programado');  
INSERT INTO estados (Estado) Values ('confirmado');  
INSERT INTO estados (Estado) Values ('pre-embarque');
INSERT INTO estados (Estado) Values ('despegado');   
INSERT INTO estados (Estado) Values ('en vuelo');    
INSERT INTO estados (Estado) Values ('aterrizado');  
INSERT INTO estados (Estado) Values ('finalizado'); 
INSERT INTO estados (Estado) Values ('demorado');    
INSERT INTO estados (Estado) Values ('Re-programado');
INSERT INTO estados (Estado) Values ('cancelado');   

--Compania
INSERT INTO compania (siglaCompania,nombreCompania, activo) VALUES ('SF','Special Flights SA',true);
INSERT INTO compania (siglaCompania,nombreCompania, activo) VALUES ('FB','Flybondi',true); 
INSERT INTO compania (siglaCompania,nombreCompania, activo) VALUES ('DP','Despegar',true);
INSERT INTO compania (siglaCompania,nombreCompania, activo) VALUES ('AA','Aerolineas Argentinas',true);
INSERT INTO compania (siglaCompania,nombreCompania, activo) VALUES ('JT','JetSmart',true);
INSERT INTO compania (siglaCompania,nombreCompania, activo) VALUES ('AF','AirFrance', true);
INSERT INTO compania (siglaCompania,nombreCompania, activo) VALUES ('SA','Sky Airline', true);
INSERT INTO compania (siglaCompania,nombreCompania, activo) VALUES ('QA','Qatar', true);



-- personal  3=aud  aux= mec=5 pil=3 co-p=3 sup=5 ing=2

INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('EZE','Ascension', 'Costas', '+1','xxxx','xx-xxxx-xxxx','foulleuceubujo-5938@yopmail.com', true, 'supervisor', true);
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('COR','Matias', 'Cabello', '+1','xxxx','xx-xxxx-xxxx','houssagritennou-9217@yopmail.com', true, 'supervisor', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('TUC','Gaizka', 'Carpio', '+1','xxxx','xx-xxxx-xxxx','lavauprugimu-8518@yopmail.com', true, 'supervisor', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('EZE','Baltasar', 'Perea', '+1','xxxx','xx-xxxx-xxxx','yayoixeuffaja-4689@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('EZE', 'Juan', 'Ibrahim', '+54','11', 'xxxx-xxxx','freucaussadeiju-8796@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('TUC','Elias', 'Carretero', '+54','11', 'xxxx-xxxx','buneunnanoiteu-3825@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('COR','Milagros', 'Villar', '+1','xxxx','xx-xxxx-xxxx','summotteufeigro-8875@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('COR','Maximiliano', 'Ayuso', '+1','xxxx','xx-xxxx-xxxx','zoittejevotteu-2550@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('COR','Soraya', 'Vaquero', '+52','xxxx' , 'xx-xxxx-xxxx','nugeffogrinu-3518@yopmail.com', true, 'piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('EZE', 'Andres', 'Moral', '+54','11', 'xxxx-xxxx','fapullupriza-2971@yopmail.com', true, 'piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('TUC', 'Elisa', 'Acedo', '+54','11', 'xxxx-xxxx','grusauboiyumme-1727@yopmail.com', true, 'piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('EZE','Adriel', 'Lopez', '+1','xxxx','xx-xxxx-xxxx','vutessojeki-3643@yopmail.com', true, 'co-piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('COR', 'Esteban', 'Nieto', '+54','11', 'xxxx-xxxx','suzeinotteppe-1738@yopmail.com', true, 'co-piloto', true);



INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('TUC','Luis', 'Sole', '+1','xxxx','xx-xxxx-xxxx','branacremmeme-2270@yopmail.com', true, 'co-piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('TUC','Graciela', 'Barrio', '+52','xxxx' , 'xx-xxxx-xxxx','frafawouprore-3805@yopmail.com', true, 'auditor', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('COR','Andres', 'Osorio', '+52','xxxx' , 'xx-xxxx-xxxx','jekeuleiheque-3909@yopmail.com', true, 'auditor', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo)
VALUES ('EZE','Isidro', 'Soto', '+52','xxxx' , 'xx-xxxx-xxxx','naucroinnacoimou-1195@yopmail.com', true, 'auditor', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('MDZ','Brenda', 'Cervera', '+1','xxxx','xx-xxxx-xxxx','nougrotrokini-4457@yopmail.com', true, 'supervisor', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('VDM','Marcelo', 'Juarez', '+1','xxxx','xx-xxxx-xxxx','voicisussotrei-5260@yopmail.com', true, 'supervisor', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('EZE','Emiliano', 'Saez', '+1','xxxx','xx-xxxx-xxxx','fesseziyeiba-3073@yopmail.com', true, 'ingeniero', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('COR','Julian', 'Sanchez', '+1','xxxx','xx-xxxx-xxxx','netreneprigo-5687@yopmail.com', true, 'ingeniero', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('EZE','jose', 'Lopez', '+1','xxxx','xx-xxxx-xxxx','gayullalleka-7067@yopmail.com', true, 'mecanico', true);
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('COR','Fabian', 'Mata', '+1','xxxx','xx-xxxx-xxxx','vonnivolemmau-4297@yopmail.com', true, 'mecanico', true); 

INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('TUC','Sílvia', 'San-Jose', '+1','xxxx','xx-xxxx-xxxx','brelleuffocacou-8525@yopmail.com', true, 'mecanico', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('MDZ','Melania', 'Luque', '+1','xxxx','xx-xxxx-xxxx','toukovafreisi-8259@yopmail.com', true, 'mecanico', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('EZE', 'Antia', 'Parra', '+54','11', 'xxxx-xxxx','quoinnannojounni-6838@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('EZE','Sarai', 'Jimeno', '+54','11', 'xxxx-xxxx','rulloufradiva-5537@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('COR','Rodrigo', 'Fernandez', '+54','11', 'xxxx-xxxx','proullaffacrewe-1892@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('COR','Marcos', 'Castañeda', '+1','xxxx','xx-xxxx-xxxx','yitracumejau-8841@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('EZE','Fermina', 'Zapata', '+52','xxxx' , 'xx-xxxx-xxxx','prebreuppufricu-4086@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('TUC','Thiago', 'Carballo', '+54','11', 'xxxx-xxxx','yajamojoci-6556@yopmail.com', true, 'auxiliar', false);  
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('TUC','Maria', 'Ureña', '+1','xxxx','xx-xxxx-xxxx','rauzecrexeima-6449@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('COR','Sabrina', 'Guirao', '+1','xxxx','xx-xxxx-xxxx','trigakullisa-7593@yopmail.com', true, 'auxiliar', true); 

INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('TUC','Camila', 'Frances', '+54','11', 'xxxx-xxxx','heyannufrige-9425@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('EZE','Camila', 'Fabra', '+54','11', 'xxxx-xxxx','camilita-1212@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('MDZ','Alfonso', 'Bermudes', '+54','11', 'xxxx-xxxx','elalfon-1211@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('COR','Jenifer', 'Rodriguez', '+54','11', 'xxxx-xxxx','lajenny-1021@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('TUC','Denise', 'Lopez', '+54','11', 'xxxx-xxxx','denumlopez-2211@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('RGA','Marcela', 'Sosa', '+54','11', 'xxxx-xxxx','marcelita-2301@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('MDZ','Quimey', 'Ezquierdoz', '+54','11', 'xxxx-xxxx','elcali-1221@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('EZE','Nahuel', 'Gomez', '+54','11', 'xxxx-xxxx','nahuelfacha-1223@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('TUC','Claudio', 'Sanchez', '+54','11', 'xxxx-xxxx','lalosanchezz-1200@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('COR','Micaela', 'Zalasar', '+54','11', 'xxxx-xxxx','lachinita-1001@yopmail.com', true, 'auxiliar', false); 

--Disponibilidad

INSERT INTO disponibilidad(idpersonal_fk, fechaDeInicio, fechaDeFinalizacion) VALUES (1,'2022/01/01','2022/01/15');
INSERT INTO disponibilidad(idpersonal_fk, fechaDeInicio, fechaDeFinalizacion) VALUES (2,'2022/01/02','2022/01/16');
INSERT INTO disponibilidad(idpersonal_fk, fechaDeInicio, fechaDeFinalizacion) VALUES (3,'2022/01/03','2022/01/17');
INSERT INTO disponibilidad(idpersonal_fk, fechaDeInicio, fechaDeFinalizacion) VALUES (4,'2022/01/04','2022/01/18');
INSERT INTO disponibilidad(idpersonal_fk, fechaDeInicio, fechaDeFinalizacion) VALUES (5,'2022/01/05','2022/01/19');
INSERT INTO disponibilidad(idpersonal_fk, fechaDeInicio, fechaDeFinalizacion) VALUES (6,'2022/01/06','2022/01/20');
INSERT INTO disponibilidad(idpersonal_fk, fechaDeInicio, fechaDeFinalizacion) VALUES (7,'2022/01/07','2022/01/21');
INSERT INTO disponibilidad(idpersonal_fk, fechaDeInicio, fechaDeFinalizacion) VALUES (8,'2022/01/08','2022/01/22');
INSERT INTO disponibilidad(idpersonal_fk, fechaDeInicio, fechaDeFinalizacion) VALUES (9,'2022/01/09','2022/01/23');
INSERT INTO disponibilidad(idpersonal_fk, fechaDeInicio, fechaDeFinalizacion) VALUES (10,'2022/01/10','2022/01/24');
INSERT INTO disponibilidad(idpersonal_fk, fechaDeInicio, fechaDeFinalizacion) VALUES (11,'2022/01/11','2022/01/25');
INSERT INTO disponibilidad(idpersonal_fk, fechaDeInicio, fechaDeFinalizacion) VALUES (12,'2022/01/12','2022/01/26');
INSERT INTO disponibilidad(idpersonal_fk, fechaDeInicio, fechaDeFinalizacion) VALUES (13,'2022/01/13','2022/01/27');
INSERT INTO disponibilidad(idpersonal_fk, fechaDeInicio, fechaDeFinalizacion) VALUES (14,'2022/01/14','2022/01/28');
INSERT INTO disponibilidad(idpersonal_fk, fechaDeInicio, fechaDeFinalizacion) VALUES (15,'2022/01/15','2022/01/29');
INSERT INTO disponibilidad(idpersonal_fk, fechaDeInicio, fechaDeFinalizacion) VALUES (16,'2022/01/16','2022/01/30');
INSERT INTO disponibilidad(idpersonal_fk, fechaDeInicio, fechaDeFinalizacion) VALUES (17,'2022/01/17','2022/01/31');
INSERT INTO disponibilidad(idpersonal_fk, fechaDeInicio, fechaDeFinalizacion) VALUES (18,'2022/01/18','2022/02/01');
INSERT INTO disponibilidad(idpersonal_fk, fechaDeInicio, fechaDeFinalizacion) VALUES (19,'2022/01/19','2022/02/02');
INSERT INTO disponibilidad(idpersonal_fk, fechaDeInicio, fechaDeFinalizacion) VALUES (20,'2022/01/20','2022/02/03');
INSERT INTO disponibilidad(idpersonal_fk, fechaDeInicio, fechaDeFinalizacion) VALUES (21,'2022/01/21','2022/02/04');
INSERT INTO disponibilidad(idpersonal_fk, fechaDeInicio, fechaDeFinalizacion) VALUES (22,'2022/01/22','2022/02/05');
INSERT INTO disponibilidad(idpersonal_fk, fechaDeInicio, fechaDeFinalizacion) VALUES (23,'2022/01/23','2022/02/06');
INSERT INTO disponibilidad(idpersonal_fk, fechaDeInicio, fechaDeFinalizacion) VALUES (24,'2022/01/24','2022/02/07');
INSERT INTO disponibilidad(idpersonal_fk, fechaDeInicio, fechaDeFinalizacion) VALUES (25,'2022/01/25','2022/02/08');
INSERT INTO disponibilidad(idpersonal_fk, fechaDeInicio, fechaDeFinalizacion) VALUES (26,'2022/01/26','2022/02/09');
INSERT INTO disponibilidad(idpersonal_fk, fechaDeInicio, fechaDeFinalizacion) VALUES (27,'2022/01/27','2022/02/10');
INSERT INTO disponibilidad(idpersonal_fk, fechaDeInicio, fechaDeFinalizacion) VALUES (28,'2022/01/28','2022/02/11');
INSERT INTO disponibilidad(idpersonal_fk, fechaDeInicio, fechaDeFinalizacion) VALUES (29,'2022/01/29','2022/02/12');
INSERT INTO disponibilidad(idpersonal_fk, fechaDeInicio, fechaDeFinalizacion) VALUES (30,'2022/01/30','2022/02/13');
INSERT INTO disponibilidad(idpersonal_fk, fechaDeInicio, fechaDeFinalizacion) VALUES (31,'2022/01/31','2022/02/14');
INSERT INTO disponibilidad(idpersonal_fk, fechaDeInicio, fechaDeFinalizacion) VALUES (32,'2022/02/01','2022/02/15');
INSERT INTO disponibilidad(idpersonal_fk, fechaDeInicio, fechaDeFinalizacion) VALUES (33,'2022/02/02','2022/02/16');
INSERT INTO disponibilidad(idpersonal_fk, fechaDeInicio, fechaDeFinalizacion) VALUES (34,'2022/02/03','2022/02/17');
INSERT INTO disponibilidad(idpersonal_fk, fechaDeInicio, fechaDeFinalizacion) VALUES (35,'2022/02/04','2022/02/18');
INSERT INTO disponibilidad(idpersonal_fk, fechaDeInicio, fechaDeFinalizacion) VALUES (36,'2022/02/05','2022/02/19');
INSERT INTO disponibilidad(idpersonal_fk, fechaDeInicio, fechaDeFinalizacion) VALUES (37,'2022/02/06','2022/02/20');
INSERT INTO disponibilidad(idpersonal_fk, fechaDeInicio, fechaDeFinalizacion) VALUES (38,'2022/02/07','2022/02/21');
INSERT INTO disponibilidad(idpersonal_fk, fechaDeInicio, fechaDeFinalizacion) VALUES (39,'2022/02/08','2022/02/22');
INSERT INTO disponibilidad(idpersonal_fk, fechaDeInicio, fechaDeFinalizacion) VALUES (40,'2022/02/09','2022/02/23');
INSERT INTO disponibilidad(idpersonal_fk, fechaDeInicio, fechaDeFinalizacion) VALUES (41,'2022/02/10','2022/02/24');
INSERT INTO disponibilidad(idpersonal_fk, fechaDeInicio, fechaDeFinalizacion) VALUES (42,'2022/02/11','2022/02/25');
INSERT INTO disponibilidad(idpersonal_fk, fechaDeInicio, fechaDeFinalizacion) VALUES (43,'2022/02/12','2022/02/26');

--Parentesco
INSERT INTO parentesco (Personal1_legajo_fk,Personal2_legajo_fk, relacion, activo, fecha_de_actualizacion) VALUES (7,8,'conyuge',true, '2020-05-02'); 
INSERT INTO parentesco (Personal1_legajo_fk,Personal2_legajo_fk, relacion, activo, fecha_de_actualizacion) VALUES (3,4,'padre',true,'2020-05-02'); 
INSERT INTO parentesco (Personal1_legajo_fk,Personal2_legajo_fk, relacion, activo, fecha_de_actualizacion) VALUES (18,20,'hermana',true,'2020-05-02'); 
INSERT INTO parentesco (Personal1_legajo_fk,Personal2_legajo_fk, relacion, activo, fecha_de_actualizacion) VALUES (7,14,'primos',true,'2020-05-02'); 
INSERT INTO parentesco (Personal1_legajo_fk,Personal2_legajo_fk, relacion, activo, fecha_de_actualizacion) VALUES (10,11,'hermano',true,'2020-05-02');

 
 

 
 --Plan dlo e vuelo 
-- Programado (fetch al modude terrestre)
/*

INSERT INTO planDeVuelo (
    idvuelo, codVuelo, Aeronave_matricula_fk,
     OrigenTeorico_codIATA, OrigenReal_codIATA, DestinoTeorico_codIATA,DestinoReal_codIATA, 
     nombreCompania, idEstados_fk,rutaTeorica, rutaReal, reglaDeVuelo, tipoDeVuelo, diaDespegue,
    fechaDespegueEstimado,HoraDespegueEstimado,fechaDespegueReal, horaDespegueReal,
    fechaAterrizajeEstimado,HoraAterrizajeEstimado,fechaAterrizajeReal ,horaAterrizajeReal,
    ltscombustibleEstimado, ltscombustibleReal, lubricanteEstimado,lubricanteReal, kilometrajeEstimado,kilometrajeReal, duracionEstimada,duracionReal,
    checkIn,controlCabina, totalPersonasABordo,pesoCargaOrigen,PesoCargaDestino,informado,motivoEstado, aeronavesPosibles ) 
VALUES (
'SF0101-202206090325','SF0101','LV-aba','EZE','COR','CNQ','CNQ',
'Special Flights SA',7, 'COR-COR-CNQ','EZE-COR-CNQ','VFR','comun',	'viernes',
'2022-06-09','03:25','2022-06-09',' 03:25','2022-06-09',' 03:25','2022-06-09','03:25',
170000,150000,6000,7000,11055,10000, '06:00','06:00',true,true,
178,220,140.0,true,null,ARRAY ['Airbus 330-200 8','Airbus A320-251N','Boeing 737-800 NG']);

INSERT INTO planDeVuelo (idvuelo, codVuelo, Aeronave_matricula_fk, OrigenTeorico_codIATA, OrigenReal_codIATA, DestinoTeorico_codIATA,
DestinoReal_codIATA, nombreCompania, idEstados_fk,rutaTeorica, rutaReal, reglaDeVuelo, tipoDeVuelo, diaDespegue,
fechaDespegueEstimado,HoraDespegueEstimado,fechaDespegueReal, horaDespegueReal,fechaAterrizajeEstimado,HoraAterrizajeEstimado,fechaAterrizajeReal ,horaAterrizajeReal,
ltscombustibleEstimado, ltscombustibleReal, lubricanteEstimado,lubricanteReal, kilometrajeEstimado,kilometrajeReal, duracionEstimada,duracionReal,checkIn,controlCabina, 
totalPersonasABordo,pesoCargaOrigen,PesoCargaDestino,informado,motivoEstado,aeronavesPosibles) 
VALUES (
'SF0102-202206090325','SF0102','LV-abb','EZE','COR','CNQ','TUC',
'Special Flights SA',7,'COR-COR-CNQ','EZE-COR-CNQ','VFR','comun','viernes',
'2022-06-09','03:25','2022-06-09','14:00','2022-06-09','10:00','2022-06-09','15:00',
170000,150000,6000,7000,11055,10000, '04:00','04:00',true,true,
178, 220,130.0,true,null, ARRAY ['Boeing 737-800 NG','Boeing 737 MAX 8','Embraer 190']);

--Cancelado: no tiene aeronave, no tiene clima, no tiene tripulacion
INSERT INTO planDeVuelo (idvuelo, codVuelo, Aeronave_matricula_fk, OrigenTeorico_codIATA, OrigenReal_codIATA, DestinoTeorico_codIATA,DestinoReal_codIATA, 
nombreCompania, idEstados_fk,rutaTeorica, rutaReal, reglaDeVuelo, tipoDeVuelo, diaDespegue,
fechaDespegueEstimado,HoraDespegueEstimado,fechaDespegueReal, horaDespegueReal,
fechaAterrizajeEstimado,HoraAterrizajeEstimado,fechaAterrizajeReal ,horaAterrizajeReal,
ltscombustibleEstimado, ltscombustibleReal, lubricanteEstimado,lubricanteReal, kilometrajeEstimado,kilometrajeReal, 
duracionEstimada,duracionReal,checkIn,controlCabina, totalPersonasABordo,pesoCargaOrigen,PesoCargaDestino,informado,motivoEstado,aeronavesPosibles )  
VALUES (
'SF0103-202206090325','SF0103',null,'COR',null,'CNQ',null,
'Special Flights SA',10,'COR-COR-CNQ',null,'VFR','comun','sabado',
'2022-06-09',' 9:00',null, null,'2022-06-09','10:00',null,null,
 170000,null,5000,null,7899,null,'01:00',null,false, false,
 null,null,null,true,'Aeronave',ARRAY ['Airbus 330-200 8','Airbus A320-251N','Boeing 737-800 NG']);

--Cancelado: no tiene aeronave, no tiene clima, no tiene tripulacion
INSERT INTO planDeVuelo (idvuelo, codVuelo, Aeronave_matricula_fk, OrigenTeorico_codIATA, OrigenReal_codIATA, DestinoTeorico_codIATA,
DestinoReal_codIATA, nombreCompania, idEstados_fk,rutaTeorica, rutaReal, reglaDeVuelo, tipoDeVuelo, diaDespegue,
fechaDespegueEstimado,HoraDespegueEstimado,fechaDespegueReal, horaDespegueReal,
fechaAterrizajeEstimado,HoraAterrizajeEstimado,fechaAterrizajeReal ,horaAterrizajeReal,
ltscombustibleEstimado, ltscombustibleReal, lubricanteEstimado,lubricanteReal, kilometrajeEstimado,kilometrajeReal, 
duracionEstimada,duracionReal,checkIn,controlCabina, totalPersonasABordo,pesoCargaOrigen,PesoCargaDestino,informado,motivoEstado,aeronavesPosibles ) 
VALUES (
'SF0104-202206090325','SF0104',null,'COR',null,'EZE',null,
'Special Flights SA',10,'COR-COR-EZE',null,'VFR','comun','sabado',
'2022-06-09',' 9:00',null, null,'2022-06-09','10:00',null,null,
 170000,null,5000,null,7899,null,'01:00',null,false, false,
 null,null,null,true,'Clima',ARRAY ['Airbus 330-200 8','Airbus A320-251N','Boeing 737-800 NG']);

--Tripulacion
INSERT INTO tripulacion (idpersonal_fk, idvuelo_fk) VALUES (9,'SF0101-202206090325');
INSERT INTO tripulacion (idpersonal_fk, idvuelo_fk) VALUES (14,'SF0101-202206090325');

INSERT INTO tripulacion (idpersonal_fk, idvuelo_fk) VALUES (42,'SF0101-202206090325');
INSERT INTO tripulacion (idpersonal_fk, idvuelo_fk) VALUES (38,'SF0101-202206090325');
INSERT INTO tripulacion (idpersonal_fk, idvuelo_fk) VALUES (34,'SF0101-202206090325');
INSERT INTO tripulacion (idpersonal_fk, idvuelo_fk) VALUES (32,'SF0101-202206090325');

INSERT INTO tripulacion (idpersonal_fk, idvuelo_fk) VALUES (11,'SF0102-202206090325');
INSERT INTO tripulacion (idpersonal_fk, idvuelo_fk) VALUES (13,'SF0102-202206090325');

INSERT INTO tripulacion (idpersonal_fk, idvuelo_fk) VALUES (43,'SF0102-202206090325');
INSERT INTO tripulacion (idpersonal_fk, idvuelo_fk) VALUES (37,'SF0102-202206090325');
INSERT INTO tripulacion (idpersonal_fk, idvuelo_fk) VALUES (33,'SF0102-202206090325');
INSERT INTO tripulacion (idpersonal_fk, idvuelo_fk) VALUES (29,'SF0102-202206090325');


INSERT INTO planDeVuelo (idvuelo, codVuelo, Aeronave_matricula_fk, OrigenTeorico_codIATA, OrigenReal_codIATA, DestinoTeorico_codIATA,
DestinoReal_codIATA, nombreCompania, idEstados_fk,rutaTeorica, rutaReal, reglaDeVuelo, tipoDeVuelo, diaDespegue,
fechaDespegueEstimado,HoraDespegueEstimado,fechaDespegueReal, horaDespegueReal,fechaAterrizajeEstimado,HoraAterrizajeEstimado,fechaAterrizajeReal ,horaAterrizajeReal,
ltscombustibleEstimado, ltscombustibleReal, lubricanteEstimado,lubricanteReal, kilometrajeEstimado,kilometrajeReal, duracionEstimada,duracionReal,checkIn,controlCabina, 
totalPersonasABordo,pesoCargaOrigen,PesoCargaDestino,informado,motivoEstado,aeronavesPosibles) 
VALUES (
'SF0112-202206090325','SF0112','LV-abb','EZE','COR','CNQ','TUC',
'Special Flights SA',10,'COR-COR-CNQ','EZE-COR-CNQ','VFR','comun','viernes',
'2022-06-09','03:25','2022-06-09','14:00','2022-06-09','10:00','2022-06-09','15:00',
170000,150000,6000,7000,11055,10000, '04:00','04:00',true,true,
178, 220,130.0,true,null, ARRAY ['Boeing 737-800 NG','Boeing 737 MAX 8','Embraer 190']);


INSERT INTO planDeVuelo (idvuelo, codVuelo, Aeronave_matricula_fk, OrigenTeorico_codIATA, OrigenReal_codIATA, DestinoTeorico_codIATA,
DestinoReal_codIATA, nombreCompania, idEstados_fk,rutaTeorica, rutaReal, reglaDeVuelo, tipoDeVuelo, diaDespegue,
fechaDespegueEstimado,HoraDespegueEstimado,fechaDespegueReal, horaDespegueReal,fechaAterrizajeEstimado,HoraAterrizajeEstimado,fechaAterrizajeReal ,horaAterrizajeReal,
ltscombustibleEstimado, ltscombustibleReal, lubricanteEstimado,lubricanteReal, kilometrajeEstimado,kilometrajeReal, duracionEstimada,duracionReal,checkIn,controlCabina, 
totalPersonasABordo,pesoCargaOrigen,PesoCargaDestino,informado,motivoEstado,aeronavesPosibles) 
VALUES (
'SF0113-202206090325','SF0113','LV-abb','EZE','COR','CNQ','TUC',
'Special Flights SA',10,'COR-COR-CNQ','EZE-COR-CNQ','VFR','comun','viernes',
'2022-06-09','03:25','2022-06-09','14:00','2022-06-09','10:00','2022-06-09','15:00',
170000,150000,6000,7000,11055,10000, '04:00','04:00',true,true,
178, 220,130.0,true,null, ARRAY ['Boeing 737-800 NG','Boeing 737 MAX 8','Embraer 190']);

INSERT INTO planDeVuelo (idvuelo, codVuelo, Aeronave_matricula_fk, OrigenTeorico_codIATA, OrigenReal_codIATA, DestinoTeorico_codIATA,
DestinoReal_codIATA, nombreCompania, idEstados_fk,rutaTeorica, rutaReal, reglaDeVuelo, tipoDeVuelo, diaDespegue,
fechaDespegueEstimado,HoraDespegueEstimado,fechaDespegueReal, horaDespegueReal,fechaAterrizajeEstimado,HoraAterrizajeEstimado,fechaAterrizajeReal ,horaAterrizajeReal,
ltscombustibleEstimado, ltscombustibleReal, lubricanteEstimado,lubricanteReal, kilometrajeEstimado,kilometrajeReal, duracionEstimada,duracionReal,checkIn,controlCabina, 
totalPersonasABordo,pesoCargaOrigen,PesoCargaDestino,informado,motivoEstado,aeronavesPosibles) 
VALUES (
'SF0114-202206090325','SF0114','LV-abb','EZE','COR','CNQ','TUC',
'Special Flights SA',7,'COR-COR-CNQ','EZE-COR-CNQ','VFR','comun','viernes',
'2022-06-09','03:25','2022-06-09','14:00','2022-06-09','10:00','2022-06-09','15:00',
170000,150000,6000,7000,11055,10000, '04:00','04:00',true,true,
178, 220,130.0,true,null, ARRAY ['Boeing 737-800 NG','Boeing 737 MAX 8','Embraer 190']);


INSERT INTO planDeVuelo (idvuelo, codVuelo, Aeronave_matricula_fk, OrigenTeorico_codIATA, OrigenReal_codIATA, DestinoTeorico_codIATA,
DestinoReal_codIATA, nombreCompania, idEstados_fk,rutaTeorica, rutaReal, reglaDeVuelo, tipoDeVuelo, diaDespegue,
fechaDespegueEstimado,HoraDespegueEstimado,fechaDespegueReal, horaDespegueReal,fechaAterrizajeEstimado,HoraAterrizajeEstimado,fechaAterrizajeReal ,horaAterrizajeReal,
ltscombustibleEstimado, ltscombustibleReal, lubricanteEstimado,lubricanteReal, kilometrajeEstimado,kilometrajeReal, duracionEstimada,duracionReal,checkIn,controlCabina, 
totalPersonasABordo,pesoCargaOrigen,PesoCargaDestino,informado,motivoEstado,aeronavesPosibles) 
VALUES (
'SF0115-202206090325','SF0115','LV-abb','EZE','COR','CNQ','TUC',
'Special Flights SA',7,'COR-COR-CNQ','EZE-COR-CNQ','VFR','comun','viernes',
'2022-06-09','03:25','2022-06-09','14:00','2022-06-09','10:00','2022-06-09','15:00',
170000,150000,6000,7000,11055,10000, '04:00','04:00',true,true,
178, 220,130.0,true,null, ARRAY ['Boeing 737-800 NG','Boeing 737 MAX 8','Embraer 190']);

INSERT INTO planDeVuelo (idvuelo, codVuelo, Aeronave_matricula_fk, OrigenTeorico_codIATA, OrigenReal_codIATA, DestinoTeorico_codIATA,
DestinoReal_codIATA, nombreCompania, idEstados_fk,rutaTeorica, rutaReal, reglaDeVuelo, tipoDeVuelo, diaDespegue,
fechaDespegueEstimado,HoraDespegueEstimado,fechaDespegueReal, horaDespegueReal,fechaAterrizajeEstimado,HoraAterrizajeEstimado,fechaAterrizajeReal ,horaAterrizajeReal,
ltscombustibleEstimado, ltscombustibleReal, lubricanteEstimado,lubricanteReal, kilometrajeEstimado,kilometrajeReal, duracionEstimada,duracionReal,checkIn,controlCabina, 
totalPersonasABordo,pesoCargaOrigen,PesoCargaDestino,informado,motivoEstado,aeronavesPosibles) 
VALUES (
'SF0116-202206090325','SF0116','LV-abb','EZE','COR','CNQ','TUC',
'Special Flights SA',7,'COR-COR-CNQ','EZE-COR-CNQ','VFR','comun','viernes',
'2022-06-09','03:25','2022-06-09','14:00','2022-06-09','10:00','2022-06-09','15:00',
170000,150000,6000,7000,11055,10000, '04:00','04:00',true,true,
178, 220,130.0,true,null, ARRAY ['Boeing 737-800 NG','Boeing 737 MAX 8','Embraer 190']);

--cancelado
INSERT INTO planDeVuelo (idvuelo, codVuelo, Aeronave_matricula_fk, OrigenTeorico_codIATA, OrigenReal_codIATA, DestinoTeorico_codIATA,
DestinoReal_codIATA, nombreCompania, idEstados_fk,rutaTeorica, rutaReal, reglaDeVuelo, tipoDeVuelo, diaDespegue,
fechaDespegueEstimado,HoraDespegueEstimado,fechaDespegueReal, horaDespegueReal,
fechaAterrizajeEstimado,HoraAterrizajeEstimado,fechaAterrizajeReal ,horaAterrizajeReal,
ltscombustibleEstimado, ltscombustibleReal, lubricanteEstimado,lubricanteReal, kilometrajeEstimado,kilometrajeReal, 
duracionEstimada,duracionReal,checkIn,controlCabina, totalPersonasABordo,pesoCargaOrigen,PesoCargaDestino,informado,
motivoEstado,aeronavesPosibles ) 
VALUES ('SF0105-202206090325','SF0105','LV-aag','EZE',null,'CNQ',null,'Special Flights SA',7,
		'EZE-COR-CNQ','EZE-COR-CNQ','VFR','comun',	'viernes',
    '2022-05-20','9:00','2022-05-20','10:00','2022-05-20',' 09:00','2022-05-20',' 10:00',
null,null,null,null,null,null, '06:00',null,false,false,
178,220,null,true,null, ARRAY ['Airbus 330-200 8','Airbus A320-251N','Boeing 737-800 NG']);

INSERT INTO planDeVuelo (idvuelo, codVuelo, Aeronave_matricula_fk, OrigenTeorico_codIATA, OrigenReal_codIATA, DestinoTeorico_codIATA,
DestinoReal_codIATA, nombreCompania, idEstados_fk,rutaTeorica, rutaReal, reglaDeVuelo, tipoDeVuelo, diaDespegue,
fechaDespegueEstimado,HoraDespegueEstimado,fechaDespegueReal, horaDespegueReal,
fechaAterrizajeEstimado,HoraAterrizajeEstimado,fechaAterrizajeReal ,horaAterrizajeReal,
ltscombustibleEstimado, ltscombustibleReal, lubricanteEstimado,lubricanteReal, kilometrajeEstimado,kilometrajeReal, 
duracionEstimada,duracionReal,checkIn,controlCabina, totalPersonasABordo,pesoCargaOrigen,PesoCargaDestino,informado,
motivoEstado,aeronavesPosibles ) 
VALUES ('SF0106-202206090325','SF0106',null,'EZE',null,'CNQ',null,'Special Flights SA',10,
		'EZE-COR-CNQ',null,'VFR','comun',	'viernes',
    '2022-05-20','9:00',null,null,'2022-05-20',' 09:00',null,null,
null,null,null,null,null,null, '06:00',null,false,false,
178,220,null,true,null, ARRAY ['Airbus 330-200 8','Airbus A320-251N','Boeing 737-800 NG']);


--Tripulacion
INSERT INTO tripulacion (idpersonal_fk, idvuelo_fk) VALUES (9,'SF0116-202206090325');
INSERT INTO tripulacion (idpersonal_fk, idvuelo_fk) VALUES (14,'SF0116-202206090325');

INSERT INTO tripulacion (idpersonal_fk, idvuelo_fk) VALUES (42,'SF0116-202206090325');
INSERT INTO tripulacion (idpersonal_fk, idvuelo_fk) VALUES (38,'SF0116-202206090325');
INSERT INTO tripulacion (idpersonal_fk, idvuelo_fk) VALUES (34,'SF0116-202206090325');
INSERT INTO tripulacion (idpersonal_fk, idvuelo_fk) VALUES (32,'SF0116-202206090325');

--Tripulacion
INSERT INTO tripulacion (idpersonal_fk, idvuelo_fk) VALUES (9,'SF0115-202206090325');
INSERT INTO tripulacion (idpersonal_fk, idvuelo_fk) VALUES (14,'SF0115-202206090325');

INSERT INTO tripulacion (idpersonal_fk, idvuelo_fk) VALUES (42,'SF0115-202206090325');
INSERT INTO tripulacion (idpersonal_fk, idvuelo_fk) VALUES (38,'SF0115-202206090325');
INSERT INTO tripulacion (idpersonal_fk, idvuelo_fk) VALUES (34,'SF0115-202206090325');
INSERT INTO tripulacion (idpersonal_fk, idvuelo_fk) VALUES (32,'SF0115-202206090325');
--Tripulacion
INSERT INTO tripulacion (idpersonal_fk, idvuelo_fk) VALUES (9,'SF0114-202206090325');
INSERT INTO tripulacion (idpersonal_fk, idvuelo_fk) VALUES (14,'SF0114-202206090325');
INSERT INTO tripulacion (idpersonal_fk, idvuelo_fk) VALUES (42,'SF0114-202206090325');
INSERT INTO tripulacion (idpersonal_fk, idvuelo_fk) VALUES (38,'SF0114-202206090325');
INSERT INTO tripulacion (idpersonal_fk, idvuelo_fk) VALUES (34,'SF0114-202206090325');
INSERT INTO tripulacion (idpersonal_fk, idvuelo_fk) VALUES (32,'SF0114-202206090325');

*/
--INSERTS DE PRUEBA PARA LA TRIPULACION

 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('NQN', 'Juan', 'Ibrahim', '+54','11', 'xxxx-xxxx','freucaussadeiju-8796@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('NQN','Elias', 'Carretero', '+54','11', 'xxxx-xxxx','buneunnanoiteu-3825@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('NQN','Milagros', 'Villar', '+1','xxxx','xx-xxxx-xxxx','summotteufeigro-8875@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('NQN','Maximiliano', 'Ayuso', '+1','xxxx','xx-xxxx-xxxx','zoittejevotteu-2550@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('NQN','Soraya', 'Vaquero', '+52','xxxx' , 'xx-xxxx-xxxx','nugeffogrinu-3518@yopmail.com', true, 'piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('NQN', 'Andres', 'Moral', '+54','11', 'xxxx-xxxx','fapullupriza-2971@yopmail.com', true, 'piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('NQN', 'Elisa', 'Acedo', '+54','11', 'xxxx-xxxx','grusauboiyumme-1727@yopmail.com', true, 'piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('NQN','Adriel', 'Lopez', '+1','xxxx','xx-xxxx-xxxx','vutessojeki-3643@yopmail.com', true, 'co-piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('NQN', 'Esteban', 'Nieto', '+54','11', 'xxxx-xxxx','suzeinotteppe-1738@yopmail.com', true, 'co-piloto', true);
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('NQN', 'Juan', 'Ibrahim', '+54','11', 'xxxx-xxxx','freucaussadeiju-8796@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('NQN', 'Juan', 'Ibrahim', '+54','11', 'xxxx-xxxx','freucaussadeiju-8796@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('NQN', 'Juan', 'Ibrahim', '+54','11', 'xxxx-xxxx','freucaussadeiju-8796@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('NQN', 'Juan', 'Ibrahim', '+54','11', 'xxxx-xxxx','freucaussadeiju-8796@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('EZE', 'Juan', 'Ibrahim', '+54','11', 'xxxx-xxxx','freucaussadeiju-8796@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('TUC','Elias', 'Carretero', '+54','11', 'xxxx-xxxx','buneunnanoiteu-3825@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('COR','Milagros', 'Villar', '+1','xxxx','xx-xxxx-xxxx','summotteufeigro-8875@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('COR','Maximiliano', 'Ayuso', '+1','xxxx','xx-xxxx-xxxx','zoittejevotteu-2550@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('COR','Soraya', 'Vaquero', '+52','xxxx' , 'xx-xxxx-xxxx','nugeffogrinu-3518@yopmail.com', true, 'piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('EZE', 'Andres', 'Moral', '+54','11', 'xxxx-xxxx','fapullupriza-2971@yopmail.com', true, 'piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('TUC', 'Elisa', 'Acedo', '+54','11', 'xxxx-xxxx','grusauboiyumme-1727@yopmail.com', true, 'piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('EZE','Adriel', 'Lopez', '+1','xxxx','xx-xxxx-xxxx','vutessojeki-3643@yopmail.com', true, 'co-piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('COR', 'Esteban', 'Nieto', '+54','11', 'xxxx-xxxx','suzeinotteppe-1738@yopmail.com', true, 'co-piloto', true);

INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP', 'Juan', 'Ibrahim', '+54','11', 'xxxx-xxxx','freucaussadeiju-8796@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Elias', 'Carretero', '+54','11', 'xxxx-xxxx','buneunnanoiteu-3825@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Milagros', 'Villar', '+1','xxxx','xx-xxxx-xxxx','summotteufeigro-8875@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Maximiliano', 'Ayuso', '+1','xxxx','xx-xxxx-xxxx','zoittejevotteu-2550@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Soraya', 'Vaquero', '+52','xxxx' , 'xx-xxxx-xxxx','nugeffogrinu-3518@yopmail.com', true, 'piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Andres', 'Moral', '+54','11', 'xxxx-xxxx','fapullupriza-2971@yopmail.com', true, 'piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP', 'Elisa', 'Acedo', '+54','11', 'xxxx-xxxx','grusauboiyumme-1727@yopmail.com', true, 'piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Adriel', 'Lopez', '+1','xxxx','xx-xxxx-xxxx','vutessojeki-3643@yopmail.com', true, 'co-piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP', 'Esteban', 'Nieto', '+54','11', 'xxxx-xxxx','suzeinotteppe-1738@yopmail.com', true, 'co-piloto', true);
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Juan', 'Ibrahim', '+54','11', 'xxxx-xxxx','freucaussadeiju-8796@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Elias', 'Carretero', '+54','11', 'xxxx-xxxx','buneunnanoiteu-3825@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Milagros', 'Villar', '+1','xxxx','xx-xxxx-xxxx','summotteufeigro-8875@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Maximiliano', 'Ayuso', '+1','xxxx','xx-xxxx-xxxx','zoittejevotteu-2550@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Soraya', 'Vaquero', '+52','xxxx' , 'xx-xxxx-xxxx','nugeffogrinu-3518@yopmail.com', true, 'piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP', 'Andres', 'Moral', '+54','11', 'xxxx-xxxx','fapullupriza-2971@yopmail.com', true, 'piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP', 'Elisa', 'Acedo', '+54','11', 'xxxx-xxxx','grusauboiyumme-1727@yopmail.com', true, 'piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Adriel', 'Lopez', '+1','xxxx','xx-xxxx-xxxx','vutessojeki-3643@yopmail.com', true, 'co-piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP', 'Esteban', 'Nieto', '+54','11', 'xxxx-xxxx','suzeinotteppe-1738@yopmail.com', true, 'co-piloto', true);

INSERT INTO parentesco (Personal1_legajo_fk,Personal2_legajo_fk, relacion, activo, fecha_de_actualizacion) VALUES (66,70,'conyuge',true, '2020-05-02'); 

INSERT INTO parentesco (Personal1_legajo_fk,Personal2_legajo_fk, relacion, activo, fecha_de_actualizacion) VALUES (70,66,'hermana',true,'2020-05-02'); 
INSERT INTO parentesco (Personal1_legajo_fk,Personal2_legajo_fk, relacion, activo, fecha_de_actualizacion) VALUES (73,70,'padre',true,'2020-05-02'); 
INSERT INTO parentesco (Personal1_legajo_fk,Personal2_legajo_fk, relacion, activo, fecha_de_actualizacion) VALUES (70,73,'primos',true,'2020-05-02');
INSERT INTO parentesco (Personal1_legajo_fk,Personal2_legajo_fk, relacion, activo, fecha_de_actualizacion) VALUES (49,51,'conyuge',true, '2020-05-02'); 
INSERT INTO parentesco (Personal1_legajo_fk,Personal2_legajo_fk, relacion, activo, fecha_de_actualizacion) VALUES (51,49,'hermana',true,'2020-05-02'); 
INSERT INTO parentesco (Personal1_legajo_fk,Personal2_legajo_fk, relacion, activo, fecha_de_actualizacion) VALUES (53,55,'padre',true,'2020-05-02'); 
INSERT INTO parentesco (Personal1_legajo_fk,Personal2_legajo_fk, relacion, activo, fecha_de_actualizacion) VALUES (55,53,'primos',true,'2020-05-02');




-----------------INSERTS NAVES Y PERSONAL-------------------------------

--AEP

INSERT INTO personal (Aeropuerto_codIATA,nombre,apellido,codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Jorge', 'Costa', '+1','xxxx','xx-xxxx-xxxx','jorgeceubujo-5938@yopmail.com', true, 'auxiliar', true);
INSERT INTO personal (Aeropuerto_codIATA,nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Jorge', 'Cabello', '+1','xxxx','xx-xxxx-xxxx','jorgegritennou-9217@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA,nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Jorge', 'Carpio', '+1','xxxx','xx-xxxx-xxxx','jorgerugimu-8518@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA,nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Jorge', 'Perea', '+1','xxxx','xx-xxxx-xxxx','jorgeyayoixeuffaja-4689@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA,nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Jorge', 'Ibrahim', '+54','11', 'xxxx-xxxx','jorgecaussadeiju-8796@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA,nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Jorge', 'Carretero', '+54','11', 'xxxx-xxxx','jorgebuneunnanoiteu-3825@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA,nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Jorge', 'Villar', '+1','xxxx','xx-xxxx-xxxx','jorgetteufeigro-8875@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA,nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Jorge', 'Ayuso', '+1','xxxx','xx-xxxx-xxxx','jorgejevotteu-2550@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Jorge', 'Vaquero', '+52','xxxx' , 'xx-xxxx-xxxx','jorgegrinu-3518@yopmail.com', true, 'piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA,nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP', 'Jorge', 'Moral', '+54','11', 'xxxx-xxxx','jorgepriza-2971@yopmail.com', true, 'piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA,nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Jorge', 'Acedo', '+54','11', 'xxxx-xxxx','jorgeiyumme-1727@yopmail.com', true, 'piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA,nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Jorge', 'Lopez', '+1','xxxx','xx-xxxx-xxxx','jorgejeki-3643@yopmail.com', true, 'co-piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Jorge', 'Nieto', '+54','11', 'xxxx-xxxx','jorgetteppe-1738@yopmail.com', true, 'co-piloto', true);



INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Graciela', 'Sole', '+1','xxxx','xx-xxxx-xxxx','gracielaemmeme-2270@yopmail.com', true, 'co-piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Graciela', 'Barrios', '+52','xxxx' , 'xx-xxxx-xxxx','gracielafrafawouprore-3805@yopmail.com', true, 'piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA,nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Graciela', 'Osorio', '+52','xxxx' , 'xx-xxxx-xxxx','gracielaiheque-3909@yopmail.com', true, 'piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo)
VALUES ('AEP','Graciela', 'Soto', '+52','xxxx' , 'xx-xxxx-xxxx','gracielannacoimou-1195@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA,nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Graciela', 'Cervera', '+1','xxxx','xx-xxxx-xxxx','gracielarokini-4457@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA,nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Graciela', 'Juarez', '+1','xxxx','xx-xxxx-xxxx','gracielassotrei-5260@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Graciela', 'Saez', '+1','xxxx','xx-xxxx-xxxx','gracielaiyeiba-3073@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Graciela', 'Sanchez', '+1','xxxx','xx-xxxx-xxxx','gracielaigo-5687@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA,nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Graciela', 'Lopez', '+1','xxxx','xx-xxxx-xxxx','gracielaleka-7067@yopmail.com', true, 'auxiliar', true);
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Graciela', 'Mata', '+1','xxxx','xx-xxxx-xxxx','gracielaolemmau-4297@yopmail.com', true, 'auxiliar', true); 

INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Sílvia', 'Sosa', '+1','xxxx','xx-xxxx-xxxx','sílviaffocacou-8525@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Sílvia', 'Luque', '+1','xxxx','xx-xxxx-xxxx','sílviavafreisi-8259@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Sílvia', 'Parra', '+54','11', 'xxxx-xxxx','sílvianannojounni-6838@yopmail.com', true, 'co-piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Sílvia', 'Jimeno', '+54','11', 'xxxx-xxxx','sílviafradiva-5537@yopmail.com', true, 'co-piloto', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Sílvia', 'Fernandez', '+54','11', 'xxxx-xxxx','sílviaffacrewe-1892@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Sílvia', 'Castañeda', '+1','xxxx','xx-xxxx-xxxx','sílviaejau-8841@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Sílvia', 'Zapata', '+52','xxxx' , 'xx-xxxx-xxxx','sílviaeuppufricu-4086@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Sílvia', 'Carballo', '+54','11', 'xxxx-xxxx','sílviamojoci-6556@yopmail.com', true, 'auxiliar', false);  
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Sílvia', 'Ureña', '+1','xxxx','xx-xxxx-xxxx','sílviaecrexeima-6449@yopmail.com', true, 'piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA,nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Sílvia', 'Guirao', '+1','xxxx','xx-xxxx-xxxx','sílviakullisa-7593@yopmail.com', true, 'piloto', true); 

INSERT INTO personal (Aeropuerto_codIATA,nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Camilo', 'Frances', '+54','11', 'xxxx-xxxx','camilofrige-9425@yopmail.com', true, 'piloto', false); 
INSERT INTO personal (Aeropuerto_codIATA,nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Camilo', 'Fabra', '+54','11', 'xxxx-xxxx','camilo-1212@yopmail.com', true, 'piloto', false); 
INSERT INTO personal (Aeropuerto_codIATA,nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Camilo', 'Bermudes', '+54','11', 'xxxx-xxxx','camilolalfon-1211@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA,nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Camilo', 'Rodriguez', '+54','11', 'xxxx-xxxx','lcamiloenny-1021@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA,nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Camilo', 'Lopez', '+54','11', 'xxxx-xxxx','camilo_lopez-2211@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA,nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Camilo', 'Sosa', '+54','11', 'xxxx-xxxx','camilo--2301@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA,nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Camilo', 'Ezquierdoz', '+54','11', 'xxxx-xxxx','camiloelcali-1221@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA,nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Camilo', 'Gomez', '+54','11', 'xxxx-xxxx','ncamilolfacha-1223@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA,nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Camilo', 'Sanchez', '+54','11', 'xxxx-xxxx','camilolalosanchezz-1200@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA,nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Camilo', 'Zalasar', '+54','11', 'xxxx-xxxx','camilonita-1001@yopmail.com', true, 'auxiliar', false); 


INSERT INTO personal (Aeropuerto_codIATA,nombre,apellido,codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Jose', 'Costa', '+1','xxxx','xx-xxxx-xxxx','joseceubujo-5938@yopmail.com', true, 'auxiliar', true);
INSERT INTO personal (Aeropuerto_codIATA,nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Jose', 'Cabello', '+1','xxxx','xx-xxxx-xxxx','jjosetennou-9217@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA,nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Jose', 'Carpio', '+1','xxxx','xx-xxxx-xxxx','joseimu-8518@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA,nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Jose', 'Perea', '+1','xxxx','xx-xxxx-xxxx','joseoixeuffaja-4689@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA,nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Jose', 'Ibrahim', '+54','11', 'xxxx-xxxx','josedeiju-8796@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA,nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Jose', 'Carretero', '+54','11', 'xxxx-xxxx','jjosenanoiteu-3825@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA,nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Jose', 'Villar', '+1','xxxx','xx-xxxx-xxxx','josefeigro-8875@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA,nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Jose', 'Ayuso', '+1','xxxx','xx-xxxx-xxxx','josejevotteu-2550@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA,nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Jose', 'Vaquero', '+52','xxxx' , 'xx-xxxx-xxxx','joseinu-3518@yopmail.com', true, 'piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA,nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Jose', 'Moral', '+54','11', 'xxxx-xxxx','joseriza-2971@yopmail.com', true, 'piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA,nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Jose', 'Acedo', '+54','11', 'xxxx-xxxx','joseiyumme-1727@yopmail.com', true, 'piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA,nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Jose', 'Lopez', '+1','xxxx','xx-xxxx-xxxx','josejeki-3643@yopmail.com', true, 'co-piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA,nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Jose', 'Nieto', '+54','11', 'xxxx-xxxx','joseppe-1738@yopmail.com', true, 'co-piloto', true);



INSERT INTO personal (Aeropuerto_codIATA,nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Jimena', 'Sole', '+1','xxxx','xx-xxxx-xxxx','jimeemmeme-2270@yopmail.com', true, 'co-piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA,nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Jimena', 'Barrios', '+52','xxxx' , 'xx-xxxx-xxxx','jimeafawouprore-3805@yopmail.com', true, 'piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA,nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Jimena', 'Osorio', '+52','xxxx' , 'xx-xxxx-xxxx','jimelaiheque-3909@yopmail.com', true, 'piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA,nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo)
VALUES ('AEP','Jimena', 'Soto', '+52','xxxx' , 'xx-xxxx-xxxx','jimeannacoimou-1195@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA,nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Jimena', 'Cervera', '+1','xxxx','xx-xxxx-xxxx','jimerokini-4457@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA,nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Jimena', 'Juarez', '+1','xxxx','xx-xxxx-xxxx','jimeassotrei-5260@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA,nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Jimena', 'Saez', '+1','xxxx','xx-xxxx-xxxx','jimeeiba-3073@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA,nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Jimena', 'Sanchez', '+1','xxxx','xx-xxxx-xxxx','jimego-5687@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA,nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Jimena', 'Lopez', '+1','xxxx','xx-xxxx-xxxx','gjimealeka-7067@yopmail.com', true, 'auxiliar', true);
INSERT INTO personal (Aeropuerto_codIATA,nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Jimena', 'Mata', '+1','xxxx','xx-xxxx-xxxx','jimemmau-4297@yopmail.com', true, 'auxiliar', true); 

INSERT INTO personal (Aeropuerto_codIATA,nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Fabiana', 'Sosa', '+1','xxxx','xx-xxxx-xxxx','fabianaocacou-8525@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA,nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Fabiana', 'Luque', '+1','xxxx','xx-xxxx-xxxx','fabianafreisi-8259@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA,nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Fabiana', 'Parra', '+54','11', 'xxxx-xxxx','sfabiananojounni-6838@yopmail.com', true, 'co-piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA,nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Fabiana', 'Jimeno', '+54','11', 'xxxx-xxxx','fabianafradiva-5537@yopmail.com', true, 'co-piloto', false); 
INSERT INTO personal (Aeropuerto_codIATA,nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Fabiana', 'Fernandez', '+54','11', 'xxxx-xxxx','fabianaacrewe-1892@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA,nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Fabiana', 'Castañeda', '+1','xxxx','xx-xxxx-xxxx','fabianaaejau-8841@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA,nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Fabiana', 'Zapata', '+52','xxxx' , 'xx-xxxx-xxxx','fabianappufricu-4086@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA,nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Fabiana', 'Carballo', '+54','11', 'xxxx-xxxx','fabianaojoci-6556@yopmail.com', true, 'auxiliar', false);  
INSERT INTO personal (Aeropuerto_codIATA,nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Fabiana', 'Ureña', '+1','xxxx','xx-xxxx-xxxx','fabianacrexeima-6449@yopmail.com', true, 'piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA,nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Fabiana', 'Guirao', '+1','xxxx','xx-xxxx-xxxx','fabianaullisa-7593@yopmail.com', true, 'piloto', true); 

INSERT INTO personal (Aeropuerto_codIATA,nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Estefani', 'Frances', '+54','11', 'xxxx-xxxx','estefanifrige-9425@yopmail.com', true, 'piloto', false); 
INSERT INTO personal (Aeropuerto_codIATA,nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Estefani', 'Fabra', '+54','11', 'xxxx-xxxx','estefani1212@yopmail.com', true, 'piloto', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Estefani', 'Bermudes', '+54','11', 'xxxx-xxxx','estefanialfon-1211@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Estefani', 'Rodriguez', '+54','11', 'xxxx-xxxx','lestefaniny-1021@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Estefani', 'Lopez', '+54','11', 'xxxx-xxxx','estefanio_lopez-2211@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Estefani', 'Sosa', '+54','11', 'xxxx-xxxx','cestefaniilo--2301@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Estefani', 'Ezquierdoz', '+54','11', 'xxxx-xxxx','estefaniali-1221@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Estefani', 'Gomez', '+54','11', 'xxxx-xxxx','estefanilfacha-1223@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Estefani', 'Sanchez', '+54','11', 'xxxx-xxxx','estefanilosanchezz-1200@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('AEP','Estefani', 'Zalasar', '+54','11', 'xxxx-xxxx','estefaninita-1001@yopmail.com', true, 'auxiliar', false); 


-------------------------------------------------------------------------------
--ROS

INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido,codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('ROS','Pepe', 'Costa', '+1','xxxx','xx-xxxx-xxxx','pepeubujo-5938@yopmail.com', true, 'auxiliar', true);
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('ROS','Pepe', 'Cabello', '+1','xxxx','xx-xxxx-xxxx','pepenou-9217@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('ROS','Pepe', 'Carpio', '+1','xxxx','xx-xxxx-xxxx','pepeimu-8518@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('ROS','Pepe', 'Perea', '+1','xxxx','xx-xxxx-xxxx','pepeixeuffaja-4689@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('ROS','Pepe', 'Ibrahim', '+54','11', 'xxxx-xxxx','pepecaussadeiju-8796@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('ROS','Pepe', 'Carretero', '+54','11', 'xxxx-xxxx','pepeneunnanoiteu-3825@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('ROS','Pepe', 'Villar', '+1','xxxx','xx-xxxx-xxxx','pepetteufeigro-8875@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('ROS','Pepe', 'Ayuso', '+1','xxxx','xx-xxxx-xxxx','pepejevotteu-2550@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('ROS','Pepe', 'Vaquero', '+52','xxxx' , 'xx-xxxx-xxxx','pepegrinu-3518@yopmail.com', true, 'piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('ROS', 'Pepe', 'Moral', '+54','11', 'xxxx-xxxx','jorgeppepe-2971@yopmail.com', true, 'piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('ROS', 'Pepe', 'Acedo', '+54','11', 'xxxx-xxxx','pepeumme-1727@yopmail.com', true, 'piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('ROS','Pepe', 'Lopez', '+1','xxxx','xx-xxxx-xxxx','pepejorgejeki-3643@yopmail.com', true, 'co-piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('ROS', 'Pepe', 'Nieto', '+54','11', 'xxxx-xxxx','pepeteppe-1738@yopmail.com', true, 'co-piloto', true);



INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('ROS','Marisol', 'Sole', '+1','xxxx','xx-xxxx-xxxx','marielaemmeme-2270@yopmail.com', true, 'co-piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('ROS','Marisol', 'Barrios', '+52','xxxx' , 'xx-xxxx-xxxx','marirafawouprore-3805@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('ROS','Marisol', 'Osorio', '+52','xxxx' , 'xx-xxxx-xxxx','mariiheque-3909@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo)
VALUES ('ROS','Marisol', 'Soto', '+52','xxxx' , 'xx-xxxx-xxxx','mariannacoimou-1195@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('ROS','Marisol', 'Cervera', '+1','xxxx','xx-xxxx-xxxx','marirokini-4457@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('ROS','Marisol', 'Juarez', '+1','xxxx','xx-xxxx-xxxx','marissotrei-5260@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('ROS','Marisol', 'Saez', '+1','xxxx','xx-xxxx-xxxx','mariaiyeiba-3073@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('ROS','Marisol', 'Sanchez', '+1','xxxx','xx-xxxx-xxxx','mariaigo-5687@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('ROS','Marisol', 'Lopez', '+1','xxxx','xx-xxxx-xxxx','marilaleka-7067@yopmail.com', true, 'auxiliar', true);
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('ROS','Marisol', 'Mata', '+1','xxxx','xx-xxxx-xxxx','marisolcielaolemmau-4297@yopmail.com', true, 'auxiliar', true); 

INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('ROS','Sílvio', 'Sosa', '+1','xxxx','xx-xxxx-xxxx','sílvioocacou-8525@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('ROS','Sílvio', 'Domiguez', '+1','xxxx','xx-xxxx-xxxx','sílviofreisi-8259@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('ROS','Sílvio', 'Parra', '+54','11', 'xxxx-xxxx','sílvionnojounni-6838@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('ROS','Sílvio', 'Ramirez', '+54','11', 'xxxx-xxxx','sílviosílviosílviodiva-5537@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('ROS','Sílvio', 'Fernandez', '+54','11', 'xxxx-xxxx','sílviosílvioacrewe-1892@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('ROS','Sílvio', 'Castañeda', '+1','xxxx','xx-xxxx-xxxx','sílvioejau-8841@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('ROS','Sílvio', 'Zapata', '+52','xxxx' , 'xx-xxxx-xxxx','sílvioppufricu-4086@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('ROS','Sílvio', 'Carballo', '+54','11', 'xxxx-xxxx','sílviooci-6556@yopmail.com', true, 'auxiliar', false);  
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('ROS','Sílvio', 'Ureña', '+1','xxxx','xx-xxxx-xxxx','sílvioexeima-6449@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('ROS','Sílvio', 'Guirao', '+1','xxxx','xx-xxxx-xxxx','sílviolisa-7593@yopmail.com', true, 'auxiliar', true); 

INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('ROS','Nicolas', 'Frances', '+54','11', 'xxxx-xxxx','nicofrige-9425@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('ROS','Nicolas', 'Fabra', '+54','11', 'xxxx-xxxx','nico-1212@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('ROS','Nicolas', 'Bermudes', '+54','11', 'xxxx-xxxx','nicolalfon-1211@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('ROS','Nicolas', 'Rodriguez', '+54','11', 'xxxx-xxxx','nicoloenny-1021@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('ROS','Nicolas', 'Lopez', '+54','11', 'xxxx-xxxx','nicolopez-2211@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('ROS','Nicolas', 'Sosa', '+54','11', 'xxxx-xxxx','nicoilo--2301@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('ROS','Nicolas', 'Ezquierdoz', '+54','11', 'xxxx-xxxx','nicomiloelcali-1221@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('ROS','Nicolas', 'Gomez', '+54','11', 'xxxx-xxxx','nicoacha-1223@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('ROS','Nicolas', 'Sanchez', '+54','11', 'xxxx-xxxx','nicoalosanchezz-1200@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('ROS','Nicolas', 'Zalasar', '+54','11', 'xxxx-xxxx','niconita-1001@yopmail.com', true, 'auxiliar', false); 

-------------------------------------------------------------------------------------------------------
--RES


INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido,codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('RES','Monica', 'Costa', '+1','xxxx','xx-xxxx-xxxx','monicabujo-5938@yopmail.com', true, 'auxiliar', true);
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('RES','Monica', 'Cabello', '+1','xxxx','xx-xxxx-xxxx','monicanou-9217@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('RES','Monica', 'Carpio', '+1','xxxx','xx-xxxx-xxxx','monicamu-8518@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('RES','Monica', 'Perea', '+1','xxxx','xx-xxxx-xxxx','monicauffaja-4689@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('RES','Monica', 'Ibrahim', '+54','11', 'xxxx-xxxx','monicassadeiju-8796@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('RES','Monica', 'Carretero', '+54','11', 'xxxx-xxxx','monicananoiteu-3825@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('RES','Monica', 'Villar', '+1','xxxx','xx-xxxx-xxxx','pmonicaeufeigro-8875@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('RES','Monica', 'Ayuso', '+1','xxxx','xx-xxxx-xxxx','pmonicavotteu-2550@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('RES','Monica', 'Vaquero', '+52','xxxx' , 'xx-xxxx-xxxx','pemonicau-3518@yopmail.com', true, 'piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('RES', 'Monica', 'Moral', '+54','11', 'xxxx-xxxx','jomonicappepe-2971@yopmail.com', true, 'piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('RES', 'Monica', 'Acedo', '+54','11', 'xxxx-xxxx','monicapeumme-1727@yopmail.com', true, 'piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('RES','Monica', 'Lopez', '+1','xxxx','xx-xxxx-xxxx','monicajorgejeki-3643@yopmail.com', true, 'co-piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('RES','Monica', 'Nieto', '+54','11', 'xxxx-xxxx','pmonicateppe-1738@yopmail.com', true, 'co-piloto', true);



INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('RES','Agustin', 'Sole', '+1','xxxx','xx-xxxx-xxxx','agustinemmeme-2270@yopmail.com', true, 'co-piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('RES','Agustin', 'Barrios', '+52','xxxx' , 'xx-xxxx-xxxx','agustineawouprore-3805@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('RES','Agustin', 'Osorio', '+52','xxxx' , 'xx-xxxx-xxxx','agustineque-3909@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo)
VALUES ('RES','Agustin', 'Soto', '+52','xxxx' , 'xx-xxxx-xxxx','agustinecoimou-1195@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('RES','Agustin', 'Cervera', '+1','xxxx','xx-xxxx-xxxx','agustineini-4457@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('RES','Agustin', 'Juarez', '+1','xxxx','xx-xxxx-xxxx','agustinetrei-5260@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('RES','Agustin', 'Saez', '+1','xxxx','xx-xxxx-xxxx','agustineyeiba-3073@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('RES','Agustin', 'Sanchez', '+1','xxxx','xx-xxxx-xxxx','agustineo-5687@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('RES','Agustin', 'Lopez', '+1','xxxx','xx-xxxx-xxxx','agustinealeka-7067@yopmail.com', true, 'auxiliar', true);
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('RES','Agustin', 'Mata', '+1','xxxx','xx-xxxx-xxxx','agustinelaolemmau-4297@yopmail.com', true, 'auxiliar', true); 

INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('RES','Esteban', 'Sosa', '+1','xxxx','xx-xxxx-xxxx','estebancacou-8525@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('RES','Esteban', 'Domiguez', '+1','xxxx','xx-xxxx-xxxx','estebaneisi-8259@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('RES','Esteban', 'Parra', '+54','11', 'xxxx-xxxx','estebanojounni-6838@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('RES','Esteban', 'Ramirez', '+54','11', 'xxxx-xxxx','estebaniosílviodiva-5537@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('RES','Esteban', 'Fernandez', '+54','11', 'xxxx-xxxx','estebanacrewe-1892@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('RES','Esteban', 'Castañeda', '+1','xxxx','xx-xxxx-xxxx','estebanau-8841@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('RES','Esteban', 'Zapata', '+52','xxxx' , 'xx-xxxx-xxxx','estebanufricu-4086@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('RES','Esteban', 'Carballo', '+54','11', 'xxxx-xxxx','estebanci-6556@yopmail.com', true, 'auxiliar', false);  
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('RES','Esteban', 'Ureña', '+1','xxxx','xx-xxxx-xxxx','síestebaneima-6449@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('RES','Esteban', 'Guirao', '+1','xxxx','xx-xxxx-xxxx','síestebanlisa-7593@yopmail.com', true, 'auxiliar', true); 

INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('RES','Vanesa', 'Frances', '+54','11', 'xxxx-xxxx','vanesafrige-9425@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('RES','Vanesa', 'Fabra', '+54','11', 'xxxx-xxxx','vanesa-1212@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('RES','Vanesa', 'Bermudes', '+54','11', 'xxxx-xxxx','vanesaalfon-1211@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('RES','Vanesa', 'Rodriguez', '+54','11', 'xxxx-xxxx','vanesaloenny-1021@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('RES','Vanesa', 'Lopez', '+54','11', 'xxxx-xxxx','vanesalopez-2211@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('RES','Vanesa', 'Sosa', '+54','11', 'xxxx-xxxx','vanesaoilo--2301@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('RES','Vanesa', 'Ezquierdoz', '+54','11', 'xxxx-xxxx','vanesaloelcali-1221@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('RES','Vanesa', 'Gomez', '+54','11', 'xxxx-xxxx','vanesacha-1223@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('RES','Vanesa', 'Sanchez', '+54','11', 'xxxx-xxxx','vanesasanchezz-1200@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('RES','Vanesa', 'Zalasar', '+54','11', 'xxxx-xxxx','vanesaita-1001@yopmail.com', true, 'auxiliar', false); 

-----------------------------------------------------------------------------------------------------
--NQN

INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido,codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('NQN','Eezequiel', 'Costa', '+1','xxxx','xx-xxxx-xxxx','ezequielbujo-5938@yopmail.com', true, 'auxiliar', true);
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('NQN','Monica', 'Cabello', '+1','xxxx','xx-xxxx-xxxx','mezequielanou-9217@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('NQN','Monica', 'Carpio', '+1','xxxx','xx-xxxx-xxxx','moezequielmu-8518@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('NQN','Monica', 'Perea', '+1','xxxx','xx-xxxx-xxxx','ezequieluffaja-4689@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('NQN','Monica', 'Ibrahim', '+54','11', 'xxxx-xxxx','ezequielsadeiju-8796@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('NQN','Monica', 'Carretero', '+54','11', 'xxxx-xxxx','ezequielnanoiteu-3825@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('NQN','Monica', 'Villar', '+1','xxxx','xx-xxxx-xxxx','ezequieleufeigro-8875@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('NQN','Monica', 'Ayuso', '+1','xxxx','xx-xxxx-xxxx','ezequieltteu-2550@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('NQN','Monica', 'Vaquero', '+52','xxxx' , 'xx-xxxx-xxxx','ezequielu-3518@yopmail.com', true, 'piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('NQN', 'Monica', 'Moral', '+54','11', 'xxxx-xxxx','ezequielppepe-2971@yopmail.com', true, 'piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('NQN', 'Monica', 'Acedo', '+54','11', 'xxxx-xxxx','ezequiele-1727@yopmail.com', true, 'piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('NQN','Monica', 'Lopez', '+1','xxxx','xx-xxxx-xxxx','ezequielgejeki-3643@yopmail.com', true, 'co-piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('NQN', 'Monica', 'Nieto', '+54','11', 'xxxx-xxxx','ezequiele-1738@yopmail.com', true, 'co-piloto', true);



INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('NQN','Agustina', 'Sole', '+1','xxxx','xx-xxxx-xxxx','agustinaemmeme-2270@yopmail.com', true, 'co-piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('NQN','Agustina', 'Barrios', '+52','xxxx' , 'xx-xxxx-xxxx','agustinaeawouprore-3805@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('NQN','Agustina', 'Osorio', '+52','xxxx' , 'xx-xxxx-xxxx','agustinaeque-3909@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo)
VALUES ('NQN','Agustina', 'Soto', '+52','xxxx' , 'xx-xxxx-xxxx','agustinaecoimou-1195@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('NQN','Agustina', 'Cervera', '+1','xxxx','xx-xxxx-xxxx','agustinaeini-4457@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('NQN','Agustina', 'Juarez', '+1','xxxx','xx-xxxx-xxxx','agustinaetrei-5260@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('NQN','Agustina', 'Saez', '+1','xxxx','xx-xxxx-xxxx','agustinaeyeiba-3073@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('NQN','Agustina', 'Sanchez', '+1','xxxx','xx-xxxx-xxxx','agustinaeo-5687@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('NQN','Agustina', 'Lopez', '+1','xxxx','xx-xxxx-xxxx','agustinaealeka-7067@yopmail.com', true, 'auxiliar', true);
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('NQN','Agustina', 'Mata', '+1','xxxx','xx-xxxx-xxxx','agustinaelaolemmau-4297@yopmail.com', true, 'auxiliar', true); 

INSERT INTO personal (Aeropuerto_codIATA,nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('NQN','Felipe', 'Sosa', '+1','xxxx','xx-xxxx-xxxx','felipecacou-8525@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('NQN','Esteban', 'Domiguez', '+1','xxxx','xx-xxxx-xxxx','felipeaneisi-8259@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('NQN','Esteban', 'Parra', '+54','11', 'xxxx-xxxx','felipeunni-6838@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('NQN','Esteban', 'Ramirez', '+54','11', 'xxxx-xxxx','felipeílviodiva-5537@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('NQN','Esteban', 'Fernandez', '+54','11', 'xxxx-xxxx','felipecrewe-1892@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('NQN','Esteban', 'Castañeda', '+1','xxxx','xx-xxxx-xxxx','felipe8841@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('NQN','Esteban', 'Zapata', '+52','xxxx' , 'xx-xxxx-xxxx','felipeufricu-4086@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('NQN','Esteban', 'Carballo', '+54','11', 'xxxx-xxxx','felipeanci-6556@yopmail.com', true, 'auxiliar', false);  
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('NQN','Esteban', 'Ureña', '+1','xxxx','xx-xxxx-xxxx','felipeeima-6449@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('NQN','Esteban', 'Guirao', '+1','xxxx','xx-xxxx-xxxx','felipeanlisa-7593@yopmail.com', true, 'auxiliar', true); 

INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('NQN','Ivana', 'Frances', '+54','11', 'xxxx-xxxx','ivanasafrige-9425@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('NQN','Nicolas', 'Fabra', '+54','11', 'xxxx-xxxx','ivana212@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('NQN','Nicolas', 'Bermudes', '+54','11', 'xxxx-xxxx','ivanaalfon-1211@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('NQN','Nicolas', 'Rodriguez', '+54','11', 'xxxx-xxxx','ivanaloenny-1021@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('NQN','Nicolas', 'Lopez', '+54','11', 'xxxx-xxxx','ivanapez-2211@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('NQN','Nicolas', 'Sosa', '+54','11', 'xxxx-xxxx','ivananesaoilo--2301@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('NQN','Nicolas', 'Ezquierdoz', '+54','11', 'xxxx-xxxx','ivanavanesaloelcali-1221@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('NQN','Nicolas', 'Gomez', '+54','11', 'xxxx-xxxx','ivanavanesacha-1223@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('NQN','Nicolas', 'Sanchez', '+54','11', 'xxxx-xxxx','ivanaasanchezz-1200@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('NQN','Nicolas', 'Zalasar', '+54','11', 'xxxx-xxxx','ivanaaita-1001@yopmail.com', true, 'auxiliar', false); 

-----------------------------------------------------------------------------------------------------
--SLA

INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido,codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('SLA','Mariano', 'Costa', '+1','xxxx','xx-xxxx-xxxx','marianoelbujo-5938@yopmail.com', true, 'auxiliar', true);
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('SLA','Mariano', 'Cabello', '+1','xxxx','xx-xxxx-xxxx','marianoelanou-9217@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('SLA','Mariano', 'Carpio', '+1','xxxx','xx-xxxx-xxxx','marianolmu-8518@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('SLA','Mariano', 'Perea', '+1','xxxx','xx-xxxx-xxxx','marianouffaja-4689@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('SLA','Mariano', 'Ibrahim', '+54','11', 'xxxx-xxxx','marianoadeiju-8796@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('SLA','Mariano', 'Carretero', '+54','11', 'xxxx-xxxx','marianolnanoiteu-3825@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('SLA','Mariano', 'Villar', '+1','xxxx','xx-xxxx-xxxx','marianoeufeigro-8875@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('SLA','Mariano', 'Ayuso', '+1','xxxx','xx-xxxx-xxxx','marianoteu-2550@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('SLA','Mariano', 'Vaquero', '+52','xxxx' , 'xx-xxxx-xxxx','marianolu-3518@yopmail.com', true, 'piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('SLA', 'Mariano', 'Moral', '+54','11', 'xxxx-xxxx','marianoelppepe-2971@yopmail.com', true, 'piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('SLA','Mariano', 'Acedo', '+54','11', 'xxxx-xxxx','marianoele-1727@yopmail.com', true, 'piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('SLA','Mariano', 'Lopez', '+1','xxxx','xx-xxxx-xxxx','marianoelgejeki-3643@yopmail.com', true, 'co-piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('SLA', 'Mariano', 'Nieto', '+54','11', 'xxxx-xxxx','marianole-1738@yopmail.com', true, 'co-piloto', true);



INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('SLA','Matias', 'Sole', '+1','xxxx','xx-xxxx-xxxx','matiastinaemmeme-2270@yopmail.com', true, 'co-piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('SLA','Matias', 'Barrios', '+52','xxxx' , 'xx-xxxx-xxxx','matiaseawouprore-3805@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('SLA','Matias', 'Osorio', '+52','xxxx' , 'xx-xxxx-xxxx','amatiasinaeque-3909@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo)
VALUES ('SLA','Matias', 'Soto', '+52','xxxx' , 'xx-xxxx-xxxx','matiasecoimou-1195@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('SLA','Matias', 'Cervera', '+1','xxxx','xx-xxxx-xxxx','amatiasni-4457@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('SLA','Matias', 'Juarez', '+1','xxxx','xx-xxxx-xxxx','amatiasei-5260@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('SLA','Matias', 'Saez', '+1','xxxx','xx-xxxx-xxxx','matiasyeiba-3073@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('SLA','Matias', 'Sanchez', '+1','xxxx','xx-xxxx-xxxx','amatias687@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('SLA','Matias', 'Lopez', '+1','xxxx','xx-xxxx-xxxx','matiasleka-7067@yopmail.com', true, 'auxiliar', true);
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('SLA','Matias', 'Mata', '+1','xxxx','xx-xxxx-xxxx','matiasaelaolemmau-4297@yopmail.com', true, 'auxiliar', true); 

INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('SLA','Alan', 'Sosa', '+1','xxxx','xx-xxxx-xxxx','alanecacou-8525@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('SLA','Alan', 'Domiguez', '+1','xxxx','xx-xxxx-xxxx','falanneisi-8259@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('SLA','Alan', 'Parra', '+54','11', 'xxxx-xxxx','alaneunni-6838@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('SLA','Alan', 'Ramirez', '+54','11', 'xxxx-xxxx','alanlviodiva-5537@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('SLA','Alan', 'Fernandez', '+54','11', 'xxxx-xxxx','alanwe-1892@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('SLA','Alan', 'Castañeda', '+1','xxxx','xx-xxxx-xxxx','alan8841@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('SLA','Alan', 'Zapata', '+52','xxxx' , 'xx-xxxx-xxxx','alanfricu-4086@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('SLA','Alan', 'Carballo', '+54','11', 'xxxx-xxxx','alaneanci-6556@yopmail.com', true, 'auxiliar', false);  
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('SLA','Alan', 'Ureña', '+1','xxxx','xx-xxxx-xxxx','alanma-6449@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('SLA','Alan', 'Guirao', '+1','xxxx','xx-xxxx-xxxx','alannlisa-7593@yopmail.com', true, 'auxiliar', true); 

INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('SLA','Santiago', 'Frances', '+54','11', 'xxxx-xxxx','santiagofrige-9425@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('SLA','Santiago', 'Fabra', '+54','11', 'xxxx-xxxx','isantiago212@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('SLA','Santiago', 'Bermudes', '+54','11', 'xxxx-xxxx','isantiagofon-1211@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('SLA','Santiago', 'Rodriguez', '+54','11', 'xxxx-xxxx','santiagooenny-1021@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('SLA','Santiago', 'Lopez', '+54','11', 'xxxx-xxxx','santiagoez-2211@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('SLA','Santiago', 'Sosa', '+54','11', 'xxxx-xxxx','santiagoesaoilo--2301@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('SLA','Santiago', 'Ezquierdoz', '+54','11', 'xxxx-xxxx','santiagosaloelcali-1221@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('SLA','Santiago', 'Gomez', '+54','11', 'xxxx-xxxx','santiagoanesacha-1223@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('SLA','Santiago', 'Sanchez', '+54','11', 'xxxx-xxxx','santiagoanchezz-1200@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('SLA','Santiago', 'Zalasar', '+54','11', 'xxxx-xxxx','isantiagoita-1001@yopmail.com', true, 'auxiliar', false); 

-----------------------------------------------------------------------------------------------------
--PSS

INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido,codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('PSS','Melanie', 'Costa', '+1','xxxx','xx-xxxx-xxxx','melelbujo-5938@yopmail.com', true, 'auxiliar', true);
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('PSS','Melanie', 'Cabello', '+1','xxxx','xx-xxxx-xxxx','meloelanou-9217@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('PSS','Melanie', 'Carpio', '+1','xxxx','xx-xxxx-xxxx','melnolmu-8518@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('PSS','Melanie', 'Perea', '+1','xxxx','xx-xxxx-xxxx','melouffaja-4689@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('PSS','Melanie', 'Ibrahim', '+54','11', 'xxxx-xxxx','meloadeiju-8796@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('PSS','Melanie', 'Carretero', '+54','11', 'xxxx-xxxx','melanoiteu-3825@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('PSS','Melanie', 'Villar', '+1','xxxx','xx-xxxx-xxxx','meloeufeigro-8875@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('PSS','Melanie', 'Ayuso', '+1','xxxx','xx-xxxx-xxxx','meloteu-2550@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('PSS','Melanie', 'Vaquero', '+52','xxxx' , 'xx-xxxx-xxxx','melnolu-3518@yopmail.com', true, 'piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('PSS', 'Melanie', 'Moral', '+54','11', 'xxxx-xxxx','mellppepe-2971@yopmail.com', true, 'piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('PSS', 'Melanie', 'Acedo', '+54','11', 'xxxx-xxxx','meloele-1727@yopmail.com', true, 'piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('PSS','Melanie', 'Lopez', '+1','xxxx','xx-xxxx-xxxx','meloelgejeki-3643@yopmail.com', true, 'co-piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('PSS', 'Melanie', 'Nieto', '+54','11', 'xxxx-xxxx','melole-1738@yopmail.com', true, 'co-piloto', true);



INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('PSS','Joaco', 'Sole', '+1','xxxx','xx-xxxx-xxxx','joacostinaemmeme-2270@yopmail.com', true, 'co-piloto', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('PSS','Joaco', 'Barrios', '+52','xxxx' , 'xx-xxxx-xxxx','joacoiaseawouprore-3805@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('PSS','Joaco', 'Osorio', '+52','xxxx' , 'xx-xxxx-xxxx','ajoacoaeque-3909@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo)
VALUES ('PSS','Joaco', 'Soto', '+52','xxxx' , 'xx-xxxx-xxxx','joacooimou-1195@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('PSS','Joaco', 'Cervera', '+1','xxxx','xx-xxxx-xxxx','joaconi-4457@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('PSS','Joaco', 'Juarez', '+1','xxxx','xx-xxxx-xxxx','ajoacosei-5260@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('PSS','Joaco', 'Saez', '+1','xxxx','xx-xxxx-xxxx','joacoeiba-3073@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('PSS','Joaco', 'Sanchez', '+1','xxxx','xx-xxxx-xxxx','joaco7@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('PSS','Joaco', 'Lopez', '+1','xxxx','xx-xxxx-xxxx','joacoleka-7067@yopmail.com', true, 'auxiliar', true);
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('PSS','Joaco', 'Mata', '+1','xxxx','xx-xxxx-xxxx','joacoaelaolemmau-4297@yopmail.com', true, 'auxiliar', true); 

INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('PSS','Juliana', 'Sosa', '+1','xxxx','xx-xxxx-xxxx','ajulianaacou-8525@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('PSS','Juliana', 'Domiguez', '+1','xxxx','xx-xxxx-xxxx','julianai-8259@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('PSS','Juliana', 'Parra', '+54','11', 'xxxx-xxxx','juliananni-6838@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('PSS','Juliana', 'Ramirez', '+54','11', 'xxxx-xxxx','julianadiva-5537@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('PSS','Juliana', 'Fernandez', '+54','11', 'xxxx-xxxx','julianawe-1892@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('PSS','Juliana', 'Castañeda', '+1','xxxx','xx-xxxx-xxxx','juliana841@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('PSS','Juliana', 'Zapata', '+52','xxxx' , 'xx-xxxx-xxxx','julianaicu-4086@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('PSS','Juliana', 'Carballo', '+54','11', 'xxxx-xxxx','julianaci-6556@yopmail.com', true, 'auxiliar', false);  
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('PSS','Juliana', 'Ureña', '+1','xxxx','xx-xxxx-xxxx','juliana-6449@yopmail.com', true, 'auxiliar', true); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('PSS','Juliana', 'Guirao', '+1','xxxx','xx-xxxx-xxxx','julianaisa-7593@yopmail.com', true, 'auxiliar', true); 

INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('PSS','Marianela', 'Frances', '+54','11', 'xxxx-xxxx','marianelaige-9425@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('PSS','Marianela', 'Fabra', '+54','11', 'xxxx-xxxx','marianelaago212@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('PSS','Marianela', 'Bermudes', '+54','11', 'xxxx-xxxx','marianelagofon-1211@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('PSS','Marianela', 'Rodriguez', '+54','11', 'xxxx-xxxx','samarianelaiagooenny-1021@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('PSS','Marianela', 'Lopez', '+54','11', 'xxxx-xxxx','marianelaoez-2211@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('PSS','Marianela', 'Sosa', '+54','11', 'xxxx-xxxx','marianelaoesaoilo--2301@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('PSS','Marianela', 'Ezquierdoz', '+54','11', 'xxxx-xxxx','marianelagosaloelcali-1221@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('PSS','Marianela', 'Gomez', '+54','11', 'xxxx-xxxx','marianelaanesacha-1223@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('PSS','Marianela', 'Sanchez', '+54','11', 'xxxx-xxxx','marianelaanchezz-1200@yopmail.com', true, 'auxiliar', false); 
INSERT INTO personal (Aeropuerto_codIATA, nombre,apellido, codPais,codArea, nroContacto, mail, documentacionEnOrden, posicion, activo) 
VALUES ('PSS','Marianela', 'Zalasar', '+54','11', 'xxxx-xxxx','marianelaoita-1001@yopmail.com', true, 'auxiliar', false); 


INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-aaz','PMY', 'Boeing 737 - 700',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-aba','REL', 'Boeing 737 - 700',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-abb','RCU', 'Boeing 737 - 700',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-abd','RCU', 'Boeing 737 - 700',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-abe','COR', 'Boeing 737 - 700',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-abf','CNQ', 'Boeing 737 - 700',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-abg','OYA', 'Boeing 737 - 700',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-abh','AOL', 'Boeing 737 - 700',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-abi','COC', 'Boeing 737 - 700',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-cbi','ROS', 'Boeing 737 - 700',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-dbd','RES', 'Boeing 737 - 700',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-dbi','NQN', 'Boeing 737 - 700',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-baz','AEP', 'Boeing 737 - 700',70,10000,true,true,'2022-05-20');



INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-bcc','AEP','Boeing 737 – 800',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-dbp','RES','Boeing 737 – 800',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-dbq','NQN','Boeing 737 – 800',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-ccc','ROS','Boeing 737 – 800',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-abj','COC','Boeing 737 – 800',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-abk','PRA','Boeing 737 – 800',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-abm','FMA','Boeing 737 – 800',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-abr','JUJ','Boeing 737 – 800',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-abu','GPO','Boeing 737 – 800',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-abw','RSA','Boeing 737 – 800',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-abx','IRJ','Boeing 737 – 800',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-abz','LGS','Boeing 737 – 800',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-aca','MDZ','Boeing 737 – 800',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-acc','AFA','Boeing 737 – 800',70,10000,true,true,'2022-05-20');

INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-acn','GNR','Airbus 330-200 8',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-acp','VDM','Airbus 330-200 8',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-acq','SLA','Airbus 330-200 8',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-acr','TTG','Airbus 330-200 8',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-act','UAQ','Airbus 330-200 8',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-acu','RLO','Airbus 330-200 8',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-bcn','AEP','Airbus 330-200 8',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-ccn','ROS','Airbus 330-200 8',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-dcn','RES','Airbus 330-200 8',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-dcs','NQN','Airbus 330-200 8',70,10000,true,true,'2022-05-20');

INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-ddf','RES', 'Airbus A320-251N',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-ddj','NQN', 'Airbus A320-251N',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-cdj','ROS', 'Airbus A320-251N',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-bdj','AEP', 'Airbus A320-251N',70,10000,true,true,'2022-05-20');                                                        
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-acv','LUQ', 'Airbus A320-251N',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-acw','VME', 'Airbus A320-251N',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-acx','VME', 'Airbus A320-251N',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-adb','RYO', 'Airbus A320-251N',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-adc','RGL', 'Airbus A320-251N',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-adf','RES', 'Airbus A320-251N',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-adg','RHD', 'Airbus A320-251N',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-adh','RGA', 'Airbus A320-251N',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-adi','USH', 'Airbus A320-251N',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-adj','AEP', 'Airbus A320-251N',70,10000,true,true,'2022-05-20');
                                                                                                                                                                
													   
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-bdt','AEP','Boeing 737-800 NG',70,10000,true,true,'2022-05-20');										
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-cdt','ROS','Boeing 737-800 NG',70,10000,true,true,'2022-05-20');								   
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-ddk','RES','Boeing 737-800 NG',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-ddp','NQN','Boeing 737-800 NG',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-ddq','NQN','Boeing 737-800 NG',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-acd','AFA','Boeing 737 MAX 8',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-ace','PSS','Boeing 737 MAX 8',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-acf','FMA','Boeing 737 MAX 8',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-acg','IGR','Boeing 737 MAX 8',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-ach','IGR','Boeing 737 MAX 8',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-aci','CUT','Boeing 737 MAX 8',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-acj','EZE','Boeing 737 MAX 8',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-ack','NQN','Boeing 737 MAX 8',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-acl','BRC','Boeing 737 MAX 8',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-acm','CPC','Boeing 737 MAX 8',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-bcd','AEP','Boeing 737 MAX 8',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-ccm','ROS','Boeing 737 MAX 8',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-dcd','RES','Boeing 737 MAX 8',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-dci','NQN','Boeing 737 MAX 8',70,10000,true,true,'2022-05-20');



INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-adk','RES', 'Embraer 190',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-dam','NQN', 'Embraer 190',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-caa','ROS', 'Embraer 190',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-baf','AEP', 'Embraer 190',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-aab','AEP', 'Embraer 190',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-aag','EZE', 'Embraer 190',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-aah','JNI', 'Embraer 190',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-aak','EZE', 'Embraer 190',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-aal','BHI', 'Embraer 190',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-aar','JNI', 'Embraer 190',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-aap','NEC', 'Embraer 190',70,10000,true,true,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-aaq','MDQ', 'Embraer 190',70,10000,true,false,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-aau','STT', 'Embraer 190',70,10000,true,false,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-aas','TDL', 'Embraer 190',70,10000,true,false,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-aat','VGL', 'Embraer 190',70,10000,true,false,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-aav','CTC', 'Embraer 190',70,10000,true,false,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-aaw','EZE', 'Embraer 190',70,10000,true,false,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-aax','RES', 'Embraer 190',70,10000,true,false,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-aay','CRD', 'Embraer 190',70,10000,true,false,'2022-05-20');
INSERT INTO aeronave ( matricula, Aeropuerto_codIATA, modeloAeronave,capacidadReal,kmRecorridos,autorizado,activo,ultimoMantenimiento) VALUES ('LV-abl','EQS', 'Embraer 190',70,10000,true,false,'2022-05-20');








INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (7,false,false,false,'35:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (8,false,false,false,'45:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (9,true,true,true,'34:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (10,true,true,false,'31:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (11,true,false,true,'17:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (12,false,false,false,'32:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (13,false,false,false,'40:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (14,false,true,true,'36:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (15,false,false,false,'17:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (16,false,false,false,'12:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (17,false,false,false,'35:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (18,false,false,false,'43:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (19,false,false,false,'18:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (20,false,false,false,'45:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (21,false,false,false,'21:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (22,false,false,false,'18:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (23,false,false,false,'34:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (24,false,false,false,'25:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (25,false,false,false,'21:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (26,false,false,false,'36:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (27,false,false,false,'34:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (28,false,false,false,'49:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (29,false,false,false,'29:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (30,false,false,false,'17:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (31,false,false,false,'25:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (32,false,false,false,'44:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (33,false,false,false,'13:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (34,false,false,false,'48:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (35,false,false,false,'23:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (36,false,false,false,'36:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (37,false,false,false,'19:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (38,false,false,false,'25:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (39,false,false,false,'19:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (40,false,false,false,'15:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (41,false,false,false,'34:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (42,false,false,false,'46:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (43,false,false,false,'26:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (44,false,false,false,'37:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (45,false,false,false,'17:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (46,false,false,false,'12:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (47,false,false,false,'50:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (48,false,true,false,'39:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (49,false,false,true,'24:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (50,true,true,true,'44:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (51,false,false,false,'26:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (52,false,false,false,'26:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (53,false,false,false,'11:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (54,false,false,false,'37:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (55,false,false,false,'44:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (56,false,false,false,'45:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (57,false,false,false,'28:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (58,false,false,false,'22:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (59,false,false,false,'13:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (60,false,false,false,'38:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (61,true,true,true,'42:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (62,true,true,false,'16:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (63,true,false,true,'20:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (64,false,false,false,'15:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (65,false,false,false,'42:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (66,false,false,false,'18:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (67,false,false,false,'25:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (68,false,false,false,'26:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (69,false,false,false,'26:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (70,true,true,true,'41:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (71,true,false,true,'50:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (72,false,true,true,'36:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (73,false,false,false,'12:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (74,false,false,false,'23:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (75,false,false,false,'50:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (76,false,false,false,'18:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (77,false,false,false,'15:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (78,false,false,false,'40:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (79,true,true,true,'10:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (80,true,true,true,'26:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (81,true,true,false,'30:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (82,false,false,false,'49:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (83,false,false,false,'21:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (84,false,false,false,'31:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (85,false,false,false,'35:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (86,false,false,false,'29:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (87,false,false,false,'33:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (88,false,false,false,'13:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (89,false,false,false,'40:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (90,false,false,false,'12:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (91,false,false,false,'40:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (92,true,true,true,'35:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (93,true,false,true,'30:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (94,true,true,true,'15:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (95,false,false,false,'10:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (96,false,false,false,'38:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (97,false,false,false,'16:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (98,true,false,true,'48:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (99,true,true,true,'11:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (100,false,false,false,'47:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (101,false,false,false,'12:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (102,false,false,false,'24:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (103,false,false,false,'36:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (104,false,false,false,'45:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (105,false,false,false,'49:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (106,false,false,false,'50:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (107,false,false,false,'22:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (108,false,false,false,'30:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (109,false,false,false,'46:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (110,false,false,false,'25:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (111,false,false,false,'44:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (112,false,false,false,'49:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (113,false,false,false,'30:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (114,false,false,false,'49:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (115,true,true,true,'20:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (116,true,true,true,'47:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (117,true,true,true,'17:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (118,true,true,false,'36:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (119,false,false,false,'29:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (120,false,false,false,'26:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (121,false,false,false,'16:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (122,false,false,false,'16:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (123,false,false,false,'39:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (124,false,false,false,'38:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (125,false,false,false,'11:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (126,false,false,false,'39:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (127,false,false,false,'41:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (128,false,false,false,'39:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (129,false,false,false,'34:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (130,false,false,false,'44:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (131,false,false,false,'15:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (132,false,false,false,'15:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (133,false,false,false,'40:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (134,false,false,false,'31:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (135,true,true,true,'31:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (136,true,false,true,'11:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (137,true,true,true,'26:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (138,false,false,false,'33:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (139,false,false,false,'32:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (140,false,false,false,'21:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (141,true,false,true,'50:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (142,true,true,true,'45:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (143,false,false,false,'14:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (144,false,false,false,'40:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (145,false,false,false,'38:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (146,false,false,false,'28:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (147,false,false,false,'10:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (148,false,false,false,'33:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (149,false,false,false,'38:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (150,false,false,false,'20:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (151,false,false,false,'37:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (152,false,false,false,'27:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (153,false,false,false,'35:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (154,false,false,false,'42:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (155,false,false,false,'48:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (156,false,false,false,'37:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (157,false,false,false,'29:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (158,true,true,true,'19:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (159,true,true,true,'22:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (160,true,false,true,'10:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (161,true,true,true,'19:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (162,false,false,false,'24:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (163,false,false,false,'47:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (164,false,false,false,'20:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (165,false,false,false,'28:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (166,false,false,false,'18:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (167,false,false,false,'28:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (168,false,false,false,'34:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (169,false,false,false,'37:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (170,false,false,false,'30:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (171,false,false,false,'45:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (172,false,false,false,'25:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (173,false,false,false,'43:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (174,false,false,false,'40:00:00'); 
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (175,false,false,false,'25:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (176,false,false,false,'36:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (177,false,false,false,'38:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (178,true,true,true,'47:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (179,true,true,false,'18:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (180,true,true,true,'14:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (181,false,false,false,'29:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (182,false,false,false,'40:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (183,false,false,false,'47:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (184,false,false,false,'29:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (185,false,false,false,'21:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (186,false,false,false,'21:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (187,false,false,false,'28:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (188,false,false,false,'10:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (189,false,false,false,'11:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (190,false,false,false,'39:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (191,false,false,false,'22:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (192,false,false,false,'10:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (193,false,false,false,'39:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (194,false,false,false,'15:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (195,false,false,false,'28:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (196,false,false,false,'21:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (197,false,false,false,'37:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (198,false,false,false,'19:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (199,false,false,false,'15:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (200,false,false,false,'10:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (201,false,false,false,'34:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (202,false,false,false,'27:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (203,false,false,false,'50:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (204,false,false,false,'35:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (205,false,false,false,'27:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (206,false,false,false,'45:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (207,false,false,false,'34:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (208,false,false,false,'12:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (209,false,false,false,'46:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (210,false,false,false,'19:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (211,false,false,false,'13:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (212,false,false,false,'32:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (213,false,false,false,'33:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (214,false,false,false,'49:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (215,false,false,false,'13:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (216,false,false,false,'48:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (217,false,false,false,'17:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (218,false,false,false,'34:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (219,false,false,false,'26:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (220,false,false,false,'30:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (221,true,true,true,'50:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (222,true,true,true,'25:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (223,true,true,true,'49:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (224,false,false,false,'42:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (225,false,false,false,'25:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (226,false,false,false,'30:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (227,false,false,false,'42:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (228,false,false,false,'25:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (229,false,false,false,'16:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (230,false,false,false,'24:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (231,false,false,false,'41:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (232,false,false,false,'34:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (233,false,false,false,'14:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (234,false,false,false,'49:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (235,false,false,false,'33:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (236,false,false,false,'16:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (237,false,false,false,'32:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (238,false,false,false,'42:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (239,false,false,false,'44:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (240,false,false,false,'46:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (241,false,false,false,'44:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (242,false,false,false,'46:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (243,false,false,false,'35:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (244,false,false,false,'25:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (245,false,false,false,'31:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (246,false,false,false,'42:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (247,false,false,false,'38:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (248,false,false,false,'21:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (249,false,false,false,'42:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (250,false,false,false,'30:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (251,false,false,false,'34:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (252,false,false,false,'11:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (253,false,false,false,'22:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (254,false,false,false,'44:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (255,false,false,false,'44:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (256,false,false,false,'15:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (257,false,false,false,'36:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (258,false,false,false,'38:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (259,false,false,false,'23:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (260,false,false,false,'44:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (261,false,false,false,'19:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (262,false,false,false,'49:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (263,false,false,false,'17:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (264,true,true,true,'48:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (265,true,true,true,'38:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (266,true,true,true,'42:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (267,false,false,false,'19:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (268,false,false,false,'47:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (269,false,false,false,'18:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (270,false,false,false,'46:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (271,false,false,false,'45:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (272,false,false,false,'23:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (273,false,false,false,'38:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (274,false,false,false,'17:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (275,false,false,false,'10:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (276,false,false,false,'50:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (277,false,false,false,'33:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (278,false,false,false,'24:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (279,false,false,false,'34:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (280,false,false,false,'21:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (281,false,false,false,'22:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (282,false,false,false,'34:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (283,false,false,false,'32:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (284,false,false,false,'32:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (285,false,false,false,'25:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (286,false,false,false,'24:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (287,false,false,false,'32:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (288,false,false,false,'47:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (289,false,false,false,'45:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (290,false,false,false,'28:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (291,false,false,false,'26:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (292,false,false,false,'21:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (293,false,false,false,'40:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (294,false,false,false,'10:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (295,false,false,false,'48:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (296,false,false,false,'26:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (297,false,false,false,'25:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (298,false,false,false,'10:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (299,false,false,false,'49:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (300,false,false,false,'19:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (301,false,false,false,'47:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (302,false,false,false,'32:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (303,false,false,false,'46:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (304,false,false,false,'16:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (305,false,false,false,'21:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (306,false,false,false,'17:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (307,true,true,true,'35:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (308,true,true,true,'32:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (309,true,true,true,'14:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (310,false,false,false,'49:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (311,false,false,false,'25:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (312,false,false,false,'11:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (313,false,false,false,'41:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (314,false,false,false,'24:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (315,false,false,false,'14:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (316,false,false,false,'48:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (317,false,false,false,'46:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (318,false,false,false,'13:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (319,false,false,false,'30:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (320,false,false,false,'19:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (321,false,false,false,'13:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (322,false,false,false,'30:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (323,false,false,false,'31:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (324,false,false,false,'48:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (325,false,false,false,'14:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (326,false,false,false,'24:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (327,false,false,false,'12:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (328,false,false,false,'14:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (329,false,false,false,'28:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (330,false,false,false,'12:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (331,false,false,false,'27:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (332,false,false,false,'37:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (333,false,false,false,'22:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (334,false,false,false,'22:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (335,false,false,false,'50:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (336,false,false,false,'10:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (337,false,false,false,'19:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (338,false,false,false,'35:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (339,false,false,false,'22:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (340,false,false,false,'31:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (341,false,false,false,'21:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (342,false,false,false,'23:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (343,false,false,false,'31:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (344,false,false,false,'23:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (345,false,false,false,'31:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (346,false,false,false,'33:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (347,false,false,false,'44:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (348,false,false,false,'17:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (349,false,false,false,'21:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (350,true,true,false,'19:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (351,true,true,true,'33:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (352,true,false,true,'30:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (353,false,false,false,'36:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (354,false,false,false,'23:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (355,false,false,false,'47:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (356,false,false,false,'32:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (357,false,false,false,'46:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (358,false,false,false,'13:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (359,false,false,false,'25:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (360,false,false,false,'32:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (361,false,false,false,'28:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (362,false,false,false,'17:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (363,false,false,false,'13:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (364,false,false,false,'50:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (365,false,false,false,'11:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (366,false,false,false,'20:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (367,false,false,false,'36:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (368,false,false,false,'28:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (369,false,false,false,'16:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (370,false,false,false,'37:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (371,false,false,false,'30:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (372,false,false,false,'22:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (373,false,false,false,'14:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (374,false,false,false,'12:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (375,false,false,false,'38:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (376,false,false,false,'30:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (377,false,false,false,'11:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (378,false,false,false,'49:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (379,false,false,false,'44:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (380,false,false,false,'27:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (381,false,false,false,'16:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (382,false,false,false,'25:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (383,false,false,false,'21:00:00');
INSERT INTO documentaciontripulacion (idpersonal_fk,licenciapiloto,permisosifr,permisosvfr,horasdevuelo) VALUES (384,false,false,false,'22:00:00');


/*
--MantenimientoINSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-aaa','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-aab','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-aac','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-aad','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-aae','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-aaf','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-aag','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-aah','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-aai','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-aaj','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-aak','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-aal','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-aam','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-aan','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-aao','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-aap','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-aaq','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-aar','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-aas','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-aat','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-aau','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-aav','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-aaw','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-aax','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-aay','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-aaz','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-aba','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-abb','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-abc','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-abd','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-abe','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-abf','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-abg','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-abh','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-abi','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-abj','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-abk','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-abl','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-abm','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-abn','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-abo','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-abp','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-abq','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-abr','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-abs','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-abt','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-abu','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-abv','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-abw','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-abx','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-aby','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-abz','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-aca','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-acb','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-acc','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-acd','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-ace','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-acf','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-acg','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-ach','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-aci','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-acj','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-ack','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-acl','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-acm','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-acn','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-aco','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-acp','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-acq','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-acr','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-acs','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-act','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-acu','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-acv','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-acw','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-acx','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-acy','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-acz','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-ada','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-adb','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-adc','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-add','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-ade','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-adf','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-adg','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-adh','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-adi','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-adj','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-adk','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-adl','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-adm','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-adn','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-ado','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-adp','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-adq','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-adr','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-ads','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
INSERT INTO mantenimiento (matriculaFK, nombre_mantenimiento,descripcion_mantenimiento,fechaDeRealizacion) VALUES ('LV-adt','Primer Mantenimiento','Se reviso el motor por completo y se controlo que todo funcione correctamente.', '2022-05-07');
*/
--Usuario
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (1, 'user 1', 'pass 1', true, '2022-01-02'); 
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (2, 'user 2', 'pass 2', true, '2021-02-02');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (3, 'user 3', 'pass 3', true, '2017-03-02');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (4, 'user 4', 'pass 4', true, '2022-05-22'); 
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (5, 'user 5', 'pass 5', true, '2016-05-12');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (6, 'user 6', 'pass 6', true, '2022-05-12');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (7, 'user 7', 'pass 7', true, '2022-03-02');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (8, 'user 8', 'pass 8', true, '2022-04-02'); 
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (15, 'user 15', 'pass 15', true, '2016-04-04');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (16, 'user 16', 'pass 16', true, '2015-05-03');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (17, 'user 17', 'pass 17', true, '2014-06-02');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (18, 'user 18', 'pass 18', true, '2013-07-03');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (19, 'user 19', 'pass 19', true, '2012-08-02'); 
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (26, 'user 26', 'pass 26', true, '2012-09-01'); 
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (27, 'user 27', 'pass 27', true, '2020-02-02');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (28, 'user 28', 'pass 28', true, '2021-02-02');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (29, 'user 29', 'pass 29', true, '2020-03-02');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (30, 'user 30', 'pass 30', true, '2020-04-02'); 
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (31, 'user 31', 'pass 31', true, '2012-05-02');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (32, 'user 32', 'pass 32', true, '2021-05-02');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (33, 'user 33', 'pass 33', true, '2022-05-12');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (34, 'user 34', 'pass 34', true, '2020-05-22'); 
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (35, 'user 35', 'pass 35', true, '2020-05-12');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (36, 'user 36', 'pass 36', true, '2020-05-04');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (37, 'user 37', 'pass 37', true, '2020-05-05');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (38, 'user 38', 'pass 38', true, '2022-05-06');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (39, 'user 39', 'pass 39', true, '2022-05-07'); 
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (40, 'user 40', 'pass 40', true, '2022-05-09');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (41, 'user 41', 'pass 41', true, '2021-05-08');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (42, 'user 42', 'pass 42', true, '2021-05-02');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (43, 'user 43', 'pass 43', true, '2021-05-02');

 
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (44,'user 44','pass 44',true,'2022-01-01');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (45,'user 45','pass 45',true,'2022-01-02');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (46,'user 46','pass 46',true,'2022-01-03');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (47,'user 47','pass 47',true,'2022-01-04');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (53,'user 53','pass 53',true,'2022-01-05');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (54,'user 54','pass 54',true,'2022-01-06');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (55,'user 55','pass 55',true,'2022-01-07');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (56,'user 56','pass 56',true,'2022-01-08');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (57,'user 57','pass 57',true,'2022-01-09');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (58,'user 58','pass 58',true,'2022-01-10');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (59,'user 59','pass 59',true,'2022-01-11');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (60,'user 60','pass 60',true,'2022-01-12');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (66,'user 66','pass 66',true,'2022-01-13');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (67,'user 67','pass 67',true,'2022-01-14');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (68,'user 68','pass 68',true,'2022-01-15');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (69,'user 69','pass 69',true,'2022-01-16');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (75,'user 75','pass 75',true,'2022-01-17');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (76,'user 76','pass 76',true,'2022-01-18');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (77,'user 77','pass 77',true,'2022-01-19');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (78,'user 78','pass 78',true,'2022-01-20');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (84,'user 84','pass 84',true,'2022-01-21');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (85,'user 85','pass 85',true,'2022-01-22');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (86,'user 86','pass 86',true,'2022-01-23');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (87,'user 87','pass 87',true,'2022-01-24');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (88,'user 88','pass 88',true,'2022-01-25');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (89,'user 89','pass 89',true,'2022-01-26');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (90,'user 90','pass 90',true,'2022-01-27');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (91,'user 91','pass 91',true,'2022-01-28');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (100,'user 100','pass 100',true,'2022-02-02');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (101,'user 101','pass 101',true,'2022-02-02');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (102,'user 102','pass 102',true,'2022-02-02');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (103,'user 103','pass 103',true,'2022-03-02');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (104,'user 104','pass 104',true,'2022-04-02');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (105,'user 105','pass 105',true,'2022-05-02');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (106,'user 106','pass 106',true,'2022-06-02');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (107,'user 107','pass 107',true,'2022-07-02');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (108,'user 108','pass 108',true,'2022-08-02');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (111,'user 111','pass 111',true,'2022-09-02');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (112,'user 112','pass 112',true,'2022-10-02');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (113,'user 113','pass 113',true,'2022-11-02');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (114,'user 114','pass 114',true,'2022-12-02');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (119,'user 119','pass 119',true,'2022-01-01');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (120,'user 120','pass 120',true,'2022-02-01');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (121,'user 121','pass 121',true,'2022-03-01');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (122,'user 122','pass 122',true,'2022-04-01');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (123,'user 123','pass 123',true,'2022-05-01');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (124,'user 124','pass 124',true,'2022-06-01');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (125,'user 125','pass 125',true,'2022-07-01');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (126,'user 126','pass 126',true,'2022-08-01');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (127,'user 127','pass 127',true,'2022-09-01');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (128,'user 128','pass 128',true,'2022-10-01');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (129,'user 129','pass 129',true,'2022-11-01');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (130,'user 130','pass 130',true,'2022-12-01');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (131,'user 131','pass 131',true,'2022-01-12');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (132,'user 132','pass 132',true,'2022-11-12');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (133,'user 133','pass 133',true,'2022-02-12');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (134,'user 134','pass 134',true,'2022-03-12');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (143,'user 143','pass 143',true,'2022-04-12');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (144,'user 144','pass 144',true,'2022-05-12');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (145,'user 145','pass 145',true,'2022-06-12');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (146,'user 146','pass 146',true,'2022-07-12');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (147,'user 147','pass 147',true,'2022-08-12');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (148,'user 148','pass 148',true,'2022-09-12');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (149,'user 149','pass 149',true,'2022-01-22');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (150,'user 150','pass 150',true,'2022-02-22');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (151,'user 151','pass 151',true,'2022-03-22');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (154,'user 154','pass 154',true,'2022-04-22');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (155,'user 155','pass 155',true,'2022-05-22');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (156,'user 156','pass 156',true,'2022-06-22');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (157,'user 157','pass 157',true,'2022-07-22');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (162,'user 162','pass 162',true,'2022-08-22');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (163,'user 163','pass 163',true,'2022-09-22');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (164,'user 164','pass 164',true,'2022-10-22');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (165,'user 165','pass 165',true,'2022-11-22');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (166,'user 166','pass 166',true,'2022-12-22');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (167,'user 167','pass 167',true,'2020-01-06');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (168,'user 168','pass 168',true,'2021-01-09');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (169,'user 169','pass 169',true,'2021-01-08');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (170,'user 170','pass 170',true,'2021-01-07');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (171,'user 171','pass 171',true,'2021-01-06');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (172,'user 172','pass 172',true,'2021-02-05');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (173,'user 173','pass 173',true,'2021-01-05');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (174,'user 174','pass 174',true,'2021-03-05');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (175,'user 175','pass 175',true,'2021-04-05');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (176,'user 176','pass 176',true,'2021-05-05');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (177,'user 177','pass 177',true,'2021-06-05');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (184,'user 184','pass 184',true,'2021-07-05');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (185,'user 185','pass 185',true,'2021-08-05');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (186,'user 186','pass 186',true,'2021-09-05');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (187,'user 187','pass 187',true,'2022-01-11');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (188,'user 188','pass 188',true,'2022-01-12');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (189,'user 189','pass 189',true,'2022-02-13');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (190,'user 190','pass 190',true,'2022-03-14');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (191,'user 191','pass 191',true,'2022-04-15');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (192,'user 192','pass 192',true,'2022-05-16');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (193,'user 193','pass 193',true,'2022-06-17');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (194,'user 194','pass 194',true,'2022-07-18');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (195,'user 195','pass 195',true,'2022-08-19');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (196,'user 196','pass 196',true,'2022-09-21');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (197,'user 197','pass 197',true,'2020-01-23');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (198,'user 198','pass 198',true,'2020-01-24');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (199,'user 199','pass 199',true,'2020-01-25');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (200,'user 200','pass 200',true,'2020-01-26');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (201,'user 201','pass 201',true,'2020-01-27');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (202,'user 202','pass 202',true,'2020-01-02');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (203,'user 203','pass 203',true,'2020-01-02');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (204,'user 204','pass 204',true,'2020-01-03');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (205,'user 205','pass 205',true,'2020-01-03');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (206,'user 206','pass 206',true,'2020-02-08');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (207,'user 207','pass 207',true,'2020-03-09');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (208,'user 208','pass 208',true,'2020-04-11');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (209,'user 209','pass 209',true,'2020-05-28');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (210,'user 210','pass 210',true,'2020-06-27');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (211,'user 211','pass 211',true,'2020-07-26');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (212,'user 212','pass 212',true,'2020-07-26');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (213,'user 213','pass 213',true,'2020-08-25');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (214,'user 214','pass 214',true,'2020-09-24');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (215,'user 215','pass 215',true,'2020-10-23');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (216,'user 216','pass 216',true,'2020-07-26');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (217,'user 217','pass 217',true,'2020-11-21');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (218,'user 218','pass 218',true,'2020-12-12');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (219,'user 219','pass 219',true,'2022-01-12');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (220,'user 220','pass 220',true,'2022-01-13');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (227,'user 227','pass 227',true,'2022-01-15');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (228,'user 228','pass 228',true,'2022-01-15');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (229,'user 229','pass 229',true,'2022-01-17');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (230,'user 230','pass 230',true,'2022-01-19');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (231,'user 231','pass 231',true,'2022-01-18');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (232,'user 232','pass 232',true,'2022-01-21');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (233,'user 233','pass 233',true,'2022-01-22');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (234,'user 234','pass 234',true,'2022-01-23');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (235,'user 235','pass 235',true,'2022-01-24');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (236,'user 236','pass 236',true,'2022-01-25');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (237,'user 237','pass 237',true,'2022-01-22');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (238,'user 238','pass 238',true,'2022-01-26');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (239,'user 239','pass 239',true,'2022-01-27');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (240,'user 240','pass 240',true,'2022-01-01');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (241,'user 241','pass 241',true,'2022-01-03');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (242,'user 242','pass 242',true,'2022-01-04');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (243,'user 243','pass 243',true,'2022-01-05');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (244,'user 244','pass 244',true,'2022-01-06');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (245,'user 245','pass 245',true,'2022-01-07');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (246,'user 246','pass 246',true,'2022-01-08');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (247,'user 247','pass 247',true,'2022-01-09');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (248,'user 248','pass 248',true,'2022-01-11');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (249,'user 249','pass 249',true,'2022-01-10');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (250,'user 250','pass 250',true,'2022-01-03');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (251,'user 251','pass 251',true,'2022-01-04');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (252,'user 252','pass 252',true,'2022-01-11');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (253,'user 253','pass 253',true,'2022-01-11');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (254,'user 254','pass 254',true,'2022-01-12');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (255,'user 255','pass 255',true,'2022-01-13');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (256,'user 256','pass 256',true,'2022-01-17');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (257,'user 257','pass 257',true,'2022-01-18');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (258,'user 258','pass 258',true,'2022-01-19');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (259,'user 259','pass 259',true,'2022-01-21');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (260,'user 260','pass 260',true,'2022-01-22');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (261,'user 261','pass 261',true,'2022-01-23');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (262,'user 262','pass 262',true,'2022-01-24');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (263,'user 263','pass 263',true,'2022-01-26');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (270,'user 270','pass 270',true,'2022-02-25');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (271,'user 271','pass 271',true,'2022-07-28');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (272,'user 272','pass 272',true,'2022-07-27');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (273,'user 273','pass 273',true,'2022-07-11');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (274,'user 274','pass 274',true,'2022-07-01');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (275,'user 275','pass 275',true,'2022-07-02');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (276,'user 276','pass 276',true,'2022-07-03');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (277,'user 277','pass 277',true,'2022-08-04');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (278,'user 278','pass 278',true,'2022-08-05');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (279,'user 279','pass 279',true,'2022-08-06');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (280,'user 280','pass 280',true,'2022-08-01');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (281,'user 281','pass 281',true,'2022-08-02');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (282,'user 282','pass 282',true,'2022-08-03');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (283,'user 283','pass 283',true,'2022-08-04');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (284,'user 284','pass 284',true,'2022-08-05');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (285,'user 285','pass 285',true,'2022-08-06');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (286,'user 286','pass 286',true,'2022-08-07');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (287,'user 287','pass 287',true,'2022-08-08');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (288,'user 288','pass 288',true,'2022-01-09');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (289,'user 289','pass 289',true,'2022-01-11');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (290,'user 290','pass 290',true,'2022-01-12');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (291,'user 291','pass 291',true,'2022-01-13');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (292,'user 292','pass 292',true,'2022-01-14');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (293,'user 293','pass 293',true,'2022-01-15');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (294,'user 294','pass 294',true,'2022-01-16');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (295,'user 295','pass 295',true,'2022-01-17');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (296,'user 296','pass 296',true,'2022-01-18');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (297,'user 297','pass 297',true,'2022-07-19');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (298,'user 298','pass 298',true,'2022-06-21');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (299,'user 299','pass 299',true,'2022-06-22');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (300,'user 300','pass 300',true,'2022-06-23');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (301,'user 301','pass 301',true,'2022-06-24');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (302,'user 302','pass 302',true,'2022-06-25');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (303,'user 303','pass 303',true,'2022-06-26');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (304,'user 304','pass 304',true,'2022-06-27');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (305,'user 305','pass 305',true,'2022-06-28');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (306,'user 306','pass 306',true,'2022-05-01');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (313,'user 313','pass 313',true,'2022-05-03');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (314,'user 314','pass 314',true,'2022-05-02');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (315,'user 315','pass 315',true,'2022-05-04');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (316,'user 316','pass 316',true,'2022-05-11');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (317,'user 317','pass 317',true,'2022-05-12');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (318,'user 318','pass 318',true,'2022-05-13');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (319,'user 319','pass 319',true,'2022-05-14');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (320,'user 320','pass 320',true,'2022-05-15');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (321,'user 321','pass 321',true,'2022-05-16');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (322,'user 322','pass 322',true,'2022-04-17');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (323,'user 323','pass 323',true,'2022-04-21');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (324,'user 324','pass 324',true,'2022-04-22');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (325,'user 325','pass 325',true,'2022-04-23');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (326,'user 326','pass 326',true,'2022-04-24');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (327,'user 327','pass 327',true,'2022-04-25');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (328,'user 328','pass 328',true,'2022-04-26');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (329,'user 329','pass 329',true,'2022-04-27');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (330,'user 330','pass 330',true,'2022-04-28');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (331,'user 331','pass 331',true,'2022-04-11');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (332,'user 332','pass 332',true,'2022-03-12');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (333,'user 333','pass 333',true,'2022-03-12');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (334,'user 334','pass 334',true,'2022-03-14');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (335,'user 335','pass 335',true,'2022-03-15');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (336,'user 336','pass 336',true,'2022-03-16');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (337,'user 337','pass 337',true,'2022-03-07');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (338,'user 338','pass 338',true,'2022-03-21');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (339,'user 339','pass 339',true,'2022-03-22');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (340,'user 340','pass 340',true,'2022-03-22');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (341,'user 341','pass 341',true,'2022-03-22');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (342,'user 342','pass 342',true,'2022-02-21');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (343,'user 343','pass 343',true,'2022-02-11');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (344,'user 344','pass 344',true,'2022-02-17');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (345,'user 345','pass 345',true,'2022-02-18');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (346,'user 346','pass 346',true,'2022-02-19');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (347,'user 347','pass 347',true,'2022-02-15');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (348,'user 348','pass 348',true,'2022-02-14');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (349,'user 349','pass 349',true,'2022-09-13');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (356,'user 356','pass 356',true,'2022-08-13');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (357,'user 357','pass 357',true,'2022-07-12');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (358,'user 358','pass 358',true,'2022-06-11');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (359,'user 359','pass 359',true,'2022-05-01');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (360,'user 360','pass 360',true,'2022-04-02');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (361,'user 361','pass 361',true,'2022-03-03');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (362,'user 362','pass 362',true,'2022-02-04');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (363,'user 363','pass 363',true,'2022-01-05');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (364,'user 364','pass 364',true,'2022-09-06');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (365,'user 365','pass 365',true,'2022-08-07');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (366,'user 366','pass 366',true,'2022-07-08');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (367,'user 367','pass 367',true,'2022-06-09');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (368,'user 368','pass 368',true,'2022-05-10');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (369,'user 369','pass 369',true,'2022-04-20');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (370,'user 370','pass 370',true,'2022-03-20');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (371,'user 371','pass 371',true,'2022-02-20');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (372,'user 372','pass 372',true,'2022-01-21');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (373,'user 373','pass 373',true,'2022-12-22');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (374,'user 374','pass 374',true,'2022-11-23');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (375,'user 375','pass 375',true,'2022-10-25');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (376,'user 376','pass 376',true,'2022-09-26');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (377,'user 377','pass 377',true,'2022-08-27');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (378,'user 378','pass 378',true,'2022-07-11');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (379,'user 379','pass 379',true,'2022-06-12');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (380,'user 380','pass 380',true,'2022-05-22');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (381,'user 381','pass 381',true,'2022-04-23');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (382,'user 382','pass 382',true,'2022-03-05');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (383,'user 383','pass 383',true,'2022-02-05');
INSERT INTO usuario (personal_legajo_fk,userName, pass, activo, fecha_alta) VALUES (384,'user 384','pass 384',true,'2022-01-05');


INSERT INTO planDeVuelo (
    idvuelo, codVuelo, Aeronave_matricula_fk,
     OrigenTeorico_codIATA, OrigenReal_codIATA, DestinoTeorico_codIATA,DestinoReal_codIATA, 
     nombreCompania, idEstados_fk,rutaTeorica, rutaReal, reglaDeVuelo, tipoDeVuelo, diaDespegue,
    fechaDespegueEstimado,HoraDespegueEstimado,fechaDespegueReal, horaDespegueReal,
    fechaAterrizajeEstimado,HoraAterrizajeEstimado,fechaAterrizajeReal ,horaAterrizajeReal,
    ltscombustibleEstimado, ltscombustibleReal, lubricanteEstimado,lubricanteReal, kilometrajeEstimado,kilometrajeReal, duracionEstimada,duracionReal,
    checkIn,controlCabina, totalPersonasABordo,pesoCargaOrigen,PesoCargaDestino,informado,motivoEstado, aeronavesPosibles) 
VALUES ('SF0101-202206090325','SF0101',null,'EZE',null,'CNQ',null,
'Special Flights SA',1, 'COR-COR-CNQ',null,'VFR','comun',	'viernes',
'2022-06-09','03:25',null,null,'2022-06-09',' 03:25',null,null,
170000,150000,6000,7000,11055,10000, '06:00','06:00',true,true,
178,220,140.0,true,null,null); 







INSERT INTO planDeVuelo (
    idvuelo, codVuelo, Aeronave_matricula_fk,
     OrigenTeorico_codIATA, OrigenReal_codIATA, DestinoTeorico_codIATA,DestinoReal_codIATA, 
     nombreCompania, idEstados_fk,rutaTeorica, rutaReal, reglaDeVuelo, tipoDeVuelo, diaDespegue,
    fechaDespegueEstimado,HoraDespegueEstimado,fechaDespegueReal, horaDespegueReal,
    fechaAterrizajeEstimado,HoraAterrizajeEstimado,fechaAterrizajeReal ,horaAterrizajeReal,
    ltscombustibleEstimado, ltscombustibleReal, lubricanteEstimado,lubricanteReal, kilometrajeEstimado,kilometrajeReal, duracionEstimada,duracionReal,
    checkIn,controlCabina, totalPersonasABordo,pesoCargaOrigen,PesoCargaDestino,informado,motivoEstado, aeronavesPosibles) 
VALUES ('SF0306-202006090325','SF0306','LV-dbq','NQN','NQN','EZE','ROS',
'Special Flights SA',7, 'NQN-EZE','NQN-ROS','VFR','comun',	'viernes',
'2020-06-09','03:25','2020-06-09','03:25','2020-06-09',' 10:25','2020-06-09','10:25'
170000,150000,6000,7000,11055,10000, '07:00','07:00',true,true,
178,220,140.0,true,null,null); 