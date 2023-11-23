<?php

// Définition des régions existantes
// Créer une table dédiée dans la base de donnée ? Pour modifier les élémets au besoin (par le formulaire checkbox)
$regions = [
    'header' => true,
    'primary_menu' => false,
    'secondary_menu' => false,
    'aside_left' => false,
    'aside_right' => false,
    'breadcrumb' => false,
    'top_page' => false,
    'bottom_page' => [
        'bottom_page_first' => false,
        'bottom_page_second' => false,
        'bottom_page_third' => false,
    ],
    'footer' => [
        'footer_first' => true,
        'footer_second' => false,
        'footer_third' => false,
        'footer_fourth' => false,
    ],
];

class Region {
  // liste des attributs
  public $nom_region;
  public $affichage;

  function __construct() {
  }

  function affiche() {
  }

  static function readAll() {
      // Requête pour récupérer toutes les regions
      $sql = 'SELECT * FROM regions ORDER BY id_region';
      $pdo = connexion();
      $query = $pdo->prepare($sql);
      $query->execute();
      $regions = $query->fetchAll(PDO::FETCH_CLASS, 'Region');

      // Retourner les regions
      return $regions;
  }

  static function readOne($id){
      // Requête pour sélectionner une seule région
      $sql = 'SELECT * FROM regions WHERE id_region = :valeur';
      $pdo = connexion();
      $query = $pdo->prepare($sql);
      $query->bindValue(':valeur', $id, PDO::PARAM_INT);
      $query->execute();
      $region = $query->fetchobject(PDO::FETCH_CLASS, 'Region');
  
      // Retourner la région
      return $region;
  }

  function create(){
      // Requête pour créer une nouvelle région
      $sql = 'INSERT INTO regions (nom_region, affichage) VALUES (:nom_region, :affichage)';
      
      $pdo = connexion();
      $query = $pdo->prepare($sql);
      $query->bindValue(':nom_region', $this->nom_region, PDO::PARAM_STR);
      $query->bindValue(':affichage', $this->affichage, PDO::PARAM_STR);
      $query->execute();

      // Récupération de l'ID de la nouvelle région
      $this->id = $pdo->lastInsertId();
  }

  function modifier($nom_region, $affichage){
      // Modifier les valaurs de la région
      $this->nom_region = $nom_region;
      $this->affichage = $affichage;

      if (empty($this->affichage)) $this->affichage = 0;
  }

  static function delete($id){
      // Requete pour supprimer une région
      $sql = 'DELETE FROM regions WHERE id = :id';
      $pdo = connexion();
      $query = $pdo->prepare($sql);
      $query->bindValue(':id', $id, PDO::PARAM_INT);
      $query->execute();
  }

  function update() {
      // Mettre à jour les valeurs de la region
      $fields = [];
      $params = [':id' => $this->id];

      if ($this->nom_region !== null) {
          $fields[] = 'nom_region = :nom_region';
          $params[':nom_region'] = $this->nom_region;
      }

      if ($this->affichage !== null) {
          $fields[] = 'affichage = :affichage';
          $params[':affichage'] = $this->affichage;
      }

      if (!empty($fields)) {
          $sql = sprintf(
              'UPDATE regions SET %s WHERE id = :id',
              implode(', ', $fields)
          );

          $pdo = connexion();
          $query = $pdo->prepare($sql);

          foreach ($params as $key => $value) {
              $query->bindValue($key, $value);
          }

          $query->execute();
      }
  }

  function chargePOST(){
      // Charger les données d'un formulaire POST
      if (isset($_POST['nom_region'])) {
          $this->nom_region = $_POST['nom_region'];
      } else {
          $this->nom_region = NULL;
      }
      if (isset($_POST['affichage'])) {
          $this->affichage = $_POST['affichage'];
      } else {
          $this->affichage = NULL;
      }
  }
}