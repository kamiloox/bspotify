import Typography from '../../atoms/Typography/Typography';
import { Wrapper, Image, SongInfoWrapper } from './styles';

interface AlbumCoverProps {
  title: string;
  artist: string;
  imgSrc: string;
}

const AlbumCover = ({ artist, title, imgSrc }: AlbumCoverProps) => (
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
  </Wrapper>
);

export default AlbumCover;
