import Button from '../../components/atoms/Button/Button';
import AlbumCover from '../../components/molecules/AlbumCover/AlbumCover';
import { BACKEND_URL } from '../../utils/constants/constants';

const App = () => (
  <div>
    <h1>Hello app</h1>
    <Button as="a" href={`${BACKEND_URL}/auth/logout`}>
      Logout
    </Button>
    <AlbumCover
      artist="Bob Marley"
      title="No women, no cry!"
      imgSrc="https://i.scdn.co/image/ab67616d0000b27384397a448d59d383bb0a2e9b"
    />
  </div>
);

export default App;
