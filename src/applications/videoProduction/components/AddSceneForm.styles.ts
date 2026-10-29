import styled from 'styled-components';

export const StyledSceneForm = styled.form`
  display: grid;
  gap: 1rem;
  min-width: 22rem;
`;

export const StyledField = styled.label`
  display: grid;
  gap: 0.5rem;
  font-size: 0.95rem;
  color: var(--app-text);
`; 

export const StyledInput = styled.input`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--app-border);
  border-radius: 0.375rem;
  background: var(--app-surface);
  color: var(--app-text);

  &:focus {
    outline: 2px solid rgba(94, 132, 255, 0.3);
    outline-offset: 1px;
  }
`;

export const StyledEditorWrapper = styled.div`
  display: grid;
  gap: 0.5rem;
`;
