import MusicPlayer from '../../components/organisms/MusicPlayer/MusicPlayer';
import MainTemplate from '../../components/templates/MainTemplate/MainTemplate';
import useRecommendationsQuery from './useRecommendationsQuery';

const AppPlayer = () => {
  const { data, isLoading } = useRecommendationsQuery();

  if (isLoading) return <p>isLoading...</p>;

  return (
    <MainTemplate>
      {data && data[0]?.preview_url && (
        <MusicPlayer
          artist={data[0].artists.map(({ name }) => name).join(', ')}
          audioSrc={data[0].preview_url}
          imgSrc={data[0].album.images[0].url}
          title={data[0].name}
        />
      )}
    </MainTemplate>
  );
};

export default AppPlayer;
