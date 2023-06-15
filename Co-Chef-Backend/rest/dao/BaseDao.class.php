<?php

require_once __DIR__ . "/../config.php";
class BaseDao
{
    protected ?PDO $conn;
    protected string $table_name;

    /**
     * Constructor of the Dao Class
     */
    public function __construct($table_name)
    {
        $this->table_name = $table_name;
        $host = Config::$host;
        $username = Config::$username;
        $password = Config::$password;
        $schema = Config::$database;
        $port = Config::$port;

        try
        {
            $this->conn = new PDO("mysql:host=$host;dbname=$schema;port=$port", $username, $password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }
        catch(PDOException $e)
        {
            echo "Error: " . $e->getMessage();
        }
    }

    /**
     * Method used to get all entities from DB
     */
    public function get_all(): bool|array
    {
        return $this->query("SELECT * FROM " . $this->table_name);
    }

    /*
     * Method used to get entity by id from database
     */
    public function get_by_id($id){

        $statement = $this->query("SELECT * FROM " . $this->table_name . " WHERE id = :id", ["id" => $id]);
        return reset($statement);
    }

    /*
     * Method used to add entity to DB
     */

    public function insert($entity): bool|array{
        $query = $this->buildInsertQuery($entity);

        $this->query($query, $entity);
        $entity['id'] = $this->conn->lastInsertId();
        return $entity;
    }

    /**
     * Method use to update entity in DB
     */
    public function update($entity, int $id, $id_column = "id"): bool|array
    {
        $query = $this->buildUpdateQuery($entity, $id_column);
        $this->query($query,  array_merge(["id" => $id], $entity));
        return $entity;
    }

    /**
     * Method use to delete entity in DB
     */
    public function delete(int $id): bool|array
    {
        return $this->query("DELETE FROM " . $this->table_name . " WHERE id = :id", ["id" => $id]);
    }

    /*
     * Helper method query()
     */
    protected function query($query, $params = []): bool|array
    {
        $stmt = $this->conn->prepare($query);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    protected function query_single($query, $params = [])
    {
        $stmt = $this->conn->prepare($query);
        $stmt->execute($params);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result === false) {
            return false; // Query execution failed
        }

        return $result;
    }

    /**
     * @param $entity
     * @return string
     */
    public function buildInsertQuery($entity): string
    {
        $query = "INSERT INTO " . $this->table_name . " (";

        foreach ($entity as $column => $value) {
            $query .= $column . ", ";
        }
        $query = substr($query, 0, -2);
        $query .= ") VALUES (";

        foreach ($entity as $column => $value) {
            $query .= ":" . $column . ", ";
        }
        $query = substr($query, 0, -2);
        $query .= ")";
        return $query;
    }

    /**
     * @param $entity
     * @param mixed $id_column
     * @return string
     */
    public function buildUpdateQuery($entity, string $id_column): string
    {
        $query = "UPDATE " . $this->table_name . " SET ";
        foreach ($entity as $column => $value) {
            $query .= $column . "=:" . $column . ", ";
        }
        $query = substr($query, 0, -2);
        $query .= " WHERE ${id_column} = :id";
        return $query;
    }

    protected function query_unique($query, $params)
    {
        $results = $this->query($query, $params);
        return reset($results);
    }
}
