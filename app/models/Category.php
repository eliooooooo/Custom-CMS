<?php 

class Category {
    // liste des attributs
    public $name;
    public $description;
    public $image;

    public function getAttributes() {
        return get_object_vars($this);
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
        $data = [];
        foreach ($this->getAttributes() as $key => $value) {
            if (!empty($value)) {
                $data[$key] = $value;
            }
        }

        // Appel de la méthode insert de SqlController
        $sqlController->insert('category', $data);

        // Récupération de l'id
        $this->id = $pdo->lastInsertId();
    }

    static function delete($id){
        $pdo = connexion();
        $sqlController = new SqlController($pdo);

        // Appel de la méthode delete de SqlController
        $sqlController->delete('category', 'id = ' . $id);
    }

    function setAttributes($attributes) {
        /**
         * Appel de la fonction :
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
            $sqlController->update('category', $data, 'id = ' . $id);
        }
    }

    function chargePOST(){
        if (isset($_POST['name'])) {
            $this->name = $_POST['name'];
        } else {
            $this->name = NULL;
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