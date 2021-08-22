import React from 'react';
import useWindowDimensions from './utility/useWindowDimensions.react';
import Utility from './Utility';
// import logo from './logo.svg';

import './App.css';
const { useState, useEffect } = React;

function App() {

  const[PDFUrl, setPDFUrl] = useState('');
  const[iFrameLink, setIFrameLink] = useState('');
  const { width, height } = useWindowDimensions();

  //https://www.guitar.ch/tabs-pdf/tabs.php?pdf=Beatles/Something
  //'http://mozilla.github.io/pdf.js/web/viewer.html?file=https://bitcoin.org/bitcoin.pdf'
  // useEffect(
  //   ()=>{   return ()=>{};},[PDFUrl]);

  const google_docs_url = `https://docs.google.com/viewer?url=`;
  const mozilla_url = `http://mozilla.github.io/pdf.js/web/viewer.html?file=`;
  
  return (
    <div className="App">
      <div height={0.25*height}>
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
              window.location.href = Utility.urlAppender(mozilla_url,PDFUrl);
            } }
            className="submit-button" type="submit">
            {'Go to web view of PDF'}
          </button>
          <button 
            onClick = {() => {
              setIFrameLink(Utility.urlAppender(mozilla_url,PDFUrl))
            } }
            className="submit-button" type="submit">
            {'Open in iframe'}
          </button>

          <br></br>
          <br></br>
          <br></br>
          <label>{`Sample url https://bitcoin.org/bitcoin.pdf`}</label>
      </div>
      </div>
      <div height={0.75*height}>
          <iframe src ={iFrameLink} width ={width} height ={0.75*height}></iframe>
      </div>
    </div>
  );
}

export default App;
