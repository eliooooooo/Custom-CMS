<?php

Class AdminController extends ControllerBase {

    function create() {
        $this->render('create', []);
    }

    function update() {
        $this->render('update', []);
    }

    function delete() {
        $this->render('delete', []);
    }

}