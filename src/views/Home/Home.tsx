import Typography from '../../components/atoms/Typography/Typography';
import Button from '../../components/atoms/Button/Button';
import { BACKEND_URL } from '../../utils/constants/constants';

const Home = () => (
  <div>
    <Typography weight="bold" size="xl" color="error">
      Hello home
    </Typography>
    <Button as="a" href={`${BACKEND_URL}/auth/login`} color="success">
      Login with spotify
    </Button>
  </div>
);

export default Home;
