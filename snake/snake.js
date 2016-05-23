/* jshint browser: true */

window.onload = function() {
    "use strict";
    
    var version = 1.2;
    document.getElementById("ver").innerHTML = '(ver. '+ String(version)+')';
    
    var canvas = document.getElementById("game");
    var context = canvas.getContext("2d");

    var blockSize = 15;
    var blockSpacer = 2;
    var block = blockSize + blockSpacer;
    var fieldSize = 20;
    var snakeLength = 5;
    var startRabbitsNumber = 3;
    var rabbitsNumber = startRabbitsNumber;
    var lvl = 1;
    var moveDirection = 39; //39 - to the right at start
    var tickInterval = 300;
    
    var snakeCoordsX = [], snakeCoordsY = [];
    var rabbitsPosX = [], rabbitsPosY = [];
    
    canvas.height = block * fieldSize;
    canvas.width = block * fieldSize;

    document.onkeydown = function (event) {
        if (
            (moveDirection != 39 && event.keyCode === 37) |
            (moveDirection != 37 && event.keyCode === 39) |
            (moveDirection != 40 && event.keyCode === 38) |
            (moveDirection != 38 && event.keyCode === 40)
        ) {
            moveDirection = event.keyCode;
        }
    };
    
    setInterval(function(){
        snake.shift(moveDirection);
        snake.eat();
        rabbits.check();
    },tickInterval);

    var snake = new Snake();
    snake.start();
    snake.draw();
    
    var rabbits = new Rabbits();
    rabbits.generate();
    rabbits.draw();

    function gameOver() {
        alert("Game Over!");
        location.reload();
    }
        
    function Snake() {
        this.start = function() {
            for (var i=0; i<snakeLength; i++) {
                snakeCoordsX[i] = block * (snakeLength-1) - block * i;
                snakeCoordsY[i] = fieldSize/2 * block;
            }
        };
        this.draw = function() {
            for (var i=snakeCoordsX.length-1; i>=0; i--) {
                if (i===0) {context.fillStyle="red";} else {context.fillStyle="black";}
                context.fillRect(snakeCoordsX[i], snakeCoordsY[i], blockSize, blockSize);
            }
        };
        this.shift = function(direction) {
            
            var moveToX, moveToY, collide = false;
            
            getNextSquare(direction);
            checkCollide();
            if (!collide) {
                eraseTail();
                shiftSnakeCoords();
                moveHead(direction);    
                snake.draw();
                moveDirection = direction;
            } else {
                gameOver();
            }
            
            function getNextSquare(direction) {
                switch (direction) {
                    case 39: moveToX = snakeCoordsX[0] + block; moveToY = snakeCoordsY[0]; break;
                    case 37: moveToX = snakeCoordsX[0] - block; moveToY = snakeCoordsY[0]; break;
                    case 40: moveToX = snakeCoordsX[0]; moveToY = snakeCoordsY[0] + block; break;
                    case 38: moveToX = snakeCoordsX[0]; moveToY = snakeCoordsY[0] - block; break;
                }
            }
            function moveHead(direction) {
                switch (direction) {
                    case 39: snakeCoordsX[0] += block; break; //right
                    case 37: snakeCoordsX[0] -= block; break; //left
                    case 40: snakeCoordsY[0] += block; break; //up
                    case 38: snakeCoordsY[0] -= block; break; //down
                }
            }
            function checkCollide() {
                //self collide
                for (var i=0; i<snakeCoordsX.length-1; i++) {
                    if (moveToX === snakeCoordsX[i] && moveToY === snakeCoordsY[i]) {
                        collide = true;
                        break;
                    }
                }
                //field collide
                if (
                    moveToX < 0 | moveToX > (fieldSize-1) * block |
                    moveToY < 0 | moveToY > (fieldSize-1) * block
                   ) {
                    collide = true;
                }
            }
            function eraseTail() {
                var x = snakeCoordsX[snakeCoordsX.length-1];
                var y = snakeCoordsY[snakeCoordsY.length-1];
                context.clearRect(x, y, blockSize, blockSize);
            }
            function shiftSnakeCoords() {
                for (var i=snakeCoordsX.length-1; i>0; i--) {
                    snakeCoordsX[i] = snakeCoordsX[i-1];
                    snakeCoordsY[i] = snakeCoordsY[i-1];
                }
            }
        };
        this.eat = function() {
            for (var i=0; i<rabbitsPosX.length; i++) {
                if (snakeCoordsX[0] === rabbitsPosX[i] && snakeCoordsY[0] === rabbitsPosY[i]) {
                    snakeCoordsX.push(snakeCoordsX[snakeCoordsX.length-1]);
                    snakeCoordsY.push(snakeCoordsY[snakeCoordsY.length-1]);
                    rabbitsPosX.splice(i,1);
                    rabbitsPosY.splice(i,1);
                    rabbitsNumber--;
                    break;
                }
            }
        };
    }
    function Rabbits() {
        this.generate = function() {
            for (var i=0; i<rabbitsNumber; i++) {
                while (true) {
                    rabbitsPosX[i] = Math.floor(Math.random() * fieldSize) * block;
                    rabbitsPosY[i] = Math.floor(Math.random() * fieldSize) * block;
                    if (snakeCoordsX.indexOf(rabbitsPosX[i]) === -1 && snakeCoordsY.indexOf(rabbitsPosY[i]) === -1) {break;}
                }
            }
            document.getElementById("rabbits_left").innerHTML = rabbitsNumber;
        };
        this.draw = function() {
            for (var i=0; i<rabbitsPosX.length; i++) {
                context.fillStyle="green";
                context.fillRect(rabbitsPosX[i], rabbitsPosY[i], blockSize, blockSize);
            }
        };
        this.check = function() {
            if (rabbitsNumber === 0) {
                lvl++;
                tickInterval -= 100 * lvl;
                document.getElementById("lvl").innerHTML = lvl;
                rabbitsNumber = startRabbitsNumber + lvl;
                rabbits.generate();
                rabbits.draw();
            } else {
                document.getElementById("rabbits_left").innerHTML = rabbitsNumber;
                rabbits.draw();
            }
        };
    }
    
};

