<?php

require_once "BaseService.php";
require_once __DIR__."/../dao/StudentsDao.class.php";

class StudentService extends BaseService {
    public function __construct()
    {
        parent::__construct(new StudentsDao());
    }
}