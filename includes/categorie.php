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
        // Requête pour récupérer une catégorie
        $sql = 'SELECT * FROM categorie WHERE id_categorie = :valeur';
        $pdo = connexion();
        $query = $pdo->prepare($sql);
        $query->bindValue(':valeur', $id, PDO::PARAM_INT);
        $query->execute();
        $result = $query->fetchObject('Categorie');
    
        // Requête pour récupérer tous les articles de la catégorie
        $sql = 'SELECT * FROM article WHERE id_categorie = :valeur ORDER BY id_article';
        $pdo = connexion();
        $query = $pdo->prepare($sql);
        $query->bindValue(':valeur', $id, PDO::PARAM_INT);
        $query->execute();
        $articles = $query->fetchAll(PDO::FETCH_CLASS, 'Article');

        // Pour chaque article, récupérer ses éléments
        foreach ($articles as $article) {
            $sql = 'SELECT e.* FROM element AS e WHERE e.article = :articleId ORDER BY e.article';
            $query = $pdo->prepare($sql);
            $query->execute([':articleId' => $article->id_article]);
            $elements = $query->fetchAll(PDO::FETCH_CLASS, 'Element');

            // Ajouter les éléments à l'article
            $article->elements = $elements;
        }
    
        // Retourner les deux résultats sous forme de tableau
        return ['categorie' => $result, 'article' => $articles];
    }

    static function readAll() {
      // Requête pour récupérer toutes les catégories
      $sql = 'SELECT * FROM categorie ORDER BY id_categorie';
      $pdo = connexion();
      $query = $pdo->prepare($sql);
      $query->execute();
      $categories = $query->fetchAll(PDO::FETCH_ASSOC);

      // Retourner toutes les catégories
      return $categories;
    }

    function create(){
        // Requête pour créer une catégorie
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
        // Requête pour modifier une catégorie
        $this->nom = $nom;
        $this->description = $description;
        $this->image = $image;

        if (empty($this->description)) $this->description = NULL;
        if (empty($this->image)) $this->image = NULL;        
    }

    static function delete($id){
        // Requête pour supprimer une catégorie
        $sql = 'DELETE FROM categorie WHERE id_categorie = :id';
        $pdo = connexion();
        $query = $pdo->prepare($sql);
        $query->bindValue(':id', $id, PDO::PARAM_INT);
        $query->execute();
    }

    function update() {
        // Requête pour modifier une catégorie
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
        // Charge les attributs à partir des données POST
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