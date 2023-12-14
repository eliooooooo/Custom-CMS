<?php

class Article {
    // liste des attributs
    public $name;
    public $catchphrase;
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
     * @param $id
     * @return array
     */
    static function read($id = null) {
        $pdo = connexion();
        $SqlGenerator = new SqlGenerator($pdo);

        if ($id === null) {
            // Requête pour récupérer tous les articles
            $articles = $SqlGenerator->select('article');

            // Pour chaque article, récupérer ses blocs
            foreach ($articles as &$article) {
                $blocks = $SqlGenerator->select('block', '*', 'id_article = ' . $article["id"]);

                // Pour chaque block, récupérer ses éléments
                foreach ($blocks as &$block) {
                    $elements = $SqlGenerator->select('element', '*', 'id_block = ' . $block["id"]);

                    // Trier les éléments par ordre_elmt
                    usort($elements, function($a, $b) {
                        return $a['order_elmt'] <=> $b['order_elmt'];
                    });

                    $block['elements'] = $elements;
                }

                // Trier les blocs par order_elmt
                usort($blocks, function($a, $b) {
                    return $a['order_elmt'] - $b['order_elmt'];
                });

                // Ajouter les blocs à l'article
                $article['blocks'] = $blocks;
            }

            // Retourner les articles avec leurs blocs
            return ['articles' => $articles];
        } else {
            // Requête pour récupérer l'article spécifique
            $article = $SqlGenerator->select('article', '*', 'id = ' . $id);

            // Vérifier si l'article existe
            if (count($article) > 0) {
                $blocks = $SqlGenerator->select('block', '*', 'id_article = ' . $id);

                // Pour chaque block, récupérer ses éléments
                foreach ($blocks as &$block) {
                    if (isset($block["id"])) {
                        $elements = $SqlGenerator->select('element', '*', 'id_block = ' . $block["id"]);

                        // Trier les éléments par ordre_elmt
                        usort($elements, function($a, $b) {
                            return $a['order_elmt'] - $b['order_elmt'];
                        });

                        $block['elements'] = $elements;
                    }
                }

                // Trier les blocs par order_elmt
                usort($blocks, function($a, $b) {
                    return $a['order_elmt'] - $b['order_elmt'];
                });

                // Ajouter les blocs à l'article
                $article[0]['blocks'] = $blocks;
            }

            // Retourner l'article avec ses blocs
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