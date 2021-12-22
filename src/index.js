import React from 'react';
import {render} from 'react-dom';
import App from './App';
import Products from './components/Products';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="Productos" element={<Products/>}></Route>
    </Routes>
  </BrowserRouter>
, rootElement);

// const rootElement = document.getElementById("root");
// ReactDOM.createRoot(rootElement).render(<App />);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
