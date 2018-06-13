<?php
class Pasien{
    private $conn;
    private $table_name= "pasien";

    public $Id;
    public $nama;
    public $kelamin;
    public $alamat;
    public $pekerjaan;
   

    public function __construct($db) {
        $this->conn = $db;
    }

    function get_client_ip() {
        $ipaddress = '';
        if (getenv('HTTP_CLIENT_IP'))
            $ipaddress = getenv('HTTP_CLIENT_IP');
        else if(getenv('HTTP_X_FORWARDED_FOR'))
            $ipaddress = getenv('HTTP_X_FORWARDED_FOR');
        else if(getenv('HTTP_X_FORWARDED'))
            $ipaddress = getenv('HTTP_X_FORWARDED');
        else if(getenv('HTTP_FORWARDED_FOR'))
            $ipaddress = getenv('HTTP_FORWARDED_FOR');
        else if(getenv('HTTP_FORWARDED'))
           $ipaddress = getenv('HTTP_FORWARDED');
        else if(getenv('REMOTE_ADDR'))
            $ipaddress = getenv('REMOTE_ADDR');
        else
            $ipaddress = 'UNKNOWN';
        return $ipaddress;
    }

    public function read()
    {
        $query = "SELECT * FROM ".$this->table_name." ";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
    
        return $stmt;
    }

    public function create()
    {
        $query = "INSERT INTO
                   " . $this->table_name . "
               SET
                   nama=:nama, kelamin=:kelamin";
        $stmt = $this->conn->prepare($query);
        $this->nama=htmlspecialchars(strip_tags($this->nama));
        $this->kelamin=htmlspecialchars(strip_tags($this->kelamin));
        // $this->alamat=htmlspecialchars(strip_tags($this->alamat));
        // $this->pekerjaan=htmlspecialchars(strip_tags($this->pekerjaan));
       
        $stmt->bindParam(":nama", $this->nama);
        $stmt->bindParam(":kelamin", $this->kelamin);
        // $stmt->bindParam(":alamat", $this->alamat);
        // $stmt->bindParam(":pekerjaan", $this->pekerjaan);
        
        if($stmt->execute()){
            $this->Id = $this->conn->lastInsertId();
            return true;
        }else{
            return false;
        }
    }
    
}


?>