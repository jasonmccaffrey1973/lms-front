import styled from "styled-components";

export const StyledMenuListWrapper = styled.div`
    display: grid;
    grid-template-rows: 1fr auto;
    grid-template-areas: "list" "label";
    align-items: center;
    justify-items: center;
    gap: 0.25rem;

    .label {
        grid-area: label;
        text-align: center;
        font-size: 0.7rem;
        line-height: 1.2;
    }
`;


export const StyledMenuList = styled.ul`
  --_wrapper-background-color: var(--editor-surface-muted, hsl(30, 8%, 95%));
  --_wrapper-border-color: var(--editor-border, hsl(30, 6%, 88%));
  --_item-background-color: var(--editor-tab-active, hsl(0, 0%, 100%));
  --_item-hover-background-color: var(--editor-item-hover, hsl(210, 80%, 96%));
  --_item-hover-border-color: hsl(206, 100%, 42%);
  --_item-active-background-color: var(--editor-item-active-bg, hsl(207, 67%, 87%));
  --_item-active-border-color: var(--editor-item-active-border, hsl(206, 100%, 31%));
  --_scrollbar-thumb-color: hsl(30, 4%, 78%);
  --_scrollbar-thumb-hover-color: hsl(30, 2%, 62%);

  grid-area: list;
  block-size: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.33rem;
  padding: 0.33rem;
  margin: 0;
  list-style: none;
  overflow-x: auto;
  overflow-y: hidden;
  max-width: 100%;
  background-color: var(--_wrapper-background-color);
  border: 1px solid var(--_wrapper-border-color);
  user-select: none;

  /* Subtle thin scrollbar styled for Word ribbon feel */
  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--_scrollbar-thumb-color);
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: var(--_scrollbar-thumb-hover-color);
  }
`;

export const StyledMenuListItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  inline-size: 6rem;
  block-size: 100%;
  padding: 0.25rem 0.33rem;
  background-color: var(--_item-background-color);
  border: 1px solid var(--_wrapper-border-color);
  border-radius: 0.25rem;
  cursor: pointer;
  box-sizing: border-box;
  transition: background-color 0.1s ease, border-color 0.1s ease;

  &:hover {
    background-color: var(--_item-hover-background-color);
    border-color: var(--_item-hover-border-color);
  }

  &:active {
    background-color: var(--_item-active-background-color);
    border-color: var(--_item-active-border-color);
  }
`;

export const ItemLabel = styled.span<{ $value: string }>`
  font-size: 0.8rem;
  color: var(--editor-text, hsl(210, 8%, 25%));
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;

  /* Preview styles mimicking Microsoft Word text hierarchy */
  ${({ $value }) => {
    switch ($value) {
      case "heading_1":
        return `
          font-weight: 600;
          font-size: 13px;
          color: var(--clr-primary, hsl(208, 85%, 40%));
        `;
      case "heading_2":
        return `
          font-weight: 600;
          font-size: 12px;
          color: var(--clr-primary-light, hsl(208, 85%, 40%));
        `;
      case "heading_3":
        return `
          font-weight: 600;
          font-size: 11px;
          color: hsl(from(var(--editor-text, hsl(210, 8%, 25%)) h s l / 0.8));
        `;
      case "strong":
        return `
          font-weight: 700;
          color: var(--editor-text, hsl(210, 8%, 25%));
        `;
      case "normal":
      default:
        return `
          font-weight: 400;
        `;
    }
  }}
`;