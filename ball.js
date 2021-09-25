class Ball{
  constructor(x,y,r){
    this.pos=createVector(x,y)
    this.vel=createVector(0,0)
    this.acc=createVector(0,0)
    this.r=r
    this.mass=this.r*this.r
    this.col=color(random(255),random(255),random(255))
    //this.col=color(0,255,255)
  }
  
  keepOnScreen(tpx,tpy,velocityLoss){
    if (this.pos.x<=0){
      if (tpx){
        this.pos.x=width-5
      }else{
        this.pos.x=1
        this.vel.x*=-velocityLoss
      }
    }if (this.pos.x>=width){
      if (tpx){
        this.pos.x=5
      }else{
        this.pos.x=width-1
        this.vel.x*=-velocityLoss
      }
    }if (this.pos.y<=0){
      if (tpy){
        this.pos.y=height-5 
      }else{
        this.pos.y=1
        this.vel.y*=-velocityLoss
      }
    }if (this.pos.y>=width){
      if (tpy){
        this.pos.y=5 
      }else{
        this.pos.y=height-1
        this.vel.y*=-velocityLoss
      }
    }
  }
  
  render(){
    push()
    translate(this.pos.x,this.pos.y)
    
    if (Cdebug.checked()){
    noFill()
    if (sBall==this){
      stroke(0,255,0)
    }else{
      stroke(255)
    }
    
    strokeWeight(2)
    circle(0,0,this.r*2)
    rotate(this.vel.heading())
    line(0,0,this.r,0) 
    }else{
      fill(this.col)
      noStroke()
      circle(0,0,this.r*2)
    }
    
    pop()
  
  }
  staticCollisions(){
    for (let l of lines){
      let fLineX1=l.end.x - l.start.x 
      let fLineY1=l.end.y - l.start.y  
      
      let fLineX2=this.pos.x - l.start.x 
      let fLineY2=this.pos.y - l.start.y  
      
      let fEdgeLength=fLineX1*fLineX1+fLineY1*fLineY1
      
      let t=max(0,min(fEdgeLength,(fLineX1*fLineX2+fLineY1*fLineY2)))/fEdgeLength
      
      let closestX=l.start.x+t*fLineX1
      let closestY=l.start.y+t*fLineY1
      
      let d=this.pos.dist(createVector(closestX,closestY))
      
      if (d<this.r+l.r){
        this.col=color(255,0,0)
      }else{
        this.col=color(0,255,255)
      }
    }
    
    for (let other of balls){
      if (other!=this){
        if (ballCollide(this,other)){
          stroke(255,0,0)
          if (Cdebug.checked()){
            strokeWeight(1)
            line(this.pos.x,this.pos.y,other.pos.x,other.pos.y)
          }
          
          let fdist=this.pos.dist(other.pos)
          let overlap=(fdist-this.r-other.r)/2
          
          other.pos.x+=overlap*(this.pos.x-other.pos.x)/fdist
          other.pos.y+=overlap*(this.pos.y-other.pos.y)/fdist
          
          this.pos.x-=overlap*(this.pos.x-other.pos.x)/fdist
          this.pos.y-=overlap*(this.pos.y-other.pos.y)/fdist
        }    
      }
    }
  }
  
  dynamicCollisions(velocityLoss){
    for (let other of balls){
      if (other!=this){
        if (ballCollide(this,other)){
          let fdist=this.pos.dist(other.pos)
          
          let nx=(other.pos.x-this.pos.x)/fdist
          let ny=(other.pos.y-this.pos.y)/fdist
          
          let tx=-ny
          let ty=nx
          
          let dpTan1=this.vel.x*tx+this.vel.y*ty
          let dpTan2=other.vel.x*tx+other.vel.y*ty
          
          let dpNorm1=this.vel.x*nx+this.vel.y*ny
          let dpNorm2=other.vel.x*nx+other.vel.y*ny
          
          let m1 = (dpNorm1 * (this.mass - other.mass) + 2.0 * other.mass * dpNorm2) / (this.mass + other.mass);
			let m2 = (dpNorm2 * (other.mass - this.mass) + 2.0 * this.mass * dpNorm1) / (this.mass + other.mass);
          
          
          this.vel.x=(tx*dpTan1+nx*m1)*velocityLoss
          this.vel.y=(ty*dpTan1+ny*m1)*velocityLoss
          other.vel.x=(tx*dpTan2+nx*m2)
          other.vel.y=(ty*dpTan2+ny*m2)
        }
      }
    }
  }
  
  applyForce(force){
    this.acc=force 
  }
  
  update(){  
    this.mass=this.r*this.r
    
    
    this.dynamicCollisions(Sbounciness.value())
    this.staticCollisions()
    this.applyForce(createVector(0,Sgravity.value()))
    this.pos.add(this.vel)
    this.vel.add(this.acc)
    this.vel.mult(Sfriction.value())
    if (this.vel.mag()<0.02){
      this.vel.mult(0)
    }
    
    
    if (this==sBall){
      this.vel.mult(0)
      this.pos=createVector(mouseX,mouseY)
    }
    
    
    
    if (mouseIsPressed && mouseButton==LEFT && dist(mouseX,mouseY,this.pos.x,this.pos.y)<this.r && sBall==null && sLine==null){
      sBall=this
    }
    this.keepOnScreen(!Ctpx.checked(),!Ctpy.checked(),Sbounciness.value())
  }
  
  
}