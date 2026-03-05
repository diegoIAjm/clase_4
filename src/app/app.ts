import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Panorama } from "./components/panorama/panorama";
import { Login } from "./components/login/login";

@Component({
  selector: 'app-root',
  imports: [Panorama, Login],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('clase_4');
}
