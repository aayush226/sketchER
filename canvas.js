let currentTool='line';
let currentStyle='none';
let dragging = false;
let shape;
let path_array = [];
let index = -1;
let message;
let usingBrush = false;

var strokewidth = document.getElementById("strokewidth");
var stroke = document.getElementById("stroke");
var fill = document.getElementById("fill");

function drawelement(loc){
  if(currentTool==='line'){
    shape =  generator.line(mousedown.x,mousedown.y,loc.x,loc.y,{stroke:stroke.value, strokeWidth : strokewidth.value});
    roughCanvas.draw(shape);
  }
  else if(currentTool==='brush'){
    return;    //usingBrush = true;
    /*roughCanvas.curve(points, {
       strokeWidth: 2
    });*/
    
  }
  else if(currentTool==='dashline'){
    shape =  generator.line(mousedown.x,mousedown.y,loc.x,loc.y,{stroke:stroke.value, strokeLineDash : ([6]),strokeWidth : strokewidth.value});
    roughCanvas.draw(shape);
  }
  else if(currentTool==='2line'){
    shape =  generator.line(mousedown.x,mousedown.y,loc.x,loc.y,{stroke:stroke.value, strokeWidth : strokewidth.value});
    roughCanvas.draw(shape);

    let shape2 = generator.line(mousedown.x,mousedown.y-10,loc.x,loc.y-10,{stroke:stroke.value, strokeWidth : strokewidth.value});
    roughCanvas.draw(shape2);
  }
  else if(currentTool==='arrow'){
    
      const headlen = 15;
      const dx = loc.x - mousedown.x;
      const dy = loc.y - mousedown.y;
      const angle = Math.atan2(dy, dx);
      let shape1 = generator.line(mousedown.x,mousedown.y,loc.x,loc.y,{stroke:stroke.value, strokeWidth : strokewidth.value});
      let shape2 = generator.line(loc.x,loc.y,loc.x - headlen * Math.cos(angle - Math.PI / 6),loc.y - headlen * Math.sin(angle - Math.PI / 6),{stroke:stroke.value, strokeWidth : strokewidth.value});
      let shape3 = generator.line(loc.x,loc.y,loc.x - headlen * Math.cos(angle + Math.PI / 6),loc.y - headlen * Math.sin(angle + Math.PI / 6),{stroke:stroke.value, strokeWidth : strokewidth.value});
      roughCanvas.draw(shape1);
      roughCanvas.draw(shape2);
      roughCanvas.draw(shape3);  
  }
  else if(currentTool==='rectangle'){
    if(currentStyle==='none'){
      shape = generator.rectangle(mousedown.x,mousedown.y,loc.x-mousedown.x,loc.y-mousedown.y,{stroke:stroke.value, strokeWidth : strokewidth.value});
      roughCanvas.draw(shape);
    }
    else{
      shape = generator.rectangle(mousedown.x,mousedown.y,loc.x-mousedown.x,loc.y-mousedown.y,{stroke:stroke.value, strokeWidth : strokewidth.value, fill: fill.value, fillStyle: currentStyle});
      roughCanvas.draw(shape);
    }
  } 
  else if(currentTool==='drectangle'){
    if(currentStyle==='none'){
      if(loc.x>mousedown.x && loc.y>mousedown.y){
        let shape1 = generator.rectangle(mousedown.x,mousedown.y,loc.x-mousedown.x,loc.y-mousedown.y,{stroke:stroke.value, strokeWidth : strokewidth.value});
        let shape2 = generator.rectangle(mousedown.x+5,mousedown.y+5,loc.x-mousedown.x-10,loc.y-mousedown.y-10,{stroke:stroke.value, strokeWidth : strokewidth.value});//to fix
        roughCanvas.draw(shape1);
        roughCanvas.draw(shape2);
      }
      else if(loc.x>mousedown.x && loc.y<mousedown.y){
        let shape1 = generator.rectangle(mousedown.x,mousedown.y,loc.x-mousedown.x,loc.y-mousedown.y,{stroke:stroke.value, strokeWidth : strokewidth.value});
        let shape2 = generator.rectangle(mousedown.x+5,mousedown.y-5,loc.x-mousedown.x-10,loc.y-mousedown.y+ 10,{stroke:stroke.value, strokeWidth : strokewidth.value});//to fix
        roughCanvas.draw(shape1);
        roughCanvas.draw(shape2);
      }
      else if(loc.x<mousedown.x && loc.y<mousedown.y){
        let shape1 = generator.rectangle(mousedown.x,mousedown.y,loc.x-mousedown.x,loc.y-mousedown.y,{stroke:stroke.value, strokeWidth : strokewidth.value});
        let shape2 = generator.rectangle(mousedown.x-5,mousedown.y-5,loc.x-mousedown.x+10,loc.y-mousedown.y+10,{stroke:stroke.value, strokeWidth : strokewidth.value});//to fix
        roughCanvas.draw(shape1);
        roughCanvas.draw(shape2);
      }
      else if(loc.x<mousedown.x && loc.y>mousedown.y){
        let shape1 = generator.rectangle(mousedown.x,mousedown.y,loc.x-mousedown.x,loc.y-mousedown.y,{stroke:stroke.value, strokeWidth : strokewidth.value});
        let shape2 = generator.rectangle(mousedown.x-5,mousedown.y+5,loc.x-mousedown.x+10,loc.y-mousedown.y-10,{stroke:stroke.value, strokeWidth : strokewidth.value});//to fix
        roughCanvas.draw(shape1);
        roughCanvas.draw(shape2);
      }
    }
    else{
      if(loc.x>mousedown.x && loc.y>mousedown.y){
        let shape1 = generator.rectangle(mousedown.x,mousedown.y,loc.x-mousedown.x,loc.y-mousedown.y,{stroke:stroke.value, strokeWidth : strokewidth.value});
        let shape2 = generator.rectangle(mousedown.x+5,mousedown.y+5,loc.x-mousedown.x-10,loc.y-mousedown.y-10,{stroke:stroke.value, strokeWidth : strokewidth.value,fill: fill.value,fillStyle: currentStyle});//to fix
        roughCanvas.draw(shape1);
        roughCanvas.draw(shape2);
      }
      else if(loc.x>mousedown.x && loc.y<mousedown.y){
        let shape1 = generator.rectangle(mousedown.x,mousedown.y,loc.x-mousedown.x,loc.y-mousedown.y,{stroke:stroke.value, strokeWidth : strokewidth.value});
        let shape2 = generator.rectangle(mousedown.x+5,mousedown.y-5,loc.x-mousedown.x-10,loc.y-mousedown.y+ 10,{stroke:stroke.value, strokeWidth : strokewidth.value,fill: fill.value,fillStyle: currentStyle});//to fix
        roughCanvas.draw(shape1);
        roughCanvas.draw(shape2);
      }
      else if(loc.x<mousedown.x && loc.y<mousedown.y){
        let shape1 = generator.rectangle(mousedown.x,mousedown.y,loc.x-mousedown.x,loc.y-mousedown.y,{stroke:stroke.value, strokeWidth : strokewidth.value});
        let shape2 = generator.rectangle(mousedown.x-5,mousedown.y-5,loc.x-mousedown.x+10,loc.y-mousedown.y+10,{stroke:stroke.value, strokeWidth : strokewidth.value,fill: fill.value,fillStyle: currentStyle});//to fix
        roughCanvas.draw(shape1);
        roughCanvas.draw(shape2);
      }
      else if(loc.x<mousedown.x && loc.y>mousedown.y){
        let shape1 = generator.rectangle(mousedown.x,mousedown.y,loc.x-mousedown.x,loc.y-mousedown.y,{stroke:stroke.value, strokeWidth : strokewidth.value});
        let shape2 = generator.rectangle(mousedown.x-5,mousedown.y+5,loc.x-mousedown.x+10,loc.y-mousedown.y-10,{stroke:stroke.value, strokeWidth : strokewidth.value,fill: fill.value,fillStyle: currentStyle});//to fix
        roughCanvas.draw(shape1);
        roughCanvas.draw(shape2);
      }
    }
    
    
  }else if(currentTool==='assentity'){
    if(currentStyle==='none'){
      shape = generator.rectangle(mousedown.x,mousedown.y,loc.x-mousedown.x,loc.y-mousedown.y,{stroke:stroke.value, strokeWidth : strokewidth.value});
      roughCanvas.draw(shape);
      let shape2 = generator.polygon([[mousedown.x+(loc.x-mousedown.x)/2,mousedown.y],[loc.x,loc.y-(loc.y-mousedown.y)/2],[mousedown.x+(loc.x-mousedown.x)/2,loc.y],[mousedown.x,mousedown.y+(loc.y-mousedown.y)/2]],{stroke:stroke.value, strokeWidth : strokewidth.value});
      roughCanvas.draw(shape2);
    }
    else{
      shape = generator.rectangle(mousedown.x,mousedown.y,loc.x-mousedown.x,loc.y-mousedown.y,{stroke:stroke.value, strokeWidth : strokewidth.value});
      roughCanvas.draw(shape);
      let shape2 = generator.polygon([[mousedown.x+(loc.x-mousedown.x)/2,mousedown.y],[loc.x,loc.y-(loc.y-mousedown.y)/2],[mousedown.x+(loc.x-mousedown.x)/2,loc.y],[mousedown.x,mousedown.y+(loc.y-mousedown.y)/2]],{stroke:stroke.value, strokeWidth : strokewidth.value,fill: fill.value, fillStyle: currentStyle});
      roughCanvas.draw(shape2);
    }
    
  }
  else if(currentTool==='dashrectangle'){
    if(currentStyle==='none'){
      shape = generator.rectangle(mousedown.x,mousedown.y,loc.x-mousedown.x,loc.y-mousedown.y,{stroke:stroke.value, strokeLineDash : ([6]),strokeWidth : strokewidth.value});    
      roughCanvas.draw(shape);
    }
    else{
      shape = generator.rectangle(mousedown.x,mousedown.y,loc.x-mousedown.x,loc.y-mousedown.y,{stroke:stroke.value, strokeLineDash : ([6]),strokeWidth : strokewidth.value,fill: fill.value, fillStyle: currentStyle});    
      roughCanvas.draw(shape);
    }
    
    
  }else if(currentTool==='circle'){
    let d =  2*Math.hypot(loc.x - mousedown.x, loc.y - mousedown.y);
    if(currentStyle==='none'){
      shape = generator.circle(mousedown.x,mousedown.y,d,{stroke:stroke.value, strokeWidth : strokewidth.value});
      roughCanvas.draw(shape);
    }
    else{
      shape = generator.circle(mousedown.x,mousedown.y,d,{stroke:stroke.value, strokeWidth : strokewidth.value,fill: fill.value, fillStyle: currentStyle});
      roughCanvas.draw(shape);
    }
    
  } 
  else if(currentTool==='ellipse'){
    let width = Math.abs(loc.x - mousedown.x);
    let height = Math.abs(loc.y - mousedown.y);
    if(currentStyle==='none'){
      shape = generator.ellipse(mousedown.x,mousedown.y,width,height,{stroke:stroke.value, strokeWidth : strokewidth.value});
      roughCanvas.draw(shape);
    }
    else{
      shape = generator.ellipse(mousedown.x,mousedown.y,width,height,{stroke:stroke.value, strokeWidth : strokewidth.value,fill: fill.value, fillStyle: currentStyle});
      roughCanvas.draw(shape);
    }
    
  }
  else if(currentTool==='dellipse'){
    let width = Math.abs(loc.x - mousedown.x);
    let height = Math.abs(loc.y - mousedown.y);
    if(currentStyle==='none'){
      shape = generator.ellipse(mousedown.x,mousedown.y,width,height,{stroke:stroke.value, strokeWidth : strokewidth.value});
      let shape2 = generator.ellipse(mousedown.x,mousedown.y,width+12.5,height+12.5,{stroke:stroke.value, strokeWidth : strokewidth.value});
      roughCanvas.draw(shape2);
      roughCanvas.draw(shape);
    }
    else{
      shape = generator.ellipse(mousedown.x,mousedown.y,width,height,{stroke:stroke.value, strokeWidth : strokewidth.value,fill: fill.value, fillStyle: currentStyle});
      let shape2 = generator.ellipse(mousedown.x,mousedown.y,width+12.5,height+12.5,{stroke:stroke.value, strokeWidth : strokewidth.value});
      roughCanvas.draw(shape2);
      roughCanvas.draw(shape);
    }
    
  }
  else if(currentTool==='dashedellipse'){
    let width = Math.abs(loc.x - mousedown.x);
    let height = Math.abs(loc.y - mousedown.y);
    if(currentStyle==='none'){
      shape = generator.ellipse(mousedown.x,mousedown.y,width,height,{stroke:stroke.value, strokeLineDash : ([16]),strokeWidth : strokewidth.value});
      roughCanvas.draw(shape);
    }
    else{
      shape = generator.ellipse(mousedown.x,mousedown.y,width,height,{stroke:stroke.value, strokeLineDash : ([16]),strokeWidth : strokewidth.value,fill: fill.value, fillStyle: currentStyle});
      roughCanvas.draw(shape);
    }
    
  }
  else if(currentTool==='ltriangle'){
    let l = Math.abs(mousedown.x-loc.x);
    if(currentStyle==='none'){
      shape = generator.polygon([[mousedown.x, mousedown.y], [loc.x, mousedown.y], [(mousedown.x+loc.x)/2, mousedown.y+(l*Math.sin(Math.PI/3))]],{stroke:stroke.value, strokeWidth : strokewidth.value});
      roughCanvas.draw(shape); 
    }
    else{
      shape = generator.polygon([[mousedown.x, mousedown.y], [loc.x, mousedown.y], [(mousedown.x+loc.x)/2, mousedown.y+(l*Math.sin(Math.PI/3))]],{stroke:stroke.value, strokeWidth : strokewidth.value,fill: fill.value, fillStyle: currentStyle});
      roughCanvas.draw(shape); 
    }
     
  }
  else if(currentTool==='utriangle'){
    let l = Math.abs(mousedown.x-loc.x);
    if(currentStyle==='none'){
      shape = generator.polygon([[mousedown.x, mousedown.y], [loc.x, mousedown.y], [(mousedown.x+loc.x)/2, mousedown.y-(l*Math.sin(Math.PI/3))]],{stroke:stroke.value, strokeWidth : strokewidth.value});
      roughCanvas.draw(shape);  
    }
    else{
      shape = generator.polygon([[mousedown.x, mousedown.y], [loc.x, mousedown.y], [(mousedown.x+loc.x)/2, mousedown.y-(l*Math.sin(Math.PI/3))]],{stroke:stroke.value, strokeWidth : strokewidth.value,fill: fill.value, fillStyle: currentStyle});
      roughCanvas.draw(shape);  
    }
    
  }
  else if(currentTool==='rhombus'){    
    width = Math.abs(loc.x - mousedown.x);
    height = Math.abs(loc.y - mousedown.y);
    if(currentStyle==='none'){
      if(loc.x>mousedown.x){
        shape = generator.polygon([[mousedown.x, mousedown.y], [mousedown.x+width/2,mousedown.y-height/2],[loc.x, mousedown.y],[loc.x-width/2,mousedown.y+ height/2]],{stroke:stroke.value, strokeWidth : strokewidth.value});
        roughCanvas.draw(shape);  
      }
      else{
        shape = generator.polygon([[mousedown.x, mousedown.y], [mousedown.x-width/2,mousedown.y-height/2],[loc.x, mousedown.y],[loc.x+width/2,mousedown.y+ height/2]],{stroke:stroke.value, strokeWidth : strokewidth.value});
        roughCanvas.draw(shape);  
      }
    }
    else{
      if(loc.x>mousedown.x){
        shape = generator.polygon([[mousedown.x, mousedown.y], [mousedown.x+width/2,mousedown.y-height/2],[loc.x, mousedown.y],[loc.x-width/2,mousedown.y+ height/2]],{stroke:stroke.value, strokeWidth : strokewidth.value,fill: fill.value, fillStyle: currentStyle});
        roughCanvas.draw(shape);  
      }
      else{
        shape = generator.polygon([[mousedown.x, mousedown.y], [mousedown.x-width/2,mousedown.y-height/2],[loc.x, mousedown.y],[loc.x+width/2,mousedown.y+ height/2]],{stroke:stroke.value, strokeWidth : strokewidth.value,fill: fill.value, fillStyle: currentStyle});
        roughCanvas.draw(shape);  
      }
    }
    
    
  }
  else if(currentTool==='drhombus'){    
    width = Math.abs(loc.x - mousedown.x);
    height = Math.abs(loc.y - mousedown.y);
    if(currentStyle==='none'){
      if(loc.x>mousedown.x){
        let shape1 = generator.polygon([[mousedown.x, mousedown.y], [mousedown.x+width/2,mousedown.y-height/2],[loc.x, mousedown.y],[loc.x-width/2,mousedown.y+ height/2]],{stroke:stroke.value, strokeWidth : strokewidth.value});
        roughCanvas.draw(shape1);  
        let shape2 = generator.polygon([[mousedown.x-8, mousedown.y], [mousedown.x+width/2,mousedown.y-height/2 - 8],[loc.x + 8, mousedown.y],[loc.x-width/2,mousedown.y+ height/2 +8]],{stroke:stroke.value, strokeWidth : strokewidth.value});
        roughCanvas.draw(shape2);  
      }
      else{
        let shape3 = generator.polygon([[mousedown.x, mousedown.y], [mousedown.x-width/2,mousedown.y-height/2],[loc.x, mousedown.y],[loc.x+width/2,mousedown.y+ height/2]],{stroke:stroke.value, strokeWidth : strokewidth.value});
        roughCanvas.draw(shape3);  
        let shape4 = generator.polygon([[mousedown.x+8, mousedown.y], [mousedown.x-width/2,mousedown.y-height/2-8],[loc.x-8, mousedown.y],[loc.x+width/2,mousedown.y+ height/2+8]],{stroke:stroke.value, strokeWidth : strokewidth.value});
        roughCanvas.draw(shape4);  
      }
    }
    else{
      if(loc.x>mousedown.x){
        let shape1 = generator.polygon([[mousedown.x, mousedown.y], [mousedown.x+width/2,mousedown.y-height/2],[loc.x, mousedown.y],[loc.x-width/2,mousedown.y+ height/2]],{stroke:stroke.value, strokeWidth : strokewidth.value,fill: fill.value, fillStyle: currentStyle});
        roughCanvas.draw(shape1);  
        let shape2 = generator.polygon([[mousedown.x-8, mousedown.y], [mousedown.x+width/2,mousedown.y-height/2 - 8],[loc.x + 8, mousedown.y],[loc.x-width/2,mousedown.y+ height/2 +8]],{stroke:stroke.value, strokeWidth : strokewidth.value});
        roughCanvas.draw(shape2);  
      }
      else{
        let shape3 = generator.polygon([[mousedown.x, mousedown.y], [mousedown.x-width/2,mousedown.y-height/2],[loc.x, mousedown.y],[loc.x+width/2,mousedown.y+ height/2]],{stroke:stroke.value, strokeWidth : strokewidth.value,fill: fill.value, fillStyle: currentStyle});
        roughCanvas.draw(shape3);  
        let shape4 = generator.polygon([[mousedown.x+8, mousedown.y], [mousedown.x-width/2,mousedown.y-height/2-8],[loc.x-8, mousedown.y],[loc.x+width/2,mousedown.y+ height/2+8]],{stroke:stroke.value, strokeWidth : strokewidth.value});
        roughCanvas.draw(shape4);  
      }
    }
    
    
  }

}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");   
//ctx.clearRect(0,0,canvas.width,canvas.height);
ctx.fillStyle = "#badbdb";
ctx.fillRect(0,0,canvas.width,canvas.height);

