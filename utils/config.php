<?php 

$configArray = [
    'database' => [
        'name' => 'burkle_bdd_CUEJ',
        'host' => 'tp2.iha.unistra.fr',
        'user' => 'burkle',
        'password' => 'zenbtryn',
        'charset' => 'utf8',
    ],
    'admin' => [
        'name' => 'admin',
        'email' => 'eliott.burkle@gmail.com',
        'password' => 'admin',
    ],
    'site' => [
        'name' => 'LE CUEJ',
        'url' => '~burkle/SAE_301_CMS/',
        'description' => 'Trop cool ce site !',
        'author' => 'Les journalistes en herbe',
    ],
];

Config::set($configArray);
