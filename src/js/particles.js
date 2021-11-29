const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ufoImage = new Image();
ufoImage.src = "/src/resources/UFO2.png";

let particleArray = [];
const maxSize = 200;

class soaringUfo{
    constructor(){
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.xMomentum = Math.random();
        this.yMomentum = Math.random();
        this.rotation = 0;
        this.opacity = 1;
    }
        //draw
        

    draw(){
        context.save();
        context.globalAlpha = this.opacity;
        context.translate(this.x, this.y);
        context.drawImage(ufoImage, -ufoImage.width/4, -ufoImage.height/4, ufoImage.width/4, ufoImage.height/4);
        context.restore();
    }
    //update
    update(){
        this.opacity -=0.007;
        this.x += this.xMomentum;
        this.y += this.yMomentum;
    }
}

function spawnSoaringUfo(){
    particleArray.push(new soaringUfo());
}

//init
function init(){
    particleArray = [];
}

//animate
function animate(){
    requestAnimationFrame(animate);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context.clearRect(0,0, canvas.width, canvas.height);
    particleArray.forEach(function(particle){
        particle.update();
        particle.draw();
    });
    particleArray = particleArray.filter(function(particle){
        return particle.opacity >= 0.05;
    })
}

document.addEventListener('mousedown', spawnSoaringUfo);
    init();
    animate();


