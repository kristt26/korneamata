<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object files
include_once '../../api/config/database.php';
include_once '../../api/objects/Gejala.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare product object
$gejala = new Gejala($db);
 
// get id of product to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set ID property of product to be edited
 
$gejala->IdGejala = $data->IdGejala;
$gejala->kd_gejala = $data->kd_gejala;
$gejala->nm_gejala = $data->nm_gejala;
$gejala->Pertanyaan = $data->Pertanyaan;
$gejala->Photo = $data->Photo;
$gejala->Keterangan = $data->Keterangan;
 
// update the product
if($gejala->update()){
    echo '{';
        echo '"message": "Gejala was updated"';
    echo '}';
}
 
// if unable to update the product, tell the user
else{
    echo '{';
        echo '"message": "Unable to update Gejala"';
    echo '}';
}
?>