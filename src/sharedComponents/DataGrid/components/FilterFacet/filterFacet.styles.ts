import styled from "styled-components"

const StyledFilterFacet = styled.div`

display: grid;
grid-template-rows: auto 1fr auto;
grid-template-areas: 
    "facet-header"
    "facet-body"
    "facet-footer";
inline-size: 100%;
min-inline-size: 0;
box-sizing: border-box;
overflow-x: clip;
margin-block-start: 1rem;

svg {
  fill: currentColor;
  aspect-ratio: 1 / 1;
}

.facet-header {
    grid-area: facet-header;
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
        background-color: hsl(from var(--clr-info) h s l / 0.25);
    }

  .facet-title {
    font-weight: bold;
    font-size: 1rem;
    margin: 0;
  }
  
  .icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  svg {
    block-size: 2rem;
    transform: rotate(0deg);
    transition: transform 200ms ease-in-out;
  }

  &[aria-expanded="true"] {
    svg {
        transform: rotate(180deg);
    }
  }
}

.facet-body {
    --_option-height: 2.75rem;
    --_options-per-view: 3;
    --_icon-size: 2.5rem;
    grid-area: facet-body;
    display: grid;
    grid-template-rows: minmax(0, 0fr);
    min-block-size: 0;
    opacity: 0;
    overflow: hidden;
    transform-origin: top center;
    transition: grid-template-rows 300ms ease-in-out, opacity 200ms ease-in-out;

    &[aria-expanded="true"] {
        grid-template-rows: minmax(0, 1fr);
        opacity: 1;
    }

    .facet-body-inner {
        min-block-size: 0;
        overflow: hidden;
        border: 1px solid var(--app-border);
    }
  
    .facet-search-wrapper {
        display: grid;
        grid-template-columns: calc(var(--_icon-size) - 1px) 1fr;
        border: 1px solid var(--app-surface-muted);
        block-size: var(--_icon-size);

        .svg-wrapper {
            display: flex;
            background-color: var(--app-surface-muted);
            border-inline-end: 1px solid var(--app-border);
            justify-content: center;
            align-items: center;

            svg {
                block-size: 1.2rem;
            }
        }

        input[type="search"] {
            inline-size: 100%;
            block-size: 100%;
            margin: 0;
            padding-inline: 0.5rem;
            border: none;
            outline: none;
        }

        &:focus-within, &:hover {
            border: 1px solid var(--clr-primary);
        }
    }

  .facet-options-wrapper {
    list-style: none;
    padding: 0;
    margin: 0;
    block-size: calc(var(--_option-height) * (var(--_options-per-view) + 0.33));
    max-block-size: calc(var(--_option-height) * (var(--_options-per-view) + 0.33)); //added 0.33 to show partial next option
    overflow-y: auto;    

    li {
        position: relative;
        .facet-option-wrapper-btn {
            block-size: var(--_option-height);
            display: grid;
            grid-template-columns: var(--_icon-size) minmax(0, 1fr);
            grid-template-areas: "facet-icon facet-label";
            inline-size: 100%;
            min-inline-size: 0;
            align-items: center;
            border: none;
            text-align: left;
            padding: 0;
            transform: none;

            .selected-icon-wrapper, .label-wrapper {
                transition: background-color 0.2s ease-in-out;
                block-size: 100%;
                inline-size: 100%;
                display: flex;
                align-items: center;
            }
            
            .selected-icon-wrapper {
                grid-area: facet-icon;
                background-color: var(--app-surface-muted);
                border-inline-end: 1px solid var(--app-border);
                padding-block: 0.5rem;
                justify-content: center;

                svg {
                    block-size: 1.2rem;
                }
            }

            .label-wrapper {
                grid-area: facet-label;
                background-color: var(--app-surface);
                padding: 0.25rem 0.5rem;
                block-size: 100%;
                inline-size: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                min-inline-size: 0;
                overflow: hidden;
                white-space: nowrap;
            }
        }

        .facet-option-count {
            color: var(--app-text-muted);
            font-size: 0.8em;
        }

        .facet-option-button {
            position: absolute;
            z-index: 1;
            inset-inline-end: 0.5rem;
            inset-block-start: 50%;
            transform: translateY(-50%);
            border: 1px solid var(--app-border);
            padding: 0.25rem 0.5rem;
            font-size: 0.66rem;
            background-color: hsl(from var(--app-text) h s l / 0.8);
            color: var(--app-surface);
            opacity: 0;
            transition: opacity 0.2s ease-in-out;

            &:hover,
            &:focus-visible {
                background-color: var(--app-text);
                opacity: 1;
            }
        }

        &:hover,
        &:focus-visible {
            .selected-icon-wrapper, .label-wrapper {
                background-color: hsl(from var(--clr-primary) h s l / 0.25);
            }

            .facet-option-button {
                opacity: 1;
            }
        }
    }
  }

  .facet-reset-button {
    inline-size: 100%;
  }

  .facet-state {
    margin: 0;
    padding: 0.75rem;
    color: var(--app-text-muted);
  }

  .facet-load-sentinel {
    block-size: 1px;
  }

}

.facet-footer {
  grid-area: facet-footer;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

`

export { StyledFilterFacet }
