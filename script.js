// ================== NHẠC ==================
const bgm = document.getElementById("bgm");

function startMusic() {
  bgm.volume = 0.5;
  bgm.play().catch(()=>{});
  document.removeEventListener("click", startMusic);
}

document.addEventListener("click", startMusic);


// ================== SAO RƠI ==================
const icons = ["⭐","🌟","✨","💫"];
const cards = [
  {img:"anh1.jpg", text:"Chúc bạn năm mới vui vẻ ❤️"},
  {img:"anh2.jpg", text:"Chúc bạn hạnh phúc 💕"},
  {img:"anh3.jpg", text:"Chúc 2026 rực rỡ ✨"}
];

let index = 0;

const popup = document.getElementById("popup");
const popupImg = document.getElementById("popup-img");
const popupText = document.getElementById("popup-text");

function showCard(){
  popupImg.src = cards[index].img;
  popupText.innerText = cards[index].text;
  popup.style.display = "flex";
  index = (index + 1) % cards.length;
}

function createStar(){
  const star = document.createElement("div");
  star.className="star";
  star.textContent = icons[Math.floor(Math.random()*icons.length)];
  star.style.left = Math.random()*window.innerWidth+"px";
  star.style.fontSize = (20+Math.random()*20)+"px";
  star.style.animationDuration = (5+Math.random()*4)+"s";
  star.onclick = showCard;
  document.body.appendChild(star);
  setTimeout(()=>star.remove(),9000);
}

setInterval(createStar,700);

popup.onclick=()=>popup.style.display="none";


// ================== PHÁO HOA ==================
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

function resize(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize",resize);

class Particle{
  constructor(x,y,vx,vy,color){
    this.x=x;
    this.y=y;
    this.vx=vx;
    this.vy=vy;
    this.life=80;
    this.color=color;
  }
  update(){
    this.x+=this.vx;
    this.y+=this.vy;
    this.vy+=0.04;
    this.life--;
  }
  draw(){
    ctx.globalAlpha=this.life/80;
    ctx.beginPath();
    ctx.arc(this.x,this.y,2,0,Math.PI*2);
    ctx.fillStyle=this.color;
    ctx.fill();
    ctx.globalAlpha=1;
  }
}

let particles=[];

function explode(x,y){
  const color=`hsl(${Math.random()*360},100%,60%)`;
  const count=80;
  for(let i=0;i<count;i++){
    const angle=(Math.PI*2/count)*i;
    particles.push(new Particle(
      x,y,
      Math.cos(angle)*3,
      Math.sin(angle)*3,
      color
    ));
  }
}

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  if(Math.random()<0.04){
    explode(
      Math.random()*canvas.width,
      Math.random()*canvas.height*0.5
    );
  }

  particles.forEach((p,i)=>{
    p.update();
    p.draw();
    if(p.life<=0) particles.splice(i,1);
  });

  requestAnimationFrame(animate);
}

animate();
