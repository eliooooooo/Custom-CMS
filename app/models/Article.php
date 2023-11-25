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
                $elements = $sqlController->select('element', '*', 'article = ' . $article["id_article"], 'article');

                // Ajouter les éléments à l'article
                $article['elements'] = $elements;
            }

            // Retourner les articles avec leurs éléments
            return $articles;
        } else {
            // Requête pour sélectionner un article
            $elements = $sqlController->select('element', '*', 'article = ' . $id, 'id');
            $article = $sqlController->select('article', '*', 'id_article = ' . $id);

            // Retourner les deux résultats sous forme de tableau
            return ['elements' => $elements, 'article' => $article];
        }
    }

    function create(){
        // Requete pour créer un article
        $sql = 'INSERT INTO article (h1, h2, auteur, class) VALUES (:h1, :h2, :auteur, :class)';
        
        $pdo = connexion();
        $query = $pdo->prepare($sql);
        $query->bindValue(':h1', $this->h1, PDO::PARAM_STR);
        $query->bindValue(':h2', $this->h2, PDO::PARAM_STR);
        $query->bindValue(':auteur', $this->auteur, PDO::PARAM_STR);
        $query->bindValue(':class', $this->class, PDO::PARAM_STR);
        $query->execute();

        // Récupération de l'id de l'article crée
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
        // Requete pour supprimer un article
        $sql = 'DELETE FROM article WHERE id = :id';
        $pdo = connexion();
        $query = $pdo->prepare($sql);
        $query->bindValue(':id', $id, PDO::PARAM_INT);
        $query->execute();
    }

    function update() {
        // Requete pour mettre à jour les valeurs
        $fields = [];
        $params = [':id' => $this->id];

        if ($this->h1 !== null) {
            $fields[] = 'h1 = :h1';
            $params[':h1'] = $this->h1;
        }

        if ($this->h2 !== null) {
            $fields[] = 'h2 = :h2';
            $params[':h2'] = $this->h2;
        }

        if ($this->auteur !== null) {
            $fields[] = 'auteur = :auteur';
            $params[':auteur'] = $this->auteur;
        }

        if ($this->class !== null) {
            $fields[] = 'class = :class';
            $params[':class'] = $this->class;
        }

        if (!empty($fields)) {
            $sql = sprintf(
                'UPDATE element SET %s WHERE id = :id',
                implode(', ', $fields)
            );

            $pdo = connexion();
            $query = $pdo->prepare($sql);

            foreach ($params as $key => $value) {
                $query->bindValue($key, $value);
            }

            $query->execute();
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