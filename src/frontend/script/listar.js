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

            var foto = "";
            
            if(datosUsuario.foto) { foto = "./src/backend/img/" + datosUsuario.foto; }
            else { foto = "./src/frontend/img/userDefault.jpg" }
                    
            $("#imgUser").attr("src" , foto);
            $("#navUser").html(datosUsuario.nombre + "<b class='caret'></b>");

            Mostrar();

           
        }
    }
});

function Mostrar() {

    AdministrarGif(true);
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

        AdministrarGif(false);

        if (response != null) {

            stringAuxiliar = `<tbody>
                                <tr style="background-color: rgb(209, 208, 208);">
                                    <td><h4>ID</h4></td>
                                    <td><h4>Apellido</h4></td>
                                    <td><h4>Nombre</h4></td>
                                    <td><h4>Mail</h4></td>
                                    <td><h4>Turno</h4></td>
                                    <td><h4>Sexo</h4></td>
                                    <td><h4>Estado</h4></td>
                                    <td><h4>Perfil</h4></td>
                                    <td><h4>Foto</h4></td>
                                    <td><h4>Accion</h4></td>
                                </tr>`;
            
            for(let item of response) {

                accion = "";

                switch(item.estado) {

                    case '0':
                        estado = "Borrado";
                        accion = `<button type="button" class="btn btn-success" title="Ver estadisticas" onclick="Estadistica('${item.mail}')">
                                      <i class="glyphicon glyphicon-align-left"></i>
                                  </button>`;
                        break;
                    case '1':
                        estado = "Trabajando";
                        accion = `<button type="button" class="btn btn-success" title="Ver estadisticas" onclick="Estadistica('${item.mail}')">
                                      <i class="glyphicon glyphicon-align-left"></i>
                                  </button>
                        <button type="button" class="btn btn-info" title="Modificar" onclick="Modificar('${item.apellido}' , '${item.nombre}' , '${item.mail}' , '${item.turno}' , '${item.sexo}' , '${item.perfil}' , '${item.foto}' , '${item.clave}')">
                                      <i class="glyphicon glyphicon-wrench"></i>
                                  </button>
                                  <button type="button" class="btn btn-warning" title="Suspender" onclick="CambiarEstado('${item.id}',\'2\')">
                                      <i class="glyphicon glyphicon-off"></i>
                                  </button>
                                  <button type="button" class="btn btn-danger" title="Borrar" onclick="Borrar(${item.id})">
                                      <i class="glyphicon glyphicon-trash"></i>
                                  </button>`
                        break;
                    case '2':
                        estado = "Suspendido";
                        accion = `<button type="button" class="btn btn-success" title="Ver estadisticas" onclick="Estadistica('${item.mail}')">
                                      <i class="glyphicon glyphicon-align-left"></i>
                                  </button>
                                  <button type="button" class="btn btn-info" title="Modificar" onclick="Modificar('${item.apellido}' , '${item.nombre}' , '${item.mail}' , '${item.turno}' , '${item.sexo}' , '${item.perfil}' , '${item.foto}' , '${item.clave}')">
                                      <i class="glyphicon glyphicon-wrench"></i>
                                  </button>
                                  <button type="button" class="btn btn-success" title="Retornar" onclick="CambiarEstado(${item.id},\'1\')">
                                      <i class="glyphicon glyphicon-circle-arrow-up"></i>
                                  </button>
                                  </button><button type="button" class="btn btn-danger" title="Borrar" onclick="Borrar(${item.id})">
                                      <i class="glyphicon glyphicon-trash"></i>
                                  </button>`
                }

                if(item.id == (JSON.parse(localStorage.getItem("empleado"))).id) {

                    accion = `<button type="button" class="btn btn-success" title="Ver estadisticas" onclick="Estadistica('${item.mail}')">
                                  <i class="glyphicon glyphicon-align-left"></i>
                              </button>
                              <button type="button" class="btn btn-info" title="Modificar" onclick="Modificar('${item.apellido}' , '${item.nombre}' , '${item.mail}' , '${item.turno}' , '${item.sexo}' , '${item.perfil}' , '${item.foto}' , '${item.clave}')"">
                                  <i class="glyphicon glyphicon-wrench"></i>
                              </button>`;
                }

                if(!item.foto) { foto = "./src/frontend/img/userDefault.jpg" }
                else { foto = `./src/backend/img/${item.foto}`}

                stringAuxiliar += `<tr>
                                        <td>${item.id}</td>
                                        <td>${item.apellido}</td>
                                        <td>${item.nombre}</td>
                                        <td>${item.mail}</td>
                                        <td>${item.turno}</td>
                                        <td>${item.sexo}</td>
                                        <td>${estado}</td>
                                        <td>${item.perfil}</td>
                                        <td><img src="${foto}" width="50px" height="50px"/></td>
                                        <td>${accion}</td>
                                    </tr>`;
            }
            
            stringAuxiliar += "</tbody>";
            $("#tabla").html(stringAuxiliar);
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

function Modificar(apellido , nombre , mail , turno , sexo , perfil , foto , clave) {

    var perfilOptions = `<option value="administrador">Administrador</option>
                         <option value="empleado" selected>Empleado</option>`;
    var sexoOptions = `<option value="M">Masculino</option>
                       <option value="F">Femenino</option>`;
    var turnoOptions = `<option value="M">Mañana</option>
                        <option value="T">Tarde</option>
                        <option value="N">Noche</option>`;
    
    if(perfil == "administrador") {

        perfilOptions = `<option value="administrador" selected>Administrador</option>
                         <option value="empleado">Empleado</option>`;
    }

    if(sexo == "F") {

        sexoOptions = `<option value="M">Masculino</option>
                       <option value="F" selected>Femenino</option>`;
    }

    switch(turno) {

        case "T":
            var turnoOptions = `<option value="M">Mañana</option>
                                <option value="T" selected>Tarde</option>
                                <option value="N">Noche</option>`;
            break;

        case "N":
            var turnoOptions = `<option value="M">Mañana</option>
                                <option value="T" selected>Tarde</option>
                                <option value="N"selected>Noche</option>`;
    }


    $("#divFormModificar").attr("style" , "");
    $("#divFormBoxModificar").html(

        `<div class="form-top text-info">
            <div class="form-top-left">
                <h3 class="h3 text-info text-uppercase">Modificacion</h3>
                <p class="lead">Ingrese los datos del empleado a modificar:</p>
            </div>
        </div>

        <div class="form-bottom">
            <form role="form" action="" method="post" class="login-form" id="formModificar">

                <div class="form-group">
                    <label class="col-md-3 control-label">Apellido</label>
                    <div class=" inputGroupContainer">
                        <div class="input-group">
                            <span class="input-group-addon">
                                <i class="glyphicon glyphicon-user"></i>
                            </span>

                            <input type="text" class="form-control" name="apellido" id="txtApellido" placeholder="Apellido" value="${apellido}"/>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label class="col-md-3 control-label">Nombre</label>
                    <div class=" inputGroupContainer">
                        <div class="input-group">
                            <span class="input-group-addon">
                                <i class="glyphicon glyphicon-user"></i>
                            </span>

                            <input type="text" class="form-control" name="nombre" id="txtNombre" placeholder="Nombre" value="${nombre}"/>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label class="col-md-3 control-label">Foto</label>
                    <div class=" inputGroupContainer">
                        <div class="input-group">
                            <span class="input-group-addon">
                                <i class="glyphicon glyphicon-camera"></i>
                            </span>

                            <input type="file" class="form-control" name="foto" id="filFoto" />
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label class="col-md-3 control-label">Perfil</label>
                    <div class=" inputGroupContainer">
                        <div class="input-group">
                            <span class="input-group-addon">
                                <i class="glyphicon glyphicon-option-horizontal"></i>
                            </span>

                            <select class="form-control" name="perfil" id="cboPerfil">${perfilOptions}</select>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label class="col-md-3 control-label">Turno</label>
                    <div class=" inputGroupContainer">
                        <div class="input-group">
                            <span class="input-group-addon">
                                <i class="glyphicon glyphicon-time"></i>
                            </span>

                            <select class="form-control" name="turno" id="cboTurno">${turnoOptions}</select>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label class="col-md-3 control-label">Sexo</label>
                    <div class=" inputGroupContainer">
                        <div class="input-group">
                            <span class="input-group-addon">
                                <i class="glyphicon glyphicon-option-horizontal"></i>
                            </span>

                            <select class="form-control" name="sexo" id="cboSexo">${sexoOptions}</select>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label class="col-md-3 control-label">Clave</label>
                    <div class="inputGroupContainer">
                        <div class="input-group">

                            <span class="input-group-addon">
                                <i class="glyphicon glyphicon-lock"></i>
                            </span>

                            <input type="password" class="form-control" name="clave" id="pswPass" placeholder="Clave" value="${clave}"/>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label class="col-md-3 control-label">Confirmar</label>
                    <div class="inputGroupContainer">
                        <div class="input-group">

                            <span class="input-group-addon">
                                <i class="glyphicon glyphicon-lock"></i>
                            </span>

                            <input type="password" class="form-control" name="confirmar" placeholder="Repita clave" value="${clave}"/>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6">
                        <button type="submit" class="btn btn-info" id="btnEnviar">Enviar</button>
                    </div>
                    <div class="col-md-6">
                        <button type="reset" class="btn btn-warning">Limpiar</button>
                    </div>
                </div>

            </form>
        </div>`
    );

    $("#formModificar").bootstrapValidator({
        
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
        formData.append("mail" , mail);
        
        if ($("#filFoto").val() != "") {
        
            var archivo = document.getElementById("filFoto");
            formData.append("foto", archivo.files[0]);
        }

        AdministrarGif(true);
        
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

            AdministrarGif(false);   
        
            if (response.valido == "true") {
        
                swal(
        
                    'Exito!',
                    response.mensaje,
                    'success'
                ).then(() => {

                    let datosUsuario = JSON.parse(localStorage.getItem("empleado"));

                    if(mail == datosUsuario.mail) {

                        datosUsuario.apellido = $("#txtApellido").val();
                        datosUsuario.nombre = $("#txtNombre").val();
                        datosUsuario.clave = $("#pswPass").val();
                        datosUsuario.perfil = $("#cboPerfil").val();
                        datosUsuario.sexo = $("#cboSexo").val();
                        datosUsuario.turno = $("#cboTurno").val();
        
                        localStorage.setItem("empleado" , JSON.stringify(datosUsuario));
                        $("#navUser").html(datosUsuario.nombre + "<b class='caret'></b>");
                        $("#divFormModificar").attr("style" , "display: none;");

                        if($("#cboPerfil").val() == "empleado") {
                                
                            location.href = "./principal.html";
                        }
                    }

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
        .fail(function (response) {

            AdministrarGif(false);   
            alert("Algo salio mal: " + response);
        });
    });
}

function Estadistica(mail) {

    $("#divFormEstadistica").attr("style" , "");
    $("#divFormBoxEstadistica").html(
        
        `<div class="form-top text-info">
            <div class="form-top-left">
                <h3 class="h3 text-info text-uppercase">Estadistica</h3>
                <p class="lead">Ingrese la fecha desde (obligatoria) y hasta (opcional) de los datos
                    que quiera ver:</p>
            </div>

        </div>

        <div class="form-bottom">
            <form role="form" action="" method="post" class="login-form" id="formEstadistica">

                <div class="form-group">
                    <label class="col-md-3 control-label">Desde</label>
                    <div class="inputGroupContainer">
                        <div class="input-group">
                            <span class="input-group-addon">
                                <i class="glyphicon glyphicon-calendar"></i>
                            </span>
                            <input type="text" class="form-control" name="fecha" id="datetimepickerDesde" data-date-format="YYYY-MM-DD" placeholder="Desde"
                            />
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
                            <input type="text" class="form-control" name="fecha2" id="datetimepickerHasta" data-date-format="YYYY-MM-DD" placeholder="Hasta"
                            />
                        </div>
                    </div>

                </div>

                <div class="row">
                    <div class="col-md-6">
                        <button type="submit" class="btn btn-info btn-block" id="btnEnviar">Enviar</button>
                    </div>
                    <div class="col-md-6">
                        <button type="reset" class="btn btn-warning btn-block">Limpiar</button>
                    </div>
                </div>

            </form>

        </div>
        <br/>
        <div class="col-md-4 col-sm-offset-4">
            <div class="row" id="divAlert"></div>
        </div>`
    );
    $('#datetimepickerDesde').datetimepicker();
    $('#datetimepickerHasta').datetimepicker();

    $("#formEstadistica").bootstrapValidator({

        fields: {

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
                        
            url: "./admin.php/empleado/estadistica",
            type: "POST",
            data: { 
                mail: mail,
                fecha:$("#datetimepickerDesde").val(),
                fecha2:$("#datetimepickerHasta").val()
            },
            headers: { token: localStorage.getItem("token") },
            dataType: "json",
            async: true
        })
        .done(function(response) {

            AdministrarGif(false);
            var stringAuxiliar = "Este usuario no ha iniciado sesion.";
            var flag = 1;
        
            if(response.valido == "true") {
        
                for(let fecha of (response.datos).fechaLogin) {
        
                    if(flag) {
        
                        stringAuxiliar = `Historial de logins (${(response.datos).cantidadDeLogins} login(s) en total): <br/>${fecha}`;
                        flag = 0;
                        continue;
                    }
        
                    stringAuxiliar += "<br/>" + fecha;
                }
        
                flag = 1;
        
                for(let operacion of (response.datos).fechas) {
                                            
                    if(flag) {
                                            
                        stringAuxiliar += `<br/><br/>Historial de operaciones (${(response.datos).cantidadDeOperaciones} operacione(s) en total): <br/>${operacion.fecha}: ${operacion.cantidad} operaciones.`;
                        flag = 0;
                        continue;
                    }
                                            
                    stringAuxiliar += `<br/>${operacion.fecha}: ${operacion.cantidad} operacione(s).`;
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

function CambiarEstado(id  , estado) {

    let title = "Suspension";
    let accion = "suspender";

    if(estado == "1") {

        title = "Retornar";
        accion = "retornar";
    } 

    swal({
        title: `${title}`,
        type: 'question',
        html:`Estas seguro de que deseas ${accion} este usuario?`,
        showCloseButton: true,
        showCancelButton: true,}).then((response) => {

        if(response.value) {

            AdministrarGif(true);

            $.ajax({
                    
                url: "./admin.php/empleado/",
                type: "PUT",
                headers: { "token": localStorage.getItem("token") },
                data: {
                    id: id,
                    estado: estado},
                dataType: "json",
                async: true
            })
            .done(function(response) {

                AdministrarGif(false);

                if(response.valido == "true") {

                    swal(
                        "Exito!",
                        response.mensaje,
                        "success"
                    ).then(() => {

                        Mostrar();
                    });
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

                AdministrarGif(false);

                swal(
                    "Algo salio mal: ",
                    response,
                    "error"
                );
            });
        }
    });
}

function Borrar(id) {

    swal({

        title: 'Borrado',
        type: 'warning',
        html:'Estas seguro de que deseas borrar este usuario? No hay vuelta atras 😱',
        showCloseButton: true,
        showCancelButton: true,}).then((response) => {
    
        if(response.value) {

            AdministrarGif(true);
    
            $.ajax({
                        
                url: "./admin.php/empleado/",
                type: "DELETE",
                headers: { "token": localStorage.getItem("token") },
                data: { id: id },
                dataType: "json",
                async: true
            })
            .done(function(response) {

                AdministrarGif(false);
    
                if(response.valido == "true") {

                    swal(
                        "Exito!",
                        response.mensaje,
                        "success"
                    ).then(() => { Mostrar(); });
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

                AdministrarGif(false);
    
                swal(
                    "Algo salio mal: ",
                    response,
                    "error"
                );
            });
        }
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