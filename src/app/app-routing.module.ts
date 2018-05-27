import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes = [{ path: '', redirectTo: '', pathMatch: 'full' }];

export const RoutedComponents = [];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
