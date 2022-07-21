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
    const input = document.querySelector("input#player1-name-input");
    pubsub.publish("namesTaken", input.value);
  });

  const player = () => {
    const playerContainer = document.createElement("div");
    playerContainer.classList.add("player-box");
    lobbyDiv.appendChild(playerContainer);

    const playerFlag = document.createElement("img");
    playerFlag.classList.add("flag");
    playerContainer.appendChild(playerFlag);

    const nameLabel = document.createElement("label");
    nameLabel.setAttribute("id", "player1-name-input");
    nameLabel.innerText = "Please enter your name: ";
    playerContainer.appendChild(nameLabel);

    const nameInput = document.createElement("input");
    nameInput.setAttribute("id", "player1-name-input");
    playerContainer.appendChild(nameInput);
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
    opponentName.innerText = "Computer";
    playerContainer.appendChild(opponentName);
  };

  player();
  lobbyDiv.appendChild(vs);
  computer();
};

export default takeName;
