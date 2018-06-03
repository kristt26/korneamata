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
include_once '../../api/objects/Gejala.php';
 
$database = new Database();
$db = $database->getConnection();
 
$gejala = new Gejala($db);
 
// get posted data
$data =json_decode(file_get_contents("php://input"));
 

// set product property values
$gejala->kd_gejala = $data->kd_gejala;
$gejala->nm_gejala = $data->nm_gejala;
$gejala->Pertanyaan = $data->Pertanyaan;
$gejala->Photo = $data->photo;
$gejala->Keterangan = $data->Keterangan;
 
// create the product
if($gejala->create()){
    echo '{';
        echo '"message": "'.$gejala->IdGejala.'"';
    echo '}';
}
 
// if unable to create the product, tell the user
else{
    echo '{';
        echo '"message": "Unable to create gejala."';
    echo '}';
}
?>