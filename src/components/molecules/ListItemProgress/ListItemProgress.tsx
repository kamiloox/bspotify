import styled from 'styled-components';
import Progress from '../../atoms/Progress/Progress';

const Wrapper = styled.div`
  position: relative;
  min-height: 40px;
`;

const ListItemProgress = () => (
  <Wrapper>
    <Progress center />
  </Wrapper>
);

export default ListItemProgress;
