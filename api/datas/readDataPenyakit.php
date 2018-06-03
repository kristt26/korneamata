<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
     
    include_once '../../api/config/database.php';
    include_once '../../api/objects/Pengetahuan.php';
    include_once '../../api/objects/Penyakit.php';
    include_once '../../api/objects/Gejala.php';


    $database = new Database();
    $db= $database->getConnection();

    $pengetahuan = new Pengetahuan($db);
    $penyakit= new Penyakit($db);
    $gejala = new Gejala($db);

    $stmtPenyakit = $penyakit->read();
    $numPenyakit = $stmtPenyakit->rowCount();
    
    if($numPenyakit>0)
    {
        $pengetahuan_arr=array();
        $pengetahuan_arr=array(
            "Penyakit"=>array(),
            "Gejala"=>array()
        );

        while ($rowPenyakit = $stmtPenyakit->fetch(PDO::FETCH_ASSOC)) {
            extract($rowPenyakit);

            $PenyakitItem = array(
                "IdPenyakit"=>$IdPenyakit,
                "kd_penyakit"=>$kd_penyakit,
                "nm_penyakit"=>$nm_penyakit,
                "penyebab"=>$penyebab,
                "keterangan"=>$keterangan,
                "photo"=>$photo,
                "solusi"=>$solusi,
                "Gejala"=>array()
            );
            $pengetahuan->IdPenyakit=$IdPenyakit;
            $stmtpengetahuan = $pengetahuan->readById();
            $numPengetahuan = $stmtpengetahuan->rowCount();
            if($numPengetahuan>0)
            {
                while($rowPenyetahuan = $stmtpengetahuan->fetch(PDO::FETCH_ASSOC))
                {
                    extract($rowPenyetahuan);
                    $gejala->IdGejala= $IdGejala;
                    $stmtGejala = $gejala->readById();
                    $GejalaItem = array(
                        "IdGejala" => $IdGejala, 
                        "kd_gejala" => $gejala->kd_gejala,
                        "nm_gejala" => $gejala->nm_gejala,
                        "Pertanyaan" => $gejala->Pertanyaan,
                        "Photo" => $gejala->Photo,
                        "Keterangan"=> $gejala->Keterangan
                    );
                    array_push($PenyakitItem["Gejala"], $GejalaItem);
                }

            }
            array_push($pengetahuan_arr["Penyakit"], $PenyakitItem);
        }

        $dataGejala = $gejala->read();

        while($rowGejala = $dataGejala->fetch(PDO::FETCH_ASSOC))
        {
            extract($rowGejala);
            $arrGejala=array(
                "IdGejala"=>$IdGejala,
                "kd_gejala"=>$kd_gejala,
                "nm_gejala"=>$nm_gejala,
                "Pertanyaan"=>$Pertanyaan,
                "Photo"=>$Photo,
                "Keterangan"=>$keterangan
            );
            array_push($pengetahuan_arr["Gejala"], $arrGejala);
        }
        echo json_encode($pengetahuan_arr);
    }else 
    {
        echo json_encode(
            array("message" => "No products found.")
        );
    }

    
?>