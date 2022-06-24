import React from 'react';
import Flex from './components/Flex';

import { usePersistedState, useSessionState } from '@dannyman/use-store';

const App = () => {
  const [sessionState, setSessionState] = useSessionState('key:name:session', { message: 'Hello world!' }, { isNew: true, debug: true });
  const [persistedState, setPersistedState] = usePersistedState('key:name:persisted', 'Gotta catch em all!', { isNew: false, autoRefresh: true });

  const onUpdate = (value) => {
    setSessionState({ message: value });
  };

  return (
    <React.Fragment>
      <Flex>
        <Flex
          alignItems="left"
          isSection>
          <h1>Local State Hooks</h1>
          <p>These hooks will allow you to create global state variables to share or get accross your React application.</p>
          <h4>Features:</h4>
          <ul>
            <li>Works exactly as the <b>useState</b> React Hook.</li>
            <li>Supports all the JavaScript data types and data structures.</li>
            <li>Persists the data depending on your needs.</li>
            <li>The hooks will update the local or session storage on the background.</li>
            <li>All the data is base64 encoded.</li>
            <li>No need to use redux.</li>
            <li>Easy to use.</li>
          </ul>
        </Flex>
        <hr
          style={{ width: '80%' }} />
        <Flex
          // direction="row"
          backgroundColor="white"
          fullWidth
          isSection>
          <Flex
            style={{ maxWidth: '50%' }}
            alignItems="left">
            <h3>Try the <i>useSessionState</i> Hook</h3>
            <p>Use the <i>useSessionState</i> hook, when you need to create a state for the current session. This state will only be available for the current user tab and will be destroyed when the browser or tab gets closed.</p>
            <ol>
              <li>Add some string value to the input field.</li>
              <li>Open a new tab <b><span onClick={() => { window.open(window.location.href, '_blank') }}>here</span></b>.</li>
              <li>On the new tab, add a different string value to the input.</li>
              <li>Both tabs state should persist on reload or redirect.</li>
              <li>The values on each tab should be different.</li>
            </ol>
            <input
              type="text"
              onChange={(e) => onUpdate(e.target.value)} />
            <p><b>Value:</b> {`${sessionState.message}`} </p>
          </Flex>
          <hr
            style={{ width: '80%' }} />
          <Flex
            style={{ maxWidth: '50%' }}
            alignItems="left">
            <h4>Try the <i>usePersistedState</i> Hook</h4>
            <p>Use the <i>usePersistedState</i> hook, when you need to create a state to persist data across the browser. This state will be available for the current user, it will detect and sync any changes on the data accross the browser and will persist even when the browser or tab gets closed.</p>
            <ol>
              <li>Add some string value to the input field.</li>
              <li>Open a new tab <b><span onClick={() => window.open(window.location.href, '_blank')}>here</span></b>.</li>
              <li>On the new tab, add a different string value to the input.</li>
              <li>Both tabs state should persist on reload or redirect.</li>
              <li>The values on each tab should be synced.</li>
            </ol>
            <input
              type="text"
              onChange={(e) => setPersistedState(e.target.value)} />
            <p><b>Value:</b> {`${persistedState}`} </p>
          </Flex>
        </Flex>
      </Flex>
    </React.Fragment >
  );
};

export default App;