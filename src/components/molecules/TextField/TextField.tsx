import React from 'react';
import styled from 'styled-components';
import searchIcon from '../../../assets/searchIcon.svg';
import Input from '../../atoms/Input/Input';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSize.s};
  margin-left: 10px;
  transition: all 0.4s;
`;

const StyledInput = styled(Input)`
  position: relative;
  background: url(${searchIcon}) no-repeat calc(100% - 10px) 50%, ${({ theme }) => theme.color.white};
  padding-right: 44px;
  z-index: 1;

  &:placeholder-shown + label {
    transform: translateY(100%);
    opacity: 0;
  }
`;

interface LabelProps {
  id: string;
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextField = ({ id, label, value, onChange }: LabelProps) => (
  <Wrapper>
    <StyledInput value={value} id={id} placeholder={label} onChange={onChange} />
    <Label htmlFor={id}>{label}</Label>
  </Wrapper>
);

export default TextField;
