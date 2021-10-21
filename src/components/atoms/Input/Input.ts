import styled from 'styled-components';
import { hexToRGB } from '../../../utils/helpers/helpers';

const Input = styled.input`
  font-size: ${({ theme }) => theme.fontSize.m};
  border: 1px solid ${({ theme }) => theme.color.darkGray};
  box-shadow: 0px 2px 4px ${({ theme }) => hexToRGB(theme.color.black, 0.25)};
  border-radius: 4px;
  padding: 10px;
  font-family: inherit;
`;

export default Input;
