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
        $SqlGenerator = new SqlGenerator($pdo);

        // Appel de la méthode delete de SqlGenerator
        $SqlGenerator->delete('element', 'id = ' . $id);
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
            $SqlGenerator->update('element', $data, 'id = ' . $id);
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