import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Select, Space, Dropdown, Menu } from 'antd';
import { MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';

import {
  setThemeAction,
  toggleSidebarAction,
  logoutAction,
} from '../../redux/actions';
import { ROUTER } from '../../constants/router';

import * as S from './styles';

function Header() {
  const history = useHistory();
  const { theme } = useSelector(state => state.commonReducer);
  const { userInfo } = useSelector(state => state.userReducer);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    dispatch(logoutAction());
  };

  return (
    <S.Header>
      <Button
        type="text"
        icon={<MenuUnfoldOutlined style={{ color: 'white' }} />}
        onClick={() => dispatch(toggleSidebarAction())}
      />
      <Space size={32}>
        <Select
          value={theme}
          onChange={value => dispatch(setThemeAction(value))}
          style={{ width: 100 }}
        >
          <Select.Option value="light">Light</Select.Option>
          <Select.Option value="dark">Dark</Select.Option>
        </Select>
        {userInfo.name ? (
          <Dropdown
            overlay={
              <Menu style={{ cursor: 'pointer' }}>
                {userInfo.role === 'admin' && (
                  <Menu.Item
                    key="0"
                    onClick={() => history.push(ROUTER.ADMIN.DASHBOARD)}
                  >
                    Admin Page
                  </Menu.Item>
                )}
                <Menu.Item key="1">My Profile</Menu.Item>
                <Menu.Item key="2" danger onClick={logoutHandler}>
                  Logout
                </Menu.Item>
              </Menu>
            }
            trigger={['click']}
          >
            <Space>
              <UserOutlined style={{ color: 'white' }} />
              <div style={{ color: 'white' }}>{userInfo.name}</div>
            </Space>
          </Dropdown>
        ) : (
          <Button onClick={() => history.push(ROUTER.LOGIN)}>Login</Button>
        )}
      </Space>
    </S.Header>
  );
}

export default Header;
