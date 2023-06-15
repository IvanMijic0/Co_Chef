<?php

class BaseService{
    private BaseDao $dao;

    public function __construct($dao)
    {
        $this->dao = $dao;
    }

    public function get_all(): bool|array
    {
        return $this->dao->get_all();
    }

    public function get_by_id($id)
    {
        return $this->dao->get_by_id($id);
    }

    public function add($entity): bool|array
    {
        return $this->dao->insert($entity);
    }

    public function update($entity, $id): bool|array
    {
        return $this->dao->update($entity, $id);
    }

    public function delete($id): bool|array
    {
        return $this->dao->delete($id);
    }
}
