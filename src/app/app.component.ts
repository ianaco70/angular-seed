import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <section class="alert alert-primary" role="alert">
      <div class="title">{{title}}</div>
    </section>
  `
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
