import './public-path';
import 'antd/dist/antd.css';
import * as ReactDOM from 'react-dom';
import { HashRouter, Link, Route, Switch } from 'react-router-dom';
import { useMemo } from 'react';
import { Card, Space } from 'antd';

const App = () => {
  const baseUrl = useMemo(
    () =>
      // @ts-ignore
      window.__POWERED_BY_QIANKUN__
        ? // @ts-ignore
          window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
        : '/',
    []
  );
  return (
    <>
      <HashRouter basename={baseUrl}>
        <Card title="ReactApp1">
          <HashRouter>
            <Space>
              <Link to="/">Back</Link>
              <Link to="/page">Page</Link>
              <Link to="/react/app1">react/app1</Link>
              <Link to="/react/app2">react/app2</Link>
              <Link to="/angular/app1">angular/app1</Link>
              <Link to="/angular/app2">angular/app2</Link>
            </Space>
            <Switch>
              <Route path="/react/app1">
                <Card title="/react/app1"></Card>
              </Route>
              <Route path="*/*">
                <Card title="404 - /react/app1"></Card>
              </Route>
            </Switch>
          </HashRouter>
        </Card>
      </HashRouter>
    </>
  );
};

function getRootNode(props?: any) {
  return props?.container
    ? props.container.querySelector('#root')
    : document.getElementById('root');
}

function render(props?: any) {
  ReactDOM.render(<App />, getRootNode(props));
}

// @ts-ignore
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function mount(props?: any) {
  console.log('[reactapp1] mounted with props', props);
  render(props);
}

export async function bootstrap() {
  console.log('[reactapp1] bootstraped');
}

export async function unmount(props?: any) {
  console.log('[reactapp1] unmount with props', props);
  ReactDOM.unmountComponentAtNode(getRootNode(props));
}

export async function update(props: any) {
  console.log('[reactapp1] update props', props);
}
