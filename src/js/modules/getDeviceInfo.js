export const getDeviceInfo = () => {
  const userAgent = navigator.userAgent;
  const isMobile = /Mobi|Android/i.test(userAgent);
  const isTablet = /Tablet|iPad/i.test(userAgent);
  const isDesktop = !isMobile && !isTablet;

  return {
    userAgent,
    isMobile,
    isTablet,
    isDesktop
  };
};
