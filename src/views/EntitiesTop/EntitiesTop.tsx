import styled from 'styled-components';
import { useEffect, useState } from 'react';
import EntityItem from '../../components/molecules/EntityItem/EntityItem';
import MainTemplate from '../../components/templates/MainTemplate/MainTemplate';
import useTopEntities from './useTopEntities/useTopEntities';
import EntitiesViewTemplate from '../../components/templates/EntitiesViewTemplate/EntitiesViewTemplate';
import useIntersectionObserver from '../../hooks/useIntersectionObserver/useIntersectionObserver';
import Progress from '../../components/atoms/Progress/Progress';

const NextPageProgressWrapper = styled.div`
  position: relative;
  min-height: 40px;
`;

const EntitiesTop = () => {
  const [searchText, setSearchText] = useState('');
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useTopEntities(searchText);
  const { elementRef: lastItemRef, isIntersecting } = useIntersectionObserver();

  useEffect(() => {
    if (isIntersecting && hasNextPage) fetchNextPage();
  }, [isIntersecting, hasNextPage, fetchNextPage]);

  const listItems = data.map((itemData, index) => {
    const isLastItem = data.length === index + 1;
    if (isLastItem) return <EntityItem {...itemData} ref={lastItemRef} />;
    return <EntityItem {...itemData} />;
  });

  const fetchingNewPageProgress = (
    <NextPageProgressWrapper>
      <Progress center />
    </NextPageProgressWrapper>
  );

  return (
    <MainTemplate padding="7px 20px" viewportHeight>
      <EntitiesViewTemplate onSearch={(e) => setSearchText(e.target.value)}>
        {isLoading ? <Progress center /> : listItems}
        {isFetchingNextPage && fetchingNewPageProgress}
      </EntitiesViewTemplate>
    </MainTemplate>
  );
};

export default EntitiesTop;
