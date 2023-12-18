<?php 

function connexion()
{
  $pdo = new PDO('mysql:host=wsql.u-strasbg.fr;dbname=cuejsauvage;charset=utf8', 'cuej', 'bu4Xahj^');
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);

  if ($pdo) {
    return $pdo;
  } else {
    echo '<p>Erreur de connexion à la base de donnée (Fichier connexion.php)</p>';
    exit;
  }
}