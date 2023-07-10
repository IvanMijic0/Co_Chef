<?php

require_once "BaseService.php";
require_once __DIR__ . "/../dao/UsersDao.php";

class UserService extends BaseService
{

    private UsersDao $userDao;

    public function __construct()
    {
        parent::__construct(new UsersDao());
        $this->userDao = new UsersDao();
    }

    public function get_user_by_email($email)
    {
        return $this->userDao->get_user_by_email($email);
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

    public function isWaitingToPlay($userName): bool
    {
        return $this->userDao->isWaitingToPlay($userName);
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

    public function updateUserIsRejected($userName, $isRejected): bool
    {
        return $this->userDao->updateUserIsRejected($userName, $isRejected);
    }

    public function updateWaitingToPlay($userName, $waitingToPlay): bool
    {
        return $this->userDao->updateWaitingToPlay($userName, $waitingToPlay);
    }

    public function isRejected($userName): bool
    {
        return $this->userDao->isRejected($userName);
    }
    public function resetGameOpponent($userEmail): bool
    {
        return $this->userDao->resetGameOpponent($userEmail);
    }

    public function checkUsersHaveSameGameId($userName1, $userName2): bool
    {
        return $this->userDao->checkUsersHaveSameGameId($userName1, $userName2);
    }

    public function checkUsersHaveWaitingToPlay($userName1, $userName2): bool
    {
        return $this->userDao->checkUsersHaveWaitingToPlay($userName1, $userName2);
    }

    public function updateRecipe($userName, $recipe): bool
    {
        return $this->userDao->updateRecipe($userName, $recipe);
    }

    public function resetRecipe($recipe): bool
    {
        return $this->userDao->resetRecipe($recipe);
    }

    public function getRecipeByUserName($userName)
    {
        return $this->userDao->getRecipeByUserName($userName);
    }

    public function updateTasksCompleted($userName, $tasksCompleted): bool
    {
        return $this->userDao->updateTasksCompleted($userName, $tasksCompleted);
    }

    public function checkUsersHaveSameTaskCompleted($userName1, $userName2): bool
    {
        return $this->userDao->checkUsersHaveSameTaskCompleted($userName1, $userName2);
    }

    public function getGameIdByUsername($username)
    {
        return $this->userDao->getGameIdByUsername($username);
    }
}