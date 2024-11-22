import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { GameStateService } from '../../../shared/services/game-state.service';

@Component({
  selector: 'app-control-panel',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule, AsyncPipe],
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.css'
})
export class ControlPanelComponent {
  @Output() start = new EventEmitter<number>();
  @Output() stop = new EventEmitter<void>();
  gameStatus$ = inject(GameStateService).gameStatus$;
  reactionTime = 1000;

  onStart(): void {
    this.start.emit(this.reactionTime);
  }

  onStop(): void {
    this.stop.emit();
  }
}
