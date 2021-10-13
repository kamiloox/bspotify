import { useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router';
import { hexToRGB } from '../../../utils/helpers/helpers';
import { AUTHENTICATED_ROUTES } from '../../../utils/constants/constants';
import Typography from '../../atoms/Typography/Typography';
import HamburgerButton from '../../molecules/HamburgerButton/HamburgerButton';
import ProfilePicture from '../../atoms/ProfilePicture/ProfilePicture';

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.color.black};
  box-shadow: 0px 4px 4px ${({ theme }) => hexToRGB(theme.color.black, 0.25)};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  min-height: 75px;
  border-radius: 0 0 25px 25px;
`;

const Header = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const location = useLocation();

  const ProfilePictureOrLogo = AUTHENTICATED_ROUTES.includes(location.pathname) ? (
    <ProfilePicture />
  ) : (
    <Typography as="a" href="/" weight="bold" color="white" underlined italic>
      bspotify.
    </Typography>
  );

  return (
    <Wrapper>
      {ProfilePictureOrLogo}
      <HamburgerButton onClick={() => setIsMenuActive(!isMenuActive)} isActive={isMenuActive} />
    </Wrapper>
  );
};

export default Header;
