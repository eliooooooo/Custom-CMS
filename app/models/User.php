<?php

class User {
    // liste des attributs
    private $id;
    private $name;
    private $email;
    private $password;

    /**
     * permet de récupérer les attributs de l'objet
     *
     * @return array
     */
    public function getAttributes() {
        return get_object_vars($this);
    }

    /**
     * Vérfie si le mot de passe est correct
     * 
     * @param $password
     * @return bool
     */
    public function verifyPassword($password) {
        return $password = $this->password;
    }

    /**
     * Récupère un utilisateur par son email
     *
     * @param string $email L'email de l'utilisateur à récupérer
     * @return User|null L'utilisateur si trouvé, null sinon
     */
    public static function findByEmail($email) {
        $admin_config = new Config();
        $admin_config->get();
        $adminEmail = $admin_config->getSpecific('admin_email');
        $adminPassword = $admin_config->getSpecific('admin_password');
        
        if ($email === $adminEmail) {
            $user = new User();
            $user->id = 1;
            $user->name = 'admin';
            $user->email = $adminEmail;
            $user->password = $adminPassword;
            return $user;
        }
    }

    /**
     * Récupère l'id d'un utilisateur
     * 
     * @return int
     */
    public function getId() {
        return $this->id;
    }

    /**
     * Récupère le nom d'un utilisateur
     * 
     * @return string
     */
    public function getName() {
        return $this->name;
    }

}