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
        $sqlController = new SqlController($pdo);

        if ($id === null) {
            // Requête pour récupérer toutes les catégories
            $categories = $sqlController->select('categorie', '*', null, 'id_categorie');

            // Retourner toutes les catégories
            return $categories;
        } else {
            // Première requête pour récupérer la catégorie spécifique
            $category = $sqlController->select('categorie', '*', 'id_categorie = ' . $id);

            // Requête pour récupérer tous les articles de cette catégorie
            $articles = $sqlController->select('article', '*', 'id_categorie = ' . $id, 'id_article');

            // Pour chaque article, récupérer ses éléments
            foreach ($articles as &$article) {
                $elements = $sqlController->select('element', '*', 'article = ' . $article["id_article"], 'article');

                // Ajouter les éléments à l'article
                $article['elements'] = $elements;
            }

            // Retourner les deux résultats sous forme de tableau
            return ['category' => $category, 'articles' => $articles];
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