<?php 

class Category {
    // liste des attributs
    public $name;
    public $description;
    public $class;
    public $image;

    /**
     * Permet de récupérer les attributs de l'objet
     *
     * @return array
     */
    public function getAttributes() {
        return get_object_vars($this);
    }

    /**
     * Permet de lire une ou plusieurs catégories
     *
     * @param int $id
     * @return array
     */
    static function read(int $id = null) {
      $pdo = connexion();
      $SqlGenerator = new SqlGenerator($pdo);

      if ($id === null) {
        // Requête pour récupérer toutes les catégories
        $categories = $SqlGenerator->select('category', '*');
      } else {
        // Requête pour récupérer la catégorie spécifique
        $categories = $SqlGenerator->select('category', '*', 'id = ' . $id);
      }

      // Pour chaque catégorie, récupérer ses articles
      foreach ($categories as &$category) {
        $articles = $SqlGenerator->select('article', '*', 'id_category = ' . $category["id"]);

        // Pour chaque article, récupérer ses éléments
        foreach ($articles as &$article) {
          $elements = $SqlGenerator->select('element', '*', 'id_article = ' . $article["id"]);

          // Ajouter les éléments à l'article
          $article['elements'] = $elements;
        }

        // Ajouter les articles à la catégorie
        $category['articles'] = $articles;
      }

      // Retourner les catégories avec leurs articles
      return ['category' => $categories];
    }

    /**
     * Permet de créer une catégorie
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
        $SqlGenerator->insert('category', $data);

        // Récupération de l'id
        $this->id = $pdo->lastInsertId();
    }

    /**
     * Permet de supprimer une catégorie
     *
     * @param int $id
     * @return void
     */
    static function delete(int $id){
        $pdo = connexion();
        $SqlGenerator = new SqlGenerator($pdo);

        // Appel de la méthode delete de SqlGenerator
        $SqlGenerator->delete('category', 'id = ' . $id);
    }

    /**
     * Permet de mettre à jour une catégorie
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
     * Permet de mettre à jour une catégorie
     *
     * @param int $id
     * @return void
     */
    function update(int $id) {
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