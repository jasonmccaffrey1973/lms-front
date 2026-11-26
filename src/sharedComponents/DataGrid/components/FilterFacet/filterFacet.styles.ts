import styled from "styled-components"

const StyledFilterFacet = styled.div`

.facet-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: none;
    border-block-end: 1px solid var(--app-border);
    inline-size: 100%;
    padding: 0;
    padding-inline: 0.5rem;
    margin: 0;
    transform: none;
    transition: background-color 0.2s ease-in-out;

    &:active:not(:disabled) {
        transform: scale(1);
    }

    &:hover {
        cursor: pointer;
        background-color: hsl(from var(--clr-warning) h s l / 0.25);


    }

  .facet-title {
    font-weight: bold;
    font-size: 1rem;
  }
  
  .icon-wrapper {
    
  }

  svg {
    block-size: 2rem;
  }
}

.facet-body {
  
}

.facet-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

svg {
  fill: currentColor;
  aspect-ratio: 1 / 1;
}

`

export { StyledFilterFacet }