import React from 'react';
import styled from 'styled-components';
import Header from '../../organisms/Header/Header';

const ContentWrapper = styled.div`
  padding: 30px 20px;
`;

interface MainTemplateProps {
  children: React.ReactNode;
}

const MainTemplate = ({ children }: MainTemplateProps) => (
  <>
    <Header />
    <ContentWrapper>{children}</ContentWrapper>
  </>
);

export default MainTemplate;
