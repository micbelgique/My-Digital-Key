const colors = {
  text: '#494949',
  primary: '#E6E7E9',
  secondary: '#F4F4F7',
  tertiary: '#606060',
  border: '#B3B3B3',
  borderActive: '#6B6B6B',
};

const buttons = {
  pri: '#498BF1',
  pos: '#2CA94E',
  neg: '#D62E32',
  neu: '#E9EAEC',
  spe: '#848484',
  warn: '#F38237',
};

const header = {
  bgc: colors.secondary,
  height: '60px',
  zIndex: 998,
  button: {
    openBgc: colors.primary,
    hoverBgc: colors.primary,
    bgi: '/img/logo.png',
    height: '60px',
    width: '60px',
  },
};

const modal = {
  zIndex: 997,
  wrapperBgc: colors.primary,
  head: {
    height: '50px',
  },
  close: {
    width: '60px',
  },
};

const menu = {
  zIndex: 998,
  bgc: colors.secondary,
  width: '250px',
};

const main = {
  zIndex: 985,
};

export default {
  colors,
  buttons,
  header,
  menu,
  main,
  modal,
};

