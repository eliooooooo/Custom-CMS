let vh = window.innerHeight;


window.onload = function () {

    window.addEventListener('scroll', function (e) {

        let s = this.scrollY;
        let w = this.outerWidth;
        let h = document.getElementsByClassName('paralax')[0].clientWidth;
        let h_b = document.getElementsByClassName('container')[0].clientWidth;
        let p = s / h * 100;
        let p_b = s / h_b * 100;
        let hr_2 = w / 1500 * p_b;
        let scale11 = 1 + (w * 0.00001 * p_b);
        let scale12 = 1 + (w * 0.000019 * p_b);
        let scale13 = 1 + (w * 0.000028 * p_b);
        document.querySelector('.p-item1_3').style.transform = `translate3d(${hr_2}px,0,0) scale(${scale11})`;
        document.querySelector('.p-item1_2').style.transform = `translate3d(${hr_2}px,0,0) scale(${scale12})`;
        document.querySelector('.p-item1_1').style.transform = `translate3d(${hr_2}px,0,0) scale(${scale13})`;
        // document.querySelector('.p-item1_3').style =
        //     `transform: translate3d(${hr_2}px,0,0) scale(${scale11})`;
        // document.querySelector('.p-item1_2').style =
        //     `transform: translate3d(${hr_2}px,0,0) scale(${scale12});`;
        // document.querySelector('.p-item1_1').style =
        //     `transform: translate3d(${hr_2}px,0,0) scale(${scale13});`;

        // if (s > (2*vh - 200)) {
        //     this.document.querySelector('.p-item1_1').style = 'display:none;'
        //     this.document.querySelector('.p-item1_2').style = 'display:none;'
        //     this.document.querySelector('.p-item1_3').style = 'display:none;'
        // }
       

        if (s > (2*vh)) {
            
            let newS = s - 2*vh;
            p = newS / h * 100;
            p_b = newS / h_b * 100;
            let scale21 = 1 + (w * 0.00001 * p_b);
            let scale22 = 1 + (w * 0.000028 * p_b);
            let scale23 = 1 + (w * 0.000038 * p_b);
            let hr_3 = (w / 80000 * p_b);
            document.querySelector('.p-item2_1').style.transform = `scale(${scale21})`;
            document.querySelector('.p-item2_2').style.transform = `scale(${scale22})`;
            document.querySelector('.p-item2_3').style.transform =  `scale(${scale23})`;
            // document.querySelector('.p-item2_1').style = `transform:  scale(${scale21})`;
            // document.querySelector('.p-item2_2').style = `transform:  scale(${scale22})`;
            // document.querySelector('.p-item2_3').style = `transform: scale(${scale23})`;
        }

        //  if (s > (3*vh)) {
        //     this.document.querySelector('.p-item2_1').style = 'display:none;'
        //     this.document.querySelector('.p-item2_2').style = 'display:none;'
        //     this.document.querySelector('.p-item2_3').style = 'display:none;'
        // }



        if (s > (4 * vh)) {
            let newS = s - (4 * vh);
            p = newS / h * 100;
            p_b = newS / h_b * 100;
            let z_5 = 1 + (w * 0.00001 * p_b);
            let hr_5 = (w / 1500 * p_b);
            document.getElementsByClassName('p-item3_1')[0].style = `transform: scale(${z_5})`;
            document.getElementsByClassName('p-item3_2')[0].style = `transform:scale(${z_5})`;
            document.getElementsByClassName('p-item3_3')[0].style = `transform: scale(${z_5})`;
        }

        if (s > (5 * vh)) {
            document.querySelector('.p-item3_2').style = `display:none`;
        }

        //Changement de titres selon scroll

        let titre1 = document.querySelector('.titre1');
        let titre2 = document.querySelector('.titre2');
        let titre3 = document.querySelector('.titre3');
        // let titre4 = document.querySelector('.titre4');


        first: while (this.scrollY > 0 && this.scrollY < (2 * vh - 250)) {
            titre1.classList = 'titre titre1 block';
            titre2.classList = 'titre titre2 hidden';
            break first;
        }
        second: while (this.scrollY >= (2 * vh -250) && this.scrollY < (4 * vh -250)) {
            titre1.classList = 'titre titre1 hidden';
            titre2.classList = 'titre titre2 block';
            titre3.classList = 'titre titre3 hidden';
            break second;
        }
        third: while (this.scrollY >= (4 * vh -250) && this.scrollY < (6 * vh -250)) {
            titre2.classList = 'titre titre2 hidden';
            titre3.classList = 'titre titre3 block';
            //titre4.classList = 'titre titre4 hidden';
            break third;
        }
        // fourth: while (this.scrollY >= (3 * vh) && this.scrollY < (4 * vh)) {
        //     titre3.classList = 'titre titre3 hidden';
        //     titre4.classList = 'titre titre4 block';
        //     break fourth;
        // }

    })

}

let forward = document.querySelector('#forward');
let backward = document.querySelector('#backward');

let jump = 0;
let maxscroll = document.querySelector('.container').offsetHeight;


forward.addEventListener('click', () => {
    if (window.scrollY >= 0 && window.scrollY < (2 * vh)) {
        jump = (2* vh);
    } else if (window.scrollY >= (2 * vh) && window.scrollY < (4 * vh)) {
        jump = (4 * vh);
    } else if (window.scrollY >= (4 * vh) && window.scrollY < (6 * vh)) {
        jump = (6 * vh);
    } else if (window.scrollY >= (6 * vh) && window.scrollY < (8 * vh)) {
        jump = (8 * vh);
    }
    
    window.scroll(0, jump);
})

backward.addEventListener('click', () => {
    if (window.scrollY >= 0 && window.scrollY <= (2 * vh)) {
        jump = 0;
    } else if (window.scrollY > (2 * vh) && window.scrollY <= (4 * vh)) {
        jump = (2 * vh);
    } else if (window.scrollY > (4 * vh) && window.scrollY <= (6 * vh)) {
        jump = (4 * vh);
    } else if (window.scrollY > (6 * vh) && window.scrollY <= (8 * vh)) {
        jump = (6 * vh);
    }
 
    window.scroll(0, jump);
})






