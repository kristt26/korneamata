<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
// include database and object files
include_once '../../api/config/database.php';
include_once '../../api/objects/Login.php';
 
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$login = new Login($db);

$data = json_decode(file_get_contents("php://input"));


// set product property values

$login->Email = $data->Username;
$login->Password = md5($data->Password);



// query products
$stmt = $login->LoginUser();
//$num = $stmt->rowCount();
 
// check if more than 0 record found
try {
    if ($login->Id > 0) {
        session_start();
        $_SESSION['Nama'] = $login->Nama;
        $_SESSION['Email'] = $login->Email;
   
        $loginitem = array(
            "Nama" => $login->Nama,
            "Email" => $login->Email,
            "Message" => "Success"
            );
        echo json_encode($loginitem);
    } else {
        throw new Exception('You Not Have Access');
    }
} catch (Exception $ex) {
    header("HTTP/1.1 500 Internal Server Error");
    echo '{"message": "Exception occurred: '.$ex->getMessage().'"}';
}


?>