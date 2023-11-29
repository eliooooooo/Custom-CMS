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
    var_dump($data);
    $this->render('read', $data);
  }

  /**
   * Permet de créer un article
   *
   * @param array $data
   * @return void
   */
  public function create(array $data){
    $article = new Article();
    $article->setAttributes($data);
    $newarticleId = $article->create();

    $data = ['article' => Article::read($newarticleId)];
    var_dump($data);
    $this->render('read', $data);
  }

  /**
   * Permet de mettre à jour un article
   *
   * @param int $id
   * @param array $data
   * @return void
   */
  public function update(int $id, array $data){
    $article = new Article();
    $article->setAttributes($data);
    $article->update($id);

    $data = ['article' => Article::read($id)];
    var_dump($data);
    $this->render('read', $data);
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
    var_dump($data);
    $this->render('read', $data);
  }
}