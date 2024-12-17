export class UIController {
    constructor(gameBoard, gameController, computerPlayer) {
        this.gameBoard = gameBoard;
        this.gameController = gameController;
        this.computerPlayer = computerPlayer;
        this.isVsComputer = false;
        this.isGameActive = false;

        this.boardElement = document.getElementById('gameBoard');
        this.statusElement = document.getElementById('status');
        this.resetBtn = document.getElementById('resetBtn');
        this.vsPlayerBtn = document.getElementById('vsPlayer');
        this.vsComputerBtn = document.getElementById('vsComputer');
    }

    initializeGame() {
        this.createBoard();
        this.setupEventListeners();
    }

    createBoard() {
        this.boardElement.innerHTML = '';
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.index = i;
            this.boardElement.appendChild(cell);
        }
    }

    setupEventListeners() {
        this.boardElement.addEventListener('click', (e) => {
            if (!this.isGameActive) return;
            const cell = e.target;
            if (cell.classList.contains('cell')) {
                this.handleCellClick(parseInt(cell.dataset.index));
            }
        });

        this.resetBtn.addEventListener('click', () => this.resetGame());
        this.vsPlayerBtn.addEventListener('click', () => this.startGame(false));
        this.vsComputerBtn.addEventListener('click', () => this.startGame(true));
    }

    startGame(vsComputer) {
        this.isVsComputer = vsComputer;
        this.isGameActive = true;
        this.gameBoard.reset();
        this.createBoard();
        this.updateStatus();
    }

    resetGame() {
        this.gameBoard.reset();
        this.createBoard();
        this.isGameActive = false;
        this.statusElement.textContent = 'Select game mode to start';
    }

    handleCellClick(index) {
        if (!this.gameBoard.isValidMove(index) || this.gameController.isGameOver()) {
            return;
        }

        this.makeMove(index);

        if (this.isVsComputer && !this.gameController.isGameOver()) {
            setTimeout(() => this.makeComputerMove(), 500);
        }
    }

    makeMove(index) {
        if (this.gameBoard.makeMove(index)) {
            this.updateBoard();
            this.updateStatus();
            
            if (!this.gameController.isGameOver()) {
                this.gameBoard.switchPlayer();
            }
        }
    }

    makeComputerMove() {
        const computerMove = this.computerPlayer.calculateMove(this.gameBoard);
        if (computerMove !== null) {
            this.makeMove(computerMove);
        }
    }

    updateBoard() {
        const board = this.gameBoard.getBoard();
        const cells = this.boardElement.children;
        
        for (let i = 0; i < cells.length; i++) {
            cells[i].textContent = board[i];
            cells[i].classList.remove('x', 'o');
            if (board[i]) {
                cells[i].classList.add(board[i].toLowerCase());
            }
        }
    }

    updateStatus() {
        this.statusElement.textContent = this.gameController.getGameStatus();
    }
}