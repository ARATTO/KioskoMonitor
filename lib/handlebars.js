const { format } = require('timeago.js');
const helpers = {};

helpers.timeago = (timestamp) => {
    return format(timestamp);
};

helpers.isAdminAcciones = (idPerfil, idusuario) => {
    
    let html = "";
    if (idPerfil != 1) {
        html = html + "<a href='/usuario/editarusuario/'"+ idusuario + " class='btn btn-info'>Editar</a>" + 
                      "<a href='/usuario/borrarusuario/'"+ idusuario + " class='btn btn-danger'>Borrar</a>";

    }else{
        html = html + "<a class='btn btn-primary' disabled='disabled'>ROOT</a>";
    }

    return html;
};

module.exports = helpers;