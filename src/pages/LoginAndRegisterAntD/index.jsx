import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

import * as S from './styles';

const LoginAndRegisterAntDPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <S.LoginContainer>
      <S.H1>Welcome to Chau Ho App ^.^!</S.H1>
      <S.LoginForm>
        <S.LoginHeader>
          <S.LoginTitle active={isLogin} onClick={() => setIsLogin(true)}>
            Login
          </S.LoginTitle>
          <S.LoginTitle active={!isLogin} onClick={() => setIsLogin(false)}>
            Register
          </S.LoginTitle>
        </S.LoginHeader>
        {isLogin ? <LoginForm /> : <RegisterForm setIsLogin={setIsLogin} />}
      </S.LoginForm>
    </S.LoginContainer>
  );
};

export default LoginAndRegisterAntDPage;
