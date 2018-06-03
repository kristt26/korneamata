<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object files
include_once '../../api/config/database.php';
include_once '../../api/objects/Penyakit.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare product object
$penyakit = new Penyakit($db);
 
// get id of product to be edited
$data = json_decode(file_get_contents("php://input"));
 
// set ID property of product to be edited
 
$penyakit->IdPenyakit = $data->IdPenyakit;
$penyakit->kd_penyakit = $data->kd_penyakit;
$penyakit->nm_penyakit = $data->nm_penyakit;
$penyakit->penyebab = $data->penyebab;
$penyakit->keterangan = $data->keterangan;
$penyakit->photo = $data->photo;
$penyakit->solusi = $data->solusi;
 
// update the product
if($penyakit->update()){
    echo '{';
        echo '"message": "Penyakit was updated"';
    echo '}';
}
 
// if unable to update the product, tell the user
else{
    echo '{';
        echo '"message": "Unable to update Penyakit"';
    echo '}';
}
?>