import Swup from 'swup';

import { header, getHeaderHeight } from './modules/header.js';
import { setMouseStalker, resizeMouseStalker } from './modules/mouseStalker.js';
import { topPickupSlider } from './modules/topPickupSlider.js';
import { particleText } from './modules/particleText.js';

const swup = new Swup({
  animateHistoryBrowsing: true,
});
header();
setMouseStalker();
topPickupSlider();
particleText();

const transitionLayer = document.querySelector('.transition-overlay');
 let hideTimeout;

        // ページ遷移開始時
        swup.hooks.on('animation:out:start', () => {
            // タイムアウトをクリア（連続クリック対策）
            if (hideTimeout) {
                clearTimeout(hideTimeout);
            }
            
            // レイヤーを表示
            transitionLayer.classList.add('is-visible');
        });

        // ページ遷移完了時（新しいコンテンツが挿入された後）
        swup.hooks.on('animation:in:end', () => {
          // 0.5秒後にレイヤーを非表示
          hideTimeout = setTimeout(() => {
              transitionLayer.classList.remove('is-visible');
              transitionLayer.classList.add('is-last');
              setTimeout(() => {
                  transitionLayer.classList.remove('is-last');
              }, 500);
            }, 500);
        });

swup.hooks.on('page:view', (visit) => {
  // header();
  setMouseStalker();
  topPickupSlider();
  particleText();
});

window.addEventListener('resize', () => {
  getHeaderHeight();
  resizeMouseStalker();
});
