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
include_once '../../api/objects/HariLibur.php';
 
$database = new Database();
$db = $database->getConnection();
 
$hariLibur = new HariLibur($db);
 
// get posted data
$data =json_decode(file_get_contents("php://input"));
 
$a = new DateTime($data->DariTgl);
$aa=str_replace('-', '/', $a->format('Y-m-d'));
$aaa = date('Y-m-d',strtotime($aa . "+1 days"));
$b = new DateTime($data->SampaiTgl);
$bb=str_replace('-', '/', $b->format('Y-m-d'));
$bbb = date('Y-m-d',strtotime($bb . "+1 days"));
// set product property values
$hariLibur->DariTgl = $aaa;
$hariLibur->SampaiTgl = $bbb;
$hariLibur->Keterangan = $data->Keterangan;
 
// create the product
if($hariLibur->create()){
    echo '{';
        echo '"message": '.$hariLibur->IdHari.'';
    echo '}';
}
 
// if unable to create the product, tell the user
else{
    echo '{';
        echo '"message": "Unable to create product."';
    echo '}';
}


?>