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
include_once '../../api/objects/Penyakit.php';
 
$database = new Database();
$db = $database->getConnection();
 
$penyakit = new Penyakit($db);
 
// get posted data
$data =json_decode(file_get_contents("php://input"));
 

// set product property values
$penyakit->kd_penyakit = $data->kd_penyakit;
$penyakit->nm_penyakit = $data->nm_penyakit;
$penyakit->penyebab = $data->penyebab;
$penyakit->keterangan = $data->keterangan;
$penyakit->photo = $data->photo;
$penyakit->solusi = $data->solusi;
 
// create the product
if($penyakit->create()){
    echo '{';
        echo '"message": "'.$penyakit->IdPenyakit.'"';
    echo '}';
}
 
// if unable to create the product, tell the user
else{
    echo '{';
        echo '"message": "Unable to create penyakit."';
    echo '}';
}
?>