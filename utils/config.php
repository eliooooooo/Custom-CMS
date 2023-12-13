<?php 
include_once __DIR__ . '/../app/models/Config.php';

$configArray = [
    'database' => [   // Make sure the database exists before running the script DatabaseGenerator.php
        'name' => '', // Database name ex: user_db
        'host' => '', // Database host ex: localhost
        'user' => 'burkle', // Database user ex: root
        'password' => '', // Database password ex: root
        'charset' => 'utf8', // Database charset ex: utf8
    ],
    'admin' => [
        'id' => 1, // Admin id
        'name' => 'admin', // Admin name
        'email' => 'admin@iha.fr', // Admin email
        'password' => password_hash('admin', PASSWORD_DEFAULT), // Admin password
    ],
    'site' => [
        'name' => 'Les animaux de la forêt', // Site name
        'url' => '/~burkle/SAE_301_CUEJ/', // Site url ex: /~user/SAE_301_CMS/
        'description' => 'Découvrez les différents animaux de la forêt et leurs secrets', // Site description
        'author' => 'BURKLE Elitt', // Site author
    ],
];


Config::set($configArray);