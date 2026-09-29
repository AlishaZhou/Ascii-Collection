
let size;
//https://paulbourke.net/dataformats/asciiart/
//ordered from most to least dense
// let asciiChar = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~<>i!lI;:,^`'.";
let asciiChar = " .:-=+*#%@";
let video; 
let vidw = 80; 
let vidh = 49;
let scl;
let w, h;
let font;

async function setup() {
  scl = min(windowWidth / vidw, windowHeight / vidh);

  let canvasW = vidw * scl;
  let canvasH = vidh * scl;
  var cnv = createCanvas(canvasW, canvasH);
  cnv.parent("container"); 
  // cnvs.style('display', 'block');

  //console logs w&h
  // print(img.width, img.height);

  // Resize the image, if ony 1st arguement is included, resizes porportionally.
  // img.resize(80, 0);
  // size = width/img.width; 
  // print(img.width, img.height);
  video = createCapture(VIDEO);
  //size of video cam
  video.size(vidw,vidh);
  video.hide();
  w = width/video.width;
  h = height/video.height;
  
  angleMode(DEGREES); 
  // noCursor();
  //css
  font = await loadFont('Bixelletter-Regular.otf')
  textFont(font);
  textSize(scl);
  textAlign(CENTER, CENTER);
  noStroke(); 

}

function windowResized() {
  scl = min(windowWidth / vidw, windowHeight / vidh);

  resizeCanvas(vidw * scl, vidh * scl);

  w = scl;
  h = scl;

  textSize(min(w, h));
}
function draw() {

  background(0);

  video.loadPixels();
  push();
    //flip image
  translate(vidw*scl, 0);
  scale(-1, 1);
  // using get() to get pixel values
  //i,j = x,y of pixel location
  for (let i=0; i<video.width; i++){
    for (let j=0; j<video.height; j++){
      let pixelIndex = (i + j*video.width) * 4;
      let r = video.pixels[pixelIndex + 0];
      let g = video.pixels[pixelIndex + 1];
      let b = video.pixels[pixelIndex + 2];
      
      // let bright = brightness(color(r, g, b))
      let bright = (r + g + b) / 3;
      let tIndex = floor(map(bright, 0, 255, 0, asciiChar.length-1));
      
      //x,y = plot point for text
      let x = ((i*w + w/2));
      let y = j*h + h/2;
      //selects from string asciiChar based on value tIndex
      let t = asciiChar.charAt(tIndex);

      fill(r, g, b);
      text(t, x, y);
    }
  }
  pop();
  
  // push();
  // // rotate(-45);
  // fill('white');
  // if(mouseIsPressed == true){
  //   textSize(1.5*scl);
  //    text("O",mouseX,mouseY);
  // }
  //    else {
  //     textSize(2*scl);
  //     text("+",mouseX,mouseY);
  //    }
  // pop();
}

  // Display the image and places it in top left corner.
  // image(video, 0, 0);
