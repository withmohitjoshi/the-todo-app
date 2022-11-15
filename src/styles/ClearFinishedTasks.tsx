import styled from "styled-components";

const ClearFinishedTasksContainer = styled.div`
  background-color: var(--color-light-dark);
  text-align: center;
  padding: 0.6rem;
  border-radius: 0.4rem;
  color: var(--color-grey);
  font-weight: 700;
  transition: all 0.25s ease-in;
  cursor: pointer;
  &:hover {
    background-color: var(--color-dark);
  }
`;
export default ClearFinishedTasksContainer;
