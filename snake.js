let snakeSprite = function (params) {
    /*
        функция для создания спрайта змеи и работы с ним
        params = {
            width,          //Ширина спрайта в пикселях
            height,         //Высота спрайта в пикселях
            speed,          //Скорость движения спрайта
            limitX,         //макс. значение координаты по оси х
            limitY,         //макс. значение координаты по оси у
            ctx,            //полотно для рисования спрайта
        }
    */

    let width = params.width,
        height = params.height,
        speed = params.speed,
        limitX = params.limitX,
        limitY = params.limitY,
        ctx = params.ctx,
        coords = [],
        appleEaten = false,
        currentX, currentY;

    let that = {
        allowApple: function (xApple, yApple) {
            //проверка, чтобы новое яблоко не рисовалось на змее
            for (let xy of coords) {
                if (xy[0] === xApple && xy[1] === yApple) {
                    return false;
                }
            }
            return true;
        },
        clear: function (x, y) {
            //стираем хвост змеи
            ctx.clearRect(x, y, width, height);
        },
        clearAll: function () {
            //стираем всю змею
            for (let xy of coords) {
                ctx.clearRect(...xy, width, height);
            }
        },
        draw: function (x, y, redrawGap = false) {
            let radius = 4 * Math.PI;       // радиус скругления углов
            ctx.fillStyle = "rgb(158, 68, 9)";

            if (redrawGap) {
                //голову змеи красим в другой цвет
                if (x === currentX && y === currentY) {
                    ctx.fillStyle = "rgb(225, 130, 60)";
                }

                //заполняем пробел в теле змеи
                ctx.beginPath();
                ctx.moveTo(x + width / 2, y);                               // Начинаем в середине верхней стороны. 
                ctx.arcTo(x + width, y, x + width, y + height, radius);     // Верхняя сторона и верхний правый угол. 
                ctx.arcTo(x + width, y + height, x, y + height, radius);    // Правая сторона и нижний правый угол. 
                ctx.arcTo(x, y + height, x, y, radius);                     // Нижняя сторона и нижний левый угол. 
                ctx.arcTo(x, y, x + width, y, radius);                      // Левая сторона и верхний левый угол. 
                ctx.fill();
            } else {
                currentX = x;
                currentY = y;
                coords.push([currentX, currentY]);

                for (let xy of coords) {
                    let x = xy[0],
                        y = xy[1];

                    //голову змеи красим в другой цвет
                    if (x === currentX && y === currentY) {
                        ctx.fillStyle = "rgb(225, 130, 60)";
                    }

                    //рисуем змею
                    ctx.beginPath();
                    ctx.moveTo(x + width / 2, y);                               // Начинаем в середине верхней стороны. 
                    ctx.arcTo(x + width, y, x + width, y + height, radius);     // Верхняя сторона и верхний правый угол. 
                    ctx.arcTo(x + width, y + height, x, y + height, radius);    // Правая сторона и нижний правый угол. 
                    ctx.arcTo(x, y + height, x, y, radius);                     // Нижняя сторона и нижний левый угол. 
                    ctx.arcTo(x, y, x + width, y, radius);                      // Левая сторона и верхний левый угол. 
                    ctx.fill();
                }
            }
        },
        eatApple: function () {
            appleEaten = true;
        },
        move: function (direction) {
            let tailXY = [];
            //движение змеи
            switch (direction) {
                case 'up':
                    currentY -= speed;
                    if (currentY < 0) {
                        speed = 0;
                    } else {
                        for (let xy of coords) {
                            if (xy[0] === currentX && xy[1] === currentY) {
                                speed = 0;
                                break;
                            }
                        }
                    }

                    if (speed > 0) {
                        if (!appleEaten) {
                            tailXY = coords.shift();       //удаляем координаты хвоста (первого отрисованного элемента)
                            that.clear(...tailXY);
                        } else {
                            appleEaten = false;
                        }
                    }

                    that.draw(currentX, currentY);

                    return [currentX, currentY, speed];
                case 'down':
                    currentY += speed;
                    if (currentY > limitY - height) {
                        speed = 0;
                    } else {
                        for (let xy of coords) {
                            if (xy[0] === currentX && xy[1] === currentY) {
                                speed = 0;
                                break;
                            }
                        }
                    }

                    if (speed > 0) {
                        if (!appleEaten) {
                            tailXY = coords.shift();       //удаляем координаты хвоста (первого отрисованного элемента)
                            that.clear(...tailXY);
                        } else {
                            appleEaten = false;
                        }
                    }

                    that.draw(currentX, currentY);

                    return [currentX, currentY, speed];
                case 'left':
                    currentX -= speed;
                    if (currentX < 0) {
                        speed = 0;
                    } else {
                        for (let xy of coords) {
                            if (xy[0] === currentX && xy[1] === currentY) {
                                speed = 0;
                                break;
                            }
                        }
                    }

                    if (speed > 0) {
                        if (!appleEaten) {
                            tailXY = coords.shift();       //удаляем координаты хвоста (первого отрисованного элемента)
                            that.clear(...tailXY);
                        } else {
                            appleEaten = false;
                        }
                    }

                    that.draw(currentX, currentY);

                    return [currentX, currentY, speed];
                case 'right':
                    currentX += speed;
                    if (currentX > limitX - width) {
                        speed = 0;
                    } else {
                        for (let xy of coords) {
                            if (xy[0] === currentX && xy[1] === currentY) {
                                speed = 0;
                                break;
                            }
                        }
                    }

                    if (speed > 0) {
                        if (!appleEaten) {
                            tailXY = coords.shift();       //удаляем координаты хвоста (первого отрисованного элемента)
                            that.clear(...tailXY);
                        } else {
                            appleEaten = false;
                        }
                    }

                    that.draw(currentX, currentY);

                    return [currentX, currentY, speed];
            }

        },
    }

    return that;
};

