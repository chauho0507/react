import styled from 'styled-components';

export const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 64px;
  background-color: ${props => props.theme.footer};
  color: white;
`;
