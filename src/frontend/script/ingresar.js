$(document).ready(function () {

    $("#form").bootstrapValidator({

        fields: {
            marca: {
                validators: {
                    notEmpty: { message: "Se debe completar este campo." },
                    stringLength: { max: 50, message: "Se admiten hasta un maximo de 50 caracteres." }
                }
            },
            patente: {
                validators: {
                    notEmpty: { message: "Se debe completar este campo." },
                    stringLength: { max: 10, message: "Se admiten hasta un maximo de 10 caracteres." }
                }
            },
            color: {
                validators: {
                    notEmpty: { message: "Se debe completar este campo." },
                    stringLength: { max: 20, message: "Se admiten hasta un maximo de 20 caracteres." }
                }
            },
            foto: {
                validators: {
                    file: { extension: "jpg,png", maxSize: 850 * 1024, message: "Solo se admiten archivos con formato .jpg y .png. y de hasta 850 KB" }
                }
            },
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
            url: "./admin.php/auto/ingreso",
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
});