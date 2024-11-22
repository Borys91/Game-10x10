import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { Cell } from '../../../shared/models/cell';

@Component({
  selector: 'app-board-item',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './board-item.component.html',
  styleUrl: './board-item.component.css'
})
export class BoardItemComponent {
  @Input() cell: Cell | null = null;

  @Output() cellClick = new EventEmitter<number>();

  onCellClick(): void {
    if (this.cell) {
      this.cellClick.emit(this.cell.index);
    }
  }
}
