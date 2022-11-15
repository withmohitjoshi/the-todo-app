import styled from "styled-components";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  > p {
    font-weight: 500;
    color: var(--color-dark);
  }
`;
export default AppContainer;
