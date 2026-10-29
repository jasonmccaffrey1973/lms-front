import { describe, expect, it } from 'vitest';

import {
  AI_VIDEO_PROJECTS_GQL,
  CREATE_AI_VIDEO_PROJECT_GQL,
  CREATE_AI_VIDEO_SCENE_GQL,
  IMPORT_AI_VIDEO_GQL,
} from './aiVideoQueries.ts';

describe('AI video GraphQL documents', () => {
  it('defines the project listing query', () => {
    expect(AI_VIDEO_PROJECTS_GQL.loc?.source.body ?? '').toContain('aiVideoProjects');
  });

  it('defines the project creation mutation', () => {
    expect(CREATE_AI_VIDEO_PROJECT_GQL.loc?.source.body ?? '').toContain('createAiVideoProject');
  });

  it('defines the scene creation mutation', () => {
    expect(CREATE_AI_VIDEO_SCENE_GQL.loc?.source.body ?? '').toContain('createAiVideoScene');
  });

  it('defines the video import mutation', () => {
    expect(IMPORT_AI_VIDEO_GQL.loc?.source.body ?? '').toContain('importAiVideo');
  });
});
