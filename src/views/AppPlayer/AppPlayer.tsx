import { HeartFill, XLg, CheckAll } from '@styled-icons/bootstrap';
import { useSprings, animated } from 'react-spring';
import { useDrag } from '@use-gesture/react';
import { templateCss, InnerWrapperPlayer, ButtonsWrapper, InfoWrapper } from './styles';
import MusicPlayer from '../../components/organisms/MusicPlayer/MusicPlayer';
import MainTemplate from '../../components/templates/MainTemplate/MainTemplate';
import useRecommendationsQuery from './useRecommendationsQuery/useRecommendationsQuery';
import IconButton from '../../components/molecules/IconButton/IconButton';
import Typography from '../../components/atoms/Typography/Typography';

const AppPlayer = () => {
  const { data, isLoading } = useRecommendationsQuery();
  const [springsProps, api] = useSprings((data?.length || 0) as number, () => ({
    x: 0,
    y: 0,
    scale: 1,
    rotate: 0,
    zIndex: 1,
  }));

  const bind = useDrag(({ active, movement: [mx], args: [index] }) => {
    api.start((i) => {
      if (index !== i) return;
      const x = active ? mx : 0;
      const zIndex = active ? 10 : 1;
      const scale = active ? 1.03 : 1;
      const rotate = active ? mx * 0.07 : 0;
      return { x, zIndex, scale, rotate };
    });
  });

  if (isLoading) return <p>isLoading...</p>;

  const players = data
    ?.filter(({ preview_url }) => !!preview_url)
    .map(({ id, artists, preview_url, album, name }, index) => {
      const props = springsProps[index];

      return (
        <animated.div style={{ touchAction: 'none', ...props }} {...bind(index)} key={id}>
          <MusicPlayer
            focusable={data.length === index + 1 ? true : false}
            artist={artists.map(({ name }) => name).join(', ')}
            audioSrc={preview_url as string}
            imgSrc={album.images[0].url}
            title={name}
          />
        </animated.div>
      );
    });

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
