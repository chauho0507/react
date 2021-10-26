import styled, { css } from 'styled-components';

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-color: #36cfc9;
`;

export const H1 = styled.h1`
  color: white;
  font-style: italic;
`;

export const LoginForm = styled.div`
  margin: 16px;
  padding: 16px;
  width: 500px;
  background-color: white;
  border-radius: 4px;
`;
export const LoginHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
`;

export const LoginTitle = styled.h3`
  margin: 0 8px 18px 18px;
  font-weight: normal;
  cursor: pointer;
  font-size: ${({ size }) => size || '16px'};

  ${props =>
    props.active &&
    css`
      padding-bottom: 4px;
      color: #0d6efd;
      border-bottom: 2px solid #0d6efd;
    `}
`;
