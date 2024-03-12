import { NgForm } from '@angular/forms';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let taskService: TaskService;
  let taskForm: NgForm;

  beforeEach(() => {
    taskService = new TaskService();
    taskForm = jasmine.createSpyObj('NgForm', ['resetForm']);
  });

  it('should be created', () => {
    expect(taskService).toBeTruthy();
  });

  it('should add a task', () => {
    const initialTasks = taskService.getTasks();
    const newTask = { title: 'Test Task', description: 'Test Description' };

    taskService.addTask(newTask, taskForm);

    const updatedTasks = taskService.getTasks();
    expect(updatedTasks.length).toBe(initialTasks.length + 1);
    expect(updatedTasks.find((task) => task.title === newTask.title)).toBeTruthy();
  });

  it('should delete a task', () => {
    const initialTasks = taskService.getTasks();
    const taskToDelete = initialTasks[0];

    taskService.deleteTask(taskToDelete);

    const updatedTasks = taskService.getTasks();
    expect(updatedTasks.length).toBe(initialTasks.length - 1);
    expect(updatedTasks.find((task) => task.serialNo === taskToDelete.serialNo)).toBeFalsy();
  });

  it('should update a task', () => {
    const initialTasks = taskService.getTasks();
    const taskToUpdate = initialTasks[0];
    const updatedTask = { ...taskToUpdate, title: 'Updated Task Title' };

    taskService.updateTaskBySerial(taskToUpdate.serialNo, updatedTask);

    const updatedTasks = taskService.getTasks();
    expect(updatedTasks.length).toBe(initialTasks.length);
    expect(updatedTasks.find((task) => task.serialNo === taskToUpdate.serialNo).title).toBe('Updated Task Title');
  });
});
