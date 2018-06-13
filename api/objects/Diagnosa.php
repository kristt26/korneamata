<?php
class Diagnosa{
    private $conn;
    private $table_name = "analisa_hasil";

    public $id;
    public $IdPasien;
    public $IdPenyakit;
    public $noip;
    public $tanggal;
    public $hasil;

    public function __construct($db) {
        $this->conn = $db;
    }


    public function read()
    {
        // select all query
        $query = "SELECT * from " . $this->table_name . " WHERE IdPenyakit=? and hasil=?";
    
       // prepare query statement
        $stmt = $this->conn->prepare($query);
        $this->IdPenyakit=htmlspecialchars(strip_tags($this->IdPenyakit));
        $this->hasil=htmlspecialchars(strip_tags($this->hasil));

        $stmt->bindParam(1, $this->IdPenyakit);
        $stmt->bindParam(2, $this->hasil);
    
       // execute query
        $stmt->execute();
    
        return $stmt;
    }

    public function readOne()
    {
        $query = "SELECT * from " . $this->table_name . " where noip=?";
        
           // prepare query statement
           $stmt = $this->conn->prepare($query);

           $this->noip=htmlspecialchars(strip_tags($this->noip));

           $stmt->bindParam(1, $this->noip);
        
           // execute query
           $stmt->execute();
           $row = $stmt->fetch(PDO::FETCH_ASSOC);
           $this->IdPasien = $row['IdPasien'];
        
           return $stmt;
    }

    public function create()
    {
        $query = "INSERT INTO
                   " . $this->table_name . "
               SET
                   IdPasien=:IdPasien, IdPenyakit=:IdPenyakit, noip=:noip, tanggal=:tanggal, hasil=:hasil";

        $stmt = $this->conn->prepare($query);

        $this->IdPasien=htmlspecialchars(strip_tags($this->IdPasien));
        $this->IdPenyakit=htmlspecialchars(strip_tags($this->IdPenyakit));
        $this->noip=htmlspecialchars(strip_tags($this->noip));
        $this->tanggal=htmlspecialchars(strip_tags($this->tanggal));
        $this->hasil=htmlspecialchars(strip_tags($this->hasil));

        $stmt->bindParam(":IdPasien", $this->IdPasien);
        $stmt->bindParam(":IdPenyakit", $this->IdPenyakit);
        $stmt->bindParam(":noip", $this->noip);
        $stmt->bindParam(":tanggal", $this->tanggal);
        $stmt->bindParam(":hasil", $this->hasil);

        if($stmt->execute()){
            $this->id = $this->conn->lastInsertId();
            return true;
        }else{
            return false;
        }
                
    }
}

?>