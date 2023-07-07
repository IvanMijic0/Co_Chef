<?php

require_once "BaseService.php";
require_once __DIR__ . "/../dao/ChatsDao.php";

class ChatServices extends BaseService
{
    private ChatsDao $chatsDao;

    public function __construct()
    {
        parent::__construct(new ChatsDao());
        $this->chatsDao = new ChatsDao();
    }

    public function updateChatTextByUserName($userName, $chatText): bool
    {
        return $this->chatsDao->updateChatTextByUserName($userName, $chatText);
    }

    public function checkUsersHaveSameChatGameId($userName1, $userName2): bool
    {
        return $this->chatsDao->checkUsersHaveSameChatGameId($userName1, $userName2);
    }

    public function deleteUsersWithSameGameId($userName): bool
    {
        return $this->chatsDao->deleteUsersWithSameGameId($userName);
    }

    public function getChatTextByUsername($username)
    {
        return $this->chatsDao->getChatTextByUsername($username);
    }

    public function updateDisplay($userName, $isUpdateDisplay): bool
    {
        return $this->chatsDao->updateDisplay($userName, $isUpdateDisplay);
    }

    public function checkUpdateDisplay($userName): bool
    {
       return $this->chatsDao->checkUpdateDisplay($userName);
    }

    public function clearChatText($userName): bool
    {
        return $this->chatsDao->clearChatText($userName);
    }
}