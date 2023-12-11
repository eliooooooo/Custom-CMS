<?php
require_once 'app/controllers/AdminController.php';

class BlockController extends ControllerBase {

  /**
   * Permet de lire un ou plusieurs blocks
   *
   * @param int $id
   * @return void
   */ 
  public function read(int $id = null){
    $data = ['blocks' => Block::read($id)];

    $classes = Block::getclass();
    $dataclass = ['classes' => $classes];
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

    $data = AdminController::getall();
    $this->render('admin/block', $data);
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

    $data = AdminController::getall();
    $this->render('admin/block', $data);
  }

  /**
   * Permet de supprimer un block
   *
   * @param int $id
   * @return void
   */
  public function delete($id){
    Block::delete($id);
    
    $data = AdminController::getall();
    $this->render('admin/block', $data);
  }
}