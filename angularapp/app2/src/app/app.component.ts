import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: ` <nz-card nzTitle="AngularApp2">
    <nz-space>
      <nz-space-item> <a routerLink="/">Back</a></nz-space-item>
      <nz-space-item><a routerLink="/page">Page</a></nz-space-item>
      <nz-space-item><a routerLink="/react/app1">react/app1</a></nz-space-item>
      <nz-space-item><a routerLink="/react/app2">react/app2</a></nz-space-item>
      <nz-space-item
        ><a routerLink="/angular/app1">angular/app1</a></nz-space-item
      >
      <nz-space-item
        ><a routerLink="/angular/app2">angular/app2</a></nz-space-item
      >
    </nz-space>
    <router-outlet></router-outlet>
  </nz-card>`,
})
export class AppComponent {}
