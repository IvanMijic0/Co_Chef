<?php

require_once "BaseService.php";
require_once __DIR__ . "/../dao/DishesDao.php";

class DishesService extends BaseService
{
    private DishesDao $dishesDao;

    public function __construct()
    {
        parent::__construct(new DishesDao());
        $this->dishesDao = new DishesDao();
    }

}