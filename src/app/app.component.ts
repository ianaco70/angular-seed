import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <section>
      <div class="title">{{title}}</div>
    </section>
  `
})
export class AppComponent {
  public title: string = 'hello angular!';
}
