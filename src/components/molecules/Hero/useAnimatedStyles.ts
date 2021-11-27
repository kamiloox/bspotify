import { useSpring, animated, config } from 'react-spring';
import { useState } from 'react';

const useAnimatedStyles = () => {
  const [flip, setFlip] = useState(true);
  const leftHandStyles = useSpring({
    from: { rotate: 0 },
    to: { rotate: 10 },
    reverse: flip,
    config: config.slow,
    delay: 200,
    onRest: () => setFlip(!flip), // OnRest causes warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
  });

  const rightHandStyles = useSpring({
    from: { rotate: 0 },
    to: { rotate: -10 },
    reverse: flip,
    config: config.slow,
    delay: 400,
  });

  const headStyles = useSpring({
    from: { rotate: -5 },
    to: { rotate: 5 },
    reverse: flip,
    config: config.gentle,
    delay: 800,
  });

  const markStyles = useSpring({
    from: { x: 0 },
    to: { x: 40 },
    reverse: flip,
    config: config.slow,
    delay: 500,
  });

  const boxStyles = useSpring({
    from: { opacity: 1 },
    to: { opacity: 0.5 },
    reverse: flip,
    config: config.slow,
    delay: 500,
  });

  return { leftHandStyles, rightHandStyles, headStyles, markStyles, boxStyles };
};

export default useAnimatedStyles;

export { animated };
