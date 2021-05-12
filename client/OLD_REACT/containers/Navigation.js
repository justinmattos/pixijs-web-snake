import styled from 'styled-components';

export const NavContainer = styled.div`
  display: flex;
  flex-flow: column;
  color: white;
  font-family: 'Audiowide', cursive;
  a {
    color: white;
    text-decoration: none;
  }
`;

export const NavRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ primary }) => (primary ? 'black' : 'gray')};
  padding: 0.5rem;
`;

export const UserOptions = styled.div`
  a:first-child {
    padding-right: 1rem;
  }
`;
