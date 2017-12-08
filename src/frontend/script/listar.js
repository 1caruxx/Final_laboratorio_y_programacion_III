$(document).ready(function () {

    if (localStorage.getItem("token") == null) {

        $("#bd").attr("class", "");
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

        if(datosUsuario.perfil != "administrador") {

            $("#bd").attr("class", "");
            $("#bd").html("");

            swal(

                'No tenes permisos para estar aca',
                'Si querias borrar a un compañero que te cae mal no vas a poder 😎',
                'info'
            ).then(() => {
                
                location.href = "./principal.html";
            });
        }

        else {

            $("#imgUser").attr("src", "./src/backend/img/" + datosUsuario.foto);
            $("#navUser").html(datosUsuario.nombre + "<b class='caret'></b>");
            Mostrar();
        }
    }
});

function Mostrar() {

    var estado = "";
    var accion = "";
    var foto = "";

    $.ajax({

        url: "./admin.php/empleado/",
        type: "GET",
        headers: { "token": localStorage.getItem("token") },
        dataType: "json",
        async: true
    })
    .done(function(response) {
        
        if (response != null) {

            stringAuxiliar = `<tr>
                                <td><h4>ID</h4></td>
                                <td><h4>Apellido</h4></td>
                                <td><h4>Nombre</h4></td>
                                <td><h4>Mail</h4></td>
                                <td><h4>Clave</h4></td>
                                <td><h4>Turno</h4></td>
                                <td><h4>Sexo</h4></td>
                                <td><h4>Estado</h4></td>
                                <td><h4>Perfil</h4></td>
                                <td><h4>Foto</h4></td>
                                <td><h4>Accion</h4></td>
                            </tr>`;
            
            for(let item of response) {

                switch(item.estado) {

                    case '0':
                        estado = "Borrado";
                        break;
                    case '1':
                        estado = "Trabajando";
                        accion = `<button type="button" class="btn btn-info" onclick="Suspender(${item.id})">Suspender</button><button type="button" class="btn btn-danger" onclick="Borrar()">Borrar</button>`
                        break;
                    case '2':
                        estado = "Suspendido";
                        accion = `<button type="button" class="btn btn-danger" onclick="Borrar()">Borrar</button>`
                }

                if(!item.foto) { foto = "./src/frontend/img/userDefault.jpg" }
                else { foto = `./src/backend/img/${item.foto}`}

                stringAuxiliar += `<tr>
                                        <td>${item.id}</td>
                                        <td>${item.apellido}</td>
                                        <td>${item.nombre}</td>
                                        <td>${item.mail}</td>
                                        <td>${item.clave}</td>
                                        <td>${item.turno}</td>
                                        <td>${item.sexo}</td>
                                        <td>${estado}</td>
                                        <td>${item.perfil}</td>
                                        <td><img src="${foto}" width="50px" height="50px"/></td>
                                        <td>${accion}</td>
                                    </tr>`;

                $("#tablaEmpleados").html(stringAuxiliar);
            }
        }
        else {
            
            $("#divAlert").html(`<div class='alert alert-danger'>${response.mensaje}</div>`);
        }
    })
    .fail(function (response) {
                                
        alert("Algo salio mal: " + response);
    });
}

function Suspender(id) {

    swal({
        title: 'Suspension',
        type: 'question',
        html:'Estas seguro de que deseas suspender este usuario?',
        showCloseButton: true,
        showCancelButton: true,}).then((response) => {

        if(response.value) {

            $.ajax({
                    
                url: "./admin.php/empleado/",
                type: "PUT",
                headers: { "token": localStorage.getItem("token") },
                data: { id: id },
                dataType: "json",
                async: true
            })
            .done(function(response) {

                if(response.valido == "true") {

                    swal(
                        "Exito!",
                        response.mensaje,
                        "success"
                    );
                }
                else {

                    swal(
                        "Ups",
                        response.mensaje,
                        "error"
                    );
                }
            })
            .fail(function(response) {

                swal(
                    "Algo salio mal: ",
                    response,
                    "error"
                );

            });
        }
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