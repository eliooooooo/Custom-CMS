<?php

class ArticleController extends ControllerBase {

  public function read($id = null){
    $data = ['article' => Article::read($id)];
    var_dump($data);
    $this->render('read', $data);
  }

  public function create($data){
    /**$data = [
    *  'tags' => 'test',
    *  'content' => 'test',
    *  'alt' => 'test',
    *  'link' => 'test',
    *  'class' => 'test',
    *  'id_article' => 3
    *];
    */
    $article = new Article();
    $article->setAttributes($data);
    $newarticleId = $article->create();

    $data = ['article' => Article::read($newarticleId)];
    var_dump($data);
    $this->render('read', $data);
  }

  public function update($id){
    /**$data = [
    *  'tags' => 'test2',
    *  'content' => 'test2',
    *  'alt' => 'test2',
    *  'link' => 'test2',
    *  'class' => 'test2',
    *  'id_article' => 3
    *];
    */
    $article = new Article();
    $article->setAttributes($data);
    $article->update($id);

    $data = ['article' => Article::read($id)];
    var_dump($data);
    $this->render('read', $data);
  }

  public function delete($id){
    Article::delete($id);
    $data = ['article' => Article::read()];
    var_dump($data);
    $this->render('read', $data);
  }
}