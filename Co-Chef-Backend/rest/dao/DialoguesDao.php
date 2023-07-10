<?php

require_once "BaseDao.php";
error_reporting(E_ALL);
ini_set('display_errors', 1);

class DialoguesDao extends BaseDao
{
    public function __construct()
    {
        parent::__construct("dialogues");
    }

    public function getDefaultTextByActor($actor)
    {
        $query = "SELECT defaultText FROM " . $this->table_name . " WHERE actor = :actor;";
        $stm = $this->conn->prepare($query);
        $stm->execute(["actor" => $actor]);

        return $stm->fetch(PDO::FETCH_ASSOC);
    }
    public function getSelectedTextByActor($actor)
    {
        $query = "SELECT selectedText FROM " . $this->table_name . " WHERE actor = :actor;";
        $stm = $this->conn->prepare($query);
        $stm->execute(["actor" => $actor]);

        return $stm->fetch(PDO::FETCH_ASSOC);
    }
}

