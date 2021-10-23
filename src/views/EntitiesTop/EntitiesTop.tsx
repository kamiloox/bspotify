import { useState } from 'react';
import EntityListItem from '../../components/molecules/EntityListItem/EntityListItem';
import TextField from '../../components/molecules/TextField/TextField';
import MainTemplate from '../../components/templates/MainTemplate/MainTemplate';
import useTopEntitiesQuery, { QueryTypes, QueryReturnType } from '../EntitiesTop/useTopEntitiesQuery';

const TopEntities = () => {
  const [step] = useState<QueryTypes>('tracks');
  const { data } = useTopEntitiesQuery(step);

  if (!data) return <p>isLoading...</p>;

  let entitiesList = null;

  if (step === 'artists') {
    const { items } = data as QueryReturnType<'artists'>;
    entitiesList = items.map((item) => (
      <EntityListItem key={item.id} imgSrc={item.images[0].url} primaryContent={item.name} />
    ));
  } else if (step === 'tracks') {
    const { items } = data as QueryReturnType<'tracks'>;
    entitiesList = items.map((item) => (
      <EntityListItem
        key={item.id}
        imgSrc={item.album.images[0].url}
        primaryContent={item.name}
        secondaryContent={item.artists.map(({ name }) => name).join(', ')}
      />
    ));
  } else if (step === 'genres') {
    const { genres } = data as QueryReturnType<'genres'>;
    entitiesList = genres.map((genre) => <EntityListItem key={genre} primaryContent={genre} />);
  }

  return (
    <MainTemplate>
      <TextField id="search" label="Search item" />
      <ul style={{ margin: 0, padding: 0 }}>{entitiesList}</ul>
    </MainTemplate>
  );
};

export default TopEntities;
