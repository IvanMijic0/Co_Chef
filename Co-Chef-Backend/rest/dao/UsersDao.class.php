<?php

require_once "BaseDao.class.php";

class UsersDao extends BaseDao
{
    public function __construct()
    {
        parent::__construct("users");
    }

    public function checkUserByEmailAndPassword($email, $password): bool
    {
        $query = "SELECT * FROM ". $this->table_name ." WHERE userEmail = ? AND userPassword = ?";
        $params = [$email, $password];

        $result = $this->query($query, $params);

        if ($result) {
            return true; // User exists in the database
        } else {
            return false; // User does not exist or invalid credentials
        }
    }
}