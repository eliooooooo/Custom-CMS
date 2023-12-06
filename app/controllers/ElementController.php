<?php

class ElementController extends ControllerBase {

  /**
   * Permet de lire un ou plusieurs elements
   *
   * @param int $id
   * @return void
   */
  public function read(int $id = null){
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
    var_dump($_POST);
    var_dump($element);
    $newElementId = $element->create();

    $data = ['element' => Element::read($newElementId)];
    var_dump($data);
    $this->render('read', $data);
  }

  /**
   * Permet de mettre à jour un element
   *
   * @param int $id
   * @param array $data
   * @return void
   */
  public function update(int $id, array $data){
    $element = new Element();
    $element->setAttributes($data);
    $element->update($id);

    $data = ['element' => Element::read($id)];
    var_dump($data);
    $this->render('read', $data);
  }

  /**
   * Permet de supprimer un element
   *
   * @param int $id
   * @return void
   */
  public function delete(int $id){
    Element::delete($id);
    $data = ['element' => Element::read()];
    var_dump($data);
    $this->render('read', $data);
  }
}