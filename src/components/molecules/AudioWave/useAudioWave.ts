import React, { useEffect, useState } from 'react';

type refType = React.MutableRefObject<HTMLAudioElement | null>;

const useAudioWave = (ref: refType) => {
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    ref.current?.addEventListener('timeupdate', function () {
      setProgress(this.currentTime / this.duration);
    });
  }, [ref]);

  const changeProgressWithSync = (newProgress: number) => {
    if (newProgress > 1) return setProgress(1);
    else if (newProgress < 0) return setProgress(0);

    setProgress(newProgress);
    if (ref.current) ref.current.currentTime = ref.current.duration * newProgress;
  };

  const handleClick = (e: React.PointerEvent) => {
    setIsDragging(true);
    const { width, left } = e.currentTarget.getBoundingClientRect();
    changeProgressWithSync((e.clientX - left) / width);
  };

  const handleMove = (e: React.TouchEvent | React.PointerEvent) => {
    if (!isDragging) return;

    const { width, left } = e.currentTarget.getBoundingClientRect();
    if (e.nativeEvent instanceof TouchEvent)
      changeProgressWithSync((e.nativeEvent.touches[0].clientX - left) / width);
    else changeProgressWithSync((e.nativeEvent.clientX - left) / width);
  };

  const handleRelease = () => {
    setIsDragging(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') changeProgressWithSync(progress - 0.02);
    else if (e.key === 'ArrowRight') changeProgressWithSync(progress + 0.02);
    else if (e.key === 'ArrowDown') changeProgressWithSync(progress - 0.06);
    else if (e.key === 'ArrowUp') changeProgressWithSync(progress + 0.06);
  };

  return { progress, handleClick, handleMove, handleRelease, handleKeyDown };
};

export default useAudioWave;
