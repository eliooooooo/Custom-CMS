<?php 

class ErrorController extends ControllerBase {

      /**
       * Permet de lire l'error 404
       *
       * @return void
       */
      public function notFound() {
          echo $this->render('errors/404.html.twig', []);
      }

}