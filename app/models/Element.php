<?php

// $tags = [
//     'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'div', 'a', 'img', 'ul', 'li', 'ol', 'table', 'tr', 'td', 'th', 'thead', 'tbody', 'tfoot', 'button'
// ];

class Element {
    // liste des attributs
    public $tags;
    public $content;
    public $alt;
    public $link;
    public $class;
    public $id_article;

    public function getAttributes() {
        return get_object_vars($this);
    }

    static function read($id = null) {
        $pdo = connexion();
        $sqlController = new SqlController($pdo);

        if ($id === null) {
            // Requête pour récupérer tous les éléments
            $elements = $sqlController->select('element');
            return $elements;
        } else {
            // Requête pour sélectionner un élément spécifique
            $element = $sqlController->select('element', '*', 'id = ' . $id);
            return $element;
        }
    }

    function create(){
        $pdo = connexion();
        $sqlController = new SqlController($pdo);

        // Construction du tableau de données
        $data = [
            'tags' => $this->tags,
            'content' => $this->content,
            'alt' => $this->alt,
            'link' => $this->link,
            'class' => $this->class,
            'id_article' => $this->id_article
        ];

        // Appel de la méthode insert de SqlController
        $sqlController->insert('element', $data);

        // Récupération de l'id
        $this->id = $pdo->lastInsertId();
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

    static function delete($id){
        $pdo = connexion();
        $sqlController = new SqlController($pdo);

        // Appel de la méthode delete de SqlController
        $sqlController->delete('element', 'id = ' . $id);
    }

    function update($id) {
        if ($id === null) {
            throw new Exception('Erreur : l\'ID est null.');
        }

        $pdo = connexion();
        $sqlController = new SqlController($pdo);

        // Construction du tableau de données
        $data = [];
        $attributes = $this->getAttributes();
        
        foreach ($attributes as $key => $value) {
            if ($value !== null) {
                $data[$key] = $value;
            }
        }

        if (!empty($data)) {
            // Appel de la méthode update de SqlController
            $sqlController->update('element', $data, 'id = ' . $id);
        }
    }

    function chargePOST(){
        if (isset($_POST['tags'])) {
            $this->tags = $_POST['tags'];
        } else {
            $this->tags = NULL;
        }
        if (isset($_POST['content'])) {
            $this->content = $_POST['content'];
        } else {
            $this->content = NULL;
        }
        if (isset($_POST['alt'])) {
            $this->alt = $_POST['alt'];
        } else {
            $this->alt = NULL;
        }
        if (isset($_POST['link'])) {
            $this->link = $_POST['link'];
        } else {
            $this->link = NULL;
        }
        if (isset($_POST['class'])) {
            $this->class = $_POST['class'];
        } else {
            $this->class = NULL;
        }
        if (isset($_POST['id_article'])) {
            $this->id_article = $_POST['id_article'];
        } else {
            $this->id_article = NULL;
        }
    }
  }