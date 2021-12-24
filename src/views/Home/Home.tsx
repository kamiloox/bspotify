import styled, { css } from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Spotify } from '@styled-icons/boxicons-logos';
import { useUserContext } from '../../contexts/UserContext/UserContext';
import { BACKEND_URL } from '../../utils/constants/constants';
import MainTemplate from '../../components/templates/MainTemplate/MainTemplate';
import Typography from '../../components/atoms/Typography/Typography';
import Button from '../../components/atoms/Button/Button';
import routes from '../../utils/routes/routes';
import Hero from '../../components/molecules/Hero/Hero';

const InfoWrapper = styled.div`
  margin: 20px 0 30px;
`;

const ButtonWrapper = styled.div`
  text-align: center;
`;

const templateCss = css`
  @media ${({ theme }) => theme.breakpoint.tabletLand} {
    text-align: center;
    margin: 20px 0;
  }
`;

const Home = () => {
  const { isAuthenticated } = useUserContext();
  const history = useHistory();

  const handleLogin = () => {
    if (isAuthenticated) history.push(routes.features.path);
    else window.location.replace(`${BACKEND_URL}/auth/login`);
  };

  return (
    <MainTemplate padding="40px" css={templateCss}>
      <Hero />
      <Typography size="l" as="span" italic underlined>
        We extend
      </Typography>
      <Typography size="l" as="span" weight="bold">
        {' '}
        your spotify possibilities{' '}
      </Typography>
      <Typography size="l" as="span" italic underlined>
        and we recommend
      </Typography>
      <Typography size="l" as="span" weight="bold">
        {' '}
        songs based on your interests.
      </Typography>
      <InfoWrapper>
        <Typography>
          We help people, find new songs and create playlists with us! Trust our product and give it a
          go!
        </Typography>
      </InfoWrapper>
      <ButtonWrapper>
        <Button onClick={handleLogin} color="success">
          <Spotify size={26} /> Login with spotify
        </Button>
      </ButtonWrapper>
    </MainTemplate>
  );
};

export default Home;
