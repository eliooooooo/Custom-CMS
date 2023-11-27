<?php

class ElementController extends ControllerBase {

  public function read($id = null){
    $data = ['element' => Element::read($id)];
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
    $element = new Element();
    $element->setAttributes($data);
    $newElementId = $element->create();

    $data = ['element' => Element::read($newElementId)];
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
    $element = new Element();
    $element->setAttributes($data);
    $element->update($id);

    $data = ['element' => Element::read($id)];
    var_dump($data);
    $this->render('read', $data);
  }

  public function delete($id){
    Element::delete($id);
    $data = ['element' => Element::read()];
    var_dump($data);
    $this->render('read', $data);
  }
}