<?php

require_once "BaseDao.php";
error_reporting(E_ALL);
ini_set('display_errors', 1);

class UsersDao extends BaseDao
{
    public function __construct()
    {
        parent::__construct("users");
    }

    public function get_user_by_email($email)
    {
        $query = "SELECT * FROM " . $this->table_name . "WHERE email = :email";
        $stm = $this->conn->prepare($query);
        $stm->execute(["email" => $email]);

        return $stm->fetch(PDO::FETCH_ASSOC);
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

    public function isRejected($userName): bool
    {
        $query = "SELECT isRejected FROM " . $this->table_name . " WHERE userName = ?";
        $params = [$userName];

        $result = $this->query_single($query, $params);

        if ($result && $result["isRejected"] == 1) {
            return true; // User is rejected
        } else {
            return false; // User is not rejected or doesn't exist
        }
    }

    public function isWaitingToPlay($userName): bool
    {
        $query = "SELECT waitingToPlay FROM " . $this->table_name . " WHERE userName = ?";
        $params = [$userName];

        $result = $this->query_single($query, $params);

        if ($result && $result["waitingToPlay"] == 1) {
            return true;
        } else {
            return false;
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

    public function getRecipeByUserName($userName)
    {
        $query = "SELECT recipe FROM " . $this->table_name . " WHERE userName = ?";
        $params = [$userName];

        $result = $this->query_single($query, $params);

        if ($result && isset($result["recipe"])) {
            return $result["recipe"]; // Return the recipe
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

    public function getGameIdByUsername($username)
    {
        $query = "SELECT gameId FROM " . $this->table_name . " WHERE userName = ?";
        $params = [$username];

        $result = $this->query_single($query, $params);

        if ($result) {
            return $result["gameId"];
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

    public function updateUserIsRejected($userName, $isRejected): bool
    {
        $query = "UPDATE " . $this->table_name . " SET isRejected = ? WHERE userName = ?";
        $params = [$isRejected, $userName];

        $affectedRows = $this->query($query, $params);

        return $affectedRows !== false;
    }
    public function updateWaitingToPlay($userName, $waitingToPlay): bool
    {
        $query = "UPDATE " . $this->table_name . " SET waitingToPlay = ? WHERE userName = ?";
        $params = [$waitingToPlay, $userName];

        $affectedRows = $this->query($query, $params);

        return $affectedRows !== false;
    }

    public function updateRecipe($userName, $recipe): bool
    {
        $query = "UPDATE " . $this->table_name . " SET recipe = ? WHERE userName = ?";
        $params = [$recipe, $userName];

        $affectedRows = $this->query($query, $params);

        return $affectedRows !== false;
    }

    public function updateTasksCompleted($userName, $tasksCompleted): bool
    {
        $query = "UPDATE " . $this->table_name . " SET tasksCompleted = ? WHERE userName = ?";
        $params = [$tasksCompleted, $userName];

        $affectedRows = $this->query($query, $params);

        return $affectedRows !== false;
    }

    public function resetGameOpponent($userEmail): bool
    {
        $query = "UPDATE " . $this->table_name . " SET gameOpponent = '' WHERE userEmail = ?";
        $params = [$userEmail];

        $affectedRows = $this->query($query, $params);

        return $affectedRows !== false;
    }

    public function resetRecipe($recipe): bool
    {
        $query = "UPDATE " . $this->table_name . " SET recipe = '' WHERE userEmail = ?";
        $params = [$recipe];

        $affectedRows = $this->query($query, $params);

        return $affectedRows !== false;
    }

    public function checkUsersHaveSameGameId($userName1, $userName2): bool
    {
        $query = "SELECT gameId FROM " . $this->table_name . " WHERE userName IN (?, ?) LIMIT 2"; // Was giving me 3 Rows, don't know why...
        $params = [$userName1, $userName2];

        $result = $this->query($query, $params);

        // If it returns exactly two rows, we are golden
        if ($result && count($result) === 2) {
            $gameId1 = $result[0]["gameId"];
            $gameId2 = $result[1]["gameId"];

            return $gameId1 === $gameId2 && $gameId1 !== 0; // Has to be non-zero, because 0 is default
        }
        return false;
    }

    public function checkUsersHaveSameTaskCompleted($userName1, $userName2): bool
    {
        $query = "SELECT tasksCompleted FROM " . $this->table_name . " WHERE userName IN (?, ?) LIMIT 2"; // Was giving me 3 Rows, don't know why...
        $params = [$userName1, $userName2];

        $result = $this->query($query, $params);

        // If it returns exactly two rows, we are golden
        if ($result && count($result) === 2) {
            $tasksCompleted1 = $result[0]["tasksCompleted"];
            $tasksCompleted2 = $result[1]["tasksCompleted"];

            return $tasksCompleted1 === $tasksCompleted2 && $tasksCompleted1 !== 0; // Has to be non-zero, because 0 is default
        }
        return false;
    }

    public function checkUsersHaveWaitingToPlay($userName1, $userName2): bool
    {
        $query = "SELECT waitingToPlay FROM " . $this->table_name . " WHERE userName IN (?, ?) LIMIT 2"; // Was giving me 3 Rows, don't know why...
        $params = [$userName1, $userName2];

        $result = $this->query($query, $params);

        // If it returns exactly two rows, we are golden
        if ($result && count($result) === 2) {
            $waitingToPlay1 = $result[0]["waitingToPlay"];
            $waitingToPlay2 = $result[1]["waitingToPlay"];

            return $waitingToPlay1 === $waitingToPlay2 && $waitingToPlay1 !== 0;
        }
        return false;
    }
}

