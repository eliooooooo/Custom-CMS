<?php

class ControllerBase {
      public $twig = null;

      public function __construct() {
        $this->twig = $this->init_twig();
      }

      /**
       * Permet d'initialiser Twig
       *
       * @return void
       */
      private function init_twig() {
        // Indique le répertoire ou sont placés les modèles (templates)
        $loader = new \Twig\Loader\FilesystemLoader('app/views');

        // Crée un nouveau moteur Twig
        $twig = new \Twig\Environment($loader, ['debug' => true]);
        $twig->addExtension(new \Twig\Extension\DebugExtension());

        // Renvoie le moteur
        return $twig;
      }

      /**
       * Permet de rendre une vue
       *
       * @param string $action
       * @param array $data
       * @return void
       */
      public function render(string $action, array $data) {
        $config = Config::get();
        $data = array_merge($data, $config);
        echo $this->twig->render('pages/' . $action . '.html.twig', $data);
      }
}