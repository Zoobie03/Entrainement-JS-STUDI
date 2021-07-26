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
      commentaryAnimation(this.playerName + ' à votre tour ...', 2000);
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
        commentaryAnimation(`Félicitation ${this.playerName}, Vous avez gagné !`, 2000);
        newGame();
      } 
    }
}
  
// Initialisation des instances
let userName1 = prompt('Entrez le nom du premier joueur ? 10 caractères maximum') || 'Player';
let userName2 = prompt('Entrez le nom du deuxième joueur ? 10 caractères maximum') || 'Player 2';

// PLAYER 1
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

// PLAYER 2
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
  let min = Math.ceil(1);
  let max = Math.floor(6);
  let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
};

// Fonction d'animation de la zone commentaires
const commentaryAnimation = (messageInZone, waitSeconde) => {
  comment.classList.add('animate');
  comment.textContent = messageInZone;
  setTimeout(() => {
    comment.classList.remove('animate');
  }, waitSeconde);
}; 

// Fonction hold
const hold = () => {
  if (playerOne.isPlaying === true) {
    playerOne.endPlaying();
    body.classList.remove('player1');
    body.classList.add('player2');
    playerTwo.startPlaying();
  } 
  else if (playerTwo.isPlaying === true) {
    playerTwo.endPlaying();
    body.classList.remove('player2');
    body.classList.add('player1');
    playerOne.startPlaying();
  }
};

// Fonction new game
const newGame = () => {
  let areYouSure = confirm('Voulez-vous relancer une nouvelle partie ?');
  if (areYouSure === true) {
    roundScore = 0;
    playerOne.globalScorePlayer = 0
    playerTwo.globalScorePlayer = 0
    playerOne.endPlaying();
    playerTwo.endPlaying();
    playerOne.startPlaying();

    let ctx;
    if (canvas.getContext) {
      ctx = canvas.getContext('2d');
      canvas.getContext('2d').clearRect(0, 0, 150, 150);
      ctx.strokeRect(0, 0, 150, 150);
    }
  } else {
    commentaryAnimation('La partie reprend !', 2000);
  }
};

// Fonction lancé de dé
const roll = roundTextPlayer => {
  // Changement du canvas en fonction du Number retourné
  let ctx;
  // Si ... canvas est supporté alors ...
  if (canvas.getContext) { 
    ctx = canvas.getContext('2d');
    ctx.strokeRect(0, 0, 150, 150);
    switch (randomNumber()) {
      case 1: 
      // Si la fonction randomNumber renvoi 1 alors ce canvas sera appliqué
        ctx.beginPath();
        ctx.arc(75, 75, 8, 0, Math.PI * 2);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();
        // la variable roundScore se réinitialisera à 0
        roundScore = 0;
      // Et c'est au tour de l'aversaire de jouer
       if (playerOne.isPlaying === true) {
         playerOne.endPlaying();
         body.classList.remove("player1");
         body.classList.add("player2");
         playerTwo.startPlaying();
       } 
       else if (playerTwo.isPlaying === true) {
         playerTwo.endPlaying();
         body.classList.remove("player2");
         body.classList.add("player1");
         playerOne.startPlaying();
       }
        break;
        case 2:
        // Si la fonction randomNumber renvoi 2 alors ce canvas sera appliqué
        ctx.beginPath();
        ctx.arc(40, 40, 8, 0, Math.PI * 2);
        ctx.arc(110, 110, 8, 0, Math.PI * 2);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();
        // la variable roundScore ajoutera 2 a son résulat
        roundScore += 2;
        break;
      case 3:
        // Si la fonction randomNumber renvoi 3 alors ce canvas sera appliqué
        ctx.beginPath();
        ctx.arc(40, 40, 8, 0, Math.PI * 2);
        ctx.arc(75, 75, 8, 0, Math.PI * 2);
        ctx.arc(110, 110, 8, 0, Math.PI * 2);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();
        // la variable roundScore ajoutera 3 a son résulat
        roundScore += 3;
        break;
      case 4:
        // Si la fonction randomNumber renvoi 4 alors ce canvas sera appliqué
        ctx.beginPath();
        ctx.arc(40, 40, 8, 0, Math.PI * 2);
        ctx.arc(40, 110, 8, 0, Math.PI * 2);
        ctx.closePath();
        ctx.arc(110, 110, 8, 0, Math.PI * 2);
        ctx.closePath();
        ctx.arc(110, 40, 8, 0, Math.PI * 2);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();
        // la variable roundScore ajoutera 4 a son résulat
        roundScore += 4;
        break;
      case 5:
        // Si la fonction randomNumber renvoi 5 alors ce canvas sera appliqué
        ctx.beginPath();
        ctx.arc(40, 40, 8, 0, Math.PI * 2);
        ctx.arc(40, 110, 8, 0, Math.PI * 2);
        ctx.closePath();
        ctx.arc(110, 110, 8, 0, Math.PI * 2);
        ctx.closePath();
        ctx.arc(110, 40, 8, 0, Math.PI * 2);
        ctx.closePath();
        ctx.arc(75, 75, 8, 0, Math.PI * 2);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();
        // la variable roundScore ajoutera 5 a son résulat
        roundScore += 5;
        break;
      case 6:
        // Si la fonction randomNumber renvoi 6 alors ce canvas sera appliqué
        ctx.beginPath();
        ctx.arc(40, 40, 8, 0, Math.PI * 2);
        ctx.arc(40, 75, 8, 0, Math.PI * 2);
        ctx.arc(40, 110, 8, 0, Math.PI * 2);
        ctx.closePath();
        ctx.arc(110, 40, 8, 0, Math.PI * 2);
        ctx.closePath();
        ctx.arc(110, 75, 8, 0, Math.PI * 2);
        ctx.closePath();
        ctx.arc(110, 110, 8, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.closePath();
        // la variable roundScore ajoutera 6 a son résulat
        roundScore += 6;
        break;
    }

    // Le texte de la variable roundScore du joueur actuelle sera mis à jour
    roundTextPlayer.textContent = roundScore;

  } else { // Sinon ... renvoi un message d'erreur
    alert('Votre navigateur ne prend pas en charge cette fonctionnalitée ...');
  }
};

// Event sur le bouton Roll
rollButton.addEventListener('click', () => {
  // Clear le canvas pour éviter les bugs a chaque roll
  canvas.getContext('2d').clearRect(0, 0, 150, 150);
  if (playerOne.isPlaying === true) {
    roll(roundTextPlayer1);
  }
  else if (playerTwo.isPlaying === true) {
    roll(roundTextPlayer2);
  }
});

// Event sur le bouton Hold
holdButton.addEventListener('click', () => {
  hold();
});

// Event sur le bouton New Game
newGamebutton.addEventListener('click', () => {
  newGame();
});