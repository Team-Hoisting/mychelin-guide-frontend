import React from 'react';

const useOnClickOutside = handler => {
  const ref = React.useRef(null);

  React.useEffect(() => {
    const listener = e => {
      if (!ref.current || ref.current.contains(e.target)) return;

      handler(e);
    };

    document.addEventListener('click', listener);

    return () => {
      document.addEventListener('click', listener);
    };
  }, [ref]);

  return ref;
};

export default useOnClickOutside;
