<?php

use objects\PriceList;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once file_exists(__DIR__ . '/Database.php') ? __DIR__ . '/Database.php' : __DIR__ . '/../config/Database.php';
include_once file_exists(__DIR__ . '/PriceList.php') ? __DIR__ . '/PriceList.php' : __DIR__ . '/../objects/PriceList.php';

$database = new Database();
$db = $database->getConnection();

$obj = new PriceList($db);
$stmt = $obj->readAll();

$records = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(array("records" => $records), JSON_UNESCAPED_UNICODE);
?>
