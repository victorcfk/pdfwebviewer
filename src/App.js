import React from 'react';
// import logo from './logo.svg';
import Utility from './Utility';
import './App.css';
const { useState, useEffect } = React;

function App() {

  const[PDFUrl, setPDFUrl] = useState('');
  //https://www.guitar.ch/tabs-pdf/tabs.php?pdf=Beatles/Something

  // useEffect(
  //   ()=>{
      
  //   },[PDFUrl]);

  return (
    <div className="App">
      
          <label>You will go to the URL at: </label>
          <label>{PDFUrl}</label>
          <br></br>
          <br></br>
          <br></br>
          <div>
          <input 
            value={PDFUrl} 
            placeholder="Please enter your URL" 
            onInput={e => setPDFUrl(e.target.value)}/>

          <button 
            onClick = {() => {
              //go the the window in the link
              window.location.href = Utility.googleDocAppender(PDFUrl);
            } }
            className="submit-button" type="submit">
            {'Go to web view of PDF'}
          </button>
          <br></br>
          <br></br>
          <br></br>
          <label>{`Sample url https://bitcoin.org/bitcoin.pdf`}</label>

      </div>
    </div>
  );
}

export default App;
