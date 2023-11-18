<?php

// Empeche les injections de code sur les chaines de caractere
function post_string($nom) {
  $valeur = '';                          // on initialise avec une chaine vide
  if (isset($_POST[$nom])) {             // si la variable POST est définie
    $valeur = $_POST[$nom];              // on récupère sa valeur
    $valeur = strip_tags($valeur);       // on supprime les balises
    $valeur = htmlspecialchars($valeur); // on filtre les caractères spéciaux
  }
  return $valeur;
}

// Empeche les injections de code sur les entiers
function post_integer($nom) {
  $entier = 0;                   // on commence par fixer une valeur par défaut (ici 0)
  if (isset($_POST[$nom])) {      // si la variable est définie
    $valeur = $_POST[$nom];       // on récupère sa valeur
    if (is_numeric($valeur)) {   // si elle est numérique
      $entier = intval($valeur); // on on récupère la valeur convertie en entier
    }
  }
  return $entier;                // on retourne la valeur testée et convertie
}