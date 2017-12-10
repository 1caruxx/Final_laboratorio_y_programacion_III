<?php

    date_default_timezone_set("America/Argentina/Buenos_Aires");

    require_once "./src/backend/class/Archivo.php";
    require_once "./vendor/autoload.php";
    use \Firebase\JWT\JWT;

    class Empleado {

        public $id;
        public $apellido;
        public $nombre;
        public $clave;
        public $mail;
        public $turno;
        public $sexo;
        public $foto;
        public $estado;
        public $perfil;

        public function __construct($id=null , $apellido , $nombre , $clave , $mail , $turno , $sexo , $foto , $estado , $perfil) {

            if($id) {

                $this->id = $id;
            }

            $this->id = $id;
            $this->apellido = $apellido;
            $this->nombre = $nombre;
            $this->clave = $clave;
            $this->mail = $mail;
            $this->turno = $turno;
            $this->sexo = $sexo;
            $this->foto = $foto;
            $this->estado = $estado;
            $this->perfil = $perfil;
        }

        public static function Logear($request , $response) {

            $datos = "mysql:host=localhost;dbname=frankies";
            $user = "root";
            $pass = "";
            $datosEmpleado = $request->getParsedBody();
            
            try {
            
                $conexcion = new PDO($datos , $user , $pass);
                $resultados = $conexcion->prepare("SELECT * FROM `empleados` WHERE `mail`='".$datosEmpleado["mail"]."' and `clave`='".$datosEmpleado["clave"]."'");
                $resultados->execute();
            
                if($fila = $resultados->fetch(PDO::FETCH_ASSOC)) {

                    if($fila["estado"] == 1) {
            
                        $empleado = new Empleado($fila["id"] , $fila["apellido"] , $fila["nombre"] , $fila["clave"] , $fila["mail"] , $fila["turno"] , $fila["sexo"] , $fila["foto"] , $fila["estado"] , $fila["perfil"]);
                        $key = "12345";
                        $token = array(
                
                            "id" => $fila["id"],
                            "apellido" => $fila["apellido"],
                            "nombre" => $fila["nombre"],
                            "clave" => $fila["clave"],
                            "mail" => $fila["mail"],
                            "turno" => $fila["turno"],
                            "sexo" => $fila["sexo"],
                            "foto" => $fila["foto"],
                            "estado" => $fila["estado"],
                            "perfil" => $fila["perfil"]
                        );
                        $jwt = JWT::encode($token, $key);

                        Empleado::RegistrarLogin($fila["mail"]);
                
                        $response->getBody()->write('{"valido":"true","empleado":'.json_encode($empleado).',"token":"'.$jwt.'"}');
                    }
                    else {

                        $response->getBody()->write('{"valido":"false","mensaje":"Esta cuenta a sido suspendida o borrada."}');
                    }
                }
                else {
            
                    $response->getBody()->write('{"valido":"false","mensaje":"Empleado inexistente."}');
                }

                $conexcion = null;
            }
            catch(Exception $exception) {
            
                $response->getBody()->write('{"valido":"false","mensaje":"Se ha atrapado una excepcion: '.$exception->getMessage().'"}');
            }
        }

        private static function RegistrarLogin($mail) {

            $empleados = Archivo::ObtenerElementos("./src/backend/file/empleados.json");

            foreach($empleados as $empleado) {

                if($empleado && $empleado->mail == $mail) {

                    array_push($empleado->logins , (new DateTime())->format(DateTime::ATOM));
                }
            }

            Archivo::Escribir("./src/backend/file/empleados.json" , array_filter($empleados));
        }

        public static function RegistrarOperacion($mail) {

            $empleados = Archivo::ObtenerElementos("./src/backend/file/empleados.json");

            foreach($empleados as $empleado) {

                if(@$empleado->mail == $mail) {

                    foreach($empleado->operaciones as $operacion) {

                        if($operacion->fecha == date("Y-m-d")) {

                            $operacion->cantidad++;
                            Archivo::Escribir("./src/backend/file/empleados.json" , array_filter($empleados));
                            return;
                        }
                    }

                    array_push($empleado->operaciones , json_decode('{"fecha":"'.date("Y-m-d").'","cantidad":1}'));
                    Archivo::Escribir("./src/backend/file/empleados.json" , array_filter($empleados));
                }
            }
        }

        public static function Estadistica($request , $response) {

            $datos = $request->getParsedBody();
            $mail = $datos["mail"];
            $fecha = $datos["fecha"];
            @$fecha2 = $datos["fecha2"];

            $encontrado = false;

            $empleados = Archivo::ObtenerElementos("./src/backend/file/empleados.json");
            $empleado = null;
            $array = array();
            $array["fechas"] = array();
            $array["cantidadDeOperaciones"] = 0;
            $array["fechaLogin"] = array();
            $array["cantidadDeLogins"] = 0;

            $fecha = explode("-" , $fecha);
            $fecha = $fecha[0].$fecha[1].$fecha[2];
            $fecha = intval($fecha);

            foreach($empleados as $item) {
            
                if($item && $item->mail == $mail) {
            
                    $empleado = $item;
                    $encontrado = true;
                    break;
                }
            }

            if(!$encontrado) {

                $response->getBody()->write('{"valido":"false","mensaje":"Empleado inexistente."}');
                return;
            }

            if($fecha2) {

                $fecha2 = explode("-" , $fecha2);
                $fecha2 = $fecha2[0].$fecha2[1].$fecha2[2];
                $fecha2 = intval($fecha2);

                foreach($empleado->operaciones as $operacion) {

                    $fechaOperacion = explode("-" , $operacion->fecha);
                    $fechaOperacion = $fechaOperacion[0].$fechaOperacion[1].$fechaOperacion[2];
                    $fechaOperacion = intval($fechaOperacion);

                    if($fechaOperacion>=$fecha && $fechaOperacion<=$fecha2) {

                        array_push($array["fechas"] , $operacion);
                        $array["cantidadDeOperaciones"] += $operacion->cantidad;
                    }
                }

                foreach($empleado->logins as $login) {

                    $fechaLogin = explode("-" , substr($empleado->logins[0] , 0 , 10));
                    $fechaLogin = $fechaLogin[0].$fechaLogin[1].$fechaLogin[2];
                    $fechaLogin = intval($fechaLogin);

                    if($fechaLogin>=$fecha && $fechaLogin<=$fecha2) {

                        array_push($array["fechaLogin"] , $login);
                    }
                }

                $array["cantidadDeLogins"] += count($array["fechaLogin"]);
            }
            else {

                foreach($empleado->operaciones as $operacion) {

                    $fechaOperacion = explode("-" , $operacion->fecha);
                    $fechaOperacion = $fechaOperacion[0].$fechaOperacion[1].$fechaOperacion[2];
                    $fechaOperacion = intval($fechaOperacion);
                    
                    if($fechaOperacion == $fecha) {

                        array_push($array["fechas"] , $operacion);
                        $array["cantidadDeOperaciones"] = $operacion->cantidad;
                        break;
                    }
                }

                foreach($empleado->logins as $login) {
                    
                    $fechaLogin = explode("-" , substr($empleado->logins[0] , 0 , 10));
                    $fechaLogin = $fechaLogin[0].$fechaLogin[1].$fechaLogin[2];
                    $fechaLogin = intval($fechaLogin);
                    
                    if($fechaLogin == $fecha) {
                    
                        array_push($array["fechaLogin"] , $login);
                    }
                }

                $array["cantidadDeLogins"] += count($array["fechaLogin"]);
            }

            $response->getBody()->write('{"valido":"true","datos":'.json_encode($array).'}');
        }
    }

?>