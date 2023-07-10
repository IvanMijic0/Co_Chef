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

    public function dishByName($name)
    {
        $query = "SELECT text FROM " . $this->table_name . " WHERE name = :name;";
        $stm = $this->conn->prepare($query);
        $stm->execute(["name" => $name]);

        return $stm->fetch(PDO::FETCH_ASSOC);
    }
}
