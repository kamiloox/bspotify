import { ReactNode, ChangeEvent, MouseEvent } from 'react';
import styled from 'styled-components';
import Button from '../../atoms/Button/Button';
import TextField from '../../molecules/TextField/TextField';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
`;

const EntitiesList = styled.ul`
  margin: 10px 0;
  padding: 5px 0;
  list-style: none;
  overflow-y: auto;
  flex: 1;
  & > :not(:last-child) {
    margin-bottom: 10px;
  }
`;

interface EntitiesViewTemplateProps {
  step: string;
  children: ReactNode;
  onSearch?: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const EntitiesViewTemplate = ({ step, children, onSearch, onSubmit }: EntitiesViewTemplateProps) => (
  <Wrapper>
    <TextField id="search" onChange={onSearch} label={`Search ${step}`} />
    <EntitiesList>{children}</EntitiesList>
    <Button onClick={onSubmit} fullWidth>
      Submit {step}
    </Button>
  </Wrapper>
);

export default EntitiesViewTemplate;
