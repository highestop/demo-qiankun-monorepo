import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import zh from '@angular/common/locales/zh';
import { APP_BASE_HREF, registerLocaleData } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NotFoundComponent } from './not-found.component';
import { SubAppComponent } from './subapp.component';

registerLocaleData(zh);

@NgModule({
  declarations: [AppComponent, NotFoundComponent, SubAppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      [
        {
          path: 'angular',
          children: [
            {
              path: 'app2',
              component: SubAppComponent,
            },
          ],
        },
        {
          path: '**',
          component: NotFoundComponent,
        },
      ],
      { useHash: true, enableTracing: true }
    ),
    HttpClientModule,
    FormsModule,
    NzCardModule,
    NzSpaceModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: APP_BASE_HREF,
      // @ts-ignore
      useValue: window.__POWERED_BY_QIANKUN__
        ? // @ts-ignore
          window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
        : '/',
    },
  ],
})
export class AppModule {}
