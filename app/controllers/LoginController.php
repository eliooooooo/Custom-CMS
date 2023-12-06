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
            echo '<p class="notification--green notification">Connecté en tant que ' . $_SESSION['user'] . ' !</p>';
            $this->render('frontpage.html.twig', []);
        } else {
            echo '<p class="notification--red notification">Mauvais identifiants</p>';
            $this->render('login', []);
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
        echo '<p class="notification--red notification">Vous avez été déconnecté</p>';
        $this->render('frontpage.html.twig', []);
    }
}