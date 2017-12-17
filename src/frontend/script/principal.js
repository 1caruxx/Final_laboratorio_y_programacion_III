$(document).ready(function() {

    if(localStorage.getItem("token") == null) {

        $("#bd").attr("class" , "");
        $("#bd").html("");

        swal(

            'Usuario no logeado',
            'Debes logearte previamente para estar aqui, es como entrar a una casa sin abrir la puerta antes.',
            'info'
          ).then(() => {

              location.href = "./";
          });
    }
    else {

        var datosUsuario = JSON.parse(localStorage.getItem("empleado"));
        var foto = "";

        if(datosUsuario.foto) { foto = "./src/backend/img/" + datosUsuario.foto; }
        else { foto = "./src/frontend/img/userDefault.jpg" }
        
        $("#imgUser").attr("src" , foto);
        $("#navUser").html(datosUsuario.nombre + "<b class='caret'></b>");
        Mostrar();
    }
});

function Mostrar(marca=null , patente=null , color=null) {

    var foto = "";

    AdministrarGif(true);

    $.ajax({

        url: "./admin.php/auto/",
        type: "GET",
        headers: {"token": localStorage.getItem("token")},
        dataType: "json",
        async: true
    })
    .done(function(response) {

        AdministrarGif(false);
          
        if(response != null) {

            let div = "";
        
            let autosAparcados = response.filter(function(item) {
                            
                return item.fecha_salida == null;
            });

            if(marca) {

                let cantidadPorMarca = (autosAparcados = autosAparcados.filter(function(item) {
                    
                    return item.marca == marca;
                })).reduce((valor) => valor + 1 , 0);
                
                div = `Hay ${cantidadPorMarca} auto(s) de la marca ${marca}`;
            }

            if(patente) {

                autosAparcados = autosAparcados.filter(function(item) {
                                    
                    return item.patente == patente;
                });
            }

            if(color) {
                                
                var cantidadPorColor = (autosAparcados = autosAparcados.filter(function(item) {
                                                    
                    return item.color == color;
                })).reduce((valor) => valor + 1 , 0);

                if(marca) { div += `<br/>Hay ${cantidadPorColor} auto(s) de color ${color}`; }
                else { div += `Hay ${cantidadPorColor} auto(s) de color ${color}`; }
            }

            if(marca=="" ^ color=="") {

                $("#divAlert").attr("style" , "");
                $("#divAlert").html(div);
            }
            else {
                if(marca && color) {

                    $("#divAlert").attr("style" , "");
                    $("#divAlert").html(`Hay ${cantidadPorColor} auto(s) de color ${color} y de marca ${marca}`);

                }
                else {

                $("#divAlert").attr("style" , "display: none;");
                $("#divAlert").html("");
                }
            }


            stringAuxiliar = `<tbody>
                                <tr style="background-color: rgb(209, 208, 208);">
                                    <td><h4>ID</h4></td>
                                    <td><h4>Patente</h4></td>
                                    <td><h4>Marca</h4></td>
                                    <td><h4>Color</h4></td>
                                    <td><h4>ID empleado entrada</h4></td>
                                    <td><h4>Fecha ingreso</h4></td>
                                    <td><h4>ID cochera</h4></td>
                                    <td><h4>Foto</h4></td>
                                    <td><h4>Accion</h4></td>
                                </tr>`;
        
            for(let item of autosAparcados) {

                if(item.foto == null) { foto = "./src/frontend/img/carDefault.jpg"; }
                else { foto = `./src/backend/img/${item.foto}` }
            
                stringAuxiliar += `<tr>
                                    <td>${item.id}</td>
                                    <td>${item.patente}</td>
                                    <td>${item.marca}</td>
                                    <td><div style="background-color: ${item.color};">${item.color}</div></td>
                                    <td>${item.id_empleado_entrada}</td>
                                    <td>${item.fecha_ingreso}</td>
                                    <td>${item.id_cochera}</td>
                                    <td><img src="${foto}" width="50px" height="50px"/></td>
                                    <td><button type="button" class="btn btn-info" onclick="Egresar('${item.patente}')" title="Egresar"><i class="glyphicon glyphicon-share-alt"></i></button></td>
                                </tr>`;
            }

            stringAuxiliar += "</tbody>";

            $("#tabla").html(stringAuxiliar);
        }
        else {

            AdministrarGif(false);
                        
            $("#divAlert").html(`<div class='alert alert-danger'>${response.mensaje}</div>`);
        }
    })
    .fail(function(response) {

        AdministrarGif(false);
                    
        alert("Algo salio mal: " + response);
    });
}

function Egresar(patente) {

    $.ajax({
        
        url: "./admin.php/auto/egreso",
        type: "POST",
        headers: {"token": localStorage.getItem("token")},
        data: {"patente": patente},
        dataType: "json",
        async: true
    })
    .done(function(response) {

        if(response.valido == "true") {

            swal(
                'Exito!',
                response.mensaje,
                'success'
            ).then(() => {

                Mostrar();
            });
        }
        else {

            swal(
                'Ups',
                response.mensaje,
                'error'
            );
        }
    })
    .fail(function(response) {
                    
        alert("Algo salio mal: " + response);
    });
}

function AdministrarGif(mostrar) {
    
    var gif  = "./src/frontend/img/load.gif";
    let img = document.getElementById("imgGif");
    
    if(mostrar){

        img.src = gif;
    }
    
    if(!mostrar){

        img.src = "./src/frontend/img/favicon.ico";
    }
}

function Deslogear() {

    swal({
        
        title : "Nos vemos!",
        imageUrl : "./src/frontend/img/logout.gif"
    }).then(() => {
        
        localStorage.clear();
        location.href = "./";
    });
}