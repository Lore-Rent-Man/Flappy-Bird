let canvas = document.getElementById("fbcanvas");
let ctx = canvas.getContext("2d");

let bird = new Image();
let background = new Image();
let foreground = new Image();
let pipeNorth = new Image();
let pipeSouth = new Image();

bird.src = 'images/bird.png';
background.src = 'images/bg.png';
foreground.src = 'images/fg.png';
pipeNorth.src = 'images/pipeNorth.png';
pipeSouth.src = 'images/pipeSouth.png';

//This variable is the gap between the north and the south pipe
let gap = 85;

//This variable represents the south pipe location
let pipeSouthLoc;

//This variable represents the bird's X and Y locations
let bX = 10;
let bY = 150;

//This variable represents gravity, which is how fast the bird will move down towards the ground
let gravity = 0.1;

//This variable represents the score
let score = 0;

//This variable represents the velocity of the bird
let velocity = 0;

document.addEventListener("keydown", moveUp);

function moveUp(){
    velocity = -2;
}

let pipe = [];

pipe[0] = {
    x: canvas.width,
    y: 0
};

function draw(){
    ctx.drawImage(background, 0, 0);

    for(let i = 0; i < pipe.length; i++)
    {
        let constant = pipeNorth.height + gap;
        ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);

        pipe[i].x--;

        if(pipe[i].x == 125)
        {
            pipe.push({
                x: canvas.width,
                y: Math.floor(Math.random()*pipeNorth.height) - pipeNorth.height
            });
        }

        //Checks if bird x location is within the pipes
        if((bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY+bird.height >= pipe[i].y+constant)) || bY + bird.height >=  canvas.height - foreground.height){
            location.reload(); // reload the page
        }

        if(pipe[i].x == 5){
            score++;
        }
    }

    ctx.drawImage(bird, bX, bY);
    velocity += gravity;

    bY += velocity;

    ctx.drawImage(foreground, 0, canvas.height - foreground.height);

    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score: "+score, 10, canvas.height - 20);
}

let interval = setInterval(draw, 10);