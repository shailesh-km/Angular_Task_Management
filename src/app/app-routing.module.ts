import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { TaskDetailsComponent } from './task-details/task-details.component';

const routes: Routes = [
  { path: 'tasks', component: TaskListComponent },
  { path: 'create-task', component: AddTaskComponent },
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: 'edit_task', component: EditTaskComponent },
  { path: 'task-details', component: TaskDetailsComponent },
  // { path: 'edit-task/:id', component: EditTaskComponent },
  // { path: '', redirectTo: '/tasks', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
