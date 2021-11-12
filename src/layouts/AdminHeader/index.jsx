import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Select, Button, Space, Dropdown, Menu, Switch } from 'antd';
import {
  MenuUnfoldOutlined,
  UserOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import {
  setThemeAction,
  toggleSidebarAction,
  logoutAction,
} from '../../redux/actions';
import { ROUTER } from '../../constants/router';

import * as S from './styles';

function AdminHeader() {
  const history = useHistory();
  const { theme } = useSelector(state => state.commonReducer);
  const dispatch = useDispatch();

  const { userInfo } = useSelector(state => state.authReducer);

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    dispatch(logoutAction());
    history.push(ROUTER.LOGIN);
  };

  return (
    <S.Header>
      <Button
        type="text"
        icon={<MenuUnfoldOutlined style={{ color: 'white' }} />}
        onClick={() => dispatch(toggleSidebarAction())}
      ></Button>
      <Space size={32}>
        <Switch
          checkedChildren="Light"
          unCheckedChildren="Dark"
          onChange={e => {
            if (e) dispatch(setThemeAction('light'));
            else dispatch(setThemeAction('dark'));
          }}
        />
        {/* <Select
          value={theme}
          onChange={value => dispatch(setThemeAction(value))}
          style={{ width: 100 }}
        >
          <Select.Option value="light">Light</Select.Option>
          <Select.Option value="dark">Dark</Select.Option>
        </Select> */}
        {userInfo.loading ? (
          <LoadingOutlined spin />
        ) : userInfo.data.name ? (
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="0">My Profile</Menu.Item>
                <Menu.Item key="1" onClick={logoutHandler}>
                  Logout
                </Menu.Item>
              </Menu>
            }
            trigger={['click']}
          >
            <Space>
              <UserOutlined style={{ color: 'white' }} />
              <div
                style={{
                  color: 'white',
                }}
              >
                {userInfo.data.name}
              </div>
            </Space>
          </Dropdown>
        ) : (
          <Button onClick={() => history.push(ROUTER.LOGIN)}>Đăng nhập</Button>
        )}
      </Space>
    </S.Header>
  );
}

export default AdminHeader;
