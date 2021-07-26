// Récupération des éléments du DOM
const body = document.body;
const canvas = document.querySelector('canvas');
const newGamebutton = document.getElementById('newGameButton');
const rollButton = document.getElementById('rollButton');
const holdButton = document.getElementById('holdButton');
const player1NameText = document.getElementById('player1');
const player2NameText = document.getElementById('player2');
const player1Icone = document.getElementById('player1-icone');
const player2Icone = document.getElementById('player2-icone');
const comment = document.getElementById('comment');
const modalRules = document.getElementById('modalRules');

// Scores des joueurs DOM
const roundTextPlayer1 = document.getElementById('currentPlayer1');
const roundTextPlayer2 = document.getElementById('currentPlayer2');
const globalTextPlayer1 = document.getElementById('globalPlayer1');
const globalTextPlayer2 = document.getElementById('globalPlayer2');

// Initialisation de la variable round
let roundScore = 0;

// Initialisation de la classe
class Player {
  constructor(playerName, playerNameText, isPlaying, globalScorePlayer, globalScoreText, textRoundScore, iconeIsPlaying) {
    this.playerName = playerName;
    this.playerNameText = playerNameText;
    this.isPlaying = isPlaying;
    this.globalScorePlayer = globalScorePlayer;
    this.globalScoreText = globalScoreText;
    this.textRoundScore = textRoundScore;
    this.iconeIsPlaying = iconeIsPlaying;
  }
    
  startPlaying() {
    commentaryAnimation(this.playerName + ' à votre tour ...', 3000);
    roundScore = 0;
    this.textRoundScore.textContent = roundScore;
    this.isPlaying = true;
    this.playerNameText.classList.add('is-played');
    this.iconeIsPlaying.classList.remove('ion-hide');
  }
    
  endPlaying() {
    this.globalScorePlayer += roundScore;
    this.globalScoreText.textContent = this.globalScorePlayer;
    this.isPlaying = false;
    this.playerNameText.classList.remove('is-played');
    this.iconeIsPlaying.classList.add('ion-hide');
    // Si le score est supérieur ou égal a 100 => vainqueur annoncé => demande de nouvelle partie
    if (this.globalScorePlayer >= 100) {
      commentaryAnimation(`Félicitation ${this.playerName}, Vous avez gagné !`, 3000);
      newGame();
    } 
  }
}

// Demande de pseudo en jeux
let userName1 = prompt('Entrez le nom du premier joueur ? 10 caractères maximum') || 'Player';
let userName2 = prompt('Entrez le nom du deuxième joueur ? 10 caractères maximum') || 'Player 2';

// Initialisation des instances
  // Player 1
let playerOne = new Player
(
  userName1, 
  player1NameText, 
  true, 
  0, 
  globalTextPlayer1, 
  roundTextPlayer1,
  player1Icone
);

  // Player 2
let playerTwo = new Player
(
  userName2, 
  player2NameText, 
  false, 
  0, 
  globalTextPlayer2, 
  roundTextPlayer2,
  player2Icone
);

// Attribution des pseudos de jeu
playerOne.playerNameText.textContent = userName1;
playerTwo.playerNameText.textContent = userName2;

// Fonction nombre aléatoire
const randomNumber = () => {
  let min = Math.ceil(1)
  let max = Math.floor(6)
  let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min
  console.log(randomNumber)
  return randomNumber
}

// Fonction hold
const hold = (roundTextPlayer, globalTextPlayer) => {
  globalScore += roundScore
  roundScore = 0
  roundTextPlayer.textContent = roundScore
  globalTextPlayer.textContent = globalScore
}

