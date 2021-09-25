class Line {
  constructor(x1, y1, x2, y2, r) {
    this.start = createVector(x1, y1)
    this.end = createVector(x2, y2)
    this.r = r
  }
  render() {
  
    stroke(255)
    noFill()
    strokeWeight(2 * this.r)
    line(this.start.x, this.start.y, this.end.x, this.end.y)
    fill(0,255,0)
    noStroke()
    
    if (sLine==this && sLinePoint==1){
      circle(this.start.x,this.start.y,this.r*1.8)
    }else if (sLine==this && sLinePoint==2){
      circle(this.end.x,this.end.y,this.r*1.8)
    }
    
  }

  update() {
    if (mouseIsPressed && mouseButton == LEFT && sBall == null && sLine == null) {
      if (dist(mouseX, mouseY, this.start.x, this.start.y) < this.r) {
        sLine = this
        sLinePoint = 1
      } else if (dist(mouseX, mouseY, this.end.x, this.end.y) < this.r) {
        sLine = this
        sLinePoint = 2
      }
    }
    
    if (sLine==this){
      if (sLinePoint==1){
        this.start=createVector(mouseX,mouseY) 
      }else if (sLinePoint==2){
        this.end=createVector(mouseX,mouseY) 
      }
    }

  }
}