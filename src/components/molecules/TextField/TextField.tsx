import React from 'react';
import styled, { css } from 'styled-components';
import Input from '../../atoms/Input/Input';

export type TextFieldStatus = 'error' | 'success';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
`;

interface LabelProps {
  status?: TextFieldStatus;
}

const Label = styled.label<LabelProps>`
  font-size: ${({ theme }) => theme.fontSize.s};
  color: ${({ status, theme }) => (status ? theme.color[status] : theme.color.black)};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  margin-left: 6px;
  transition: all 0.4s;
`;

interface StyledInputProps {
  iconSrc?: string;
}

const StyledInput = styled(Input)<StyledInputProps>`
  position: relative;
  z-index: 1;

  &:placeholder-shown + label {
    transform: translateY(100%);
    opacity: 0;
  }

  ${({ iconSrc, theme }) =>
    iconSrc &&
    css`
      background: url(${iconSrc}) no-repeat calc(100% - 10px) 50%, ${theme.color.white};
      padding-right: 44px;
    `}
`;

interface TextFieldProps extends StyledInputProps {
  id: string;
  label: string;
  value?: string;
  status?: TextFieldStatus;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextField = ({ id, label, value, iconSrc, status, onChange }: TextFieldProps) => (
  <Wrapper>
    <StyledInput value={value} id={id} placeholder={label} iconSrc={iconSrc} onChange={onChange} />
    <Label htmlFor={id} status={status}>
      {label}
    </Label>
  </Wrapper>
);

export default TextField;
