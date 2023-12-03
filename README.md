# Introduction
This CMS is a personal open-source project aimed at creating a custom, practical and functional CMS.
This module provides instructions for installing and using the CMS.

# Installation:
1. Clone the CMS package to a desired location on your system with the following command:  
    `$ git clone`  https://github.com/eliooooooo/CMS.git
2. Open a terminal and navigate to the extracted directory.
3. Run the following command to install the required dependencies:  
    `$ npm install`
    `$ composer intall`
5. Compile the existing assets files with the following command:  
    `$ npm run build`

# Setup the project:
1. Create your database that will host the project.
2. Once the installation is complete, modify the file `utils/config.php` with the information of this database and the general information of the site.
- The admin's account password and email must be configurated in a `.env` file in the root directory using the following template :
   > ADMIN_PASSWORD=jfie782doy //the hashed password  
   > ADMIN_EMAIL=user@email.com // the user email  
- To access to the hashed password, you can use the following instructions and copy the hashed password:
   > $adminPassword = 'admin'; // Remplacez ceci par le mot de passe réel
   > $hashedPassword = password_hash($adminPassword, PASSWORD_DEFAULT);
   > echo $hashedPassword;
4. Open a web browser and navigate to your project.
5. Run the `utils/DataBaseGenerator.php` in your browser.
6. If the base has been installed successfully, the `DataBaseGenerator.php` file can be deleted

# Usage instructions:
## Front modifications:
>  - The files present in the `Core` folders must not be modified so as not to alter basic functionalities
>  - The `esbuild/` folder is used to compile the sass code. It is therefore necessary to run it on watch during changes, from the build to the creation of the project or even from the production when putting it online.
>  - The compilation destination folders can be modified. In this case, the `html.html.twig` template requires modification in order to update the link to the **.css** and **.js** files.

