import React from 'react';
import logo from './logo.svg';
import './App.css';
const { useState, useEffect } = React;

function App() {

  const[PDFUrl, setPDFUrl] = useState('https://bitcoin.org/bitcoin.pdf');
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
            placeholder="https://bitcoin.org/bitcoin.pdf" 
            onInput={e => setPDFUrl(e.target.value)}/>

          <button 
            onClick = {() => {googleDocAppender(PDFUrl);} }
            className="submit-button" type="submit">
            {'Go to web view of PDF'}
          </button>

      </div>
    </div>
  );
}

function googleDocAppender(url){

  console.log(url);

  const google_docs_url = `https://docs.google.com/viewer?url=`;
  let final_url = `${google_docs_url}${url}`;
  console.log(final_url);
  window.location.href = final_url;
  //pdfjs(final_url);
  return final_url;
}

export default App;
