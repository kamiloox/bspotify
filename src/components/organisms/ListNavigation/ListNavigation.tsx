import styled from 'styled-components';
import { ArrowLeft, ArrowRight } from '@styled-icons/bootstrap';
import Button from '../../atoms/Button/Button';
import IconButton from '../../molecules/IconButton/IconButton';

const Wrapper = styled.footer`
  display: flex;
  justify-content: space-between;

  & > :nth-child(2) {
    margin: 0 20px;
  }
`;

interface ListNavigationProps {
  onGoBack: () => void;
  onGoNext: () => void;
  onClickSubmit: () => void;
}

const ListNavigation = ({ onGoBack, onGoNext, onClickSubmit }: ListNavigationProps) => (
  <Wrapper>
    <IconButton small onClick={onGoBack}>
      <ArrowLeft size={24} />
    </IconButton>
    <Button color="success" onClick={onClickSubmit}>
      Submit choices
    </Button>
    <IconButton small onClick={onGoNext}>
      <ArrowRight size={24} />
    </IconButton>
  </Wrapper>
);

export default ListNavigation;
