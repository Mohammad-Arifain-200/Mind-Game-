// =========================
// Game Variables
// =========================

const emojis = [
    "🍎",
    "🍌",
    "🍕",
    "🐱",
    "🚀",
    "⚽",
    "🎮",
    "🌈"
];


// একই emoji দুইবার
let cards = [...emojis, ...emojis];


// Game elements
const gameBoard = document.getElementById("gameBoard");

const movesElement = document.getElementById("moves");

const scoreElement = document.getElementById("score");

const timeElement = document.getElementById("time");

const restartButton = document.getElementById("restartBtn");

const messageElement = document.getElementById("message");


// Game state
let firstCard = null;

let secondCard = null;

let lockBoard = false;

let moves = 0;

let score = 0;

let matchedPairs = 0;

let seconds = 0;

let timer = null;

let gameStarted = false;


// =========================
// Shuffle Cards
// =========================

function shuffleCards() {

    cards.sort(() => Math.random() - 0.5);

}


// =========================
// Create Game
// =========================

function createGame() {

    gameBoard.innerHTML = "";

    shuffleCards();

    cards.forEach((emoji) => {

        const card = document.createElement("button");

        card.classList.add("card");

        card.dataset.emoji = emoji;

        card.textContent = "❓";


        card.addEventListener("click", () => {

            handleCardClick(card);

        });


        gameBoard.appendChild(card);

    });

}


// =========================
// Card Click
// =========================

function handleCardClick(card) {

    // Board locked হলে কিছু হবে না
    if (lockBoard) {
        return;
    }


    // একই card আবার click করলে কিছু হবে না
    if (card === firstCard) {
        return;
    }


    // Matched card click করা যাবে না
    if (card.classList.contains("matched")) {
        return;
    }


    // প্রথম click
    card.classList.add("open");

    card.textContent = card.dataset.emoji;


    // প্রথমবার click হলে timer শুরু
    if (!gameStarted) {

        startTimer();

        gameStarted = true;

    }


    if (!firstCard) {

        firstCard = card;

        return;

    }


    // দ্বিতীয় card
    secondCard = card;

    moves++;

    movesElement.textContent = moves;


    checkMatch();

}


// =========================
// Check Match
// =========================

function checkMatch() {

    const isMatch =
        firstCard.dataset.emoji ===
        secondCard.dataset.emoji;


    if (isMatch) {

        matchedCards();

    } else {

        unMatchedCards();

    }

}


// =========================
// Matched Cards
// =========================

function matchedCards() {

    firstCard.classList.add("matched");

    secondCard.classList.add("matched");


    score += 10;

    matchedPairs++;


    scoreElement.textContent = score;


    resetTurn();


    // সব pair complete?
    if (matchedPairs === emojis.length) {

        gameWon();

    }

}


// =========================
// Wrong Cards
// =========================

function unMatchedCards() {

    lockBoard = true;


    setTimeout(() => {

        firstCard.classList.remove("open");

        secondCard.classList.remove("open");


        firstCard.textContent = "❓";

        secondCard.textContent = "❓";


        resetTurn();

    }, 800);

}


// =========================
// Reset Turn
// =========================

function resetTurn() {

    firstCard = null;

    secondCard = null;

    lockBoard = false;

}


// =========================
// Timer
// =========================

function startTimer() {

    timer = setInterval(() => {

        seconds++;

        const minutes =
            Math.floor(seconds / 60);

        const remainingSeconds =
            seconds % 60;


        const formattedMinutes =
            String(minutes).padStart(2, "0");

        const formattedSeconds =
            String(remainingSeconds).padStart(2, "0");


        timeElement.textContent =
            `${formattedMinutes}:${formattedSeconds}`;

    }, 1000);

}


// =========================
// Game Won
// =========================

function gameWon() {

    clearInterval(timer);


    messageElement.textContent =
        `🎉 Congratulations! You won in ${moves} moves!`;

}


// =========================
// Restart Game
// =========================

function restartGame() {

    clearInterval(timer);


    // Reset variables
    firstCard = null;

    secondCard = null;

    lockBoard = false;

    moves = 0;

    score = 0;

    matchedPairs = 0;

    seconds = 0;

    gameStarted = false;


    // Reset UI
    movesElement.textContent = "0";

    scoreElement.textContent = "0";

    timeElement.textContent = "00:00";

    messageElement.textContent = "";


    // Create new game
    createGame();

}


// =========================
// Restart Button
// =========================

restartButton.addEventListener(
    "click",
    restartGame
);


// =========================
// Start Game
// =========================

createGame();