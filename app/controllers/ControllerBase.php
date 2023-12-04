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
        if (isset($_SESSION['user'])) {
          $is_connected = true;
        } else {
          $is_connected = false;
        }
        // var_dump($config);
        $data = array_merge($data, $config, ['is_connected' => $is_connected]);
        if ($action === 'frontpage.html.twig') {
          echo $this->twig->render($action, $data);
        } else if (strpos($action, 'errors/') === 0) {
          echo $this->twig->render($action, $data);
        } else {
        echo $this->twig->render('pages/' . $action . '.html.twig', $data);
        };
      }
}