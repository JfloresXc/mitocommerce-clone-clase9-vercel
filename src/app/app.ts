import { Component, signal } from '@angular/core';
import { Navbar } from './shared/ui/navbar/navbar';
import { Sidebar } from './shared/ui/sidebar/sidebar';

@Component({
  selector: 'app-root',
  imports: [Navbar, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('MitoPets');
}
