import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class AppComponent {
  public title: string = 'hello angular!';

  constructor() {
    if (process.env.ENV === 'prod') {
      console.log(`environment: prod`);
    } else {
      console.log(`environment: dev`);
    }
  }
}
