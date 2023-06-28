<?php

require "../vendor/autoload.php";
require "dao/UsersDao.php";
require "dao/ChatsDao.php";
require "services/UserService.php";
require "services/ChatServices.php";

Flight::before("json", function () {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET,PUT,POST,DELETE");
    header("Access-Control-Allow-Headers: Content-Type");
});

Flight::register("user_service", UserService::class);
Flight::register("chat_service", ChatServices::class);

require_once "routes/UserRoutes.php";
require_once "routes/ChatsRoutes.php";



Flight::start();
