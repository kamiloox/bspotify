import { randomInteger } from '../../../utils/helpers/helpers';
import React, { useMemo } from 'react';
import { Wrapper, WaveColumn, columnWidth } from './styles';
import useAudioWave from './useAudioWave';

interface AudioWaveProps {
  maxWidth: number;
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  focusable?: boolean;
}

const AudioWave = ({ maxWidth, audioRef, focusable = false }: AudioWaveProps) => {
  const { progress, handleKeyDown, handleMove, handleRelease, handleClick } = useAudioWave(audioRef);
  const columnHeights = useMemo(
    () =>
      [...Array(maxWidth / columnWidth)].map(() =>
        randomInteger(1, 10) > 7 ? randomInteger(30, 40) : randomInteger(15, 30)
      ),
    [maxWidth]
  );

  return (
    <Wrapper
      onPointerDown={handleClick}
      onTouchMove={handleMove}
      onPointerMove={handleMove}
      onTouchEnd={handleRelease}
      onPointerUp={handleRelease}
      onKeyDown={handleKeyDown}
      role="slider"
      aria-label="Audio seekbar"
      aria-valuemin={0}
      aria-valuemax={Math.floor(audioRef.current?.duration || 0)}
      aria-valuenow={Math.floor(audioRef.current?.currentTime || 0)}
      tabIndex={focusable ? 0 : -1}
    >
      {columnHeights.map((height, index) => {
        const isHighlighted = progress * maxWidth > columnWidth * index;
        return <WaveColumn style={{ height }} key={index} isHighlighted={isHighlighted} />;
      })}
    </Wrapper>
  );
};

export default AudioWave;
