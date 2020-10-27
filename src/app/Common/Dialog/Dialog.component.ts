import { Inject, Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
    text: string;
  }
@Component({
    templateUrl: 'Dialog.component.html',
  })
export class DialogComponent {
    text: string;
    constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
        this.text = data.text;
      }
    closeDialog() {
        this.dialogRef.close();
      }
  }