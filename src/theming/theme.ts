import { createMuiTheme } from '@material-ui/core';
import Merriweather from './fonts/Merriweather/Merriweather-Regular.ttf';
import Montserrat from './fonts/Montserrat/Montserrat-Regular.ttf';

const merriweather = {
    fontFamily: 'Merriweather',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 400,
    src: `
    local('Merriweather'),
    local('Merriweather-Regular'),
    url(${Merriweather}) format('ttf')
  `,
    unicodeRange:
        'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};

const montserrat = {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 400,
    src: `
	  local('Montserrat'),
	  local('Montserrat-Regular'),
	  url(${Montserrat}) format('ttf')
	`,
    unicodeRange:
        'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};

const theme = createMuiTheme({
    overrides: {
        MuiTableSortLabel: {
            root: {
                color: '#fff',
                '&:hover': {
                    color: '#fff',
                },
                '&$active': {
                    color: '#fff',
                },
            },
            icon: {
                color: '#fff !important',
            },
        },
        MuiToggleButton: {
            root: {
                '&.Mui-selected': {
                    color: '#1BBC9B',
                },
            },
        },
    },
    palette: {
        primary: { main: '#2D3E50' },
        secondary: { main: '#1BBC9B' },
        text: {
            primary: '#2D3E50',
            secondary: '#2D3E50',
        },
        background: {
            default: '#f5f5f5',
        },
    },
    typography: {
        body1: montserrat,
        body2: montserrat,
        h1: merriweather,
        h2: merriweather,
        h3: merriweather,
        h4: merriweather,
        h5: merriweather,
        h6: merriweather,
        button: merriweather,
    },
} as any);

export default theme;
