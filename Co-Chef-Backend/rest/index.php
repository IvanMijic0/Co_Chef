<?php

require "../vendor/autoload.php";
require "dao/UsersDao.php";
require "dao/ChatsDao.php";
require "services/UserService.php";
require "services/ChatServices.php";

Flight::register("user_service", UserService::class);
Flight::register("chat_service", ChatServices::class);

require_once "routes/UserRoutes.php";
require_once "routes/ChatsRoutes.php";

Flight::start();
