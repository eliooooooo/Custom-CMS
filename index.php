<?php 
session_start();

include('./includes/connexion.php');
include('./includes/element.php');
include('./includes/article.php');

echo '<div class="text-banner" > 🚧 Site en construction 🚧 </div>';

// récupération de la variable page sur l'URL
if (isset($_GET['page'])) $page = $_GET['page']; else $page = '';
 
// récupération de la variable action sur l'URL
if (isset($_GET['action'])) $action = $_GET['action']; else $action = 'read';
 
// récupération de l'id s'il existe (par convention la clé 0 correspond à un id inexistant)
if (isset($_GET['id'])) $id = intval($_GET['id']); else $id = 0;
 
// test des différents choix du controleur
switch ($page) {
    case 'element' :
      switch ($action) {
        case 'read' :
            if ($id > 0) {
                $modele = './pages/ReadOne.html.twig';
                $data = ['element' => Element::readOne($id)];
            }
            else {
                $modele = './pages/ReadAll.html.twig';
                $data = ['element' => Element::readAll()];
            }
            break;
        case 'create' :
            $element = new Element();
            $element->modifier($_POST['balise'], $_POST['contenu'], $_POST['alt'], $_POST['src'], $_POST['class']);
            $element->create();
            $modele = './pages/ReadOne.html.twig';
            $data = ['element' => Element::readOne($element->id)];
            break;
        case 'delete' :
            Element::delete($id);
            $modele = './pages/ReadAll.html.twig';
            $data = ['element' => Element::readAll()];
            break;
        case 'update' :
            $element = Element::readOne($id);
            $element->modifier($_POST['balise'], $_POST['contenu'], $_POST['alt'], $_POST['src'], $_POST['class']);
            $element->update();
            $modele = './pages/ReadOne.html.twig';
            $data = ['element' => Element::readOne($id)];
            break;
      }
      break;
    case 'article' :
        switch ($action) {
            case 'read' :
                if ($id > 0) {
                    $modele = './pages/ReadOne.html.twig';
                    $data = ['article' => Article::readOne($id)];
                }
                else {
                    $modele = './pages/ReadAll.html.twig';
                    $data = ['article' => Article::readAll()];
                }
                break;
            case 'create' :
                $article = new Article();
                $article->modifier($_POST['h1'], $_POST['h2'], $_POST['auteur'], $_POST['class']);
                $article->create();
                $modele = './pages/ReadOne.html.twig';
                $data = ['article' => Article::readOne($article->id)];
                break;
            case 'delete' :
                Article::delete($id);
                $modele = './pages/ReadAll.html.twig';
                $data = ['article' => Article::readAll()];
                break;
            case 'update' :
                $article = Article::readOne($id);
                $article->modifier($_POST['h1'], $_POST['h2'], $_POST['auteur'], $_POST['class']);
                $article->update();
                $modele = './pages/ReadOne.html.twig';
                $data = ['article' => Article::readOne($id)];
                break;
        }
        break;   
    default :
      $modele = 'frontpage.html.twig';
      $data = [];
  }


// Vérifiez si l'utilisateur est connecté
$id_user = '';
$username = '';
if (isset($_SESSION['id_user'])) {
    // Afficher l'id de l'utilisateur
    $id_user = $_SESSION['id_user'];
}
if (isset($_SESSION['username'])) {
    // Afficher l'username de l'utilisateur
    $username = $_SESSION['username'];
}

// Initialise Twig
include('includes/twig.php');
$twig = init_twig();

// Connexion à la base de données
// include('includes/connexion.php');
$pdo = connexion();

$data += [
    'username' => $username,
    'id_user' => $id_user,
];

// Lancement du moteur Twig avec les données
echo $twig->render($modele, $data);
