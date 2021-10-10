import styled, { keyframes, css } from 'styled-components';
import { PauseFill, PlayFill } from '@styled-icons/bootstrap';
import IconButton from '../../molecules/IconButton/IconButton';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  & > *:last-child {
    margin-top: 20px;
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

interface StyledIconButtonProps {
  isRotating?: boolean;
}

export const RotatedIconButton = styled(IconButton)<StyledIconButtonProps>`
  ${({ isRotating }) =>
    isRotating &&
    css`
      animation: ${rotate} 2s linear infinite;
    `}
`;

const StyledPlayFill = styled(PlayFill)`
  transform: translateX(2px);
`;

export { PauseFill, StyledPlayFill as PlayFill };
