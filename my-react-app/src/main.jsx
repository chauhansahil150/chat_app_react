
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx';

import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter
} from "react-router-dom";
// import { SocketState } from './states/socketState.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    {/* <SocketState> */}
      <App />
    {/* </SocketState> */}
  </BrowserRouter>


);

