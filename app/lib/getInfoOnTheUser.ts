'use client';
export const getInfoOnTheUser = () => {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
    userAgent: window.navigator.userAgent,
  };
};
