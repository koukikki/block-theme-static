import Swup from 'swup';

export const pageMove = () => {
  const swup = new Swup({
    containers: ['#swup'],
  });
  swup.hooks.on('page:view', (visit) => {
    console.log('新しいコンテンツが表示されました');
    console.log(visit.to.url); // 新しいページのURL
  });
};
