<?php
require_once 'app/controllers/AdminController.php';

class ElementController extends ControllerBase {

  /**
   * Permet de lire un ou plusieurs elements
   *
   * @param $id
   * @return void
   */
  public function read($id = null){
    $data = ['element' => Element::read($id)];
    
    $tags = Element::gettags();
    $datatags = ['tags' => $tags];
    $data = array_merge($data, $datatags);
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
    $tags = Element::gettags();
    $datatags = ['tags' => $tags];
    $data = array_merge($data, $datatags);
    $this->render('admin/element', $data);
  }

  /**
   * Permet de mettre à jour un element
   *
   * @param $id
   * @return void
   */
  public function update($id){
    $element = new Element();
    $element->setAttributes($_POST);
    $element->update($id);

    $data = AdminController::getall();
    $tags = Element::gettags();
    $datatags = ['tags' => $tags];
    $data = array_merge($data, $datatags);
    $this->render('admin/element', $data);
  }

  /**
   * Permet de supprimer un element
   *
   * @param $id
   * @return void
   */
  public function delete($id){
    Element::delete($id);

    $data = AdminController::getall();
    $tags = Element::gettags();
    $datatags = ['tags' => $tags];
    $data = array_merge($data, $datatags);
    $this->render('admin/element', $data);
  }
}