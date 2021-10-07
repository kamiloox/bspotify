import styled, { DefaultTheme } from 'styled-components';

interface TypographyProps {
  color?: keyof DefaultTheme['color'];
  size?: keyof DefaultTheme['fontSize'];
  weight?: keyof DefaultTheme['fontWeight'];
}

const Typography = styled.p<TypographyProps>`
  color: ${({ theme, color = 'black' }) => theme.color[color]};
  font-size: ${({ theme, size = 'm' }) => theme.fontSize[size]};
  font-weight: ${({ theme, weight = 'regular' }) => theme.fontWeight[weight]};
  margin: 6px 0;
`;

export default Typography;
