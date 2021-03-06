import './style.css';
import 'antd/dist/antd.css';
import * as ReactDOM from 'react-dom';
import { Button, Card, ConfigProvider, Space } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { HashRouter, Link, Route, Switch, useHistory } from 'react-router-dom';

// 必须在容器中引入 zone,js
import 'zone.js';
// 引入 qiankun 必须在引入 zone.js 之后
import {
  registerMicroApps,
  loadMicroApp,
  start,
  MicroApp,
  RegistrableApp,
} from 'qiankun';
import { useCallback, useEffect, useRef } from 'react';
import React from 'react';

const App = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <Card title="Container">
        <HashRouter>
          <Routes></Routes>
        </HashRouter>
      </Card>
      {/* 路由自动挂载子应用的入口 */}
      <div id="subapp-inner"></div>
    </ConfigProvider>
  );
};

const Routes = () => {
  const history = useHistory();
  useEffect(() => {
    // 监听 React 的路由事件变化
    history.listen((location, action) => {
      console.log(
        `The current URL is ${location.pathname}${location.search}${location.hash}`
      );
      console.log(
        `The last navigation action was ${action}`,
        JSON.stringify(history, null, 2)
      );
    });
  }, []);
  return (
    <>
      <Space>
        <Link to="/">Back</Link>
        <Link to="/page">Page</Link>
        <Link to="/react/app1">react/app1</Link>
        <Link to="/react/app2">react/app2</Link>
        <Link to="/angular/app1">angular/app1</Link>
        <Link to="/angular/app2">angular/app2</Link>
      </Space>
      <Switch>
        <Route path="/page" component={Page} exact></Route>
        <Route path="*/*">
          <Card title="404 - container"></Card>
        </Route>
      </Switch>
    </>
  );
};

// 进入 container 匹配到这个组件，从而手动挂载子应用
// 然后切换到 sublib hash，命中子应用中的路由
const Page = () => {
  const loadapp1 = useRef<MicroApp | null>(null);
  const loadapp2 = useRef<MicroApp | null>(null);
  const loadapp3 = useRef<MicroApp | null>(null);
  const loadapp4 = useRef<MicroApp | null>(null);
  const loadApp = useCallback((location: 1 | 2 | 3 | 4) => {
    switch (location) {
      case 1: {
        loadapp1.current = loadMicroApp({
          name: 'reactapp1',
          entry: '//localhost:3010/',
          container: '#loadapp1',
          // 初始化参数，会在 mount 钩子里打印
          props: {
            source: 'load from page',
          },
        });
        return;
      }
      case 2: {
        loadapp2.current = loadMicroApp({
          name: 'reactapp2',
          entry: '//localhost:3011/',
          container: '#loadapp2',
          props: {
            source: 'load from page',
          },
        });
        return;
      }
      case 3: {
        loadapp3.current = loadMicroApp({
          name: 'angularapp1',
          entry: '//localhost:3020/',
          container: '#loadapp3',
          props: {
            source: 'load from page',
          },
        });
        return;
      }
      case 4: {
        loadapp4.current = loadMicroApp({
          name: 'angularapp2',
          entry: '//localhost:3021/',
          container: '#loadapp4',
          props: {
            source: 'load from page',
          },
        });
        return;
      }
    }
  }, []);
  const unloadApp = useCallback((location: 1 | 2 | 3 | 4) => {
    switch (location) {
      case 1: {
        // https://single-spa.js.org/error/?code=6&arg=&arg=LOADING_SOURCE_CODE
        console.log(loadapp1.current?.getStatus());
        if (loadapp1.current?.getStatus() === 'MOUNTED') {
          // 卸载之后要重置这个 state，否则实例还在，下游调用 update 等方法时 single-spa 会报错
          loadapp1.current.unmount().then(() => (loadapp1.current = null));
        }
        return;
      }
      case 2: {
        console.log(loadapp2.current?.getStatus());
        if (loadapp2.current?.getStatus() === 'MOUNTED') {
          loadapp2.current.unmount().then(() => (loadapp2.current = null));
        }
        return;
      }
      case 3: {
        console.log(loadapp3.current?.getStatus());
        if (loadapp3.current?.getStatus() === 'MOUNTED') {
          loadapp3.current.unmount().then(() => (loadapp3.current = null));
        }
        return;
      }
      case 4: {
        console.log(loadapp4.current?.getStatus());
        if (loadapp4.current?.getStatus() === 'MOUNTED') {
          loadapp4.current.unmount().then(() => (loadapp4.current = null));
        }
        return;
      }
    }
  }, []);
  const update = useCallback(() => {
    console.log(loadapp1?.current?.update);
    if (loadapp1?.current?.update) {
      loadapp1?.current?.update({ ts: Date.now() });
    }
    if (loadapp2?.current?.update) {
      loadapp2?.current?.update({ ts: Date.now() });
    }
    if (loadapp3?.current?.update) {
      loadapp3?.current?.update({ ts: Date.now() });
    }
    if (loadapp4?.current?.update) {
      loadapp4?.current?.update({ ts: Date.now() });
    }
  }, []);
  return (
    <Card title="Page">
      <Button onClick={() => loadApp(1)}>+ React1</Button>
      <Button onClick={() => unloadApp(1)}>- React1</Button>
      <Button onClick={() => loadApp(2)}>+ React2</Button>
      <Button onClick={() => unloadApp(2)}>- React2</Button>
      <Button onClick={() => loadApp(3)}>+ Angular1</Button>
      <Button onClick={() => unloadApp(3)}>- Angular1</Button>
      <Button onClick={() => loadApp(4)}>+ Angular2</Button>
      <Button onClick={() => unloadApp(4)}>- Angular2</Button>
      {/* 点击按钮，触发子应用的 update 钩子，在子应用中打印结果 */}
      <Button onClick={update}>Update</Button>
      {/* 手动挂载子应用的入口，不在最外层 */}
      <div id="loadapp1"></div>
      <div id="loadapp2"></div>
      <div id="loadapp3"></div>
      <div id="loadapp4"></div>
    </Card>
  );
};

