// Private Functions
const isSameType = (value1, value2) => typeof value1 === typeof value2;

const isNumber = (value) => !isNaN(value);

const isArray = (value) => Array.isArray(value);

const isObject = (value) => typeof value === 'object';

const isString = (value) => typeof value === 'string';

const isTheSameObject = (object1, object2) => JSON.stringify(Object.values(object1).sort()) === JSON.stringify(Object.values(object2).sort());

const isTheSameArray = (arr1, arr2) => (arr1 && arr2) && (arr1.length === arr2.length) && arr1.every(value1 => arr2.some((value2) => isTheSameObject(value1, value2)));

const isNullOrUndefined = (value) => (typeof value === 'undefined' || value === null);

const isFunction = (value) => (typeof value === 'function');

// Consts
const ssrStateMock = [false, () => false];

const isBrowser = (typeof window !== 'undefined');

const validations = {
    isSameType,
    isNumber,
    isArray,
    isObject,
    isString,
    isTheSameObject,
    isTheSameArray,
    isNullOrUndefined,
    isFunction
};

// Public Functions

const set = (storage, key, value) => storage.setItem(key, btoa(JSON.stringify(value)));

const get = (storage, key) => {
    const raw = storage.getItem(key);
    return (raw && raw.length) ? JSON.parse(atob(raw)) : false;
};

const refresh = (callback) => setInterval(callback, 500);

const getValidOptions = (options) => ({
    autoRefresh: options?.autoRefresh || false,
    debug: options?.debug || false,
    isNew: options?.isNew || false,
});

const stateShouldUpdate = (state, newState) => {
    switch (true) {
        case !isSameType(state, newState):
        case (isObject(newState) && !isNullOrUndefined(newState) && !isTheSameObject(state, newState)):
        case (isArray(newState) && !isTheSameArray(state, newState)):
        case ((isString(newState) || isNumber(newState)) && state !== newState):
            return true;
        default:
            return false;
    }
};

const writeToLog = (debug, key) => {
    return debug ?
        (message, object = () => { }, err = false) => {
            console.group(`[@dannyman/use-store]@%c${key}`, 'color: blue;');

            if (message) console.log(`${err ? '%cERROR: ' : '%c'}${message}`, `color: ${err ? 'red' : 'green'};`);
            if (!isFunction(object)) console.log(`${typeof object} =>`, JSON.parse(JSON.stringify(object)));

            console.groupEnd();
        } : () => { };
};

const isSSR = () => (!isBrowser ? ssrStateMock : false);

export {
    validations,
    ssrStateMock,
    set,
    get,
    refresh,
    getValidOptions,
    stateShouldUpdate,
    writeToLog,
    isSSR
};