let roughCanvas = rough.canvas(canvas);
let generator = roughCanvas.generator;
canvas.addEventListener("mousedown", ReactToMouseDown);
canvas.addEventListener("mousemove", ReactToMouseMove);
canvas.addEventListener("mouseup", ReactToMouseUp);

path_array.push(ctx.getImageData(0,0,canvas.width,canvas.height));
index += 1;



/*document.addEventListener("keydown",function(e){
  ctx.font = "16px Arial";
  ctx.fillText(e.key,mousedown.x,mousedown.y);
  mousedown.x += ctx.measureText(e.key);
});*/

class MouseDownPos{
  constructor(x,y) {
      this.x = x,
      this.y = y;
  }
}
class Location{
  constructor(x,y) {
      this.x = x,
      this.y = y;
  }
} 
let mousedown = new MouseDownPos(0,0);
let loc = new Location(0,0);
function GetMousePosition(x,y){    
  let canvasSizeData = canvas.getBoundingClientRect();
  return { x: (x - canvasSizeData.left) * (canvas.width  / canvasSizeData.width),
      y: (y - canvasSizeData.top)  * (canvas.height / canvasSizeData.height)
    };
}
function SaveCanvasImage(){    
  savedImageData = ctx.getImageData(0,0,canvas.width,canvas.height);
}

