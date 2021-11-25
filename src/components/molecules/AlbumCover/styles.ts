import styled from 'styled-components';
import { Disc } from '@styled-icons/bootstrap';
import { hexToRGB } from '../../../utils/helpers/helpers';

export const Wrapper = styled.div`
  position: relative;
  height: 300px;
  width: 300px;
  border-radius: 20px;
  overflow: hidden;
  z-index: 1;

  &::after {
    background-color: ${({ theme }) => hexToRGB(theme.color.black, 0.3)};
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 2;
  }
`;

export const SongInfoWrapper = styled.div`
  background-color: ${({ theme }) => hexToRGB(theme.color.black, 0.7)};
  padding: 8px 14px;
  position: absolute;
  width: 100%;
  bottom: 0;
  z-index: 3;
`;

export const CoverBackground = styled.div`
  background-color: ${({ theme }) => theme.color.darkGray};
  position: relative;
  width: 100%;
  height: 100%;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
`;

export const CenteredContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 4;
`;

const StyledDisc = styled(Disc)`
  color: ${({ theme }) => theme.color.white};
  position: absolute;
  top: 20px;
  left: 20px;
`;

export { StyledDisc as Disc };
