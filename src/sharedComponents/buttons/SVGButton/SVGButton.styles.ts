import styled from "styled-components";

const StyledSVGButton = styled.button<{color?: string, hover?: string}>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ color }) => color || "transparent"};
  &:hover {
    background-color: ${({ hover }) => hover || "transparent"};
  }
  border: none;
  cursor: pointer;
`;

export default StyledSVGButton;