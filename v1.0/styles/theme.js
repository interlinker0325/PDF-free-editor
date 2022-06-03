// REM VALUE of the site
export const SITE_FONT_SIZE = '10px';
export const SITE_MAX_WIDTH = 1280;

const breakpoints = ['768px', '992px', '1200px'];

const colors = {
    base: '#FFFFFF',
    body: '#000000',
    primary: '#337DFF',
    secondary: '#E0E0E0',
    active: '#1A3BFF',
    text: '#B5B5B5'
};

const space = [0, 10, 20, 30, 40, 50, 100, 150, 200];

const fontSizes = [14, 18, 20, 26, 30];
fontSizes.label = ['1.8rem', '1.8rem'];
fontSizes.span = ['2.5rem', '2.5rem'];
fontSizes.button = ['1.4rem', '1.4rem'];
fontSizes.p = ['1.4rem', '1.4rem'];
fontSizes.a = ['1.4rem', '1.4rem'];
fontSizes.h0 = ['4.5rem', '4.5rem'];
fontSizes.h1 = ['3rem', '3rem'];
fontSizes.h2 = ['2rem', '2rem'];
fontSizes.h3 = ['1.8rem', '1.8rem'];
fontSizes.h4 = ['1.4rem', '1.4rem'];

const shadows = {
    card: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
    post: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
    alert: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
}

export const fonts = {
    bigCaslon: '"big_caslonmedium"',
    roboto: '"Roboto", sans-serif',
    stix: '"bigCaslon Two Text", serif',
}
export const theme = {
    breakpoints,
    colors,
    space,
    fontSizes,
    shadows,
    fonts
};
