<?php

class ControllerBase {
      public $twig = null;

      public function __construct() {
        $this->twig = $this->init_twig();
      }

      private function init_twig() {
        // Indique le répertoire ou sont placés les modèles (templates)
        $loader = new \Twig\Loader\FilesystemLoader('app/views');

        // Crée un nouveau moteur Twig
        $twig = new \Twig\Environment($loader, ['debug' => true]);
        $twig->addExtension(new \Twig\Extension\DebugExtension());

        // Renvoie le moteur
        return $twig;
      }

      public function render($action, $data) {
        $data .= ['site' => Config::get('site')];
        echo $this->twig->render('pages/' . $action . '.html.twig', $data);
      }
}