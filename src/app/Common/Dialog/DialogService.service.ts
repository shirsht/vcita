import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './Dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({ providedIn: 'root' })



export class DialogService {
    constructor(public dialog: MatDialog, private snackBar: MatSnackBar) {}
    openDialog(dialogText: string = 'Something went wrong'): void {
        const dialogRef = this.dialog.open(DialogComponent, {
            data: {text: dialogText}
        });
      }
      openSnackbar(text: string = 'Action ended successfully') {
        this.snackBar.open(text, null, {duration: 1000});
      }
}


