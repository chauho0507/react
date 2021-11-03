import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import './App.css';
import 'antd/dist/antd.css';

import DefaultRoute from './layouts/DefaultRoute';
import AdminRoute from './layouts/AdminRoute';
import LoginRoute from './layouts/LoginRoute';

import HomePage from './pages/user/Home';
import ProductListPage from './pages/user/ProductList';
import ProductDetailPage from './pages/user/ProductDetail';
import ToDoListAntDPage from './pages/user/ToDoListPageAntD';

import AdminDashboardPage from './pages/admin/Dashboard';
import AdminProductListPage from './pages/admin/ProductList';
import ModifyProductPage from './pages/admin/ModifyProduct';

import LoginAndRegisterAntDPage from './pages/LoginAndRegisterAntD';
import NotFoundPage from './pages/NotFound';

import { getUserInfoAction, getUserListAction } from './redux/actions';
import { USER_LIST } from './api/user';

import { ROUTER } from './constants/router';
import { darkTheme, lightTheme } from './themes';

const App = () => {
  const { theme } = useSelector(state => state.commonReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
    dispatch(getUserInfoAction(userInfo));
    dispatch(getUserListAction(USER_LIST));
  }, []);

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <BrowserRouter>
        <Switch>
          <DefaultRoute exact path={ROUTER.USER.HOME} component={HomePage} />
          <DefaultRoute
            exact
            path={ROUTER.USER.PRODUCT_LIST}
            component={ProductListPage}
          />
          <DefaultRoute
            exact
            path={ROUTER.USER.PRODUCT_DETAIL}
            component={ProductDetailPage}
          />
          <DefaultRoute
            exact
            path={ROUTER.USER.TO_DO_LIST_ANTD}
            component={ToDoListAntDPage}
          />
          <AdminRoute
            exact
            path={ROUTER.ADMIN.DASHBOARD}
            component={AdminDashboardPage}
          />
          <AdminRoute
            exact
            path={ROUTER.ADMIN.PRODUCT_LIST}
            component={AdminProductListPage}
          />
          <AdminRoute
            exact
            path={ROUTER.ADMIN.UPDATE_PRODUCT}
            component={ModifyProductPage}
          />
          <AdminRoute
            exact
            path={ROUTER.ADMIN.CREATE_PRODUCT}
            component={ModifyProductPage}
          />
          <LoginRoute
            exact
            path={ROUTER.LOGIN}
            component={LoginAndRegisterAntDPage}
          />
          <Route path={ROUTER.NOT_FOUND} component={NotFoundPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
