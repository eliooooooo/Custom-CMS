<?php
require_once('vendor/autoload.php');

// Fonction qui permet d'initialiser Twig en fixant le dossier des modèles
function init_twig()
{
    // Indique le répertoire ou sont placés les modèles (templates)
    $loader = new \Twig\Loader\FilesystemLoader('templates');

    // Crée un nouveau moteur Twig
    $twig = new \Twig\Environment($loader, ['debug' => true]);
    $twig->addExtension(new \Twig\Extension\DebugExtension());

    // Renvoie le moteur
    return $twig;
}
