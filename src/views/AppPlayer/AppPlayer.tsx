import { HeartFill, XLg, CheckAll } from '@styled-icons/bootstrap';
import { templateCss, InnerWrapperPlayer, ButtonsWrapper, InfoWrapper } from './styles';
import MusicPlayer from '../../components/organisms/MusicPlayer/MusicPlayer';
import MainTemplate from '../../components/templates/MainTemplate/MainTemplate';
import useRecommendationsQuery from './useRecommendationsQuery/useRecommendationsQuery';
import IconButton from '../../components/molecules/IconButton/IconButton';
import Typography from '../../components/atoms/Typography/Typography';

const AppPlayer = () => {
  const { data, isLoading } = useRecommendationsQuery();

  if (isLoading) return <p>isLoading...</p>;

  const players = data
    ?.filter(({ preview_url }) => !!preview_url)
    .map(({ id, artists, preview_url, album, name }, index) => (
      <MusicPlayer
        focusable={data.length === index + 1 ? true : false}
        artist={artists.map(({ name }) => name).join(', ')}
        audioSrc={preview_url as string}
        imgSrc={album.images[0].url}
        title={name}
        key={id}
      />
    ));

  return (
    <MainTemplate css={templateCss} padding="20px">
      <InfoWrapper>
        <Typography size="s">
          recommending songs{' '}
          <Typography as="span" size="s" weight="medium">
            for you
          </Typography>
        </Typography>
        <Typography size="s">
          saved{' '}
          <Typography as="span" size="s" weight="medium">
            n songs
          </Typography>{' '}
          in playlist
        </Typography>
      </InfoWrapper>
      <InnerWrapperPlayer>{players}</InnerWrapperPlayer>
      <ButtonsWrapper>
        <IconButton color="error">
          <XLg size={32} />
        </IconButton>
        <IconButton small>
          <CheckAll size={24} />
        </IconButton>
        <IconButton color="success">
          <HeartFill size={32} />
        </IconButton>
      </ButtonsWrapper>
    </MainTemplate>
  );
};

export default AppPlayer;
