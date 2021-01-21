import React from 'react';
import './tailwind.css';
import HelloWord from './component/HelloWord';
import Header from './component/Header';
import Footer from './component/Footer';


function App() {
  return (
    <div>
      <Header/>

      <HelloWord name = " Ayoub"/>

      <Footer/>
    </div>
  );
}

export default App;
