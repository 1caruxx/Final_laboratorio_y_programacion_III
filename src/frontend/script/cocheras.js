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
    
        var foto = "";
                
        if(datosUsuario.foto) { foto = "./src/backend/img/" + datosUsuario.foto; }
        else { foto = "./src/frontend/img/userDefault.jpg" }
                        
        $("#imgUser").attr("src" , foto);
        $("#navUser").html(datosUsuario.nombre + "<b class='caret'></b>");
    
        Mostrar();
    }
});

function Mostrar() {
        
    AdministrarGif(true);

    var cocherasDisponibles = 0;
    var disponiblesPiso1 = 0;
    var disponiblesPiso2 = 0;
    var disponiblesPiso3 = 0;
    var disponiblesEspecial = 0;

    $.ajax({
        
        url: "./admin.php/auto/cocheras/",
        type: "GET",
        headers: { "token": localStorage.getItem("token") },
        dataType: "json",
        async: true
    })
    .done(function(response) {

        AdministrarGif(false);
         
        if (response != null) {

            stringAuxiliar = `<tbody>
                                <tr style="background-color: rgb(209, 208, 208);">
                                    <td><h4>ID</h4></td>
                                    <td><h4>Piso</h4></td>
                                    <td><h4>Numero</h4></td>
                                    <td><h4>Estado</h4></td>
                                    <td><h4>Especial</h4></td>
                                </tr>`;
                    
            for(let item of response) {

                var estado = "Libre";
                var especial = "Si";

                if(item.ocupada == "1") {

                    estado = "Ocupada";
                }
                else {

                    cocherasDisponibles++;

                    switch(item.piso) {

                        case "1":
                            disponiblesPiso1++;
                            break;
                        case "2":
                            disponiblesPiso2++;
                            break;
                        case "3":
                            disponiblesPiso3++;
                    }
                }

                if(item.especial == "0") {
                            
                    especial = "No";
                }
                else {

                    if (item.ocupada == "0") {

                        disponiblesEspecial++;
                    }
                }

                stringAuxiliar += `<tr>
                                        <td>${item.id}</td>
                                        <td>${item.piso}</td>
                                        <td>${item.numero}</td>
                                        <td>${estado}</td>
                                        <td>${especial}</td>
                                    </tr>`;
            }

            stringAuxiliar += "</tbody>";
            $("#tabla").html(stringAuxiliar);
            $("#disponibilidad").html(`Cocheras disponibles: ${cocherasDisponibles}<br/>
                                       En el piso 1: ${disponiblesPiso1}<br/>
                                       En el piso 2: ${disponiblesPiso2}<br/>
                                       En el piso 3: ${disponiblesPiso3}<br/>
                                       Especiales: ${disponiblesEspecial}`);
        }
        else {
                    
            $("#divAlert").html(`<div class='alert alert-danger'>${response.mensaje}</div>`);
        }
    })
    .fail(function (response) {

        AdministrarGif(false);                          
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