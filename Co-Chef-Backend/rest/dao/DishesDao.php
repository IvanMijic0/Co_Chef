<?php

require_once "BaseDao.php";
error_reporting(E_ALL);
ini_set('display_errors', 1);

class DishesDao extends BaseDao
{
    public function __construct()
    {
        parent::__construct("dishes");
    }
}
