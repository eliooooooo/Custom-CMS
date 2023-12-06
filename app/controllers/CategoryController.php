<?php

class CategoryController extends ControllerBase {

  /**
   * Permet de lire une ou plusieurs category
   *
   * @param int $id
   * @return void
   */
  public function read(int $id = null){
    $data = ['category' => Category::read($id)];
    // var_dump($data);
    $this->render('read', $data);
  }

  /**
   * Permet de créer une category
   *
   * @param array $data
   * @return void
   */
  public function create(){
    $category = new Category();
    $category->setAttributes($_POST);
    $newCategoryId = $category->create();

    $data = ['category' => Category::read($newCategoryId)];
    $this->render('read', $data);
  }

  /**
   * Permet de mettre à jour une category
   *
   * @param int $id
   * @param array $data
   * @return void
   */
  public function update(int $id, array $data){
    $category = new Category();
    $category->setAttributes($data);
    $category->update($id);

    $data = ['category' => Category::read($id)];
    var_dump($data);
    $this->render('read', $data);
  }

  /**
   * Permet de supprimer une category
   *
   * @param int $id
   * @return void
   */
  public function delete(int $id){
    Category::delete($id);
    $data = ['category' => Category::read()];
    var_dump($data);
    $this->render('read', $data);
  }
}