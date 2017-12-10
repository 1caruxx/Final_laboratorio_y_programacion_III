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

        if (datosUsuario.perfil != "administrador") {

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

            var foto = "";
            
            if(datosUsuario.foto) { foto = "./src/backend/img/" + datosUsuario.foto; }
            else { foto = "./src/frontend/img/userDefault.jpg" }
                    
            $("#imgUser").attr("src" , foto);
            $("#navUser").html(datosUsuario.nombre + "<b class='caret'></b>");

            $("#form").bootstrapValidator({

                fields: {
                    apellido: {
                        validators: {
                            notEmpty: { message: "Se debe completar este campo." },
                            stringLength: { max: 30, message: "Se admiten hasta un maximo de 30 caracteres." }
                        }
                    },
                    nombre: {
                        validators: {
                            notEmpty: { message: "Se debe completar este campo." },
                            stringLength: { max: 30, message: "Se admiten hasta un maximo de 30 caracteres." }
                        }
                    },
                    mail: {
                        validators: {
                            notEmpty: { message: "Se debe completar este campo." },
                            emailAddress: { message: "eMail ingresado no valido." },
                            stringLength: { max: 25, message: "Se admiten hasta un maximo de 25 caracteres." }
                        }
                    },
                    foto: {
                        validators: {
                            file: { extension: "jpg,png", maxSize: 850 * 1024, message: "Solo se admiten archivos con formato .jpg y .png. y de hasta 850 KB" }
                        }
                    },
                    clave: {
                        validators: {
                            notEmpty: { message: "Se debe completar este campo." },
                            stringLength: { min: 4, max: 12, message: "Entre 4 y 12 caracteres." }
                        }
                    },
                    confirmar: {
                        validators: {
                            notEmpty: { message: "Se debe completar este campo." },
                            identical: { field: "clave", message: "Debe coincidir con el campo clave." }
                        }
                    }
                }
            })
            .on("success.form.bv", function (form) {

                form.preventDefault();

                var formData = new FormData($(this)[0]);

                if ($("#filFoto").val() != "") {

                    var archivo = document.getElementById("filFoto");
                    formData.append("foto", archivo.files[0]);
                }

                $.ajax({

                    url: "./admin.php/empleado/modificar",
                    type: "POST",
                    data: formData,
                    headers: { "token": localStorage.getItem("token") },
                    dataType: "json",
                    cache: false,
                    contentType: false,
                    processData: false,
                    async: true
                })
                .done(function (response) {

                    if (response.valido == "true") {

                        swal(

                            'Exito!',
                            response.mensaje,
                            'success'
                        ).then(() => {

                            location.href = "./principal.html";
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
                .fail(function (response) {

                    alert("Algo salio mal: " + response);
                });
            });
        }
    }
});

function Deslogear() {

    swal({

        title: "Nos vemos!",
        imageUrl: "./src/frontend/img/logout.gif"
    }).then(() => {

        localStorage.clear();
        location.href = "./";
    });
}