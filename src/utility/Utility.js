const Instascan = require("instascan");
// import Instascan from "../../src/instascan/index";

export default class Utility {
  static urlAppender(prepend, url) {
    console.log(`url: `, url);
    const parsed_url = regexParser(url);
    console.log(`parsed url: `, parsed_url);
    const encoded_url = encodeURI(parsed_url);
    console.log(`encoded url: `, encodeURI(encoded_url));

    const final_url = `${prepend}${encoded_url}`;
    console.log(`final url: `, final_url);
    return final_url;
  }
  // https://docs.google.com/a/umd.edu/viewer?url=https://isotropic.org/papers/chicken.pdf&embedded=true
  // https://docs.google.com/viewer?url=https://isotropic.org/papers/chicken.pdf&embedded=true
  //  

  static getBinaryData(url, callback) {
    // body...
    var xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.setRequestHeader("Access-Control-Allow-Credentials", "true");

    xhr.responseType = "arraybuffer";
    xhr.onload = function (e) {
      //binary form of ajax response,
      callback(e.currentTarget.response);
    };

    xhr.onerror = function (e) {
      // body...
      alert("xhr error" + JSON.stringify(e));
    };

    xhr.send();
  }

  static instaScanner(domElementID, urlFoundCallback) {

    console.log(domElementID);

    let scanner = new Instascan.Scanner({
      video: domElementID.ref,
    });
  
    scanner.addListener("scan", function (content) {
      console.log(content);
      if(urlFoundCallback){
        urlFoundCallback(content);
      }
    });
  
    Instascan.Camera.getCameras()
      .then(function (cameras) {
        if (cameras.length > 0) {
  
          let backCamIndex = cameras.findIndex((camera)=>{ return camera.name?.includes('back')}); 
          
          //use the back cam if we actually found one
          scanner.start(cameras[backCamIndex >=0 ?backCamIndex : 0]);
          
        } else {
          console.error("No cameras found.");
  
          alert("No cameras found.");
        }
      })
      .catch(function (e) {
        console.error(e);
      });
  }
}

/**
 * Extracts any pdf string in the uri
 * @param uri A value representing an encoded URI.
 */
function regexParser(uri) {
  //find the last occurrence of http that is followed by a .pdf
  const regex1 = RegExp("http(?!.*http).+.pdf", "g");
  const match = regex1.exec(uri);

  if (match === null || match.length === 0) {
    throw Error(`Did not find a valid pdf url link in : "${uri}"`);
  }
  return match[0];
}


/*
 static callInFramePDFViewer(url) {
    console.log(url);
    url = regexParser(url);
    console.log(`parsed url: `, url);

    document.getElementById("my_pdf_viewer").style.display = "block";
    document.getElementById("constructed_url").innerHTML = url;

    var myState = {
      pdf: null,
      currentPage: 1,
      zoom: 1,
    };

    pdfjsLib.getDocument(url).then((pdf) => {
      myState.pdf = pdf;
      render();
    });

    function render() {
      myState.pdf.getPage(myState.currentPage).then((page) => {
        var canvas = document.getElementById("pdf_renderer");
        var ctx = canvas.getContext("2d");

        var viewport = page.getViewport(myState.zoom);

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        page.render({
          canvasContext: ctx,
          viewport: viewport,
        });
      });
    }

    //pdf viewer go previous button
    document.getElementById("go_previous").addEventListener("click", (e) => {
      if (myState.pdf == null || myState.currentPage == 1) return;
      myState.currentPage -= 1;
      document.getElementById("current_page").value = myState.currentPage;
      render();
    });

    //pdf viewer go next button
    document.getElementById("go_next").addEventListener("click", (e) => {
      if (
        myState.pdf == null ||
        myState.currentPage > myState.pdf._pdfInfo.numPages
      ) {
        return;
      }
      myState.currentPage += 1;
      document.getElementById("current_page").value = myState.currentPage;
      render();
    });

    //pdf viewer go current button
    document
      .getElementById("current_page")
      .addEventListener("keypress", (e) => {
        if (myState.pdf == null) return;

        // Get key code
        var code = e.keyCode ? e.keyCode : e.which;

        // If key code matches that of the Enter key
        if (code == 13) {
          var desiredPage =
            document.getElementById("current_page").valueAsNumber;

          if (
            desiredPage >= 1 &&
            desiredPage <= myState.pdf._pdfInfo.numPages
          ) {
            myState.currentPage = desiredPage;
            document.getElementById("current_page").value = desiredPage;
            render();
          }
        }
      });

    document.getElementById("zoom_in").addEventListener("click", (e) => {
      if (myState.pdf == null) return;
      myState.zoom += 0.5;
      render();
    });

    

    document.getElementById("zoom_out").addEventListener("click", (e) => {
      if (myState.pdf == null) return;
      myState.zoom -= 0.5;
      render();
    });
  }
*/
// define the callAPI function that takes a first name and last name as parameters
// Fix for the url, to download the url and cache the file on my webpage
// let callAPI = (url) => {
//     // instantiate a headers object
//     var myHeaders = new Headers();
//     // add content type header to object
//     myHeaders.append("Content-Type", "application/json");
//     // using built in JSON utility package turn object to string and store in a variable
//     var raw = JSON.stringify({ "url": url });
//     // create a JSON object with parameters for API call and store in a variable
//     var requestOptions = {
//         method: 'POST',
//         headers: myHeaders,
//         body: raw,
//         redirect: 'follow'
//     };

