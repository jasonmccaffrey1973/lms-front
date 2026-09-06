import { runLessonSavePipeline, validateLesson } from '../middleware';

export async function saveLessonLessonRoute(payload: unknown) {
  const validated = validateLesson(payload);

  return runLessonSavePipeline({
    lesson: validated,
    userId: 'system-user',
  });
}
