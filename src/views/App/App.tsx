import { HeroWrapper, HeroTextWrapper, ContentWrapper, OptionsWrapper, Image } from './styles';
import manInCityImage from '../../assets/manTravelsCity.png';
import Typography from '../../components/atoms/Typography/Typography';
import LinkOption from '../../components/molecules/LinkOption/LinkOption';
import routes from '../../utils/routes/routes';
import MainTemplate from '../../components/templates/MainTemplate/MainTemplate';

const App = () => (
  <MainTemplate roundedHeader={false} padding="0">
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
        <LinkOption to={routes.entitiesTop.path}>Based on your top artists and tracks</LinkOption>
        <LinkOption to={routes.entitiesSearch.path}>
          Choose genre or artist you're intereseted in
        </LinkOption>
        <LinkOption to={routes.entitiesExisting.path}>Update your existing playlist</LinkOption>
      </OptionsWrapper>
    </ContentWrapper>
  </MainTemplate>
);

export default App;
