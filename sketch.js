var mic, volume;

var myImg ;
var myImg2;
var myImg3;

var scrats = [];
var squirrel = [];

var sX;
var sY;

var counter = 0;




 function preload() { // preload() runs once

     myImg = loadImage('./assets/ghianda.png');
     myImg2 = loadImage('./assets/tree.png');
     myImg3 = loadImage('./assets/scrat.png');

 }



function setup() {
  createCanvas(windowWidth, windowHeight)

    //Deal with microphone
  mic = new p5.AudioIn();
  mic.start();

  var scratNumber =25;

  for (var i = 0; i < scratNumber; i++) {
    var myScrat = new Scrats(myImg,random(width/3, width/2+180), random(height/4, height/2), 35,35);

    myScrat.speed = random(1, 3)
    scrats.push(myScrat);
  }




}




function draw() {
  volume = mic.getLevel();
  // volume = map(0,1,0,2);

  background('lightblue');



  imageMode(CENTER);
  image(myImg2,width/2,height/2,750,700);

  rectMode(CENTER);
  fill(30,18,2);
  noStroke();
  rect(0, height/2 + 350, width + 2000, 55);

  noCursor();
  rectMode(CENTER);

  var sX = mouseX;
  var sY = height/2 +290;
  var myBar = new Bar(sX, sY, 150, 170);

  myBar.displaysxsy();

  textAlign(50,150);
  fill(27, 94, 32);
  textFont('Helvetica');
  textStyle(BOLD);
  textSize(30);
  text('Make noise and', width/2-750, height/3-100);
  text('use your mouse', width/2-750, height/3-50);
  text('to help Scrat!', width/2-750, height/3);

  //ghianda

  for (var j = 0; j < scrats.length; j++) {
    // scrats[j].move();
    scrats[j].display();
    if (volume > 0.01 ) {

        scrats[j].move(sX,sY);
  }

  }



}

function Bar(_sX, _sY, _sH, _sW) {

  this.x = _sX;
  this.y = _sY;
  this.w = _sW;
  this.h = _sH;

  this.displaysxsy = function() {
    image(myImg3,this.x, this.y, this.w, this.h)
  }
}

function Scrats(_img, _x, _y, _w, _h) {
  this.img = _img
  this.x = _x
  this.y = _y
  this.w = _w
  this.h = _h
  this.speed = 2;
  this.counter = counter;


  var yDir = random(0,1);
  var xDir = random(-1,1);

  this.display = function() {
    image(this.img, this.x, this.y,this.w, this.h)
  }

  this.move = function(sX,sY) {
    this.x += this.speed * xDir;
    this.y += this.speed * yDir;

    if (this.x <= sX + 25 && this.y <= sY + 25 && this.x >= sX - 25 && this.y >= sY - 25) {
     this.x = random(0, width);
     this.y = random(0, height);
     this.speedx *= 1.2;
     this.speedy *= 1.2;
     counter += 1;
   }

  }
}
