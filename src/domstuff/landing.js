import pubsub from "../pubsub";
import removeAllChildNodes from "../util/removeAllChildNodes";

const takeName = () => {
  const playArea = document.getElementById("play-area");

  const lobbyDiv = document.createElement("div");
  lobbyDiv.classList.add("lobby");
  playArea.appendChild(lobbyDiv);

  const vs = document.createElement("h2");
  vs.innerText = "VS";

  const startGame = document.createElement("button");
  startGame.innerText = "START GAME";
  startGame.classList.add("startGame");
  playArea.appendChild(startGame);
  startGame.addEventListener("click", () => {
    pubsub.publish("gameStartRequest");
  });

  const player = () => {
    const playerContainer = document.createElement("div");
    playerContainer.classList.add("player-box");
    lobbyDiv.appendChild(playerContainer);

    const playerFlag = document.createElement("img");
    playerFlag.classList.add("flag");
    playerContainer.appendChild(playerFlag);

    const p = document.createElement("p");
    p.innerText = "You";
    playerContainer.appendChild(p);

    const opponentName = document.createElement("p");
    opponentName.innerText = "Ukraine";
    playerContainer.appendChild(opponentName);
  };

  const computer = () => {
    const playerContainer = document.createElement("div");
    playerContainer.classList.add("player-box");
    lobbyDiv.appendChild(playerContainer);

    const playerFlag = document.createElement("img");
    playerFlag.classList.add("flag");
    playerContainer.appendChild(playerFlag);

    const p = document.createElement("p");
    p.innerText = "Your Opponent";
    playerContainer.appendChild(p);

    const opponentName = document.createElement("p");
    opponentName.innerText = "Russia";
    playerContainer.appendChild(opponentName);
  };

  player();
  lobbyDiv.appendChild(vs);
  computer();
};

export default takeName;
