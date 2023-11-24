<?php
/*
*
* A passer en controller
*
*/
// Formulaire pour la connexion de l'utilisateur

// Connexion à la base de données
// include_once('./../../connexion.php');
// $pdo = connexion();

// $username = '';
// $password = '';

// // Empeche les injections de code sur les chaines de caractere
// function post_string($nom) {
//   $valeur = '';                          // on initialise avec une chaine vide
//   if (isset($_POST[$nom])) {             // si la variable POST est définie
//     $valeur = $_POST[$nom];              // on récupère sa valeur
//     $valeur = strip_tags($valeur);       // on supprime les balises
//     $valeur = htmlspecialchars($valeur); // on filtre les caractères spéciaux
//   }
//   return $valeur;
// }

// // Empeche les injections de code sur les entiers
// function post_integer($nom) {
//   $entier = 0;                   // on commence par fixer une valeur par défaut (ici 0)
//   if (isset($_POST[$nom])) {      // si la variable est définie
//     $valeur = $_POST[$nom];       // on récupère sa valeur
//     if (is_numeric($valeur)) {   // si elle est numérique
//       $entier = intval($valeur); // on on récupère la valeur convertie en entier
//     }
//   }
//   return $entier;                // on retourne la valeur testée et convertie
// }

// if ($_SERVER['REQUEST_METHOD'] === 'POST') {
//   // Récupération des données du formulaire
//   $username = post_string('username');
//   $password = post_string('mdp_user');


//   // Vérification des informations d'identification de l'utilisateur
//   $sql = "SELECT * FROM user WHERE username = :username";
//   $stmt = $pdo->prepare($sql);
//   $stmt->bindParam(':username', $username);
//   $stmt->execute();

//   $user = $stmt->fetch(PDO::FETCH_ASSOC);
//   if ($user && password_verify($password, $user['mdp_user'])) {
//       // Si les informations d'identification sont correctes, créer une session pour l'utilisateur

//       $_SESSION['id_user'] = $user['id_user'];
//       $_SESSION['username'] = $user['username'];

//       // Redirection vers la page d'accueil ou vers une page spécifique pour les utilisateurs connectés
//       header('Location: index.php');
//       exit;
//   } else {
//       // Si les informations d'identification sont incorrectes, afficher un message d'erreur
//       echo 'Nom d\'utilisateur ou mot de passe incorrect';
//   }
// } else {
//   // Vérifiez si l'utilisateur est connecté
//   if (isset($_SESSION['username'])) {
//       // Afficher l'username de l'utilisateur
//       $username = $_SESSION['username'];
//   }

//   // Récupère les données GET sur l'URL
//   if (isset($_GET['id'])) $id = $_GET['id']; else $id = 0;

//   // Lancement du moteur Twig avec les données
//   echo $twig->render('pages/connect.html.twig', [
//       'username' => $username,
//   ]);
// }

include_once(__DIR__ . './../../utils/form_security.php');
include_once(__DIR__ . './../../utils/connexion.php');
$pdo = connexion();

Class UserController {
  
  
    public static function login() {
      $username = '';
      $password = '';

      if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Récupération des données du formulaire
        $username = post_string('username');
        $password = post_string('mdp_user');
      }
  
      // Vérification des informations d'identification de l'utilisateur
      $sql = "SELECT * FROM user WHERE username = :username";
      $stmt = $pdo->prepare($sql);
      $stmt->bindParam(':username', $username);
      $stmt->execute();

      $user = $stmt->fetch(PDO::FETCH_ASSOC);
      if ($user && password_verify($password, $user['mdp_user'])) {
          // Si les informations d'identification sont correctes, créer une session pour l'utilisateur

          $_SESSION['id_user'] = $user['id_user'];
          $_SESSION['username'] = $user['username'];

          // Redirection vers la page d'accueil
          header('Location: index.php');
          exit;
      } else {
          // Si les informations d'identification sont incorrectes, afficher un message d'erreur
          echo 'Nom d\'utilisateur ou mot de passe incorrect';
      }
    }
}

echo UserController::login();