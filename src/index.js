import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './pages/Home';

import { Web3ReactProvider } from '@web3-react/core'
// import { Web3Provider } from "@ethersproject/providers";
import { MetaMaskProvider } from './hooks/useMetaMask';
import Web3 from 'web3';

function getLibrary(provider, connector) {
  return new Web3(provider);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <MetaMaskProvider>
        <Home />
      </MetaMaskProvider>
    </Web3ReactProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
