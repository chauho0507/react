import styled from 'styled-components';

export const Header = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 56px;
  background-color: ${props => props.theme.header};
`;

export const Button = styled.button`
  position: absolute;
  top: 16px;
  left: 10px;
`;
