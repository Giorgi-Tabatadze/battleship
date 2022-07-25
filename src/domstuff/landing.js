import pubsub from "../pubsub";
import removeAllChildNodes from "../util/removeAllChildNodes";
import backgroundImg from "./img/background.jpg";
import dashboardAudio from "./audio/dashboard.mp3";
import headerText from "./img/headertext.png";
import shotaudio from "./audio/shot.mp3";

const takeName = () => {
  const body = document.querySelector("body");
  body.style.backgroundImage = `url(${backgroundImg})`;
  const playArea = document.getElementById("play-area");

  const submarineDashboard = document.createElement("audio");
  body.appendChild(submarineDashboard);
  submarineDashboard.autoplay = true;
  submarineDashboard.loop = true;
  submarineDashboard.volume = 0.3;
  submarineDashboard.src = dashboardAudio;

  const header = document.querySelector("header");
  const headerImage = new Image();
  headerImage.src = headerText;
  header.appendChild(headerImage);

  const shotSound = document.createElement("audio");
  shotSound.src = shotaudio;
  shotSound.setAttribute("id", "shot");
  shotSound.volume = 0.5;
  header.appendChild(shotSound);

  async function makeShotSound() {
    await shotSound.play();
  }
  pubsub.subscribe("shotSound", makeShotSound);

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
