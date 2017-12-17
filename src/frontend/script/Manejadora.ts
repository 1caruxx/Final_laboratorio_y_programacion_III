/// <reference path="../../../node_modules/@types/jquery/index.d.ts"/>

$(document).ready(function () {

    if(localStorage.getItem("visualizacion") == null) {

        localStorage.setItem("visualizacion" , `{"color":null,"fuente":null,"tamaño":null,"table":"table"}`);
    }
    else {

        $("#bd").css("color" , (JSON.parse(<any>localStorage.getItem("visualizacion"))).color);
        $("#bd").css("font-size" , parseInt((JSON.parse(<any>localStorage.getItem("visualizacion"))).tamaño));
        $("#bd").css("font-family" , (JSON.parse(<any>localStorage.getItem("visualizacion"))).fuente);
        $("#tabla").attr("class" , (JSON.parse(<any>localStorage.getItem("visualizacion"))).table);
    }

    $("#barra").html(`<nav class="navbar navbar-inverse navbar-static-top" role="navigation">
                                        <div class="navbar-header">
                                            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex6-collapse">
                                                <span class="sr-only">Desplegar navegación</span>
                                                <span class="icon-bar"></span>
                                                <span class="icon-bar"></span>
                                                <span class="icon-bar"></span>
                                            </button>
                                            <img src="" class="navbar-brand" title="Este eres tu!" id="imgUser" />
                                        </div>
                            
                                        <div class="collapse navbar-collapse navbar-ex6-collapse">
                                            <ul class="nav nav-justified">
                            
                                                <li class="dropdown dropdown">
                                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" id="navUser"></a>
                                                    <ul class="dropdown-menu">
                                                        <li>
                                                            <a href="#" onclick="Deslogear()" title="Cerrar la sesion actual.">
                                                                <i class="glyphicon glyphicon-off"></i>&ensp;Salir
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </li>

                                                <li class="dropdown dropdown">
                                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                                        Empleados
                                                        <b class="caret"></b>
                                                    </a>
                                                    <ul class="dropdown-menu">
                                                        <li>
                                                            <a href="#" onclick="Clases.Manejadora.Registro()" title="Dar de alta un nuevo empleado.">
                                                                <i class="glyphicon glyphicon-plus"></i>&ensp;Alta
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#" onclick="Clases.Manejadora.Listar()" title="Motrar todos los empleados, suspenderlos, borrarlos y mostrar sus estadisticas.">
                                                                <i class="glyphicon glyphicon-list"></i>&ensp;Listar
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </li>

                                                <li class="dropdown dropdown">
                                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                                        <img src="./src/frontend/img/favicon.ico" width="30px" height="30px" id="imgGif"/>
                                                    </a>
                                                </li>

                                                <li class="dropdown dropdown">
                                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                                        Autos
                                                        <b class="caret"></b>
                                                    </a>
                                                    <ul class="dropdown-menu">
                                                        <li>
                                                            <a href="#" onclick="Clases.Manejadora.Ingresar()" title="Ingresar un nuevo auto.">
                                                                <i class="glyphicon glyphicon-arrow-up"></i>&ensp;Ingresar
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#" onclick="Clases.Manejadora.MostrarHistorial()" title="Mostrar el historial de los autos aparcados asi como sus estadisticas.">
                                                                <i class="glyphicon glyphicon-time"></i>&ensp;Historial
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#" onclick="Clases.Manejadora.MostrarCocheras()" title="Mostrar las cocheras.">
                                                                <i class="glyphicon glyphicon-road"></i>&ensp;Cocheras
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </li>

                                                <li class="dropdown dropdown">
                                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                                        Visualizacion
                                                        <b class="caret"></b>
                                                    </a>

                                                    <ul class="dropdown-menu">
                                                        <li>
                                                            <a href="#" title="Cambiar el color de las letras.">
                                                                <input type="color" class="form-control" onchange="Clases.Manejadora.CambiarColorFuente(this.value)"/>
                                                            </a>

                                                        </li>
                                                        <li>
                                                            <a href="#" title="Cambiar el tamaño de la fuente.">
                                                                <input type="range" onchange="Clases.Manejadora.CambiarTamaño(this.value)" value="16" min="9" max="50"/>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#" onclick="Clases.Manejadora.CambiarFuente('Papyrus')" title="Cambiar fuente de letra a Papyrus.">
                                                                <i class="glyphicon glyphicon-font"></i>&ensp;Papyrus
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#" onclick="Clases.Manejadora.CambiarFuente('Impact')" title="Cambiar fuente de letra a Impact.">
                                                                <i class="glyphicon glyphicon-font"></i>&ensp;Impact
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#" onclick="Clases.Manejadora.CambiarFuente('Lucida Handwriting')" title="Cambiar fuente de letra a Lucida Handwriting.">
                                                                <i class="glyphicon glyphicon-font"></i>&ensp;Lucida Handwriting
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#" onclick="Clases.Manejadora.CambiarTabla('tabla')" title="Cmbiar el estilo de la tabla">
                                                                <i class="glyphicon glyphicon-font"></i>&ensp;Tabla 1
                                                            </a>
                                                        </li>

                                                        <li>
                                                            <a href="#" onclick="Clases.Manejadora.CambiarTabla('tabla2')" title="Cmbiar el estilo de la tabla">
                                                                <i class="glyphicon glyphicon-font"></i>&ensp;Tabla 2
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#" onclick="Clases.Manejadora.CambiarTabla('tabla3')" title="Cmbiar el estilo de la tabla">
                                                                <i class="glyphicon glyphicon-font"></i>&ensp;Tabla 3
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#" onclick="Clases.Manejadora.Default()" title="Setear las configuraciones prestablecidas.">
                                                                <i class="glyphicon glyphicon-font"></i>&ensp;Default
                                                            </a>
                                                        </li>

                                                    </ul>
                                                </li>
                                            </ul>
                                        </div>
                                    </nav>`);
});

