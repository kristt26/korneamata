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

include_once '../../api/objects/Diagnosa.php';
 
$database = new Database();
$db = $database->getConnection();
 
$penyakit = new Penyakit($db);

$diagnosa = new Diagnosa($db);
 
// get posted data
$diagnosa->hasil = "true";
$stmtPenyakit= $penyakit->read();
$arr=array();
$arr["data"]=array();
$arr["Jumlah"]=array();
$arr["Nama"]=array();
while ($rowPenyakit = $stmtPenyakit->fetch(PDO::FETCH_ASSOC)) {
    $jumlah = 0;
    extract($rowPenyakit);
    $PenyakitItem = array(
        "label"=>$nm_penyakit,
        "value"=>""
    );
    $diagnosa->IdPenyakit=$IdPenyakit;
    $stmtDiagnosa = $diagnosa->read();
    $jumlah = $stmtDiagnosa->rowCount();
    $PenyakitItem["value"]=$jumlah;
    array_push($arr["Jumlah"], $jumlah);
    array_push($arr["Nama"], $nm_penyakit);
    array_push($arr["data"], $PenyakitItem);

}
echo json_encode($arr);

?>