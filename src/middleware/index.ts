export * from './validation';
export * from './content-transformer';
export * from './versioning';
export * from './transaction-manager';
export * from './audit-logger';

import { createAuditLogger } from './audit-logger';
import { transformContent } from './content-transformer';
import { createVersionedContent } from './versioning';
import { validateLesson } from './validation';
import { withTransaction } from './transaction-manager';

export type LessonSavePipelineInput = {
  lesson: Record<string, unknown>;
  userId?: string;
};

export async function runLessonSavePipeline(input: LessonSavePipelineInput) {
  const logger = createAuditLogger();

  const validatedLesson = validateLesson(input.lesson);
  const transformed = transformContent({
    rawContent: typeof validatedLesson.contentUrl === 'string' ? validatedLesson.contentUrl : '',
    title: typeof validatedLesson.title === 'string' ? validatedLesson.title : undefined,
    metadata: typeof validatedLesson.metadata === 'object' && validatedLesson.metadata ? validatedLesson.metadata : {},
  });

  const versioned = await createVersionedContent({
    ...validatedLesson,
    transformed,
  });

  const result = await withTransaction(async (context) => {
    const before = { entityType: 'lesson', state: 'pending' };
    const after = { entityType: 'lesson', state: 'saved', transactionId: context.id };

    logger.log({
      action: 'lesson.save',
      entityType: 'lesson',
      entityId: typeof validatedLesson.chapterId === 'string' ? validatedLesson.chapterId : undefined,
      before,
      after,
      diff: logger.compare(before, after),
      timestamp: new Date().toISOString(),
      userId: input.userId,
    });

    return {
      context,
      validatedLesson,
      transformed,
      versioned,
    };
  }, { lesson: validatedLesson });

  return result;
}
