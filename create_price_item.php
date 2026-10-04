<?php

use objects\PriceList;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once file_exists(__DIR__ . '/Database.php') ? __DIR__ . '/Database.php' : __DIR__ . '/../config/Database.php';
include_once file_exists(__DIR__ . '/PriceList.php') ? __DIR__ . '/PriceList.php' : __DIR__ . '/../objects/PriceList.php';

$database = new Database();
$db = $database->getConnection();

$price_item = new PriceList($db);

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->product_code) &&
    !empty($data->product_name) &&
    !empty($data->price))
{
    $price_item->product_code = $data->product_code;
    $price_item->product_name = $data->product_name;
    $price_item->price = $data->price;

    if ($price_item->create()){
        http_response_code(201);
        echo json_encode(array("message" => "Товар добавлен в прейскурант"), JSON_UNESCAPED_UNICODE);
    }
    else{
        http_response_code(503);
        echo json_encode(array("message" => "Невозможно добавить товар"), JSON_UNESCAPED_UNICODE);
    }
}
else{
    http_response_code(400);
    echo json_encode(array("message" => "Неполные данные"), JSON_UNESCAPED_UNICODE);
}
?>