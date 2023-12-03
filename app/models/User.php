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
     * @param string $password
     * @return bool
     */
    public function verifyPassword(string $password) {
        return password_verify($password, $this->password);
    }

    /**
     * Récupère un utilisateur par son email
     *
     * @param string $email L'email de l'utilisateur à récupérer
     * @return User|null L'utilisateur si trouvé, null sinon
     */
    public static function findByEmail($email) {
        $adminEmail = getenv('ADMIN_EMAIL');
        $adminPassword = getenv('ADMIN_PASSWORD');
        
        if ($email === $adminEmail) {
            $user = new User();
            $user->id = 1;
            $user->name = 'admin';
            $user->email = $adminEmail;
            $user->password = $adminPassword;
            return $user;
        }

        $configuser = new Config();
        $configuser->get();
        var_dump($configuser);

        // return null;
    }

}