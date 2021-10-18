import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';

import DefaultRoute from './layouts/DefaultRoute';
import AdminRoute from './layouts/AdminRoute';
import LoginRoute from './layouts/LoginRoute';

import HomePage from './pages/Home';
import ProductListPage from './pages/ProductList';
import ProductDetailPage from './pages/ProductDetail';
import DashboardPage from './pages/Dashboard';
import LoginAndRegisterPage from './pages/LoginAndRegister';
import ToDoListPage from './pages/ToDoListPage';
import NotFoundPage from './pages/NotFound';

import { ROUTER } from './constants/router';
import UsersProvider from './store/UsersProvider';

import { darkTheme, lightTheme } from './themes';

function App() {
  const [isShowSidebar, setIsShowSidebar] = useState(true);
  const [theme, setTheme] = useState('light');

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <BrowserRouter>
        <select onChange={e => setTheme(e.target.value)}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
        <UsersProvider>
          <Switch>
            <DefaultRoute
              exact
              path={ROUTER.HOME}
              component={HomePage}
              setIsShowSidebar={setIsShowSidebar}
              isShowSidebar={isShowSidebar}
            />
            <DefaultRoute
              exact
              path={ROUTER.PRODUCT_LIST}
              component={ProductListPage}
              setIsShowSidebar={setIsShowSidebar}
              isShowSidebar={isShowSidebar}
            />
            <DefaultRoute
              exact
              path={ROUTER.PRODUCT_DETAIL}
              component={ProductDetailPage}
              setIsShowSidebar={setIsShowSidebar}
              isShowSidebar={isShowSidebar}
            />
            <DefaultRoute
              exact
              path={ROUTER.TO_DO_LIST}
              component={ToDoListPage}
              setIsShowSidebar={setIsShowSidebar}
              isShowSidebar={isShowSidebar}
            />
            <AdminRoute
              exact
              path={ROUTER.DASHBOARD}
              component={DashboardPage}
            />
            <LoginRoute
              exact
              path={ROUTER.LOGIN}
              component={LoginAndRegisterPage}
            />
            <Route component={NotFoundPage} />
          </Switch>
        </UsersProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
