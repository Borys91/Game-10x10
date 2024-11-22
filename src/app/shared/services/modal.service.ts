import { ComponentType } from '@angular/cdk/portal';
import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private dialog = inject(MatDialog);

  public openModal<T, D, R>(modal: ComponentType<T>, dialogConfig?: MatDialogConfig<D>): MatDialogRef<T, R> {
    return this.dialog.open(modal, dialogConfig);
  }
}
