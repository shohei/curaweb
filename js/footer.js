
// var drawPath = function(path){
//     var canvas = document.getElementById('pathview');
//     var ctx = canvas.getContext( "2d" );
//     var px,py,cx,cy = 0;
//     function drawLine(cx,cy,px,py){
//            ctx.beginPath();
//            ctx.moveTo( px, py);
//            ctx.lineTo( cx, cy);
//            ctx.closePath();
//            ctx.stroke();
//     }
//     var arr = path.split('\n');
//     for (var i = 0; i < arr.length; i++) { 
//       if(arr[i].match(/^\d/)!=null) {
//         var coords = arr[i];
//         cx = coords.split(' ')[0]/3.5;
//         cy = coords.split(' ')[1]/3.5;
//         drawLine(cx,cy,px,py)
//         px = cx;
//         py = cy;
//       }
//     }
// }

File.prototype.getBlob = function (dataArray) {  
  var blob;  
  try {  
      blob = String.fromCharCode.apply(null,dataArray);  
  } catch (err) {  
   //データを分割して変換してつなげる  
   var leng = dataArray.length;  
   var dataLength = 100000;  
   var loopNum = Math.ceil(leng / dataLength);  
   var blobData = new Array();  
   blobData[loopNum] = new Array();  
  
   for ( var idx = 0; idx < loopNum; ++idx ) {  
    var dataIdx = idx * dataLength;  
    var splitData = dataArray.slice(dataIdx,dataIdx + dataLength);  
    blobData[idx] = this.getBlob(splitData);  
   }  
   blob = blobData.join("");  
  }  
  return blob;  
}


 var timerId = setInterval(function(){
       if(FS.findObject("/output").contents != null){
           console.log("Output file ready."); 
         // var gcode = String.fromCharCode.apply(null, Module.ret());
          // var gcode = String.fromCharCode.apply(null, new Uint16Array(Module.ret()));

          // var gcode_blob = File.prototype.getBlob(Module.ret());           
          var gcode_blob = new Blob([new Uint8Array(Module.ret())]);
          // var gcode_blob = new Blob([gcode]);
          document.gcode_blob = gcode_blob;
          
           // document.gcode = gcode; 
           // console.log(gcode);

           //drawPath(path);
           // var gcode_blob = new Blob([gcode]);
           // document.gcode_blob = gcode_blob;

           
           // var a = document.createElement("a");
           // var label = document.createTextNode("Download");
           var disp = document.getElementById("disp");

           // if (window.URL) {
             disp.innerHTML = '<a href="' + window.URL.createObjectURL(gcode_blob) + '" target="_blank" download="convert.gcode">Download .gcode file</a>';
           } else if (window.webkitURL) {
             disp.innerHTML = '<a href="' + window.webkitURL.createObjectURL(gcode_blob) + '" target="_blank" download="convert.gcode">Download .gcode file</a>';
           // }

           clearInterval(timerId);
           } else {
            console.log("file is coming ... be patient.");
            // console.log("An error occured. reloading browser in 3 seconds.");
            // var stat = document.getElementById("stat");
            // stat.innerHTML = '<p>An error occured. Try again.</p>';
            // setTimeout(function(){
            //     location.reload()
            // },3000);
           }
    },3000);

}
