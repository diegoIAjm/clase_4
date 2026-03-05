import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Panorama } from "./components/panorama/panorama";
import { Elementos } from "./components/elementos/elementos";
import { Login } from "./components/login/login";

@Component({
  selector: 'app-root',
  imports: [Panorama, Elementos, Login],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('clase_4');
}
