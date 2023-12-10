<?php

class Article {
    // liste des attributs
    public $title;
    public $subtitle;
    public $author;
    public $class;
    public $ordre_article;
    public $id_category;


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
        $items = [];

        if ($id === null) {
            // Requête pour récupérer tous les articles
            $articles = $SqlGenerator->select('article');

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

                usort($items, function($a, $b) {
                    $orderA = isset($a['block']) ? $a['block']['order_elmt'] : $a['element']['order_elmt'];
                    $orderB = isset($b['block']) ? $b['block']['order_elmt'] : $b['element']['order_elmt'];
                    return $orderA - $orderB;
                });

                // Ajouter les éléments et les blocks à l'article
                $article['items'] = $items;
            }

            // Retourner les articles avec leurs éléments et leurs blocks
            return ['articles' => $articles];
        } else {
            $elements = $SqlGenerator->select('element', '*', 'id_article = ' . $id);
            $blocks = $SqlGenerator->select('block', '*', 'id_article = ' . $id);
            $article = $SqlGenerator->select('article', '*', 'id = ' . $id);
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

            usort($items, function($a, $b) {
                $orderA = isset($a['block']) ? $a['block']['order_elmt'] : $a['element']['order_elmt'];
                $orderB = isset($b['block']) ? $b['block']['order_elmt'] : $b['element']['order_elmt'];
                return $orderA - $orderB;
            });

            // Ajouter les éléments et les blocks à l'article
            $article[0]['items'] = $items;
            // Retourner les deux résultats sous forme de tableau
            return ['article' => $article];
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
  }