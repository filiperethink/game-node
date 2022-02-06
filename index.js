const Heading = document.getElementById("heading");

function createGame() {
  console.log("Criando o jogo...");
  const canvas = document.getElementById("canvas");
  canvas.height = 400;
  canvas.width = 400;
  console.log("Criando fruta...");
  const currentFruit = generateFruits(canvas);
  console.log("Criando o jogador...");
  const currentPlayer = createPlayer(canvas, "Filipe", "player1");
  return {
    currentFruit,
    currentPlayer,
  };
}

function generateFruits(canvas) {
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "gold";

  const positionX = getRandomIntInclusive(0, 350);
  const positionY = getRandomIntInclusive(0, 350);

  ctx.fillRect(positionX, positionY, 50, 50);
  ctx.x = positionX;
  ctx.y = positionY;
  let position = {
    x: positionX,
    y: positionY,
  };
  return { ctx, position };
}

function createPlayer(canvas, name, id) {
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 50, 50);

  let player = {
    x: 0,
    y: 0,
    name,
    id,
    context: ctx,
    points: 0,
  };
  return player;
}

const gameInstance = createGame();

document.addEventListener("keydown", handleKeyDown);

function handleArrowDown(player) {
  player.context.fillRect(player.x, player.y + 50, 50, 50);
  player.context.clearRect(player.x, player.y, 50, 50);
  player.y = player.y + 50;
}

function handleArrowUp(player) {
  player.context.fillRect(player.x, player.y - 50, 50, 50);
  player.context.clearRect(player.x, player.y, 50, 50);
  player.y = player.y - 50;
}

function handleArrowRight(player) {
  player.context.fillRect(player.x + 50, player.y, 50, 50);
  player.context.clearRect(player.x, player.y, 50, 50);
  player.x = player.x + 50;
}

function handleArrowLeft(player) {
  player.context.fillRect(player.x - 50, player.y, 50, 50);
  player.context.clearRect(player.x, player.y, 50, 50);
  player.x = player.x - 50;
}

function getRandomIntInclusive() {
  const numbers = [0, 50, 100, 150, 200, 250, 300, 350];
  const randomNumber = Math.round(Math.random() * (7 - 0));
  const sorted = numbers[randomNumber];
  return sorted;
}

function handleKeyDown(event) {
  const key = event.key;
  if (key === "ArrowDown" && gameInstance.currentPlayer.y < 350) {
    handleArrowDown(gameInstance.currentPlayer);
  } else if (key === "ArrowUp" && gameInstance.currentPlayer.y > 0) {
    handleArrowUp(gameInstance.currentPlayer);
  } else if (key === "ArrowRight" && gameInstance.currentPlayer.x < 350) {
    handleArrowRight(gameInstance.currentPlayer);
  } else if (key === "ArrowLeft" && gameInstance.currentPlayer.x > 0) {
    handleArrowLeft(gameInstance.currentPlayer);
  }

  const colideX = gameInstance.currentFruit.position.x;
  const colideY = gameInstance.currentFruit.position.y;
  if (
    gameInstance.currentPlayer.x === colideX &&
    gameInstance.currentPlayer.y === colideY
  ) {
    gameInstance.currentPlayer.points += 10;
    Heading.innerText = `${gameInstance.currentPlayer.points} Pontos`;
    let newPosition = {
      x: getRandomIntInclusive(0, 350),
      y: getRandomIntInclusive(0, 350),
    };
    console.log({ newPosition });
    gameInstance.currentFruit.position.x = newPosition.x;
    gameInstance.currentFruit.position.y = newPosition.y;

    gameInstance.currentFruit.ctx.clearRect(
      newPosition.x,
      newPosition.y,
      50,
      50
    );
    gameInstance.currentFruit.ctx.fillStyle = "gold";
    gameInstance.currentFruit.ctx.fillRect(
      newPosition.x,
      newPosition.y,
      50,
      50
    );
    console.log(gameInstance.currentPlayer.context);
    gameInstance.currentPlayer.context.fillStyle = "black";
  }
}
