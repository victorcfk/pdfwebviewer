import React from "react";
import useWindowDimensions from "./utility/useWindowDimensions.react";
import Utility from "./Utility";
import Canvas from "./utility/canvas.react";

import "./App.css";
const { useState, useEffect } = React;

function App() {
  
  const [PDFUrl, setPDFUrl] = useState("");
  const [iFrameLink, setIFrameLink] = useState("");

  const [btnTypeClicked, setBtnTypeClicked] = useState("");

  const { width, height } = useWindowDimensions();

  //https://mozilla.github.io/pdf.js/web/viewer.html?file=https://bitcoin.org/bitcoin.pdf
  const GOOGLE_DOCS_URL = `https://docs.google.com/viewer?url=`;
  const MOZILLA_URL = `https://mozilla.github.io/pdf.js/web/viewer.html?file=`;

  const NEW_WINDOW_CLICK = "NEW_WINDOW";
  const IFRAME_CLICK = "IFRAME";

  useEffect(() => {
    try {
      if (btnTypeClicked === NEW_WINDOW_CLICK) {
        const appendedURL = Utility.urlAppender(GOOGLE_DOCS_URL, PDFUrl);
        window.location.href = appendedURL;
      } else if (btnTypeClicked === IFRAME_CLICK) {
        setIFrameLink(PDFUrl);
      }
    } catch (e) {
      console.log(e);
      alert(e);
    }

    setBtnTypeClicked("");

    return () => {};
  }, [PDFUrl, btnTypeClicked, GOOGLE_DOCS_URL]);

  return (
    <div className="App">
      <div height={0.25 * height}>
        <label>You will go to the URL at: </label>
        <label>{PDFUrl}</label>
        <br></br>
        <br></br>
        <div>
          <input
            value={PDFUrl}
            placeholder="Please enter your URL"
            onInput={(e) => setPDFUrl(e.target.value)}
          />
          <button
            onClick={() => setBtnTypeClicked(NEW_WINDOW_CLICK)}
            className="submit-button"
            type="submit"
          >
            {"Go to web view of PDF"}
          </button>
          <button
            onClick={() => setBtnTypeClicked(IFRAME_CLICK)}
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
          {iFrameLink? 
            <Canvas pdfpath={iFrameLink} height={0.75 * height} width={width}></Canvas>:
            <div></div>}
      </div>
    </div>
  );
}

export default App;


