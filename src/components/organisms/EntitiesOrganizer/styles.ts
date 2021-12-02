import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
`;

export const BottomButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  & > :nth-child(2) {
    margin: 0 20px;
  }
`;
