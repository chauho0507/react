import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ROUTER } from '../../constants/router';
import { loginAction } from '../../redux/actions/';

import { Button, Form, Input } from 'antd';

const LoginFormPage = () => {
  const [loginForm] = Form.useForm();
  const history = useHistory();
  const dispatch = useDispatch();
  const { responseAction } = useSelector(state => state.authReducer);

  useEffect(() => {
    if (responseAction.login.error && !responseAction.login.loading) {
      if (responseAction.login.error === 'Incorrect password') {
        loginForm.setFields([
          {
            name: 'password',
            errors: [responseAction.login.error],
          },
        ]);
      } else {
        loginForm.setFields([
          {
            name: 'email',
            errors: [responseAction.login.error],
          },
        ]);
      }
    }
  }, [responseAction.login.error, responseAction.login.loading]);

  const submitHandler = values => {
    dispatch(
      loginAction({
        data: values,
        callback: {
          redirectHome: () => history.push(ROUTER.USER.HOME),
          redirectDashboard: () => history.push(ROUTER.ADMIN.DASHBOARD),
        },
      })
    );
    // const userIndex = userList.findIndex(item => {
    //   return item.email === values.email && item.password === values.password;
    // });
    // if (userIndex !== -1) {
    //   const userInfo = userList[userIndex];
    //   localStorage.setItem('userInfo', JSON.stringify(userInfo));
    //   dispatch(loginAction(userInfo));
    //   if (userInfo.role === 'admin') {
    //     history.push(ROUTER.DASHBOARD);
    //   } else {
    //     history.push(ROUTER.HOME);
    //   }
    // } else {
    //   alert('Đăng nhập thất bại');
    // }
  };

  return (
    <Form
      form={loginForm}
      name="login"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      onFinish={submitHandler}
    >
      <Form.Item
        label="E-mail"
        name="email"
        rules={[
          {
            type: 'email',
            message: 'E-mail chưa đúng định dạng',
          },
          {
            required: true,
            whitespace: true,
            message: 'Bạn phải nhập e-mail',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Bạn phải nhập mật khẩu.',
          },
          {
            min: 6,
            max: 24,
            message: 'Mật khẩu phải từ 6 đến 24 kí tự.',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 10,
          span: 4,
        }}
      >
        <Button
          type="primary"
          htmlType="submit"
          loading={responseAction.login.loading}
        >
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginFormPage;
