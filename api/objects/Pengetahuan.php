<?php
class Pengetahuan
{
    private $conn;
    private $table_name = "pengetahuan";

    public $Id;
    public $IdPenyakit;
    public $IdGejala;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function read()
    {
        $query = "SELECT * from " . $this->table_name . "";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function readById()
    {
        $query = "SELECT IdGejala from pengetahuan where IdPenyakit=?";
        $stmt = $this->conn->prepare($query);
        $this->IdPenyakit=htmlspecialchars(strip_tags($this->IdPenyakit));
        $stmt->bindParam(1, $this->IdPenyakit);
        $stmt->execute();
        return $stmt;
    }

    public function create()
    {
        $query = "INSERT INTO " . $this->table_name . " 
                SET
                    IdPenyakit=:IdPenyakit, IdGejala=:IdGejala";
        $stmt = $this->conn->prepare($query);

        $this->IdPenyakit = htmlspecialchars(strip_tags($this->IdPenyakit));
        $this->IdGejala = htmlspecialchars(strip_tags($this->IdGejala));

        $stmt->bindParam(":IdPenyakit", $this->IdPenyakit);
        $stmt->bindParam(":IdGejala", $this->IdGejala);

        if($stmt->execute()){
            return true;
        }else {
            return false;
        }
    }
}

?>