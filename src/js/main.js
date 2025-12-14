import Swup from 'swup';

import { header, getHeaderHeight } from './modules/header.js';
import { setMouseStalker, resizeMouseStalker } from './modules/mouseStalker.js';
import { topPickupSlider } from './modules/topPickupSlider.js';

const swup = new Swup({
  animateHistoryBrowsing: true,
});
header();
setMouseStalker();
topPickupSlider();

swup.hooks.on('page:view', (visit) => {
  // header();
  setMouseStalker();
  topPickupSlider();
});


window.addEventListener('resize', () => {
  getHeaderHeight();
  resizeMouseStalker();
});
