<?php
class Gejala{
    private $conn;

    private $table_name="gejala";

    public $IdGejala;
    public $kd_gejala;
    public $nm_gejala;
    public $Pertanyaan;
    public $Photo;
    public $Keterangan;


    public function __construct($db) {
        $this->conn = $db;
    }

    public function read()
    {
        // select all query
       $query = "SELECT * from gejala";
    
       // prepare query statement
       $stmt = $this->conn->prepare($query);
    
       // execute query
       $stmt->execute();
    
       return $stmt;
    }

    public function readById()
    {
        $query = "SELECT * from " . $this->table_name . " where IdGejala=?";
        $stmt = $this->conn->prepare($query);
        $this->IdGejala=htmlspecialchars(strip_tags($this->IdGejala));
        $stmt->bindParam(1, $this->IdGejala);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $this->kd_gejala = $row['kd_gejala'];
        $this->nm_gejala = $row['nm_gejala'];
        $this->Pertanyaan = $row['Pertanyaan'];
        $this->Photo =$row['Photo'];
        $this->Keterangan = $row['Keterangan'];
        
    }

    function create(){
    
        // query to insert record
        $query = "INSERT INTO
                    " . $this->table_name . "
                SET
                    kd_gejala=:kd_gejala, nm_gejala=:nm_gejala, Pertanyaan=:Pertanyaan, Photo=:Photo, Keterangan=:Keterangan";
     
        // prepare query
        $stmt = $this->conn->prepare($query);
     
        // sanitize
        $this->kd_gejala=htmlspecialchars(strip_tags($this->kd_gejala));
        $this->nm_gejala=htmlspecialchars(strip_tags($this->nm_gejala));
        $this->Pertanyaan=htmlspecialchars(strip_tags($this->Pertanyaan));
        $this->Photo=htmlspecialchars(strip_tags($this->Photo));
        $this->Keterangan=htmlspecialchars(strip_tags($this->Keterangan));
       
        // bind values
        $stmt->bindParam(":kd_gejala", $this->kd_gejala);
        $stmt->bindParam(":nm_gejala", $this->nm_gejala);
        $stmt->bindParam(":Pertanyaan", $this->Pertanyaan);
        $stmt->bindParam(":Photo", $this->Photo);
        $stmt->bindParam(":Keterangan", $this->Keterangan);
        // execute query
        if($stmt->execute()){
            $this->IdGejala = $this->conn->lastInsertId();
            return true;
        }else{
            return false;
        }
    }

    function update(){
    
        // update query
        $query = "UPDATE
                    " . $this->table_name . "
                SET
                     kd_gejala=:kd_gejala, 
                     nm_gejala=:nm_gejala,
                     Pertanyaan=:Pertanyaan,
                     Photo=:Photo,
                     Keterangan=:Keterangan
                WHERE
                    IdGejala = :IdGejala";
     
        // prepare query statement
        $stmt = $this->conn->prepare($query);
     
        // sanitize
        $this->IdGejala=htmlspecialchars(strip_tags($this->IdGejala));
        $this->kd_gejala=htmlspecialchars(strip_tags($this->kd_gejala));
        $this->nm_gejala=htmlspecialchars(strip_tags($this->nm_gejala));
        $this->Pertanyaan=htmlspecialchars(strip_tags($this->Pertanyaan));
        $this->Photo=htmlspecialchars(strip_tags($this->Photo));
        $this->Keterangan=htmlspecialchars(strip_tags($this->Keterangan));
     
        // bind new values
        $stmt->bindParam(":IdGejala", $this->IdGejala);
        $stmt->bindParam(":kd_gejala", $this->kd_gejala);
        $stmt->bindParam(":nm_gejala", $this->nm_gejala);
        $stmt->bindParam(":Pertanyaan", $this->Pertanyaan);
        $stmt->bindParam(":Photo", $this->Photo);
        $stmt->bindParam(":Keterangan", $this->Keterangan);
     
        // execute the query
        if($stmt->execute()){
            return true;
        }else{
            return false;
        }
    }
}

?>