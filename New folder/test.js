let cnv, ctx, w, h, dots;
let mouse = {
  x: undefined,
  y:undefined,
}

function init() {
  cnv = document.querySelector('#Canv');
  ctx = cnv.getContext('2d');
  resizeReset();
  animationLoop(); 
}

function resizeReset() {
  w = cnv.width = window.innerWidth;
  h = cnv.height = window.innerHeight;
  // alert(w,h)
  dots = [];
  for (let i = 0; i < 1000; i++) {
    dots.push(new Dot()); 
  }
  // console.log(dots)
}

function mousemove(e) {
  mouse.x = e.x; 
  mouse.y = e.y; 
}

function mouseout() {
    mouse.x = undefined; 
    mouse.y = undefined; 
}

function animationLoop() {
  ctx.clearRect(0, 0, w, h);
  ctx.globalCompositeOperation = "lighter";
  drawScene();
   requestAnimationFrame(animationLoop) 
}

function drawScene() {
 for (let i = 0; i < dots.length; i++) {
   dots[i].draw();
   dots[i].update(); 
 } 
}

function getRandomInt(min,max) {
  return Math.round(Math.random() * (max - min)) + min;
}

function easeOutQuad(x) {
return 1 - (1 - x) * (1 - x);
}

function easeOutElastic(x) {
const c4 = (2 * Math.PI) / 3;

return x === 0
  ? 0
  : x === 1
  ? 1
  : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
}


class Dot{
  constructor() {
    this.reset();
  }

  reset() {
    this.x = getRandomInt(0, w);
    this.y = getRandomInt(h-10, w-10);
    this.baseY = this.y;
    this.baseX = this.x;
    if (mouse.x) {
        this.centerX = mouse.x;
    } else {
      this.centerX = getRandomInt(0, w);
    }

    // if (mouse.y) {
    //    this.centery = mouse.y;
    // } else {
    //     this.centerY = getRandomInt(0, w);
    // }
    // alert(this.y)
    this.size = getRandomInt(1,2) ;
    this.rgba = [182, 112, 16, 1];
    this.time = 0;
    this.end = getRandomInt(100 , 300);
  }
  
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.rgba[0]} ,${this.rgba[1]} ,${this.rgba[2]} ,${this.rgba[3]})`;
    ctx.fill();
    ctx.closePath();
  }

  update() {
    if (this.time <= this.end) {
      let progress = 1 - (this.end - this.time) / this.end;
      this.y = this.baseY - (this.baseY * easeOutQuad(progress));
      this.x = this.baseX +((this.centerX - this.baseX) * easeOutElastic(progress));
      this.time++;
    } else {
       this.reset();
    }
 
  }

}

window.addEventListener('DOMContentLoaded', init);
window.addEventListener("resize",resizeReset);
window.addEventListener("mousemove",mousemove);
window.addEventListener("mouseout",mouseout);