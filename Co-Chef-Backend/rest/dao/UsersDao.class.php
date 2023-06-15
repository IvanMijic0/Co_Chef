<?php

require_once "BaseDao.class.php";
error_reporting(E_ALL);
ini_set('display_errors', 1);

class UsersDao extends BaseDao
{
    public function __construct()
    {
        parent::__construct("users");
    }

    public function checkUserByEmailAndPassword($email, $password): bool
    {
        $query = "SELECT * FROM " . $this->table_name . " WHERE userEmail = ? AND userPassword = ?";
        $params = [$email, $password];

        $result = $this->query($query, $params);

        if ($result) {
            return true; // User exists in the database
        } else {
            return false; // User does not exist or invalid credentials
        }
    }

    public function updateUserAvailability($userEmail, $userPassword, $isAvailable): bool
    {
        $query = "UPDATE " . $this->table_name . " SET isAvailable = ? WHERE userEmail = ? AND userPassword = ?";
        $params = [$isAvailable, $userEmail, $userPassword];

        $affectedRows = $this->query($query, $params);

        return $affectedRows !== false;
    }


    public function isUserAvailable($userEmail, $userPassword): bool
    {
        $query = "SELECT isAvailable FROM " . $this->table_name . " WHERE userEmail = ? AND userPassword = ?";
        $params = [$userEmail, $userPassword];

        $result = $this->query_single($query, $params);

        if ($result && $result["isAvailable"] == 1) {
            return true; // User is available
        } else {
            return false; // User is not available or doesn't exist
        }
    }

}