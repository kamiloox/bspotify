import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
`;

export const EntitiesList = styled.ul`
  margin: 10px 0;
  padding: 5px 0;
  list-style: none;
  overflow-y: auto;
  flex: 1;
  & > :not(:last-child) {
    margin-bottom: 10px;
  }
`;

export const BottomButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  & > :nth-child(2) {
    margin: 0 20px;
  }
`;
