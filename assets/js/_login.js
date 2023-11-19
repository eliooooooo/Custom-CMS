function login() {
    // les div respectives de connexion et d'inscription
    let connexion = document.getElementsById('connexion');
    let inscription = document.getElementsById('inscription');
    console.log(connexion);
    console.log(inscription);

    // par default, la div d'inscription est cachée
    inscription.classList.add('hidden');

    // on ajoute un écouteur d'évènement sur le bouton de connexion
    document.getElementById('btn-connexion').addEventListener('click', function() {
        // on cache la div de connexion
        connexion.classList.add('hidden');
        // on affiche la div d'inscription
        inscription.classList.remove('hidden');
    });
}