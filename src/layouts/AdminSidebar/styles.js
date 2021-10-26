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

  ${({ item, location }) =>
    item.path === location.pathname &&
    css`
      background-color: #7dc6c9;
      border-right: 5px solid #006d75;
    `}
`;

export const Sidebar = styled.div`
  position: absolute;
  top: 0;
  left: -250px;
  width: 250px;
  height: 100%;
  background-color: ${props => props.theme.sidebar};
  overflow: hidden;
  transition: all 0.3s;
  ${({ active }) =>
    active &&
    css`
      left: 0;
    `}
`;
