import React from 'react';
import ReactDOM from 'react-dom';
import { SpeechProvider } from '@speechly/react-client';

import { Provider } from './context/context';
import App from './App.js';
import './index.css'

ReactDOM.render(
    <SpeechProvider appId="b56ed92b-d5f5-498e-86fd-0211b092fc25" language="en-US">
        <Provider>
            <App />, 
        </Provider>
    </SpeechProvider>,
    document.getElementById('root')
);