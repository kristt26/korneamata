<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// get database connection
include_once '../../api/config/database.php';
 
// instantiate product object
include_once '../../api/objects/Pasien.php';

include_once '../../api/objects/Diagnosa.php';
 
$database = new Database();
$db = $database->getConnection();
 
$pasien = new Pasien($db);

$diagnosa = new Diagnosa($db);
 
// get posted data
$data =json_decode(file_get_contents("php://input"));
 

// set product property values
$pasien->nama = $data->Pasien->nama;
$pasien->kelamin = $data->Pasien->sex;
// $pasien->alamat = $data->Pasien->alamat;
// $pasien->pekerjaan = $data->Pasien->pekerjaan;


$diagnosa->IdPenyakit = $data->IdPenyakit;
$diagnosa->noip = $data->Pasien->noip;
$diagnosa->tanggal = date("Y-m-d h:i:sa");
$diagnosa->hasil =$data->Hasil;
$diagnosa->noip=$data->Pasien->noip;
$stmt = $diagnosa->readOne();
$numip = $stmt->rowCount();
if($numip==0)
{
    if($pasien->create()){
        $diagnosa->IdPasien = $pasien->Id;
        if($diagnosa->create()){
            echo '{';
                echo '"message": "'.$data->Hasil.'"';
            echo '}';
        }else{
            echo '{';
                echo '"message": "Gagal"';
            echo '}';
        }
        
    }    
}else{
    
    if($diagnosa->create()){
        echo '{';
            echo '"message": "'.$data->Hasil.'"';
        echo '}';
    }else{
        echo '{';
            echo '"message": "Gagal"';
        echo '}';
    }
}

?>