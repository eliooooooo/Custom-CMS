<?php 
include_once __DIR__ . '/../app/models/Config.php';

$configArray = [
    'database' => [
        'name' => '',
        'host' => '',
        'user' => 'burkle',
        'password' => '',
        'charset' => 'utf8',
    ],
    'admin' => [
        'name' => 'admin',
        'email' => 'eliott.burkle@gmail.com',
        'password' => 'admin',
    ],
    'site' => [
        'name' => 'LE CUEJ',
        'url' => '/~burkle/SAE_301_CMS/',
        'description' => 'Trop cool ce site !',
        'author' => 'Les journalistes en herbe',
    ],
];


Config::set($configArray);
