<?php

class SqlGenerator {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    /**
     * Permet de Générer une requête SELECT
     *
     * @param $table
     * @param $columns
     * @param $conditions
     * @return string
     */
    public function select($table, $columns = "*", $conditions = "") {
        $query = "SELECT $columns FROM $table";
        if (!empty($conditions)) {
            $query .= " WHERE $conditions";
        }
        $statement = $this->pdo->prepare($query);
        $statement->execute();
        $result = $statement->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    /**
     * Permet de Générer une requête INSERT
     *
     * @param $table
     * @param $data
     * @return void
     */
    public function insert($table, $data) {
        $columns = implode(", ", array_keys($data));
        $values = implode(", ", array_map(function($value) { return $this->pdo->quote($value); }, array_values($data)));
        $query = "INSERT INTO $table ($columns) VALUES ($values)";

        // Préparation et exécution de la requête
        $statement = $this->pdo->prepare($query);
        $statement->execute();
    }

    /**
     * Permet de Générer une requête UPDATE
     *
     * @param $table
     * @param $data
     * @param $where
     * @return void
     */
    public function update($table, $data, $where) {
        $set = '';
        foreach ($data as $column => $value) {
            $value = $this->pdo->quote($value);
            $set .= "$column = $value, ";
        }
        $set = rtrim($set, ', ');

        $query = "UPDATE $table SET $set WHERE $where";

        // Préparation et exécution de la requête
        $statement = $this->pdo->prepare($query);
        $statement->execute();
    }

    /**
     * Permet de Générer une requête DELETE
     *
     * @param $table
     * @param $conditions
     * @return void
     */
    public function delete($table, $conditions = "") {
        $query = "DELETE FROM $table";
        if (!empty($conditions)) {
            $query .= " WHERE $conditions";
        }

        // Préparation et exécution de la requête
        $statement = $this->pdo->prepare($query);
        $statement->execute();    
    }
}

