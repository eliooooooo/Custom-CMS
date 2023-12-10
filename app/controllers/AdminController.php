<?php

Class AdminController extends ControllerBase {

    /**
     * Récupère toutes les données de la base de données
     */
    public static function getall() {
        $element = new Element();
        $element = ['element' => $element->read()];
        $tags = new Element();
        $tags = ['tags' => $tags->gettags()];
        $block = new Block();
        $block = ['blocks' => $block->read()];
        $article = new Article();
        $article = ['article' => $article->read()];
        $category = new Category();
        $category = ['category' => $category->read()];
        // Récupérer tous les fichiers disponibles dans le dossier public/img/uploads
        $files = scandir('public/img/uploads');
        $files = array_diff($files, array('.', '..'));
        $files = ['files' => $files];
        $data = array_merge($element, $block, $article, $category, $files, $tags);
        return $data;
    }

    // /**
    //  * Affiche la page create de l'administration
    //  */
    // function create() {
    //     $data = $this->getall();
    //     $this->render('admin/create', $data);
    // }

    // /**
    //  * Affiche la page update de l'administration
    //  */
    // function update() {
    //     $data = $this->getall();
    //     $this->render('admin/update', $data);
    // }

    /**
     * Affiche la page files de l'administration
     */
    function files() {
        $data = $this->getall();
        $this->render('admin/files', $data);
    }

    /**
     * Affiche la page element de l'administration
     */
    function element() {
        $data = $this->getall();
        $this->render('admin/element', $data);
    }

    /**
     * Affiche la page block de l'administration
     */
    function block() {
        $data = $this->getall();
        $this->render('admin/block', $data);
    }

    /**
     * Affiche la page article de l'administration
     */
    function article() {
        $data = $this->getall();
        $this->render('admin/article', $data);
    }

    /**
     * Affiche la page block de l'administration
     */
    function category() {
        $data = $this->getall();
        $this->render('admin/category', $data);
    }

    /**
     * Permet d'upload un fichier sur le server
     */
    function upload(){
        $data = $this->getall();
        $target_dir = "public/img/uploads/";
        $target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
        $uploadOk = 1;
        $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

        // Check if image file is a actual image or fake image
        if(isset($_POST["submit"])) {
          $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
          if($check !== false) {
            $uploadOk = 1;
          } else {
            $uploadOk = 0;
            $this->render('admin/files', $data);
          }
        }

        // Check if file already exists
        if (file_exists($target_file)) {
            echo "<p class='notification notification--red'>Désolé, le fichier existe déjà.</p>";
            $uploadOk = 0;
            $this->render('admin/files', $data);
        }

        // Check file size in KB
        if ($_FILES["fileToUpload"]["size"] > 2000000) {
            echo "<p class='notification notification--red' >Désolé, le fichier est trop volumineux.</p>";
            $uploadOk = 0;
            $this->render('admin/files', $data);
        }

        // Allow certain file formats
        if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
        && $imageFileType != "gif" && $imageFileType != "svg" && $imageFileType != "webp"
        && $imageFileType != "mp3" && $imageFileType != "mp4" ) {
          echo "<p class='notification notification--red'>Désolé, l'extension du fichier n'est pas prise en charge.</p>";
          $uploadOk = 0;
          $this->render('admin/files', $data);
        }

        // Check if $uploadOk is set to 0 by an error
        if ($uploadOk == 0) {
            echo "<p class='notification notification--red'>Désolé, le fichier n'a pas pu être téléchargé.</p>";
            $this->render('admin/files', $data);
            // if everything is ok, try to upload file
        } else {
            if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
              $data = $this->getall();
              echo "<p class='notification notification--green'>Le fichier ". htmlspecialchars( basename( $_FILES["fileToUpload"]["name"])). " à bien été téléchargé.</p>";
              $this->render('admin/files', $data);
            } else {
              echo "<p class='notification notification--red'>Désolé, il y a eu une erreur lors du téléchargement du fichier</p>";
              $this->render('admin/files', $data);
            }
        }
    }

    /**
     * Permet de supprimer un upload
     */
    function deletefile(){
        $data = $this->getall();
        $target_dir = "public/img/uploads/";
        $target_file = $target_dir . basename($_POST["file"]);
        $uploadOk = 1;
        $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

        // Check if file already exists
        if (!file_exists($target_file)) {
            echo "<p class='notification notification--red'>Désolé, le fichier n'existe pas.</p>";
            $uploadOk = 0;
            $this->render('admin/files', $data);
        }

        // Check if $uploadOk is set to 0 by an error
        if ($uploadOk == 0) {
            echo "<p class='notification notification--red'>Désolé, le fichier n'a pas pu être supprimé.</p>";
            $this->render('admin/files', $data);
            // if everything is ok, try to upload file
        } else {
            if (unlink($target_file)) {
              $data = $this->getall();
              echo "<p class='notification notification--green'>Le fichier ". htmlspecialchars( basename( $_POST["file"])). " à bien été supprimé.</p>";
              $this->render('admin/files', $data);
            } else {
              echo "<p class='notification notification--red'>Désolé, il y a eu une erreur lors de la suppression du fichier</p>";
              $this->render('admin/files', $data);
            }
        }
    }
}