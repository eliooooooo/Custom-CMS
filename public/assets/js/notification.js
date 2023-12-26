if (document.querySelector('.notification')) {
    const notification = document.querySelector('.notification');

    // faire en sorte que la notification disparaisse au bout de 5 secondes
    setTimeout(() => {
        notification.style.display = 'none';
    }
    , 5000);
} 