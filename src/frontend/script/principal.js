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

function Mostrar() {

    var foto = "";

    $.ajax({

        url: "./admin.php/auto/",
        type: "GET",
        headers: {"token": localStorage.getItem("token")},
        dataType: "json",
        async: true
    })
    .done(function(response) {
          
        if(response != null) {
        
            let autosAparcados = response.filter(function(item) {
                            
                return item.fecha_salida == null;
            });

            stringAuxiliar = `<tr>
                                <td><h4>ID</h4></td>
                                <td><h4>Patente</h4></td>
                                <td><h4>Marca</h4></td>
                                <td><h4>Color</h4></td>
                                <td><h4>Id empleado entrada</h4></td>
                                <td><h4>Fecha ingreso</h4></td>
                                <td><h4>Id cochera</h4></td>
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
                                    <td>${item.color}</td>
                                    <td>${item.id_empleado_entrada}</td>
                                    <td>${item.fecha_ingreso}</td>
                                    <td>${item.id_cochera}</td>
                                    <td><img src="${foto}" width="50px" height="50px"/></td>
                                    <td><button type="button" class="btn btn-info" onclick="Egresar('${item.patente}')">Egresar</button></td>
                                </tr>`;
            }
        
            $("#tablaAutos").html(stringAuxiliar);
        }
        else {
                        
            $("#divAlert").html(`<div class='alert alert-danger'>${response.mensaje}</div>`);
        }
    })
    .fail(function(response) {
                    
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
            );
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

function MostrarDatos() {

    var datos = JSON.parse(localStorage.getItem("empleado"));

    swal(
        {title: 'Tus datos',
        text: `ID: ${datos.id}\nApellido: ${datos.apellido}`,
        text2: "hola",
        type: 'info',
        confirmButtonText: 'Me parece correcto'}
    );
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