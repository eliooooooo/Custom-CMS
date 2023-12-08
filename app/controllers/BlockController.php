<?php

class BlockController extends ControllerBase {

  /**
   * Permet de lire un ou plusieurs blocks
   *
   * @param int $id
   * @return void
   */ 
  public function read(int $id = null){
    $data = ['block' => Block::read($id)];
    // var_dump($data);
    $this->render('read', $data);
  }

  /**
   * Permet de créer un block
   *
   * @return void
   */
  public function create(){
    $block = new Block();
    $block->setAttributes($_POST);
    $newBlockId = $block->create();

    $data = ['block' => Block::read($newBlockId)];
    $this->render('read', $data);
  }

  /**
   * Permet de mettre à jour un block
   *
   * @param int $id
   * @return void
   */
  public function update(int $id){
    $block = new Block();
    $block->setAttributes($_POST);
    $block->update($id);

    $data = ['block' => Block::read($id)];
    $this->render('read', $data);
  }

  /**
   * Permet de supprimer un block
   *
   * @param int $id
   * @return void
   */
  public function delete($id){
    Block::delete($id);
    $data = ['block' => Block::read()];
    var_dump($data);
    $this->render('read', $data);
  }
}