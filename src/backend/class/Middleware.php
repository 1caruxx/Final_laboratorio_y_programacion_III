<?php

    require_once "./vendor/autoload.php";
    use \Firebase\JWT\JWT;

    class Middleware {

        public static function VerificarInexistencia($request , $response , $next) {

            $datos = "mysql:host=localhost;dbname=frankies";
            $user = "root";
            $pass = "";
            $datosEmpleado = $request->getParsedBody();

            try {

                $conexcion = new PDO($datos , $user , $pass);
                $resultados = $conexcion->prepare("SELECT * FROM `empleados` WHERE `mail`='".$datosEmpleado["mail"]."'"); // OR `turno`='".$datosEmpleado["turno"]."'
                $resultados->execute();

                if($fila = $resultados->fetch(PDO::FETCH_ASSOC)) {

                    $response->getBody()->write('{"valido":"false","mensaje":"El empleado ya existe."}');
                }
                else {

                    $response = $next($request , $response);
                }
            }
            catch(Exception $exception) {

                $response->getBody()->write('{"valido":"false","mensaje":"Se ha atrapado una excepcion: '.$exception->getMessage().'"}');
            }

            return $response;
        }

        public static function VerificarSuspension($request , $response , $next) {

            $datos = "mysql:host=localhost;dbname=frankies";
            $user = "root";
            $pass = "";
            $datosEmpleado = $request->getParsedBody();

            try {

                $conexcion = new PDO($datos , $user , $pass);
                $resultados = $conexcion->prepare("SELECT * FROM `empleados` WHERE `id`=".$datosEmpleado["id"]." and `estado`=".$datosEmpleado["estado"]."");
                $resultados->execute();

                if($fila = $resultados->fetch(PDO::FETCH_ASSOC)) {

                    $response->getBody()->write('{"valido":"false","mensaje":"El empleado ya ha sido previamente suspendido o eliminado."}');
                }
                else {

                    $response = $next($request , $response);
                }
            }
            catch(Exception $exception) {

                $response->getBody()->write('{"valido":"false","mensaje":"Se ha atrapado una excepcion: '.$exception->getMessage().'"}');
            }

            return $response;
        }

        public static function VerificarEliminacion($request , $response , $next) {

            $datos = "mysql:host=localhost;dbname=frankies";
            $user = "root";
            $pass = "";
            $datosEmpleado = $request->getParsedBody();

            try {

                $conexcion = new PDO($datos , $user , $pass);
                $resultados = $conexcion->prepare("SELECT * FROM `empleados` WHERE `mail`='".$datosEmpleado["mail"]."' and `estado`=0");
                $resultados->execute();

                if($fila = $resultados->fetch(PDO::FETCH_ASSOC)) {

                    $response->getBody()->write('{"valido":"false","mensaje":"El empleado ya ha sido previamente eliminado."}');
                }
                else {

                    $response = $next($request , $response);
                }
            }
            catch(Exception $exception) {

                $response->getBody()->write('{"valido":"false","mensaje":"Se ha atrapado una excepcion: '.$exception->getMessage().'"}');
            }

            return $response;
        }

        public static function VerificarDesalojamiento($request , $response , $next) {

            $datos = "mysql:host=localhost;dbname=frankies";
            $user = "root";
            $pass = "";
            $datosAuto = $request->getParsedBody();

            try {

                $conexcion = new PDO($datos , $user , $pass);
                $resultados = $conexcion->prepare("SELECT * FROM `administracion` WHERE `patente`='".$datosAuto["patente"]."' and `fecha_salida` IS NULL");
                $resultados->execute();

                if($fila = $resultados->fetch(PDO::FETCH_ASSOC)) {

                    $response->getBody()->write('{"valido":"false","mensaje":"El auto ya esta siendo alojado en la cochera: '.$fila["id_cochera"].'."}');
                }
                else {

                    $response = $next($request , $response);
                }
            }
            catch(Exception $exception) {

                $response->getBody()->write('{"valido":"false","mensaje":"Se ha atrapado una excepcion: '.$exception->getMessage().'"}');
            }

            return $response;
        }

        public static function VerificarAlojamiento($request , $response , $next) {

            $datos = "mysql:host=localhost;dbname=frankies";
            $user = "root";
            $pass = "";
            $datosAuto = $request->getParsedBody();

            try {

                $conexcion = new PDO($datos , $user , $pass);
                $resultados = $conexcion->prepare("SELECT * FROM `administracion` WHERE `patente`='".$datosAuto["patente"]."' and `fecha_salida` IS NULL");
                $resultados->execute();

                if($fila = $resultados->fetch(PDO::FETCH_ASSOC)) {

                    $response = $next($request , $response);
                }
                else {

                    $response->getBody()->write('{"valido":"false","mensaje":"Este auto no esta siendo aparcado actualmente."}');
                }
            }
            catch(Exception $exception) {

                $response->getBody()->write('{"valido":"false","mensaje":"Se ha atrapado una excepcion: '.$exception->getMessage().'"}');
            }

            return $response;
        }

        public static function ValidarJWT($request , $response , $next , $token , $verficarPerfil=false) {

            try {

                $JWTdecodeado = JWT::decode($token , "12345" , array('HS256'));

                if($verficarPerfil) {

                    if($JWTdecodeado->perfil == "administrador") {

                        $response = $next($request , $response);
                    }
                    else {

                        $response->getBody()->write('{"valido":"false","mensaje":"No tienes permisos para realizar esta operacion."}');
                    }
                }
                else {

                    $response = $next($request , $response);
                }
            }
            catch(Exception $exception) {
                                
                $response->getBody()->write('{"valido":"false","mensaje":"Se ha atrapado una excepcion: '.$exception->getMessage().'"}');
            }
                                
            return $response;
        }
    }

?>