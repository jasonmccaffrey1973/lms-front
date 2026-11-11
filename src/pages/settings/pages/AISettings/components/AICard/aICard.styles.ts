import styled from 'styled-components';

const StyledAICard = styled.article`
  border: 1px solid var(--app-border); border-radius: 0.3rem; margin-block-end: 0.65rem; overflow: hidden;
  header { display: flex; align-items: center; gap: 0.5rem; padding: 0.4rem; background: var(--editor-surface-muted); }
  .title { flex: 1; justify-content: flex-start; text-align: left; text-transform: none; letter-spacing: normal; }
  .title span { display: grid; gap: 0.2rem; }
  small { color: var(--app-text-muted); }
  .status { padding: 0.25rem 0.5rem; border-radius: 1rem; font-size: 0.75rem; text-transform: capitalize; background: var(--app-surface); }
  .icon-action { flex: none; padding-inline: 0.65rem; }
  .content { display: none; padding: 0.75rem; }
  &[data-expanded='true'] .content { display: block; }
  dl { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.75rem; margin: 0; }
  dl div { min-width: 0; }
  dt { color: var(--app-text-muted); font-size: 0.8rem; }
  dd { overflow-wrap: anywhere; margin: 0.2rem 0 0; }
  @media (max-width: 640px) { header { flex-wrap: wrap; } dl { grid-template-columns: 1fr; } }
`;

export default StyledAICard;
