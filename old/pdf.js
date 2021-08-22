const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");
//import PDFViewer from './components/PDFViewer/PDFViewer.react';
//import PDFJSBackEnd from '../old/pdf';
export default class PDFJs{
    init (source, element){

        // const textNode = document.createElement('p');

        // textNode.innerHTML = `our pdf source is ${source}`;

        // element(textNode);
        // ReactDOM.render(element, textNode);

        // return <div>{`our pdf source is ${source}`}</div>;

        // const iframe = document.createElement('iframe');
        // iframe.src = `/pdfjs-1.9.426-dist/web/viewer.html?file=${source}`;
        // iframe.width = '100%';
        // iframe.height = '100%';

        // element.append(iframe);
//http://mozilla.github.io/pdf.js/web/viewer.html?file=https://bitcoin.org/bitcoin.pdf
        return <iframe src = 'https://www.youtube.com/embed/cWDJoK8zw58' ></iframe>

    }
}

//https://www.pdftron.com/blog/react/how-to-build-a-react-pdf-viewer/

// const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");

// const { useState, useEffect } = React;