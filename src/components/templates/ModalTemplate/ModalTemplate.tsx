import { ReactNode } from 'react';
import { X } from '@styled-icons/bootstrap';
import { Wrapper, Header, DarkBackground, Title } from './styles';
import { useTransition } from '@react-spring/core';
import IconButton from '../../molecules/IconButton/IconButton';

interface ModalTemplateProps {
  children: ReactNode;
  isVisible: boolean;
  title: string;
  onClose: () => void;
}

const ModalTemplate = ({ children, title, isVisible, onClose }: ModalTemplateProps) => {
  const transitions = useTransition(isVisible, {
    from: { opacity: 0, y: '-25%' },
    enter: { opacity: 1, y: '-50%' },
    leave: { opacity: 0, y: '25%' },
  });

  return transitions(
    ({ opacity, y }, item) =>
      item && (
        <>
          <DarkBackground style={{ opacity }} />
          <Wrapper style={{ y, opacity, x: '-50%' }}>
            <Header>
              <Title>{title}</Title>
              <IconButton onClick={onClose} small fitToContent>
                <X size={32} />
              </IconButton>
            </Header>
            {children}
          </Wrapper>
        </>
      )
  );
};

export default ModalTemplate;
