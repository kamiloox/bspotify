import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { Check } from '@styled-icons/bootstrap';
import { hexToRGB } from '../../../utils/helpers/helpers';
import Typography from '../../atoms/Typography/Typography';

const Wrapper = styled.li`
  box-shadow: 0px 4px 4px ${({ theme }) => hexToRGB(theme.color.black, 0.25)};
  border: 1px solid ${({ theme }) => theme.color.black};
  display: flex;
  align-items: center;
  list-style: none;
  border-radius: 5px;
  padding: 10px;
  transition: all 0.2s;
  min-height: 56px;

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

export interface EntityItemProps {
  id: string;
  primaryContent: string;
  isSelected?: boolean;
  secondaryContent?: string;
  imgSrc?: string;
  onClick?: (e: React.MouseEvent, id: string) => void;
}

const EntityItem = forwardRef<HTMLLIElement, EntityItemProps>(
  ({ id, imgSrc, primaryContent, secondaryContent, isSelected = false, onClick = () => {} }, ref) => (
    <Wrapper tabIndex={0} onClick={(e) => onClick(e, id)} ref={ref}>
      {imgSrc && <Image src={imgSrc} />}
      <ContentWrapper>
        <Typography weight="medium">{primaryContent}</Typography>
        {secondaryContent && <Typography size="s">{secondaryContent}</Typography>}
      </ContentWrapper>
      <CheckWrapper>{isSelected && <Check size={32} />}</CheckWrapper>
    </Wrapper>
  )
);

export default EntityItem;
