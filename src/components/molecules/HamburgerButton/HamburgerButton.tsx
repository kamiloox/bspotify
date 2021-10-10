import React from 'react';
import { Wrapper, Line, WrapperProps } from './styles';

interface HamburgerButtonProps extends WrapperProps {
  onClick?: (e: React.MouseEvent) => void;
}

const HamburgerButton = ({ isActive, color, onClick }: HamburgerButtonProps) => (
  <Wrapper onClick={onClick} isActive={isActive} color={color}>
    <Line />
    <Line />
    <Line />
  </Wrapper>
);

export default HamburgerButton;
