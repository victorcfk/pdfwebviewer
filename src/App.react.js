import React from "react";
import useWindowDimensions from "./utility/UseWindowDimensions.react";
import Utility from "./utility/Utility";
import Canvas from "./utility/PdfLoader.react";
// import { Cameras, Scanner } from "react-instascan";

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
  // const QRPreviewElem = (
  //   <video id={"preview"} fluid={true} width={300} height={300}></video>
  // );
  // Utility.instaScanner(QRPreviewElem, (url) => {
  //   console.log(url);
  // });
  
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

  const getBackCamera = (cameras) => {
    if (cameras.length > 0) {
      let backCamIndex = cameras.findIndex((camera) => {
        return camera.name?.includes("back");
      });

      //use the back cam if we actually found one
      return cameras[backCamIndex >= 0 ? backCamIndex : 0];
    } else {
      console.error("No cameras found.");

      alert("No cameras found.");

      return null;
    }
  };

  const onScan = (evt) => {
    console.log(evt);
  };

 /* <div className="preview-container">
  {QRPreviewElem}
    { <Cameras>
      {(cameras) => (
        <div>
          <h1>Scan the code!</h1>
          <Scanner camera={cameras[0]} onScan={onScan}>
            <video style={{ width: 400, height: 400 }} />
          </Scanner>
        </div>
      )}
    </Cameras>}
  </div>
  */
  return (
    <div className="App">
      <div height={0.25 * height}>
        <label>You will go to the URL at: </label>
        <label>{PDFUrl}</label>
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
        {iFrameLink ? (
          <Canvas
            pdfpath={iFrameLink}
            height={0.75 * height}
            width={width}
          ></Canvas>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default App;
