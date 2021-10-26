import styled from 'styled-components';

export const Header = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  color: white;

  padding: 0 24px;
  background-color: ${props => props.theme.header};
`;
