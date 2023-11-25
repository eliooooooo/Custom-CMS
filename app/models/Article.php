<?php

include_once 'app/controllers/SqlController.php';

class Article {
    // liste des attributs
    public $h1;
    public $h2;
    public $auteur;
    public $class;

    function __construct() {
    }

    function affiche() {
        echo '<article class="'.$this->class.'" ><h1>'.$this->h1.'</h1><h2>'.$this->h2.'</h2></article>';
    }

    static function read($id = null) {
        $pdo = connexion();
        $sqlController = new SqlController($pdo);

        if ($id === null) {
            // Requête pour récupérer tous les articles
            $articles = $sqlController->select('article');

            // Pour chaque article, récupérer ses éléments
            foreach ($articles as &$article) {
                $elements = $sqlController->select('element', '*', 'id_article = ' . $article["id"]);

                // Ajouter les éléments à l'article
                $article['elements'] = $elements;
            }

            // Retourner les articles avec leurs éléments
            return $articles;
        } else {
            // Requête pour sélectionner un article
            $elements = $sqlController->select('element', '*', 'id_article = ' . $id);
            $article = $sqlController->select('article', '*', 'id = ' . $id);

            // Retourner les deux résultats sous forme de tableau
            return ['elements' => $elements, 'article' => $article];
        }
    }

    function create(){
        $pdo = connexion();
        $sqlController = new SqlController($pdo);

        // Construction du tableau de données
        $data = [
            'h1' => $this->h1,
            'h2' => $this->h2,
            'auteur' => $this->auteur,
            'class' => $this->class
        ];

        // Appel de la méthode insert de SqlController
        $sqlController->insert('article', $data);

        // Récupération de l'id
        $this->id = $pdo->lastInsertId();
    }

    function modifier($h1, $h2, $auteur, $class){
        // Requete pour modifier les valeurs
        $this->h1 = $h1;
        $this->h2 = $h2;
        $this->auteur = $auteur;
        $this->class = $class;

        if (empty($this->h2)) $this->h2 = NULL;
        if (empty($this->auteur)) $this->auteur = NULL;
        if (empty($this->class)) $this->class = NULL;
    }

    static function delete($id){
        $pdo = connexion();
        $sqlController = new SqlController($pdo);

        // Appel de la méthode delete de SqlController
        $sqlController->delete('article', 'id = ' . $id);
    }

    function update() {
        $pdo = connexion();
        $sqlController = new SqlController($pdo);

        // Construction du tableau de données
        $data = [];

        if ($this->h1 !== null) {
            $data['h1'] = $this->h1;
        }

        if ($this->h2 !== null) {
            $data['h2'] = $this->h2;
        }

        if ($this->auteur !== null) {
            $data['auteur'] = $this->auteur;
        }

        if ($this->class !== null) {
            $data['class'] = $this->class;
        }

        if (!empty($data)) {
            // Appel de la méthode update de SqlController
            $sqlController->update('element', $data, 'id = ' . $this->id);
        }
    }

    function chargePOST(){
        // Permet de charger le formulaire POST
        if (isset($_POST['h1'])) {
            $this->h1 = $_POST['h1'];
        } else {
            $this->h1 = NULL;
        }
        if (isset($_POST['h2'])) {
            $this->h2 = $_POST['h2'];
        } else {
            $this->h2 = NULL;
        }
        if (isset($_POST['auteur'])) {
            $this->auteur = $_POST['auteur'];
        } else {
            $this->auteur = NULL;
        }
        if (isset($_POST['class'])) {
            $this->class = $_POST['class'];
        } else {
            $this->class = NULL;
        }
    }
  }