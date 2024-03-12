import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { updateMessage, successIcon, popupSizeClass } from '../variable';
@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent {
  @Input() task: any;
  editTaskForm!: FormGroup;
  statusOptions: string[] = ['Assigned', 'In-progress', 'Completed', 'On-hold', 'Waiting for approval'];

  constructor(private fb: FormBuilder, private taskService: TaskService, private router: Router,
    public dialogRef: MatDialogRef<EditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.task = data.task;
    }

  ngOnInit(): void {
    this.initForm();
    

  }

  private initForm(): void {
    console.log(this.task)
    this.editTaskForm = this.fb.group({
      title: [this.task.title, Validators.required],
      description: [this.task.description, Validators.required],
      status: [this.task.status, Validators.required],
      dueDate: [this.task.dueDate, Validators.required],
      serialNo: [this.data.serialNo], 
    });
  }

  onSubmit(): void {
  const updatedTask = this.editTaskForm.value;
  console.log(updatedTask);
  this.taskService.updateTaskBySerial(updatedTask.serialNo, updatedTask);
  this.dialogRef.close();

  Swal.fire({
    text: updateMessage,
    icon: successIcon,
    showConfirmButton: false,
    customClass: {
      popup: popupSizeClass,
    },
  });
  setTimeout(() => {
    Swal.close(); 
  }, 2000);
}

onCancel(): void {
  this.dialogRef.close();
}
}

