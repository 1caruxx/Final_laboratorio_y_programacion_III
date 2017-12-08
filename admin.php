<?php

    use \Psr\Http\Message\ServerRequestInterface as Request;
    use \Psr\Http\Message\ResponseInterface as Response;

    require_once './vendor/autoload.php';
    require_once "./src/backend/class/BaseDeDatos.php";
    require_once "./src/backend/class/Archivo.php";
    require_once "./src/backend/class/Middleware.php";
    require_once "./src/backend/class/Empleado.php";
    require_once "./src/backend/class/Auto.php";

    $config['displayErrorDetails'] = true;
    $config['addContentLengthHeader'] = false;

    $app = new \Slim\App(["settings" => $config]);

    $app->post("/login[/]" , function(Request $request , Response $response) {

        Empleado::Logear($request , $response);
        return $response;
    });

    $app->group("/empleado" , function() {

        $this->get("[/]" , function(Request $request , Response $response) {

            BaseDeDatos::Listar($request , $response , "empleados");
            return $response;
        });

        $this->post("[/]" , function(Request $request , Response $response) {

            var_dump($_FILES["foto"]);

            $datosEmpleado = $request->getParsedBody();
            $consulta = "INSERT INTO `empleados`(`apellido`, `nombre`, `clave`, `mail`, `turno`, `sexo`, `foto`, `estado`, `perfil`) VALUES ('".$datosEmpleado["apellido"]."','".$datosEmpleado["nombre"]."','".$datosEmpleado["clave"]."','".$datosEmpleado["mail"]."','".$datosEmpleado["turno"]."','".$datosEmpleado["sexo"]."',:foto,1,'".$datosEmpleado["perfil"]."')";
            Archivo::Agregar("./src/backend/file/empleados.json" , '{"mail":"'.$datosEmpleado["mail"].'","apellido":"'.$datosEmpleado["apellido"].'","nombre":"'.$datosEmpleado["nombre"].'","logins":[],"operaciones":[]}'."\r\n");

            BaseDeDatos::Administrar($request , $response , apache_request_headers()["token"] , $consulta , $_FILES , null , true);
            return $response;
        })->add(\Middleware::class . ":VerificarInexistencia");

        $this->post("/modificar[/]" , function(Request $request , Response $response) {

            $datosEmpleado = $request->getParsedBody();
            $consulta = "UPDATE `empleados` SET `apellido`='".$datosEmpleado["apellido"]."',`nombre`='".$datosEmpleado["nombre"]."',`clave`='".$datosEmpleado["clave"]."',`mail`='".$datosEmpleado["mail"]."',`turno`='".$datosEmpleado["turno"]."',`sexo`='".$datosEmpleado["sexo"]."',`foto`=:foto,`perfil`='".$datosEmpleado["perfil"]."' WHERE `id`=".$datosEmpleado["id"];
            
            BaseDeDatos::Administrar($request , $response , apache_request_headers()["token"] , $consulta , $_FILES , "empleados");
            return $response;
        });

        $this->put("[/]" , function(Request $request , Response $response) {

            $datosEmpleado = $request->getParsedBody();
            $consulta = "UPDATE `empleados` SET `estado`=2 WHERE `id`=".$datosEmpleado["id"];
                        
            BaseDeDatos::Administrar($request , $response , apache_request_headers()["token"] , $consulta);
            return $response;
        });

        $this->delete("[/]" , function(Request $request , Response $response) {

            $datosEmpleado = $request->getParsedBody();
            $consulta = "UPDATE `empleados` SET `estado`=0 WHERE `id`=".$datosEmpleado["id"];
            
            BaseDeDatos::Administrar($request , $response , apache_request_headers()["token"] , $consulta);
            return $response;
        });
    })->add(function($request , $response , $next) {

        Middleware::ValidarJWT($request , $response , $next , apache_request_headers()["token"] , true);
        return $response;
    });

    $app->group("/auto" , function() {

        $this->get("[/]" , function(Request $request , Response $response) {

            BaseDeDatos::Listar($request , $response , "administracion");
            return $response;
        });

        $this->post("/ingreso[/]" , function(Request $request , Response $response) {

            Auto::Ingresar($request , $response , $_FILES , apache_request_headers()["token"]);
            return $response;
        })->add(\Middleware::class . ":VerificarDesalojamiento");

        $this->post("/egreso[/]" , function(Request $request , Response $response) {

            Auto::Egresar($request , $response , apache_request_headers()["token"]);
            return $response;
        })->add(\Middleware::class . ":VerificarAlojamiento");

    })->add(function($request , $response , $next) {

        Middleware::ValidarJWT($request , $response , $next , apache_request_headers()["token"]);
        return $response;
    });

    $app->run();

?>