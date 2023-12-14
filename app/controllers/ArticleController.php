<?php
require_once 'app/controllers/AdminController.php';

class ArticleController extends ControllerBase {

  /**
   * Permet de lire un ou plusieurs articles
   *
   * @param $id
   * @return void
   */ 
  public function read($id = null){
    $data = ['article' => Article::read($id)];
    // var_dump($data);
    $this->render('read', $data);
  }

  /**
   * Permet de créer un article
   *
   * @return void
   */
  public function create(){
    $article = new Article();
    $article->setAttributes($_POST);
    $newArticleId = $article->create();

    $data = AdminController::getall();
    $this->render('admin/article', $data);
  }

  /**
   * Permet de mettre à jour un article
   *
   * @param $id
   * @return void
   */
  public function update($id){
    $article = new Article();
    $article->setAttributes($_POST);
    $article->update($id);

    $data = AdminController::getall();
    $this->render('admin/article', $data);
  }

  /**
   * Permet de supprimer un article
   *
   * @param $id
   * @return void
   */
  public function delete($id){
    Article::delete($id);
    $data = AdminController::getall();
    $this->render('admin/article', $data);
  }
}