import { HeroWrapper, HeroTextWrapper, ContentWrapper, OptionsWrapper, Image } from './styles';
import manInCityImage from '../../assets/manTravelsCity.png';
import Header from '../../components/organisms/Header/Header';
import Typography from '../../components/atoms/Typography/Typography';
import LinkOption from '../../components/molecules/LinkOption/LinkOption';

const App = () => (
  <>
    <Header rounded={false} />
    <HeroWrapper>
      <Image src={manInCityImage} />
      <HeroTextWrapper>
        <Typography weight="bold" color="white">
          Let's create
        </Typography>
        <Typography as="span" weight="bold" color="white">
          a playlist{' '}
        </Typography>
        <Typography as="span" color="white" underlined italic>
          together
        </Typography>
      </HeroTextWrapper>
    </HeroWrapper>
    <ContentWrapper>
      <Typography>Select one of available options</Typography>
      <OptionsWrapper>
        <LinkOption to="/">Based on your top artists and tracks</LinkOption>
        <LinkOption to="/">Choose genre or artist you're intereseted in</LinkOption>
        <LinkOption to="/">Update your existing playlist</LinkOption>
      </OptionsWrapper>
    </ContentWrapper>
  </>
);

export default App;
