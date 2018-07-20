<?php
class Database{
 
    // specify your own database credentials
    private $host = "den1.mysql2.gear.host";
    private $db_name = "dbmata";
    private $username = "dbmata";
    private $password = "Jl08P_8-41Fp";
    public $conn;
 // specify your own database credentials
//  private $host = "localhost";
//  private $db_name = "db_mata";
//  private $username = "root";
//  private $password = "";
//  public $conn;

    // get the database connection
    public function getConnection(){
 
        $this->conn = null;
 
        try{
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->exec("set names utf8");
        }catch(PDOException $exception){
            echo "Connection error: " . $exception->getMessage();
        }
 
        return $this->conn;
    }
}
?>