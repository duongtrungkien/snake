var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var direction = 'right';
var snakeX = 300;
var snakeY = 200;
var foodX = 300;
var foodY = 200;
var speed = 10;
var score = 0;
var snake = [];
var isLose = false;


// SnakeBody object 
var SnakeBody = function (x, y) {
	
	this.x = x;
	this.y = y;
	
	this.draw = function () {
		ctx.fillStyle ="blue";
		ctx.strokeStyle = "red";
		ctx.fillRect(this.x, this.y , 10 , 10);
		ctx.strokeRect(this.x , this.y , 10 , 10);
	}
}
// creat head for snake
var head = {
	x 		: snakeX,
	y 		: snakeY,
	draw 	: function () {

		ctx.fillStyle ="blue";
		ctx.strokeStyle = "red";
		ctx.fillRect(this.x, this.y , 10 , 10);
		ctx.strokeRect(this.x, this.y , 10 ,10);
	},
	checkEat : function () {

		if ((this.x + 10 >= foodX
			&& this.x + 10 <= foodX + 10
			&& this.y + 10 >= foodY
			&& this.y + 10 <= foodY + 10)
			||(this.x + 10 >= foodX
			&& this.x + 10 <= foodX + 10
			&& this.y >= foodY
			&& this.y <= foodY + 10)
			||(this.x >= foodX
			&& this.x <= foodX + 10
			&& this.y + 10>= foodY
			&& this.y + 10<= foodY + 10)
			||(this.x >= foodX
			&& this.x <= foodX + 10
			&& this.y >= foodY
			&& this.y <= foodY + 10)
			)
		
		{	
			foodX = Math.random() * canvas.width * 0.9 + 10;
			foodY = Math.random() * canvas.height * 0.9 + 10;
			
			var body = new SnakeBody (this.x  , this.y  );
			// push snake body into snake array
			snake.push(body);

			score++;
			console.log('SCORE', score);
		}
	},

	checkBite : function () {

		for (var i = 5; i < snake.length; i++) {
			var part = snake[i];
			if(

			(this.x + 10 >= part.x
			&& this.x + 10 <= part.x + 10
			&& this.y + 10 >= part.y
			&& this.y + 10 <= part.y + 10)
			||(this.x + 10 >= part.x
			&& this.x + 10 <= part.x + 10
			&& this.y >= part.y
			&& this.y <= part.y + 10)
			||(this.x >= part.x
			&& this.x <= part.x + 10
			&& this.y + 10 >= part.y
			&& this.y + 10 <= part.y + 10)
			||(this.x >= part.x
			&& this.x <= part.x + 10
			&& this.y >= part.y
			&& this.y <= part.y + 10)
			)
			
			{	
				lose();
				//console.log('bited');
				//console.log(this.x , part.x , this.y , part.y , i)
			}
		}
	}
};
//put the snake head into snake array
snake.push(head);
// draw snake by the time
//x,y position of snake 
//direction of snake, can be x or y
function drawSnake () {
	// draw the head of snake
	head.checkEat();

	for (var i = snake.length - 1; i > 0; i--) {
		//console.log('drawing body');
			var part = snake[i];
			var next = snake[i - 1];

			part.x = next.x;
			part.y = next.y;
			
			part.draw();
	}

	if (direction == 'right') {
		head.x = head.x + speed;
	}
	else if (direction == 'left') {
		head.x = head.x - speed;	
	}
	else if (direction == 'up') {
		head.y = head.y - speed; 
	}
	else if (direction == 'down') {
		head.y = head.y + speed;
	}

	head.draw();
	head.checkBite();
			//console.log(part.x , part.y);
}

	//update position by time
	
function drawFood () {
	ctx.fillStyle = "pink";
	ctx.fillRect (foodX , foodY , 10 , 10)
}
function drawScore () {
	ctx.font = "10px Arial";
	ctx.fillStyle = "green";
	ctx.textBaseline = "top";
	ctx.fillText("Score:" + score, 0 , 0)
}
function draw () {
	if (isLose) {
		return;
	}
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	drawSnake();
	drawFood();
	drawScore();

	if (head.x + 10 > canvas.width || head.x < 0 || head.y + 10 > canvas.height || head.y < 0 ){
		lose();
		return;
	}

	//console.log('drawing');
	//call the drawSnake itself after 300ms
	setTimeout(function () {
		draw();
	}, 100)
}

function lose(){
	isLose = true;
	ctx.fillStyle = "red";
	ctx.textAlign = "center";
	ctx.font = "60px Arial";
	ctx.fillText("YOU LOSE!!!", canvas.width / 2,canvas.height / 2);
}
//control snake direction
function control () {
	window.onkeyup = function(e) {
		var key = e.keyCode;
		//console.log(key);
		if (key == 37) { 	
			direction = (direction == 'right') ? false :'left';
		}
		else if (key == 38) {
			direction = (direction == 'down') ? false : 'up';
		}
		else if (key == 39) {//right
			direction = (direction == 'left') ? false :'right';
		}
		else if (key == 40) {//down
			direction = (direction == 'up') ? false :'down';
		}
		if (direction == false){
			//console.log('bited');
			lose();
		}

	}
} 

function init () {
	//snake.push(head);
	// draw init body for snake
	//for (var i = 1 ; i <= 1; i++){
	//	var body = new SnakeBody(head.x - i*10, head.y)
	//	snake.push(body);
	//}


	
	draw();
	control();
}


init();