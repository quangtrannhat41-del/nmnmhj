// ====================== SAO RƠI + POPUP ======================
const starsIcon = ["⭐","🌟","✨","💫","🌠"];
const cards = [
  { img:"anh1.jpg", text:"Chúc bạn năm mới thật nhiều niềm vui ❤️" },
  { img:"anh2.jpg", text:"Chúc bạn luôn hạnh phúc 💕" },
  { img:"anh3.jpg", text:"Chúc năm 2026 thật rực rỡ ✨" }
];

let currentIndex = 0;

const popup = document.getElementById("popup");
const popupImg = document.getElementById("popup-img");
const popupText = document.getElementById("popup-text");

function showCard(){
  popupImg.src = cards[currentIndex].img;
  popupText.innerText = cards[currentIndex].text;
  popup.style.display = "flex";
  currentIndex = (currentIndex+1)%cards.length;
}

function createStar(){
  const star = document.createElement("div");
  star.className="star";
  star.textContent = starsIcon[Math.floor(Math.random()*starsIcon.length)];
  star.style.left = Math.random()*window.innerWidth+"px";
  star.style.fontSize = (20+Math.random()*20)+"px";
  star.style.animationDuration = (5+Math.random()*4)+"s";

  star.onclick = showCard;

  document.body.appendChild(star);
  setTimeout(()=>star.remove(),9000);
}

setInterval(createStar,700);

popup.onclick=()=>popup.style.display="none";


// ====================== PHÁO HOA ======================
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

function resize(){
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
resize();
addEventListener("resize",resize);

class Rocket{
  constructor(){
    this.x=Math.random()*canvas.width;
    this.y=canvas.height;
    this.targetY=Math.random()*canvas.height*0.5+80;
    this.speed=7;
    this.color=`hsl(${Math.random()*360},100%,60%)`;
  }
  update(){
    this.y-=this.speed;
    this.speed*=0.98;
  }
  draw(){
    ctx.beginPath();
    ctx.arc(this.x,this.y,3,0,Math.PI*2);
    ctx.fillStyle=this.color;
    ctx.shadowColor=this.color;
    ctx.shadowBlur=15;
    ctx.fill();
  }
}

class Particle{
  constructor(x,y,vx,vy,color){
    this.x=x;
    this.y=y;
    this.vx=vx;
    this.vy=vy;
    this.life=100;
    this.color=color;
  }
  update(){
    this.x+=this.vx;
    this.y+=this.vy;
    this.vy+=0.05;
    this.vx*=0.99;
    this.vy*=0.99;
    this.life--;
  }
  draw(){
    ctx.globalAlpha=this.life/100;
    ctx.beginPath();
    ctx.arc(this.x,this.y,2,0,Math.PI*2);
    ctx.fillStyle=this.color;
    ctx.fill();
    ctx.globalAlpha=1;
  }
}

let rockets=[];
let particles=[];

function explode(x,y,color){
  const type=Math.floor(Math.random()*4);
  if(type===0) shapeCircle(x,y,color);
  else if(type===1) shapeHeart(x,y,color);
  else if(type===2) shapeStar(x,y,color);
  else shapeFlower(x,y,color);
}

function shapeCircle(x,y,color){
  const count=80;
  for(let i=0;i<count;i++){
    const angle=(Math.PI*2/count)*i;
    particles.push(new Particle(
      x,y,
      Math.cos(angle)*4,
      Math.sin(angle)*4,
      color
    ));
  }
}

function shapeHeart(x,y,color){
  for(let t=0;t<Math.PI*2;t+=0.05){
    const hx=16*Math.pow(Math.sin(t),3);
    const hy=13*Math.cos(t)
            -5*Math.cos(2*t)
            -2*Math.cos(3*t)
            -Math.cos(4*t);
    particles.push(new Particle(
      x,y,
      hx*0.25,
      -hy*0.25,
      color
    ));
  }
}

function shapeStar(x,y,color){
  const spikes=5;
  const outer=5;
  const inner=2.5;
  for(let i=0;i<spikes*2;i++){
    const r=i%2===0?outer:inner;
    const angle=(Math.PI*i)/spikes;
    particles.push(new Particle(
      x,y,
      Math.cos(angle)*r,
      Math.sin(angle)*r,
      color
    ));
  }
}

function shapeFlower(x,y,color){
  const petals=8;
  for(let i=0;i<petals;i++){
    const angle=(Math.PI*2/petals)*i;
    for(let r=0;r<4;r++){
      particles.push(new Particle(
        x,y,
        Math.cos(angle)*(r+1)*1.5,
        Math.sin(angle)*(r+1)*1.5,
        color
      ));
    }
  }
}

function animate(){
  ctx.fillStyle="rgba(0,0,20,0.25)";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  if(Math.random()<0.03) rockets.push(new Rocket());

  rockets.forEach((r,i)=>{
    r.update();
    r.draw();
    if(r.y<=r.targetY){
      explode(r.x,r.y,r.color);
      rockets.splice(i,1);
    }
  });

  particles.forEach((p,i)=>{
    p.update();
    p.draw();
    if(p.life<=0) particles.splice(i,1);
  });

  requestAnimationFrame(animate);
}

animate();

