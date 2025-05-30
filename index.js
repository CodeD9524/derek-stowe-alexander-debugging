const guessInput = document.getElementById('guess')
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');

let targetNumber;
let attempts = 0;
const maxNumberOfAttempts = 5;

function getRandomNumber(min, max) {
  return Math.floor(Math.random( * max - min + 1)) + min;}

function checkGuess() {
  const guess = parseInt(guessInput.value, 10);

  if (isNaN(guess) || guess < 1 || guess > 99) {
    alert("Please enter a valid number between 1 and 99.");
    guessInput.value = '';
    guessInput.focus();
    return;
  }

  attempts++;

  hideAllMessages();

  const remainingAttempts = maxNumberOfAttempts - attempts;

  // Show guess and remaining attempts
  numberOfGuessesMessage.style.display = '';
  numberOfGuessesMessage.innerHTML = `You guessed ${guess}.<br>${remainingAttempts} ${remainingAttempts === 1 ? 'guess' : 'guesses'} remaining`;

  // Check guess correctness
  if (guess === targetNumber) {
    correctMessage.style.display = '';

    submitButton.disabled = true;
    guessInput.disabled = true;

    resetButton.style.display = '';
    return;
  }

  if (guess < targetNumber) {
    tooLowMessage.style.display = '';
  } else {
    tooHighMessage.style.display = '';
  }

  if (attempts === maxNumberOfAttempts) {
    maxGuessesMessage.style.display = '';
    // Adjust message to show 0 guesses remaining here
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}.<br>0 guesses remaining`;

    submitButton.disabled = true;
    guessInput.disabled = true;

    resetButton.style.display = '';
  }

  guessInput.value = '';
  guessInput.focus();
}

function hideAllMessages() {
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) {
    messages[elementIndex].style.display = 'none';
  }
}

function setup() {
  targetNumber = getRandomNumber(1, 99);  // Since your prompt says 1 to 99
  console.log(`target number: ${targetNumber}`);

  attempts = 0;

  submitButton.disabled = false;
  guessInput.disabled = false;

  guessInput.value = '';
  guessInput.focus();

  resetButton.style.display = 'none';
  hideAllMessages();
}

submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);

setup();
