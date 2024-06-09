const pointSize = 5 ;
const width = 600 ;
const height = 600 ;
const focalLength = 5 ;
var scale = 100 ;
var slider ;
var points = [] ;
points[0] = new Point(-1, -1, -1,[]);
points[1] = new Point(-1, 1, -1,[0]);
points[2] = new Point(1, 1, -1,[1]);
points[3] = new Point(1, -1, -1,[2,0]);
points[4] = new Point(-1, -1, 1,[0]);
points[5] = new Point(-1, 1, 1,[4,1]);
points[6] = new Point(1, 1, 1,[5,2]);
points[7] = new Point(1, -1, 1,[6,4,3]);

points[8] = new Point(-2, -2, -2,[0]);
points[9] = new Point(-2, 2, -2,[8,1]);
points[10] = new Point(2, 2, -2,[9,2]);
points[11] = new Point(2, -2, -2,[10,8,3]);
points[12] = new Point(-2, -2, 2,[8,4]);
points[13] = new Point(-2, 2, 2,[12,9,5]);
points[14] = new Point(2, 2, 2,[13,10,6]);
points[15] = new Point(2, -2, 2,[14,12,11,7]);

function setup() {
  createCanvas(width, height);
  slider = createSlider(10,width/4,scale);
  slider.position(10,10);
  perspectiving(focalLength,points);
}

function draw() {
  // frameRate(1);
  translate(width/2,height/2);
  scale = slider.value();
  background(0);
  fill(255);
  drawLines(points);
  drawPoints(points);
  rotating(0,0.03,0,points);
}


function drawPoints(a){
  fill(255);
  for(let i=0 ; i<a.length ;i++){
    circle(a[i].x*scale,a[i].y*scale,pointSize);
  }
}

function drawLines(a){
  noFill();
  stroke(150);
  strokeWeight(1);
  for(let i=0 ; i<a.length ; i++){
    for(let j=0 ; j<a[i].link.length ; j++){
      line(a[i].x*scale , a[i].y*scale,a[a[i].link[j]].x*scale,a[a[i].link[j]].y*scale);
    }
  }
}

function fixPerspectiving(flength,a){
  for(let i=0 ; i<a.length ; i++){
    a[i].x = a[i].x*(flength+a[i].z)/(flength);
    a[i].y = a[i].y*(flength+a[i].z)/(flength);
  }
}

function perspectiving(flength,a){
  for(let i=0 ; i<a.length ; i++){
    a[i].x = (flength*a[i].x)/(flength+a[i].z);
    a[i].y = (flength*a[i].y)/(flength+a[i].z);
  }
}

function rotating(xAngle,yAngle,zAngle,a){
  fixPerspectiving(focalLength,points);
  if(xAngle!=0)rotatingX(xAngle,a);
  if(yAngle!=0)rotatingY(yAngle,a);
  if(zAngle!=0)rotatingZ(zAngle,a);
  perspectiving(focalLength,points);
}

function rotatingX(xAngle,a){
  for(let i=0 ; i<a.length ;i++){
    y = a[i].y ;
    z = a[i].z ;
    a[i].y = y*Math.cos(xAngle)-z*Math.sin(xAngle);  
    a[i].z = y*Math.sin(xAngle)+z*Math.cos(xAngle);
  }
}

function rotatingY(yAngle,a){
  for(let i=0 ; i<a.length ;i++){
    x = a[i].x ;
    z = a[i].z ;
    a[i].x = x*Math.cos(yAngle)+z*Math.sin(yAngle);  
    a[i].z = -x*Math.sin(yAngle)+z*Math.cos(yAngle);
  }
}

function rotatingZ(zAngle,a){
  for(let i=0 ; i<a.length ;i++){
    x = a[i].x ;
    y = a[i].y ;
    a[i].x = x*Math.cos(zAngle)-y*Math.sin(zAngle);  
    a[i].y = x*Math.sin(zAngle)+y*Math.cos(zAngle);
  }
}

function Point(x,y,z,link){
  this.x = x ;
  this.y = y ;
  this.z = z ;
  this.link = link ;
}