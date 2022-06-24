// Imports
import {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback
} from 'react';
import {
  validations,
  refresh,
  set,
  get,
  getValidOptions,
  stateShouldUpdate,
  writeToLog,
  isSSR
} from './functions';

// Private functions

const handleState = (storage, key, defaultValue = false, options) => {
  const {
    autoRefresh,
    isNew,
    debug,
  } = getValidOptions(options);

  const log = useCallback(writeToLog(debug, key));

  const [state, setState] = useState(() => {
    if (validations.isFunction(defaultValue)) {
      log('The defaultValue cannot be a function.', defaultValue, true);
      defaultValue = false;
    }

    const existentValue = get(storage, key);
    const _defaultValue = !isNew ? (existentValue !== null) ? existentValue : defaultValue : defaultValue;
    log('Default Value:', _defaultValue);
    return _defaultValue;
  });

  useEffect(() => {
    log('Updated value:', state);
    set(storage, key, state);
  }, [key, state]);

  useLayoutEffect(() => {
    if (autoRefresh) {
      const interval = refresh(() => {
        const newState = get(storage, key);
        if (stateShouldUpdate(state, newState)) {
          log('Auto refresh updating.');
          setState(newState);
        }
      });

      return () => clearInterval(interval);
    }
  }, [state]);

  return [state, setState];
};

// Public functions
const usePersistedState = (key, defaultValue, options) => isSSR() || handleState(localStorage, key, defaultValue, options);
const useSessionState = (key, defaultValue, options) => isSSR() || handleState(sessionStorage, key, defaultValue, options);

// Exports
export {
  usePersistedState,
  useSessionState
};