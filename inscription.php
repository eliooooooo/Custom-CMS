<?php
// Formulaire permettant l'inscription de l'utilisateur
session_start();

// Vérifiez si l'utilisateur est connecté
$username = '';
if (isset($_SESSION['username'])) {
    // Afficher l'username de l'utilisateur
    $username = $_SESSION['username'];
}

// Initialise Twig
include('includes/twig.php');
$twig = init_twig();

// Récupère les données GET sur l'URL
if (isset($_GET['id'])) $id = $_GET['id']; else $id = 0;

// Connexion à la base de données
include('includes/connexion.php');
$pdo = connexion();

// Lancement du moteur Twig avec les données
echo $twig->render('./pages/connexion.html.twig', [
    'username' => $username,
]);