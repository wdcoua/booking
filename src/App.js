// import logo from './logo.svg';
import React, {useEffect, Suspense, useState} from "react";
import './App.css';
import MainComponent from './components/MainComponent/MainComponent'
import {BrowserRouter, HashRouter} from "react-router-dom";
import store from "./redux/redux-store";
import {connect,Provider} from "react-redux";
import Preloader from "./components/Preloader/Preloader";

function App() {


  return <BrowserRouter>
  <Provider store={store}>
      <Suspense fallback={(<Preloader  comment='loading 2'/>)}>
          <MainComponent />
      </Suspense>
  </Provider>
</BrowserRouter>
 

  // return (
  //   <div className="App">
  //     {/* <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header> */}
      
  //     <MainComponent/>
  //   </div>
  // );
}

export default App

