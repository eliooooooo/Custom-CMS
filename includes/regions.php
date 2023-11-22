<?php

// Définition des régions existantes
// Créer une table dédiée dans la base de donnée ? Pour modifier les élémets au besoin (par le formulaire checkbox)
$regions = [
    'header' => true,
    'primary_menu' => false,
    'secondary_menu' => false,
    'aside_left' => false,
    'aside_right' => false,
    'breadcrumb' => false,
    'top_page' => false,
    'bottom_page' => [
        'bottom_page_first' => false,
        'bottom_page_second' => false,
        'bottom_page_third' => false,
    ],
    'footer' => [
        'footer_first' => true,
        'footer_second' => false,
        'footer_third' => false,
        'footer_fourth' => false,
    ],
];

