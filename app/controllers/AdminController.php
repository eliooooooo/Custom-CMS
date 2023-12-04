<?php

Class AdminController extends ControllerBase {

    function create() {
        $this->render('admin/create', []);
    }

    function update() {
        $this->render('admin/update', []);
    }

    function delete() {
        $this->render('admin/delete', []);
    }

}