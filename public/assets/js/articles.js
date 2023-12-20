const url = new URL(location);

const btnArticle = document.querySelector('.btn-article');
const btnArticle1 = document.querySelector('.btn-article-1');
const btnArticle2 = document.querySelector('.btn-article-2');
const btnArticle3 = document.querySelector('.btn-article-3');

const article1 = document.querySelector('.article-1');
const article2 = document.querySelector('.article-2');
const article3 = document.querySelector('.article-3');

function updateDisplay() {
        const urlArticle = url.searchParams.get('article');
         if (urlArticle != null) {
                if (urlArticle == 1) {
                        console.log('salut');
                article1.style.display = 'flex'; 
                article2.style.display = 'none'; 
                article3.style.display = 'none'; 
                } else if (urlArticle == 2) {
                        console.log('salut2');
                article1.style.display = 'none'; 
                article2.style.display = 'flex'; 
                article3.style.display = 'none'; 
                } else if (urlArticle == 3) {
                        console.log('salut3');
                article1.style.display = 'none'; 
                article2.style.display = 'none'; 
                article3.style.display = 'flex'; 
                } 
        }
}



btnArticle1.addEventListener('click', () => {   
        url.searchParams.set("article", "1"); 
        history.pushState({}, "", url);  
        updateDisplay();
})
btnArticle2.addEventListener('click', () => {
        url.searchParams.set("article", "2"); 
        history.pushState({}, "", url);  
        updateDisplay();
})
btnArticle3.addEventListener('click', () => {
        url.searchParams.set("article", "3"); 
        history.pushState({}, "", url);
        updateDisplay();
})

// Surveiller les changements de l'historique
window.addEventListener('popstate', () => {
        updateDisplay();
        console.log('eeeeeh');
});

// Mettre à jour l'affichage initial
updateDisplay();



