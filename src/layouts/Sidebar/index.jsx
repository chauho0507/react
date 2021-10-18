import { useHistory, useLocation } from 'react-router-dom';

import * as S from './styles';

import { ROUTER } from '../../constants/router';

const SIDEBAR_ITEMS = [
  {
    title: 'Home',
    path: ROUTER.HOME,
  },
  {
    title: 'Product List',
    path: ROUTER.PRODUCT_LIST,
  },
  {
    title: 'To Do List',
    path: ROUTER.TO_DO_LIST,
  },
];

function Sidebar({ isShowSidebar }) {
  let history = useHistory();
  let location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    history.push(ROUTER.LOGIN);
  };

  const renderSidebarItems = () => {
    return SIDEBAR_ITEMS.map((item, index) => {
      return (
        <S.SidebarItem
          item={item}
          location={location}
          key={index}
          onClick={() => history.push(item.path)}
        >
          {item.title}
        </S.SidebarItem>
      );
    });
  };
  return (
    <S.Sidebar isShowSidebar={isShowSidebar}>
      <S.SidebarButton onClick={() => history.goBack()}>Back</S.SidebarButton>
      {renderSidebarItems()}
      <S.SidebarButton onClick={() => handleLogout()}>Logout</S.SidebarButton>
    </S.Sidebar>
  );
}

export default Sidebar;
