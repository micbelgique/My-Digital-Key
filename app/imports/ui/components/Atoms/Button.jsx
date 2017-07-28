import styled from 'styled-components';
import { parseToHsl, darken } from 'polished';

const getColor = (color, theme, type) => {
  let finalColor;
  if (color) {
    const themeColor = theme[color];
    finalColor = !themeColor ? color : themeColor;
    if (!finalColor) finalColor = theme.pri;
  } else {
    finalColor = theme.pri;
  }
  if (type === 'bgc') return finalColor;
  if (type === 'color') return parseToHsl(finalColor).lightness > 0.55 ? '#000' : '#FFF';
  if (type === 'hover') return darken(0.1, finalColor);
  if (type === 'hoverColor') return parseToHsl(darken(0.1, finalColor)).lightness > 0.55 ? '#000' : '#FFF';
  return theme.pri;
};

const Button = styled.button`
  cursor: pointer;
  text-align: center;
  display: inline-block;
  min-width: 100px;
  min-height: 3em;
  line-height: 3em;
  margin: 5px 5px 5px 0;
  border-radius: 2px;
  user-select: none;
  box-shadow: 0 0 1px 1px rgba(50, 50, 50, 0.3);
  padding: 0 .5em;
  text-decoration: none;
  transition: all .05s, color .5s, background .5s;
  white-space: nowrap;
  border: none;
  outline: none;
  background: ${({ theme, background }) => getColor(background, theme.buttons, 'bgc')};
  color: ${({ theme, color }) => getColor(color, theme.buttons, 'color')};
  &:hover {
    background: ${({ theme, background }) => getColor(background, theme.buttons, 'hover')};
    color: ${({ theme, background }) => getColor(background, theme.buttons, 'hoverColor')};
  }
  font-size: 1em;
  ${({ full }) => (full && `
    margin: 0;
    display: block;
    height: 100%;
    width: 100%;
    border-radius: initial;
    max-width: none;
    max-height: none;
    box-shadow: none;
  `)};
  ${({ half }) => (half && `
    margin: 0;
    display: inline-block;
    height: 100%;
    width: 50%;
    border-radius: initial;
    max-width: none;
    max-height: none;
    box-shadow: none;
  `)};
  ${props => props.disabled && 'cursor: not-allowed!important;'}
`;

export default Button;