let appleSprite = function (params) {
    /*
        функция для создания спрайта яблока и работы с ним
        params = {
            width,          //Ширина спрайта в пикселях
            height,         //Высота спрайта в пикселях
            limitX,         //макс. значение координаты по оси х
            limitY,         //макс. значение координаты по оси у
            ctx,            //полотно для рисования спрайта
        }
    */

    let width = params.width,
        height = params.height,
        limitX = params.limitX,
        limitY = params.limitY,
        ctx = params.ctx,
        currentX, currentY;

    let that = {
        clear: function () {
            //стираем яблоко
            ctx.clearRect(currentX, currentY, width, height);
        },
        draw: function () {
            let [x, y] = this.getNewPosition();
            currentX = x;
            currentY = y;

            let radius = width / 2,
                circleX = currentX + radius,
                circleY = currentY + radius,
                startAngle = 0,             // 0 градусов
                endAngle = (2 * Math.PI);   // 360 градусов

            //градиентная заливка для покраски яблока
            let appleGradient = ctx.createLinearGradient(0, 0, 0, limitY);
            appleGradient.addColorStop(0, 'red');
            appleGradient.addColorStop(0.2, 'yellow');
            appleGradient.addColorStop(0.4, 'red');
            appleGradient.addColorStop(0.6, 'yellow');
            appleGradient.addColorStop(0.8, 'red');
            appleGradient.addColorStop(1, 'yellow');

            ctx.fillStyle = appleGradient;

            //рисуем яблоко
            ctx.beginPath();
            ctx.moveTo(circleX, circleY);
            ctx.arc(circleX, circleY, radius, startAngle, endAngle, false);
            ctx.fill();

            let twigRaduis = 8,
                twigCircleX = circleX,
                twigCircleY = currentY + 10;   // 360 градусов

            //градиентная заливка для крепления веточки
            let appleTwigGradient = ctx.createLinearGradient(0, 0, 0, limitY);
            appleTwigGradient.addColorStop(0, 'rgb(240, 50, 10)');
            appleTwigGradient.addColorStop(0.2, 'rgb(245, 190, 45)');
            appleTwigGradient.addColorStop(0.4, 'rgb(240, 50, 10)');
            appleTwigGradient.addColorStop(0.6, 'rgb(245, 190, 45)');
            appleTwigGradient.addColorStop(0.8, 'rgb(240, 50, 10)');
            appleTwigGradient.addColorStop(1, 'rgb(245, 190, 45)');

            ctx.fillStyle = appleTwigGradient;

            //рисуем веточку
            ctx.beginPath();
            ctx.moveTo(twigCircleX, twigCircleY);
            ctx.arc(twigCircleX, twigCircleY, twigRaduis, startAngle, endAngle, false);
            ctx.fill();

            ctx.strokeStyle = 'brown';
            ctx.lineWidth = 2;

            ctx.beginPath();
            ctx.moveTo(twigCircleX, twigCircleY);
            ctx.lineTo(twigCircleX + 7, twigCircleY - 9);
            ctx.closePath();
            ctx.stroke();

            return [currentX, currentY];
        },
        getNewPosition: function () {
            //получаем координаты яблока
            let x = Math.random() * limitX,
                y = Math.random() * limitY;

            if (x + width > limitX) {
                x = limitX - width;
            }

            if (y + height > limitY) {
                y = limitY - height;
            }

            //выравниваем координаты по сетке
            x = Math.floor(x / width) * width;
            y = Math.floor(y / height) * height;

            return [x, y];
        }
    }

    return that;
};

