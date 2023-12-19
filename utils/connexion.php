<?php 

function connexion()
{
  $pdo = new PDO('mysql:host=tp2.iha.unistra.fr;dbname=burkle_CUEJ;charset=utf8', 'burkle', 'Eliott-007');
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);

  if ($pdo) {
    return $pdo;
  } else {
    echo '<p>Erreur de connexion à la base de donnée (Fichier connexion.php)</p>';
    exit;
  }
}