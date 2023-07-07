<?php

require_once "BaseDao.php";
error_reporting(E_ALL);
ini_set('display_errors', 1);

class ChatsDao extends BaseDao
{
    public function __construct()
    {
        parent::__construct("chats");
    }

    public function updateChatTextByUserName($userName, $chatText): bool
    {
        $query = "UPDATE " . $this->table_name . " SET chatText = ? WHERE userName = ?";
        $params = [$chatText, $userName];

        $affectedRows = $this->query($query, $params);

        return $affectedRows !== false;
    }

    public function checkUsersHaveSameChatGameId($userName1, $userName2): bool
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

    public function deleteUsersWithSameGameId($userName): bool
    {
        // Delete the users with the same non-zero gameId
        $query = "DELETE FROM " . $this->table_name . " WHERE gameId <> 0 AND userName = ?";
        $params = [$userName];

        $affectedRows = $this->query($query, $params);

        return $affectedRows !== false;
    }

    public function getChatTextByUsername($username)
    {
        $query = "SELECT chatText FROM " . $this->table_name . " WHERE userName = ?";
        $params = [$username];

        $result = $this->query_single($query, $params);

        if ($result) {
            return $result["chatText"];
        } else {
            return "";
        }
    }

    public function updateDisplay($userName, $isUpdateDisplay): bool
    {
        $query = "UPDATE " . $this->table_name . " SET updateDisplay = ? WHERE userName = ?";
        $params = [$isUpdateDisplay, $userName];

        $affectedRows = $this->query($query, $params);

        return $affectedRows !== false;
    }

    public function checkUpdateDisplay($userName): bool
    {
        $query = "SELECT updateDisplay FROM " . $this->table_name . " WHERE userName = ?";
        $params = [$userName];

        $result = $this->query_single($query, $params);

        if ($result && $result["updateDisplay"] == 1) {
            return true;
        } else {
            return false;
        }
    }
}