<?php 
session_start();


// Connexion à la base de données
if ($_SESSION == null) {
    include_once(__DIR__ . '/utils/connexion.php');
    $pdo = connexion();
}


// Fonction qui permet d'initialiser Twig en fixant le dossier des modèles
require_once('vendor/autoload.php');
function init_twig()
{
    // Indique le répertoire ou sont placés les modèles (templates)
    $loader = new \Twig\Loader\FilesystemLoader('app/views');

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


// Appel des différents modèles
foreach (glob('app/models/*.php') as $filename) {
    include $filename;
}
// Appel du controller SQL
include_once 'app/controllers/SqlController.php';



// Premier controlleur (redirige vers les controlleurs concernés)
// Appel des différents contrôleurs
// Obtenir l'URI demandée
// Pour chaque URI, on récupère la route et on la découpe en paramètres (page, action, id) avec chacun leur valeur
// Découper l'URI en deux parties (avant et après le ?)
$request_uri = explode('?', $_SERVER['REQUEST_URI'], 2);

//Initialisation des variables
$action = 'read';
$id = NULL;

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
$project_path = '/~burkle/CMS';
$request_uri = str_replace($project_path, '', $request_uri);
// echo $request_uri;

// Récupérer la partie de l'URI après le premier slash
$path = ltrim($request_uri, '/');

// Si l'URI est vide (c'est-à-dire que nous sommes à la racine), afficher la page d'accueil
if (empty($path)) {
    echo $twig->render('frontpage.html.twig');
} else {
    // Sinon, essayer d'inclure le contrôleur correspondant
    $className = ucfirst($path);
    $controllerName = $className . 'Controller';
    $controllerPath = './app/controllers/' . $controllerName . '.php';
    // echo $controllerPath;

    if (file_exists($controllerPath)) {
        require $controllerPath;

    } else {
        // Si le contrôleur n'existe pas, afficher une erreur 404
        echo $twig->render('errors/404.html.twig');
    }
}