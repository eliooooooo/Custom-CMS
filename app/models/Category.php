<?php 

class Category {
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

    static function read($id = null) {
        $pdo = connexion();

        if ($id === null) {
            // Requête pour récupérer toutes les catégories
            $sql = 'SELECT * FROM categorie ORDER BY id_categorie';
            $query = $pdo->prepare($sql);
            $query->execute();
            $category = $query->fetchAll(PDO::FETCH_ASSOC);

            // Retourner toutes les catégories
            return $category;
        } else {
            // Première requête
            $sql = 'SELECT * FROM categorie WHERE id_categorie = :valeur';
            $query = $pdo->prepare($sql);
            $query->bindValue(':valeur', $id, PDO::PARAM_INT);
            $query->execute();
            $category = $query->fetchObject('Category');
        
            // Requête pour récupérer tous les articles
            $sql = 'SELECT * FROM article WHERE id_categorie = :valeur ORDER BY id_article';
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
            return ['category' => $category, 'article' => $articles];
        }
    }

    function create(){
        $sql = 'INSERT INTO categorie (nom, description, image) VALUES (:nom, :description, :image)';
        $pdo = connexion();
        $query = $pdo->prepare($sql);
        $query->bindValue(':nom', $this->nom, PDO::PARAM_STR);
        $query->bindValue(':description', $this->description, PDO::PARAM_STR);
        $query->bindValue(':image', $this->image, PDO::PARAM_STR);
        $query->execute();
        $this->id_category = $pdo->lastInsertId();
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
        $params = [':id' => $this->id_category];

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