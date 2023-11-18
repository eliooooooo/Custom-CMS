<?php
// Permet a l'utilisateur de se connecter à son compte préalablement inscrit
include('includes/connexion.php');
include('includes/securite.php');
$pdo = connexion();



if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Récupération des données du formulaire
    $username = post_string('username');
    $password = post_string('mdp_user');


    // Vérification des informations d'identification de l'utilisateur
    $sql = "SELECT * FROM user WHERE username = :username";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':username', $username);
    $stmt->execute();

    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($user && password_verify($password, $user['mdp_user'])) {
        // Si les informations d'identification sont correctes, créer une session pour l'utilisateur
        session_start();

        $_SESSION['id_user'] = $user['id_user'];
        $_SESSION['username'] = $user['username'];

        // Redirection vers la page d'accueil ou vers une page spécifique pour les utilisateurs connectés
        header('Location: index.php');
        exit;
    } else {
        // Si les informations d'identification sont incorrectes, afficher un message d'erreur
        echo 'Nom d\'utilisateur ou mot de passe incorrect';
    }
}