import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { getLegacyRedirect } from './utils/legacyUrl.js';

const legacyRedirect = getLegacyRedirect(window.location.href);
if (legacyRedirect) {
  window.location.replace(legacyRedirect);
} else {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
