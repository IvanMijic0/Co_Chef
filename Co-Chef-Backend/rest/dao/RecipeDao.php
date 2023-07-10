<?php

class RecipeDao extends BaseDao
{
    public function __construct()
    {
        parent::__construct("recipes");
    }

    public function getRecipeByName($name)
    {
        $query = "SELECT * FROM " . $this->table_name . " WHERE name = :name";
        $stm = $this->conn->prepare($query);
        $stm->execute(["name" => $name]);

        return $stm->fetch(PDO::FETCH_ASSOC);
    }

}