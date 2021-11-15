import { createRef, ReactNode, useEffect, useRef } from 'react';
import styled, { FlattenSimpleInterpolation } from 'styled-components';
import Header from '../../organisms/Header/Header';

interface ContentWrapperProps {
  padding?: string;
  viewportHeight?: boolean;
  css?: FlattenSimpleInterpolation;
}

const ContentWrapper = styled.div<ContentWrapperProps>`
  padding: ${({ padding = '30px 20px' }) => padding};
  overflow-y: ${({ viewportHeight }) => (viewportHeight ? 'hidden' : 'auto')};
  ${(props) => (props.css ? props.css : '')};
`;

interface MainTemplateProps extends ContentWrapperProps {
  children: ReactNode;
  roundedHeader?: boolean;
}

const MainTemplate = ({
  children,
  padding,
  viewportHeight,
  roundedHeader = true,
  css,
}: MainTemplateProps) => {
  const headerRef = createRef<HTMLElement>();
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const setMargin = () => {
      if (!contentRef.current || !headerRef.current) return;
      if (viewportHeight) {
        const contentHeight = window.innerHeight - headerRef.current.offsetHeight;
        contentRef.current.style.height = `${contentHeight}px`;
      }
      contentRef.current.style.marginTop = `${headerRef.current.offsetHeight}px`;
    };

    setMargin();
    window.addEventListener('resize', setMargin);
    return () => window.removeEventListener('resize', setMargin);
  }, [headerRef, viewportHeight]);

  return (
    <>
      <Header ref={headerRef} rounded={roundedHeader} />
      <ContentWrapper ref={contentRef} padding={padding} viewportHeight={viewportHeight} css={css}>
        {children}
      </ContentWrapper>
    </>
  );
};

export default MainTemplate;
