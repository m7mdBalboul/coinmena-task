import React from 'react';

type UseLocalStorageStateOptions<StateValue = unknown> = {
  serialize?: (data: StateValue) => string;
  deserialize?: (str: string) => StateValue;
};

export const defaultUseLocalStorageStateOptions: Required<UseLocalStorageStateOptions> =
  { serialize: JSON.stringify, deserialize: JSON.parse };

function useLocalStorageState<StateValue>(
  key: string,
  defaultValue: StateValue | (() => StateValue),
  options: UseLocalStorageStateOptions<StateValue> = {}
) {
  const deserialize =
    options.deserialize ?? defaultUseLocalStorageStateOptions.deserialize;
  const serialize =
    options.serialize ?? defaultUseLocalStorageStateOptions.serialize;
  const serializeRef = React.useRef(serialize);

  // Update The value of serializeRef
  React.useLayoutEffect(() => {
    serializeRef.current = serialize;
  });

  const [state, setState] = React.useState<StateValue>(() => {
    const valueInLocalStorage = window.localStorage.getItem(key);
    if (valueInLocalStorage) {
      try {
        return deserialize(valueInLocalStorage) as StateValue;
      } catch (error) {
        window.localStorage.removeItem(key);
      }
    }
    return defaultValue instanceof Function ? defaultValue() : defaultValue;
  });

  const prevKeyRef = React.useRef(key);

  React.useEffect(() => {
    const prevKey = prevKeyRef.current;
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey);
    }
    prevKeyRef.current = key;
    window.localStorage.setItem(key, serializeRef.current(state));
  }, [key, state]);

  return [state, setState] as const;
}

export { useLocalStorageState };
