import Typography from '../../components/atoms/Typography/Typography';
import Button from '../../components/atoms/Button/Button';
import { BACKEND_URL } from '../../utils/constants/constants';
import MainTemplate from '../../components/templates/MainTemplate/MainTemplate';

const Home = () => (
  <MainTemplate>
    <Button as="a" href={`${BACKEND_URL}/auth/login`} color="success">
      Login with spotify
    </Button>
    <Typography weight="bold" size="xl" color="error">
      Hello home
    </Typography>
  </MainTemplate>
);

export default Home;
