<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include_once '../../api/config/database.php';
include_once '../../api/objects/Login.php';
 
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$login = new Login($db);

$data = json_decode(file_get_contents("php://input"));
session_start();

$login->Password = md5($data);
$login->Email = $_SESSION['Email'];
if($login->update()){
    echo json_encode(array("message" => "Success"));
}else {
    echo json_encode(array("message" => "Error"));
}
?>