import { useEffect, useRef } from 'react';

const useOutsideClick = (callback, excludeRef = null, initialValue = null) => {
  const ref = useRef(initialValue);

  useEffect(() => {
    const handleClickOutside = event => {
      const isOutsideMain = ref.current && !ref.current.contains(event.target);

      const isOnExcluded =
        excludeRef &&
        excludeRef.current &&
        excludeRef.current.contains(event.target);

      if (isOutsideMain && !isOnExcluded) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [callback, excludeRef]);

  return ref;
};

export default useOutsideClick;
