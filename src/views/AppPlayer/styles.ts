import styled, { css } from 'styled-components';

export const templateCss = css`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
`;

export const InfoWrapper = styled.div`
  text-align: center;
  margin-bottom: 10px;
  line-height: 140%;
`;

export const PlayersWrapper = styled.div`
  display: grid;

  & > * {
    grid-column: 1;
    grid-row: 1;
  }
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  flex: 1;
  & > :nth-child(2) {
    transform: translateY(-8px);
    margin: 0 20px;
  }
`;
