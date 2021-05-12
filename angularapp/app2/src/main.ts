// import './public-path';
import { DOCUMENT } from '@angular/common';
import { enableProdMode, NgModuleRef, ɵsetDocument } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

let app: void | NgModuleRef<AppModule>;

function applyContainer(container: Document) {
  ɵsetDocument(container);
  return container;
}

async function render(props?: any) {
  app = await platformBrowserDynamic()
    .bootstrapModule(AppModule, {
      providers: [
        {
          provide: DOCUMENT,
          useFactory: applyContainer,
          deps: [props?.container ?? document],
        },
      ],
    })
    .catch(err => console.error(err));
}

if (!(window as any).__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log('[angularapp2] bootstraped');
}

export async function mount(props: any) {
  console.log('[angularapp2] mounted with props', props);
  render(props);
}

export async function unmount(props: any) {
  console.log('[angularapp2] unmount with props', props);
  // @ts-ignore
  app?.destroy();
}

export async function update(props: any) {
  console.log('[angularapp2] update props', props);
}
