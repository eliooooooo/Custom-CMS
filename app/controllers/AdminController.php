<?php

Class AdminController extends ControllerBase {

    function getall() {
        $element = new Element();
        $element = ['element' => $element->read()];
        $article = new Article();
        $article = ['article' => $article->read()];
        $category = new Category();
        $category = ['category' => $category->read()];
        // Récupérer tous les fichiers disponibles dans le dossier public/img/uploads
        $files = scandir('public/img/uploads');
        $files = array_diff($files, array('.', '..'));
        $files = ['files' => $files];
        $data = array_merge($element, $article, $category, $files);
        return $data;
    }

    function create() {
        $data = $this->getall();
        $this->render('admin/create', []);
    }

    function delete() {
        $this->render('admin/delete', []);
    }

    function update() {
        $data = $this->getall();
        $this->render('admin/update', $data);
    }

    function upload(){
        $target_dir = "public/img/uploads/";
        $target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
        $uploadOk = 1;
        $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

        // Check if image file is a actual image or fake image
        if(isset($_POST["submit"])) {
          $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
          if($check !== false) {
            echo "<p class='notification notification--green'>File is an image - " . $check["mime"] . ".</p>";
            $uploadOk = 1;
          } else {
            echo "<p class='notification notification--red'>File is not an image.</p>";
            $uploadOk = 0;
            $this->render('admin/create', []);
          }
        }

        // Check if file already exists
        if (file_exists($target_file)) {
            echo "<p class='notification notification--red'>Sorry, file already exists.</p>";
            $uploadOk = 0;
            $this->render('admin/create', []);
        }

        // Check file size in KB
        if ($_FILES["fileToUpload"]["size"] > 500000) {
            echo "<p class='notification notification--red' >Sorry, your file is too large.</p>";
            $uploadOk = 0;
            $this->render('admin/create', []);
        }

        // Allow certain file formats
        if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
        && $imageFileType != "gif" ) {
          echo "<p class='notification notification--red'>Sorry, only JPG, JPEG, PNG & GIF files are allowed.</p>";
          $uploadOk = 0;
          $this->render('admin/create', []);
        }

        // Check if $uploadOk is set to 0 by an error
        if ($uploadOk == 0) {
            echo "<p class='notification notification--red'>Sorry, your file was not uploaded.</p>";
            $this->render('admin/create', []);
            // if everything is ok, try to upload file
        } else {
            if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
              echo "<p class='notification notification--green'>The file ". htmlspecialchars( basename( $_FILES["fileToUpload"]["name"])). " has been uploaded.</p>";
              $this->render('admin/create', []);
            } else {
              echo "<p class='notification notification--red'>Sorry, there was an error uploading your file.</p>";
              $this->render('admin/create', []);
            }
        }
    }
}