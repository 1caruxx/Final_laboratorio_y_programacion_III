<?php

    class Archivo {

        public static function ObtenerElementos($ruta) {

            $elementos = array();

            if(!@ $archivo = fopen($ruta , "r")) {

                echo "No se ha podido abrir el archivo.";
            }
            else {

                while(!feof($archivo)) {

                    array_push($elementos , json_decode(trim(fgets($archivo))));
                }

                fclose($archivo);

                return array_filter($elementos);
            }
        }

        public static function Agregar($ruta , $elemento) {

            if(!@ $archivo = fopen($ruta , "a")) {

                echo "No se ha podido abrir el archivo.";
            }
            else {
            
                fwrite($archivo , $elemento);
                fclose($archivo);
            }
        }

        public static function Escribir($ruta , $elementos) {

            if(!@ $archivo = fopen($ruta , "w")) {

                echo "No se ha podido abrir el archivo.";
            }
            else {

                foreach($elementos as $elemento) {

                    fwrite($archivo , json_encode($elemento)."\r\n");
                }
                            
                fclose($archivo);
            }
        }
    }

?>