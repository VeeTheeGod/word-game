const wordBank = {
    easy: ['cat', 'dog', 'sun', 'car', 'book'],
    medium: ['flower', 'planet', 'laptop', 'guitar', 'button'],
    hard: ['javascript', 'developer', 'algorithm', 'function', 'keyboard']
  };
  
  let currentWord = '';
  let scrambled = '';
  let timer;
  let timeLeft = 30;
  let score = 0;
  
  function scrambleWord(word) {
    const arr = word.split('');
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
  }
  
  function getDifficulty() {
    return document.getElementById('difficulty').value;
  }
  
  function startTimer() {
    clearInterval(timer);
    timeLeft = 30;
    document.getElementById('timer').textContent = timeLeft;
  
    timer = setInterval(() => {
      timeLeft--;
      document.getElementById('timer').textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timer);
        document.getElementById('message').textContent = `⏰ Time's up! The word was "${currentWord}".`;
        document.getElementById('message').style.color = 'orange';
      }
    }, 1000);
  }
  
  function resetGame() {
    const difficulty = getDifficulty();
    const words = wordBank[difficulty];
  
    document.getElementById('message').textContent = '';
    document.getElementById('guess-input').value = '';
  
    currentWord = words[Math.floor(Math.random() * words.length)];
    scrambled = scrambleWord(currentWord);
    while (scrambled === currentWord) {
      scrambled = scrambleWord(currentWord);
    }
  
    document.getElementById('scrambled-word').textContent = scrambled;
    startTimer();
  }
  
  function checkGuess() {
    const guess = document.getElementById('guess-input').value.toLowerCase();
    const message = document.getElementById('message');
  
    if (guess === currentWord) {
      score += 10;
      message.textContent = '✅ Correct!';
      message.style.color = 'lightgreen';
      document.getElementById('score').textContent = score;
      resetGame();
    } else {
      message.textContent = '❌ Try again!';
      message.style.color = 'salmon';
    }
  }
  
  window.onload = resetGame;
  