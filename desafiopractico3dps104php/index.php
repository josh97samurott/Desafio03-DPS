<?php 
    include "conexion.php";

    header('Access-Control-Allow-Origin: *');

    if($_SERVER['REQUEST_METHOD']=='GET'){
        if(isset($_GET['id'])){
            $query="select * from alumnos where id=".$_GET['id'];
            $resultado=$conn->query($query);
            echo json_encode($resultado->fetch_assoc(), JSON_UNESCAPED_UNICODE);
        }else{
            $query="select * from alumnos ORDER BY promedio DESC";
            $resultado=$conn->query($query);
            $arr;
            foreach($resultado as $row){
                $arr[] = $row;
            }


            echo json_encode($arr, JSON_UNESCAPED_UNICODE);
        }
        header("HTTP/1.1 200 OK");
        exit();
    }

    if($_POST['METHOD']=='POST'){
        unset($_POST['METHOD']);
        $nombre=$_POST['nombre'];
        $nota1=$_POST['nota1'];
        $nota2=$_POST['nota2'];
        $nota3=$_POST['nota3'];
        $nota4=$_POST['nota4'];
        $nota5=$_POST['nota5'];
        $promedio = ($nota1 + $nota2 + $nota3 + $nota4 + $nota5) / 5;  
        
        $conn->query("INSERT INTO alumnos VALUES(null, '$nombre', $nota1, $nota2, $nota3, $nota4, $nota5, $promedio, 0, null)");

        $result = $conn->query("SELECT * FROM alumnos ORDER BY promedio DESC") or die($conn->error);
            
        $row1 = $result->fetch_assoc();
            
        if($row1["promedio"] >= 8){
            foreach($result as $row){
                $prom_f = 0;
                if($row["promedio"] != 10){
                    $prom_f = $row["promedio"] + 1;
                }
                else{
                    $prom_f = $row["promedio"];
                }
                $id = $row["id"];
                $conn->query("UPDATE alumnos SET promedio_final = $prom_f WHERE id = $id");
            }
        }
        else{
            foreach($result as $row){
                $prom_f = 0;
                if($row["promedio"] != 0){
                    $prom_f = $row["promedio"] - 1;    
                }
                else{
                    $prom_f = $row["promedio"];
                }
                $id = $row["id"];
                $conn->query("UPDATE alumnos SET promedio_final = $prom_f WHERE id = $id");
            }
        }

        $result = $conn->query("SELECT * FROM alumnos ORDER BY promedio DESC") or die($conn->error);

        foreach($result as $row){
            $id = $row["id"];
            if($row["promedio_final"] >= 7){
                $conn->query("UPDATE alumnos SET estado = 'Aprobado' WHERE id = $id");
            }
            else if($row["promedio_final"] >=4 && $row["promedio"] < 7){
                $conn->query("UPDATE alumnos SET estado = 'Regular' WHERE id = $id");
            }
            else if($row["promedio_final"] < 4){
                $conn->query("UPDATE alumnos SET estado = 'Reprobado' WHERE id = $id");
            }
        }

        $query="select * from alumnos ORDER BY promedio DESC";
        $resultado=$conn->query($query);
        $arr;
        foreach($resultado as $row){
            $arr[] = $row;
        }

        echo json_encode($arr, JSON_UNESCAPED_UNICODE);

        header("HTTP/1.1 200 OK");
        exit();
    }

    if($_POST['METHOD']=='PUT'){
        unset($_POST['METHOD']);
        $id=$_GET['id'];
        $nombre=$_POST['nombre'];
        $nota1=$_POST['nota1'];
        $nota2=$_POST['nota2'];
        $nota3=$_POST['nota3'];
        $nota4=$_POST['nota4'];
        $nota5=$_POST['nota5'];
        $promedio = ($nota1 + $nota2 + $nota3 + $nota4 + $nota5) / 5;  
        
        $conn->query("UPDATE alumnos SET nombre='$nombre', nota1=$nota1, nota2=$nota2, nota3=$nota3, nota4=$nota4, nota5=$nota5, promedio=$promedio, promedio_final=0 WHERE id='$id'");
        
        $result = $conn->query("SELECT * FROM alumnos ORDER BY promedio DESC") or die($conn->error);
            
        $row1 = $result->fetch_assoc();
            
        if($row1["promedio"] >= 8){
            foreach($result as $row){
                $prom_f = 0;
                if($row["promedio"] != 10){
                    $prom_f = $row["promedio"] + 1;
                }
                else{
                    $prom_f = $row["promedio"];
                }
                $id = $row["id"];
                $conn->query("UPDATE alumnos SET promedio_final = $prom_f WHERE id = $id");
            }
        }
        else{
            foreach($result as $row){
                $prom_f = 0;
                if($row["promedio"] != 0){
                    $prom_f = $row["promedio"] - 1;    
                }
                else{
                    $prom_f = $row["promedio"];
                }
                $id = $row["id"];
                $conn->query("UPDATE alumnos SET promedio_final = $prom_f WHERE id = $id");
            }
        }

        $result = $conn->query("SELECT * FROM alumnos ORDER BY promedio DESC") or die($conn->error);

        foreach($result as $row){
            $id = $row["id"];
            if($row["promedio_final"] >= 7){
                $conn->query("UPDATE alumnos SET estado = 'Aprobado' WHERE id = $id");
            }
            else if($row["promedio_final"] >=4 && $row["promedio"] < 7){
                $conn->query("UPDATE alumnos SET estado = 'Regular' WHERE id = $id");
            }
            else if($row["promedio_final"] < 4){
                $conn->query("UPDATE alumnos SET estado = 'Reprobado' WHERE id = $id");
            }
        }

        $query="select * from alumnos ORDER BY promedio DESC";
        $resultado=$conn->query($query);
        $arr;
        foreach($resultado as $row){
            $arr[] = $row;
        }
        echo json_encode($arr, JSON_UNESCAPED_UNICODE);  
        header("HTTP/1.1 200 OK");
        exit();
    }

    if($_POST['METHOD']=='DELETE'){
        unset($_POST['METHOD']);
        $id=$_GET['id'];
        $conn->query("DELETE FROM alumnos WHERE id='$id'");

        $result = $conn->query("SELECT * FROM alumnos ORDER BY promedio DESC") or die($conn->error);
            
        $row1 = $result->fetch_assoc();
            
        if($row1["promedio"] >= 8){
            foreach($result as $row){
                $prom_f = 0;
                if($row["promedio"] != 10){
                    $prom_f = $row["promedio"] + 1;
                }
                else{
                    $prom_f = $row["promedio"];
                }
                $id = $row["id"];
                $conn->query("UPDATE alumnos SET promedio_final = $prom_f WHERE id = $id");
            }
        }
        else{
            foreach($result as $row){
                $prom_f = 0;
                if($row["promedio"] != 0){
                    $prom_f = $row["promedio"] - 1;    
                }
                else{
                    $prom_f = $row["promedio"];
                }
                $id = $row["id"];
                $conn->query("UPDATE alumnos SET promedio_final = $prom_f WHERE id = $id");
            }
        }

        $result = $conn->query("SELECT * FROM alumnos ORDER BY promedio DESC") or die($conn->error);

        foreach($result as $row){
            $id = $row["id"];
            if($row["promedio_final"] >= 7){
                $conn->query("UPDATE alumnos SET estado = 'Aprobado' WHERE id = $id");
            }
            else if($row["promedio_final"] >=4 && $row["promedio"] < 7){
                $conn->query("UPDATE alumnos SET estado = 'Regular' WHERE id = $id");
            }
            else if($row["promedio_final"] < 4){
                $conn->query("UPDATE alumnos SET estado = 'Reprobado' WHERE id = $id");
            }
        }

        $query="select * from alumnos ORDER BY promedio DESC";
        $resultado=$conn->query($query);
        $arr;
        foreach($resultado as $row){
            $arr[] = $row;
        }
        echo json_encode($arr, JSON_UNESCAPED_UNICODE);


        header("HTTP/1.1 200 OK");
        exit();
    }

header("HTTP/1.1 400 Bad Request");
?>