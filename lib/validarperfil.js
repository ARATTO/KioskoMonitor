//modulo que valida si tiene acceso o no a la adminstración
//Creado por José Luis Olivares
//email:joseluiss_503@hotmail.com
//Septiembre, 2019
const perfil={};

  perfil.validarAcceso=function(idPerfil){
        //root-1  admin-2
        if(idPerfil===1||idPerfil===2){
            return true; //si tiene acceso a la administración 
        }
        return false;
    }

module.exports=perfil;