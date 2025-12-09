export const header = () => {
  const toggleMenuButton = document.querySelector('.js-toggleMenuButton');

  toggleMenuButton.addEventListener('click', () => {
    document.body.classList.toggle('menu-open');
  });

  const navElm = document.querySelector('.js-nav')
  // const navLinkElm = navElm.querySelectorAll('a')
  // navLinkElm.forEach(link => {
  //   link.addEventListener('click', () => {
  //     document.body.classList.remove('menu-open');
  //   });
  // });

  // navElmの外側をclickしたら閉じる
  document.addEventListener('click', (event) => {
    if (!navElm.contains(event.target) && !toggleMenuButton.contains(event.target)) {
      document.body.classList.remove('menu-open');
    }
  });
};