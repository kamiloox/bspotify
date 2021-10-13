import MusicPlayer from '../../components/organisms/MusicPlayer/MusicPlayer';
import MainTemplate from '../../components/templates/MainTemplate/MainTemplate';

const App = () => (
  <MainTemplate>
    <MusicPlayer
      artist="Bob Marley"
      title="No women, no cry!"
      imgSrc="https://i.scdn.co/image/ab67616d0000b27384397a448d59d383bb0a2e9b"
      audioSrc="https://p.scdn.co/mp3-preview/d283f120c773725e74fc2582099dd6833b237a83?cid=936b203f34664fd9a8f3f63d59b966dc"
    />
  </MainTemplate>
);

export default App;
