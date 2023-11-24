<?php

// Appeler l'action et passer l'identifiant en tant que paramètre
if (method_exists($className, $action)) {
    $data = [$className => $className::$action($id)];
    echo $twig->render('pages/' . $action . '.html.twig', $data);
    var_dump($data);
} else {
    // Si l'action n'existe pas, afficher une erreur 404
    echo $twig->render('errors/404.html.twig');
}