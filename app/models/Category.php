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
        $SqlGenerator = new SqlGenerator($pdo);

        if ($id === null) {
            // Requête pour récupérer toutes les catégories
            $categories = $SqlGenerator->select('category', '*');

            // Retourner toutes les catégories
            return $categories;
        } else {
            // Première requête pour récupérer la catégorie spécifique
            $category = $SqlGenerator->select('category', '*', 'id = ' . $id);

            // Requête pour récupérer tous les articles de cette catégorie
            $articles = $SqlGenerator->select('article', '*', 'id_category = ' . $id);

            // Pour chaque article, récupérer ses éléments
            foreach ($articles as &$article) {
                $elements = $SqlGenerator->select('element', '*', 'id_article = ' . $article["id"]);

                // Ajouter les éléments à l'article
                $article['elements'] = $elements;
            }

            // Retourner les deux résultats sous forme de tableau
            return ['category' => $category, 'articles' => $articles];
        }
    }

    function create(){
        $pdo = connexion();
        $SqlGenerator = new SqlGenerator($pdo);

        // Construction du tableau de données
        $data = [];
        foreach ($this->getAttributes() as $key => $value) {
            if (!empty($value)) {
                $data[$key] = $value;
            }
        }

        // Appel de la méthode insert de SqlGenerator
        $SqlGenerator->insert('category', $data);

        // Récupération de l'id
        $this->id = $pdo->lastInsertId();
    }

    static function delete($id){
        $pdo = connexion();
        $SqlGenerator = new SqlGenerator($pdo);

        // Appel de la méthode delete de SqlGenerator
        $SqlGenerator->delete('category', 'id = ' . $id);
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
        $SqlGenerator = new SqlGenerator($pdo);

        // Construction du tableau de données
        $data = [];
        $attributes = $this->getAttributes();
        
        foreach ($attributes as $key => $value) {
            if ($value !== null) {
                $data[$key] = $value;
            }
        }

        if (!empty($data)) {
            // Appel de la méthode update de SqlGenerator
            $SqlGenerator->update('category', $data, 'id = ' . $id);
        }
    }

    function chargePOST() {
        $attributes = getAttributes();

        foreach ($attributes as $attribute) {
            if (isset($_POST[$attribute])) {
                $this->$attribute = $_POST[$attribute];
            } else {
                $this->$attribute = NULL;
            }
        }
    }
}