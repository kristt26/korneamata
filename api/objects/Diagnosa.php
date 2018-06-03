<?php
class Diagnosa{
    private $conn;
    private $table_name = "analisa_hasil";

    public $id;
    public $IdPasien;
    public $kd_penyakit;
    public $noip;
    public $tanggal;
    public $hasil;

    public function __construct($db) {
        $this->conn = $db;
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
        
           return $stmt;
    }

    public function create()
    {
        $query = "INSERT INTO
                   " . $this->table_name . "
               SET
                   IdPasien=:IdPasien, kd_penyakit=:kd_penyakit, noip=:noip, tanggal=:tanggal, hasil=:hasil";

        $stmt = $this->conn->prepare($query);

        $this->IdPasien=htmlspecialchars(strip_tags($this->IdPasien));
        $this->kd_penyakit=htmlspecialchars(strip_tags($this->kd_penyakit));
        $this->noip=htmlspecialchars(strip_tags($this->noip));
        $this->tanggal=htmlspecialchars(strip_tags($this->tanggal));
        $this->hasil=htmlspecialchars(strip_tags($this->hasil));

        $stmt->bindParam(":IdPasien", $this->IdPasien);
        $stmt->bindParam(":kd_penyakit", $this->kd_penyakit);
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