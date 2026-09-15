import styled from "styled-components"; 

const StyledContainer = styled.div`
    width: 100%;
`;

const StyledDropZone = styled.div<{ $isDragActive: boolean; $isDragReject: boolean; }>`
    --_border-color: ${({ $isDragReject,
     $isDragActive }) => { 
        if ($isDragReject) { return "var(--clr-danger)"; } 
        if ($isDragActive) { return "var(--clr-primary)"; } 
        return "var(--editor-border)"; 
    }};

    display: flex;
    align-items: center;
    justify-content: center;
    inline-size: 100%;
    min-inline-size: 16rem;
    min-block-size: 14rem;
    border: 2px dashed;
    border-color: var(--_border-color);
    border-radius: 0.5rem;
    cursor: pointer;
    transition: border-color 150ms ease,
     background-color 150ms ease;

    &:hover {
        background-color: rgba(0, 0, 0, 0.02);
    }
    
    &:focus-visible {
        outline: 3px solid var(--clr-primary);
        outline-offset: 2px;
    }
`;

const StyledDropZoneContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 0.5rem;
    padding: 1.5rem;
    pointer-events: none;

    .icon-drop {
        width: 2.5rem;
        height: 2.5rem;
        opacity: 0.5;
        margin-bottom: 0.25rem;
    }

    .browse-button {
        margin-top: 0.25rem;
        pointer-events: none;
    }
`; 

const StyledTitle = styled.div`
    font-size: 1.05rem;
    font-weight: 600;
`; 

const StyledDescription = styled.div`
    font-size: 0.85rem;
    color: var(--editor-text-muted, #64748b);
    max-width: 24rem;
`; 

const StyledProgressBar = styled.div<{ $progress: number; $status?: string }>`
    width: 100%;
    height: 4px;
    background-color: var(--editor-border, rgba(0, 0, 0, 0.08));
    border-radius: 2px;
    overflow: hidden;
    margin-top: 0.35rem;

    .bar {
        height: 100%;
        width: ${({ $progress }) => Math.min(Math.max($progress, 0), 100)}%;
        background-color: ${({ $status }) => {
            if ($status === "error") return "var(--clr-danger, #ef4444)";
            if ($status === "success") return "var(--clr-success, #22c55e)";
            return "var(--clr-primary, #3b82f6)";
        }};
        transition: width 200ms ease;
    }
`; 

const StyledErrorWrapper = styled.div`
    padding: 0.5rem;
    margin-block: 0.5rem;
    background-color: hsl(from var(--clr-error) h s l / 20%);
    border: 1px solid hsl(from var(--clr-error) h s l / 40%);
    border-radius: 0.5rem;
    margin-top: 0.5rem;
    color: var(--app-text);
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: left;
    
    .error {    
        text-transform: uppercase;
        font-weight: 700;
        font-size: 0.875rem;
    }
    
    ul {
        margin: 0.33rem 0 0 0;
        padding: 0 0 0 1rem;
        list-style: none;
        font-weight: 600;
        font-size: 0.75rem;
    }

    button {
        margin-inline-start: 0.5rem;
    }
`;

const StyledFileList = styled.ul`
    --_list-item-height: 3.5rem;
    --_shown-list-items: 4;

    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
    list-style: none;
    max-block-size: calc(var(--_list-item-height) * var(--_shown-list-items));
    overflow-y: auto;
`;

const fileRowGrid = `
    display: grid;
    grid-template-columns: 3rem 1fr 5.5rem auto;
    align-items: center;
    column-gap: 0.75rem;
    padding: 0.5rem;
`;

const StyledAggregateProgress = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    padding: 0.75rem 0.5rem 0.25rem 0.5rem;
    border-block-end: 1px solid var(--editor-border);

    .aggregate-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--editor-text);

        .count {
            color: var(--editor-text-muted, #64748b);
            font-weight: 500;
        }
    }
`;

const StyledListHeader = styled.div`
    ${fileRowGrid}
    border-block-end: 2px solid var(--editor-border);
    padding-top: 1rem;
    color: var(--editor-text);
    font-weight: 600;
    font-size: 0.66rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;

    .preview {
        text-align: center;
    }
    .name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .size {
        text-align: right;
    }
    .actions {
        display: flex;
        justify-content: flex-end;
        gap: 0.25rem;

        button {
            flex-shrink: 0;
            width: 2rem;
            height: 2rem;
            padding: 0;
            display: grid;
            place-items: center;

            svg {
                display: block;
                width: 1rem;
                height: 1rem;
                max-height: unset;
            }
        }
    }
`;

const StyledFileItem = styled.li`
    ${fileRowGrid}
    border-block-end: 1px solid var(--editor-border);

    &:last-child {
        border-block-end: none;
    }

    .preview {
        display: flex;
        align-items: center;
        justify-content: center;
        aspect-ratio: 1 / 1;
        width: 3rem;
        height: 3rem;
        overflow: hidden;
        border-radius: 4px;
        background-color: var(--editor-bg, rgba(0, 0, 0, 0.04));

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }

        svg {
            width: 1rem;
            height: 1rem;
            opacity: 0.7;
        }
    }

    .name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 0.875rem;
        font-weight: 600;
        min-width: 0;
    }

    .size {
        font-size: 0.75rem;
        font-style: italic;
        text-align: right;
        white-space: nowrap;
    }

    .actions {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 0.35rem;

        button {
            flex-shrink: 0;
            width: 2rem;
            height: 2rem;
            padding: 0;
            display: grid;
            place-items: center;

            svg {
                display: block;
                width: 1.25rem;
                height: 1.25rem;
                max-height: unset;
            }
        }
    }
`; 

export { 
        StyledContainer,
        StyledDropZone,
        StyledDropZoneContent,
        StyledTitle,
        StyledDescription,
        StyledProgressBar,
        StyledAggregateProgress,
        StyledErrorWrapper,
        StyledFileList,
        StyledFileItem,
        StyledListHeader,
    };