// core version + navigation, pagination modules:
import Swiper from 'swiper';
import { Autoplay } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/autoplay';

// init Swiper:
const swiper = new Swiper('.swiper1-js', {
  spaceBetween: 0,
  centeredSlides: true,
  loop: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  modules: [Autoplay],
});