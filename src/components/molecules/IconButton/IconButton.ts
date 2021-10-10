import styled, { css } from 'styled-components';
import Button from '../../atoms/Button/Button';

interface IconButtonProps {
  small?: boolean;
}

const IconButton = styled(Button)<IconButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  padding: 0;
  ${(props) =>
    props?.small &&
    css`
      width: 40px;
      height: 40px;
    `}
`;

export default IconButton;
