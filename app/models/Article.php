<?php


class Article {
    // liste des attributs
    public $title;
    public $subtitle;
    public $author;
    public $class;


    public function getAttributes() {
        return get_object_vars($this);
    }

    static function read($id = null) {
        $pdo = connexion();
        $SqlGenerator = new SqlGenerator($pdo);

        if ($id === null) {
            // Requête pour récupérer tous les articles
            $articles = $SqlGenerator->select('article');

            // Pour chaque article, récupérer ses éléments
            foreach ($articles as &$article) {
                $elements = $SqlGenerator->select('element', '*', 'id_article = ' . $article["id"]);

                // Ajouter les éléments à l'article
                $article['elements'] = $elements;
            }

            // Retourner les articles avec leurs éléments
            return $articles;
        } else {
            // Requête pour sélectionner un article
            $elements = $SqlGenerator->select('element', '*', 'id_article = ' . $id);
            $article = $SqlGenerator->select('article', '*', 'id = ' . $id);

            // Retourner les deux résultats sous forme de tableau
            return ['elements' => $elements, 'article' => $article];
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
        $SqlGenerator->insert('article', $data);

        // Récupération de l'id
        $this->id = $pdo->lastInsertId();
    }

    function setAttributes($attributes) {
        /**
         * Appel de la fonction exemple :
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

    static function delete($id){
        $pdo = connexion();
        $SqlGenerator = new SqlGenerator($pdo);

        // Appel de la méthode delete de SqlGenerator
        $SqlGenerator->delete('article', 'id = ' . $id);
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
            $SqlGenerator->update('article', $data, 'id = ' . $id);
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