let endGameSprite = function (params) {
    /*
        функция для создания спрайта текста окончания игры и работы с ним
        params = {
            width,          //Ширина спрайта в пикселях
            height,         //Высота спрайта в пикселях
            x,              //значение координаты по оси х
            y,              //значение координаты по оси у
            ctx,            //полотно для рисования спрайта
        }
    */

    let width = params.width,
        height = params.height,
        x = params.x,
        y = params.y,
        ctx = params.ctx;

    let loseImg = new Image();
    loseImg.src = 'images/lose.png';

    let winImg = new Image();
    winImg.src = 'images/win.png';

    let that = {
        draw: function (gameResult) {
            //отображаем сообщение победы / поражения

            if (gameResult === 'win') {
                ctx.drawImage(winImg, x, y, width, height);
            } else if (gameResult === 'lose') {
                ctx.drawImage(loseImg, x, y, width, height);
            }
        }
    }

    return that;

};

function updateScore(clearScore = false) {
    /*
        функция для обновления значения счетчика
        clearScore - аргумент, указывающий, нужно ли обнулять счетчик очков (true/false, по умолчанию false)
    */

    let scoreLabel = document.getElementById('score-label');
    let labelContent = scoreLabel.textContent.split(': ');

    let newScore = 0;
    if (!clearScore) {
        newScore = parseInt(labelContent[1]) + 1;
    }

    //меняем счет
    scoreLabel.textContent = labelContent[0] + ': ' + newScore;

    return newScore;
}

