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
                                            <img src="" class="navbar-brand" title="Este eres tu" id="imgUser" />
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
                                                            <a href="#" onclick="Deslogear()">
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
                                                            <a href="#" onclick="Clases.Manejadora.Registro()">
                                                                <i class="glyphicon glyphicon-plus"></i>&ensp;Alta</a>
                                                        </li>
                                                        <li>
                                                            <a href="#" onclick="Clases.Manejadora.Listar()">
                                                                <i class="glyphicon glyphicon-list"></i>&ensp;Listar</a>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li class="dropdown dropdown">
                                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                                        Autos
                                                        <b class="caret"></b>
                                                    </a>
                                                    <ul class="dropdown-menu">
                                                        <li>
                                                            <a href="#" onclick="Clases.Manejadora.Ingresar()">
                                                                <i class="glyphicon glyphicon-arrow-up"></i>&ensp;Ingresar</a>
                                                        </li>
                                                        <li>
                                                            <a href="#" onclick="Clases.Manejadora.MostrarHistorial()">
                                                                <i class="glyphicon glyphicon-time"></i>&ensp;Historial</a>
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
    }
}
