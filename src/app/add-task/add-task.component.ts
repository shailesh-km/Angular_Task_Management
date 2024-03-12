import { Component } from '@angular/core';
import { TaskService } from '../task.service';
import { NgForm } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { successMessage,successIcon,popupSizeClass } from '../variable';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  
  task: any = {};
  taskForm: any = {};
  statusOptions: string[] = ['Assigned', 'In-progress', 'Completed', 'On-hold', 'Waiting for approval'];

constructor(private taskService: TaskService,private router: Router,private datePipe: DatePipe){

}

onSubmit(taskForm: NgForm): void {
  if (taskForm.valid) {
      const formattedDueDate = this.datePipe.transform(taskForm.value.dueDate, 'yyyy-MM-dd');
      const newTask = { ...taskForm.value, dueDate: formattedDueDate };
      this.taskService.addTask(newTask, taskForm);
      this.router.navigate(['/tasks']);
      Swal.fire({
        text: successMessage,
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
}

listTask(){
  this.router.navigate(['/tasks']);
}

}
