import Typography from '../../components/atoms/Typography/Typography';
import List from '../../components/molecules/List/List';
import ListItem from '../../components/molecules/ListItem/LIstItem';
import MainTemplate from '../../components/templates/MainTemplate/MainTemplate';
import SavedTracksWrapper from './SavedTracksWrapper/SavedTracksWrapper';
import useSavedTracks from './useSavedTracks/useSavedTracks';

const SavedTracks = () => {
  const { tracksData, isLoading } = useSavedTracks();

  const listItems = tracksData.map((track) => (
    <ListItem
      key={track.id}
      id={track.id}
      primaryContent={track.name}
      secondaryContent={track.artists.map(({ name }) => name).join(', ')}
      imgSrc={track.album.images[0].url}
    />
  ));

  return (
    <MainTemplate viewportHeight>
      <SavedTracksWrapper tracksData={tracksData} isLoading={isLoading}>
        <Typography>Summary</Typography>
        <List>{listItems}</List>
      </SavedTracksWrapper>
    </MainTemplate>
  );
};

export default SavedTracks;