ReactDOM.render(
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>
  document.getElementById('root')
);

// 路由与子应用的映射
const URL_TO_APP: { [url: string]: string } = {
  'react/app1': 'reactapp1',
  'react/app2': 'reactapp2',
  'angular/app1': 'angularapp1',
  'angular/app2': 'angularapp2',
};

// 子应用与模块入口的映射
const APP_TO_ENTRY: { [appName: string]: string } = {
  reactapp1: '//localhost:3010',
  reactapp2: '//localhost:3011',
  angularapp1: '//localhost:3020',
  angularapp2: '//localhost:3021',
};

// 路由匹配策略
function urlMatchRules(appName: string) {
  const matchedUrls = Object.keys(URL_TO_APP).filter(
    url => URL_TO_APP[url] === appName
  );
  return (location: Location) => {
    return !!matchedUrls.find(url => location.hash.startsWith(`#/${url}`));
  };
}

// 生成子应用注册配置
function quickRegisterApp(appName: string): RegistrableApp<any> {
  return {
    name: appName,
    entry: APP_TO_ENTRY[appName],
    container: '#subapp-inner',
    activeRule: urlMatchRules(appName),
    // 初始化参数，会在 mount 钩子里打印
    props: {
      from: 'register from container',
    },
  };
}

// 默认载入子应用
registerMicroApps(
  [
    quickRegisterApp('reactapp1'),
    quickRegisterApp('reactapp2'),
    quickRegisterApp('angularapp1'),
    quickRegisterApp('angularapp2'),
  ],
  // 各种钩子打印
  {
    beforeLoad: app => Promise.resolve(console.log('before load', app.name)),
    beforeMount: app =>
      Promise.resolve(
        console.log('before mount', app.name, window.location.toString())
      ),
    afterMount: app =>
      Promise.resolve(
        console.log('after mount', app.name, window.location.toString())
      ),
    beforeUnmount: app =>
      Promise.resolve(
        console.log('before unmount', app.name, window.location.toString())
      ),
    afterUnmount: app =>
      Promise.resolve(
        console.log('after unmount', app.name, window.location.toString())
      ),
  }
);

start({
  prefetch: false, // 预加载
  // 避免 Angular 子应用因沙箱问题索引不到 app-root 节点加载失败
  // sandbox: { strictStyleIsolation: true }, // 沙箱隔离，开启强隔离保证相同类名也不会相互覆盖
  singular: false, // 允许多例子应用
});
