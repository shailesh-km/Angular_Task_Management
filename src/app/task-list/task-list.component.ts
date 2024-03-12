import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TaskService } from '../task.service'; 
import { MatDialog } from '@angular/material/dialog';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import Swal from 'sweetalert2';
import { TaskDetailsComponent } from '../task-details/task-details.component';
import { deleteMessage, yes, no, successIcon, deletedMessage } from '../variable';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  displayedColumns: string[] = ['slNo', 'title', 'dueDate', 'status', 'action'];
  tasks: any[] = [];
  filteredTasks: any[] = [];
  searchQuery: string = ''
  constructor(private router: Router, private taskService: TaskService,private dialog: MatDialog) {}


  ngOnInit(){
    this.tasks = this.taskService.getTasks();
    }


  openCreateTaskDialog(): void {
    this.router.navigate(['/create-task']);
  }
 
  editTask(task: any): void {
    const dialogRef = this.dialog.open(EditTaskComponent, {
      width: '500px',
      height: '350px',
      data: { task, serialNo: task.serialNo }, 
      disableClose: true
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.tasks = this.taskService.getTasks();
    });
  }

  deleteTask(task: any): void {
    Swal.fire({
      title: deleteMessage,
      showCancelButton: true,
      confirmButtonText: yes,
      cancelButtonText: no,
    }).then((result) => {
      if (result.isConfirmed) {
        this.taskService.deleteTask(task);
        Swal.fire(deletedMessage, '', successIcon);
        setTimeout(() => {
          Swal.close(); 
        }, 2000);
        this.tasks = this.taskService.getTasks();
      }
    });
  }

  showTaskDetails(task: any): void {
    this.dialog.open(TaskDetailsComponent, {
      width: '500px',
      height: '300px',
      data: task,
      disableClose: true
    });
  }
}
