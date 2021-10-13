import styled, { css } from 'styled-components';
import { BACKEND_URL } from '../../../utils/constants/constants';
import Button from '../../atoms/Button/Button';

interface WrapperProps {
  isVisible?: boolean;
}

const Wrapper = styled.nav<WrapperProps>`
  background-color: ${({ theme }) => theme.color.black};
  padding-top: 80px;
  display: fixed;
  justify-content: center;
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: 75%;
  opacity: 0;
  z-index: 15;
  transform: translateX(100%);
  transition: all 0.3s;

  ${({ isVisible = false }) =>
    isVisible &&
    css`
      transform: translateX(0);
      opacity: 1;
    `}
`;

interface NavigationProps extends WrapperProps {}

const Navigation = ({ isVisible }: NavigationProps) => (
  <Wrapper isVisible={isVisible}>
    <Button as="a" href={`${BACKEND_URL}/auth/logout`}>
      Logout
    </Button>
  </Wrapper>
);

export default Navigation;
