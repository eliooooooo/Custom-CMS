<?php

class ArticleController extends ControllerBase {

  /**
   * Permet de lire un ou plusieurs articles
   *
   * @param int $id
   * @return void
   */ 
  public function read(int $id = null){
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

    $data = ['article' => Article::read($newArticleId)];
    $this->render('admin/article', $data);
  }

  /**
   * Permet de mettre à jour un article
   *
   * @param int $id
   * @return void
   */
  public function update(int $id){
    $article = new Article();
    $article->setAttributes($_POST);
    $article->update($id);

    $data = ['article' => Article::read($id)];
    $this->render('admin/article', $data);
  }

  /**
   * Permet de supprimer un article
   *
   * @param int $id
   * @return void
   */
  public function delete($id){
    Article::delete($id);
    $data = ['article' => Article::read()];
    $this->render('admin/article', $data);
  }
}