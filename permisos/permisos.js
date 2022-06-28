

const devolverPermisos = (req, res) => {
    const { user, pass } = request.body;
    const permiso = obtenerPermiso(user, pass)
    switch (permiso) {
        case "SUPERVISOR":
            /*
                devolver identificacion
            
            */
            pantallaSupervisor(res);
        case "AUDITOR":
            /*
                devolver pantalla auxiliar

            */
            pantallaAuditor(res);
        case "AUXILIAR":
            pantallaAuxiliar(res);
        /*
            devolver pantalla supervisor de vuelo
            
        */
    }

    const obtenerPermiso = (usuario, contraseña) => {
        /*REALIZAR FUNCION QUE OBTIENE PERMISOS*/
        return "NoPermiso"
    }




    const pantallaAuditor = (res) => {
        /*Programar devolver auditor*/
        res.response("abuelita dime tu");

    }


    const pantallaAuxiliar = (res) => {
        /*Programar devolver auditor*/
        res.response("abuelita asdsadsadsadsadsa");
    }


    const pantallaSupervisor = (res) => {
        res.response("supervisor de vuelo ");
    }

}