function RedrawCanvasImage(){    
  ctx.putImageData(savedImageData,0,0);
}
function ChangeTool(toolClicked){  
  document.getElementById("line").className = "";   
  document.getElementById("dashline").className = "";   
  document.getElementById("2line").className = "";     
  document.getElementById("arrow").className = "";   
  document.getElementById("rectangle").className = "";       
  document.getElementById("drectangle").className = "";
  document.getElementById("dashrectangle").className = "";     
  document.getElementById("ellipse").className = "";    
  document.getElementById("dellipse").className = "";   
  document.getElementById("dashedellipse").className = "";         
  document.getElementById("ltriangle").className = "";
  document.getElementById("utriangle").className = "";    
  document.getElementById("rhombus").className = "";   
  document.getElementById("drhombus").className = "";   
  document.getElementById("assentity").className = "";
  document.getElementById("circle").className = "";
  document.getElementById("text").className = "";
  document.getElementById("brush").className = "";  
  document.getElementById(toolClicked).className = "selected";
  currentTool = toolClicked;
}
function ChangeStyle(styleClicked){  
  document.getElementById("none").className = "";   
  document.getElementById("hachure").className = "";   
  document.getElementById("solid").className = "";     
  document.getElementById("zigzag").className = "";   
  document.getElementById("cross-hatch").className = "";       
  document.getElementById("dots").className = "";
  document.getElementById("dashed").className = "";     
  document.getElementById("zigzag-line").className = "";      
  document.getElementById(styleClicked).className = "selected2";
  currentStyle = styleClicked;
}
function ReactToMouseDown(e){
  canvas.style.cursor = "crosshair";
  loc = GetMousePosition(e.clientX, e.clientY);
  SaveCanvasImage();
  if(currentTool==='text'){
    message = document.getElementById("mytext").value;
    ctx.font = "15px Helvetica, Arial, sans-serif";  
    ctx.fillStyle = stroke.value;  
    //ReactToKeyDown();
  }
  
  mousedown.x = loc.x;
  mousedown.y = loc.y;

  dragging = true;
  if(currentTool === 'brush'){      
    usingBrush = true;    
    ctx.beginPath();
    ctx.moveTo(mousedown.x,mousedown.y);
    e.preventDefault();
  }    
};

