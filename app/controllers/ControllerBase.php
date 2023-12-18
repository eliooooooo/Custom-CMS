<?php

require_once 'utils/form_security.php';

class ControllerBase
{
  public $twig = null;

  public function __construct()
  {
    $this->twig = $this->init_twig();
  }

  /**
   * Permet d'initialiser Twig
   *
   * @return void
   */
  private function init_twig()
  {
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
   * @param $action
   * @param $data
   * @return void
   */
  public function render($action, $data)
  {
    $config = Config::get();
    if (isset($_SESSION['user'])) {
      $is_connected = true;
    } else {
      $is_connected = false;
    }
    $data = array_merge($data, $config, ['is_connected' => $is_connected]);
    if ($action === 'frontpage.html.twig') {
      echo $this->twig->render($action, $data);
    } else if (strpos($action, 'errors/') === 0) {
      echo $this->twig->render($action, $data);
    } else if (strpos($action, 'admin/') === 0) {
      if ($is_connected) {
        echo $this->twig->render($action . '.html.twig', $data);
      } else {
        header('Location: ' . $config['site_url'] . 'login');
      }
    } else {
      echo $this->twig->render('pages/' . $action . '.html.twig', $data);
    };
  }
}
