import styled from "styled-components"

const StyledDataGrid = styled.div`
display: grid;
grid-template-rows: auto 1fr auto;
grid-template-columns: 1fr;
grid-template-areas: 
  "header"
  "body"
  "footer";
block-size: 100%;

  .grid-header {
    grid-area: header;
    display: grid;
    grid-template-columns:auto 1fr auto;
    grid-template-areas: "data-header-left data-header-search data-header-right";
    background-color: var(--clr-primary);
    padding: 0.5rem;

    .data-header-left-wrapper {
      grid-area: data-header-left;
    }
    .data-header-search-wrapper {
        --search-icon-size: 1em;

        grid-area: data-header-search;
        display: flex;
        justify-content: center;
        align-items: center;

        form {        
            position: relative;    
        
        label {
            display: flex;
            align-items: center;
            height: 100%;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            padding-inline: calc(var(--search-icon-size) / 2);

            svg {
                width: var(--search-icon-size);
                aspect-ratio: 1 / 1;
                fill: currentColor;
            }

        }
        input[type="search"] {
            padding-left: calc(var(--search-icon-size) * 2);
            display: flex;
            align-items: center;
            font-size: 1rem;
            min-width: 18rem;
            overflow: clip;

        }
      }


    }
    .data-header-right-wrapper {
      grid-area: data-header-right;
    }

  }
  .grid-body {
    grid-area: body;
  }
  .grid-footer {
    grid-area: footer;
  }
`

export default StyledDataGrid