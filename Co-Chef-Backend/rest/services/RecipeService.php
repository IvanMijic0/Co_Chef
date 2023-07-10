<?php

require_once "BaseService.php";
require_once __DIR__ . "/../dao/RecipeDao.php";

class RecipeService extends BaseService
{
    private RecipeDao $recipesDao;

    public function __construct()
    {
        parent::__construct(new RecipeDao());
        $this->recipesDao = new RecipeDao();
    }

}