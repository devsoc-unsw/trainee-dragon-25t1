import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

const isDev = import.meta.env.MODE === 'development';

createRoot(document.getElementById('root')!).render(
  !isDev ? (
    <StrictMode>
      <App />
    </StrictMode>
  ) : (
    <App />
  )
);
