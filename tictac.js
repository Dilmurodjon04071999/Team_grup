// tictac.js - simple Tic-Tac-Toe game (X vs O)
(function(){
  const WIN_COMBOS = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // cols
    [0,4,8],[2,4,6] // diagonals
  ];

  const cells = Array.from(document.querySelectorAll('.cell'));
  const statusEl = document.getElementById('status');
  const playerEl = document.getElementById('player');
  const restartBtn = document.getElementById('restart');
  const resetScoreBtn = document.getElementById('resetScore');
  const scoreXEl = document.getElementById('scoreX');
  const scoreOEl = document.getElementById('scoreO');
  const scoreTEl = document.getElementById('scoreT');

  let board = Array(9).fill(null);
  let current = 'X';
  let gameOver = false;
  // scores persisted in localStorage
  const SCORES_KEY = 'ttt_scores_v1';

  function loadScores(){
    try{
      const raw = localStorage.getItem(SCORES_KEY);
      if(!raw) return {X:0,O:0,T:0};
      return JSON.parse(raw);
    }catch(e){return {X:0,O:0,T:0};}
  }
  function saveScores(s){ localStorage.setItem(SCORES_KEY, JSON.stringify(s)); }

  let scores = loadScores();
  updateScoreUI();

  function updateScoreUI(){
    scoreXEl.textContent = scores.X;
    scoreOEl.textContent = scores.O;
    scoreTEl.textContent = scores.T;
  }

  function setStatus(text){ statusEl.firstChild && (statusEl.firstChild.textContent = ''); /* noop to keep DOM */ }

  function render(){
    cells.forEach((cell,i)=>{
      cell.textContent = board[i] || '';
      cell.classList.remove('x','o','win');
      if(board[i]) cell.classList.add(board[i].toLowerCase());
    });
    playerEl.textContent = current;
  }

  function checkWin(player){
    return WIN_COMBOS.find(combo => combo.every(i => board[i] === player));
  }

  function handleMove(i){
    if(gameOver) return;
    if(board[i]) return;
    board[i] = current;
    const winCombo = checkWin(current);
    if(winCombo){
      // highlight
      winCombo.forEach(idx => cells[idx].classList.add('win'));
      gameOver = true;
      statusEl.textContent = `${current} wins!`;
      scores[current] = (scores[current]||0) + 1;
      saveScores(scores); updateScoreUI();
      return;
    }
    // draw
    if(board.every(Boolean)){
      gameOver = true;
      statusEl.textContent = 'Draw!';
      scores.T = (scores.T||0) + 1; saveScores(scores); updateScoreUI();
      return;
    }
    // next player
    current = current === 'X' ? 'O' : 'X';
    statusEl.textContent = `Current: `;
    playerEl.textContent = current;
    render();
  }

  // attach listeners
  cells.forEach((cell, idx)=>{
    cell.addEventListener('click', ()=>{
      handleMove(idx);
      render();
    });
  });

  restartBtn.addEventListener('click', ()=>{
    board = Array(9).fill(null);
    current = 'X';
    gameOver = false;
    statusEl.textContent = 'Current: ';
    playerEl.textContent = current;
    cells.forEach(c=>c.classList.remove('win'));
    render();
  });

  resetScoreBtn.addEventListener('click', ()=>{
    scores = {X:0,O:0,T:0}; saveScores(scores); updateScoreUI();
  });

  // initial render
  statusEl.textContent = 'Current: ';
  playerEl.textContent = current;
  render();

})();
