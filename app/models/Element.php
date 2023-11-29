<?php

// $tags = [
//     'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'div', 'a', 'img', 'ul', 'li', 'ol', 'button'
// ];

class Element {
    // liste des attributs
    public $tags;
    public $content;
    public $alt;
    public $link;
    public $class;
    public $id_article;

    /**
     * permet de récupérer les attributs de l'objet
     *
     * @return array
     */
    public function getAttributes() {
        return get_object_vars($this);
    }

    /**
     * Permet de lire un ou plusieurs éléments
     *
     * @param int $id
     * @return array
     */
    static function read(int $id = null) {
        $pdo = connexion();
        $SqlGenerator = new SqlGenerator($pdo);

        if ($id === null) {
            // Requête pour récupérer tous les éléments
            $elements = $SqlGenerator->select('element');
            return $elements;
        } else {
            // Requête pour sélectionner un élément spécifique
            $element = $SqlGenerator->select('element', '*', 'id = ' . $id);
            return $element;
        }
    }

    /**
     * Permet de créer un élément
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
      $SqlGenerator->insert('element', $data);

      // Récupération de l'id
      $this->id = $pdo->lastInsertId();
    }

    /**
     * Permet de mettre à jour un élément
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
     * Permet de supprimer un élément
     *
     * @param int $id
     * @return void
     */
    static function delete(int $id){
        $pdo = connexion();
        $SqlGenerator = new SqlGenerator($pdo);

        // Appel de la méthode delete de SqlGenerator
        $SqlGenerator->delete('element', 'id = ' . $id);
    }

    /**
     * Permet de mettre à jour un élément
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
            $SqlGenerator->update('element', $data, 'id = ' . $id);
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