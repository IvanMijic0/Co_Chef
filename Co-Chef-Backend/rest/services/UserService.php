<?php

require_once "BaseService.php";
require_once __DIR__ . "/../dao/UsersDao.class.php";

class UserService extends BaseService
{

    private UsersDao $userDao;

    public function __construct()
    {
        parent::__construct(new UsersDao());
        $this->userDao = new UsersDao();
    }

    public function checkUserByUserNameEmailAndPassword($userName, $email, $password): bool
    {
        return $this->userDao->checkUserByUserNameEmailAndPassword($userName, $email, $password);
    }

    public function checkUserByEmailAndPassword($email, $password): bool
    {
        return $this->userDao->checkUserByEmailAndPassword($email, $password);
    }

    public function updateUserAvailability($userEmail, $userPassword, $isAvailable): void
    {
        $this->userDao->updateUserAvailability($userEmail, $userPassword, $isAvailable);
    }

    public function isUserAvailable($userEmail, $userPassword): bool
    {
        return $this->userDao->isUserAvailable($userEmail, $userPassword);
    }

    public function saveGameOpponent($userEmail, $userPassword, $gameOpponent): bool
    {
        return $this->userDao->saveGameOpponent($userEmail, $userPassword, $gameOpponent);
    }

    public function updateUserWillPlay($userEmail, $userPassword, $willPlay): bool
    {
        return $this->userDao->updateUserWillPlay($userEmail, $userPassword, $willPlay);
    }

    public function isWillPlay($userEmail, $userPassword): bool
    {
        return $this->userDao->isWillPlay($userEmail, $userPassword);
    }

    public function getUserNameByGameOpponent($gameOpponent)
    {
        return $this->userDao->getUserNameByGameOpponent($gameOpponent);
    }

    public function getGameOpponentByUsername($username)
    {
        return $this->userDao->getGameOpponentByUsername($username);
    }

    public function updateGameOpponent($userEmail, $gameOpponent): bool
    {
        return $this->userDao->updateGameOpponent($userEmail, $gameOpponent);
    }

    public function getUserNameByEmailAndPassword($email, $password)
    {
        return $this->userDao->getUserNameByEmailAndPassword($email, $password);
    }

    public function updateGameId($userName, $gameId): bool
    {
        return $this->userDao->updateGameId($userName, $gameId);
    }
}