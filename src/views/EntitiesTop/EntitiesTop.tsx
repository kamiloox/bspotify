import { useHistory } from 'react-router-dom';
import EntityItem from '../../components/molecules/EntityItem/EntityItem';
import EntitiesViewTemplate from '../../components/templates/EntitiesViewTemplate/EntitiesViewTemplate';
import MainTemplate from '../../components/templates/MainTemplate/MainTemplate';
import useEntitiesData from '../../hooks/useEntitiesData/useEntitiesData';

const TopEntities = () => {
  const { data, handleSearchText, step, goToStep } = useEntitiesData();
  const history = useHistory();

  if (!data) return <p>isLoading...</p>;

  return (
    <MainTemplate padding="7px 20px" viewportHeight>
      <EntitiesViewTemplate step={step} onSearch={handleSearchText} onSubmit={() => goToStep(history)}>
        {data.map((itemData) => (
          <EntityItem {...itemData} />
        ))}
      </EntitiesViewTemplate>
    </MainTemplate>
  );
};

export default TopEntities;
