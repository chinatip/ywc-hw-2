import { css } from 'styled-components';

const sizes = {
  smallMobile: 360,
  mobile: 600,
  tablet: 780,
  small: 1000,
  medium: 1270,
  big: 1366,  
  giant: 1480,
  super: 2000,
};

export const media = Object.keys(sizes).reduce((accumulator, label) => {
  accumulator[label] = (...args) => css`
    @media (max-width: ${sizes[label]}px) {
      ${css(...args)}
    }
  `
  return accumulator;
}, {});

export const mediaExceed = Object.keys(sizes).reduce((accumulator, label) => {
  accumulator[label] = (...args) => css`
    @media (min-width: ${sizes[label]}px) {
      ${css(...args)}
    }
  `
  return accumulator;
}, {});