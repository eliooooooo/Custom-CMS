export default function AdminToolbar() {

    // récupérer la variable de session de l'id de l'utilisateur connecté
    // const userId = parseInt(sessionStorage.getItem('userId'));
    let userId = 1;

    // Vérifier si l'ID de l'utilisateur connecté est 1
    if (userId === 1) {
        console.log('id = 1')
        // Créer la barre d'outils d'administration
        const adminToolbar = document.createElement('div');
        adminToolbar.classList.add('admin-toolbar');

        // Créer une liste qui formera le menu
        const liste = document.createElement('ul');
        liste.classList.add('admin-toolbar-liste');
        adminToolbar.appendChild(liste);

        // Ajouter des boutons à la liste du menu
        const userButton = document.createElement('li');
        userButton.classList.add('admin-toolbar-liste-item');
        const userButtonlien = document.createElement('a');
        userButtonlien.classList.add('admin-toolbar-liste-item-link');
        userButtonlien.setAttribute('href', 'login.php');
        userButtonlien.textContent = 'Se connecter';
        userButton.appendChild(userButtonlien);
        liste.appendChild(userButton);

        const pageTitle = document.createElement('li');
        pageTitle.classList.add('admin-toolbar-liste-item');
        const Homelien = document.createElement('a');
        Homelien.classList.add('admin-toolbar-liste-item-link');
        Homelien.setAttribute('href', 'index.php');
        Homelien.textContent = 'Accueil - Titre du site';
        pageTitle.appendChild(Homelien);
        liste.appendChild(pageTitle);

        const editButton = document.createElement('li');
        editButton.classList.add('admin-toolbar-liste-item');
        const editButtonlien = document.createElement('a');
        editButtonlien.classList.add('admin-toolbar-liste-item-link');
        editButtonlien.setAttribute('href', 'config.php');
        editButtonlien.textContent = 'Modifier le contenu';
        editButton.appendChild(editButtonlien);
        liste.appendChild(editButton);

        // Ajouter la barre d'outils à la page
        const body = document.querySelector('body');
        body.prepend(adminToolbar);
    }

    console.log('admin toolbar');
}
