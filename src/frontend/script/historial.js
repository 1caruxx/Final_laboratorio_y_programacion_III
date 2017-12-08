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
        
        $("#imgUser").attr("src" , "./src/backend/img/" + datosUsuario.foto);
        $("#navUser").html(datosUsuario.nombre + "<b class='caret'></b>");
        Mostrar();
    }
});

function Mostrar() {

    var fechaSalida = "";
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

            stringAuxiliar = `<tr>
                                <td><h4>ID</h4></td>
                                <td><h4>Patente</h4></td>
                                <td><h4>Marca</h4></td>
                                <td><h4>Color</h4></td>
                                <td><h4>Id empleado de entrada</h4></td>
                                <td><h4>Fecha de ingreso</h4></td>
                                <td><h4>Id cochera</h4></td>
                                <td><h4>Id empleado de salida</h4></td>
                                <td><h4>Fecha de salida</h4></td>
                                <td><h4>Importe</h4></td>
                                <td><h4>Tiempo</h4></td>
                                <td><h4>Foto</h4></td>
                                <td><h4>Estadistica</h4></td>
                              </tr>`;
        
        for(let item of response) {
        
            if(!item.fecha_salida) { fechaSalida = "Actualmente aparcado."; }
            else { fechaSalida = item.fecha_salida; }

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
                                    <td>${item.id_empleado_salida}</td>
                                    <td>${fechaSalida}</td>
                                    <td>${item.importe}</td>
                                    <td>${item.tiempo}</td>
                                    <td><img src="${foto}" width="50px" height="50px"/></td>
                                    <td><button type="button" class="btn btn-info">Ver</button></td>
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

function Deslogear() {

    swal({
        
        title : "Nos vemos!",
        imageUrl : "./src/frontend/img/logout.gif"
    }).then(() => {
        
        localStorage.clear();
        location.href = "./";
    });
}