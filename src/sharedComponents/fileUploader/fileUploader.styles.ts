import styled from "styled-components"; 

const StyledContainer = styled.div`
    width: 100%;
`;

const StyledDropZone = styled.div<{ $isDragActive: boolean; $isDragReject: boolean; }>`
    --_border-color: ${({ $isDragReject, $isDragActive }) => { 
        if ($isDragReject) { return "var(--clr-danger)"; } 
        if ($isDragActive) { return "var(--clr-primary)"; } 
        return "var(--editor-border)"; 
    }};

    display: flex;
    align-items: center;
    justify-content: center;
    inline-size: 100%;
    min-inline-size: 16rem;
    min-block-size: 15rem;
    border: 2px dashed;
    border-color: var(--_border-color);
    border-radius: 0.5rem;
    cursor: pointer;
    transition: border-color 150ms ease, background-color 150ms ease;

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
    pointer-events: none;
`; 

const StyledTitle = styled.div`
    font-size: 1rem;
    font-weight: 600;
`; 

const StyledDescription = styled.div`
    margin-top: 6px;
    font-size: 0.875rem;
`; 

const StyledStatus = styled.div`
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
`; 

const StyledFileList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 0;
    margin: 16px 0 0;
    list-style: none;
`; 

const StyledFileItem = styled.li`
    display: flex;
    justify-content: space-between;
    gap: 1.5rem;
    align-items: center;
    padding: 0.33rem;
    border: 1px solid var(--editor-border);
    border-radius: 0.5rem;


    button {
        flex-shrink: 0;
        block-size: min-content;
        inline-size: fit-content;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 0.66rem;

        svg {
            display: block;
            max-height: 1rem;
        }
    }
`; 

const StyledFileInfo = styled.div`
    display: grid;
    grid-template-columns: 1fr auto auto;
    grid-template-areas: "name size preview";
    align-items: center;
    gap: 0.33rem;

    .name {
        grid-area: name;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 0.875rem;
        font-weight: 600;
        
        border-inline-end: 1px solid var(--editor-border);
        padding-inline-end: 0.33rem;
    }
    .size {
        grid-area: size;
        font-size: 0.75rem;
        font-style: italic;
    }
    .preview {
        grid-area: preview;
    }
`;

export { StyledContainer, StyledDropZone, StyledDropZoneContent, StyledTitle, StyledDescription, StyledStatus, StyledFileList, StyledFileItem, StyledFileInfo };