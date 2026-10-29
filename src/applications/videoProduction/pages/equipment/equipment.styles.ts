import styled from 'styled-components';

export const StyledEquipmentPage = styled.section`
  display: grid;
  gap: 1rem;
  padding: 1rem 0;
`;

export const StyledEquipmentGrid = styled.div`
  display: grid;
  gap: 0.75rem;
`;

export const StyledEquipmentCard = styled.div`
  border: 1px solid var(--app-border);
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;

  strong {
    display: block;
  }

  .description {
    color: var(--app-text-muted);
  }
`;
