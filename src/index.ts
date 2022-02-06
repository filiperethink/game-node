import { getRandomIntInclusive } from "./utils";

require("./style.css");
const Heading: HTMLElement = document.getElementById("points");

interface HTMLCanvasElementCustom extends CanvasRenderingContext2D {
  x: number;
  y: number;
}
type currentPlayerType = {
  x: number;
  y: number;
  name: string;
  id: string;
  context: HTMLCanvasElementCustom;
  points: number;
};

type currentFruitType = {
  x: number;
  y: number;
  context: HTMLCanvasElementCustom;
};

type GameInstanceType = {
  currentFruit: currentFruitType;
  currentPlayer: currentPlayerType;
};

function createGame(): GameInstanceType {
  console.log("Criando o jogo...");
  const canvas: HTMLCanvasElement = document.getElementById(
    "canvas"
  ) as HTMLCanvasElement;
  console.log({ canvas });
  canvas.width = 400;
  canvas.height = 400;
  console.log("Criando fruta...");
  const currentFruit = generateFruits(canvas);
  console.log("Criando o jogador...");
  const currentPlayer = createPlayer(canvas, "Filipe", "player1");
  return {
    currentFruit,
    currentPlayer,
  };
}
const gameInstance = createGame();

function generateFruits(canvas: HTMLCanvasElement): currentFruitType {
  const ctx: HTMLCanvasElementCustom = canvas.getContext(
    "2d"
  ) as HTMLCanvasElementCustom;
  ctx.fillStyle = "gold";

  const positionX = getRandomIntInclusive();
  const positionY = getRandomIntInclusive();

  ctx.fillRect(positionX, positionY, 50, 50);
  ctx.x = positionX;
  ctx.y = positionY;
  let position = {
    x: positionX,
    y: positionY,
  };
  return { context: ctx, ...position };
}

function createPlayer(
  canvas: HTMLCanvasElement,
  name: string,
  id: string
): currentPlayerType {
  const ctx: HTMLCanvasElementCustom = canvas.getContext(
    "2d"
  ) as HTMLCanvasElementCustom;
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

document.addEventListener("keydown", handleKeyDown);

function handleArrowDown(player: currentPlayerType) {
  player.context.fillRect(player.x, player.y + 50, 50, 50);
  player.context.clearRect(player.x, player.y, 50, 50);
  player.y = player.y + 50;
}

function handleArrowUp(player: currentPlayerType) {
  player.context.fillRect(player.x, player.y - 50, 50, 50);
  player.context.clearRect(player.x, player.y, 50, 50);
  player.y = player.y - 50;
}

function handleArrowRight(player: currentPlayerType) {
  player.context.fillRect(player.x + 50, player.y, 50, 50);
  player.context.clearRect(player.x, player.y, 50, 50);
  player.x = player.x + 50;
}

function handleArrowLeft(player: currentPlayerType) {
  player.context.fillRect(player.x - 50, player.y, 50, 50);
  player.context.clearRect(player.x, player.y, 50, 50);
  player.x = player.x - 50;
}

function handleKeyDown(event: KeyboardEvent) {
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

  const colideX = gameInstance.currentFruit.x;
  const colideY = gameInstance.currentFruit.y;
  if (
    gameInstance.currentPlayer.x === colideX &&
    gameInstance.currentPlayer.y === colideY
  ) {
    gameInstance.currentPlayer.points += 10;
    Heading.innerText = `${gameInstance.currentPlayer.points} Pontos`;
    let newPosition = {
      x: getRandomIntInclusive(),
      y: getRandomIntInclusive(),
    };
    console.log({ newPosition });
    gameInstance.currentFruit.x = newPosition.x;
    gameInstance.currentFruit.y = newPosition.y;

    gameInstance.currentFruit.context.clearRect(
      newPosition.x,
      newPosition.y,
      50,
      50
    );
    gameInstance.currentFruit.context.fillStyle = "gold";
    gameInstance.currentFruit.context.fillRect(
      newPosition.x,
      newPosition.y,
      50,
      50
    );
    console.log(gameInstance.currentPlayer.context);
    gameInstance.currentPlayer.context.fillStyle = "black";
  }
}
