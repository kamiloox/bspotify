import { forwardRef, useState } from 'react';
import styled from 'styled-components';
import { useLocation, Link } from 'react-router-dom';
import { hexToRGB, isRoutePublic } from '../../../utils/helpers/helpers';
import Typography from '../../atoms/Typography/Typography';
import HamburgerButton from '../../molecules/HamburgerButton/HamburgerButton';
import ProfilePicture from '../../atoms/ProfilePicture/ProfilePicture';
import Navigation from '../../molecules/Navigation/Navigation';
import { useUserContext } from '../../../contexts/UserContext/UserContext';

interface WrapperProps {
  rounded?: boolean;
}

const HamburgerWrapper = styled.div``;

const Wrapper = styled.header<WrapperProps>`
  background-color: ${({ theme }) => theme.color.black};
  box-shadow: 0px 4px 4px ${({ theme }) => hexToRGB(theme.color.black, 0.25)};
  border-radius: ${({ rounded = true }) => (rounded ? ' 0 0 25px 25px' : '0')};
  position: fixed;
  top: 0;
  width: 100%;
  left: 0;
  z-index: 5;
  min-height: 75px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;

  @media ${({ theme }) => theme.breakpoint.tabletLand} {
    & > ${HamburgerWrapper} {
      display: none;
    }
  }
`;

interface HeaderProps extends WrapperProps {}

const Header = forwardRef<HTMLElement, HeaderProps>(({ rounded }: HeaderProps, ref) => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const { pathname } = useLocation();
  const { user } = useUserContext();

  const ProfilePictureOrLogo = isRoutePublic(pathname) ? (
    <Link to="/">
      <Typography weight="bold" color="white" underlined italic>
        bspotify.
      </Typography>
    </Link>
  ) : (
    <ProfilePicture imgSrc={user?.images[0]?.url || undefined} />
  );

  return (
    <Wrapper rounded={rounded} ref={ref}>
      {ProfilePictureOrLogo}
      <HamburgerWrapper>
        <HamburgerButton onClick={() => setIsMenuActive(!isMenuActive)} isActive={isMenuActive} />
      </HamburgerWrapper>
      <Navigation isVisible={isMenuActive} />
    </Wrapper>
  );
});

export default Header;
