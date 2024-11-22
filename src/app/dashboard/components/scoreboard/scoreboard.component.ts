import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { GameStateService } from '../../../shared/services/game-state.service';

@Component({
  selector: 'app-scoreboard',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './scoreboard.component.html',
  styleUrl: './scoreboard.component.css'
})
export class ScoreboardComponent {
  private gameStateService = inject(GameStateService);
  playerScore$ = this.gameStateService.playerScore$;
  computerScore$ = this.gameStateService.computerScore$;
}
