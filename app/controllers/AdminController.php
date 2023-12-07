<?php

Class AdminController extends ControllerBase {

    function create() {
        $this->render('admin/create', []);
    }

    function delete() {
        $this->render('admin/delete', []);
    }

    function update() {
        $element = new Element();
        $element = ['element' => $element->read()];
        $article = new Article();
        $article = ['article' => $article->read()];
        $category = new Category();
        $category = ['category' => $category->read()];
        $data = array_merge($element, $article, $category);
        $this->render('admin/update', $data);
    }
}