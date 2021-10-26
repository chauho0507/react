import React from 'react';
import { Button, Form, Input, Radio, Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { addUserAction } from '../../redux/actions';

const RegisterFormPage = ({ setIsLogin }) => {
  const [registerForm] = Form.useForm();
  const { Option } = Select;

  const { userList } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  const submitHandler = values => {
    const emailIndex = userList.findIndex(user => user.email === values.email);

    if (emailIndex !== -1) {
      registerForm.setFields([
        {
          name: 'email',
          errors: ['Email đã tồn tại.'],
        },
      ]);
    } else {
      dispatch(addUserAction(values));
      setIsLogin(true);
    }
  };

  const resetFormHandler = () => {
    registerForm.resetFields();
  };

  return (
    <Form
      name="register"
      form={registerForm}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      onFinish={values => submitHandler(values)}
      scrollToFirstError
    >
      <Form.Item
        name="name"
        label="Name"
        validateFirst
        rules={[
          {
            required: true,
            whitespace: true,
            message: 'Bạn phải nhập tên.',
          },
          {
            min: 6,
            message: 'Tên phải dài hơn 6 kí tự.',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="E-mail"
        dependencies={['role']}
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
        name="password"
        label="Password"
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
        name="rePassword"
        label="Re-password"
        dependencies={['password']}
        rules={[
          {
            required: true,
            message: 'Bạn phải xác nhận mật khẩu!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error('Mật khẩu xác nhận chưa đúng!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="gender"
        label="Gender"
        rules={[{ required: true, message: 'Bạn chưa xác nhận giới tính' }]}
      >
        <Select placeholder="Gender">
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
          <Option value="other">Other</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label=" "
        colon={false}
        name="role"
        rules={[{ required: true, message: 'Bạn phải chọn user hoặc admin' }]}
      >
        <Radio.Group>
          <Radio value="user">User</Radio>
          <Radio value="admin">Admin</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 6,
          span: 18,
        }}
      >
        <Button type="primary" htmlType="submit">
          Register
        </Button>
        <Button
          danger
          htmlType="button"
          style={{ marginLeft: 10 }}
          onClick={resetFormHandler}
        >
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterFormPage;
