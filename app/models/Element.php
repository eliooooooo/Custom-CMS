<?php

class Element {
    // liste des attributs
    public $balise;
    public $contenu;
    public $alt;
    public $src;
    public $class;

    function __construct() {
    }

    function affiche() {
        if ($this->balise == 'img') {
            echo '<img src="'.$this->src.'" alt="'.$this->alt.'" class="'.$this->class.'">';
        } else {
            echo '<'.$this->balise.' class="'.$this->class.'" >'.$this->contenu.'</'.$this->balise.'>';
        }
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
            'balise' => $this->balise,
            'contenu' => $this->contenu,
            'alt' => $this->alt,
            'src' => $this->src,
            'class' => $this->class
        ];

        // Appel de la méthode insert de SqlController
        $sqlController->insert('element', $data);

        // Récupération de l'id
        $this->id = $pdo->lastInsertId();
    }

    function modifier($balise, $contenu, $alt, $src, $class){
        $this->balise = $balise;
        $this->contenu = $contenu;
        $this->alt = $alt;
        $this->src = $src;
        $this->class = $class;

        if (empty($this->contenu)) $this->contenu = NULL;
        if (empty($this->alt)) $this->alt = NULL;
        if (empty($this->src)) $this->src = NULL;
        if (empty($this->class)) $this->class = NULL;
    }

    static function delete($id){
        $pdo = connexion();
        $sqlController = new SqlController($pdo);

        // Appel de la méthode delete de SqlController
        $sqlController->delete('element', 'id = ' . $id);
    }

    function update() {
        $pdo = connexion();
        $sqlController = new SqlController($pdo);

        // Construction du tableau de données
        $data = [];

        if ($this->balise !== null) {
            $data['balise'] = $this->balise;
        }

        if ($this->contenu !== null) {
            $data['contenu'] = $this->contenu;
        }

        if ($this->alt !== null) {
            $data['alt'] = $this->alt;
        }

        if ($this->src !== null) {
            $data['src'] = $this->src;
        }

        if ($this->class !== null) {
            $data['class'] = $this->class;
        }

        if (!empty($data)) {
            // Appel de la méthode update de SqlController
            $sqlController->update('element', $data, 'id = ' . $this->id);
        }
    }

    function chargePOST(){
        if (isset($_POST['balise'])) {
            $this->balise = $_POST['balise'];
        } else {
            $this->balise = NULL;
        }
        if (isset($_POST['contenu'])) {
            $this->contenu = $_POST['contenu'];
        } else {
            $this->contenu = NULL;
        }
        if (isset($_POST['alt'])) {
            $this->alt = $_POST['alt'];
        } else {
            $this->alt = NULL;
        }
        if (isset($_POST['src'])) {
            $this->src = $_POST['src'];
        } else {
            $this->src = NULL;
        }
        if (isset($_POST['class'])) {
            $this->class = $_POST['class'];
        } else {
            $this->class = NULL;
        }
    }
  }