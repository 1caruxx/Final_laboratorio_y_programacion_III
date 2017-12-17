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

function Mostrar(marca=null , patente=null , color=null , aumento=null) {

    var fechaSalida = "";
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

            if(aumento) {

                var response = response.map(function(item) {

                    item.importe = parseFloat(item.importe) + parseFloat(aumento);

                    return item;
                });
            }

            if(marca) {

                var cantidadPorMarca = (response = response.filter(function(item) {
                        
                    return item.marca == marca;
                })).reduce((valor) => valor + 1 , 0);
                    
                div = `Hay ${cantidadPorMarca} auto(s) de la marca ${marca}`;
            }
    
            if(patente) {
    
                response = response.filter(function(item) {
                                        
                    return item.patente == patente;
                });
            }
    
            if(color) {
                        
                var cantidadPorColor = (response = response.filter(function(item) {
                                                        
                    return item.color == color;
                })).reduce((valor) => valor + 1 , 0);
    
                if(marca) { div += `<br/>Hay ${cantidadPorColor} auto(s) de color ${color}`; }
                else { div += `Hay ${cantidadPorColor} auto(s) de color ${color}`; }
            }

            let sumaImportes = response.reduce(function (suma , item) {

                return suma + parseFloat(item.importe);
            } , 0);

            let sumaHoras = response.reduce(function (suma , item) {
                
                return suma + parseInt(item.tiempo);
            } , 0);

            //let promedioImportes = parseFloat(sumaImportes/cantidadPorMarca | cantidadPorColor);
            let promedioImportes = parseFloat(sumaImportes/cantidadPorMarca ^ cantidadPorColor);

            if(marca=="" ^ color=="") {
    
                $("#divAlertFiltro").attr("style" , "");
                $("#divAlertFiltro").html(div+ `<br/>Importe total: ${sumaImportes}, promedio: ${promedioImportes}, horas: ${sumaHoras}`);
            }
            else {
    
                if(marca && color) {
    
                    $("#divAlertFiltro").attr("style" , "");
                    $("#divAlertFiltro").html(`Hay ${cantidadPorColor} auto(s) de color ${color} y de marca ${marca}.<br/> Importe total: ${sumaImportes}, promedio: ${promedioImportes}, horas: ${sumaHoras}`);
                }
                else {

                    $("#divAlertFiltro").attr("style" , "display: none;");
                    $("#divAlertFiltro").html("");
                }
            }

            stringAuxiliar = `<tbody>
                                  <tr style="background-color: rgb(209, 208, 208);">
                                      <td><h4>ID</h4></td>
                                      <td><h4>Patente</h4></td>
                                      <td><h4>Marca</h4></td>
                                      <td><h4>Color</h4></td>
                                      <td><h4>ID empleado de entrada</h4></td>
                                      <td><h4>Fecha de ingreso</h4></td>
                                      <td><h4>ID cochera</h4></td>
                                      <td><h4>ID empleado de salida</h4></td>
                                      <td><h4>Fecha de salida</h4></td>
                                      <td><h4>Importe</h4></td>
                                      <td><h4>Tiempo</h4></td>
                                      <td><h4>Foto</h4></td>
                                      <td><h4>Accion</h4></td>
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
                                    <td><div style="background-color: ${item.color};">${item.color}</div></td>
                                    <td>${item.id_empleado_entrada}</td>
                                    <td>${item.fecha_ingreso}</td>
                                    <td>${item.id_cochera}</td>
                                    <td>${item.id_empleado_salida}</td>
                                    <td>${fechaSalida}</td>
                                    <td>$${item.importe}</td>
                                    <td>${item.tiempo} Hs.</td>
                                    <td><img src="${foto}" width="50px" height="50px"/></td>
                                    <td>
                                        <button type="button" class="btn btn-success" title="Ver estadisticas" onclick="Estadistica('${item.patente}')">
                                            <i class="glyphicon glyphicon-align-left"></i>
                                        </button>
                                    </td>
                                </tr>`;
            }

            stringAuxiliar += "</tbody>";
            $("#tabla").html(stringAuxiliar);
        }
        else {
                    
            $("#divAlert").html(`<div class='alert alert-danger'>${response.mensaje}</div>`);
        }
    })
    .fail(function(response) {

        AdministrarGif(false);     
        alert("Algo salio mal: " + response);
    });
}

