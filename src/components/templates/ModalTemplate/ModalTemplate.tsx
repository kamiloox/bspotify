import { ReactNode } from 'react';
import { X } from '@styled-icons/bootstrap';
import { Wrapper, InnerWrapper, Header, ContentWrapper, DarkBackground } from './styles';
import Typography from '../../atoms/Typography/Typography';
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
    from: { opacity: 0, y: -300 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: -300 },
  });

  return transitions(
    ({ opacity, y }, item) =>
      item && (
        <>
          <DarkBackground style={{ opacity }} />
          <Wrapper>
            <InnerWrapper style={{ y, opacity, x: '-50%' }}>
              <Header>
                <Typography>{title}</Typography>
                <IconButton onClick={onClose} small fitToContent>
                  <X size={32} />
                </IconButton>
              </Header>
              <ContentWrapper>{children}</ContentWrapper>
            </InnerWrapper>
          </Wrapper>
        </>
      )
  );
};

export default ModalTemplate;
