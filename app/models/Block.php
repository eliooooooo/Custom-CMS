<?php

class Block {
    // liste des attributs
    public $name;
    public $type;
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

    public static function gettype() {
        $type = ['full', '2-columns', '3-columns', 'galerie-image', 'swiper1', 'swiper2', 'swiper-audio'];
        return $type;
    }

    /**
     * Permet de lire un ou plusieurs block
     *
     * @param $id
     * @return array
     */
    static function read($id = null) {
        $pdo = connexion();
        $SqlGenerator = new SqlGenerator($pdo);

        if ($id === null) {
            // Requête pour récupérer tous les block
            $block = $SqlGenerator->select('block');

            // Pour chaque block, récupérer ses éléments
            foreach ($block as &$singleBlock) {
                $elements = $SqlGenerator->select('element', '*', 'id_block = ' . $singleBlock["id"]);

                // Trier les éléments par ordre_elmt
                usort($elements, function($a, $b) {
                    return $a['order_elmt'] = $b['order_elmt'];
                });

                // Ajouter les éléments au block
                $singleBlock['elements'] = $elements;
            }

            // Retourner les blocks avec leurs éléments
            return ['block' => $block];
        } else {
            // Requête pour sélectionner un block
            $elements = $SqlGenerator->select('element', '*', 'id_block = ' . $id);
            $block = $SqlGenerator->select('block', '*', 'id = ' . $id);

            // Trier les éléments par ordre_elmt
            usort($elements, function($a, $b) {
                return $a['ordre_elmt'] = $b['ordre_elmt'];
            });

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
     * @param $attributes
     * @return void
     */
    function setAttributes($attributes) {
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
     * @param $id
     * @return void
     */
    static function delete($id){
        $pdo = connexion();
        $SqlGenerator = new SqlGenerator($pdo);

        // Appel de la méthode delete de SqlGenerator
        $SqlGenerator->delete('block', 'id = ' . $id);
    }

    /**
     * Permet de mettre à jour un block
     *
     * @param $id
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
  }