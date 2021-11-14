import { useState } from 'react';
import EntityItem from '../../components/molecules/EntityItem/EntityItem';
import MainTemplate from '../../components/templates/MainTemplate/MainTemplate';
import useTopEntities from './useTopEntities/useTopEntities';
import EntitiesViewTemplate from '../../components/templates/EntitiesViewTemplate/EntitiesViewTemplate';

const EntitiesTop = () => {
  const [searchText, setSearchText] = useState('');
  const { data, isLoading } = useTopEntities(searchText);

  if (isLoading) return <p>isLoading...</p>;

  return (
    <MainTemplate padding="7px 20px" viewportHeight>
      <EntitiesViewTemplate onSearch={(e) => setSearchText(e.target.value)}>
        {data.map((itemData) => (
          <EntityItem {...itemData} />
        ))}
      </EntitiesViewTemplate>
    </MainTemplate>
  );
};

export default EntitiesTop;
