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

function hideAllMessages() {
  numberOfGuessesMsg.style.display = 'none';
  tooHighMsg.style.display = 'none';
  tooLowMsg.style.display = 'none';
  maxGuessesMsg.style.display = 'none';
  correctMsg.style.display = 'none';
}

function resetGame() {
  // Fix here: Math.random() returns [0,1), multiply by 99, +1 to get 1-99 range
  targetNumber = Math.floor(Math.random( * 9) + 1;
  guessesLeft = 5;
  guessInput.disabled = false;
  submitButton.disabled = false;
  guessInput.value = '';

  resetButton.style.display = 'none';
  hideAllMessages();
}

function handleGuess() {
  const guess = Number(guessInput.value);

  if (isNaN(guess) || guess < 1 || guess > 99) {
    alert("Please enter a number between 1 and 99.");
    guessInput.value = '';
    guessInput.focus();
    return;
  }

  hideAllMessages(); // Hide old messages before showing new ones

  guessesLeft--;
  numberOfGuessesMsg.textContent = `You guessed: ${guess}. Tries left: ${guessesLeft}`;
  numberOfGuessesMsg.style.display = 'block';

  if (guess === targetNumber) {
    correctMsg.style.display = 'block';
    guessInput.disabled = true;
    submitButton.disabled = true;
    resetButton.style.display = 'inline-block';
  } else if (guessesLeft === 0) {
    maxGuessesMsg.style.display = 'block';
    guessInput.disabled = true;
    submitButton.disabled = true;
    resetButton.style.display = 'inline-block';
  } else {
    if (guess < targetNumber) {
      tooLowMsg.style.display = 'block';
    } else {
      tooHighMsg.style.display = 'block';
    }
  }

  guessInput.value = '';
  guessInput.focus();
}

resetButton.style.display = 'none';
hideAllMessages();

submitButton.addEventListener('click', handleGuess);
resetButton.addEventListener('click', resetGame);

resetGame();