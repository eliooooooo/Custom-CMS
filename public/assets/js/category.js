// page 1 catégories + articles

let linkToArticle = document.querySelector('.link_to_article').addEventListener('click', () => {
    location.href = 'https://www.cuej.info/mini-sites/sauvage/article?action=readbycat&id=1';
});

let article1 = document.querySelector('.link_to_article-1');
let article2 = document.querySelector('.link_to_article-2');
let article3 = document.querySelector('.link_to_article-3');

// Définir les positions possibles
let positions = [
    { left: '10%', top: '30%' },
    { right: '10%', top: '50%', flexDirection: 'row-reverse'},
    { left: '25%', top: '70%' }
];

// Fonction pour mélanger un tableau
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // Tant qu'il reste des éléments à mélanger...
    while (0 !== currentIndex) {

        // Choisissez un élément restant...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // Et échangez-le avec l'élément actuel.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Mélanger les positions
positions = shuffle(positions);

// Assigner les positions aux icônes
let icons = [article1, article2, article3];
for (let i = 0; i < icons.length; i++) {
    icons[i].style.position = 'fixed';
    if (positions[i].left) {
        icons[i].style.left = positions[i].left;
        icons[i].style.right = 'initial'; // Réinitialiser la valeur de 'right' si 'left' est défini
    } else {
        icons[i].style.right = positions[i].right;
        icons[i].style.left = 'initial'; // Réinitialiser la valeur de 'left' si 'right' est défini
    }
    icons[i].style.top = positions[i].top;

    if (positions[i].flexDirection) {
        icons[i].style.flexDirection = positions[i].flexDirection;
    }
}