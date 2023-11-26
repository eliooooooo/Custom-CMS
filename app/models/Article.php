<?php

include_once 'app/controllers/SqlController.php';

class Article {
    // liste des attributs
    public $title;
    public $subtitle;
    public $author;
    public $class;

    function __construct() {
    }

    function affiche() {
        echo '<article class="'.$this->class.'" ><h1>'.$this->title.'</h1><h2>'.$this->subtitle.'</h2></article>';
    }

    public function getAttributes() {
        return get_object_vars($this);
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
            'title' => $this->title,
            'subtitle' => $this->subtitle,
            'author' => $this->author,
            'class' => $this->class
        ];

        // Appel de la méthode insert de SqlController
        $sqlController->insert('article', $data);

        // Récupération de l'id
        $this->id = $pdo->lastInsertId();
    }

    function setAttributes($attributes) {
        /**
         * Appel de la fonction exemple :
         * $element->setAttributes([
         *      'tags' => $tags,
         *      'content' => $content,
         *      'alt' => $alt,
         *      'link' => $link,
         *      'class' => $class,
         *      'id_article' => $id_article
         *]);
         */
        foreach ($attributes as $key => $value) {
            if (property_exists($this, $key)) {
                $this->$key = $value;
                if (empty($this->$key)) {
                    $this->$key = NULL;
                }
            }
        }
    }

    static function delete($id){
        $pdo = connexion();
        $sqlController = new SqlController($pdo);

        // Appel de la méthode delete de SqlController
        $sqlController->delete('article', 'id = ' . $id);
    }

    function update($id) {
        if ($id === null) {
            throw new Exception('Erreur : l\'ID est null.');
        }

        $pdo = connexion();
        $sqlController = new SqlController($pdo);

        // Construction du tableau de données
        $data = [];
        $attributes = $this->getAttributes();
        
        foreach ($attributes as $key => $value) {
            if ($value !== null) {
                $data[$key] = $value;
            }
        }

        if (!empty($data)) {
            // Appel de la méthode update de SqlController
            $sqlController->update('article', $data, 'id = ' . $id);
        }
    }

    function chargePOST(){
        // Permet de charger le formulaire POST
        if (isset($_POST['title'])) {
            $this->title = $_POST['title'];
        } else {
            $this->title = NULL;
        }
        if (isset($_POST['subtitle'])) {
            $this->subtitle = $_POST['subtitle'];
        } else {
            $this->subtitle = NULL;
        }
        if (isset($_POST['author'])) {
            $this->author = $_POST['author'];
        } else {
            $this->author = NULL;
        }
        if (isset($_POST['class'])) {
            $this->class = $_POST['class'];
        } else {
            $this->class = NULL;
        }
    }
  }