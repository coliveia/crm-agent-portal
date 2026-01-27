import React from 'react';
import ReactDOM from 'react-dom/client';
import singleSpaReact from 'single-spa-react';
import App from './App';
import './index.css';

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: App,
  errorBoundary: (error, info, props) => (
    <div style={{ padding: '20px', textAlign: 'center', color: '#ef4444' }}>
      <h2>Error loading Agent Portal</h2>
      <p>{error?.message}</p>
    </div>
  ),
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;

// Standalone mode
if (!window.singleSpa) {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
