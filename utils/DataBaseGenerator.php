<?php
$host = '';
$db   = '';
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
        name VARCHAR(255) NOT NULL,
        description TEXT NULL,
        image TEXT NULL
    );

    CREATE TABLE IF NOT EXISTS article (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT,
        id_category INT,
        FOREIGN KEY (id_category) REFERENCES category(id)
    );

    CREATE TABLE IF NOT EXISTS element (
        id INT AUTO_INCREMENT PRIMARY KEY,
        tags VARCHAR(11) NOT NULL,
        content TEXT NULL,
        alt VARCHAR(255) NULL,
        src TEXT NULL,
        class TEXT NULL,
        id_article INT NULL,
        FOREIGN KEY (id_article) REFERENCES article(id)
    );
    ";

    $pdo->exec($sql);

    echo "La base de données et les tables ont été créées avec succès.";
} catch (PDOException $e) {
    throw new PDOException($e->getMessage(), (int)$e->getCode());
}
