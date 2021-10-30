import styled from 'styled-components';

interface ButtonProps {
  color?: 'primary' | 'error' | 'success';
  fullWidth?: boolean;
}

const Button = styled.button<ButtonProps>`
  background-color: ${({ theme, color = 'primary' }) => theme.color[color]};
  color: ${({ theme }) => theme.color.black};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: ${({ theme }) => theme.fontSize.m};
  width: ${({ fullWidth = false }) => (fullWidth ? '100%' : 'auto')};
  padding: 5px 12px;
  border-radius: 2px;
  display: inline-block;
  cursor: pointer;
  font-family: inherit;
  text-decoration: none;
  border: none;
  transition: all 0.2s;

  &:hover {
    filter: brightness(90%);
  }

  &:active {
    transform: translate(-1px, -2px);
  }
`;

export default Button;
