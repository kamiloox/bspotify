import { ReactNode, ChangeEvent } from 'react';
import { ArrowLeft, ArrowRight } from '@styled-icons/bootstrap';
import { Wrapper, BottomButtonsWrapper } from './styles';
import List from '../../molecules/List/List';
import IconButton from '../../molecules/IconButton/IconButton';
import TextField from '../../molecules/TextField/TextField';
import Button from '../../atoms/Button/Button';
import searchIcon from '../../../assets/searchIcon.svg';

interface EntitiesOrganizerProps {
  children: ReactNode;
  currentStep: string;
  goNext: () => void;
  goBack: () => void;
  submitChoices: () => void;
  onSearch?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const EntitiesOrganizer = ({
  children,
  currentStep,
  goNext,
  goBack,
  submitChoices,
  onSearch,
}: EntitiesOrganizerProps) => (
  <Wrapper>
    <TextField id="search" onChange={onSearch} label={`Search ${currentStep}`} iconSrc={searchIcon} />
    <List>{children}</List>
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

export default EntitiesOrganizer;
