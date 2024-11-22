import { CellStateEnum } from './cell-state';
import { ICell } from './cell.interface';

export class Cell implements ICell {
  constructor(
    public index: number,
    public state: CellStateEnum = CellStateEnum.Default
  ) {}

  // Method to update the state of the cell
  setState(newState: CellStateEnum): void {
    this.state = newState;
  }

  resetState(): void {
    this.state = CellStateEnum.Default;
  }
}
