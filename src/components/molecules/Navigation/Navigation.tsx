import styled, { css } from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useUserContext } from '../../../contexts/UserContext/UserContext';
import Button from '../../atoms/Button/Button';

interface WrapperProps {
  isVisible?: boolean;
}

const Wrapper = styled.nav<WrapperProps>`
  background-color: ${({ theme }) => theme.color.black};
  padding: 100px 40px 0;
  display: flex;
  flex-direction: column;
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

  @media ${({ theme }) => theme.breakpoint.tabletLand} {
    position: static;
    transform: translateX(0);
    padding: 0;
    width: auto;
    opacity: 1;
  }
`;

interface NavigationProps extends WrapperProps {}

const Navigation = ({ isVisible }: NavigationProps) => {
  const { isAuthenticated, logoutUser } = useUserContext();
  const history = useHistory();

  const handleLogin = async () => {
    logoutUser();
    history.push('/');
  };

  return (
    <Wrapper isVisible={isVisible}>
      {isAuthenticated && <Button onClick={handleLogin}>Logout</Button>}
    </Wrapper>
  );
};

export default Navigation;
