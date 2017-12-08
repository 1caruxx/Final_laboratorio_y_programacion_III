<?php

    require_once "./src/backend/class/BaseDeDatos.php";
    require_once "./vendor/autoload.php";
    use \Firebase\JWT\JWT;

    date_default_timezone_set("America/Argentina/Buenos_Aires");

    class Auto {

        public static function Ingresar($request , $response , $archivo , $token) {

            $datos = "mysql:host=localhost;dbname=frankies";
            $user = "root";
            $pass = "";
            $datosAuto = $request->getParsedBody();
            $JWTdecodeado = JWT::decode($token , "12345" , array('HS256'));
            $time = new DateTime;

            try {

                $conexcion = new PDO($datos , $user , $pass);
                $resultados = $conexcion->prepare("SELECT `id` FROM `cocheras` WHERE `ocupada`=0 LIMIT 1");
                $resultados->execute();

                if($fila = $resultados->fetch(PDO::FETCH_ASSOC)) {

                    $consulta = "INSERT INTO `administracion`(`patente`, `marca`, `color`, `foto`, `id_empleado_entrada`, `fecha_ingreso`, `id_cochera`) VALUES ('".$datosAuto["patente"]."',
                        '".$datosAuto["marca"]."',
                        '".$datosAuto["color"]."',
                        :foto,
                        {$JWTdecodeado->id},
                        '".$time->format(DateTime::ATOM)."',
                        '".$fila["id"]."'
                    )";

                    BaseDeDatos::Administrar($request , $response , $token , $consulta , $archivo);

                    $resultados = $conexcion->prepare("UPDATE `cocheras` SET `ocupada`=1 WHERE `id`=".$fila["id"]);
                    $resultados->execute();
                    $conexcion = null;
                }
                else {

                    $response->getBody()->write('{"valido":"false","mensaje":"No hay cocheras disponibles."}');
                }
            }
            catch(Exception $exception) {

                $response->getBody()->write('{"valido":"false","mensaje":"Se ha atrapado una excepcion: '.$exception->getMessage().'"}');
            }
        }

        public static function Egresar($request , $response , $token) {

            $datos = "mysql:host=localhost;dbname=frankies";
            $user = "root";
            $pass = "";
            $datosAuto = $request->getParsedBody();
            $fechaEgreso = new DateTime();
            $JWTdecodeado = JWT::decode($token , "12345" , array('HS256'));
            
            try {
            
                $conexcion = new PDO($datos , $user , $pass);
                $resultados = $conexcion->prepare("SELECT `fecha_ingreso`,`id_cochera` FROM `administracion` WHERE `patente`='".$datosAuto["patente"]."'");
                $resultados->execute();
                $fila = $resultados->fetch(PDO::FETCH_ASSOC);

                $fechaIngreso = new DateTime($fila["fecha_ingreso"]);
                $importe = Auto::CalcularImporte($fechaIngreso , $fechaEgreso);

                $consulta = "UPDATE `administracion` SET `id_empleado_salida`={$JWTdecodeado->id},
                    `fecha_salida`='".$fechaEgreso->format(DateTime::ATOM)."',
                    `importe`=".$importe.",
                    `tiempo`=".($fechaIngreso->diff($fechaEgreso))->format("%H")."
                    WHERE `patente`='".$datosAuto["patente"]."'";

                $resultados = $conexcion->prepare($consulta);
                $resultados->execute();
                $resultados = $conexcion->prepare("UPDATE `cocheras` SET `ocupada`=0 WHERE `id`=".$fila["id_cochera"]);
                $resultados->execute();

                $response->getBody()->write('{"valido":"true","mensaje":"Se ha realizado correctamente la operacion. Se deben abonar: '.$importe.'"}');

                $conexcion = null;
            }
            catch(Exception $exception) {

                $response->getBody()->write("Se ha atrapado una excepcion: ".$exception->getMessage());
            }
        }

        private static function CalcularImporte($fechaIngreso , $fechaEgreso) {

            $diferencia = $fechaIngreso->diff($fechaEgreso);
            $horas = intval($diferencia->format("%H"));

            $importe = 0;

            for($i=0 ; $i<$horas ; $i++) {

                $importe += 10;

                if($i==11) { $importe == 90; }
                else { if($i==23) { $importe == 90; } }
            }

            return $importe;
        }
    }

?>