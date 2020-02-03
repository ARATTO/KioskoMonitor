const { format } = require('timeago.js');
const helpers = {};

helpers.timeago = (timestamp) => {
    return format(timestamp);
};

helpers.isAdminAcciones = (idPerfil, idusuario, nombre_usuario, estado, email) => {
    let html = "";
    if (idPerfil != 1) {
        if(estado===0){ //si esta eliminado, quitamos todas las opciones
            html = html;
        }else{
            html = html + "<a href='/usuario/editarusuario/"+ idusuario + "' class='btn btn-info'>Editar</a>" + 
            `<a onclick='validarBorrado(${idusuario},"${nombre_usuario}","${email}")' class='btn btn-danger'>Borrar</a>`;
        }  
    }else{
        html = html + "<a class='btn btn-primary' disabled='disabled'>ROOT</a>";
    }
    //console.log(html);
    return html;
};

//Creando IF que compara 2 valores, Jolivares, se usa en editarusuarios.hbs
helpers.perfilSeleccionado=(usuarioIdperfil, perfilIdperfil, perfilNombre)=>{
    
    if(usuarioIdperfil == perfilIdperfil){
        return `<option value="${perfilIdperfil}" selected="selected">${perfilNombre}</option>`;
    }
    return `<option value="${perfilIdperfil}">${perfilNombre}</option>`;
};

helpers.fechaCorta=(mydate)=>{
    var f=new Date(mydate);

    return f.toLocaleString();
}

helpers.estadoUsuario=(myState)=>{
    var estado="Inactivo";
    if(myState===1){
        estado="Activo";
    }

    if(myState===0){
        estado="Eliminado";
    }

    return estado;
}

helpers.mostrarEstadoUsuario=(userState)=>{
    var check1='', check2='';
    if(userState===1){
        check1="checked";
    }else{
        check2="checked";
    }

    var html=`<div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="estado" id="estado1" value="1" ${check1}>
        <label class="form-check-label" for="estado1">Activo</label>
        &nbsp; &nbsp;
        <input class="form-check-input" type="radio" name="estado" id="estado2" value="2" ${check2}>
        <label class="form-check-label" for="estado2">Inactivo</label>
    </div>`;

    return html;
}

//backup
//"<a href='/usuario/borrarusuario/"+ idusuario + "' class='btn btn-danger'>Borrar</a>"


module.exports = helpers;