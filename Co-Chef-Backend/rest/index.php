<?php

require "../vendor/autoload.php";
require "dao/UsersDao.php";
require "dao/ChatsDao.php";
require "services/UserService.php";
require "services/ChatServices.php";

// Allow requests from a specific origin
header('Access-Control-Allow-Origin: https://lionfish-app-zkpvm.ondigitalocean.app');

// Allow specific HTTP methods
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

// Allow specific headers (if needed)
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Allow credentials (if needed)
header('Access-Control-Allow-Credentials: true');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Set additional headers for preflight requests
    header('Access-Control-Max-Age: 86400');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
    header('Content-Length: 0');
    header('Content-Type: text/plain');
    exit;
}

Flight::register("user_service", UserService::class);
Flight::register("chat_service", ChatServices::class);

require_once "routes/UserRoutes.php";
require_once "routes/ChatsRoutes.php";


Flight::before('error', function () {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET,PUT,POST,DELETE');
    header('Access-Control-Allow-Headers: Content-Type');
});

Flight::before("json", function () {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET,PUT,POST,DELETE");
    header("Access-Control-Allow-Headers: Content-Type");
});

Flight::start();
