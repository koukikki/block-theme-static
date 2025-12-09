import { header } from './modules/header.js';
header();

import { setMouseStalker, resizeMouseStalker } from './modules/mouseStalker.js';
setMouseStalker();
window.addEventListener('resize', () => {
  resizeMouseStalker();
});
