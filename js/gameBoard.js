export class GameBoard {
    constructor() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
    }

    makeMove(index) {
        if (this.isValidMove(index)) {
            this.board[index] = this.currentPlayer;
            return true;
        }
        return false;
    }

    isValidMove(index) {
        return this.board[index] === '';
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }

    getCurrentPlayer() {
        return this.currentPlayer;
    }

    getBoard() {
        return [...this.board];
    }

    reset() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
    }

    getEmptyCells() {
        return this.board
            .map((cell, index) => cell === '' ? index : null)
            .filter(cell => cell !== null);
    }
}