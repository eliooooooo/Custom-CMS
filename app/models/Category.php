<?php 

class Category {
    // liste des attributs
    public $name;
    public $description;
    public $class;
    public $files;
    public $order_cat;

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
      $categories = [];

      if ($id === null) {
        // Requête pour récupérer toutes les catégories
        $categories = $SqlGenerator->select('category', '*');

        // Trier les catégories par ordre_cat
        usort($categories, function($a, $b) {
            return $a['order_cat'] - $b['order_cat'];
        });

        } else {
            // Requête pour récupérer la catégorie spécifique
            $category = $SqlGenerator->select('category', '*', 'id = ' . $id);
            if ($category && count($category) > 0) {
                $categories[] = $category[0]; // Accéder au premier élément du tableau
            }
        }

      // Pour chaque catégorie, récupérer ses articles
      foreach ($categories as &$category) {
        if (isset($category["id"])) {
          $articles = $SqlGenerator->select('article', '*', 'id_category = ' . $category["id"]);
          
          usort($articles, function($a, $b) {
            return $a['ordre_article'] - $b['ordre_article'];
        });
          
        $category['articles'] = [];

            // Pour chaque article, récupérer ses éléments et ses blocks
            foreach ($articles as &$article) {
                $elements = $SqlGenerator->select('element', '*', 'id_article = ' . $article["id"]);
                $blocks = $SqlGenerator->select('block', '*', 'id_article = ' . $article["id"]);
                $items = array();

                // Pour chaque block, récupérer ses éléments
                foreach ($blocks as &$block) {
                    $blockElements = $SqlGenerator->select('element', '*', 'id_block = ' . $block["id"]);
                    $block['elements'] = $blockElements;
                    $blockItem = array();
                    $blockItem['block'] = $block;
                    array_push($items, $blockItem);
                }

                foreach ($elements as &$element) {
                    $elementItem = array();
                    $elementItem['element'] = $element;
                    array_push($items, $elementItem);
                }

                // Ajouter les éléments et les blocks à l'article
                $article['items'] = $items;
                array_push($category['articles'], $article);
            }
        }
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
}