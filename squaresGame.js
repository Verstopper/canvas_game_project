window.onload = function () {
  var canvas = document.getElementById("viewport");
  var context = canvas.getContext("2d");

  var lastframe = 0;

  var level = {
    x: 1,
    y: 65,
    width: canvas.width - 2,
    height: canvas.height - 66,
  };

  let size = Math.floor(Math.random() * 10) + 10;

  var squares = [];

  var score = 0;

  function init() {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mouseout", onMouseOut);

    for (var i = 0; i < size; i++) {
      var square = {};

      square.width = 75;
      square.height = 75;
      square.x =
        level.x + Math.floor(Math.random() * (level.width - square.width));
      square.y =
        level.y + Math.floor(Math.random() * (level.height - square.height));
      square.xdir = Math.random() < 0.5 ? -1 : 1;
      square.ydir = Math.random() < 0.5 ? -1 : 1;
      square.speed = Math.floor(Math.random() * 125) + 75;
      squares.push(square);
    }

    score = 0;

    main(0);
  }

  function cnageSquareSpeed(square) {
    square.speed += square.speed * (Math.random() * 0.5 - 0.25);
    if (square.speed < 75) square.speed = 75;
    if (square.speed > 200) square.speed = 200;
  }

  function main(tframe) {
    window.requestAnimationFrame(main);

    update(tframe);
    render();
  }

  function update(tframe) {
    var dt = (tframe - lastframe) / 1000;
    lastframe = tframe;

    for (var i = 0; i < squares.length; i++) {
      var square = squares[i];
      square.x += square.xdir * square.speed * dt;
      square.y += square.ydir * square.speed * dt;
      if (square.x < level.x) {
        square.x = level.x;
        square.xdir *= -1;
        cnageSquareSpeed(square);
      } else if (square.x + square.width > level.x + level.width) {
        square.x = level.x + level.width - square.width;
        square.xdir *= -1;
        cnageSquareSpeed(square);
      }
      if (square.y < level.y) {
        square.y = level.y;
        square.ydir *= -1;
        cnageSquareSpeed(square);
      } else if (square.y + square.height > level.y + level.height) {
        square.y = level.y + level.height - square.height;
        square.ydir *= -1;
        cnageSquareSpeed(square);
      }
    }
  }

  function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas.width, canvas.height);
    drawFrame();

    for (var i = 0; i < squares.length; i++) {
      context.fillStyle = "#ff0000";
      context.fillRect(
        squares[i].x,
        squares[i].y,
        squares[i].width,
        squares[i].height
      );
      context.fillStyle = "#ffffff";
      context.font = "20px Arial";
      context.fillText(
        Math.round(squares[i].speed),
        squares[i].x + 10,
        squares[i].y + 30
      );
    }
  }

  function drawFrame() {
    context.fillStyle = "#d0d0d0";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#e8eaec";
    context.fillRect(1, 1, canvas.width - 2, canvas.height - 2);

    context.fillStyle = "#303030";
    context.fillRect(0, 0, canvas.width, 65);

    context.fillStyle = "#0000ff";
    context.font = "20px Arial";
    context.fillText(
      "speed for each square is displayed inside the square",
      10,
      canvas.height - 10
    );

    context.fillStyle = "#ffffff";
    context.font = "20px Arial";
    context.textAlign = "right";
    context.fillText("start no of squares: " + size, canvas.width - 10, 30);

    context.fillStyle = "#ffffff";
    context.font = "20px Arial";
    context.textAlign = "center";
    context.fillText(
      "no of squares left: " + squares.length,
      canvas.width / 2,
      30
    );

    context.fillStyle = "#ffffff";
    context.font = "20px Arial";
    context.textAlign = "left";
    context.fillText("HITS: " + score, 10, 30);
  }

  function onMouseMove(e) {}
  function onMouseDown(e) {
    var pos = getMousePos(canvas, e);

    for (var i = 0; i < squares.length; i++) {
      var square = squares[i];
      if (
        pos.x >= square.x &&
        pos.x <= square.x + square.width &&
        pos.y >= square.y &&
        pos.y <= square.y + square.height
      ) {
        var shoot_sound = new Audio("shoot_sound.wav");
        shoot_sound.play();
        squares.splice(i, 1);
        score++;
      }
    }
  }
  function onMouseUp(e) {
    if (squares.length == 0) {
      var win_sound = new Audio("win_sound.wav");
      win_sound.play();
      setTimeout(function () {
        alert("You won!");
        location.reload();
      }, 2000);
    }
  }
  function onMouseOut(e) {}

  function getMousePos(canvas, e) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: Math.round(
        ((e.clientX - rect.left) / (rect.right - rect.left)) * canvas.width
      ),
      y: Math.round(
        ((e.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height
      ),
    };
  }

  init();
};
