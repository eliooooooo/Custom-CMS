<?php 
include_once __DIR__ . '/../app/models/Config.php';

$configArray = [
    'database' => [   // Make sure the database exists before running the script DatabaseGenerator.php
        'name' => '', // Database name ex: user_db
        'host' => '', // Database host ex: localhost
        'user' => '', // Database user ex: root
        'password' => '', // Database password ex: root
        'charset' => '', // Database charset ex: utf8
    ],
    'admin' => [
        'id' => 1, // Admin id
        'name' => 'admin', // Admin name
        'email' => 'admin@iha.fr', // Admin email
        'password' => 'admin', // Admin password
    ],
    'site' => [
        'name' => 'En quête du sauvage', // Site name
        'url' => '/mini-sites/sauvage/', // Site url ex: /~user/SAE_301_CMS/
        'description' => '', // Site description
        'author' => '', // Site author
    ],
];


Config::set($configArray);