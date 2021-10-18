import styled, { css } from 'styled-components';

export const SidebarItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0 16px;
  height: 50px;
  cursor: pointer;
  color: white;

  &:hover {
    background-color: #69b0b3;
  }

  ${props =>
    props.item.path === props.location.pathname &&
    css`
      background-color: #7dc6c9;
      border-right: 5px solid #006d75;
    `}
`;

export const SidebarButton = styled.div`
  display: flex;
  align-items: center;
  padding: 0 16px;
  height: 50px;
  cursor: pointer;
  color: white;

  &:hover {
    background-color: #69b0b3;
  }
`;

export const Sidebar = styled.div`
  width: 0;
  background-color: ${props => props.theme.sidebar};
  overflow: hidden;
  transition: all 0.3s;

  ${props =>
    props.isShowSidebar &&
    css`
      width: 250px;
    `}
`;
