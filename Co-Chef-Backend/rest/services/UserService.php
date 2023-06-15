<?php

require_once "BaseService.php";
require_once __DIR__ . "/../dao/UsersDao.class.php";
class UserService extends BaseService {

    private UsersDao $userDao;

    public function __construct()
    {
        parent::__construct(new UsersDao());
        $this->userDao = new UsersDao();
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
}