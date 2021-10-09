import { randomInteger } from '../../../utils/helpers/helpers';
import React, { useMemo } from 'react';
import { Wrapper, WaveColumn, columnWidth } from './styles';
import useAudioWave from './useAudioWave';

interface AudioWaveProps {
  maxWidth: number;
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
}

const AudioWave = ({ maxWidth, audioRef }: AudioWaveProps) => {
  const { progress, changeCurrentTime } = useAudioWave(audioRef);
  const waveHeights = useMemo(
    () =>
      [...Array(maxWidth / columnWidth)].map(() =>
        randomInteger(1, 10) > 7 ? randomInteger(30, 40) : randomInteger(15, 30)
      ),
    [maxWidth]
  );

  return (
    <Wrapper onPointerDown={changeCurrentTime}>
      {waveHeights.map((height, index) => {
        const isHighlighted = progress * maxWidth > columnWidth * index;
        return <WaveColumn style={{ height }} key={index} isHighlighted={isHighlighted} />;
      })}
    </Wrapper>
  );
};

export default AudioWave;
