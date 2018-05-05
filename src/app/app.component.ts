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
}
