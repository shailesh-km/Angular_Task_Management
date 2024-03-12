import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor() { }
  private localStorageKey = 'tasks';

  getTasks(): any[] {
    return JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
  }

  addTask(task: any, taskForm: NgForm): void {
    const tasks = this.getTasks();
    if (tasks.length === 0) {
      task.serialNo = 1;
    } else {
      const lastTask = tasks[tasks.length - 1];
      task.serialNo = lastTask.serialNo + 1;
    }
    tasks.push(task);
    this.saveTasks(tasks);
      taskForm.resetForm();
  }

  deleteTask(task: any): void {
    const tasks = this.getTasks();
    const index = tasks.findIndex((t) => t.serialNo === task.serialNo);
    if (index !== -1) {
      tasks.splice(index, 1);
      this.saveTasks(tasks);
    }
  }

  updateTaskBySerial(serialNo: number, updatedTask: any): void {
    const tasks = this.getTasks();
    const index = tasks.findIndex(task => task.serialNo === serialNo);
  
    if (index !== -1) {
      tasks[index] = updatedTask;
      this.saveTasks(tasks);
    }
  }
  
  private saveTasks(tasks: any[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(tasks));
  }
}
