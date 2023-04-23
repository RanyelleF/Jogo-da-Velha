let board = ['', '', '', '', '', '', '', '', '']; // Representação do tabuleiro
let currentPlayer = 'X'; // Jogador atual (X ou O)
let playerScore = 0; // Pontuação do jogador
let computerScore = 0; // Pontuação do computador

const winningCombinations = [ // Combinações vencedoras do jogo da velha
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Função para verificar se houve um vencedor
function checkWinner() {
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
}

// Função para verificar se o tabuleiro está cheio (empate)
function checkTie() {
    return !board.includes('');
}

// Função para atualizar a pontuação na interface
function updateScore() {
    document.getElementById('player-score').textContent = playerScore;
    document.getElementById('computer-score').textContent = computerScore;
}

// Função para reiniciar o jogo
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    updateBoard();
    updateScore();
}

// Função para atualizar o tabuleiro na interface
function updateBoard() {
    const cells = document.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i++) {
        cells[i].textContent = board[i];
    }
}

// Função para executar a jogada do jogador
// Função para executar a jogada do jogador
function playerMove(index) {
    const winner = checkWinner();
    if (winner) {
        // O jogo já acabou, então retorna sem fazer nada
        return;
    }
    if (checkTie()) {
        // Empate, então retorna sem fazer nada
        return;
    }
    if (board[index] === '') {
        board[index] = currentPlayer;
        updateBoard();
        const winner = checkWinner();
        if (winner) {
            playerScore++;
            updateScore();
            document.getElementById('alert-text').textContent = 'Você venceu!';
            document.getElementById('continue-button').style.display = 'inline';
            document.getElementById('alert').style.display = 'block';
            return;
        } else if (checkTie()) {
            document.getElementById('alert-text').textContent = 'Empate!';
            document.getElementById('continue-button').style.display = 'inline';
            document.getElementById('alert').style.display = 'block';
            return;
        }
        currentPlayer = 'O';
        setTimeout(computerMove, 500);
    }
    if (board[index] === '') {
        board[index] = currentPlayer;
        updateBoard();
        const winner = checkWinner();
        if (winner) {
            playerScore++;
            updateScore();
            document.getElementById('alert-text').textContent = 'Você venceu!';
            document.getElementById('continue-button').style.display = 'inline';
            document.getElementById('alert').style.display = 'block';
            return;
        } else if (checkTie()) {
            document.getElementById('alert-text').textContent = 'Empate!';
            document.getElementById('continue-button').style.display = 'inline';
            document.getElementById('alert').style.display = 'block';
            return;
        }
        currentPlayer = 'O';
        setTimeout(computerMove, 500);
    }
    
}

// Função para executar a jogada do computador
function computerMove() {
    const emptyCells = board.reduce((acc, val, index) => {
        if (val === '') {
            acc.push(index);
        }
        return acc;
    }, []);
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const computerChoice = emptyCells[randomIndex];
    board[computerChoice] = currentPlayer;
    updateBoard();
    const winner = checkWinner();
    if (winner) {
        computerScore++;
        updateScore();
        document.getElementById('alert-text').textContent = 'Você perdeu!';
        document.getElementById('continue-button').style.display = 'inline';
        document.getElementById('alert').style.display = 'block';
        return;
    } else if (checkTie()) {
        document.getElementById('alert-text').textContent = 'Empate!';
        document.getElementById('continue-button').style.display = 'inline';
        document.getElementById('alert').style.display = 'block';
        return;
    }
    currentPlayer = 'X';
}


// Event listener para as células do tabuleiro
document.getElementById('game-board').addEventListener('click', (event) => {
    const cellIndex = parseInt(event.target.id.slice(-1)) - 1;
    playerMove(cellIndex);
});
// Event listener para o botão "Continuar"
document.getElementById('continue-button').addEventListener('click', () => {
    resetGame();
    document.getElementById('alert').style.display = 'none';
});


// Inicial
// Inicialização do jogo
updateBoard();
updateScore();

// Função para reiniciar a pontuação
function resetScore() {
    playerScore = 0;
    computerScore = 0;
    updateScore();
}

// Event listener para o botão de reiniciar o jogo
document.getElementById('reset-game').addEventListener('click', () => {
    resetGame();
});

// Event listener para o botão de reiniciar a pontuação
document.getElementById('reset-score').addEventListener('click', () => {
    resetScore();
});
