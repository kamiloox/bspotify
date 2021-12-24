import styled from 'styled-components';
import { hexToRGB } from '../../utils/helpers/helpers';

export const Image = styled.img`
  width: 100%;
  filter: brightness(50%);
  border-radius: 0 0 30px 30px;
  box-shadow: 0px 4px 4px ${({ theme }) => hexToRGB(theme.color.black, 0.25)};

  @media ${({ theme }) => theme.breakpoint.tabletLand} {
    border-radius: 0;
  }
`;

export const HeroWrapper = styled.div`
  position: relative;
`;

export const HeroTextWrapper = styled.div`
  position: absolute;
  bottom: 25px;
  left: 25px;
`;

export const ContentWrapper = styled.main`
  padding: 35px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const OptionsWrapper = styled.div`
  width: 100%;
  padding-top: 15px;

  & > :not(:last-child) {
    margin-bottom: 20px;
  }
`;