namespace Clases {

    export class Manejadora {

        public static Ingresar() { location.href = "./ingresar.html"; }
        public static MostrarHistorial() { location.href = "./historial.html"; }
        public static Registro() { location.href = "./alta.html"; }
        public static Volver() { location.href = "./principal.html"; }
        public static Listar() { location.href = "./listar.html"; }
        public static Modificar() { location.href = "./modificacion.html"; }
        public static MostrarCocheras() { location.href = "./cocheras.html"; }

        public static CambiarColorFuente(valor:number|string) {

            $("#bd").css("color" ,`${valor}`);
            let config = JSON.parse(<any>localStorage.getItem("visualizacion"));
            config.color = valor;
            localStorage.setItem("visualizacion" , JSON.stringify(config));
        }

        public static CambiarTamaño(valor:number) {

            $("#bd").css("font-size" ,`${valor}px`);
            let config = JSON.parse(<any>localStorage.getItem("visualizacion"));
            config.tamaño = valor;
            localStorage.setItem("visualizacion" , JSON.stringify(config));
        }

        public static CambiarFuente(valor:string) {

            $("#bd").css("font-family" ,`${valor}`);
            let config = JSON.parse(<any>localStorage.getItem("visualizacion"));
            config.fuente = valor;
            localStorage.setItem("visualizacion" , JSON.stringify(config));
        }

        public static Default() {

            Manejadora.CambiarColorFuente("black");
            Manejadora.CambiarTamaño(16);
            Manejadora.CambiarFuente("sans-serif");
            Manejadora.CambiarTabla("table");
        }

        public static CambiarTabla(valor:string) {

            $("#tabla").attr("class" , valor) ;
            let config = JSON.parse(<any>localStorage.getItem("visualizacion"));
            config.table = valor;
            localStorage.setItem("visualizacion" , JSON.stringify(config));
        }
    }
}
