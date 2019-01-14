import Typography from "typography";
import { colors } from "../helpers/style";

const theme = {
  title: "simons-says-2019",
  baseFontSize: "18px",
  googleFonts: [
    {
      name: 'Libre Barcode 128 Text',
      styles: [],
    },
    {
      name: 'Merriweather',
      styles: ['700'],
    },
    {
      name: 'Source Sans Pro',
      styles: ['400', '400i', '700'],
    }
  ],
  headerFontFamily: ['Merriweather', 'serif'],
  bodyFontFamily: ['Source Sans Pro', 'sans-serif'],
  headerWeight: 700,
  bodyWeight: 400,
  boldWeight: 700,
  overrideStyles: ({ adjustFontSizeTo, scale, rhythm }, options) => ({
    h1: scale(5 / 5),
    h2: scale(3 / 5),
    h3: scale(1 / 5),
    h4: scale(0 / 5),
    h5: scale(-1 / 8),
    h6: {
      ...scale(-2 / 8),
      fontFamily: options.bodyFontFamily.join(','),
      fontWeight: options.bodyWeight,
      textTransform: 'uppercase',
    },
    a: {
      color: colors.darkSapphire,
    },
    'a:visited': {
      color: colors.darkSapphire,
    },
    blockquote: {
      ...scale(1 / 4),
      borderLeft: `${rhythm(1 / 6)} solid`,
      borderColor: '#eaeaeb',
      paddingTop: rhythm(1 / 3),
      paddingBottom: rhythm(1 / 3),
      paddingLeft: rhythm(2 / 3),
      paddingRight: rhythm(2 / 3),
    },
    'blockquote > :last-child': {
      marginBottom: 0,
    },
    'blockquote cite': {
      ...adjustFontSizeTo(options.baseFontSize),
      color: '#eaeaeb',
      fontWeight: options.bodyWeight,
      fontStyle: 'normal',
    },
  }),
}

const typography = new Typography(theme);

export default typography;
