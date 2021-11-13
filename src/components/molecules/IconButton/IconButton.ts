import styled, { css } from 'styled-components';
import Button from '../../atoms/Button/Button';

interface IconButtonProps {
  small?: boolean;
  fitToContent?: boolean;
  p?: string;
}

const IconButton = styled(Button)<IconButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  padding: ${({ p = '0' }) => p};
  ${({ small = false }) =>
    small &&
    css`
      width: 40px;
      height: 40px;
    `}

  ${({ fitToContent = false }) =>
    fitToContent &&
    css`
      width: auto;
      height: auto;
    `}
`;

export default IconButton;
