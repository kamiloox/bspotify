import styled, { css, DefaultTheme } from 'styled-components';

export interface WrapperProps {
  isActive?: boolean;
  color?: keyof DefaultTheme['color'];
}

export const Wrapper = styled.button<WrapperProps>`
  background-color: transparent;
  height: 23px;
  width: 35px;
  padding: 5px;
  border: none;
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;

  & > * {
    background-color: ${({ theme, color = 'white' }) => theme.color[color]};
  }

  & > :last-child {
    width: 70%;
  }

  ${({ isActive = false }) =>
    isActive &&
    css`
      & > :first-child {
        transform: rotate(-45deg) translate(-4px, 4px);
      }

      & > :nth-child(2) {
        opacity: 0;
      }

      & > :last-child {
        width: 100%;
        transform: rotate(45deg) translate(-4px, -4px);
      }
    `}
`;

export const Line = styled.span`
  display: block;
  height: 2px;
  width: 100%;
  border-radius: 1px;
  transition: all 0.2s;
`;
