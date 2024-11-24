import { inject, Injectable } from '@angular/core';

import { BehaviorSubject, Subscription, timer } from 'rxjs';

import { ModalService } from './modal.service';

import { ResultModalComponent } from '../components/result-modal/result-modal.component';
import { MAX_SCORE } from '../constants';
import { Cell } from '../models/cell';
import { CellStateEnum } from '../models/cell-state';
import { WinnerType } from '../models/winner';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  private boardStateSubject = new BehaviorSubject<Cell[]>(this.initializeBoard());
  boardState$ = this.boardStateSubject.asObservable();

  private playerScoreSubject = new BehaviorSubject<number>(0);
  playerScore$ = this.playerScoreSubject.asObservable();

  private computerScoreSubject = new BehaviorSubject<number>(0);
  computerScore$ = this.computerScoreSubject.asObservable();

  private reactionTimeSubject = new BehaviorSubject<number>(1000);
  reactionTime$ = this.reactionTimeSubject.asObservable();

  private gameStatusSubject = new BehaviorSubject<boolean>(false);
  gameStatus$ = this.gameStatusSubject.asObservable();

  private modalService = inject(ModalService);

  private currentCellIndex: number | null = null;
  private gameTimer!: Subscription;
  private playerScore = 0;
  private computerScore = 0;

  // Initialize the board with default states
  private initializeBoard(): Cell[] {
    return Array.from({ length: 100 }, (_, index) => new Cell(index));
  }

  // Start the game by setting a random cell to yellow and starting a timer
  startGame(reactionTime: number): void {
    this.clearGameTimer();
    this.reactionTimeSubject.next(reactionTime);
    this.gameStatusSubject.next(true);
    this.resetBoard();
    this.playerScore = 0;
    this.computerScore = 0;
    this.updateScores();
    this.startRound();
  }

  // Reset the board and set all cells to default state
  private resetBoard(): void {
    const currentBoard = this.boardStateSubject.getValue();
    currentBoard.forEach((cell) => cell.resetState()); // Reset each cell
    this.boardStateSubject.next([...currentBoard]); // Emit the updated state
    this.playerScore = 0;
    this.computerScore = 0;
  }

  // Start a new round: Set a random cell to yellow
  private startRound(): void {
    const randomIndex = Math.floor(Math.random() * 100);
    this.currentCellIndex = randomIndex;
    const currentCell = this.boardStateSubject.getValue()[this.currentCellIndex];
    if (
      currentCell.state === CellStateEnum.Green ||
      currentCell.state === CellStateEnum.Red ||
      currentCell.state === CellStateEnum.Yellow
    ) {
      this.clearGameTimer();
      return this.startRound();
    }

    const currentBoard = this.boardStateSubject.getValue();

    // Update the state of the cell at the random index if its state is Default
    for (const cell of currentBoard) {
      if (cell.index === randomIndex && cell.state === CellStateEnum.Default) {
        cell.setState(CellStateEnum.Yellow); // Update the state
        break; // Exit the loop after updating
      }
    }

    // Emit a new copy of the updated board state
    this.boardStateSubject.next([...currentBoard]);

    // Start a timer for the round
    this.gameTimer = timer(this.reactionTimeSubject.getValue()).subscribe(() => {
      this.handleTimeout();
    });
  }

  // Handle a player clicking a cell
  handleCellClick(index: number): void {
    const currentCell = this.boardStateSubject.getValue()[index];

    // Only allow clicking if the cell is yellow (the target for the round)
    if (currentCell.state === CellStateEnum.Yellow) {
      // Clear the timer when the player clicks
      this.clearGameTimer();

      if (this.currentCellIndex === index) {
        this.handlePlayerSuccess();
      } else {
        this.handlePlayerFailure();
      }
    }
  }

  // Player successfully clicked on the yellow cell
  private handlePlayerSuccess(): void {
    const currentBoard = this.boardStateSubject.getValue();

    // Update the specific cell's state
    currentBoard.forEach((cell) => {
      if (cell.index === this.currentCellIndex) {
        cell.setState(CellStateEnum.Green); // Set to green for success
      }
    });

    // Emit the updated board state
    this.boardStateSubject.next([...currentBoard]);

    this.playerScore++;
    this.updateScores();

    if (this.playerScore === MAX_SCORE) {
      this.endGame('Player');
    } else {
      // Start a new round
      this.startRound();
    }
  }

  // Player failed to click on the yellow cell in time
  private handlePlayerFailure(): void {
    const currentBoard = this.boardStateSubject.getValue();

    // Update the specific cell's state
    currentBoard.forEach((cell) => {
      if (cell.index === this.currentCellIndex) {
        cell.setState(CellStateEnum.Red); // Set to green for success
      }
    });

    // Emit the updated board state
    this.boardStateSubject.next([...currentBoard]);

    this.computerScore++;
    this.updateScores();

    if (this.computerScore === MAX_SCORE) {
      this.endGame('Computer');
    } else {
      this.startRound(); // Start a new round
    }
  }

  // Handle the timeout case when the player doesn't click in time
  private handleTimeout(): void {
    if (this.currentCellIndex !== null) {
      this.handlePlayerFailure(); // Treat it as a failure for the player
    }
  }

  // Update the scores in the BehaviorSubject
  private updateScores(): void {
    this.playerScoreSubject.next(this.playerScore);
    this.computerScoreSubject.next(this.computerScore);
  }

  // End the game when either player or computer reaches 10 points
  private endGame(winner: WinnerType): void {
    this.clearGameTimer(); // Clear the timer on game end
    this.gameStatusSubject.next(false);
    this.modalService
      .openModal(ResultModalComponent, {
        data: winner,
        autoFocus: false,
        position: { top: '0%' },
        panelClass: 'drop-down-center'
      })
      .afterClosed()
      .subscribe(() => {
        this.resetBoard();
        this.updateScores();
      });
  }

  stopGame(): void {
    this.resetBoard();
    this.clearGameTimer();
    this.updateScores();
    this.gameStatusSubject.next(false);
  }

  // Clear the game timer
  private clearGameTimer(): void {
    if (this.gameTimer) {
      this.gameTimer.unsubscribe(); // Stop the timer if it is running
    }
  }
}
