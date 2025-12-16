import { getDeviceInfo } from './getDeviceInfo';
import { gsap } from 'gsap';

export const setMouseStalker = () => {
  const deviceInfo = getDeviceInfo();
  if (deviceInfo.isMobile || deviceInfo.isTablet) {
    const stalkerElm = document.querySelector('.js-mouseStalker');
    if (stalkerElm) {
      stalkerElm.remove();
    }
    return;
  }
  let stalkerElm = document.querySelector('.js-mouseStalker');
  if (!stalkerElm) {
    stalkerElm = document.createElement('div');
    stalkerElm.classList.add('js-mouseStalker', 'l-mouseStalker');
    document.querySelector('body').appendChild(stalkerElm);
  }

  gsap.set(stalkerElm, { xPercent: -50, yPercent: -50 });
  stalkerElm.classList.remove('is-hover');
  stalkerElm.classList.remove('is-click');

  let xTo = gsap.quickTo(stalkerElm, 'x', { duration: 0.8, ease: 'power3' });
  let yTo = gsap.quickTo(stalkerElm, 'y', { duration: 0.8, ease: 'power3' });

  window.addEventListener('mousemove', (e) => {
    xTo(e.clientX);
    yTo(e.clientY);
  });

  const allHoverElm = document.querySelectorAll(
    'a, button, .js-mouseStalker-hover'
  );
  allHoverElm.forEach((hoverElm) => {
    hoverElm.addEventListener('mouseenter', () => {
      stalkerElm.classList.add('is-hover');
    });
    hoverElm.addEventListener('mouseleave', () => {
      stalkerElm.classList.remove('is-hover');
    });

    hoverElm.addEventListener('click', () => {
      stalkerElm.classList.add('is-click');
      setTimeout(() => {
        stalkerElm.classList.remove('is-click');
      }, 100);
    });
  });
};

export const resizeMouseStalker = () => {
  const deviceInfo = getDeviceInfo();
  if (deviceInfo.isMobile || deviceInfo.isTablet) {
    const stalkerElm = document.querySelector('.js-mouseStalker');
    if (stalkerElm) {
      stalkerElm.remove();
    }
    return;
  }
  const stalkerElm = document.querySelector('.js-mouseStalker');
  if (stalkerElm) {
    gsap.set(stalkerElm, { xPercent: -50, yPercent: -50 });
  }
};
