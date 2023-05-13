<?php

require "../vendor/autoload.php";
require "dao/StudentsDao.class.php";
require "services/StudentService.php";

Flight::register("student_service", StudentService::class);

require_once "routes/studentRoutes.php";

Flight::start();

