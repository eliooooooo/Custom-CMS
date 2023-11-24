<?php
$host = '';
$db   = 'burkle_bdd_test';
$user = '';
$pass = '';
$charset = 'utf8';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$opt = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $opt);

    $sql = "
    CREATE DATABASE IF NOT EXISTS $db;

    USE $db;

    CREATE TABLE IF NOT EXISTS category (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS article (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT,
        id_categorie INT,
        FOREIGN KEY (id_categorie) REFERENCES categorie(id)
    );

    CREATE TABLE IF NOT EXISTS element (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        id_article INT,
        FOREIGN KEY (id_article) REFERENCES article(id)
    );
    ";

    $pdo->exec($sql);

    echo "La base de données et les tables ont été créées avec succès.";
} catch (PDOException $e) {
    throw new PDOException($e->getMessage(), (int)$e->getCode());
}
