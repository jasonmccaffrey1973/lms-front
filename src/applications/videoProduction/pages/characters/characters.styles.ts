import styled from 'styled-components';

export const StyledCharactersPage = styled.section`
  display: grid;
  gap: 1rem;
  padding: 1rem 0;
`;

export const StyledCharactersGrid = styled.div`
  display: grid;
  gap: 0.75rem;
`;

export const StyledCharacterCard = styled.div`
  border: 1px solid var(--app-border);
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;

  strong {
    display: block;
  }

  .role {
    color: var(--app-text-muted);
  }
`;
