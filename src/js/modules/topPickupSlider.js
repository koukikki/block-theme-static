import Splide from '@splidejs/splide';
import '@splidejs/splide/css';

export const topPickupSlider = () => {
  const sliderElm = document.querySelector('.js-topPickupSlider');
  if (!sliderElm) return;

  const topPickupSlider = new Splide(sliderElm, {
    type: 'loop',
    autoplay: true,
    perPage: 1,
    gap: '1rem',
  });

  topPickupSlider.on('autoplay:playing', function (rate) {
    const topPickupSliderProgress = sliderElm.querySelector(
      '.js-topPickupSliderProgress'
    );
    topPickupSliderProgress.setAttribute('style', `--progress: ${rate * 100}%`);
  });

  topPickupSlider.mount();
};
