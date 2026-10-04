<?php

namespace objects;

use PDO;

class PriceList
{
    private $conn;
    private $table = 'price_list';

    public $id;
    public $product_code;
    public $product_name;
    public $price;

    public function __construct($db){
        $this->conn = $db;
    }

    // Чтение всех товаров
    public function readAll()
    {
        $query = "SELECT * FROM " . $this->table . " ORDER BY serial_no";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // Добавление товара (serial_no не автоинкрементный - берем MAX + 1)
    public function create()
    {
        $query = "INSERT INTO " . $this->table . " (serial_no, product_code, product_name, unit_price)
                  SELECT COALESCE(MAX(serial_no), 0) + 1, :product_code, :product_name, :price
                  FROM " . $this->table;

        $stmt = $this->conn->prepare($query);

        $this->product_code = htmlspecialchars(strip_tags($this->product_code));
        $this->product_name = htmlspecialchars(strip_tags($this->product_name));
        $this->price = htmlspecialchars(strip_tags($this->price));

        $stmt->bindParam(":product_code", $this->product_code);
        $stmt->bindParam(":product_name", $this->product_name);
        $stmt->bindParam(":price", $this->price);

        return $stmt->execute();
    }
}
?>
