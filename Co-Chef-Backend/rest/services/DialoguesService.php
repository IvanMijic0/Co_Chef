<?php

require_once "BaseService.php";
require_once __DIR__ . "/../dao/DialoguesDao.php";

class DialoguesService extends BaseService
{
    private DialoguesDao $dialoguesDao;

    public function __construct()
    {
        parent::__construct(new DialoguesDao());
        $this->dialoguesDao = new DialoguesDao();
    }

    public function getDefaultTextByActor($actor)
    {
       return $this->dialoguesDao->getDefaultTextByActor($actor);
    }
    public function getSelectedTextByActor($actor)
    {
        return $this->dialoguesDao->getSelectedTextByActor($actor);
    }
}
