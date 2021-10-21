import Typography from '../../components/atoms/Typography/Typography';
import Button from '../../components/atoms/Button/Button';
import { BACKEND_URL } from '../../utils/constants/constants';
import MainTemplate from '../../components/templates/MainTemplate/MainTemplate';
import { useUserContext } from '../../contexts/UserContext/UserContext';
import { useHistory } from 'react-router-dom';
import TextField from '../../components/molecules/TextField/TextField';

const Home = () => {
  const { isAuthenticated } = useUserContext();
  const history = useHistory();

  const handleLogin = () => {
    if (isAuthenticated) history.push('/app');
    else window.location.replace(`${BACKEND_URL}/auth/login`);
  };

  return (
    <MainTemplate>
      <Button onClick={handleLogin} color="success">
        Login with spotify
      </Button>
      <Typography weight="bold" size="xl" color="error">
        Hello home
      </Typography>
      <TextField label="search track" id="track" />
    </MainTemplate>
  );
};

export default Home;
