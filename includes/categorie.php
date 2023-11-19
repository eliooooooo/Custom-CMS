<?php 

class Categorie {
    // liste des attributs
    public $id_categorie;
    public $nom;
    public $description;
    public $image;

    function __construct() {
    }

    function affiche() {
        echo '<article class="'.$this->class.'" ><h1>'.$this->h1.'</h1><h2>'.$this->h2.'</h2></article>';
    }

    static function readOne($id){
        // Première requête
        $sql1 = 'SELECT * FROM categorie WHERE id_categorie = :valeur';
        $pdo = connexion();
        $query1 = $pdo->prepare($sql1);
        $query1->bindValue(':valeur', $id, PDO::PARAM_INT);
        $query1->execute();
        $result1 = $query1->fetchAll(PDO::FETCH_CLASS, 'Categorie');
    
        // Deuxième requête
        $sql2 = 'SELECT * FROM article WHERE id_categorie = :valeur';
        $query2 = $pdo->prepare($sql2);
        $query2->bindValue(':valeur', $id, PDO::PARAM_INT);
        $query2->execute();
        $result2 = $query2->fetchObject('Article');
    
        // Retourner les deux résultats sous forme de tableau
        return ['categorie' => $result1, 'article' => $result2];
    }

    static function readAll() {
        // Requête pour récupérer toutes les catégories
        $sql = 'SELECT * FROM categorie ORDER BY id_categorie';
        $pdo = connexion();
        $query = $pdo->prepare($sql);
        $query->execute();
        $categorie = $query->fetchAll(PDO::FETCH_CLASS, 'Categorie');

        // Pour chaque article, récupérer ses éléments
        foreach ($categorie as $categorie) {
            $sql = 'SELECT a.* FROM article AS a WHERE a.id_categorie = :cat ORDER BY a.id_article';
            $query = $pdo->prepare($sql);
            $query->execute([':cat' => $categorie->id_categorie]);
            $article = $query->fetchAll(PDO::FETCH_CLASS, 'Article');

            // Ajouter les éléments à l'article
            $categorie->article = $article;
        }

        // Retourner les articles avec leurs éléments
        return $categorie;
    }

    function create(){
        $sql = 'INSERT INTO categorie (nom, description, image) VALUES (:nom, :description, :image)';
        $pdo = connexion();
        $query = $pdo->prepare($sql);
        $query->bindValue(':nom', $this->nom, PDO::PARAM_STR);
        $query->bindValue(':description', $this->description, PDO::PARAM_STR);
        $query->bindValue(':image', $this->image, PDO::PARAM_STR);
        $query->execute();
        $this->id_categorie = $pdo->lastInsertId();
    }

    function modifier($nom, $description, $image){
        $this->nom = $nom;
        $this->description = $description;
        $this->image = $image;

        if (empty($this->description)) $this->description = NULL;
        if (empty($this->image)) $this->image = NULL;        
    }

    static function delete($id){
        $sql = 'DELETE FROM categorie WHERE id_categorie = :id';
        $pdo = connexion();
        $query = $pdo->prepare($sql);
        $query->bindValue(':id', $id, PDO::PARAM_INT);
        $query->execute();
    }

    function update() {
        $fields = [];
        $params = [':id' => $this->id_categorie];

        if ($this->nom !== null) {
            $fields[] = 'nom = :nom';
            $params[':nom'] = $this->nom;
        }
        if ($this->description !== null) {
            $fields[] = 'description = :description';
            $params[':description'] = $this->description;
        }
        if ($this->image !== null) {
            $fields[] = 'image = :image';
            $params[':image'] = $this->image;
        }

        $sql = 'UPDATE categorie SET '.implode(', ', $fields).' WHERE id_categorie = :id';
        $pdo = connexion();
        $query = $pdo->prepare($sql);
        $query->execute($params);
    }

    function chargePOST(){
        if (isset($_POST['nom'])) {
            $this->nom = $_POST['nom'];
        } else {
            $this->nom = NULL;
        }
        if (isset($_POST['description'])) {
            $this->description = $_POST['description'];
        } else {
            $this->description = NULL;
        }
        if (isset($_POST['image'])) {
            $this->image = $_POST['image'];
        } else {
            $this->image = NULL;
        }
    }
}