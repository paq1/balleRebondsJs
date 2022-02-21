// initialisation du canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// chargement des sprites
const ballonImg = new Image()
ballonImg.src = "assets/sprites/ballon.png"

// chargement des sons
const myAudio = document.createElement("audio");
myAudio.src = "assets/sons/ballon.wav";

// chargement des données
let physic = {
    gravite: 0.9
}
let balle = {
    x: 0, 
    y: 0,
    masse: 10,
    vx: 0.0, 
    vy: 0.0,
    rebond: 0,
    stop: false
};
let sol = {
    x: 0,
    y: 600
}
let time = {
    dt: 0.0,
    oldTime: Date.now(),
    update: () => {
        const now = Date.now();
        const dateDt = (now - this.oldTime);
        this.dt = dateDt;
        this.oldTime = now;
        return this?.dt ? this.dt / 1000 : 0.0;
    }
}

function draw() {

    ctx.fillStyle = "#FF00FF"
    ctx.fillRect(0,0,canvas.clientWidth, canvas.clientHeight);
    ctx.drawImage(ballonImg, 0, 0, 250, 250, balle.x, balle.y, 250, 250);

}

function update() {
    time.dt = time.update();
    updateBalle(time.dt);
}

function loop() {
    draw();
    update();

    // appel recursif
    requestAnimationFrame(loop);
}

loop();

function updateBalle(dt) {
    if (!balle.stop) {
        balle.vy += balle.masse * physic.gravite * time.dt
        balle.y += balle.vy;
    }
    

    if (balle.y + 250 > 600) {
        balle.rebond += 2;
        balle.vy = -10 + balle.rebond;

        if (balle.vy >= 0) {
            balle.stop = true;
        }  else {
            myAudio.play();
        }
    }
}