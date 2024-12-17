export class GameController {
    constructor(gameBoard) {
        this.gameBoard = gameBoard;
        this.winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];
    }

    checkWinner() {
        const board = this.gameBoard.getBoard();
        
        for (const combination of this.winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        
        return null;
    }

    isDraw() {
        return !this.gameBoard.getBoard().includes('');
    }

    isGameOver() {
        return this.checkWinner() || this.isDraw();
    }

    getGameStatus() {
        const winner = this.checkWinner();
        if (winner) {
            return `Player ${winner} wins!`;
        } else if (this.isDraw()) {
            return "It's a draw!";
        } else {
            return `Player ${this.gameBoard.getCurrentPlayer()}'s turn`;
        }
    }
}