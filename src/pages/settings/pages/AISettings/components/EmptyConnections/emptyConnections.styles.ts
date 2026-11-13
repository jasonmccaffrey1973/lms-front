import styled from "styled-components";

const StyledEmptyConnectionWrapper = styled.div`

  height: calc(100% - 2rem); // Adjust height to account for padding or margin
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.33rem;

  button {
   border: none;
   font-weight: bold;
   text-decoration: underline;
   font-size: inherit;
   cursor: pointer;
   transition: color 300ms ease, text-decoration 300ms ease;

   &:hover {
    text-decoration: none;
    color: var(--editor-text-muted);
   }
  }
`;

export { StyledEmptyConnectionWrapper };