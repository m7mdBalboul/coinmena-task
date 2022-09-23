import React from 'react';

type Event = MouseEvent | TouchEvent;

function useClickOutside<Element extends HTMLElement = HTMLElement>(
  callback: (event: Event) => void
) {
  const elRef = React.useRef<Element>();
  const callbackRef = React.useRef<typeof callback>();
  callbackRef.current = callback;
  React.useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  React.useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        elRef?.current?.contains(event.target as Node) &&
        callbackRef.current
      ) {
        callbackRef.current(event);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return elRef as React.RefObject<Element>;
}

export { useClickOutside };