function ReactToMouseMove(e){
  canvas.style.cursor = "crosshair";
  loc = GetMousePosition(e.clientX, e.clientY);
  if(currentTool=== 'text'){
    return;
  }
  if(currentTool==='brush' && usingBrush && dragging){
      ctx.lineTo(loc.x,loc.y); 
      ctx.strokeStyle = stroke.value;
      ctx.lineWidth = strokewidth.value;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";               
      ctx.stroke();
      //RedrawCanvasImage();
      e.preventDefault();
  }
  else{
    if(dragging){
      RedrawCanvasImage();
      drawelement(loc);
    }
  }
  
  
};

function ReactToMouseUp(e){
  canvas.style.cursor = "default";
  dragging = false;  
  if(currentTool === 'brush' && usingBrush){
    ctx.stroke();
    ctx.closePath();
    usingBrush = false;
}
  if(currentTool==='text'){     
    ctx.fillText(message,mousedown.x,mousedown.y);    
    //return; 
  }
  path_array.push(ctx.getImageData(0,0,canvas.width,canvas.height));
  index += 1;
}
function Clear_Canvas(){
  let text;
  if (confirm("Do you want to clear the Canvas?") == true) {
      text = "You pressed OK!";      
      //ctx.clearRect(0,0,canvas.width,canvas.height);      
      ctx.fillStyle = "#badbdb";
      ctx.fillRect(0,0,canvas.width,canvas.height);  
      path_array = [];
      index = -1;
      path_array.push(ctx.getImageData(0,0,canvas.width,canvas.height));
      index += 1;

  } else {
      text = "You canceled!";
  }   
}
function Save_Image(){    
  var download = document.getElementById("download");
  var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
  download.setAttribute("href", image);
}

