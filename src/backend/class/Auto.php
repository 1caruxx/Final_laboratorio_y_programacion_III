<?php

    require_once "./src/backend/class/BaseDeDatos.php";
    require_once "./src/backend/class/Archivo.php";
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

                Auto::RegistrarDatos($datosAuto["patente"] , $importe);

                $response->getBody()->write('{"valido":"true","mensaje":"Se ha realizado correctamente la operacion. Se deben abonar: $'.$importe.'"}');

                $conexcion = null;
            }
            catch(Exception $exception) {

                $response->getBody()->write("Se ha atrapado una excepcion: ".$exception->getMessage());
            }
        }

        private static function CalcularImporte($fechaIngreso , $fechaEgreso) {

            $diferencia = $fechaIngreso->diff($fechaEgreso);
            $horas = intval($diferencia->format("%H"));
            $minutos = intval($diferencia->format("%i"));

            $importe = 0;

            for($i=0 ; $i<$horas ; $i++) {

                $importe += 10;

                if($i==11) { $importe = 90; }
                else { if($i==23) { $importe = 170; } }
            }

            $importe += (10/60)*$minutos;

            return floatval(number_format($importe , 2));
        }

        private function RegistrarDatos($patente , $cantidad) {

            $autos = Archivo::ObtenerElementos("./src/backend/file/autos.json");
            $encontrado = false;

            foreach($autos as $auto) {

                if($auto->patente == $patente) {

                    foreach($auto->importes as $importe) {

                        $importe->visitas++;

                        if($importe->fecha == date("Y-m-d")) {

                            $importe->cantidad += $cantidad;
                            Archivo::Escribir("./src/backend/file/autos.json" , array_filter($autos));
                            return;
                        }
                        else {

                            array_push($auto->importes , json_decode('{"fecha":"'.date("Y-m-d").'","cantidad":'.$cantidad.',"visitas":1}'));
                            Archivo::Escribir("./src/backend/file/autos.json" , array_filter($autos));
                        }
                    }

                    $encontrado = true;
                }
            }

            if(!$encontrado) {

                Archivo::Agregar("./src/backend/file/autos.json" , '{"patente":"'.$patente.'","importes":[{"fecha":"'.date("Y-m-d").'","cantidad":'.$cantidad.',"visitas":1}]}'."\r\n");
            }
        }

        public static function Estadistica($request , $response) {

            $datos = $request->getParsedBody();
            $patente = $datos["patente"];
            $fecha = $datos["fecha"];
            @$fecha2 = $datos["fecha2"];

            $encontrado = false;

            $autos = Archivo::ObtenerElementos("./src/backend/file/autos.json");
            $auto = null;
            $array = array();
            $array["fechas"] = array();
            $array["importeTotal"] = 0;
            $array["visitasTotales"] = 0;
            $array["promedioMensual"] = 0;
            $array["promedioMensualTotal"] = Auto::PromedioMensual($autos);

            $fecha = explode("-" , $fecha);
            $fecha = $fecha[0].$fecha[1].$fecha[2];
            $fecha = intval($fecha);

            foreach($autos as $item) {
            
                if($item && $item->patente == $patente) {
            
                    $auto = $item;
                    $array["promedioMensual"] = Auto::PromedioMensual(null , $auto);
                    $encontrado = true;
                    break;
                }
            }

            if(!$encontrado) {

                $response->getBody()->write('{"valido":"false","mensaje":"Auto inexistente."}');
                return;
            }

            if($fecha2) {

                $fecha2 = explode("-" , $fecha2);
                $fecha2 = $fecha2[0].$fecha2[1].$fecha2[2];
                $fecha2 = intval($fecha2);

                foreach($auto->importes as $importe) {

                    $fechaImporte = explode("-" , $importe->fecha);
                    $fechaImporte = $fechaImporte[0].$fechaImporte[1].$fechaImporte[2];
                    $fechaImporte = intval($fechaImporte);

                    if($fechaImporte>=$fecha && $fechaImporte<=$fecha2) {

                        array_push($array["fechas"] , $importe);
                        $array["importeTotal"] += floatval(number_format($importe->cantidad , 2));
                        $array["visitasTotales"] += $importe->visitas;
                    }
                }

            }
            else {

                foreach($auto->importes as $importe) {

                    $fechaImporte = explode("-" , $importe->fecha);
                    $fechaImporte = $fechaImporte[0].$fechaImporte[1].$fechaImporte[2];
                    $fechaImporte = intval($fechaImporte);
                    
                    if($fechaImporte == $fecha) {

                        array_push($array["fechas"] , $importe);
                        $array["importeTotal"] = floatval(number_format($importe->cantidad , 2));
                        $array["visitasTotales"] = $importe->visitas;
                        break;
                    }
                }
            }

            $response->getBody()->write('{"valido":"true","datos":'.json_encode($array).'}');
        }

        private static function PromedioMensual($autos=null , $auto=null) {

            $total = 0;

            if($auto) {

                foreach($auto->importes as $importe) {

                    if(explode("-" , $importe->fecha)[1] == date("m")) {

                        $total += $importe->cantidad;
                    }
                }
            }
            else {

                foreach($autos as $auto) {

                    foreach($auto->importes as $importe) {

                        if(explode("-" , $importe->fecha)[1] == date("m")) {
                        
                            $total += $importe->cantidad;
                        }
                    }
                }
            }

            return floatval(number_format($total/30 , 2));
        }
    }

?>