<?php 
session_start();


if (isset($_SESSION['user_id'])) {
    $isconnected = true;
} else {
    $isconnected = false;
}

// Connexion à la base de données
include_once(__DIR__ . '/utils/connexion.php');
$pdo = connexion();

// Appel des différents modèles
foreach (glob('app/models/*.php') as $filename) {
    include_once $filename;
}

// Import config
include_once 'utils/config.php';
$config = Config::get();
$project_path = $config['site_url'];

// Initialisation de Twig
require_once __DIR__ . '/vendor/autoload.php';
function init_twig() {
    // Indique le répertoire ou sont placés les modèles (templates)
    $loader = new \Twig\Loader\FilesystemLoader('app/views');

    // Crée un nouveau moteur Twig
    $twig = new \Twig\Environment($loader, ['debug' => true]);
    $twig->addExtension(new \Twig\Extension\DebugExtension());

    // Renvoie le moteur
    return $twig;
  }
$twig = init_twig();

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
$request_uri = str_replace($project_path, '', $request_uri);
// echo $request_uri;

// Récupérer la partie de l'URI après le premier slash
// $path = ltrim($request_uri, '/');
$path_tmp = explode('/', $request_uri, 2);
$path = $path_tmp[0];
// echo $path;

include_once 'app/controllers/ControllerBase.php';
include_once 'app/controllers/ErrorController.php';

// Si l'URI est vide (c'est-à-dire que nous sommes à la racine), afficher la page d'accueil
if (empty($path)) {
    $controller = new ControllerBase();
    echo $controller->render('frontpage.html.twig', []);
} else if ($path === 'admin') {
    $admin_fnct = $path_tmp[1];
    $controllerName = 'AdminController';
    $controllerPath = './app/controllers/' . $controllerName . '.php';

    if (file_exists($controllerPath)) {
        require $controllerPath;

        $controller = new $controllerName();

        try {
          $controller->$admin_fnct();
        } catch (Exception $e) {
            // Décommenter pour afficher les erreurs
            // echo $e->getMessage();
            // var_dump($e->getTrace());
            $errorController = new ErrorController();
            $errorController->notFound();
        } catch (Error $e) {
            // Décommenter pour afficher les erreurs
            // echo $e->getMessage();
            // var_dump($e->getTrace());
            $errorController = new ErrorController();
            $errorController->notFound();
        }
    } else {
        $errorController = new ErrorController();
        $errorController->notFound();
    }
} else {
    $className = ucfirst($path);
    $controllerName = $className . 'Controller';
    $controllerPath = './app/controllers/' . $controllerName . '.php';
    // echo $controllerPath;

    if (file_exists($controllerPath)) {
        require $controllerPath;
        $controller = new $controllerName();

        try {
          $controller->$action($id);
        } catch (Exception $e) {
            // Décommenter pour afficher les erreurs
            echo $e->getMessage();
            var_dump($e->getTrace());
            $errorController = new ErrorController();
            $errorController->notFound();
        } catch (Error $e) {
            // Décommenter pour afficher les erreurs
            echo $e->getMessage();
            var_dump($e->getTrace());
            $errorController = new ErrorController();
            $errorController->notFound();
        }

    } else {
        $errorController = new ErrorController();
        $errorController->notFound();
    }
}