import { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { X } from '@styled-icons/bootstrap';
import Typography from '../../atoms/Typography/Typography';
import IconButton from '../IconButton/IconButton';

interface WrapperProps {
  variant?: 'warning' | 'success' | 'error';
  isShowed?: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  background-color: ${({ theme, variant = 'warning' }) =>
    theme.color[variant === 'warning' ? 'primary' : variant]};
  position: fixed;
  left: 50%;
  opacity: 0;
  visibility: hidden;
  transform: translateX(-50%);
  bottom: 100px;
  min-width: 240px;
  max-width: 80vw;
  display: flex;
  align-items: center;
  padding: 14px 7px 14px 14px;
  border-radius: 6px;
  transition: all 0.2s;

  ${({ isShowed = false }) =>
    isShowed &&
    css`
      opacity: 1;
      visibility: visible;
    `}
`;

const MessageWrapper = styled.div`
  flex: 1;
  text-align: center;
`;

export interface ToastProps extends WrapperProps {
  children: ReactNode;
  onClose?: () => void;
}

const Toast = ({ children, variant, isShowed, onClose }: ToastProps) => (
  <Wrapper variant={variant} isShowed={isShowed} role="alert">
    <MessageWrapper>
      <Typography weight="medium">{children}</Typography>
    </MessageWrapper>
    <IconButton fitToContent color={variant === 'warning' ? 'primary' : variant}>
      <X size={32} onClick={onClose} />
    </IconButton>
  </Wrapper>
);

export default Toast;
