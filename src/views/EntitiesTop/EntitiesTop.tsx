import styled from 'styled-components';
import { useEffect, useState } from 'react';
import ListItem from '../../components/molecules/ListItem/LIstItem';
import MainTemplate from '../../components/templates/MainTemplate/MainTemplate';
import EntitiesViewTemplate from '../../components/templates/EntitiesViewTemplate/EntitiesViewTemplate';
import useIntersectionObserver from '../../hooks/useIntersectionObserver/useIntersectionObserver';
import Progress from '../../components/atoms/Progress/Progress';
import useEntities from '../../hooks/useEntities/useEntities';

const NextPageProgressWrapper = styled.div`
  position: relative;
  min-height: 40px;
`;

const EntitiesTop = () => {
  const [searchText, setSearchText] = useState('');
  const { elementRef: lastItemRef, isIntersecting } = useIntersectionObserver();
  const { hasNextPage, data, fetchNextPage, entityTemplateData, isLoading, isFetchingNextPage } =
    useEntities(['tracks', 'artists'], searchText);

  useEffect(() => {
    if (isIntersecting && hasNextPage) fetchNextPage();
  }, [isIntersecting, hasNextPage, fetchNextPage]);

  const listItems = data.map((itemData, index) => {
    const isLastItem = data.length === index + 1;
    if (isLastItem) return <ListItem {...itemData} ref={lastItemRef} />;
    return <ListItem {...itemData} />;
  });

  const fetchingNewPageProgress = (
    <NextPageProgressWrapper>
      <Progress center />
    </NextPageProgressWrapper>
  );

  return (
    <MainTemplate padding="7px 20px" viewportHeight>
      <EntitiesViewTemplate onSearch={(e) => setSearchText(e.target.value)} {...entityTemplateData}>
        {isLoading ? <Progress center /> : listItems}
        {isFetchingNextPage && fetchingNewPageProgress}
      </EntitiesViewTemplate>
    </MainTemplate>
  );
};

export default EntitiesTop;
