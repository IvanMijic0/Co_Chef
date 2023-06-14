<?php

require "../vendor/autoload.php";
require "dao/UsersDao.class.php";
require "services/UserService.php";

Flight::register("user_service", UserService::class);

require_once "routes/UserRoutes.php";

Flight::start();

