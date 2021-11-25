import React from 'react';
import Typography from '../../atoms/Typography/Typography';
import { Wrapper, SongInfoWrapper, CenteredContent, CoverBackground, Disc, Image } from './styles';

interface AlbumCoverProps {
  title: string;
  artist: string;
  imgSrc?: string;
  children?: React.ReactChild;
}

const AlbumCover = ({ artist, title, imgSrc, children }: AlbumCoverProps) => (
  <Wrapper>
    <CoverBackground>
      {imgSrc ? <Image src={imgSrc} alt={`One of ${artist} album`} /> : <Disc size={40} />}
    </CoverBackground>
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
