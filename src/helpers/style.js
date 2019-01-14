import { css } from "styled-components";

const PIXELS_PER_EM = 16;

export const screenSizes = {
  phoneOnly: 599,
  tabletPortraitUp: 600,
  tabletLandscapeUp: 900,
  desktopUp: 1200,
  bigDesktopUp: 1800
};

/*
  by using ${media.phoneOnly`background: dodgerblue;`} inside a styled-component
  we can make the component have a dodgerblue background for devides that have
  the screenwidth of a mobile phone
*/
export const media = Object.keys(screenSizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (${label === "phoneOnly" ? "max-width" : "min-width"}: ${screenSizes[
    label
  ] / PIXELS_PER_EM}em) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});

export const colors = {
  flatFlesh: `#fad390`,
  melonMelody: `#f8c291`,
  mandarinRed: `#e55039`,
  spray: `#82ccdd`,
  paradiseGreen: `#b8e994`,
  dupain: `#60a3bc`,
  auroraGreen: `#78e08f`,

  waterfall: `#38ada9`,
  darkSapphire: `#0c2461`
};
