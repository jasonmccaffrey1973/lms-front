import { z } from 'zod';

// ============================================
// COURSE ENTITY SCHEMAS
// ============================================

/**
 * Zod schema for Course creation/update validation
 * Validates course metadata, structure requirements, and constraints
 */
export const CourseSchema = z.object({
  id: z.string().uuid('Course ID must be a valid UUID').optional(),
  title: z.string()
    .min(1, 'Course title is required')
    .max(200, 'Course title must not exceed 200 characters'),
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(5000, 'Description must not exceed 5000 characters'),
  instructorId: z.string().uuid('Instructor ID must be a valid UUID'),
  courseCode: z.string()
    .min(3, 'Course code must be at least 3 characters')
    .max(20, 'Course code must not exceed 20 characters'),
  semester: z.string().optional(),
  year: z.number().int().positive('Year must be a positive integer').optional(),
  prerequisites: z.array(z.string()).min(0).max(10).optional(),
  learningObjectives: z.array(z.string()).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type CourseInput = z.infer<typeof CourseSchema>;

/**
 * Course creation schema (requires all fields)
 */
export const CourseCreateSchema = CourseSchema.omit({ id: true }).required();

// ============================================
// CHAPTER ENTITY SCHEMAS
// ============================================

/**
 * Zod schema for Chapter validation
 * Validates chapter structure and hierarchical relationships
 */
export const ChapterSchema = z.object({
  id: z.string().uuid('Chapter ID must be a valid UUID').optional(),
  courseId: z.string().uuid('Course ID must be a valid UUID'),
  title: z.string()
    .min(1, 'Chapter title is required')
    .max(150, 'Chapter title must not exceed 150 characters'),
  order: z.number().int().min(0, 'Order must be non-negative'),
  content: z.string()
    .min(50, 'Content must be at least 50 characters')
    .max(10000, 'Content must not exceed 10000 characters'),
  published: z.boolean().default(false),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type ChapterInput = z.infer<typeof ChapterSchema>;

/**
 * Chapter creation schema
 */
export const ChapterCreateSchema = ChapterSchema.omit({ id: true }).required();

// ============================================
// LESSON ENTITY SCHEMAS
// ============================================

/**
 * Zod schema for Lesson validation
 * Validates lesson content, media attachments, and assessment requirements
 */
export const LessonSchema = z.object({
  id: z.string().uuid('Lesson ID must be a valid UUID').optional(),
  chapterId: z.string().uuid('Chapter ID must be a valid UUID'),
  title: z.string()
    .min(1, 'Lesson title is required')
    .max(100, 'Lesson title must not exceed 100 characters'),
  duration: z.number().int().positive('Duration must be positive').optional(),
  contentType: z.enum(['video', 'article', 'quiz', 'assignment', 'external']).optional(),
  contentUrl: z.string()
    .url('Content URL must be a valid URL')
    .max(2048, 'Content URL must not exceed 2048 characters'),
  resources: z.array(
    z.object({
      type: z.enum(['document', 'video', 'link', 'download']),
      url: z.string().url(),
      name: z.string().min(1),
    }),
  ).optional(),
  assessmentRequired: z.boolean().default(false),
  published: z.boolean().default(false),
  metadata: z.record(z.string(), z.any()).optional(),
});

export type LessonInput = z.infer<typeof LessonSchema>;

/**
 * Lesson creation schema
 */
export const LessonCreateSchema = LessonSchema.omit({ id: true }).required();

// ============================================
// VALIDATION UTILITIES
// ============================================

export type ValidationErrorDetail = {
  field: string;
  message: string;
};

function formatValidationErrors(error: z.ZodError): ValidationErrorDetail[] {
  return error.issues.map((issue) => ({
    field: issue.path.join('.') || '(root)',
    message: issue.message,
  }));
}

function throwValidationError(label: string, error: z.ZodError): never {
  throw new Error(`${label}: ${JSON.stringify(formatValidationErrors(error))}`);
}

/**
 * Validates and transforms course input data
 * Returns validated data or throws with detailed error information
 */
export function validateCourse(data: unknown): CourseInput {
  try {
    const validated = CourseCreateSchema.parse(data);

    return {
      ...validated,
      year: validated.year ?? undefined,
      prerequisites: validated.prerequisites ? [...validated.prerequisites].sort() : [],
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      throwValidationError('Course validation failed', error);
    }
    throw error;
  }
}

/**
 * Validates and transforms chapter input data
 */
export function validateChapter(data: unknown): ChapterInput {
  try {
    const validated = ChapterCreateSchema.parse(data);

    return {
      ...validated,
      order: Math.floor(validated.order),
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      throwValidationError('Chapter validation failed', error);
    }
    throw error;
  }
}

/**
 * Validates and transforms lesson input data
 */
export function validateLesson(data: unknown): LessonInput {
  try {
    const validated = LessonCreateSchema.parse(data);

    return {
      ...validated,
      duration: validated.duration !== undefined ? Math.floor(validated.duration) : undefined,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      throwValidationError('Lesson validation failed', error);
    }
    throw error;
  }
}

/**
 * Bulk validation for multiple courses, chapters, or lessons
 * Returns array of validated items and any errors encountered
 */
export function validateBulk<TSchema extends z.ZodTypeAny>(
  schema: TSchema,
  data: unknown[],
): { valid: z.infer<TSchema>[]; errors: Array<{ index: number; error: Error }> } {
  const valid: z.infer<TSchema>[] = [];
  const errors: Array<{ index: number; error: Error }> = [];

  data.forEach((item, index) => {
    try {
      valid.push(schema.parse(item));
    } catch (error) {
      if (error instanceof z.ZodError) {
        errors.push({
          index,
          error: new Error(formatValidationErrors(error).map((issue) => `${issue.field}: ${issue.message}`).join(', ')),
        });
        return;
      }

      errors.push({
        index,
        error: error instanceof Error ? error : new Error('Unknown validation error'),
      });
    }
  });

  return { valid, errors };
}