function startGame() {
    let levelParams = {
        'easy': {
            'maxScore': 15,
            'gameSpeed': 800,
        },
        'medium': {
            'maxScore': 25,
            'gameSpeed': 500,
        },
        'hard': {
            'maxScore': 40,
            'gameSpeed': 300,
        },
    };

    let startButton = document.getElementById('start-button');

    if (startButton.getAttribute('clicked') !== 'true') {
        //сбрасываем счетчик очков, если игра перезапускается
        let score = updateScore(true);

        //отключаем повторное нажатие на кнопку "Старт"
        startButton.setAttribute('clicked', true);

        let levelElements = document.getElementsByName('level');

        let selectedLevel;
        for (let el of levelElements) {
            if (el.checked) {
                selectedLevel = el.value;
            }
        }

        let gameField = document.getElementById('game-field'),                      // игровое поле
            ctx = gameField.getContext('2d'),
            fieldWidth = gameField.width,
            fieldHeight = gameField.height,
            maxScore = levelParams[selectedLevel]['maxScore'],                    //кол-во очков для победы
            gameSpeed = levelParams[selectedLevel]['gameSpeed'],                  //выбранный уровень сложности

            snakeSize = appleSize = 50,
            snakeSpeed = 50,                                                        // Исходная скорость змейки
            xPosSnake = Math.floor(fieldWidth / 2 / snakeSize) * snakeSize,         // Исходная позиция змейки по оси х
            yPosSnake = Math.floor(fieldHeight / 2 / snakeSize) * snakeSize,        // Исходная позиция змейки по оси y
            direction = 'up',                                                       // Исходное направление движения

            snake = snakeSprite({
                'width': snakeSize,
                'height': snakeSize,
                'speed': snakeSpeed,
                'limitX': fieldWidth,
                'limitY': fieldHeight,
                'ctx': ctx,
            }),

            apple = appleSprite({
                'width': appleSize,
                'height': appleSize,
                'limitX': fieldWidth,
                'limitY': fieldHeight,
                'ctx': ctx,
            }),

            endGame = endGameSprite({
                'width': Math.floor(fieldWidth * 3 / 5),
                'height': Math.floor(fieldHeight * 1 / 3),
                'x': Math.floor(fieldWidth / 5),
                'y': Math.floor(fieldHeight / 3),
                'ctx': ctx,
            });

        //перед началом игры очищаем игровое поле
        ctx.clearRect(0, 0, fieldWidth, fieldHeight);

        //рисуем змею
        snake.draw(xPosSnake, yPosSnake);

        //рисуем яблоко и получаем его координаты
        let [xPosApple, yPosApple] = apple.draw();

        //проверяем, что яблоко не появилось на змее
        while (!snake.allowApple(xPosApple, yPosApple)) {
            apple.clear();
            snake.draw(xPosApple, yPosApple, redrawGap = true);         //заполняем пробел в теле змеи, оставшийся после удаления с него яблока
            [xPosApple, yPosApple] = apple.draw();
        }

        let snakeTimer = setInterval(function () {
            //меняем направление движения
            document.onkeydown = function (e) {
                switch (e.key) {
                    case 'ArrowUp':
                        direction = (direction !== 'down') ? 'up' : 'down';
                        break;
                    case 'ArrowDown':
                        direction = (direction !== 'up') ? 'down' : 'up';
                        break;
                    case 'ArrowLeft':
                        direction = (direction !== 'right') ? 'left' : 'right';
                        break;
                    case 'ArrowRight':
                        direction = (direction !== 'left') ? 'right' : 'left';
                        break;
                }
            };

            let [newX, newY, speed] = snake.move(direction);

            if (newX === xPosApple && newY === yPosApple) {
                //если змея нашла яблоко

                snake.eatApple();
                score = updateScore();

                if (score >= maxScore) {
                    clearInterval(snakeTimer);

                    //очищаем игровое поле
                    snake.clearAll();
                    apple.clear();

                    endGame.draw('win');

                    //разрешаем снова запустить игру
                    startButton.setAttribute('clicked', false);
                } else {
                    //рисуем яблоко в новых координатах
                    [xPosApple, yPosApple] = apple.draw();

                    //проверяем, что яблоко не появилось на змее
                    while (!snake.allowApple(xPosApple, yPosApple)) {
                        apple.clear();
                        snake.draw(xPosApple, yPosApple, redrawGap = true);         //заполняем пробел в теле змеи, оставшийся после удаления с него яблока
                        [xPosApple, yPosApple] = apple.draw();
                    }
                }

            } else if (speed === 0) {
                //если змея врезалась
                clearInterval(snakeTimer);

                //очищаем игровое поле
                snake.clearAll();
                apple.clear();

                endGame.draw('lose');

                //разрешаем снова запустить игру
                startButton.setAttribute('clicked', false);
            }
        }, gameSpeed);
    }
}