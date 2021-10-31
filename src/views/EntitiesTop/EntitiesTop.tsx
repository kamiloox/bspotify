import EntityItem from '../../components/molecules/EntityItem/EntityItem';
import EntitiesViewTemplate from '../../components/templates/EntitiesViewTemplate/EntitiesViewTemplate';
import MainTemplate from '../../components/templates/MainTemplate/MainTemplate';
import useEntitiesData from '../../hooks/useEntitiesData/useEntitiesData';

const TopEntities = () => {
  const { data, step, goToNextStep, setSearchText } = useEntitiesData();

  if (!data) return <p>isLoading...</p>;

  return (
    <MainTemplate padding="7px 20px" viewportHeight>
      <EntitiesViewTemplate
        step={step}
        onSearch={(e) => setSearchText(e.target.value)}
        onSubmit={goToNextStep}
      >
        {data.map((itemData) => (
          <EntityItem {...itemData} />
        ))}
      </EntitiesViewTemplate>
    </MainTemplate>
  );
};

export default TopEntities;
