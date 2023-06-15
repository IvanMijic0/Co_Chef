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

    public function checkUserByUserNameEmailAndPassword($userName, $email, $password): bool
    {
        $query = "SELECT * FROM " . $this->table_name . " WHERE userEmail = ? OR userName = ? OR (userEmail = ? AND userPassword = ?)";
        $params = [$email, $userName, $email, $password];

        $result = $this->query($query, $params);

        if ($result) {
            return true; // User exists in the database
        } else {
            return false; // User does not exist or invalid credentials
        }
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

    public function saveGameOpponent($userEmail, $userPassword, $gameOpponent): bool
    {
        $query = "UPDATE " . $this->table_name . " SET gameOpponent = ? WHERE userEmail = ? AND userPassword = ?";
        $params = [$gameOpponent, $userEmail, $userPassword];

        $affectedRows = $this->query($query, $params);

        return $affectedRows !== false;
    }

    public function updateUserWillPlay($userEmail, $userPassword, $willPlay): bool
    {
        $query = "UPDATE " . $this->table_name . " SET willPlay = ? WHERE userEmail = ? AND userPassword = ?";
        $params = [$willPlay, $userEmail, $userPassword];

        $affectedRows = $this->query($query, $params);

        return $affectedRows !== false;
    }

    public function isWillPlay($userEmail, $userPassword): bool
    {
        $query = "SELECT willPlay FROM " . $this->table_name . " WHERE userEmail = ? AND userPassword = ?";
        $params = [$userEmail, $userPassword];

        $result = $this->query_single($query, $params);

        if ($result && $result["willPlay"] == 1) {
            return true; // User is available
        } else {
            return false; // User is not available or doesn't exist
        }
    }

    public function getUserNameByGameOpponent($gameOpponent)
    {
        $query = "SELECT userName FROM " . $this->table_name . " WHERE gameOpponent = ?";
        $params = [$gameOpponent];

        $result = $this->query_single($query, $params);

        if ($result && isset($result["userName"])) {
            return $result["userName"]; // Return the username
        } else {
            return null; // No matching record found
        }
    }

    public function getGameOpponentByUsername($username)
    {
        $query = "SELECT gameOpponent FROM " . $this->table_name . " WHERE userName = ?";
        $params = [$username];

        $result = $this->query_single($query, $params);

        if ($result) {
            return $result["gameOpponent"];
        } else {
            return null; // User not found or no game opponent assigned
        }
    }

    public function updateGameOpponent($userEmail, $gameOpponent): bool
    {
        $query = "UPDATE " . $this->table_name . " SET gameOpponent = ? WHERE userEmail = ?";
        $params = [$gameOpponent, $userEmail];

        $affectedRows = $this->query($query, $params);

        return $affectedRows !== false;
    }

    public function getUserNameByEmailAndPassword($email, $password)
    {
        $query = "SELECT userName FROM " . $this->table_name . " WHERE userEmail = ? AND userPassword = ?";
        $params = [$email, $password];

        $result = $this->query_single($query, $params);

        if ($result && isset($result["userName"])) {
            return $result["userName"]; // Return the userName
        } else {
            return null; // No matching record found
        }
    }

    public function updateGameId($userName, $gameId): bool
    {
        $query = "UPDATE " . $this->table_name . " SET gameId = ? WHERE userName = ?";
        $params = [$gameId, $userName];

        $affectedRows = $this->query($query, $params);

        return $affectedRows !== false;
    }
}