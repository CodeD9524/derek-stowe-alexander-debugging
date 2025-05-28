// index.js

// Select elements
const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');

const numberOfGuessesMsg = document.getElementById('number-of-guesses');
const tooHighMsg = document.getElementById('too-high');
const tooLowMsg = document.getElementById('too-low');
const maxGuessesMsg = document.getElementById('max-guesses');
const correctMsg = document.getElementById('correct');

let targetNumber;
let guessesLeft;

// Function to hide all messages
function hideAllMessages() {
  numberOfGuessesMsg.style.display = 'none';
  tooHighMsg.style.display = 'none';
  tooLowMsg.style.display = 'none';
  maxGuessesMsg.style.display = 'none';
  correctMsg.style.display = 'none';
}

// Initialize or reset the game to the starting state
function resetGame() {
  targetNumber = Math.floor(Math.random( * 9) + 1; // random number between 1-99
  guessesLeft = 5;

  guessInput.disabled = false;
  submitButton.disabled = false;
  guessInput.value = '';

  resetButton.style.display = 'none';
  hideAllMessages();
}

// Function to update messages based on the guess
function handleGuess() {
  const guess = Number(guessInput.value);

  // Validate input number is in range
  if (isNaN(guess) || guess < 1 || guess > 99) {
    alert("Please enter a number between 1 and 99.");
    guessInput.value = '';
    guessInput.focus();
    return;
  }

  // Show the number guessed and guesses left message
  numberOfGuessesMsg.textContent = `You guessed: ${guess}. Tries left: ${guessesLeft - 1}`;
  numberOfGuessesMsg.style.display = 'block';

  hideAllMessages(); // Hide all other messages first

  if (guess === targetNumber) {
    // Correct guess
    correctMsg.style.display = 'block';
    guessInput.disabled = true;
    submitButton.disabled = true;
    resetButton.style.display = 'inline-block';
  } else {
    guessesLeft--;

    if (guessesLeft === 0) {
      // No attempts left - game over
      maxGuessesMsg.style.display = 'block';
      guessInput.disabled = true;
      submitButton.disabled = true;
      resetButton.style.display = 'inline-block';
      numberOfGuessesMsg.textContent = `You guessed: ${guess}. Tries left: 0`;
    } else {
      // Wrong guess but attempts left
      if (guess < targetNumber) {
        tooLowMsg.style.display = 'block';
      } else {
        tooHighMsg.style.display = 'block';
      }
    }
  }

  guessInput.value = '';
  guessInput.focus();
}

// Initially hide messages and reset button
resetButton.style.display = 'none';
hideAllMessages();

// Add event listeners
submitButton.addEventListener('click', handleGuess);
resetButton.addEventListener('click', resetGame);

// Start the game
resetGame();