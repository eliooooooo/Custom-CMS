<?php

class CategoryController extends ControllerBase {

  public function read($id = null){
    $data = ['category' => Category::read($id)];
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
    $category = new Category();
    $category->setAttributes($data);
    $newcategoryId = $category->create();

    $data = ['category' => Category::read($newcategoryId)];
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
    $category = new Category();
    $category->setAttributes($data);
    $category->update($id);

    $data = ['category' => Category::read($id)];
    var_dump($data);
    $this->render('read', $data);
  }

  public function delete($id){
    Category::delete($id);
    $data = ['category' => Category::read()];
    var_dump($data);
    $this->render('read', $data);
  }
}