// modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
// components
import { RoutedComponents } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, RoutedComponents],
  imports: [BrowserModule, AppRoutingModule],
})
export class AppModule {}
