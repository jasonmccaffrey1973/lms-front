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
  box-shadow: 0 0 0.25rem 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;


  .form-header { 
    grid-area: form-header; 
    border-block-end: 1px solid var(--app-border);
    text-transform: uppercase;
    background-color: var(--editor-item-hover);
    margin: -1rem;
    padding: 0.66rem 1rem;
    display: flex;
    align-items: center;
  }

  .form-body { 
    grid-area: form-body; 
    overflow-block: auto;
    padding-block: 1.5rem;
    padding-inline: 0.25rem;
    inline-size: min(100vw - 8rem, 50rem); //8rem is a magic number for horizontal padding and margins
  }
  .form-footer { 
    border-block-start: 1px solid var(--app-border);
    grid-area: form-footer; 
    padding-block: 1rem;
    padding-inline: 0.25rem;
  }  

  h2 { 
    margin: 0;
    font-size: 1.15rem;
    font-weight: 400;
    letter-spacing: 0.025em;
  }
  
  .fields {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0.9rem;
    }

  label {
      display: grid;
      gap: 0.35rem;
      font-weight: 400;
      font-size: 0.825rem;
      text-transform: uppercase;
    }

  label span {
      display: inline;
      font-weight: 400;
      color: var(--app-text-muted);
    }

  label .credential-label-title {
      font-weight: 600;
      color: var(--app-text);
    }

  .credential-label-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 1.75rem;
      gap: 0.5rem;
    }

  .get-api-key-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      font-size: 0.75rem;
      cursor: pointer;
    }

  .get-api-key-btn svg {
      inline-size: 1rem;
      block-size: 1rem;
    }

  input, select {
      width: 100%;
      min-width: 0;
      box-sizing: border-box;
      padding: 0.6rem 0.7rem;
      color: var(--app-text);
      background: var(--app-surface);
      border: 1px solid var(--app-border);
      border-radius: 0.25rem;
      font-size: 1rem;
    }

  input:focus-visible, select:focus-visible {
      outline: 2px solid var(--clr-primary);
      outline-offset: 1px;
    }

  .wide {
      grid-column: 1 / -1;
    }

  .note {
      color: var(--app-text-muted);
      font-size: 0.875rem;
      margin-block: 1rem;
    }

  .connection-test {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.75rem;
      margin-block-end: 1rem;
    }

  .connection-test p {
      margin: 0;
      color: var(--app-text-muted);
      overflow-wrap: anywhere;
    }

  .connection-test p[data-success='true'] {
      color: var(--clr-success);
    }

  .connection-test p[data-success='false'] {
      color: var(--clr-danger, #b42318);
    }

  .save-error {
      color: var(--clr-danger, #b42318);
      overflow-wrap: anywhere;
    }

  .actions {
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;
    }

  @media (max-width: 640px) {
    .fields {
      grid-template-columns: 1fr;
    }
    .wide {
      grid-column: auto;
    }
  }
`;

export default StyledAIForm;
