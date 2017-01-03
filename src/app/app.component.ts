/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { AppState } from './app.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.style.css',
    '../assets/css/rsvp_fonts.css',
    '../assets/css/rsvp_main.css',
    '../assets/css/custom_nana.css'
  ],
  template: `
          <scroll-top></scroll-top>
          <controller></controller>
          <router-outlet>
          </router-outlet>        

  `
})
export class App {


  constructor(
    public appState: AppState) {

  }

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}
