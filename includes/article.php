<?php

class Article {
    // liste des attributs
    public $h1;
    public $h2;
    public $auteur;
    public $class;
    private $message_erreur;

    function __construct() {
        // définit un attribut complémentaire (hors base de données)
        $this->message_erreur = 'Erreur dans la class Article';
    }

    function affiche() {
        echo '<article class="'.$this->class.'" ><h1>'.$this->h1.'</h1><h2>'.$this->h2.'</h2></article>';
    }

    static function readAll() {
        // // définition de la requête SQL
        // $sql= 'select * from article';
     
        // $pdo = connexion();
        // $query = $pdo->prepare($sql);
        // $query->execute();
        // $tableau = $query->fetchAll(PDO::FETCH_CLASS,'Article');
        
        // return $tableau;
        // Première requête
        $sql1 = 'select e.* from article AS a, element AS e where a.id_article = e.article ORDER BY e.article;';
        $pdo = connexion();
        $query1 = $pdo->prepare($sql1);
        $query1->bindValue(':valeur', $id, PDO::PARAM_INT);
        $query1->execute();
        $result1 = $query1->fetchAll(PDO::FETCH_CLASS, 'Element');
    
        // Deuxième requête
        $sql2 = 'select * from article where id_article = :valeur';
        $query2 = $pdo->prepare($sql2);
        $query2->bindValue(':valeur', $id, PDO::PARAM_INT);
        $query2->execute();
        $result2 = $query2->fetchObject('Article');
    
        // Retourner les deux résultats sous forme de tableau
        return ['elements' => $result1, 'article' => $result2];
    }

    static function readOne($id){
        // Première requête
        $sql1 = 'select e.* from article AS a, element AS e where a.id_article = :valeur AND e.article = :valeur GROUP BY e.id';
        $pdo = connexion();
        $query1 = $pdo->prepare($sql1);
        $query1->bindValue(':valeur', $id, PDO::PARAM_INT);
        $query1->execute();
        $result1 = $query1->fetchAll(PDO::FETCH_CLASS, 'Element');
    
        // Deuxième requête
        $sql2 = 'select * from article where id_article = :valeur';
        $query2 = $pdo->prepare($sql2);
        $query2->bindValue(':valeur', $id, PDO::PARAM_INT);
        $query2->execute();
        $result2 = $query2->fetchObject('Article');
    
        // Retourner les deux résultats sous forme de tableau
        return ['elements' => $result1, 'article' => $result2];
    }

    function create(){
        #Construction de la requete create
        $sql = 'INSERT INTO article (h1, h2, auteur, class) VALUES (:h1, :h2, :auteur, :class)';
        
        $pdo = connexion();
        $query = $pdo->prepare($sql);
        $query->bindValue(':h1', $this->h1, PDO::PARAM_STR);
        $query->bindValue(':h2', $this->h2, PDO::PARAM_STR);
        $query->bindValue(':auteur', $this->auteur, PDO::PARAM_STR);
        $query->bindValue(':class', $this->class, PDO::PARAM_STR);
        $query->execute();

        #Recuperation de l'id
        $this->id = $pdo->lastInsertId();
    }

    function modifier($h1, $h2, $auteur, $class){
        $this->h1 = $h1;
        $this->h2 = $h2;
        $this->auteur = $auteur;
        $this->class = $class;

        if (empty($this->h1)) $this->h1 = NULL;
        if (empty($this->h2)) $this->h2 = NULL;
        if (empty($this->auteur)) $this->auteur = NULL;
        if (empty($this->class)) $this->class = NULL;
    }

    static function delete($id){
        $sql = 'DELETE FROM article WHERE id = :id';
        $pdo = connexion();
        $query = $pdo->prepare($sql);
        $query->bindValue(':id', $id, PDO::PARAM_INT);
        $query->execute();
    }

    function update() {
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