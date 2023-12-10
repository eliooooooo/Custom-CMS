<?php
require_once 'app/controllers/AdminController.php';

class ElementController extends ControllerBase {

  function gettags() {
    $tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'a', 'img', 'figure', 'audio', 'video'];
  }

  /**
   * Permet de lire un ou plusieurs elements
   *
   * @param int $id
   * @return void
   */
  public function read($id = null){
    $data = ['element' => Element::read($id)];
    // var_dump($data);
    $this->render('read', $data);
  }

  /**
   * Permet de créer un element
   *
   * @param array $data
   * @return void
   */
  public function create(){
    $element = new Element();
    $element->setAttributes($_POST);
    $newElementId = $element->create();

    $data = AdminController::getall();
    $data['tags'] = $this->gettags();
    $this->render('admin/element', $data);
  }

  /**
   * Permet de mettre à jour un element
   *
   * @param int $id
   * @return void
   */
  public function update(int $id){
    $element = new Element();
    $element->setAttributes($_POST);
    $element->update($id);

    $data = AdminController::getall();
    $data['tags'] = $this->gettags();
    $this->render('admin/element', $data);
  }

  /**
   * Permet de supprimer un element
   *
   * @param int $id
   * @return void
   */
  public function delete($id){
    Element::delete($id);

    $data = AdminController::getall();
    $data['tags'] = $this->gettags();
    $this->render('admin/element', $data);
  }
}