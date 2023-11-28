<?php
include_once 'utils/config.php';

$host = Config::get('database_host');
$db   = Config::get('database_name');
$user = Config::get('database_user');
$pass = Config::get('database_password');
$charset = Config::get('database_charset');

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
        subtitle VARCHAR(255) NULL,
        author VARCHAR(255) NULL,
        class TEXT NULL,
        id_category INT,
        FOREIGN KEY (id_category) REFERENCES category(id)
    );

    CREATE TABLE IF NOT EXISTS element (
        id INT AUTO_INCREMENT PRIMARY KEY,
        tags VARCHAR(11) NOT NULL,
        content TEXT NULL,
        alt VARCHAR(255) NULL,
        link TEXT NULL,
        class TEXT NULL,
        id_article INT NULL,
        FOREIGN KEY (id_article) REFERENCES article(id)
    );

    INSERT INTO category (name, description, image) VALUES ('Generated Category', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'https://picsum.photos/200/300');
    INSERT INTO article (title, subtitle, author, id_category) VALUES ('Generated Article', 'Generated Subtitle', 'elioooo', 1);
    INSERT INTO element (tags, content, alt, link, class, id_article) VALUES ('p', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', NULL, NULL, NULL, 1);
    INSERT INTO element (tags, content, alt, link, class, id_article) VALUES ('a', 'External Link', NULL, 'https://github.com/eliooooooo/CMS', NULL, 1);
    INSERT INTO element (tags, content, alt, link, class, id_article) VALUES ('img', NULL, 'Generated Image', 'https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcSWuuZvUBKsmf_45Bo5J0ypGw6fvzG1E3kdtOHjPnWZNHxdwk-_R38jE4CU_KCpKunM', NULL, 1);
    ";

    $pdo->exec($sql);

    echo "La base de données et les tables ont été créées avec succès.";
} catch (PDOException $e) {
    throw new PDOException($e->getMessage(), (int)$e->getCode());
}