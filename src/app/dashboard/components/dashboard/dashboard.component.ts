import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { GameStateService } from '../../../shared/services/game-state.service';

import { BoardItemComponent } from '../board-item/board-item.component';
import { ControlPanelComponent } from '../control-panel/control-panel.component';
import { ScoreboardComponent } from '../scoreboard/scoreboard.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BoardItemComponent, MatCardModule, ControlPanelComponent, ScoreboardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  private gameStateService = inject(GameStateService);
  boardState$ = this.gameStateService.boardState$;

  startGame(reactionTime: number): void {
    this.gameStateService.startGame(reactionTime);
  }

  handleCellClick(index: number): void {
    this.gameStateService.handleCellClick(index);
  }

  stopGame(): void {
    this.gameStateService.stopGame();
  }
}