// Fonction lancé de dé
const roll = (roundTextPlayer) => {
  // Changement du canvas en fonction du Number retourné
  let ctx;
  if (canvas.getContext) {
    ctx = canvas.getContext('2d')
    ctx.strokeRect(0, 0, 150, 150)
    switch(randomNumber()) {
      case 1:
        ctx.beginPath()
        ctx.arc(75, 75, 8, 0, Math.PI * 2)
        ctx.fillStyle = 'red'
        ctx.fill()
        ctx.closePath()
        roundScore = 0
        alert('Manque de chance, vous êtes tombé sur 1 !\nA votre adversaire de jouer ...')
        if (playerOne.isPlaying === true && playerTwo.isPlaying === false) {
          playerOne.endPlaying()
          playerTwo.startPlaying()
        }
        else if (playerTwo.isPlaying === true && playerOne.isPlaying === false) {
          playerTwo.endPlaying()
          playerOne.startPlaying()
        }
        break
      case 2:
        ctx.beginPath()
        ctx.arc(40, 40, 8, 0, Math.PI * 2)
        ctx.arc(110, 110, 8, 0, Math.PI * 2)
        ctx.fillStyle = 'red'
        ctx.fill()
        ctx.closePath()
        roundScore += 2
        break
      case 3:
        ctx.beginPath()
        ctx.arc(40, 40, 8, 0, Math.PI * 2)
        ctx.arc(75, 75, 8, 0, Math.PI * 2)
        ctx.arc(110, 110, 8, 0, Math.PI * 2)
        ctx.fillStyle = 'red'
        ctx.fill()
        ctx.closePath()
        roundScore += 3
        break;
      case 4:
        ctx.beginPath()
        ctx.arc(40, 40, 8, 0, Math.PI * 2)
        ctx.arc(40, 110, 8, 0, Math.PI * 2)
        ctx.closePath()
        ctx.arc(110, 110, 8, 0, Math.PI * 2)
        ctx.closePath()
        ctx.arc(110, 40, 8, 0, Math.PI * 2)
        ctx.fillStyle = 'red'
        ctx.fill()
        ctx.closePath()
        roundScore += 4
        break
      case 5:
        ctx.beginPath()
        ctx.arc(40, 40, 8, 0, Math.PI * 2)
        ctx.arc(40, 110, 8, 0, Math.PI * 2)
        ctx.closePath()
        ctx.arc(110, 110, 8, 0, Math.PI * 2)
        ctx.closePath()
        ctx.arc(110, 40, 8, 0, Math.PI * 2)
        ctx.closePath()
        ctx.arc(75, 75, 8, 0, Math.PI * 2)
        ctx.fillStyle = 'red'
        ctx.fill()
        ctx.closePath()
        roundScore += 5
        break
      case 6:
        ctx.beginPath()
        ctx.arc(40, 40, 8, 0, Math.PI * 2)
        ctx.arc(40, 75, 8, 0, Math.PI * 2)
        ctx.arc(40, 110, 8, 0, Math.PI * 2)
        ctx.closePath()
        ctx.arc(110, 40, 8, 0, Math.PI * 2)
        ctx.closePath()
        ctx.arc(110, 75, 8, 0, Math.PI * 2)
        ctx.closePath()
        ctx.arc(110, 110, 8, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fillStyle = 'red'
        ctx.fill()
        ctx.closePath()
        roundScore += 6
        break
    }
    roundTextPlayer.textContent = roundScore
  } else {
    alert('Votre navigateur ne prend pas en charge cette fonctionnalitée ...')
  }
}

// Event sur le bouton Roll
rollButton.addEventListener('click', () => {
  canvas.getContext('2d').clearRect(0, 0, 150, 150);
  if (playerOne.isPlaying === true && playerTwo.isPlaying === false) {
    roll(roundTextPlayer1)
  } else if (playerTwo.isPlaying === true && playerOne.isPlaying === false) {
    roll(roundTextPlayer2)
  }
})

// Event sur le bouton Hold
holdButton.addEventListener('click', () => {
  if (playerOne.isPlaying === true) {
    hold(roundTextPlayer1, globalTextPlayer1)
    playerOne.endPlaying()
    playerTwo.startPlaying()
  }
  else if (playerTwo.isPlaying === true && playerOne.isPlaying === false) {
    hold(roundTextPlayer2, globalTextPlayer2)
    playerTwo.endPlaying()
    playerOne.startPlaying()
  }
})

// Event sur le bouton New Game
newGamebutton.addEventListener('click', () => {
  let areYouSure = confirm('Are you sure to start a new game ?')
  if (areYouSure === true) {
    roundScore = 0
    globalScore = 0
    roundTextPlayer1.textContent = roundScore
    roundTextPlayer2.textContent = roundScore
    globalTextPlayer1.textContent = globalScore
    globalTextPlayer2.textContent = globalScore

    let ctx;
    if (canvas.getContext) {
      ctx = canvas.getContext('2d')
      canvas.getContext('2d').clearRect(0, 0, 150, 150)
      ctx.strokeRect(0, 0, 150, 150)
    }
  }
})