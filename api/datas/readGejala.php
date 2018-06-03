<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
     
    include_once '../../api/config/database.php';
    include_once '../../api/objects/Gejala.php';


    $database = new Database();
    $db= $database->getConnection();

    $gejala = new Gejala($db);

    $stmt = $gejala->read();
    $num = $stmt->rowCount();
    if($num>0)
    {
        $products_arr=array();
        $products_arr["records"]=array();
    
        // retrieve our table contents
        // fetch() is faster than fetchAll()
        // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            // extract row
            // this will make $row['name'] to
            // just $name only
            extract($row);
    
            $product_item=array(
                "IdGejala" => $IdGejala,
                "kd_gejala" => $kd_gejala,
                "nm_gejala" => $nm_gejala,
                "Pertanyaan"=>$Pertanyaan,
                "Photo"=>$Photo,
                "Keterangan"=>$Keterangan
            );
    
            array_push($products_arr["records"], $product_item);
        }
    
        echo json_encode($products_arr);
    }

    else{
        echo json_encode(
            array("message" => "No Gejala found.")
        );
    }

    
?>