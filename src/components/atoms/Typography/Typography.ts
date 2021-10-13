import styled, { DefaultTheme } from 'styled-components';

interface TypographyProps {
  color?: keyof DefaultTheme['color'];
  size?: keyof DefaultTheme['fontSize'];
  weight?: keyof DefaultTheme['fontWeight'];
  underlined?: boolean;
  italic?: boolean;
}

const Typography = styled.p<TypographyProps>`
  color: ${({ theme, color = 'black' }) => theme.color[color]};
  font-size: ${({ theme, size = 'm' }) => theme.fontSize[size]};
  font-weight: ${({ theme, weight = 'regular' }) => theme.fontWeight[weight]};
  text-decoration: ${({ underlined }) => (underlined ? 'underline' : 'none')};
  font-style: ${({ italic }) => (italic ? 'italic' : 'normal')};
  margin: 0;
`;

export default Typography;
