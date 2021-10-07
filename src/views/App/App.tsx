import Button from '../../components/atoms/Button/Button';
import { BACKEND_URL } from '../../utils/constants/constants';

const App = () => (
  <div>
    <h1>Hello app</h1>
    <Button as="a" href={`${BACKEND_URL}/auth/logout`}>
      Logout
    </Button>
  </div>
);

export default App;
