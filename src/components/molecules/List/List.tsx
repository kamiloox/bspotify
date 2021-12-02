import styled from 'styled-components';

const List = styled.ul`
  margin: 10px 0;
  padding: 5px 0;
  list-style: none;
  overflow-y: auto;
  flex: 1;
  & > :not(:last-child) {
    margin-bottom: 10px;
  }
`;

export default List;
