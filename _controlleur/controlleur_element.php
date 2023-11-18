<?php 

include('./includes/element.php');

require_once './vendor/autoload.php';
$loader = new \Twig\Loader\FilesystemLoader(['./templates/', './templates/pages/', './templates/components/']);
$twig = new \Twig\Environment($loader);

// <ul>
//     <li><a href="index.php?page=element&action=read">Affichage des éléments</a></li>
//     <li><a href="index.php?page=element&action=create">Création d'un élément</a></li>
//     <li><a href="index.php?page=element&action=delete&id=1">Suppression de l'élément 1</a></li>
//     <li><a href="index.php?page=element&action=read&id=1">Affichage de un élément </a></li>
//     <li><a href="index.php?page=element&action=exec">Fausse action sur les éditeurs</a></li>
//     <li><a href="index.php?page=xxx">Page inexistante</a></li>
// </ul>

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
            $modele = './pages/Create.html.twig';
            $data = ['element' => Element::create()];
            break;
        case 'delete' :
            $modele = './pages/Delete.html.twig';
            $data = ['element' => Element::delete($id)];
            break;
      }
      break;   
    default :
      $modele = 'frontpage.html.twig';
      $data = [];
  }
   
  // Affichage du modèle choisi avec les données récupérées
  echo $twig->render($modele, $data);