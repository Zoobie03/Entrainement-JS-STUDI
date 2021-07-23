// Récupération des éléments du DOM
const canvas = document.querySelector('canvas')
const newGamebutton = document.getElementById('newGameButton')
const rollButton = document.getElementById('rollButton')
const holdButton = document.getElementById('holdButton')
const player1NameText = document.getElementById('player1')
const player2NameText = document.getElementById('player2')

// Scores des joueurs
const roundTextPlayer1 = document.getElementById('currentPlayer1')
const roundTextPlayer2 = document.getElementById('currentPlayer2')
const globalTextPlayer1 = document.getElementById('globalPlayer1')
const globalTextPlayer2 = document.getElementById('globalPlayer2')

// Définition de la classe
class Player {
  constructor(isPlaying) {
    this.playerName = prompt('Entrez le nom des joueurs ?');
    this.isPlaying = isPlaying;
  }
  
  startPlaying() {
    this.isPlaying = true
    alert('A votre tour ' + this.playerName)
  }
  
  endPlaying() {
    this.isPlaying = false
  }
}

// Définition des instances
let playerOne = new Player(true)
let playerTwo = new Player(false)
player1NameText.textContent = playerOne.playerName
player2NameText.textContent = playerTwo.playerName

// Définition de la variable round & global
let roundScore = 0
let globalScore = 0

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