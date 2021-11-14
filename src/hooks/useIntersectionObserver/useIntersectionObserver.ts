import { useCallback, useState } from 'react';

const useIntersectionObserver = () => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const elementRef = useCallback((node) => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsIntersecting(true);
      else setIsIntersecting(false);
    });
    if (node) observer.observe(node);
  }, []);

  return { elementRef, isIntersecting };
};

export default useIntersectionObserver;
