
import React from 'react'
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf'
import PDFJSWorker from 'pdfjs-dist/legacy/build/pdf.worker.entry'
pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJSWorker

const { useRef, useState, useEffect, useCallback } = React;

function Canvas(props){
  const canvasRef = useRef(null);

  const [pdfPath,setPdfPath] = useState("");
  // const [canvas,setCanvas] = useState(null);
  
  const [pdf,setPdf] = useState(null);
  const [currentPage,setCurrentPage] = useState(1);
  const [zoom,setZoom] = useState(1);
  
  // useEffect(() => {
  //     render();
  // }, [currentPage,zoom, render]);

  useEffect(() => {

    pdfjsLib.getDocument(props.pdfpath).promise.then((pdf_new) => {
      // setCanvas();
      setPdf(pdf_new);
      render();


      function render (){
        if(!pdf)  return;
    
        pdf.getPage(currentPage).then((page) => {
          
          const viewport = page.getViewport(zoom);
          viewport.width = 612;
          viewport.height = 792;
          canvasRef.current.width = viewport.width;
          canvasRef.current.height = viewport.height;
    
          page.render({
            canvasContext: canvasRef.current.getContext("2d"),
            viewport: viewport,
          });
        });
      };

    });
    
  }, [props.pdfpath,currentPage,pdf,zoom]);

  return <canvas ref={canvasRef} {...props} />;
};

export default Canvas;
