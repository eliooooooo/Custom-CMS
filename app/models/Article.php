<?php

class Article {
    // liste des attributs
    public $title;
    public $subtitle;
    public $author;
    public $class;


    /**
     * Permet de récupérer les attributs de l'objet
     *
     * @return array
     */
    public function getAttributes() {
        return get_object_vars($this);
    }

    /**
     * Permet de lire un ou plusieurs articles
     *
     * @param int $id
     * @return array
     */
    static function read(int $id = null) {
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
        return ['articles' => $articles];
      } else {
        // Requête pour sélectionner un article
        $elements = $SqlGenerator->select('element', '*', 'id_article = ' . $id);
        $article = $SqlGenerator->select('article', '*', 'id = ' . $id);

        // Ajouter les éléments à l'article
        $article[0]['elements'] = $elements;

        // Retourner les deux résultats sous forme de tableau
        return ['articles' => $article];
      }
    }

    /**
     * Permet de créer un article
     *
     * @return void
     */
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

    /**
     * Permet de mettre à jour un article
     *
     * @param array $attributes
     * @return void
     */
    function setAttributes(array $attributes) {
        foreach ($attributes as $key => $value) {
            if (property_exists($this, $key)) {
                $this->$key = $value;
                if (empty($this->$key)) {
                    $this->$key = NULL;
                }
            }
        }
    }

    /**
     * Permet de supprimer un article
     *
     * @param int $id
     * @return void
     */
    static function delete(int $id){
        $pdo = connexion();
        $SqlGenerator = new SqlGenerator($pdo);

        // Appel de la méthode delete de SqlGenerator
        $SqlGenerator->delete('article', 'id = ' . $id);
    }

    /**
     * Permet de mettre à jour un article
     *
     * @param int $id
     * @return void
     */
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

    /**
     * Permet de charger les attributs de l'objet avec les données du formulaire
     *
     * @return void
     */
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