
# @dannyman/use-store

  

  

> Custom React Hook to enable using useState across the whole React Application

  

  

[![NPM](https://img.shields.io/npm/v/@dannyman/use-store.svg)](https://www.npmjs.com/package/@dannyman/use-store) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


 ## Overview
 
**usePersistedState** and **useSessionState** hooks will allow you to create global state variables to share or get across your React application.

## How it works
**usePersistedState:**  will allow you to store data and access it anywhere on your React app, even with the app open on different tabs or windows (on the same browser). The data will persist even if the app gets closed (unless the localstorage is cleared, in this case the data will get destroyed).

**useSessionState:** works as the usePersistedState hook, but encapsules the data so it can be used only on a single client session (read [this](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) to understand when a new session is created) and it gets destroyed as soon as the user leaves the session.
  
## Features

* Works exactly as the **useState** React Hook.
* Supports all the JavaScript data types and data structures.
* Persists the data depending on your needs.
* The hooks will update the browser storage on the background.
* Data will be available for all the React components and apps.
* All the data is base64 encoded.
* No need to use redux.
* Easy to use.
  

## Install


```bash
npm install --save @dannyman/use-store
```


## Usage

The *usePersistedState* and *useSessionState* hooks will receive the following parameters:

  

* **key**: unique key name used to access the state. **[required]**
* **defaultValue**: sets the state value to this value. **[default = false]**
* **options**: object with the following options:
    * **isNew**: overrides any value previously stored on component mount. **[default = false]**
    * **autoRefresh** (\*): listens to any changes that happen on the background and updates the current state. **[default = false]**
    * **debug**: shows information about the state status. **[default = false]**

 \* EXPERIMENTAL FEATURE, you could experience some issues as this uses the setInterval timer (to be updated to eventListeners).

## Example
  
```jsx
import React from  'react';
import { usePersistedState, useSessionState } from  '@dannyman/use-store';

const  Example  = () => {
    const [name, setName] =  useSessionState('app:key:name','Danny', { isNew: true });
    const [message] =  usePersistedState('app:key:message', 'nice to meet you');

    return (
        <div>Hello {name},  {message}!</div>
        <input type="text" onChange={(e) => setName(e.target.value)} />
    );
};
```
 ## Changelog

 v1.1.3
 * Adding the "debug" option, to log information about the state.
 * New validation to avoid functions as the defaultValue.
 * Minor performance improvements.

 v1.1.2
 * Fixing issue that caused SSR frameworks to fail on build.

 v1.1.1
 * Reverted the hook signature to accept the default value outside of the options object.

v1.1.0
* Enable the hook to listen for changes on the background.
* Using the options object to support more functionality in the future.


## License

MIT © [danny-fallas](https://github.com/danny-fallas)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).