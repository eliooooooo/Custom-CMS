<?php 
session_start();


// Connexion à la base de données
include('connexion.php');
$pdo = connexion();


// Fonction qui permet d'initialiser Twig en fixant le dossier des modèles
require_once('vendor/autoload.php');
function init_twig()
{
    // Indique le répertoire ou sont placés les modèles (templates)
    $loader = new \Twig\Loader\FilesystemLoader('./app/views');

    // Crée un nouveau moteur Twig
    $twig = new \Twig\Environment($loader, ['debug' => true]);
    $twig->addExtension(new \Twig\Extension\DebugExtension());

    // Renvoie le moteur
    return $twig;
}
$twig = init_twig();


// Gestionnaires d'erreurs et d'exceptions
function customErrorHandler($errno, $errstr, $errfile, $errline) {
    echo "Erreur: [$errno] $errstr - $errfile:$errline";
    die();
}

function customExceptionHandler($exception) {
    echo "Exception: " . $exception->getMessage();
    die();
}

set_error_handler("customErrorHandler");
set_exception_handler("customExceptionHandler");
// Décommenter pour afficher les erreurs
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


// Empeche les injections de code sur les chaines de caractere
function post_string($nom) {
    $valeur = '';                          // on initialise avec une chaine vide
    if (isset($_POST[$nom])) {             // si la variable POST est définie
      $valeur = $_POST[$nom];              // on récupère sa valeur
      $valeur = strip_tags($valeur);       // on supprime les balises
      $valeur = htmlspecialchars($valeur); // on filtre les caractères spéciaux
    }
    return $valeur;
  }
  
  // Empeche les injections de code sur les entiers
  function post_integer($nom) {
    $entier = 0;                   // on commence par fixer une valeur par défaut (ici 0)
    if (isset($_POST[$nom])) {      // si la variable est définie
      $valeur = $_POST[$nom];       // on récupère sa valeur
      if (is_numeric($valeur)) {   // si elle est numérique
        $entier = intval($valeur); // on on récupère la valeur convertie en entier
      }
    }
    return $entier;                // on retourne la valeur testée et convertie
  }


// Premier controlleur (redirige vers les controlleurs concernés)
// Obtenir l'URI demandée
// Pour chaque URI, on récupère la route et on la découpe en paramètres (page, action, id) avec chacun leur valeur
// Découper l'URI en deux parties (avant et après le ?)
$request_uri = explode('?', $_SERVER['REQUEST_URI'], 2);
// Si il y a une partie après le ?
if (isset($request_uri[1])) {
    // Si il y a plusieurs paramètres
    if (explode('&', $request_uri[1])) {
        // Découper les paramètres
        $route = explode('&', $request_uri[1]);
        // var_dump($route);
        // Pour chaque paramètre, on récupère la route et on la découpe en paramètres (page, action, id) avec chacun leur valeur
        foreach ($route as $key) {
            $tmp_route = explode('=', $key);
            if ( $tmp_route[0] == 'page') {
                $page = $tmp_route[1];
            }
            if ($tmp_route[0] == 'action') {
                $action = $tmp_route[1];
            }
            if ($tmp_route[0] == 'id') {
                $id = $tmp_route[1];
            }
        }
    }
}
$request_uri = $request_uri[0];

// Supprimer le chemin du projet de l'URI
/* 
* 
* Peut être généralisé ??
*
*/
$project_path = '/~burkle/CMS';
$request_uri = str_replace($project_path, '', $request_uri);

// echo $request_uri;

// Redirigé en fonction du type de contenu demandé
switch ($request_uri) {
    case '/':
        echo $twig->render('frontpage.html.twig');
        break;
    // Affichage des éléments
    case '/element':
        require './app/controllers/ElementController.php';
        break;
    // Affichage des articles
    case '/article':
        require './app/controllers/ArticleController.php';
        break;
    // Affichage des catégories
    case '/category':
        require './app/controllers/CategoryController.php';
        break;
    // Tout le reste
    // default:
    //     require './views/404.php';
    //     break;
}

?>