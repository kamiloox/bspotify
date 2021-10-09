import React, { useCallback, useEffect, useState } from 'react';

type refType = React.MutableRefObject<HTMLAudioElement | null>;

const useAudioWave = (ref: refType) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    ref.current.addEventListener('timeupdate', function () {
      setProgress(this.currentTime / this.duration);
    });
  }, [ref]);

  const changeCurrentTime = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const updatedProgress = e.clientX / e.currentTarget.clientWidth;
      setProgress(updatedProgress);
      if (ref.current) ref.current.currentTime = ref.current.duration * updatedProgress;
    },
    [ref]
  );

  return { progress, changeCurrentTime };
};

export default useAudioWave;
