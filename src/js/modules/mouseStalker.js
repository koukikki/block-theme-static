import { getDeviceInfo } from "./getDeviceInfo";
import { gsap } from "gsap";

export const setMouseStalker = () => {
  const deviceInfo = getDeviceInfo();
  if (deviceInfo.isMobile || deviceInfo.isTablet) {
    const stalkerElm = document.querySelector('.js-mouseStalker');
    if (stalkerElm) {
      stalkerElm.remove();
    }
    return;
  }
  const stalkerElm = document.createElement('div');
  stalkerElm.classList.add('js-mouseStalker', 'l-mouseStalker');
  document.querySelector('.l-siteWrapper').appendChild(stalkerElm);

  gsap.set(stalkerElm, {xPercent: -50, yPercent: -50});

  let xTo = gsap.quickTo(stalkerElm, "x", {duration: 0.8, ease: "power3"});
  let yTo = gsap.quickTo(stalkerElm, "y", {duration: 0.8, ease: "power3"});

  window.addEventListener("mousemove", e => {
    xTo(e.clientX);
    yTo(e.clientY);
  });

  const allHoverElm = document.querySelectorAll('a, button, .js-mouseStalker-hover');
  allHoverElm.forEach(hoverElm => {
    hoverElm.addEventListener('mouseenter', () => {
      stalkerElm.classList.add('is-hover');
    });
    hoverElm.addEventListener('mouseleave', () => {
      stalkerElm.classList.remove('is-hover');
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
    gsap.set(stalkerElm, {xPercent: -50, yPercent: -50});
  }
};
