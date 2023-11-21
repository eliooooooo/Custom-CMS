<?php

class Element {
    // liste des attributs
    public $balise;
    public $contenu;
    public $alt;
    public $src;
    public $class;

    function __construct() {
    }

    function affiche() {
        if ($this->balise == 'img') {
            echo '<img src="'.$this->src.'" alt="'.$this->alt.'" class="'.$this->class.'">';
        } else {
            echo '<'.$this->balise.' class="'.$this->class.'" >'.$this->contenu.'</'.$this->balise.'>';
        }
    }

    static function readAll() {
        // Requête pour récupérer tous les éléments
        $sql= 'SELECT * FROM element';
     
        $pdo = connexion();
        $query = $pdo->prepare($sql);
        $query->execute();
        $tableau = $query->fetchAll(PDO::FETCH_CLASS,'Element');
        
        return $tableau;
    }

    static function readOne($id){
        // Requête pour récupérer un seul élément
        $sql= 'SELECT * FROM element WHERE id = :valeur';
     
        $pdo = connexion();
        $query = $pdo->prepare($sql);
        $query->bindValue(':valeur', $id, PDO::PARAM_INT);
        $query->execute();
        $objet = $query->fetchObject('Element');
     
        return $objet;
    }

    function create(){
        // Requête pour créer un élément
        $sql = 'INSERT INTO element (balise, contenu, alt, src, class) VALUES (:balise, :contenu, :alt, :src, :class)';
        
        $pdo = connexion();
        $query = $pdo->prepare($sql);
        $query->bindValue(':balise', $this->balise, PDO::PARAM_STR);
        $query->bindValue(':contenu', $this->contenu, PDO::PARAM_STR);
        $query->bindValue(':alt', $this->alt, PDO::PARAM_STR);
        $query->bindValue(':src', $this->src, PDO::PARAM_STR);
        $query->bindValue(':class', $this->class, PDO::PARAM_STR);
        $query->execute();

        // Récupération de l'id de l'élément créé
        $this->id = $pdo->lastInsertId();
    }

    function modifier($balise, $contenu, $alt, $src, $class){
        // Modification des attributs
        $this->balise = $balise;
        $this->contenu = $contenu;
        $this->alt = $alt;
        $this->src = $src;
        $this->class = $class;

        if (empty($this->contenu)) $this->contenu = NULL;
        if (empty($this->alt)) $this->alt = NULL;
        if (empty($this->src)) $this->src = NULL;
        if (empty($this->class)) $this->class = NULL;
    }

    static function delete($id){
        // Requête pour supprimer un élément
        $sql = 'DELETE FROM element WHERE id = :id';
        $pdo = connexion();
        $query = $pdo->prepare($sql);
        $query->bindValue(':id', $id, PDO::PARAM_INT);
        $query->execute();
    }

    function update() {
        // Requête pour modifier un élément
        $fields = [];
        $params = [':id' => $this->id];

        if ($this->balise !== null) {
            $fields[] = 'balise = :balise';
            $params[':balise'] = $this->balise;
        }

        if ($this->contenu !== null) {
            $fields[] = 'contenu = :contenu';
            $params[':contenu'] = $this->contenu;
        }

        if ($this->alt !== null) {
            $fields[] = 'alt = :alt';
            $params[':alt'] = $this->alt;
        }

        if ($this->src !== null) {
            $fields[] = 'src = :src';
            $params[':src'] = $this->src;
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
        // Charge les attributs à partir des données POST
        if (isset($_POST['balise'])) {
            $this->balise = $_POST['balise'];
        } else {
            $this->balise = NULL;
        }
        if (isset($_POST['contenu'])) {
            $this->contenu = $_POST['contenu'];
        } else {
            $this->contenu = NULL;
        }
        if (isset($_POST['alt'])) {
            $this->alt = $_POST['alt'];
        } else {
            $this->alt = NULL;
        }
        if (isset($_POST['src'])) {
            $this->src = $_POST['src'];
        } else {
            $this->src = NULL;
        }
        if (isset($_POST['class'])) {
            $this->class = $_POST['class'];
        } else {
            $this->class = NULL;
        }
    }

    static function readByArticle($id){
        // Requête pour récupérer tous les éléments d'un article
        $sql= 'SELECT * FROM element WHERE article = :valeur';
     
        $pdo = connexion();
        $query = $pdo->prepare($sql);
        $query->bindValue(':valeur', $id, PDO::PARAM_INT);
        $query->execute();
        $tableau = $query->fetchAll(PDO::FETCH_CLASS,'Element');
     
        return $tableau;
    }
  }