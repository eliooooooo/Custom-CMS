if (document.querySelector('#button')!=null) {
    
    let vh = window.innerHeight;
    const width = window.outerWidth;
    const forward = document.querySelector('#forward');
    const backward = document.querySelector('#backward');
    const proportion = (scrollY, width) => {
        let prop = scrollY / width * 100;
        return parseFloat(prop.toFixed(2));
    }

    const item1_1 = document.querySelector('.p-item1_1');
    const item1_2 = document.querySelector('.p-item1_2');
    const item1_3 = document.querySelector('.p-item1_3');
    const item1_4 = document.querySelector('.p-item1_4');
    
    const item2_1 = document.querySelector('.p-item2_1');
    const item2_2 = document.querySelector('.p-item2_2');
    const item2_3 = document.querySelector('.p-item2_3');
    const item2_4 = document.querySelector('.p-item2_4');

    const item3_1 = document.querySelector('.p-item3_1');
    const item3_2 = document.querySelector('.p-item3_2');
    const item3_3 = document.querySelector('.p-item3_3');
    const item3_4 = document.querySelector('.p-item3_4');

    
    const titre1 = document.querySelector('.titre1');
    const titre2 = document.querySelector('.titre2');
    const titre3 = document.querySelector('.titre3');
    const titre4 = document.querySelector('.titre4');
    backward.style.opacity = 0;
    backward.style.cursor = 'default';
    let scrollY = this.scrollY;

    window.addEventListener('load', () => {
        scrollY = this.scrollY;
        console.log(scrollY);

        if (scrollY >= 0 & scrollY < (2 * vh)) {
            console.log('salut');
            document.documentElement.scrollTop = 0;
            backward.style.opacity = 0;
            backward.style.cursor = 'default';
            let p = proportion(scrollY, width);
            let hr = parseFloat((width / 10000 * p).toFixed(2));
            let scale1 = 1 + hr;
            let scale2 = 1 + (parseFloat(hr) * 0.4);
            let scale3 = 1 + (parseFloat(hr) * 0.2);

            item1_1.style.transform = `scale(${scale1}) translate3d(0, ${hr}px, 0)`;
            item1_2.style.transform = `scale(${scale2}) translate3d(0, ${hr}px, 0)`;
            item1_3.style.transform = `scale(${scale3}) translate3d(0, ${hr}px,0)`;
            if (item1_3.style.opacity != 1) {
                item1_3.style.opacity = 1;
            }
        } else if (scrollY >= (2 * vh) & scrollY < (4 * vh)) {
            document.documentElement.scrollTop = 2*vh;
            let p = proportion(scrollY, width);
            let hr = parseFloat((width / 10000 * p).toFixed(2));
            let scale1 = 1 + hr;
            let scale2 = 1 + (parseFloat(hr) * 0.4);
            let scale3 = 1 + (parseFloat(hr) * 0.2);
            
            item2_3.style.opacity = 0;
            item2_4.style.opacity = 0;
            item1_1.style.transform = `scale(${scale1}) translate3d(0, ${hr}px, 0)`;
            item1_2.style.transform = `scale(${scale2}) translate3d(0, ${hr}px, 0)`;
            item1_3.style.transform = `scale(${scale3}) translate3d(0, ${hr}px,0)`;
            if (item1_3.style.opacity != 1) {
                item1_3.style.opacity = 1;
            }
            console.log('yo');
            backward.style.cursor = 'pointer';
                backward.style.opacity = 1;
                backward.style.opacity = 1;
                let scrollY2 = scrollY - (2 * vh);
        
                let p2 = proportion(scrollY2, width);
                let hr2 = parseFloat((width / 10000 * p2).toFixed(2));
        
                let scale11 = 1 + hr2;
                let scale21 = 1 + (parseFloat(hr2) * 0.4);
                let scale31 = 1 + (parseFloat(hr2) * 0.2);

                item2_1.style.transform = `scale(${scale11}) translate3d(0, ${hr2}px, 0)`;
                item2_2.style.transform = `scale(${scale21}) translate3d(0, ${hr2}px, 0)`;
                item2_3.style.transform = `scale(${scale31}) translate3d(0, ${hr2}px, 0)`;
        } else if (scrollY >= (4 * vh) & scrollY < (6 * vh)) {
            console.log('3');
            document.documentElement.scrollTop = 4*vh;
              let p = proportion(scrollY, width);
            let hr = parseFloat((width / 10000 * p).toFixed(2));
        
            let scale1 = 1 + hr;
            let scale2 = 1 + (parseFloat(hr) * 0.4);
            let scale3 = 1 + (parseFloat(hr) * 0.2);
             backward.style.opacity = 0;
                backward.style.cursor = 'default';
                item1_1.style.transform = `scale(${scale1}) translate3d(0, ${hr}px, 0)`;
                item1_2.style.transform = `scale(${scale2}) translate3d(0, ${hr}px, 0)`;
                item1_3.style.transform = `scale(${scale3}) translate3d(0, ${hr}px,0)`;
                if (item1_3.style.opacity != 1) {
                    item1_3.style.opacity = 1;
                }
        
            backward.style.cursor = 'pointer';
                backward.style.opacity = 1;
                backward.style.opacity = 1;
                let scrollY2 = scrollY - (2 * vh);
        
                let p2 = proportion(scrollY2, width);
                let hr2 = parseFloat((width / 10000 * p2).toFixed(2));
        
                let scale11 = 1 + hr2;
                let scale21 = 1 + (parseFloat(hr2) * 0.4);
                let scale31 = 1 + (parseFloat(hr2) * 0.2);

                item2_1.style.transform = `scale(${scale11}) translate3d(0, ${hr2}px, 0)`;
                item2_2.style.transform = `scale(${scale21}) translate3d(0, ${hr2}px, 0)`;
                item2_3.style.transform = `scale(${scale31}) translate3d(0, ${hr2}px, 0)`;

            forward.style.opacity = 1;
                forward.style.cursor = 'pointer';
                let scrollY3 = scrollY - (4 * vh);
        
                let p3 = proportion(scrollY3, width);
                let hr3 = parseFloat((width / 10000 * p3).toFixed(2));
        
                let scale12 = 1 + hr3;
                let scale22 = 1 + (parseFloat(hr3) * 0.4);
                let scale32 = 1 + (parseFloat(hr3) * 0.2);

                item3_1.style.transform = `scale(${scale12}) translate3d(0, ${hr3}px, 0)`;
                item3_2.style.transform = `scale(${scale22}) translate3d(0, ${hr3}px, 0)`;
            item3_3.style.transform = `scale(${scale32}) translate3d(0, ${hr3}px, 0)`;
            
           
        }else if (scrollY >= (6 * vh)) {
            document.documentElement.scrollTop = 6 * vh;
                forward.style.opacity = 0;
            forward.style.cursor = 'default';
              let p = proportion(scrollY, width);
            let hr = parseFloat((width / 10000 * p).toFixed(2));
        
            let scale1 = 1 + hr;
            let scale2 = 1 + (parseFloat(hr) * 0.4);
            let scale3 = 1 + (parseFloat(hr) * 0.2);
             backward.style.opacity = 0;
                backward.style.cursor = 'default';
                item1_1.style.transform = `scale(${scale1}) translate3d(0, ${hr}px, 0)`;
                item1_2.style.transform = `scale(${scale2}) translate3d(0, ${hr}px, 0)`;
                item1_3.style.transform = `scale(${scale3}) translate3d(0, ${hr}px,0)`;
                if (item1_3.style.opacity != 1) {
                    item1_3.style.opacity = 1;
                }
        
            backward.style.cursor = 'pointer';
                backward.style.opacity = 1;
                backward.style.opacity = 1;
                let scrollY2 = scrollY - (2 * vh);
        
                let p2 = proportion(scrollY2, width);
                let hr2 = parseFloat((width / 10000 * p2).toFixed(2));
        
                let scale11 = 1 + hr2;
                let scale21 = 1 + (parseFloat(hr2) * 0.4);
                let scale31 = 1 + (parseFloat(hr2) * 0.2);

                item2_1.style.transform = `scale(${scale11}) translate3d(0, ${hr2}px, 0)`;
                item2_2.style.transform = `scale(${scale21}) translate3d(0, ${hr2}px, 0)`;
                item2_3.style.transform = `scale(${scale31}) translate3d(0, ${hr2}px, 0)`;

            forward.style.opacity = 1;
                forward.style.cursor = 'pointer';
                let scrollY3 = scrollY - (4 * vh);
        
                let p3 = proportion(scrollY3, width);
                let hr3 = parseFloat((width / 10000 * p3).toFixed(2));
        
                let scale12 = 1 + hr3;
                let scale22 = 1 + (parseFloat(hr3) * 0.4);
                let scale32 = 1 + (parseFloat(hr3) * 0.2);

                item3_1.style.transform = `scale(${scale12}) translate3d(0, ${hr3}px, 0)`;
                item3_2.style.transform = `scale(${scale22}) translate3d(0, ${hr3}px, 0)`;
            item3_3.style.transform = `scale(${scale32}) translate3d(0, ${hr3}px, 0)`;
            
            }
    

        window.addEventListener('scroll', () => {
            document.querySelector('html').style = 'scroll-behavior:smooth'
            scrollY = this.scrollY;
        
            let p = proportion(scrollY, width);
            let hr = parseFloat((width / 10000 * p).toFixed(2));
        
            let scale1 = 1 + hr;
            let scale2 = 1 + (parseFloat(hr) * 0.4);
            let scale3 = 1 + (parseFloat(hr) * 0.2);

        

            //themes paralax
            if (scrollY >= 0 & scrollY < (2 * vh)) {
                backward.style.opacity = 0;
                backward.style.cursor = 'default';
                item1_1.style.transform = `scale(${scale1}) translate3d(0, ${hr}px, 0)`;
                item1_2.style.transform = `scale(${scale2}) translate3d(0, ${hr}px, 0)`;
                item1_3.style.transform = `scale(${scale3}) translate3d(0, ${hr}px,0)`;
                if (item1_3.style.opacity != 1) {
                    item1_3.style.opacity = 1;
                }
            } else if (scrollY >= (2 * vh) & scrollY < (4 * vh)) {
                backward.style.cursor = 'pointer';
                backward.style.opacity = 1;
                backward.style.opacity = 1;
                let scrollY2 = scrollY - (2 * vh);
        
                let p2 = proportion(scrollY2, width);
                let hr2 = parseFloat((width / 10000 * p2).toFixed(2));
        
                let scale11 = 1 + hr2;
                let scale21 = 1 + (parseFloat(hr2) * 0.4);
                let scale31 = 1 + (parseFloat(hr2) * 0.2);

                item2_1.style.transform = `scale(${scale11}) translate3d(0, ${hr2}px, 0)`;
                item2_2.style.transform = `scale(${scale21}) translate3d(0, ${hr2}px, 0)`;
                item2_3.style.transform = `scale(${scale31}) translate3d(0, ${hr2}px, 0)`;
            
            } else if (scrollY >= (4 * vh) & scrollY < (6 * vh)) {
                forward.style.opacity = 1;
                forward.style.cursor = 'pointer';
                let scrollY3 = scrollY - (4 * vh);
        
                let p3 = proportion(scrollY3, width);
                let hr3 = parseFloat((width / 10000 * p3).toFixed(2));
        
                let scale12 = 1 + hr3;
                let scale22 = 1 + (parseFloat(hr3) * 0.4);
                let scale32 = 1 + (parseFloat(hr3) * 0.2);

                item3_1.style.transform = `scale(${scale12}) translate3d(0, ${hr3}px, 0)`;
                item3_2.style.transform = `scale(${scale22}) translate3d(0, ${hr3}px, 0)`;
                item3_3.style.transform = `scale(${scale32}) translate3d(0, ${hr3}px, 0)`;
            
            } else if (scrollY >= (6 * vh)) {
                forward.style.opacity = 0;
                forward.style.cursor = 'default';
            }

            //transition theme1 à 2
            if (scrollY >= 0 && scrollY < (2 * vh)) {
                // Calculez l'opacité dégressive
                let opacity = 1 - (scrollY - vh) / vh;
                opacity = Math.max(0, Math.min(1, opacity));
                opacity = opacity.toFixed(2);
                item1_3.style.opacity = opacity;
                item1_4.style.opacity = opacity;
            } else if (scrollY >= (2 * vh) && scrollY < (4 * vh)) {
                // Calculez l'opacité dégressive
                item1_4.style.opacity = 0;
                let opacity = 1 - (scrollY - (2.8 * vh)) / vh;
                opacity = Math.max(0, Math.min(1, opacity));
                opacity = opacity.toFixed(2);
                item2_3.style.opacity = opacity;
                item2_4.style.opacity = opacity;
            } else if (scrollY >= (4 * vh) && scrollY <= (6 * vh)) {
                item1_4.style.opacity = 0;
                item2_4.style.opacity = 0;
                // Calculez l'opacité dégressive
                let opacity = 1 - (scrollY - (4.8 * vh)) / vh;
                opacity = Math.max(0, Math.min(1, opacity));
                opacity = opacity.toFixed(2);
                item3_2.style.opacity = opacity;
                item3_3.style.opacity = opacity;
                item3_4.style.opacity = opacity;
            }


            //Affichage des titres
            first: while (this.scrollY > 0 && this.scrollY < (2 * vh - 250)) {
                titre1.classList = 'titre titre1 block';
                titre2.classList = 'titre titre2 hidden';
                titre3.classList = 'titre titre3 hidden';
                titre4.classList = 'titre titre4 hidden';
                break first;
            }
            second: while (this.scrollY >= (2 * vh - 250) && this.scrollY < (4 * vh - 250)) {
                titre1.classList = 'titre titre1 hidden';
                titre2.classList = 'titre titre2 block';
                titre3.classList = 'titre titre3 hidden';
                titre4.classList = 'titre titre4 hidden';
                break second;
            }
            third: while (this.scrollY >= (4 * vh - 250) && this.scrollY < (6 * vh - 250)) {
                titre1.classList = 'titre titre1 hidden';
                titre2.classList = 'titre titre2 hidden';
                titre3.classList = 'titre titre3 block';
                titre4.classList = 'titre titre4 hidden';
                break third;
            }
            fourth: while (this.scrollY >= (6 * vh - 250)) {
                titre1.classList = 'titre titre1 hidden';
                titre2.classList = 'titre titre2 hidden';
                titre3.classList = 'titre titre3 hidden';
                titre4.classList = 'titre titre4 block';
                break fourth;
            }

        });

    }); 
    

let jump = 0;
let maxscroll = document.querySelector('.container').offsetHeight;


forward.addEventListener('click', () => {
    document.querySelector('html').style = 'scroll-behavior:smooth'
    if (window.scrollY >= 0 && window.scrollY < (2 * vh)) {
        jump = (2* vh);
    } else if (window.scrollY >= (2 * vh) && window.scrollY < (4 * vh)) {
        jump = (4 * vh);
    } else if (window.scrollY >= (4 * vh) && window.scrollY < (6 * vh)) {
        jump = (6 * vh);
    } 
    
    document.documentElement.scrollTop = jump;
})

backward.addEventListener('click', () => {
    if (window.scrollY >= 0 && window.scrollY <= (2 * vh)) {
        jump = 0;
    } else if (window.scrollY > (2 * vh) && window.scrollY <= (4 * vh)) {
        jump = (2 * vh);
    } else if (window.scrollY > (4 * vh) && window.scrollY <= (6 * vh)) {
        jump = (4 * vh);
    }
 
    document.documentElement.scrollTop = jump;
}
    
    );
    
    
    let titre4link = document.querySelector('.titre4 a');
    let edito = document.querySelector('.editoAlert');
    let editoClose = document.querySelector('#editoClose');
        
    titre4link.addEventListener('click', (event) => {
            event.preventDefault();
            edito.classList.remove('hidden');
    })
    editoClose.addEventListener('click', () => {
            edito.classList.add('hidden');
    })
    
}


