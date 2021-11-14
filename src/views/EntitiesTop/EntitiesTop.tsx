import { useEffect, useState } from 'react';
import EntityItem from '../../components/molecules/EntityItem/EntityItem';
import MainTemplate from '../../components/templates/MainTemplate/MainTemplate';
import useTopEntities from './useTopEntities/useTopEntities';
import EntitiesViewTemplate from '../../components/templates/EntitiesViewTemplate/EntitiesViewTemplate';
import useIntersectionObserver from '../../hooks/useIntersectionObserver/useIntersectionObserver';

const EntitiesTop = () => {
  const [searchText, setSearchText] = useState('');
  const { data, isLoading, hasNextPage, fetchNextPage } = useTopEntities(searchText);
  const { elementRef: lastItemRef, isIntersecting } = useIntersectionObserver();

  useEffect(() => {
    if (isIntersecting && hasNextPage) fetchNextPage();
  }, [isIntersecting, hasNextPage, fetchNextPage]);

  return (
    <MainTemplate padding="7px 20px" viewportHeight>
      {isLoading ? (
        <p>isLoading...</p>
      ) : (
        <EntitiesViewTemplate onSearch={(e) => setSearchText(e.target.value)}>
          {data.map((itemData, index) => {
            const isLastItem = data.length === index + 1;
            if (isLastItem) return <EntityItem {...itemData} ref={lastItemRef} />;
            return <EntityItem {...itemData} />;
          })}
        </EntitiesViewTemplate>
      )}
    </MainTemplate>
  );
};

export default EntitiesTop;
