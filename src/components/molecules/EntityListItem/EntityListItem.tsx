import styled from 'styled-components';
import { Check } from '@styled-icons/bootstrap';
import { hexToRGB } from '../../../utils/helpers/helpers';
import Typography from '../../atoms/Typography/Typography';
import React from 'react';

const Wrapper = styled.li`
  box-shadow: 0px 4px 4px ${({ theme }) => hexToRGB(theme.color.black, 0.25)};
  border: 1px solid ${({ theme }) => theme.color.black};
  display: flex;
  align-items: center;
  list-style: none;
  border-radius: 5px;
  padding: 10px;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => hexToRGB(theme.color.black, 0.05)};
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
`;

const CheckWrapper = styled.div`
  width: 32px;
`;

const Image = styled.img`
  border: 1px solid ${({ theme }) => theme.color.black};
  height: 36px;
  width: 36px;
  margin-right: 12px;
  border-radius: 50%;
`;

interface EntityListItemProps {
  primaryContent: string;
  secondaryContent?: string;
  imgSrc?: string;
  onClick?: (e: React.MouseEvent) => void;
}

const EntityListItem = ({ imgSrc, primaryContent, secondaryContent, onClick }: EntityListItemProps) => (
  <Wrapper tabIndex={0} onClick={onClick}>
    <Image src={imgSrc} />
    <ContentWrapper>
      <Typography weight="medium">{primaryContent}</Typography>
      {secondaryContent && <Typography size="s">{secondaryContent}</Typography>}
    </ContentWrapper>
    <CheckWrapper>
      <Check size={32} />
    </CheckWrapper>
  </Wrapper>
);

export default EntityListItem;
