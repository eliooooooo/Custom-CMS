<?php 

class Category {
    // liste des attributs
    public $id;
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
            $categories = $sqlController->select('category', '*');

            // Retourner toutes les catégories
            return $categories;
        } else {
            // Première requête pour récupérer la catégorie spécifique
            $category = $sqlController->select('category', '*', 'id = ' . $id);

            // Requête pour récupérer tous les articles de cette catégorie
            $articles = $sqlController->select('article', '*', 'id_category = ' . $id);

            // Pour chaque article, récupérer ses éléments
            foreach ($articles as &$article) {
                $elements = $sqlController->select('element', '*', 'id_article = ' . $article["id"]);

                // Ajouter les éléments à l'article
                $article['elements'] = $elements;
            }

            // Retourner les deux résultats sous forme de tableau
            return ['category' => $category, 'articles' => $articles];
        }
    }

    function create(){
        $pdo = connexion();
        $sqlController = new SqlController($pdo);

        // Construction du tableau de données
        $data = [
            'nom' => $this->nom,
            'description' => $this->description,
            'image' => $this->image
        ];

        // Appel de la méthode insert de SqlController
        $sqlController->insert('category', $data);

        // Récupération de l'id
        $this->id = $pdo->lastInsertId();
    }

    function modifier($nom, $description, $image){
        $this->nom = $nom;
        $this->description = $description;
        $this->image = $image;

        if (empty($this->description)) $this->description = NULL;
        if (empty($this->image)) $this->image = NULL;        
    }

    static function delete($id){
        $pdo = connexion();
        $sqlController = new SqlController($pdo);

        // Appel de la méthode delete de SqlController
        $sqlController->delete('category', 'id = ' . $id);
    }

    function update() {
        $pdo = connexion();
        $sqlController = new SqlController($pdo);

        // Construction du tableau de données
        $data = [];

        if ($this->nom !== null) {
            $data['nom'] = $this->nom;
        }

        if ($this->description !== null) {
            $data['description'] = $this->description;
        }

        if ($this->image !== null) {
            $data['image'] = $this->image;
        }

        if (!empty($data)) {
            // Appel de la méthode update de SqlController
            $sqlController->update('category', $data, 'id = ' . $this->id);
        }
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