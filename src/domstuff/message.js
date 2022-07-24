import pubsub from "../pubsub";

const messages = () => {
  const main = document.querySelector("main");
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("messages");
  main.prepend(messageDiv);
  const messageText = document.createElement("p");
  messageDiv.appendChild(messageText);

  const shotMissed = (player) => {
    messageText.innerText = `${player.name} shoots into enemy waters and misses`;
  };
  const shipHit = (player) => {
    messageText.innerText = `${player.name} shoots into enemy waters and damages enemy ship`;
  };
  const shipSunk = (shipSunkReport) => {
    messageText.innerText = `${shipSunkReport.player.name} sunk enemy battleship`;
  };
  const roundWon = (player) => {
    messageText.innerText = `${player.name} sunk all enemy battleships and won the naval battle!`;
  };
  const playAgain = (player) => {
    const playAgainBtn = document.createElement("button");
    playAgainBtn.innerText = "Play Again";
    messageDiv.appendChild(playAgainBtn);
    playAgainBtn.addEventListener("click", () => {
      location.reload();
    });
  };

  pubsub.subscribe("shotMissed", shotMissed);
  pubsub.subscribe("shipHit", shipHit);
  pubsub.subscribe("shipSunk", shipSunk);
  pubsub.subscribe("roundWon", roundWon);
  pubsub.subscribe("playAgain", playAgain);
};
export default messages;
