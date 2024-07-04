const canvas = document.getElementById("gamecanvas");
const ctx = canvas.getContext('2d'); // context property of canvas tells us dimensions of the canvas: 1D, 2D, 3D etc

const gridSize = 20;
const canvasSize = 400;

canvas.width = canvasSize;
canvas.height = canvasSize;

let snake=[{x:gridSize*5,y:gridSize*5}];//[(100,100)]
let direction='right'
let food={x:Math.floor(Math.random()*canvasSize/gridSize)*gridSize,y:Math.floor(Math.random()*canvasSize/gridSize)*gridSize}

let score = 0;

function drawRect(x,y,color){
  ctx.fillStyle=color;
  ctx.fillRect(x,y,gridSize,gridSize); // starting coordinates(x, y), width, height makes up the entire rectangel
}
function drawSnake(){
  snake.forEach(segment=> drawRect(segment.x,segment.y,'green'));
}
 
function drawFood(){
  drawRect(food.x,food.y,'red');
}
function updateSnake()
{
  const head = {x:snake[0].x,y:snake[0].y};
  if(direction ==='right') head.x+=gridSize;
  if(direction ==='left')  head.x-=gridSize;
  if(direction ==='up')    head.y-=gridSize;
  if(direction ==='down')  head.y+=gridSize;

  if(head.x === food.x && head.y === food.y){
      score++;
      document.getElementById('score').textContent='Score :'+score;
      food={x:Math.floor(Math.random()*canvasSize/gridSize) * gridSize, y:Math.floor(Math.random()*canvasSize/gridSize)*gridSize}
  }else{
    snake.pop();// removes the last segment since snake does not grow 
  }


// after eating food, snake size will increase
snake.unshift(head);// adds new head 
// a=[1,2,3] a.unshift(4,5) ---> 4,5,1,2,3


// to avoid self collision
for (let i = 1; i < snake.length; i++) { 
    if (snake[i].x === head.x && snake[i].y === head.y){
        { 
            resetGame(); 
            return; 
        } 
    }

}

// collision with wall
if(head.x < 0 || head.y < 0 || head.x >= canvasSize || head.y >= canvasSize){
    resetgame();
}

}


function resetgame(){
  direction ='right';
  snake=[{x:gridSize*5,y:gridSize*5}];
  score=0;
  document.getElementById('score').text='Score :'+ score;
  food={x:Math.floor(Math.random()*canvasSize/gridSize)*gridSize,y:Math.floor(Math.random()*canvasSize/gridSize)*gridSize}

}

function changeDirection(event) {
  const keyPressed = event.key;
  if (keyPressed === 'ArrowRight' && direction !== 'left') direction = 'right';
  if (keyPressed === 'ArrowLeft' && direction !== 'right') direction = 'left';
  if (keyPressed === 'ArrowUp' && direction !== 'down') direction = 'up';
  if (keyPressed === 'ArrowDown' && direction !== 'up') direction = 'down';
}

document.addEventListener('keydown',changeDirection);
function gameloop(){
  ctx.clearRect(0,0,canvasSize,canvasSize);
  drawSnake();
  drawFood();
  updateSnake();
}

setInterval(gameloop,300);