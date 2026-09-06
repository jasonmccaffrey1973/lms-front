import { describe, expect, it } from 'vitest';
import { runLessonSavePipeline, validateLesson } from './index';

describe('lesson middleware pipeline', () => {
  it('validates and processes a lesson payload', async () => {
    const payload = {
      chapterId: '123e4567-e89b-12d3-a456-426614174000',
      title: 'Lesson 1: Intro to Validation',
      duration: 45,
      contentType: 'article',
      contentUrl: 'https://example.com/lesson-1',
      resources: [
        {
          type: 'document',
          url: 'https://example.com/notes.pdf',
          name: 'Notes PDF',
        },
      ],
      assessmentRequired: true,
      published: false,
      metadata: { category: 'foundation' },
    };

    const validated = validateLesson(payload);
    expect(validated.title).toBe('Lesson 1: Intro to Validation');
    expect(validated.duration).toBe(45);

    const result = await runLessonSavePipeline({ lesson: payload, userId: 'test-user' });

    expect(result.validatedLesson.chapterId).toBe(payload.chapterId);
    expect(result.transformed.wordCount).toBeGreaterThan(0);
    expect(result.versioned.changed).toBe(true);
    expect(result.context.state).toBe('committed');
  });

  it('rejects invalid lesson data', () => {
    const invalidPayload = {
      chapterId: 'not-a-uuid',
      title: '',
      duration: -5,
      contentUrl: 'not-a-url',
    };

    expect(() => validateLesson(invalidPayload)).toThrow();
  });
});
