import Swup from 'swup';

import { header, getHeaderHeight } from './modules/header.js';
import { setMouseStalker, resizeMouseStalker } from './modules/mouseStalker.js';

const swup = new Swup();
header();
getHeaderHeight();
setMouseStalker();

window.addEventListener('resize', () => {
  getHeaderHeight();
  resizeMouseStalker();
});
