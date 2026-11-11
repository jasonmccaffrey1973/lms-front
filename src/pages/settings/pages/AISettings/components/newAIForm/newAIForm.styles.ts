import styled from 'styled-components';

const StyledAIForm = styled.form`
  
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 1fr;
  gap: 0.5rem;
  grid-template-areas: 'form-header'
                       'form-body'
                       'form-footer';
  block-size: calc(100% - 2rem); // Adjust for margin-block of 1rem on top and bottom
  margin-block: 1rem;
  padding: 1rem;
  border: 1px solid var(--app-border);
  border-radius: 0.4rem;
  background: var(--app-surface);

  .form-header { 
    grid-area: form-header; 
  }

  .form-body { 
    grid-area: form-body; 
    overflow-block: auto;
  }
  .form-footer { 
    grid-area: form-footer; 
  }  


  h2 { 
    margin: 0 0 1rem;
    font-size: 1.15rem; 
  }
  
  .fields { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.9rem; }
  label { display: grid; gap: 0.35rem; font-weight: 600; }
  label span { display: inline; font-weight: 400; color: var(--app-text-muted); }
  input, select {
    width: 100%; min-width: 0; box-sizing: border-box; padding: 0.6rem 0.7rem;
    color: var(--app-text); background: var(--app-surface); border: 1px solid var(--app-border); border-radius: 0.25rem;
  }
  input:focus-visible, select:focus-visible { outline: 2px solid var(--clr-primary); outline-offset: 1px; }
  .wide { grid-column: 1 / -1; }
  .note { color: var(--app-text-muted); font-size: 0.875rem; margin-block: 1rem; }
  .actions { display: flex; justify-content: flex-end; gap: 0.5rem; }
  @media (max-width: 640px) { .fields { grid-template-columns: 1fr; } .wide { grid-column: auto; } }
`;

export default StyledAIForm;
