import { useState } from 'react';
import EntityListItem from '../../components/molecules/EntityListItem/EntityListItem';
import EntitiesViewTemplate from '../../components/templates/EntitiesViewTemplate/EntitiesViewTemplate';
import MainTemplate from '../../components/templates/MainTemplate/MainTemplate';
import useTopEntitiesQuery, { QueryTypes, QueryReturnType } from '../EntitiesTop/useTopEntitiesQuery';

const TopEntities = () => {
  const [step] = useState<QueryTypes>('tracks');
  const [searchText, setSearchText] = useState('');
  const { data } = useTopEntitiesQuery(step);

  if (!data) return <p>isLoading...</p>;

  let entitiesItems = null;

  if (step === 'artists') {
    const { items } = data as QueryReturnType<'artists'>;
    const filteredItems = items.filter(({ name }) =>
      name.toLowerCase().includes(searchText.toLowerCase())
    );
    entitiesItems = filteredItems.map((item) => (
      <EntityListItem
        id={item.id}
        key={item.id}
        imgSrc={item.images[0].url}
        primaryContent={item.name}
      />
    ));
  } else if (step === 'tracks') {
    const { items } = data as QueryReturnType<'tracks'>;
    const filteredItems = items.filter(
      ({ name, artists }) =>
        name.toLowerCase().includes(searchText.toLowerCase()) ||
        artists
          .map(({ name }) => name)
          .join(', ')
          .toLowerCase()
          .includes(searchText.toLowerCase())
    );
    entitiesItems = filteredItems.map((item) => (
      <EntityListItem
        id={item.id}
        key={item.id}
        imgSrc={item.album.images[0].url}
        primaryContent={item.name}
        secondaryContent={item.artists.map(({ name }) => name).join(', ')}
      />
    ));
  } else if (step === 'genres') {
    const { genres } = data as QueryReturnType<'genres'>;
    const filteredItems = genres.filter((genre) =>
      genre.toLowerCase().includes(searchText.toLowerCase())
    );
    entitiesItems = filteredItems.map((genre) => (
      <EntityListItem id={genre} key={genre} primaryContent={genre} />
    ));
  }

  return (
    <MainTemplate padding="7px 20px" viewportHeight>
      <EntitiesViewTemplate step={step} onSearch={(e) => setSearchText(e.target.value)}>
        {entitiesItems}
      </EntitiesViewTemplate>
    </MainTemplate>
  );
};

export default TopEntities;