function Undo(){
  if(index<=0){
      index=0;      
  }else{      
      index-=1;       
      path_array.pop();         
      ctx.putImageData(path_array[index],0 ,0);
  }    
}

 // Display the default slider value

// Update the current slider value (each time you drag the slider handle)


/*let canvas;
let ctx;
let strokeColor = 'black';
let fillColor = 'black';
let line_Width = 2;
let canvasWidth = 1200;
let canvasHeight = 600;
let start_bg_color = "white";

let dragging = false;
class MouseDownPos{
    constructor(x,y) {
        this.x = x,
        this.y = y;
    }
}
 
class Location{
    constructor(x,y) {
        this.x = x,
        this.y = y;
    }
}

let mousedown = new MouseDownPos(0,0);
let loc = new Location(0,0);

document.addEventListener('DOMContentLoaded', setupCanvas);

function setupCanvas(){
    // Get reference to canvas element
    //canvas = document.getElementById('canvas');
    // Get methods for manipulating the canvas
    //ctx = canvas.getContext('2d');
    //ctx.clearRect(0,0,canvas.width,canvas.height);        
    const rc = rough.canvas(document.getElementById('canvas'));
    const generator = rc.generator;
    // Execute ReactToMouseDown when the mouse is clicked
    canvas.addEventListener("mousedown", ReactToMouseDown);
    // Execute ReactToMouseMove when the mouse is clicked
    canvas.addEventListener("mousemove", ReactToMouseMove);
    // Execute ReactToMouseUp when the mouse is clicked
    canvas.addEventListener("mouseup", ReactToMouseUp);
}
function SaveCanvasImage(){    
  savedImageData = ctx.getImageData(0,0,canvas.width,canvas.height);
}

function RedrawCanvasImage(){    
  ctx.putImageData(savedImageData,0,0);
}
function ChangeTool(toolClicked){
  document.getElementById("line").className = "";
  document.getElementById("rectangle").className = "";
  document.getElementById(toolClicked).className = "selected";
  currentTool = toolClicked;
}


function GetMousePosition(x,y){
    // Get canvas size and position in web page
    let canvasSizeData = canvas.getBoundingClientRect();
    return { x: (x - canvasSizeData.left) * (canvas.width  / canvasSizeData.width),
        y: (y - canvasSizeData.top)  * (canvas.height / canvasSizeData.height)
      };
}
function UpdateRubberbandOnMove(loc){
  // Stores changing height, width, x & y position of most 
  // top left point being either the click or mouse location
  //UpdateRubberbandSizeData(loc);

  // Redraw the shape
  drawRubberbandShape(loc);
}
function drawRubberbandShape(loc){
  //ctx.strokeStyle = strokeColor;
  //ctx.fillStyle = fillColor;
  if(currentTool === "line"){          
      const roughelement = generator.line(150,150,600,600);
      rc.draw(roughelement);
  }   
  else if(currentTool === "rectangle"){        
      ctx.strokeRect(shapeBoundingBox.left, shapeBoundingBox.top, shapeBoundingBox.width, shapeBoundingBox.height);
  }
}
function ReactToMouseDown(e){
    canvas.style.cursor = "crosshair";
    loc = GetMousePosition(e.clientX, e.clientY);
    SaveCanvasImage();
    mousedown.x = loc.x;
    mousedown.y = loc.y;
    
    rc.draw(generator.line(60, 60, 190, 60));
    dragging = true;   
};

function ReactToMouseMove(e){
  canvas.style.cursor = "crosshair";
  loc = GetMousePosition(e.clientX, e.clientY);  
  
  if(dragging){
      RedrawCanvasImage();
      UpdateRubberbandOnMove(loc);
  }
};
  

function ReactToMouseUp(e){
  canvas.style.cursor = "default";
  loc = GetMousePosition(e.clientX, e.clientY);
  RedrawCanvasImage();
  UpdateRubberbandOnMove(loc);
  dragging = false;  
}




//////////////

/*(function($) {
    var tool;
    var canvas = $('paint');
    var ctx = canvas.getContext('2d');
    
    var history = {
      redo_list: [],
      undo_list: [],
      saveState: function(canvas, list, keep_redo) {
        keep_redo = keep_redo || false;
        if(!keep_redo) {
          this.redo_list = [];
        }
        
        (list || this.undo_list).push(canvas.toDataURL());   
      },
      undo: function(canvas, ctx) {
        this.restoreState(canvas, ctx, this.undo_list, this.redo_list);
      },
      redo: function(canvas, ctx) {
        this.restoreState(canvas, ctx, this.redo_list, this.undo_list);
      },
      restoreState: function(canvas, ctx,  pop, push) {
        if(pop.length) {
          this.saveState(canvas, push, true);
          var restore_state = pop.pop();
          var img = new Element('img', {'src':restore_state});
          img.onload = function() {
            ctx.clearRect(0, 0, 600, 400);
            ctx.drawImage(img, 0, 0, 600, 400, 0, 0, 600, 400);  
          }
        }
      }
    }
    
    var pencil = {
      options: {
        stroke_color: ['00', '00', '00'],
        dim: 4
      },
      init: function(canvas, ctx) {
        this.canvas = canvas;
        this.canvas_coords = this.canvas.getCoordinates();
        this.ctx = ctx;
        this.ctx.strokeColor = this.options.stroke_color;
        this.drawing = false;
        this.addCanvasEvents();
      },
      addCanvasEvents: function() {
        this.canvas.addEvent('mousedown', this.start.bind(this));
        this.canvas.addEvent('mousemove', this.stroke.bind(this));
        this.canvas.addEvent('mouseup', this.stop.bind(this));
        this.canvas.addEvent('mouseout', this.stop.bind(this));
      },
      start: function(evt) {
        var x = evt.page.x - this.canvas_coords.left;
        var y = evt.page.y - this.canvas_coords.top;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        history.saveState(this.canvas);
        this.drawing = true;
      },
      stroke: function(evt) {
        if(this.drawing) {
          var x = evt.page.x - this.canvas_coords.left;
          var y = evt.page.y - this.canvas_coords.top;
          this.ctx.lineTo(x, y);
          this.ctx.stroke();
          
        }
      },
      stop: function(evt) {
        if(this.drawing) this.drawing = false;
      }
    };
    
    $('pencil').addEvent('click', function() {
      pencil.init(canvas, ctx);
    });
    
    $('undo').addEvent('click', function() {
      history.undo(canvas, ctx);
    });
    
    $('redo').addEvent('click', function() {
      history.redo(canvas, ctx);
    });
  
    
  })(document.id)
  
  
  <input id="radio" type="radio" name="fillStyle" value="none" checked/>
                <label for="none">None</label>
                <input id="radio" type="radio" name="fillStyle" value="hachure"/>
                <label for="hachure">Hachure</label>
                <input id="radio" type="radio" name="fillStyle" value="solid"/>
                <label for="solid">Solid</label>
                <input id="radio" type="radio" name="fillStyle" value="zigzag"/>
                <label for="zigzag">Zigzag</label>
                <input id="radio" type="radio" name="fillStyle" value="cross-hatch"/>
                <label for="cross-hatch">Cross-Hatch</label>
                <input id="radio" type="radio" name="fillStyle" value="dots"/>
                <label for="dots">Dots</label>
                <input id="radio" type="radio" name="fillStyle" value="dashed"/>
                <label for="dashed ">Dashed </label>
                <input id="radio" type="radio" name="fillStyle" value="zigzag-line"/>
                <label for="zigzag-line">Zigzag-Line</label>    
  
  */

