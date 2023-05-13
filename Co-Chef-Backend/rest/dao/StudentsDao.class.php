<?php

require_once "BaseDao.class.php";

class StudentsDao extends BaseDao
{
    public function __construct()
    {
        parent::__construct("students");
    }

    // custom function, which is not present in BaseDao
    // query_unique -> returns only 1 result if multiple are present
    function getUserByFirstNameAndLastName($firstName, $lastName)
    {
        return $this->query_unique(
            "SELECT * FROM students 
                    WHERE firstName = :firstName AND lastName = :lastName",
                          ["firstName" => $firstName, "lastName" => $lastName]
        );
    }
}