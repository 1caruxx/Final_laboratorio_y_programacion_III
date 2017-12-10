/// <reference path="../../../node_modules/@types/jquery/index.d.ts"/>

$(document).ready(function () {

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
                                            <ul class="nav navbar-nav">
                            
                                                <li class="dropdown dropdown">
                                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" id="navUser"></a>
                                                    <ul class="dropdown-menu">
                                                        <li>
                                                            <a href="#" onclick="MostrarDatos()">
                                                                <i class="glyphicon glyphicon-info-sign"></i>&ensp;Datos</a>
                                                        </li>
                                                        <li>
                                                            <a href="#" onclick="Deslogear()">
                                                                <i class="glyphicon glyphicon-cog"></i>&ensp;Modificar</a>
                                                        </li>
                                                        <li>
                                                            <a href="#" onclick="Deslogear()" title="Cerrar la sesion actual.">
                                                                <i class="glyphicon glyphicon-off"></i>&ensp;Salir</a>
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
                                                                <i class="glyphicon glyphicon-plus"></i>&ensp;Alta</a>
                                                        </li>
                                                        <li>
                                                            <a href="#" onclick="Clases.Manejadora.Listar()" title="Motrar todos los empleados, suspenderlos, borrarlos y mostrar sus estadisticas.">
                                                                <i class="glyphicon glyphicon-list"></i>&ensp;Listar</a>
                                                        </li>
                                                        <li>
                                                            <a href="#" onclick="Clases.Manejadora.Modificar()" title="Modificar un empleado existente.">
                                                                <i class="glyphicon glyphicon-sort"></i>&ensp;Modificar</a>
                                                        </li>
                                                    </ul>
                                                </li>

                                                <li class="dropdown dropdown">
                                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                                        <img src="./src/frontend/img/favicon.ico" width="20px" height="20px">
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
                                                                <i class="glyphicon glyphicon-arrow-up"></i>&ensp;Ingresar</a>
                                                        </li>
                                                        <li>
                                                            <a href="#" onclick="Clases.Manejadora.MostrarHistorial()" title="Mostrar el historial de los autos aparcados asi como sus estadisticas.">
                                                                <i class="glyphicon glyphicon-time"></i>&ensp;Historial</a>
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
                                                                <i class="glyphicon glyphicon-text-color"></i>&ensp;Color de fuente</a>
                                                        </li>
                                                        <li>
                                                            <a href="#" title="Cambiar el tipo de fuente.">
                                                                <i class="glyphicon glyphicon-font"></i>&ensp;Fuente</a>
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

    }
}
