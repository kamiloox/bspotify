import styled from 'styled-components';
import { hexToRGB } from '../../../utils/helpers/helpers';
import { animated } from 'react-spring';
import Typography from '../../atoms/Typography/Typography';

export const DarkBackground = styled(animated.div)`
  background-color: ${({ theme }) => hexToRGB(theme.color.black, 0.35)};
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
`;

export const Wrapper = styled(animated.div)`
  background-color: ${({ theme }) => theme.color.white};
  max-width: 1200px;
  position: fixed;
  left: 50%;
  top: 50%;
  border-radius: 5px;
  width: 80%;
  padding: 8px 12px 14px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled(Typography)`
  margin-left: 4px;
`;
