$(document).ready(function() {

    $("#form").bootstrapValidator({

        fields: {
            correo: {
                validators: {
                    notEmpty: {message: "Se debe completar este campo."},
                    emailAddress: {message: "eMail ingresado no valido."},
                    stringLength: {max: 25 , message: "Se admiten hasta un maximo de 25 caracteres."}
                }
            },
            password: {
                validators: {
                    notEmpty: {message: "Se debe completar este campo."},
                    stringLength: {min: 5 , max: 12 , message: "Entre 5 y 12 caracteres."}
                }
            }
        }
    })
    .on("success.form.bv" , function(form) {

        form.preventDefault();

        $.ajax({

            url: "./admin.php/login/",
            type: "POST",
            data: {

                "mail": $("#txtCorreo").val(),
                "clave": $("#pswPass").val()
            },
            dataType: "json",
            async: true
        })
        .done(function(response) {

            if(response.valido == "true") {

                swal(
                    'Exito!',
                    'Bienvenid@ ' + (response.empleado).nombre,
                    'success'
                  ).then(() =>{

                      localStorage.setItem("token" , response.token);
                      localStorage.setItem("empleado" , JSON.stringify(response.empleado));
                      location.href = "./principal.html";
                });
            }
            else {

                $("#divAlert").html(`<div class='alert alert-danger'>${response.mensaje}</div>`);
            }
        })
        .fail(function(response) {

            alert("Algo salio mal: " + response);
        });
    })
});