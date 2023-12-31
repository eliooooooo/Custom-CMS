if (document.querySelector('.admin-panel')) {
    // Sélectionner tous les liens "Modifier"
    let modifyLinks = document.querySelectorAll('.update');

    modifyLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            // l'identifiant de la ligne de tableau actuelle
            let currentRowId = this.parentNode.parentNode.id;

            // l'identifiant du formulaire correspondant
            let formId = 'form-' + currentRowId.split('-')[1];
            let form = document.getElementById(formId);
 
            // Si le formulaire est actuellement affiché, le cacher
            if (form.style.display === 'table-row') {
                form.style.display = 'none';
            }
            // Sinon, affichez le formulaire
            else {
                form.style.display = 'table-row';
            }
        });
    });
}