function Estadistica(patente) {

    $("#divFormEstadistica").attr("style" , "");
    $("#divFormBoxEstadistica").html(`<div class="row">

        <div class="form-box">

            <div class="form-top text-info">
                <div class="form-top-left">
                    <h3 class="h3 text-info text-uppercase">Estadistica</h3>
                    <p class="lead">Ingrese la patente del auto (opcional), la fecha desde (obligatoria) y hasta (opcional) de los datos
                        que quiera ver:</p>
                </div>

            </div>

            <div class="form-bottom">
                <form role="form" action="" method="post" class="login-form" id="form">

                    <div class="form-group">
                        <label class="col-md-3 control-label">Patente</label>
                        <div class="inputGroupContainer">
                            <div class="input-group">

                                <span class="input-group-addon">
                                    <i class="glyphicon glyphicon-barcode"></i>
                                </span>

                                <input type="text" class="form-control" name="patente" id="txtPatente" placeholder="Patente" value="${patente}"/>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-md-3 control-label">Desde</label>
                        <div class="inputGroupContainer">
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="glyphicon glyphicon-calendar"></i>
                                </span>
                                <input type="text" class="form-control" name="fecha" id="datetimepickerDesde" data-date-format="YYYY-MM-DD" placeholder="Desde"/>
                            </div>
                        </div>

                    </div>

                    <div class="form-group">
                        <label class="col-md-3 control-label">Hasta</label>
                        <div class="inputGroupContainer">
                            <div class="input-group">
                                <span class="input-group-addon">
                                    <i class="glyphicon glyphicon-calendar"></i>
                                </span>
                                <input type="text" class="form-control" name="fecha2" id="datetimepickerHasta" data-date-format="YYYY-MM-DD" placeholder="Hasta"/>
                            </div>
                        </div>

                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <button type="submit" class="btn btn-info btn-block" id="btnEnviar">Enviar</button>
                        </div>
                        <div class="col-md-6">
                            <button type="reset" class="btn btn-warning btn-block" id="btnEnviar">Limpiar</button>
                        </div>
                    </div>

                </form>

            </div>
            <br/>

            <div class="col-md-6 col-sm-offset-3">
                <div class="row" id="divAlert"></div>
            </div>

        </div>
    </div>`
    );

    $('#datetimepickerDesde').datetimepicker();
    $('#datetimepickerHasta').datetimepicker();

    $("#form").bootstrapValidator({

        fields: {
            patente: {
                validators: {
                    stringLength: {max: 10 , message: "Se admiten hasta un maximo de 10 caracteres."}
                }
            },
            fecha: {
                validators: {
                    notEmpty: {message: "Se debe completar este campo."},
                    date: {
                        format: 'YYYY-MM-DD',
                        message: 'Fecha introducida no valida.'
                    }
                }
            },
            fecha2: {
                validators: {
                    date: {
                        format: 'YYYY-MM-DD',
                        min: "fecha",
                        message: 'Fecha introducida no valida.'
                    }
                }
            }
        }
    })
    .on("success.form.bv" , function(form) {
                                    
        form.preventDefault();
        AdministrarGif(true); 
                    
        $.ajax({
                                    
            url: "./admin.php/auto/estadistica",
            type: "POST",
            data: {
        
                patente: $("#txtPatente").val(),
                fecha: $("#datetimepickerDesde").val(),
                fecha2: $("#datetimepickerHasta").val()
            },
            headers: { token: localStorage.getItem("token") },
            dataType: "json",
            async: true
        })
        .done(function(response) {

            AdministrarGif(false); 
        
            if(response.valido == "true") {

                if($("#txtPatente").val()) {
        
                    var stringAuxiliar = `Este vehiculo nos ha visitado un total de ${(response.datos).visitasTotales} veces, 
                    pagado un total de $${(response.datos).importeTotal} y su promedio mensual es de $${(response.datos).promedioMensual}<br/><br/>DETALLE`;
                    var flag = 0;
            
                    for(let dato of (response.datos).fechas) {
            
                        stringAuxiliar += `<br/>Fecha: ${dato.fecha}, importe: ${dato.cantidad}, visitas: ${dato.visitas}`;
                    }
            
                    stringAuxiliar += `<br/><br/>El promedio mensual de todos los autos es: $${(response.datos).promedioMensualTotal}`;
                }
                else {

                    var stringAuxiliar = `Se nos ha visitado un total de ${(response.datos).visitasTotales} veces 
                    y pagado un total de $${(response.datos).importeTotal}<br/><br/>DETALLE`;
                    var flag = 0;
            
                    for(let dato of (response.datos).fechas) {
            
                        stringAuxiliar += `<br/>Fecha: ${dato.fecha}, importe: ${dato.cantidad}, visitas: ${dato.visitas}`;
                    }
            
                    stringAuxiliar += `<br/><br/>El promedio mensual de todos los autos es: $${(response.datos).promedioMensualTotal}`;
                }
        
                $("#divAlert").html(`<div class='alert alert-info'>${stringAuxiliar}</div>`);
            }
            else {
        
                $("#divAlert").html(`<div class='alert alert-danger'>${response.mensaje}</div>`);
            }
        })
        .fail(function(response) {

            AdministrarGif(false);              
            alert("Algo salio mal: " + response);
        });
    }) 
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