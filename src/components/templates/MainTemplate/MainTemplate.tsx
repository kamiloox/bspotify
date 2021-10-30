import { createRef, ReactNode, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Header from '../../organisms/Header/Header';

interface ContentWrapperProps {
  padding?: string;
}

const ContentWrapper = styled.div<ContentWrapperProps>`
  padding: ${({ padding = '30px 20px' }) => padding};
`;

interface MainTemplateProps extends ContentWrapperProps {
  children: ReactNode;
  roundedHeader?: boolean;
}

const MainTemplate = ({ children, padding, roundedHeader = true }: MainTemplateProps) => {
  const headerRef = createRef<HTMLElement>();
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const setMargin = () => {
      if (!contentRef.current || !headerRef.current) return;
      contentRef.current.style.marginTop = `${headerRef.current.offsetHeight}px`;
    };

    setMargin();
    window.addEventListener('resize', setMargin);
    return () => window.removeEventListener('resize', setMargin);
  }, [headerRef]);

  return (
    <>
      <Header ref={headerRef} rounded={roundedHeader} />
      <ContentWrapper ref={contentRef} padding={padding}>
        {children}
      </ContentWrapper>
    </>
  );
};

export default MainTemplate;
