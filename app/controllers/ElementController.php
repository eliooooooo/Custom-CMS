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
    $newElementId = $element->create();

    $data = ['element' => Element::read($newElementId)];
    $this->render('read', $data);
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

    $data = ['element' => Element::read($id)];
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

    $this->render('read', $data);
  }
}