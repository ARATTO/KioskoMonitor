
let contadorEquipo={
    offline:[],
    warning:[],
    ready:[],
    datosTblEquipo:[],
    total:0,
    fillOffline:function(rows){
        if(rows && rows.length>0){
            for (let i = 0; i < rows.length; i++) {
                contadorEquipo.offline.push(rows[i].ipID);
            }
        }
    },
    fillDatosTblEquipo:function(rows){
        contadorEquipo.datosTblEquipo=Array.from(rows);
        //console.log("XXXXXXXXXXXXXXX ARRAY FROM XXXXXXXXX");
        //console.log(this.datosTblEquipo);
    },
    addOffline:function(ipId){
        if(ipId && contadorEquipo.total>=contadorEquipo.offline.length && ipId.length>3){ 
            try{
                const p=contadorEquipo.offline.indexOf(ipId);
                if(p===-1){//si no existe lo agrega
                    contadorEquipo.offline.push(ipId);
                }

                contadorEquipo.delReady(ipId);
                contadorEquipo.delWarning(ipId);
            }finally{
                contadorEquipo.setTotal(); //hara suma de estados
            }
        }           
    },
    addWarning:function(ipId){
        if(ipId && contadorEquipo.total>=contadorEquipo.warning.length && ipId.length>3){
            try{
                const p=contadorEquipo.warning.indexOf(ipId);
                if(p===-1){//si no existe lo agrega
                    contadorEquipo.warning.push(ipId);
                }

                contadorEquipo.delOffline(ipId);
                contadorEquipo.delReady(ipId);
            }finally{
                contadorEquipo.setTotal();
            }
        }     
    },
    addReady:function(ipId){
        if(ipId && contadorEquipo.total>=contadorEquipo.ready.length && ipId.length>3){
            try{
                const p=contadorEquipo.ready.indexOf(ipId);
                if(p===-1){//si no existe lo agrega
                    contadorEquipo.ready.push(ipId);
                }

                contadorEquipo.delWarning(ipId);
                contadorEquipo.delOffline(ipId);
            }finally{
                contadorEquipo.setTotal();
            }
        }
    },
    delOffline:function(ipId){
        if(ipId && ipId.length>3){
            const index = contadorEquipo.offline.indexOf(ipId);
            if(index!==-1){
                try{    
                    contadorEquipo.offline.splice(index, 1);//borrando elemento
                }finally{
                    contadorEquipo.setTotal();
                }
            }
        }
    },
    delWarning:function(ipId){
        if(ipId && ipId.length>3){
            const index = contadorEquipo.warning.indexOf(ipId);
            if(index!==-1){
                try{    
                    contadorEquipo.warning.splice(index, 1);//borrando elemento
                }finally{
                    contadorEquipo.setTotal();
                }
            }    
        }
    },  
    delReady:function(ipId){
        if(ipId &&  ipId.length>3){
            const index = contadorEquipo.ready.indexOf(ipId);
            if(index!==-1){
                try{
                    contadorEquipo.ready.splice(index, 1);//borrando elemento
                }finally{
                    contadorEquipo.setTotal();
                }
            }
        }   
    },
    setTotal:function(totalEquipos){
        if(totalEquipos && totalEquipos>=0){
            contadorEquipo.total=totalEquipos;
        }else{
            contadorEquipo.total=contadorEquipo.offline.length+contadorEquipo.warning.length+contadorEquipo.ready.length;
        }
    },
    setInitialState:function(){
        contadorEquipo.offline.length=0;//borrando contenido del array
        contadorEquipo.warning.length=0;
        contadorEquipo.ready.length=0;
    },
    eliminarIpID:function(ipId){//lo quita de todas las variables
        if(ipId && ipId.length>3){
            try {
                contadorEquipo.delOffline(ipId);
                contadorEquipo.delWarning(ipId);
                contadorEquipo.delOffline(ipId);                
            }finally{
                contadorEquipo.setTotal();//sin param, hará la suma
            } 
        }
    }

}

module.exports = contadorEquipo;