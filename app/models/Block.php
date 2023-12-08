<?php

class Block {
    // liste des attributs
    public $name;
    public $class;
    public $order_elmt;
    public $id_article;


    /**
     * Permet de récupérer les attributs de l'objet
     *
     * @return array
     */
    public function getAttributes() {
        return get_object_vars($this);
    }

    /**
     * Permet de lire un ou plusieurs block
     *
     * @param int $id
     * @return array
     */
    static function read(int $id = null) {
      $pdo = connexion();
      $SqlGenerator = new SqlGenerator($pdo);

      if ($id === null) {
        // Requête pour récupérer tous les block
        $block = $SqlGenerator->select('block');

        // Pour chaque block, récupérer ses éléments
        foreach ($block as &$block) {
          $elements = $SqlGenerator->select('element', '*', 'id_block = ' . $block["id"]);

          // Ajouter les éléments au block
          $block['elements'] = $elements;
        }

        // Retourner les blocks avec leurs éléments
        return ['block' => $block];
      } else {
        // Requête pour sélectionner un block
        $elements = $SqlGenerator->select('element', '*', 'id_block = ' . $id);
        $block = $SqlGenerator->select('block', '*', 'id = ' . $id);

        // Ajouter les éléments à l'block
        $block[0]['elements'] = $elements;

        // Retourner les deux résultats sous forme de tableau
        return ['blocks' => $block];
      }
    }

    /**
     * Permet de créer un block
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
        $SqlGenerator->insert('block', $data);

        // Récupération de l'id
        $this->id = $pdo->lastInsertId();
    }

    /**
     * Permet de mettre à jour un block
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
     * Permet de supprimer un block
     *
     * @param int $id
     * @return void
     */
    static function delete(int $id){
        $pdo = connexion();
        $SqlGenerator = new SqlGenerator($pdo);

        // Appel de la méthode delete de SqlGenerator
        $SqlGenerator->delete('block', 'id = ' . $id);
    }

    /**
     * Permet de mettre à jour un block
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
            $SqlGenerator->update('block', $data, 'id = ' . $id);
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