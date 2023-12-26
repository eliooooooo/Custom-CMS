<?php
require_once 'app/controllers/AdminController.php';

class CategoryController extends ControllerBase
{

  /**
   * Permet de lire une ou plusieurs category
   *
   * @param $id
   * @return void
   */
  public function read($id = null)
  {
    $data = ['category' => Category::read($id)];
    $this->render('read', $data);
  }

  public function readbycat($id = null)
  {
    $data = ['category' => Category::read($id)];
    $this->render('read', $data);
  }

  /**
   * Permet de créer une category
   *
   * @param array $data
   * @return void
   */
  public function create()
  {
    $category = new Category();
    $category->setAttributes($_POST);
    $newCategoryId = $category->create();
    $data = AdminController::getall();
    $this->render('admin/category', $data);
  }

  /**
   * Permet de mettre à jour une category
   *
   * @param $id
   * @return void
   */
  public function update($id)
  {
    $category = new Category();
    $category->setAttributes($_POST);
    $category->update($id);

    $data = AdminController::getall();
    $this->render('admin/category', $data);
  }

  /**
   * Permet de supprimer une category
   *
   * @param $id
   * @return void
   */
  public function delete($id)
  {
    Category::delete($id);
    $data = AdminController::getall();
    $this->render('admin/category', $data);
  }
}
