<?php
// install.php

// 1. Créez le fichier de configuration à partir des informations de l'utilisateur
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $projectPath = $_POST['projectPath'];
    $configContent = "<?php\n";
    $configContent .= "\$projectPath = '$projectPath';\n";
    file_put_contents('config.php', $configContent);
}

// 2. Créez la structure de répertoires nécessaire
mkdir($projectPath . '/app', 0777, true);
mkdir($projectPath . '/public', 0777, true);
mkdir($projectPath . '/resources', 0777, true);

// 3. Copiez les fichiers nécessaires dans les répertoires appropriés
// (remplacez 'source' par le chemin vers vos fichiers source)
copy('source/app/*', $projectPath . '/app');
copy('source/public/*', $projectPath . '/public');
copy('source/resources/*', $projectPath . '/resources');

// 4. Exécutez les scripts SQL pour créer la base de données et les tables
// (remplacez 'your_database' et 'your_username' par vos informations de base de données)
$pdo = new PDO('mysql:host=localhost;dbname=your_database', 'your_username', 'your_password');
$sql = file_get_contents('install.sql');
$pdo->exec($sql);

echo "Installation terminée.";
