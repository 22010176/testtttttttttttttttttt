// import '@ant-design/v5-patch-for-react-19';
import { lazy, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@ant-design/v5-patch-for-react-19';

import './index.css';

const mode = import.meta.env.VITE_MODE
let App;

switch (mode) {
  case "seller":
    App = lazy(() => import("./features/seller"))
    break;
  case "administrator":
    App = lazy(() => import("./features/administrator"))
    break
  case "customer":
  default:
    App = lazy(() => import("./features/customer"))
    break;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