//     const api_invoke_url = "https://3grz610kr9.execute-api.ap-southeast-1.amazonaws.com/dev";
//     // make API call with parameters and use promises to get response
//     fetch(api_invoke_url, requestOptions)
//         .then(response => response.text())
//         //.then(result => alert(JSON.parse(result).body))
//         .then(result => window.location.href = JSON.parse(result).body)
//         .catch(error => console.log('error', error));
// }

//
// let callQRScanner = () => {

//     let opts = {
//         // Whether to scan continuously for QR codes. If false, use scanner.scan() to manually scan.
//         // If true, the scanner emits the "scan" event when a QR code is scanned. Default true.
//         continuous: true,

//         // The HTML element to use for the camera's video preview. Must be a <video> element.
//         // When the camera is active, this element will have the "active" CSS class, otherwise,
//         // it will have the "inactive" class. By default, an invisible element will be created to
//         // host the video.
//         video: document.getElementById('preview'),

//         // Whether to horizontally mirror the video preview. This is helpful when trying to
//         // scan a QR code with a user-facing camera. Default true.
//         mirror: true,

//         // Whether to include the scanned image data as part of the scan result. See the "scan" event
//         // for image format details. Default false.
//         captureImage: false,

//         // Only applies to continuous mode. Whether to actively scan when the tab is not active.
//         // When false, this reduces CPU usage when the tab is not active. Default true.
//         backgroundScan: true,

//         // Only applies to continuous mode. The period, in milliseconds, before the same QR code
//         // will be recognized in succession. Default 5000 (5 seconds).
//         refractoryPeriod: 5000,

//         // Only applies to continuous mode. The period, in rendered frames, between scans. A lower scan period
//         // increases CPU usage but makes scan response faster. Default 1 (i.e. analyze every frame).
//         scanPeriod: 1
//     };

//     let scanner = new Instascan.Scanner({ opts });
//     scanner.addListener('scan', function (content) {
//         console.log(content);
//         document.getElementById('qr_url').innerHTML = content;
//     });
//     Instascan.Camera.getCameras().then(function (cameras) {
//         //Assume for mobile if there are 2 cameras, get the 2nd for back camera
//         if (cameras.length > 1) {
//             scanner.start(cameras[1]);
//         }
//         //Assume for mobile if there is only one, get the 1st camera
//         if (cameras.length > 0) {
//             scanner.start(cameras[0]);
//         }
//         else {
//             console.error('No cameras found.');
//         }
//     }).catch(function (e) {
//         console.error(e);
//     });
//     document.getElementById('qr_url').innerHTML = `No url scanned successfully yet`;
// }
