<?php
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, allow-control-access-origin");
$method = $_SERVER["REQUEST_METHOD"];
$body = json_decode(file_get_contents('php://input'),true);
$str = "Otrzymalem: $body";
echo json_encode('{"temperatura": 20.69, "pressure": 1000.42, "humidity": 44, "orient": {"roll":60.0,"pitch":123.0,"yaw":78.0}}');
?>