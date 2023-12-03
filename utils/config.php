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
        'email' => getenv('ADMIN_EMAIL'), // Admin email
        'password' => password_hash(getenv('ADMIN_PASSWORD'), PASSWORD_DEFAULT), // Admin password
    ],
    'site' => [
        'name' => 'LE CUEJ', // Site name
        'url' => '/~burkle/SAE_301_CMS/', // Site url ex: /~user/SAE_301_CMS/
        'description' => 'Trop cool ce site !', // Site description
        'author' => 'Les journalistes en herbe', // Site author
    ],
];

Config::set($configArray);