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
        if ($user && $user->verifyPassword($password)) {
            $_SESSION['user_id'] = $user->getId();
            $_SESSION['user'] = $user->getName();
            echo 'Connecté en tant que ' . $_SESSION['user'] . ' !';
            $this->render('frontpage.html.twig', []);
        } else {
            echo 'Mauvais identifiants';
        }
    }

    /**
     * Permet de se déconnecter
     * 
     * @return void
     */
    public function logout() {
        session_destroy();
        $is_connected = false;
        $this->render('frontpage.html.twig', []);
    }
}