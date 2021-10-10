import React from 'react';
import styled from 'styled-components';
import blankProfilePicture from '../../../assets/blankProfilePicture.png';

const Wrapper = styled.button`
  border: none;
  background-color: transparent;
  padding: 0;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.color.white};
  width: 32px;
  height: 32px;
  transition: transform 0.2s;

  &:active {
    transform: translate(-1px, -2px);
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;

interface ProfilePictureProps {
  imgSrc?: string;
  onClick?: (e: React.MouseEvent) => void;
}

const ProfilePicture = ({ imgSrc, onClick }: ProfilePictureProps) => (
  <Wrapper onClick={onClick}>
    <Image src={imgSrc || blankProfilePicture} alt="Current user profile picture" />
  </Wrapper>
);

export default ProfilePicture;
