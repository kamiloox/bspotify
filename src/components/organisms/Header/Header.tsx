import { useState } from 'react';
import styled from 'styled-components';
import { useLocation, Link } from 'react-router-dom';
import { hexToRGB, isRoutePublic } from '../../../utils/helpers/helpers';
import Typography from '../../atoms/Typography/Typography';
import HamburgerButton from '../../molecules/HamburgerButton/HamburgerButton';
import ProfilePicture from '../../atoms/ProfilePicture/ProfilePicture';
import Navigation from '../../molecules/Navigation/Navigation';

interface WrapperProps {
  rounded?: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  background-color: ${({ theme }) => theme.color.black};
  box-shadow: 0px 4px 4px ${({ theme }) => hexToRGB(theme.color.black, 0.25)};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  min-height: 75px;
  border-radius: ${({ rounded = true }) => (rounded ? ' 0 0 25px 25px' : '0')};
`;

interface HeaderProps extends WrapperProps {}

const Header = ({ rounded }: HeaderProps) => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const { pathname } = useLocation();

  const ProfilePictureOrLogo = isRoutePublic(pathname) ? (
    <Link to="/">
      <Typography weight="bold" color="white" underlined italic>
        bspotify.
      </Typography>
    </Link>
  ) : (
    <ProfilePicture />
  );

  return (
    <Wrapper rounded={rounded}>
      {ProfilePictureOrLogo}
      <HamburgerButton onClick={() => setIsMenuActive(!isMenuActive)} isActive={isMenuActive} />
      <Navigation isVisible={isMenuActive} />
    </Wrapper>
  );
};

export default Header;
