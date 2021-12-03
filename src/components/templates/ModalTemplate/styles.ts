import styled from 'styled-components';
import { hexToRGB } from '../../../utils/helpers/helpers';
import { animated } from 'react-spring';

export const DarkBackground = styled(animated.div)`
  background-color: ${({ theme }) => hexToRGB(theme.color.black, 0.35)};
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
`;

export const Wrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 15;
`;

export const InnerWrapper = styled(animated.div)`
  background-color: ${({ theme }) => theme.color.white};
  position: fixed;
  top: 50%;
  left: 50%;
  border-radius: 5px;
  width: 80%;
  padding: 8px 12px 14px;
  z-index: 16;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const ContentWrapper = styled.div`
  text-align: center;
`;
