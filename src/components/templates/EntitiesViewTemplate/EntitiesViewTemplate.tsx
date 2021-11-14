import { ReactNode, ChangeEvent } from 'react';
import { ArrowLeft, ArrowRight } from '@styled-icons/bootstrap';
import { Wrapper, EntitiesList, BottomButtonsWrapper } from './styles';
import IconButton from '../../molecules/IconButton/IconButton';
import TextField from '../../molecules/TextField/TextField';
import Button from '../../atoms/Button/Button';
import { useAppContext } from '../../../contexts/AppContext/AppContext';
import { useHistory } from 'react-router';

interface EntitiesViewTemplateProps {
  children: ReactNode;
  onSearch?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const EntitiesViewTemplate = ({ children, onSearch }: EntitiesViewTemplateProps) => {
  const { goToStep, submitChoices, step } = useAppContext();
  const history = useHistory();

  return (
    <Wrapper>
      <TextField id="search" onChange={onSearch} label={`Search ${step}`} />
      <EntitiesList>{children}</EntitiesList>
      <BottomButtonsWrapper>
        <IconButton small onClick={() => goToStep(history, 'previous')}>
          <ArrowLeft size={24} />
        </IconButton>
        <Button color="success" onClick={() => submitChoices(history)}>
          Submit choices
        </Button>
        <IconButton small onClick={() => goToStep(history, 'next')}>
          <ArrowRight size={24} />
        </IconButton>
      </BottomButtonsWrapper>
    </Wrapper>
  );
};

export default EntitiesViewTemplate;
