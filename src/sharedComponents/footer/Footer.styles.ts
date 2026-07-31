import styled from "styled-components"
import type { FooterProps } from "./Footer.types"

const StyledFooter = styled.footer<{ $contentLocation: NonNullable<FooterProps["contentLocation"]> }>`
    display: flex;
    justify-content: ${(props) => props.$contentLocation};
    padding: 1rem;

`
export default StyledFooter

