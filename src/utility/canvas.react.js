import React from "react";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import PDFJSWorker from "pdfjs-dist/legacy/build/pdf.worker.entry";
import Utility from "../Utility";
pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJSWorker;

const { useRef, useState, useEffect, useCallback } = React;

function Canvas(props) {
  const canvasRef = useRef(null);

  const [pdf, setPdf] = useState(null);
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [numPages, setNumPages] = useState(-1);

  const [zoom, setZoom] = useState(1.0);

  const [renderingState,setRenderingState] = useState("COMPLETED");
  const [loadingState,setLoadingState] = useState("COMPLETED");

  const render = useCallback(() => {
    if (!pdf) return;
    if (renderingState === "ONGOING") return;

    setRenderingState("ONGOING");

    pdf.getPage(currentPageNum)
    .then(
      function (page) {
      // const viewport = page.getViewport(zoom);
      const viewport = page.getViewport({ scale: zoom });

      viewport.width = props.width;
      viewport.height = props.height;
      //viewport.zoom = zoom;
      canvasRef.current.width = viewport.width;
      canvasRef.current.height = viewport.height;
      // canvasRef.current.cancel();

      const thing = canvasRef.current.getContext("2d");

      //Draw it on the canvas
      
      //Step 1: store a refer to the renderer
      const pageRendering = page.render({
        canvasContext: thing,
        viewport: viewport,
      });

      //Step : hook into the pdf render complete event
      const completeCallback = pageRendering._internalRenderTask.callback;

      pageRendering._internalRenderTask.callback = function (error) {
        //Step 2: what you want to do before calling the complete method                  
        completeCallback.call(this, error);
        //Step 3: do some more stuff
        setRenderingState("COMPLETED");
      };

    })
    .catch( (error)=>alert(error));

  }, [currentPageNum, pdf, props.height, props.width, zoom, renderingState]);

  useEffect(() => {
    render();
  }, [currentPageNum, pdf, zoom, render]);

  useEffect(() => {
    if(loadingState === "ONGOING")
      return;

    setLoadingState("ONGOING");

    Utility.getBinaryData(props.pdfpath,
      
      function(binaryResponse){
        pdfjsLib.getDocument(binaryResponse).promise.then((pdf_new) => {

          //Set PDFJS global object (so we can easily access in our page functions
          setPdf(pdf_new);
    
          //How many pages it has
          setNumPages(pdf_new.numPages);
    
          setLoadingState("COMPLETED");
    
          //render();
        }).catch( (error)=>alert(error));
      }
      );  
  }, [props.pdfpath, loadingState, render]);

  return (
    <div>
      <canvas ref={canvasRef} {...props} />
      <button
        id="go_previous"
        onClick={() => {
          setCurrentPageNum(Math.max(currentPageNum - 1, 1));
        }}
      >
        Previous
      </button>
      <input 
        id="current_page"
        type="number"
        value={currentPageNum}
        onChange={()=>{}}
         />
      <button
        id="go_next"
        onClick={() => {
          setCurrentPageNum(Math.min(currentPageNum + 1, numPages));
        }}
      >
        Next
      </button>

      <div id="zoom_controls">
        <button
          id="zoom_in"
          onClick={() => {
            setZoom(zoom + 0.1);
          }}
        >
          +
        </button>
        <button
          id="zoom_out"
          onClick={() => {
            setZoom(zoom - 0.1);
          }}
        >
          -
        </button>
      </div>
    </div>
  );
}

export default Canvas;
