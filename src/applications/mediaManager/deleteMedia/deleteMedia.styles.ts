import styled from "styled-components";

const StyledDeleteMediaModal = styled.div`

padding-inline: 0.66rem;

h2 {
    margin: 0;
    padding: 0;
    margin-block-end: 1rem;
    font-size: 1rem;
    font-weight: 500;
}

ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

li {
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

button {
    display: flex;
    align-items: center;
    gap: 0.25rem;

    svg {
        display: block;
        height: 1.33em;
        width: 1.33em;
    }
}

`;

export default StyledDeleteMediaModal;