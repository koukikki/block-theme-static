import Swup from 'swup';

import { header, getHeaderHeight } from './modules/header.js';
import { setMouseStalker, resizeMouseStalker } from './modules/mouseStalker.js';

const swup = new Swup();
header();
setMouseStalker();

swup.hooks.on('page:view', (visit) => {
  // header();
  // setMouseStalker();
});


window.addEventListener('resize', () => {
  getHeaderHeight();
  resizeMouseStalker();
});
