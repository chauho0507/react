import React from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import UserHeader from '../UserHeader';
import UserSidebar from '../UserSidebar';
import Footer from '../Footer';

import * as S from './styles';

const DefaultRoute = ({ component: Component, ...rest }) => {
  const { isShowSidebar } = useSelector(state => state.commonReducer);

  return (
    <Route
      {...rest}
      render={routeProps => (
        <>
          <UserHeader />
          <S.MainContainer>
            <UserSidebar />
            <S.MainContent isShowSidebar={isShowSidebar}>
              <Component {...routeProps} />
            </S.MainContent>
          </S.MainContainer>
          <Footer />
        </>
      )}
    />
  );
};

export default DefaultRoute;
