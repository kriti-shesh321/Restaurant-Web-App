import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppContextProvider } from "./context/ContextProvider.jsx";
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </StrictMode>,
);
