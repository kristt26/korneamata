<?php
class HariLibur{
 
    // database connection and table name
    private $conn;
    private $table_name = "harilibur";
 
    // object properties
    public $IdHari;
    public $DariTgl;
    public $SampaiTgl;
    public $Keterangan;
    
 
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }

    function IntervalDays($CheckIn,$CheckOut){
        $CheckInX = explode("-", $CheckIn);
        $CheckOutX =  explode("-", $CheckOut);
        $date1 =  mktime(0, 0, 0, $CheckInX[1],$CheckInX[2],$CheckInX[0]);
        $date2 =  mktime(0, 0, 0, $CheckOutX[1],$CheckOutX[2],$CheckOutX[0]);
        $interval =($date2 - $date1)/(3600*24);
        // returns numberofdays
        return  $interval ;
    }

    // read products
    function read(){
    
       // select all query
       $query = "SELECT * from " . $this->table_name . "";
    
       // prepare query statement
       $stmt = $this->conn->prepare($query);
    
       // execute query
       $stmt->execute();
    
       return $stmt;
    }

    function readByDate($tgl){
        
           // select all query
           $query = "SELECT * from " . $this->table_name . " 
           where DariTgl<=? and SampaiTgl>=?";
        
           // prepare query statement
           $stmt = $this->conn->prepare($query);

           $tgl=htmlspecialchars(strip_tags($tgl));

           $stmt->bindParam(1, $tgl);
           $stmt->bindParam(2, $tgl);
        
           // execute query
           $stmt->execute();
        
           return $stmt;
        }

   // create product
    function create(){
    
       // query to insert record
       $query = "INSERT INTO
                   " . $this->table_name . "
               SET
                   DariTgl=:DariTgl, SampaiTgl=:SampaiTgl, Keterangan=:Keterangan";
    
       // prepare query
       $stmt = $this->conn->prepare($query);
    
       // sanitize
       $this->DariTgl=htmlspecialchars(strip_tags($this->DariTgl));
       $this->SampaiTgl=htmlspecialchars(strip_tags($this->SampaiTgl));
       $this->Keterangan=htmlspecialchars(strip_tags($this->Keterangan));
      
       // bind values
       $stmt->bindParam(":DariTgl", $this->DariTgl);
       $stmt->bindParam(":SampaiTgl", $this->SampaiTgl);
       $stmt->bindParam(":Keterangan", $this->Keterangan);
    
       // execute query
       if($stmt->execute()){
           $this->IdHari = $this->conn->lastInsertId();
           return true;
       }else{
           return false;
       }
   }


   //Update Bidang
   function update(){
    
       // update query
       $query = "UPDATE
                   " . $this->table_name . "
               SET
                    DariTgl=:DariTgl, 
                    SampaiTgl=:SampaiTgl,
                    Keterangan=:Keterangan                  
               WHERE
                   IdHari = :IdHari";
    
       // prepare query statement
       $stmt = $this->conn->prepare($query);
    
       // sanitize
       $this->IdHari=htmlspecialchars(strip_tags($this->IdHari));
       $this->DariTgl=htmlspecialchars(strip_tags($this->DariTgl));
       $this->SampaiTgl=htmlspecialchars(strip_tags($this->SampaiTgl));
       $this->Keterangan=htmlspecialchars(strip_tags($this->Keterangan));
    
       // bind new values
       $stmt->bindParam(":IdHari", $this->IdHari);
       $stmt->bindParam(":DariTgl", $this->DariTgl);
       $stmt->bindParam(":SampaiTgl", $this->SampaiTgl);
       $stmt->bindParam(":Keterangan", $this->Keterangan);
    
       // execute the query
       if($stmt->execute()){
           return true;
       }else{
           return false;
       }
   }

   // delete the Bidang
   function delete(){
    
       // delete query
       $query = "DELETE FROM " . $this->table_name . " WHERE IdHari = ?";
    
       // prepare query
       $stmt = $this->conn->prepare($query);
    
       // sanitize
       $this->IdHari=htmlspecialchars(strip_tags($this->IdHari));
    
       // bind id of record to delete
       $stmt->bindParam(1, $this->IdHari);
    
       // execute query
       if($stmt->execute()){
           return true;
       }
    
       return false;
        
   }

}