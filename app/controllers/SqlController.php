<?php

class SqlController {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

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

    public function insert($table, $data) {
        $columns = implode(", ", array_keys($data));
        $values = implode(", ", array_map(function($value) { return "'$value'"; }, array_values($data)));
        $query = "INSERT INTO $table ($columns) VALUES ($values)";

        // Préparation et exécution de la requête
        $statement = $this->pdo->prepare($query);
        $statement->execute();
    }

    public function update($table, $data, $conditions = "") {
        $set = "";
        foreach ($data as $column => $value) {
            $set .= "$column = $value, ";
        }
        $set = rtrim($set, ", ");
        $query = "UPDATE $table SET $set";
        if (!empty($conditions)) {
            $query .= " WHERE $conditions";
        }

        // Préparation et exécution de la requête
        $statement = $this->pdo->prepare($query);
        $statement->execute();
    }

    public function delete($table, $conditions = "") {
        $query = "DELETE FROM $table";
        if (!empty($conditions)) {
            $query .= " WHERE $conditions";
        }

        // Préparation et exécution de la requête
        $statement = $this->pdo->prepare($query);
        $statement->execute();    }
}

