<?php

date_default_timezone_set("America/Argentina/Buenos_Aires");

require_once "./src/backend/class/Archivo.php";
require_once "./src/backend/class/Empleado.php";

/*$time = new DateTime("2017-12-05 13:32:0");
$time2 = new DateTime();
//$time->format(DateTime::ATOM);

$time2 = new DateTime();

$diferencia = $time->diff($time2);

echo $diferencia->format("%H %i");*/

//var_dump($time);

 
    //var_dump($elementos);


    /*echo date("Y-n-j");

    Empleado::RegistrarOperacion("fernando@hotmail.com");*/
    
    // $foto = date("Gis").".jpg";
    // $rutaFoto = "./src/backend/img/".$foto;

    // copy("./src/frontend/img/userDefault.jpg" , $rutaFoto);

    Empleado::Estadistica($_POST["mail"] , $_POST["fecha"] , $_POST["fecha2"]);

?>