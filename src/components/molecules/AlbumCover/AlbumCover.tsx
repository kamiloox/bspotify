import React from 'react';
import Typography from '../../atoms/Typography/Typography';
import { Wrapper, Image, SongInfoWrapper, CenteredContent } from './styles';

interface AlbumCoverProps {
  title: string;
  artist: string;
  imgSrc: string;
  children?: React.ReactChild;
}

const AlbumCover = ({ artist, title, imgSrc, children }: AlbumCoverProps) => (
  <Wrapper>
    <Image src={imgSrc} alt={`One of ${artist} album`} />
    <SongInfoWrapper>
      <Typography color="white" weight="medium">
        {title}
      </Typography>
      <Typography color="white" size="s">
        {artist}
      </Typography>
    </SongInfoWrapper>
    {children && <CenteredContent>{children}</CenteredContent>}
  </Wrapper>
);

export default AlbumCover;
