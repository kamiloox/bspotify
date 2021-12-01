import { ReactNode, ChangeEvent } from 'react';
import { ArrowLeft, ArrowRight } from '@styled-icons/bootstrap';
import { Wrapper, EntitiesList, BottomButtonsWrapper } from './styles';
import IconButton from '../../molecules/IconButton/IconButton';
import TextField from '../../molecules/TextField/TextField';
import Button from '../../atoms/Button/Button';

interface EntitiesViewTemplateProps {
  children: ReactNode;
  currentStep: string;
  goNext: () => void;
  goBack: () => void;
  submitChoices: () => void;
  onSearch?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const EntitiesViewTemplate = ({
  children,
  currentStep,
  goNext,
  goBack,
  submitChoices,
  onSearch,
}: EntitiesViewTemplateProps) => (
  <Wrapper>
    <TextField id="search" onChange={onSearch} label={`Search ${currentStep}`} />
    <EntitiesList>{children}</EntitiesList>
    <BottomButtonsWrapper>
      <IconButton small onClick={goBack}>
        <ArrowLeft size={24} />
      </IconButton>
      <Button color="success" onClick={submitChoices}>
        Submit choices
      </Button>
      <IconButton small onClick={goNext}>
        <ArrowRight size={24} />
      </IconButton>
    </BottomButtonsWrapper>
  </Wrapper>
);

export default EntitiesViewTemplate;
