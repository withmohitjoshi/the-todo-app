import styled from "styled-components";

const NavBarContainer = styled.nav`
  display: flex;
  list-style: none;
  gap: 0.6rem;
  margin: 1rem 0;
  li {
    a {
      text-decoration: none;
      font-weight: 600;
      color: var(--color-light-dark);
      padding: 0.2rem 0.8rem;
      border-radius: 0.4rem;
      transition: all 0.25s;
      &:hover {
        background-color: hsl(0, 0%, 85%);
      }
    }
    .active {
      border-bottom: 3px solid var(--color-blue);
      background-color: rgb(128, 128, 128, 0.05);
      &:hover {
        background-color: hsl(0, 0%, 80%);
      }
    }
  }
`;
export default NavBarContainer;
