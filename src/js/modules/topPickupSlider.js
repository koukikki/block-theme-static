import Splide from '@splidejs/splide';
import '@splidejs/splide/css';

export const topPickupSlider = () => {
  const sliderElm = document.querySelector('.js-topPickupSlider');
  if (!sliderElm) return;

  new Splide(sliderElm, {
    type       : 'loop',
    autoplay   : true,
    perPage    : 1,
    gap        : '1rem',
  }).mount();
};