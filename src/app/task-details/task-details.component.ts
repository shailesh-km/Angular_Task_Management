import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent {
  constructor(public dialogRef: MatDialogRef<TaskDetailsComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }

  closeDialog(){
    this.dialogRef.close();
  }
}
