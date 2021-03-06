<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
     
    include_once '../../api/config/database.php';
    include_once '../../api/objects/Penyakit.php';


    $database = new Database();
    $db= $database->getConnection();

    $penyakit = new Penyakit($db);

    $stmt = $penyakit->read();
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
                "IdPenyakit" => $IdPenyakit,
                "kd_penyakit" => $kd_penyakit,
                "nm_penyakit" => $nm_penyakit,
                "penyebab"=>$penyebab,
                "keterangan"=>$keterangan,
                "photo"=>$photo,
                "solusi"=>$solusi
            );
    
            array_push($products_arr["records"], $product_item);
        }
    
        echo json_encode($products_arr);
    }

    else{
        echo json_encode(
            array("message" => "No Penyakit found.")
        );
    }

    
?>