import styled from 'styled-components';

export const columnWidth = 10; // Column width with margin-left and margin-right

export const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.color.white};
  height: 40px;
  display: inline-flex;
  align-items: center;
  & > span:not(:last-child) {
    margin-right: 2px;
  }
`;

interface WaveColumnProps {
  isHighlighted: boolean;
}

export const WaveColumn = styled.span<WaveColumnProps>`
  display: inline-block;
  width: 5px;
  height: 40px;
  border-radius: 2.5px;
  max-width: ${columnWidth}px;
  background-color: ${({ isHighlighted, theme }) =>
    isHighlighted ? theme.color.black : theme.color.gray};
`;
