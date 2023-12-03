<?php

class LoginController extends ControllerBase {

    /**
     * Permet d'afficher le formulaire de connexion
     * 
     * @return void
     */
    public function read() {
        $this->render('login', []);
    }
    /**
     * Permet de vérifier les informations de connexion
     * 
     * @return void
     */
    public function login() {
        $email = $_POST['email'];
        $password = $_POST['password'];

        $user = User::findByEmail($email);
        var_dump($user);
        if ($user && $user->verifyPassword($password)) {
            $_SESSION['user'] = $user->$id;
        } else {
            echo 'Mauvais identifiants';
        }
    }
}