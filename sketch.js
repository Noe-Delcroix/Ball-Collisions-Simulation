var balls = []
var lines = []
var sBall=null
var sLine=null
var sLinePoint

var Sgravity,Sfriction,Sbounciness
var p1,p2,p3
var Cdebug,Ctpx,Ctpy


function setup() {
  let C=createCanvas(min(windowWidth,windowHeight), min(windowWidth,windowHeight))
  for (let i=0; i<100; i++){
    balls.push(new Ball(random(10,width-10),random(10,height-10),20))
  }
  //lines.push(new Line(0,0,300,300,5))
  
  p1=createElement("h4","")
  p1.position(width,-20)
  Sgravity=createSlider(-1,1,0,0.1)
  Sgravity.position(width,30)
  
  p2=createElement("h4","")
  p2.position(width,30)
  Sfriction=createSlider(0.8,1,0.99,0.005)
  Sfriction.position(width,80)
  
  p3=createElement("h4","")
  p3.position(width,80)
  Sbounciness=createSlider(0,1,0.92,0.01)
  Sbounciness.position(width,130)
  
  Ctpx=createCheckbox("Horizontal Edges Collisions",true)
  Ctpx.position(width,160)
  Ctpy=createCheckbox("Vertical Edges Collisions",true)
  Ctpy.position(width,180)
  Cdebug=createCheckbox("Show Debug Information",false)
  Cdebug.position(width,200)
}


function draw() {
  
  p1.html(" Gravity : "+Sgravity.value())
  p2.html(" Friction : "+Sfriction.value())
  p3.html(" Bounciness : "+Sbounciness.value())
  
  background(0);
  
  for (let ball of balls){
    ball.update()  
    ball.render() 
  }
  for (let l of lines){
    l.update()
    l.render()
  }
  
  
  
  if (!mouseIsPressed && sBall!=null){
    sBall.vel=createVector(constrain(mouseX-pmouseX,-40,40),constrain(mouseY-pmouseY,-40,40))
    sBall=null 
  }
  
  if (!mouseIsPressed){
    sLine=null 
  }
}

function ballCollide(b1,b2){
  return (b1.pos.dist(b2.pos)<=b1.r+b2.r) 
}

function mouseWheel(event){
  if (sBall!=null){
    sBall.r-=event.delta/1000*sBall.r 
    sBall.r=constrain(sBall.r,10,100)
  
  }else if (sLine!=null){
    sLine.r-=event.delta/1000*sLine.r 
    sLine.r=constrain(sLine.r,5,20)
  }
}
