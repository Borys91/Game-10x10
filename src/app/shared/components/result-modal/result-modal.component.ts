import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { ScoreboardComponent } from '../../../dashboard/components/scoreboard/scoreboard.component';
import { WinnerType } from '../../models/winner';

@Component({
  selector: 'app-result-modal',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatDialogClose, ScoreboardComponent],
  templateUrl: './result-modal.component.html',
  styleUrl: './result-modal.component.css'
})
export class ResultModalComponent {
  data: WinnerType = inject(MAT_DIALOG_DATA);
}
