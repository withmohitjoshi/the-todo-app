import styled from "styled-components";

const AddTaskContainer = styled.div`
  display: flex;
  gap: 1rem;
  > * {
    border-radius: 0.4rem;
    outline: none;
  }
  input {
    border: 3px solid var(--color-blue);
    padding: 0.5rem 0.6rem;
    border-radius: 0.4rem;
    padding: 0.5rem 0.6rem;
    color: var(--color-dark);
    font-weight: 600;
    &:focus {
      border-color: var(--color-dark);
    }
  }
  button {
    border: none;
    background-color: var(--color-dark);
    padding: 0.7rem 1.9rem;
    color: var(--color-grey);
    font-weight: 700;
  }
`;

export default AddTaskContainer;
