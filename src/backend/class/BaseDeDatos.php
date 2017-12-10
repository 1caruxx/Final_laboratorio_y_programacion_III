<?php

    require_once "./src/backend/class/Empleado.php";
    require_once "./vendor/autoload.php";
    use \Firebase\JWT\JWT;

    class BaseDeDatos {

        public static function Listar($request , $response , $tabla , $condicion=1) {

            $datos = "mysql:host=localhost;dbname=frankies";
            $user = "root";
            $pass = "";
            $autos = array();
                        
            try {
                        
                $conexcion = new PDO($datos , $user , $pass);
                $resultados = $conexcion->prepare("SELECT * FROM `".$tabla."` WHERE ".$condicion);
                $resultados->execute();
                        
                while($fila = $resultados->fetch(PDO::FETCH_ASSOC)) {
                        
                    array_push($autos , $fila);
                }
                        
                $response->getBody()->write(json_encode($autos));
            }
            catch(Exception $exception) {
                        
                $response->getBody()->write('{"valido":"false","mensaje":"Se ha atrapado una excepcion: '.$exception->getMessage().'"}');
            }
        }

        public static function Administrar($request , $response , $token , $consulta , $archivo=null , $baseDeDatos=null , $generarBackup=false) {

            $datos = "mysql:host=localhost;dbname=frankies";
            $user = "root";
            $pass = "";
            $datosEmpleado = $request->getParsedBody();

            try {
            
                $conexcion = new PDO($datos , $user , $pass);
            
                if($baseDeDatos) {
            
                    $resultados = $conexcion->prepare("SELECT `foto` FROM `".$baseDeDatos."` WHERE `mail`='".$datosEmpleado["mail"]."'");
                    $resultados->execute();
                    @unlink("./src/backend/img/".$resultados->fetch(PDO::FETCH_ASSOC)["foto"]);
                }
            
                if(@$archivo["foto"]["name"]) {

                    $foto = date("Gis").".".pathinfo($archivo["foto"]["name"] , PATHINFO_EXTENSION);
                    $rutaFoto = "./src/backend/img/".$foto;
                    $resultados = $conexcion->prepare($consulta);
                    $resultados->bindParam(':foto' , $foto);
                    move_uploaded_file($archivo["foto"]["tmp_name"] , $rutaFoto);
                }
                else {

                    $resultados = $conexcion->prepare($consulta);
                    $foto = null;
                    $resultados->bindParam(':foto' , $foto);
                }
            
                $resultados->execute();
                $conexcion = null;

                if($generarBackup) {

                    BaseDeDatos::GenerarBackup("localhost" , "root" , "" , "frankies");
                }

                $JWTdecodeado = JWT::decode($token , "12345" , array('HS256'));
                Empleado::RegistrarOperacion($JWTdecodeado->mail);

                $response->getBody()->write('{"valido":"true","mensaje":"Se ha realizado correctamente la operacion."}'); 
            }
            catch(Exception $exception) {
            
                $response->getBody()->write('{"valido":"false","mensaje":"Se ha atrapado una excepcion: '.$exception->getMessage().'"}');
            }
        }

        public static function GenerarBackup($host , $user , $pass , $name , $tables=false , $backup_name=false) {

            set_time_limit(3000); $mysqli = new mysqli($host,$user,$pass,$name); $mysqli->select_db($name); $mysqli->query("SET NAMES 'utf8'");
            $queryTables = $mysqli->query('SHOW TABLES'); while($row = $queryTables->fetch_row()) { $target_tables[] = $row[0]; }   if($tables !== false) { $target_tables = array_intersect( $target_tables, $tables); } 
            $content = "SET SQL_MODE = \"NO_AUTO_VALUE_ON_ZERO\";\r\nSET time_zone = \"+00:00\";\r\n\r\n\r\n/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;\r\n/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;\r\n/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;\r\n/*!40101 SET NAMES utf8 */;\r\n--\r\n-- Database: `".$name."`\r\n--\r\nCREATE DATABASE IF NOT EXISTS `".$name."` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
            USE `frankies`;\r\n\r\n";
            foreach($target_tables as $table){
                if (empty($table)){ continue; } 
                $result = $mysqli->query('SELECT * FROM `'.$table.'`');     $fields_amount=$result->field_count;  $rows_num=$mysqli->affected_rows;     $res = $mysqli->query('SHOW CREATE TABLE '.$table); $TableMLine=$res->fetch_row(); 
                $content .= "\n\n".$TableMLine[1].";\n\n";
                for ($i = 0, $st_counter = 0; $i < $fields_amount;   $i++, $st_counter=0) {
                    while($row = $result->fetch_row())  { //when started (and every after 100 command cycle):
                        if ($st_counter%100 == 0 || $st_counter == 0 )  {$content .= "\nINSERT INTO ".$table." VALUES";}
                            $content .= "\n(";    for($j=0; $j<$fields_amount; $j++){ $row[$j] = str_replace("\n","\\n", addslashes($row[$j]) ); if (isset($row[$j])){$content .= '"'.$row[$j].'"' ;}  else{$content .= '""';}     if ($j<($fields_amount-1)){$content.= ',';}   }        $content .=")";
                        //every after 100 command cycle [or at last line] ....p.s. but should be inserted 1 cycle eariler
                        if ( (($st_counter+1)%100==0 && $st_counter!=0) || $st_counter+1==$rows_num) {$content .= ";";} else {$content .= ",";} $st_counter=$st_counter+1;
                    }
                } $content .="\n\n\n";
            }
            $content .= "\r\n\r\n/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;\r\n/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;\r\n/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;";
            $backup_name = $backup_name ? $backup_name : $name."___(".date('H-i-s')."_".date('d-m-Y').")__rand".rand(1,11111111).".sql";
            ob_get_clean(); header('Content-Type: application/octet-stream');   header("Content-Transfer-Encoding: Binary"); header("Content-disposition: attachment; filename=\"".$backup_name."\"");

            if(!@ $archivo = fopen("./src/backend/backup/frankies.sql" , "w")) {

                echo "No se ha podido abrir el archivo.";
            }
            else {
                
                fwrite($archivo , $content);
                fclose($archivo);
            }
        }  
    }

?>