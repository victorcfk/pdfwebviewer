import React from "react";
import useWindowDimensions from "./utility/useWindowDimensions.react";
import Utility from "./Utility";
// import logo from './logo.svg';

import "./App.css";
const { useState, useEffect } = React;

function App() {
  const [PDFUrl, setPDFUrl] = useState("");
  const [iFrameLink, setIFrameLink] = useState("");

  const [btnTypeClicked, setBtnTypeClicked] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);

  const { width, height } = useWindowDimensions();

  //https://www.guitar.ch/tabs-pdf/tabs.php?pdf=Beatles/Something
  //http://mozilla.github.io/pdf.js/web/viewer.html?file=https://bitcoin.org/bitcoin.pdf

  // const GOOGLE_DOCS_URL = `https://docs.google.com/viewer?url=`;
  const MOZILLA_URL = `https://mozilla.github.io/pdf.js/web/viewer.html?file=`;

  const NEW_WINDOW_CLICK = "NEW_WINDOW";
  const IFRAME_CLICK = "IFRAME";

  useEffect(() => {
    try {
      if (btnTypeClicked === NEW_WINDOW_CLICK) {
        const appendedURL = Utility.urlAppender(MOZILLA_URL, PDFUrl);
        window.location.href = appendedURL;
      } else if (btnTypeClicked === IFRAME_CLICK) {
        const appendedURL = Utility.urlAppender(MOZILLA_URL, PDFUrl);
        setIFrameLink(appendedURL);
      }
    } catch (e) {
      console.log(e);
      setErrorMsg(e);
    }

    setBtnTypeClicked("");

    return () => {};
  }, [PDFUrl, btnTypeClicked, errorMsg, MOZILLA_URL]);

  return (
    <div className="App">
      <div height={0.25 * height}>
        <label>You will go to the URL at: </label>
        <label>{PDFUrl}</label>
        {(errorMsg !== null)? <div>{errorMsg.message}</div>: <div></div>}
        <br></br>
        <br></br>
        <div>
          <input
            value={PDFUrl}
            placeholder="Please enter your URL"
            onInput={(e) => setPDFUrl(e.target.value)}
          />
          <button
            onClick={() => {
              setBtnTypeClicked(NEW_WINDOW_CLICK);
              setErrorMsg(null);
            }}
            className="submit-button"
            type="submit"
          >
            {"Go to web view of PDF"}
          </button>
          <button
            onClick={() => {
              setBtnTypeClicked(IFRAME_CLICK);
              setErrorMsg(null);
            }}
            className="submit-button"
            type="submit"
          >
            {"Open in iframe"}
          </button>
          <br></br>
          <br></br>
          <label>{`Sample url https://bitcoin.org/bitcoin.pdf`}</label>
        </div>
      </div>
      <div height={0.75 * height}>
        <iframe title='pdflink' src={iFrameLink} width={width} height={0.75 * height}></iframe>
      </div>
    </div>
  );
}

export default App;
