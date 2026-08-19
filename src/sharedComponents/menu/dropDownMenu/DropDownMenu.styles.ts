import styled from "styled-components";

const StyledMenuTrigger = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  color: inherit;

  &:focus-visible {
    outline: 2px solid var(--clr-primary, hsl(0, 100%, 56.5%));
    outline-offset: 0.25rem;
    border-radius: 0.25rem;
  }
`;

const StyledMenuWrapper = styled.div`
  position: relative;
  width: fit-content;
`;

const StyledMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  position: absolute;
  right: 0;
  top: calc(100% + 0.25rem);
  background-color: var(--clr-background);
  border: 1px solid var(--clr-border, hsla(0, 0%, 0%, 0.12));
  z-index: 1000;
  min-inline-size: 15rem;
  box-shadow: 0.25rem 0.25rem 0.33rem rgba(0, 0, 0, 0.15);
  transform-origin: top center;
  transform: scaleY(0);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0.15s ease, transform 0.15s ease, visibility 0.15s ease;

  &[aria-expanded="true"] {
    transform: scaleY(1);
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
  }
`;

const StyledMenuItem = styled.a`
  display: block;
  padding: 0.33rem 0.5rem;
  color: var(--clr-text);
  text-decoration: none;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    background-color: var(--clr-primary);
    color: var(--clr-background-light);
    outline: none;
  }
`;

export { StyledMenuTrigger, StyledMenuWrapper, StyledMenu, StyledMenuItem };