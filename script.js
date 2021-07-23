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