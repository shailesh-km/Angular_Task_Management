import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  headerText!: string;
  showSearch: boolean = false;
  searchQuery: string = '';
  constructor(private router: Router) {
    this.headerText = 'Task Management';
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateHeaderInfo(event.url);
      }
    });
  }

  private updateHeaderInfo(url: string): void {
    switch (url) {
      case '/tasks':
        this.headerText = 'Task Management';
        this.showSearch = true;
        break;
      case '/create-task':
        this.headerText = 'Add Task';
        this.showSearch = false;
        break;
      case '/edit_task':
        this.headerText = 'Edit Task';
        this.showSearch = false;

        break;
      default:
        this.headerText = 'Task Management';
        this.showSearch = true;

        break;
    }
  }
  
  
}
