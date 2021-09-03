import React, { useRef, useEffect } from "react";
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf'
import PDFJSWorker from 'pdfjs-dist/legacy/build/pdf.worker.entry'
pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJSWorker

const Canvas = (props) => {
  const canvasRef = useRef(null);
  const myState = {
    pdf: null,
    currentPage: 1,
    zoom: 1,
  };

  function render(canvas){
    myState.pdf.getPage(myState.currentPage).then((page) => {

      const ctx = canvas.getContext("2d");
      // ctx.fillStyle = '#000000'
      //   ctx.beginPath()
      //   ctx.arc(50, 100, 20, 0, 2*Math.PI)
      //   ctx.fill();
      const viewport = page.getViewport(myState.zoom);
      viewport.width = 612;
      viewport.height = 792;

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      page.render({
        canvasContext: ctx,
        viewport: viewport,
      });
    });

  }
  const draw = (canvas) => {

    pdfjsLib.getDocument("./bitcoin.pdf").promise.then((pdf) => {
      myState.pdf = pdf;
      render(canvas);
    });
    
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    
    //Our draw come here
    draw(canvas);
  }, [draw]);

  return <canvas ref={canvasRef} {...props} />;
};

export default Canvas;
