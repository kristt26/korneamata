<?php
class Penyakit{
    private $conn;

    private $table_name="penyakit";

    public $IdPenyakit;
    public $kd_penyakit;
    public $nm_penyakit;
    public $penyebab;
    public $keterangan;
    public $photo;
    public $solusi;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function read()
    {
        // select all query
       $query = "SELECT * from penyakit";
    
       // prepare query statement
       $stmt = $this->conn->prepare($query);
    
       // execute query
       $stmt->execute();
    
       return $stmt;
    }

    function create(){
    
        // query to insert record
        $query = "INSERT INTO
                    " . $this->table_name . "
                SET
                    kd_penyakit=:kd_penyakit, nm_penyakit=:nm_penyakit, penyebab=:penyebab, keterangan=:keterangan, photo=:photo, solusi=:solusi";
     
        // prepare query
        $stmt = $this->conn->prepare($query);
     
        // sanitize
        $this->kd_penyakit=htmlspecialchars(strip_tags($this->kd_penyakit));
        $this->nm_penyakit=htmlspecialchars(strip_tags($this->nm_penyakit));
        $this->penyebab=htmlspecialchars(strip_tags($this->penyebab));
        $this->keterangan=htmlspecialchars(strip_tags($this->keterangan));
        $this->photo=htmlspecialchars(strip_tags($this->photo));
        $this->solusi=htmlspecialchars(strip_tags($this->solusi));
       
        // bind values
        $stmt->bindParam(":kd_penyakit", $this->kd_penyakit);
        $stmt->bindParam(":nm_penyakit", $this->nm_penyakit);
        $stmt->bindParam(":penyebab", $this->penyebab);
        $stmt->bindParam(":keterangan", $this->keterangan);
        $stmt->bindParam(":photo", $this->photo);
        $stmt->bindParam(":solusi", $this->solusi);
     
        // execute query
        if($stmt->execute()){
            $this->IdPenyakit = $this->conn->lastInsertId();
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
                     kd_penyakit=:kd_penyakit, 
                     nm_penyakit=:nm_penyakit,
                     penyebab=:penyebab,
                     keterangan=:keterangan,
                     photo=:photo,
                     solusi=:solusi                  
                WHERE
                    IdPenyakit = :IdPenyakit";
     
        // prepare query statement
        $stmt = $this->conn->prepare($query);
     
        // sanitize
        $this->IdPenyakit=htmlspecialchars(strip_tags($this->IdPenyakit));
        $this->kd_penyakit=htmlspecialchars(strip_tags($this->kd_penyakit));
        $this->nm_penyakit=htmlspecialchars(strip_tags($this->nm_penyakit));
        $this->penyebab=htmlspecialchars(strip_tags($this->penyebab));
        $this->keterangan=htmlspecialchars(strip_tags($this->keterangan));
        $this->photo=htmlspecialchars(strip_tags($this->photo));
        $this->solusi=htmlspecialchars(strip_tags($this->solusi));
     
        // bind new values
        $stmt->bindParam(":IdPenyakit", $this->IdPenyakit);
        $stmt->bindParam(":kd_penyakit", $this->kd_penyakit);
        $stmt->bindParam(":nm_penyakit", $this->nm_penyakit);
        $stmt->bindParam(":penyebab", $this->penyebab);
        $stmt->bindParam(":keterangan", $this->keterangan);
        $stmt->bindParam(":photo", $this->photo);
        $stmt->bindParam(":solusi", $this->solusi);
     
        // execute the query
        if($stmt->execute()){
            return true;
        }else{
            return false;
        }
    }
}

?>